-- Run all migrations in order
-- This script should be executed in the Supabase SQL editor

-- Migration 001: Initial Schema
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  address TEXT,
  subscription_plan VARCHAR(50) DEFAULT 'basic' CHECK (subscription_plan IN ('basic', 'premium', 'enterprise')),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  location_count INTEGER DEFAULT 0,
  user_count INTEGER DEFAULT 0,
  monthly_revenue DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  phone VARCHAR(50),
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  avatar_url TEXT,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  total_spots INTEGER DEFAULT 0,
  available_spots INTEGER DEFAULT 0,
  hourly_rate DECIMAL(8,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spots table
CREATE TABLE IF NOT EXISTS spots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
  spot_number VARCHAR(50) NOT NULL,
  spot_type VARCHAR(50) DEFAULT 'regular' CHECK (spot_type IN ('regular', 'handicap', 'electric', 'compact')),
  status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'reserved', 'maintenance')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(location_id, spot_number)
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
  spot_id UUID REFERENCES spots(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled', 'no_show')),
  total_cost DECIMAL(8,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_company_id ON user_profiles(company_id);
CREATE INDEX IF NOT EXISTS idx_locations_company_id ON locations(company_id);
CREATE INDEX IF NOT EXISTS idx_spots_location_id ON spots(location_id);
CREATE INDEX IF NOT EXISTS idx_spots_status ON spots(status);
CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_location_id ON reservations(location_id);
CREATE INDEX IF NOT EXISTS idx_reservations_start_time ON reservations(start_time);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_spot_id ON reservations(spot_id);

-- Migration 002: Functions and Triggers  
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
CREATE TRIGGER update_companies_updated_at 
  BEFORE UPDATE ON companies 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_locations_updated_at ON locations;
CREATE TRIGGER update_locations_updated_at 
  BEFORE UPDATE ON locations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_spots_updated_at ON spots;
CREATE TRIGGER update_spots_updated_at 
  BEFORE UPDATE ON spots 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reservations_updated_at ON reservations;
CREATE TRIGGER update_reservations_updated_at 
  BEFORE UPDATE ON reservations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update location spot counts
CREATE OR REPLACE FUNCTION update_location_spot_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total_spots and available_spots for the location
  UPDATE locations 
  SET 
    total_spots = (
      SELECT COUNT(*) 
      FROM spots 
      WHERE location_id = COALESCE(NEW.location_id, OLD.location_id)
    ),
    available_spots = (
      SELECT COUNT(*) 
      FROM spots 
      WHERE location_id = COALESCE(NEW.location_id, OLD.location_id) 
      AND status = 'available'
    )
  WHERE id = COALESCE(NEW.location_id, OLD.location_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers to update spot counts
DROP TRIGGER IF EXISTS update_spot_counts_on_insert ON spots;
CREATE TRIGGER update_spot_counts_on_insert
  AFTER INSERT ON spots
  FOR EACH ROW EXECUTE FUNCTION update_location_spot_counts();

DROP TRIGGER IF EXISTS update_spot_counts_on_update ON spots;
CREATE TRIGGER update_spot_counts_on_update
  AFTER UPDATE ON spots
  FOR EACH ROW EXECUTE FUNCTION update_location_spot_counts();

DROP TRIGGER IF EXISTS update_spot_counts_on_delete ON spots;
CREATE TRIGGER update_spot_counts_on_delete
  AFTER DELETE ON spots
  FOR EACH ROW EXECUTE FUNCTION update_location_spot_counts();

-- Function to update company counts
CREATE OR REPLACE FUNCTION update_company_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update location_count and user_count for the company
  UPDATE companies 
  SET 
    location_count = (
      SELECT COUNT(*) 
      FROM locations 
      WHERE company_id = COALESCE(NEW.company_id, OLD.company_id)
    ),
    user_count = (
      SELECT COUNT(*) 
      FROM user_profiles 
      WHERE company_id = COALESCE(NEW.company_id, OLD.company_id)
    )
  WHERE id = COALESCE(NEW.company_id, OLD.company_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers to update company counts
DROP TRIGGER IF EXISTS update_company_counts_on_location_change ON locations;
CREATE TRIGGER update_company_counts_on_location_change
  AFTER INSERT OR UPDATE OR DELETE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_company_counts();

DROP TRIGGER IF EXISTS update_company_counts_on_user_change ON user_profiles;
CREATE TRIGGER update_company_counts_on_user_change
  AFTER INSERT OR UPDATE OR DELETE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_company_counts();

-- Migration 003: Row Level Security
-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own company" ON companies;
DROP POLICY IF EXISTS "Admins can update their company" ON companies;
DROP POLICY IF EXISTS "Users can view profiles in their company" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can manage users in their company" ON user_profiles;
DROP POLICY IF EXISTS "Users can view locations in their company" ON locations;
DROP POLICY IF EXISTS "Managers can manage locations in their company" ON locations;
DROP POLICY IF EXISTS "Users can view spots in their company locations" ON spots;
DROP POLICY IF EXISTS "Managers can manage spots in their company locations" ON spots;
DROP POLICY IF EXISTS "Users can view their own reservations" ON reservations;
DROP POLICY IF EXISTS "Users can create reservations for company locations" ON reservations;
DROP POLICY IF EXISTS "Users can update their own reservations" ON reservations;
DROP POLICY IF EXISTS "Managers can view all reservations in their company" ON reservations;

-- Companies policies
CREATE POLICY "Users can view their own company" ON companies
  FOR SELECT USING (
    id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update their company" ON companies
  FOR UPDATE USING (
    id IN (
      SELECT company_id FROM user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User profiles policies
CREATE POLICY "Users can view profiles in their company" ON user_profiles
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    ) OR id = auth.uid()
  );

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (id = auth.uid());

CREATE POLICY "Admins can manage users in their company" ON user_profiles
  FOR ALL USING (
    company_id IN (
      SELECT company_id FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

-- Locations policies
CREATE POLICY "Users can view locations in their company" ON locations
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Managers can manage locations in their company" ON locations
  FOR ALL USING (
    company_id IN (
      SELECT company_id FROM user_profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

-- Spots policies
CREATE POLICY "Users can view spots in their company locations" ON spots
  FOR SELECT USING (
    location_id IN (
      SELECT l.id FROM locations l
      JOIN user_profiles up ON l.company_id = up.company_id
      WHERE up.id = auth.uid()
    )
  );

CREATE POLICY "Managers can manage spots in their company locations" ON spots
  FOR ALL USING (
    location_id IN (
      SELECT l.id FROM locations l
      JOIN user_profiles up ON l.company_id = up.company_id
      WHERE up.id = auth.uid() AND up.role IN ('admin', 'manager')
    )
  );

-- Reservations policies
CREATE POLICY "Users can view their own reservations" ON reservations
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create reservations for company locations" ON reservations
  FOR INSERT WITH CHECK (
    location_id IN (
      SELECT l.id FROM locations l
      JOIN user_profiles up ON l.company_id = up.company_id
      WHERE up.id = auth.uid()
    ) AND user_id = auth.uid()
  );

CREATE POLICY "Users can update their own reservations" ON reservations
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Managers can view all reservations in their company" ON reservations
  FOR SELECT USING (
    location_id IN (
      SELECT l.id FROM locations l
      JOIN user_profiles up ON l.company_id = up.company_id
      WHERE up.id = auth.uid() AND up.role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Managers can manage all reservations in their company" ON reservations
  FOR ALL USING (
    location_id IN (
      SELECT l.id FROM locations l
      JOIN user_profiles up ON l.company_id = up.company_id
      WHERE up.id = auth.uid() AND up.role IN ('admin', 'manager')
    )
  );

-- Migration 004: Seed Data
-- Insert sample companies
INSERT INTO companies (id, name, email, phone, address, subscription_plan, status, location_count, user_count, monthly_revenue) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Acme Corporation', 'admin@acme.com', '+1-555-0123', '123 Business St, New York, NY 10001', 'premium', 'active', 3, 15, 12500.00),
('550e8400-e29b-41d4-a716-446655440002', 'Globex Industries', 'contact@globex.com', '+1-555-0456', '456 Corporate Ave, Los Angeles, CA 90210', 'enterprise', 'active', 5, 25, 25000.00),
('550e8400-e29b-41d4-a716-446655440003', 'Initech Solutions', 'info@initech.com', '+1-555-0789', '789 Tech Blvd, San Francisco, CA 94105', 'basic', 'active', 2, 8, 5000.00)
ON CONFLICT (id) DO NOTHING;

-- Insert sample locations
INSERT INTO locations (id, company_id, name, address, total_spots, available_spots, hourly_rate, status) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Downtown Parking Garage', '100 Main St, New York, NY 10001', 150, 45, 8.00, 'active'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Airport Parking Lot', '200 Airport Rd, New York, NY 11430', 300, 120, 12.00, 'active'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'Shopping Mall Parking', '300 Mall Dr, Los Angeles, CA 90210', 500, 200, 6.00, 'active'),
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Office Complex Parking', '400 Business Park, Los Angeles, CA 90211', 200, 80, 10.00, 'active'),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 'Tech Campus Parking', '500 Innovation Way, San Francisco, CA 94105', 100, 30, 15.00, 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert sample spots
INSERT INTO spots (id, location_id, spot_number, spot_type, status) VALUES
-- Downtown Parking Garage spots
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'A001', 'regular', 'available'),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', 'A002', 'regular', 'occupied'),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 'A003', 'handicap', 'available'),
('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440001', 'A004', 'electric', 'available'),
('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440001', 'A005', 'compact', 'reserved'),
-- Airport Parking Lot spots
('770e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440002', 'B001', 'regular', 'available'),
('770e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440002', 'B002', 'regular', 'available'),
('770e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440002', 'B003', 'handicap', 'available'),
('770e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440002', 'B004', 'electric', 'occupied'),
('770e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440002', 'B005', 'regular', 'available'),
-- Shopping Mall Parking spots
('770e8400-e29b-41d4-a716-446655440011', '660e8400-e29b-41d4-a716-446655440003', 'C001', 'regular', 'available'),
('770e8400-e29b-41d4-a716-446655440012', '660e8400-e29b-41d4-a716-446655440003', 'C002', 'regular', 'occupied'),
('770e8400-e29b-41d4-a716-446655440013', '660e8400-e29b-41d4-a716-446655440003', 'C003', 'handicap', 'available'),
('770e8400-e29b-41d4-a716-446655440014', '660e8400-e29b-41d4-a716-446655440003', 'C004', 'electric', 'available'),
('770e8400-e29b-41d4-a716-446655440015', '660e8400-e29b-41d4-a716-446655440003', 'C005', 'compact', 'available'),
-- Office Complex Parking spots
('770e8400-e29b-41d4-a716-446655440016', '660e8400-e29b-41d4-a716-446655440004', 'D001', 'regular', 'available'),
('770e8400-e29b-41d4-a716-446655440017', '660e8400-e29b-41d4-a716-446655440004', 'D002', 'regular', 'available'),
('770e8400-e29b-41d4-a716-446655440018', '660e8400-e29b-41d4-a716-446655440004', 'D003', 'handicap', 'available'),
('770e8400-e29b-41d4-a716-446655440019', '660e8400-e29b-41d4-a716-446655440004', 'D004', 'electric', 'occupied'),
('770e8400-e29b-41d4-a716-446655440020', '660e8400-e29b-41d4-a716-446655440004', 'D005', 'regular', 'available'),
-- Tech Campus Parking spots
('770e8400-e29b-41d4-a716-446655440021', '660e8400-e29b-41d4-a716-446655440005', 'E001', 'regular', 'available'),
('770e8400-e29b-41d4-a716-446655440022', '660e8400-e29b-41d4-a716-446655440005', 'E002', 'regular', 'occupied'),
('770e8400-e29b-41d4-a716-446655440023', '660e8400-e29b-41d4-a716-446655440005', 'E003', 'handicap', 'available'),
('770e8400-e29b-41d4-a716-446655440024', '660e8400-e29b-41d4-a716-446655440005', 'E004', 'electric', 'available'),
('770e8400-e29b-41d4-a716-446655440025', '660e8400-e29b-41d4-a716-446655440005', 'E005', 'compact', 'available')
ON CONFLICT (id) DO NOTHING;

-- Generate more spots for each location to match total_spots
DO $$
DECLARE
    loc RECORD;
    i INTEGER;
    spot_prefix CHAR(1);
BEGIN
    -- Loop through each location and generate spots
    FOR loc IN SELECT id, total_spots FROM locations LOOP
        -- Determine spot prefix based on location
        CASE loc.id
            WHEN '660e8400-e29b-41d4-a716-446655440001' THEN spot_prefix := 'A';
            WHEN '660e8400-e29b-41d4-a716-446655440002' THEN spot_prefix := 'B';
            WHEN '660e8400-e29b-41d4-a716-446655440003' THEN spot_prefix := 'C';
            WHEN '660e8400-e29b-41d4-a716-446655440004' THEN spot_prefix := 'D';
            WHEN '660e8400-e29b-41d4-a716-446655440005' THEN spot_prefix := 'E';
            ELSE spot_prefix := 'X';
        END CASE;
        
        -- Generate spots from 006 to total_spots for each location
        FOR i IN 6..loc.total_spots LOOP
            INSERT INTO spots (location_id, spot_number, spot_type, status)
            VALUES (
                loc.id,
                spot_prefix || LPAD(i::text, 3, '0'),
                CASE 
                    WHEN i % 20 = 0 THEN 'handicap'
                    WHEN i % 15 = 0 THEN 'electric'
                    WHEN i % 10 = 0 THEN 'compact'
                    ELSE 'regular'
                END,
                CASE 
                    WHEN random() < 0.3 THEN 'occupied'
                    WHEN random() < 0.1 THEN 'reserved'
                    ELSE 'available'
                END
            )
            ON CONFLICT (location_id, spot_number) DO NOTHING;
        END LOOP;
    END LOOP;
END $$;

-- Migration 005: Utility Functions
-- Function to get company statistics
CREATE OR REPLACE FUNCTION get_company_stats(company_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_locations', COUNT(DISTINCT l.id),
        'total_spots', COALESCE(SUM(l.total_spots), 0),
        'available_spots', COALESCE(SUM(l.available_spots), 0),
        'occupied_spots', COALESCE(SUM(l.total_spots - l.available_spots), 0),
        'total_users', (SELECT COUNT(*) FROM user_profiles WHERE company_id = company_uuid),
        'active_reservations', (
            SELECT COUNT(*) 
            FROM reservations r 
            JOIN locations l ON r.location_id = l.id 
            WHERE l.company_id = company_uuid AND r.status = 'active'
        ),
        'monthly_revenue', (
            SELECT COALESCE(monthly_revenue, 0) 
            FROM companies 
            WHERE id = company_uuid
        )
    ) INTO result
    FROM locations l
    WHERE l.company_id = company_uuid;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get location occupancy rate
CREATE OR REPLACE FUNCTION get_location_occupancy(location_uuid UUID)
RETURNS DECIMAL AS $$
DECLARE
    total_spots INTEGER;
    occupied_spots INTEGER;
    occupancy_rate DECIMAL;
BEGIN
    SELECT 
        total_spots,
        (total_spots - available_spots)
    INTO total_spots, occupied_spots
    FROM locations 
    WHERE id = location_uuid;
    
    IF total_spots > 0 THEN
        occupancy_rate := (occupied_spots::DECIMAL / total_spots::DECIMAL) * 100;
    ELSE
        occupancy_rate := 0;
    END IF;
    
    RETURN ROUND(occupancy_rate, 2);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get reservation analytics
CREATE OR REPLACE FUNCTION get_reservation_analytics(
    company_uuid UUID,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() - INTERVAL '30 days',
    end_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_reservations', COUNT(*),
        'active_reservations', COUNT(*) FILTER (WHERE status = 'active'),
        'completed_reservations', COUNT(*) FILTER (WHERE status = 'completed'),
        'cancelled_reservations', COUNT(*) FILTER (WHERE status = 'cancelled'),
        'no_show_reservations', COUNT(*) FILTER (WHERE status = 'no_show'),
        'total_revenue', COALESCE(SUM(total_cost), 0),
        'average_duration', AVG(EXTRACT(EPOCH FROM (end_time - start_time))/3600),
        'peak_hours', (
            SELECT json_agg(json_build_object('hour', hour, 'count', count))
            FROM (
                SELECT 
                    EXTRACT(HOUR FROM start_time) as hour,
                    COUNT(*) as count
                FROM reservations r
                JOIN locations l ON r.location_id = l.id
                WHERE l.company_id = company_uuid
                AND r.created_at BETWEEN start_date AND end_date
                GROUP BY EXTRACT(HOUR FROM start_time)
                ORDER BY count DESC
                LIMIT 5
            ) peak_data
        )
    ) INTO result
    FROM reservations r
    JOIN locations l ON r.location_id = l.id
    WHERE l.company_id = company_uuid
    AND r.created_at BETWEEN start_date AND end_date;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update spot status
CREATE OR REPLACE FUNCTION update_spot_status(
    spot_uuid UUID,
    new_status VARCHAR(50)
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Validate status
    IF new_status NOT IN ('available', 'occupied', 'reserved', 'maintenance') THEN
        RETURN FALSE;
    END IF;
    
    -- Update spot status
    UPDATE spots 
    SET status = new_status 
    WHERE id = spot_uuid;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create reservation with spot assignment
CREATE OR REPLACE FUNCTION create_reservation_with_spot(
    p_user_id UUID,
    p_location_id UUID,
    p_start_time TIMESTAMP WITH TIME ZONE,
    p_end_time TIMESTAMP WITH TIME ZONE,
    p_spot_type VARCHAR(50) DEFAULT 'regular'
)
RETURNS JSON AS $$
DECLARE
    available_spot_id UUID;
    new_reservation_id UUID;
    hourly_rate DECIMAL;
    duration_hours DECIMAL;
    total_cost DECIMAL;
    result JSON;
BEGIN
    -- Find an available spot of the requested type
    SELECT id INTO available_spot_id
    FROM spots s
    WHERE s.location_id = p_location_id
    AND s.spot_type = p_spot_type
    AND s.status = 'available'
    LIMIT 1;
    
    -- If no spot of requested type, try any available spot
    IF available_spot_id IS NULL THEN
        SELECT id INTO available_spot_id
        FROM spots s
        WHERE s.location_id = p_location_id
        AND s.status = 'available'
        LIMIT 1;
    END IF;
    
    -- If no spots available, return error
    IF available_spot_id IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'No available spots');
    END IF;
    
    -- Get hourly rate and calculate cost
    SELECT hourly_rate INTO hourly_rate FROM locations WHERE id = p_location_id;
    duration_hours := EXTRACT(EPOCH FROM (p_end_time - p_start_time))/3600;
    total_cost := hourly_rate * duration_hours;
    
    -- Create reservation
    INSERT INTO reservations (user_id, location_id, spot_id, start_time, end_time, total_cost)
    VALUES (p_user_id, p_location_id, available_spot_id, p_start_time, p_end_time, total_cost)
    RETURNING id INTO new_reservation_id;
    
    -- Update spot status to reserved
    UPDATE spots SET status = 'reserved' WHERE id = available_spot_id;
    
    -- Return success with reservation details
    SELECT json_build_object(
        'success', true,
        'reservation_id', new_reservation_id,
        'spot_id', available_spot_id,
        'spot_number', s.spot_number,
        'total_cost', total_cost
    ) INTO result
    FROM spots s
    WHERE s.id = available_spot_id;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Migration 006: Sample Reservations
-- Insert sample reservations for testing
INSERT INTO reservations (id, user_id, location_id, spot_id, start_time, end_time, status, total_cost) VALUES
-- Note: These will only work if you have actual user IDs from auth.users
-- For now, we'll create placeholder reservations that can be updated later
('880e8400-e29b-41d4-a716-446655440001', '00000000-0000-0000-0000-000000000001', '660e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '2 hours', NOW() + INTERVAL '2 hours', 'active', 32.00),
('880e8400-e29b-41d4-a716-446655440002', '00000000-0000-0000-0000-000000000002', '660e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440009', NOW() - INTERVAL '1 hour', NOW() + INTERVAL '3 hours', 'active', 48.00),
('880e8400-e29b-41d4-a716-446655440003', '00000000-0000-0000-0000-000000000003', '660e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440012', NOW() - INTERVAL '30 minutes', NOW() + INTERVAL '1.5 hours', 'active', 12.00)
ON CONFLICT (id) DO NOTHING;

-- Create a function to generate sample reservations for real users
CREATE OR REPLACE FUNCTION generate_sample_reservations()
RETURNS VOID AS $$
DECLARE
    user_record RECORD;
    location_record RECORD;
    spot_record RECORD;
    i INTEGER;
BEGIN
    -- Clear existing sample reservations
    DELETE FROM reservations WHERE user_id LIKE '00000000-0000-0000-0000-%';
    
    -- Generate reservations for each user profile
    FOR user_record IN SELECT id, company_id FROM user_profiles WHERE company_id IS NOT NULL LOOP
        -- Get locations for this user's company
        FOR location_record IN SELECT id FROM locations WHERE company_id = user_record.company_id LIMIT 2 LOOP
            -- Create 1-3 reservations per location
            FOR i IN 1..floor(random() * 3 + 1)::INTEGER LOOP
                -- Get a random spot from this location
                SELECT id INTO spot_record FROM spots 
                WHERE location_id = location_record.id 
                ORDER BY random() 
                LIMIT 1;
                
                IF spot_record IS NOT NULL THEN
                    INSERT INTO reservations (
                        user_id, 
                        location_id, 
                        spot_id, 
                        start_time, 
                        end_time, 
                        status, 
                        total_cost
                    ) VALUES (
                        user_record.id,
                        location_record.id,
                        spot_record.id,
                        NOW() + (random() * INTERVAL '7 days') - INTERVAL '3 days',
                        NOW() + (random() * INTERVAL '7 days') - INTERVAL '3 days' + INTERVAL '2 hours',
                        CASE 
                            WHEN random() < 0.7 THEN 'completed'
                            WHEN random() < 0.9 THEN 'active'
                            ELSE 'cancelled'
                        END,
                        (random() * 50 + 10)::DECIMAL(8,2)
                    );
                END IF;
            END LOOP;
        END LOOP;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Verify the setup
SELECT 'Companies' as table_name, count(*) as record_count FROM companies
UNION ALL
SELECT 'Locations', count(*) FROM locations  
UNION ALL
SELECT 'Spots', count(*) FROM spots
UNION ALL
SELECT 'User Profiles', count(*) FROM user_profiles
UNION ALL
SELECT 'Reservations', count(*) FROM reservations;

-- Show table sizes and indexes
SELECT 
    schemaname,
    tablename,
    attname,
    n_distinct,
    correlation
FROM pg_stats 
WHERE schemaname = 'public' 
AND tablename IN ('companies', 'user_profiles', 'locations', 'spots', 'reservations')
ORDER BY tablename, attname;

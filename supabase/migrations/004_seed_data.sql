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

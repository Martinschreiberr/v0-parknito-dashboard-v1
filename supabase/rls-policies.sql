-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

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
    )
  );

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (id = auth.uid());

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

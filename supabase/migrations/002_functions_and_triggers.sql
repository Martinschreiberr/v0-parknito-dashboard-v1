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

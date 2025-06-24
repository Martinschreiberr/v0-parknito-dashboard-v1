-- Check if all required tables exist
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('companies', 'user_profiles', 'locations', 'spots', 'reservations')
ORDER BY tablename;

-- Check table row counts
SELECT 
  'companies' as table_name, 
  COUNT(*) as row_count 
FROM companies
UNION ALL
SELECT 
  'user_profiles' as table_name, 
  COUNT(*) as row_count 
FROM user_profiles
UNION ALL
SELECT 
  'locations' as table_name, 
  COUNT(*) as row_count 
FROM locations
UNION ALL
SELECT 
  'spots' as table_name, 
  COUNT(*) as row_count 
FROM spots
UNION ALL
SELECT 
  'reservations' as table_name, 
  COUNT(*) as row_count 
FROM reservations;

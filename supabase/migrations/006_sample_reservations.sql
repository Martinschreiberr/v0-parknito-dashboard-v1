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

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

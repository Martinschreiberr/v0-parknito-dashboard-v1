import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export class SupabaseService {
  // Companies
  static async getCompanies() {
    const { data, error } = await supabase.from("companies").select("*")
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data || []
  }

  static async getCompanyById(id: string) {
    const { data, error } = await supabase.from("companies").select("*").eq("id", id).single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async createCompany(companyData: any) {
    const { data, error } = await supabase.from("companies").insert([companyData]).select().single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async updateCompany(id: string, companyData: any) {
    const { data, error } = await supabase.from("companies").update(companyData).eq("id", id).select().single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async deleteCompany(id: string) {
    const { error } = await supabase.from("companies").delete().eq("id", id)
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
  }

  // Users
  static async getUsers(companyId?: string) {
    let query = supabase.from("users").select("*")
    if (companyId) {
      query = query.eq("company_id", companyId)
    }
    const { data, error } = await query
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data || []
  }

  static async getUserProfile(userId: string) {
    const { data, error } = await supabase.from("user_profiles").select("*").eq("user_id", userId).single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async createUser(userData: any) {
    const { data, error } = await supabase.from("users").insert([userData]).select().single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async updateUserProfile(userId: string, profileData: any) {
    const { data, error } = await supabase
      .from("user_profiles")
      .update(profileData)
      .eq("user_id", userId)
      .select()
      .single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async deleteUser(id: string) {
    const { error } = await supabase.from("users").delete().eq("id", id)
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
  }

  // Locations
  static async getLocations(companyId?: string) {
    let query = supabase.from("locations").select("*")
    if (companyId) {
      query = query.eq("company_id", companyId)
    }
    const { data, error } = await query
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data || []
  }

  static async getLocationById(id: string) {
    const { data, error } = await supabase.from("locations").select("*").eq("id", id).single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async createLocation(locationData: any) {
    const { data, error } = await supabase.from("locations").insert([locationData]).select().single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async updateLocation(id: string, locationData: any) {
    const { data, error } = await supabase.from("locations").update(locationData).eq("id", id).select().single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async deleteLocation(id: string) {
    const { error } = await supabase.from("locations").delete().eq("id", id)
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
  }

  // Spots
  static async getSpots(locationId?: string) {
    let query = supabase.from("spots").select("*")
    if (locationId) {
      query = query.eq("location_id", locationId)
    }
    const { data, error } = await query
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data || []
  }

  static async createSpot(spotData: any) {
    const { data, error } = await supabase.from("spots").insert([spotData]).select().single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async updateSpot(id: string, spotData: any) {
    const { data, error } = await supabase.from("spots").update(spotData).eq("id", id).select().single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async deleteSpot(id: string) {
    const { error } = await supabase.from("spots").delete().eq("id", id)
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
  }

  // Reservations
  static async getReservations(userId?: string, locationId?: string) {
    let query = supabase.from("reservations").select("*")
    if (userId) {
      query = query.eq("user_id", userId)
    }
    if (locationId) {
      query = query.eq("location_id", locationId)
    }
    const { data, error } = await query
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data || []
  }

  static async getReservationById(id: string) {
    const { data, error } = await supabase.from("reservations").select("*").eq("id", id).single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async createReservation(reservationData: any) {
    const { data, error } = await supabase.from("reservations").insert([reservationData]).select().single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async updateReservation(id: string, reservationData: any) {
    const { data, error } = await supabase.from("reservations").update(reservationData).eq("id", id).select().single()
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
    return data
  }

  static async cancelReservation(id: string) {
    const { error } = await supabase.from("reservations").delete().eq("id", id)
    if (error) {
      console.error("Supabase error:", error)
      throw error
    }
  }
}

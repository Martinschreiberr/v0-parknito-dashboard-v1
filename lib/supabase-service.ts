import { createServerSupabaseClient } from "./supabase"
import type { Company, UserProfile, Location, Spot, Reservation } from "./supabase"

// Supabase service functions using server client
export class SupabaseService {
  // Companies
  static async getCompanies(): Promise<Company[]> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("companies").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Supabase error fetching companies:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getCompanies:", error)
      return []
    }
  }

  static async getCompanyById(id: string): Promise<Company | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("companies").select("*").eq("id", id).single()

      if (error) {
        console.error("Supabase error fetching company:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in getCompanyById:", error)
      return null
    }
  }

  static async createCompany(companyData: Omit<Company, "id" | "created_at" | "updated_at">): Promise<Company | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("companies").insert([companyData]).select().single()

      if (error) {
        console.error("Supabase error creating company:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in createCompany:", error)
      return null
    }
  }

  static async updateCompany(id: string, companyData: Partial<Company>): Promise<Company | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("companies").update(companyData).eq("id", id).select().single()

      if (error) {
        console.error("Supabase error updating company:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in updateCompany:", error)
      return null
    }
  }

  static async deleteCompany(id: string): Promise<boolean> {
    try {
      const supabase = createServerSupabaseClient()
      const { error } = await supabase.from("companies").delete().eq("id", id)
      if (error) {
        console.error("Supabase error deleting company:", error)
        return false
      }
      return true
    } catch (error) {
      console.error("Error in deleteCompany:", error)
      return false
    }
  }

  // User Profiles
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("Supabase error fetching user profile:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in getUserProfile:", error)
      return null
    }
  }

  static async getUsers(companyId?: string): Promise<UserProfile[]> {
    try {
      const supabase = createServerSupabaseClient()
      let query = supabase.from("user_profiles").select("*")

      if (companyId) {
        query = query.eq("company_id", companyId)
      }

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) {
        console.error("Supabase error fetching users:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getUsers:", error)
      return []
    }
  }

  static async createUser(
    userData: Omit<UserProfile, "id" | "created_at" | "updated_at">,
  ): Promise<UserProfile | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("user_profiles").insert([userData]).select().single()
      if (error) {
        console.error("Supabase error creating user profile:", error)
        return null
      }
      return data
    } catch (error) {
      console.error("Error in createUser:", error)
      return null
    }
  }

  static async updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase
        .from("user_profiles")
        .update(profileData)
        .eq("id", userId)
        .select()
        .single()

      if (error) {
        console.error("Supabase error updating user profile:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in updateUserProfile:", error)
      return null
    }
  }

  static async deleteUser(id: string): Promise<boolean> {
    try {
      const supabase = createServerSupabaseClient()
      const { error } = await supabase.from("user_profiles").delete().eq("id", id)
      if (error) {
        console.error("Supabase error deleting user profile:", error)
        return false
      }
      return true
    } catch (error) {
      console.error("Error in deleteUser:", error)
      return false
    }
  }

  // Locations
  static async getLocations(companyId?: string): Promise<Location[]> {
    try {
      const supabase = createServerSupabaseClient()
      let query = supabase.from("locations").select("*")

      if (companyId) {
        query = query.eq("company_id", companyId)
      }

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) {
        console.error("Supabase error fetching locations:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getLocations:", error)
      return []
    }
  }

  static async getLocationById(id: string): Promise<Location | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("locations").select("*").eq("id", id).single()

      if (error) {
        console.error("Supabase error fetching location:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in getLocationById:", error)
      return null
    }
  }

  static async createLocation(
    locationData: Omit<Location, "id" | "created_at" | "updated_at">,
  ): Promise<Location | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("locations").insert([locationData]).select().single()

      if (error) {
        console.error("Supabase error creating location:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in createLocation:", error)
      return null
    }
  }

  static async updateLocation(id: string, locationData: Partial<Location>): Promise<Location | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("locations").update(locationData).eq("id", id).select().single()
      if (error) {
        console.error("Supabase error updating location:", error)
        return null
      }
      return data
    } catch (error) {
      console.error("Error in updateLocation:", error)
      return null
    }
  }

  static async deleteLocation(id: string): Promise<boolean> {
    try {
      const supabase = createServerSupabaseClient()
      const { error } = await supabase.from("locations").delete().eq("id", id)
      if (error) {
        console.error("Supabase error deleting location:", error)
        return false
      }
      return true
    } catch (error) {
      console.error("Error in deleteLocation:", error)
      return false
    }
  }

  // Spots
  static async getSpots(locationId?: string): Promise<Spot[]> {
    try {
      const supabase = createServerSupabaseClient()
      let query = supabase.from("spots").select("*")

      if (locationId) {
        query = query.eq("location_id", locationId)
      }

      const { data, error } = await query.order("spot_number")

      if (error) {
        console.error("Supabase error fetching spots:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getSpots:", error)
      return []
    }
  }

  static async createSpot(spotData: Omit<Spot, "id" | "created_at" | "updated_at">): Promise<Spot | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("spots").insert([spotData]).select().single()

      if (error) {
        console.error("Supabase error creating spot:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in createSpot:", error)
      return null
    }
  }

  static async updateSpot(id: string, spotData: Partial<Spot>): Promise<Spot | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("spots").update(spotData).eq("id", id).select().single()
      if (error) {
        console.error("Supabase error updating spot:", error)
        return null
      }
      return data
    } catch (error) {
      console.error("Error in updateSpot:", error)
      return null
    }
  }

  static async deleteSpot(id: string): Promise<boolean> {
    try {
      const supabase = createServerSupabaseClient()
      const { error } = await supabase.from("spots").delete().eq("id", id)
      if (error) {
        console.error("Supabase error deleting spot:", error)
        return false
      }
      return true
    } catch (error) {
      console.error("Error in deleteSpot:", error)
      return false
    }
  }

  // Reservations
  static async getReservations(userId?: string, locationId?: string): Promise<Reservation[]> {
    try {
      const supabase = createServerSupabaseClient()
      let query = supabase.from("reservations").select("*")

      if (userId) {
        query = query.eq("user_id", userId)
      }

      if (locationId) {
        query = query.eq("location_id", locationId)
      }

      const { data, error } = await query.order("start_time", { ascending: false })

      if (error) {
        console.error("Supabase error fetching reservations:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Error in getReservations:", error)
      return []
    }
  }

  static async getReservationById(id: string): Promise<Reservation | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("reservations").select("*").eq("id", id).single()

      if (error) {
        console.error("Supabase error fetching reservation:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in getReservationById:", error)
      return null
    }
  }

  static async createReservation(
    reservationData: Omit<Reservation, "id" | "created_at" | "updated_at">,
  ): Promise<Reservation | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("reservations").insert([reservationData]).select().single()

      if (error) {
        console.error("Supabase error creating reservation:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in createReservation:", error)
      return null
    }
  }

  static async updateReservation(id: string, reservationData: Partial<Reservation>): Promise<Reservation | null> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("reservations").update(reservationData).eq("id", id).select().single()

      if (error) {
        console.error("Supabase error updating reservation:", error)
        return null
      }

      return data
    } catch (error) {
      console.error("Error in updateReservation:", error)
      return null
    }
  }

  static async cancelReservation(id: string): Promise<Reservation | null> {
    return this.updateReservation(id, { status: "cancelled" })
  }
}

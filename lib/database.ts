import { getSupabase } from "./supabase-client"

export class Database {
  private supabase = getSupabase()

  async getCompanies() {
    if (!this.supabase) {
      console.warn("Supabase not configured - returning empty array")
      return []
    }

    try {
      const { data, error } = await this.supabase
        .from("companies")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching companies:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Database error:", error)
      return []
    }
  }

  async getLocations() {
    if (!this.supabase) {
      return []
    }

    try {
      const { data, error } = await this.supabase
        .from("locations")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching locations:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Database error:", error)
      return []
    }
  }

  async getUsers() {
    if (!this.supabase) {
      return []
    }

    try {
      const { data, error } = await this.supabase.from("profiles").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching users:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Database error:", error)
      return []
    }
  }

  async getReservations() {
    if (!this.supabase) {
      return []
    }

    try {
      const { data, error } = await this.supabase
        .from("reservations")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching reservations:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Database error:", error)
      return []
    }
  }

  async getSpots() {
    if (!this.supabase) {
      return []
    }

    try {
      const { data, error } = await this.supabase.from("spots").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching spots:", error)
        return []
      }

      return data || []
    } catch (error) {
      console.error("Database error:", error)
      return []
    }
  }
}

export const database = new Database()

import { SupabaseService } from "./supabase-service"

// Check if Supabase is properly configured
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const jwtSecret = process.env.SUPABASE_JWT_SECRET

  return !!(
    url &&
    key &&
    jwtSecret &&
    url !== "your-supabase-url" &&
    key !== "your-supabase-anon-key" &&
    url.includes("supabase.co")
  )
}

// Database service that requires Supabase to be properly configured
export class Database {
  // Companies
  static async getCompanies() {
    if (!isSupabaseConfigured()) {
      throw new Error(
        "Supabase is not properly configured. Please set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_JWT_SECRET environment variables."
      )
    }

    try {
      console.log("[Database] Fetching companies from Supabase...")
      const companies = await SupabaseService.getCompanies()
      console.log(`[Database] Successfully fetched ${companies.length} companies from Supabase`)
      return companies
    } catch (error) {
      console.error("[Database] Failed to fetch companies from Supabase:", error)
      throw new Error(`Failed to fetch companies: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async getCompanyById(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error(
        "Supabase is not properly configured. Please set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_JWT_SECRET environment variables."
      )
    }

    try {
      console.log(`[Database] Fetching company ${id} from Supabase...`)
      const company = await SupabaseService.getCompanyById(id)
      console.log(`[Database] Successfully fetched company ${id} from Supabase`)
      return company
    } catch (error) {
      console.error(`[Database] Failed to fetch company ${id} from Supabase:`, error)
      throw new Error(`Failed to fetch company: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async createCompany(companyData: any) {
    if (!isSupabaseConfigured()) {
      throw new Error(
        "Supabase is not properly configured. Please set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_JWT_SECRET environment variables."
      )
    }

    try {
      console.log("[Database] Creating company in Supabase...")
      const company = await SupabaseService.createCompany(companyData)
      console.log("[Database] Successfully created company in Supabase")
      return company
    } catch (error) {
      console.error("[Database] Failed to create company in Supabase:", error)
      throw new Error(`Failed to create company: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async updateCompany(id: string, companyData: any) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.updateCompany(id, companyData)
    } catch (error) {
      console.error("[Database] Failed to update company in Supabase:", error)
      throw new Error(`Failed to update company: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async deleteCompany(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.deleteCompany(id)
    } catch (error) {
      console.error("[Database] Failed to delete company in Supabase:", error)
      throw new Error(`Failed to delete company: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // Users
  static async getUsers(companyId?: string) {
    if (!isSupabaseConfigured()) {
      throw new Error(
        "Supabase is not properly configured. Please set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_JWT_SECRET environment variables."
      )
    }

    try {
      console.log("[Database] Fetching users from Supabase...")
      const users = await SupabaseService.getUsers(companyId)
      console.log(`[Database] Successfully fetched ${users.length} users from Supabase`)
      return users
    } catch (error) {
      console.error("[Database] Failed to fetch users from Supabase:", error)
      throw new Error(`Failed to fetch users: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async getUserProfile(userId: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.getUserProfile(userId)
    } catch (error) {
      console.error(`[Database] Failed to fetch user ${userId} from Supabase:`, error)
      throw new Error(`Failed to fetch user: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async createUser(userData: any) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.createUser(userData)
    } catch (error) {
      console.error("[Database] Failed to create user in Supabase:", error)
      throw new Error(`Failed to create user: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async updateUserProfile(userId: string, profileData: any) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.updateUserProfile(userId, profileData)
    } catch (error) {
      console.error("[Database] Failed to update user in Supabase:", error)
      throw new Error(`Failed to update user: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async deleteUser(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.deleteUser(id)
    } catch (error) {
      console.error("[Database] Failed to delete user in Supabase:", error)
      throw new Error(`Failed to delete user: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // Locations
  static async getLocations(companyId?: string) {
    if (!isSupabaseConfigured()) {
      throw new Error(
        "Supabase is not properly configured. Please set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_JWT_SECRET environment variables."
      )
    }

    try {
      console.log("[Database] Fetching locations from Supabase...")
      const locations = await SupabaseService.getLocations(companyId)
      console.log(`[Database] Successfully fetched ${locations.length} locations from Supabase`)
      return locations
    } catch (error) {
      console.error("[Database] Failed to fetch locations from Supabase:", error)
      throw new Error(`Failed to fetch locations: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async getLocationById(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.getLocationById(id)
    } catch (error) {
      console.error(`[Database] Failed to fetch location ${id} from Supabase:`, error)
      throw new Error(`Failed to fetch location: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async createLocation(locationData: any) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.createLocation(locationData)
    } catch (error) {
      console.error("[Database] Failed to create location in Supabase:", error)
      throw new Error(`Failed to create location: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async updateLocation(id: string, locationData: any) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.updateLocation(id, locationData)
    } catch (error) {
      console.error("[Database] Failed to update location in Supabase:", error)
      throw new Error(`Failed to update location: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async deleteLocation(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.deleteLocation(id)
    } catch (error) {
      console.error("[Database] Failed to delete location in Supabase:", error)
      throw new Error(`Failed to delete location: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // Spots
  static async getSpots(locationId?: string) {
    if (!isSupabaseConfigured()) {
      throw new Error(
        "Supabase is not properly configured. Please set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_JWT_SECRET environment variables."
      )
    }

    try {
      console.log("[Database] Fetching spots from Supabase...")
      const spots = await SupabaseService.getSpots(locationId)
      console.log(`[Database] Successfully fetched ${spots.length} spots from Supabase`)
      return spots
    } catch (error) {
      console.error("[Database] Failed to fetch spots from Supabase:", error)
      throw new Error(`Failed to fetch spots: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async createSpot(spotData: any) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.createSpot(spotData)
    } catch (error) {
      console.error("[Database] Failed to create spot in Supabase:", error)
      throw new Error(`Failed to create spot: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async updateSpot(id: string, spotData: any) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.updateSpot(id, spotData)
    } catch (error) {
      console.error("[Database] Failed to update spot in Supabase:", error)
      throw new Error(`Failed to update spot: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async deleteSpot(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.deleteSpot(id)
    } catch (error) {
      console.error("[Database] Failed to delete spot in Supabase:", error)
      throw new Error(`Failed to delete spot: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // Reservations
  static async getReservations(userId?: string, locationId?: string) {
    if (!isSupabaseConfigured()) {
      throw new Error(
        "Supabase is not properly configured. Please set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_JWT_SECRET environment variables."
      )
    }

    try {
      console.log("[Database] Fetching reservations from Supabase...")
      const reservations = await SupabaseService.getReservations(userId, locationId)
      console.log(`[Database] Successfully fetched ${reservations.length} reservations from Supabase`)
      return reservations
    } catch (error) {
      console.error("[Database] Failed to fetch reservations from Supabase:", error)
      throw new Error(`Failed to fetch reservations: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async getReservationById(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.getReservationById(id)
    } catch (error) {
      console.error(`[Database] Failed to fetch reservation ${id} from Supabase:`, error)
      throw new Error(`Failed to fetch reservation: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async createReservation(reservationData: any) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.createReservation(reservationData)
    } catch (error) {
      console.error("[Database] Failed to create reservation in Supabase:", error)
      throw new Error(`Failed to create reservation: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async updateReservation(id: string, reservationData: any) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.updateReservation(id, reservationData)
    } catch (error) {
      console.error("[Database] Failed to update reservation in Supabase:", error)
      throw new Error(`Failed to update reservation: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  static async cancelReservation(id: string) {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not properly configured.")
    }

    try {
      return await SupabaseService.cancelReservation(id)
    } catch (error) {
      console.error("[Database] Failed to cancel reservation in Supabase:", error)
      throw new Error(`Failed to cancel reservation: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

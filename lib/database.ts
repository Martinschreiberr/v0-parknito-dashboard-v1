import { SupabaseService } from "./supabase-service"
import {
  companies as staticCompanies,
  locations as staticLocations,
  users as staticUsers,
  spots as staticSpots,
  reservations as staticReservations,
} from "@/data"
import type { Company, Location, UserProfile, Spot, Reservation } from "./supabase"

// Helper to check if Supabase environment variables are configured
function isSupabaseConfigured(): boolean {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!supabaseUrl && !!supabaseAnonKey && supabaseUrl.includes("supabase.co")
}

// Database service functions with Supabase integration and JSON fallback
export class Database {
  static async getCompanies(): Promise<{ companies: Company[]; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const companies = await SupabaseService.getCompanies()
        if (companies && companies.length > 0) {
          return { companies, source: "supabase" }
        } else {
          console.warn("Supabase returned no companies, falling back to JSON.")
          return { companies: staticCompanies as Company[], source: "json" }
        }
      } catch (error) {
        console.error("Error in getCompanies from Supabase, falling back to JSON:", error)
        return { companies: staticCompanies as Company[], source: "json" }
      }
    } else {
      console.warn("Supabase not configured, using JSON data for companies.")
      return { companies: staticCompanies as Company[], source: "json" }
    }
  }

  static async getCompanyById(id: string): Promise<{ company: Company | null; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const company = await SupabaseService.getCompanyById(id)
        if (company) {
          return { company, source: "supabase" }
        } else {
          console.warn(`Supabase returned no company for ID ${id}, falling back to JSON.`)
          const staticCompany = staticCompanies.find((c) => c.id === id) as Company | undefined
          return { company: staticCompany || null, source: "json" }
        }
      } catch (error) {
        console.error(`Error in getCompanyById from Supabase for ID ${id}, falling back to JSON:`, error)
        const staticCompany = staticCompanies.find((c) => c.id === id) as Company | undefined
        return { company: staticCompany || null, source: "json" }
      }
    } else {
      console.warn(`Supabase not configured, using JSON data for company ID ${id}.`)
      const staticCompany = staticCompanies.find((c) => c.id === id) as Company | undefined
      return { company: staticCompany || null, source: "json" }
    }
  }

  static async createCompany(
    companyData: Omit<Company, "id" | "created_at" | "updated_at">,
  ): Promise<{ company: Company | null; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const company = await SupabaseService.createCompany(companyData)
        if (company) {
          return { company, source: "supabase" }
        } else {
          console.warn("Supabase failed to create company, falling back to JSON (simulated).")
          // In a real app, you might not "create" in JSON, but for demo, simulate.
          return {
            company: {
              ...companyData,
              id: "new-json-id",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            source: "json",
          }
        }
      } catch (error) {
        console.error("Error in createCompany from Supabase, falling back to JSON (simulated):", error)
        return {
          company: {
            ...companyData,
            id: "new-json-id",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          source: "json",
        }
      }
    } else {
      console.warn("Supabase not configured, using JSON data for createCompany (simulated).")
      return {
        company: {
          ...companyData,
          id: "new-json-id",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        source: "json",
      }
    }
  }

  static async updateCompany(
    id: string,
    companyData: Partial<Company>,
  ): Promise<{ company: Company | null; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const company = await SupabaseService.updateCompany(id, companyData)
        if (company) {
          return { company, source: "supabase" }
        } else {
          console.warn(`Supabase failed to update company for ID ${id}, falling back to JSON (simulated).`)
          const staticCompany = staticCompanies.find((c) => c.id === id) as Company | undefined
          return { company: staticCompany ? { ...staticCompany, ...companyData } : null, source: "json" }
        }
      } catch (error) {
        console.error(`Error in updateCompany from Supabase for ID ${id}, falling back to JSON (simulated):`, error)
        const staticCompany = staticCompanies.find((c) => c.id === id) as Company | undefined
        return { company: staticCompany ? { ...staticCompany, ...companyData } : null, source: "json" }
      }
    } else {
      console.warn(`Supabase not configured, using JSON data for updateCompany ID ${id} (simulated).`)
      const staticCompany = staticCompanies.find((c) => c.id === id) as Company | undefined
      return { company: staticCompany ? { ...staticCompany, ...companyData } : null, source: "json" }
    }
  }

  static async getUsers(companyId?: string): Promise<{ users: UserProfile[]; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const users = await SupabaseService.getUsers(companyId)
        if (users && users.length > 0) {
          return { users, source: "supabase" }
        } else {
          console.warn("Supabase returned no users, falling back to JSON.")
          return { users: staticUsers as UserProfile[], source: "json" }
        }
      } catch (error) {
        console.error("Error in getUsers from Supabase, falling back to JSON:", error)
        return { users: staticUsers as UserProfile[], source: "json" }
      }
    } else {
      console.warn("Supabase not configured, using JSON data for users.")
      return { users: staticUsers as UserProfile[], source: "json" }
    }
  }

  static async getUserProfile(userId: string): Promise<{ user: UserProfile | null; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const user = await SupabaseService.getUserProfile(userId)
        if (user) {
          return { user, source: "supabase" }
        } else {
          console.warn(`Supabase returned no user profile for ID ${userId}, falling back to JSON.`)
          const staticUser = staticUsers.find((u) => u.id === userId) as UserProfile | undefined
          return { user: staticUser || null, source: "json" }
        }
      } catch (error) {
        console.error(`Error in getUserProfile from Supabase for ID ${userId}, falling back to JSON:`, error)
        const staticUser = staticUsers.find((u) => u.id === userId) as UserProfile | undefined
        return { user: staticUser || null, source: "json" }
      }
    } else {
      console.warn(`Supabase not configured, using JSON data for user profile ID ${userId}.`)
      const staticUser = staticUsers.find((u) => u.id === userId) as UserProfile | undefined
      return { user: staticUser || null, source: "json" }
    }
  }

  static async updateUserProfile(
    userId: string,
    profileData: Partial<UserProfile>,
  ): Promise<{ user: UserProfile | null; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const user = await SupabaseService.updateUserProfile(userId, profileData)
        if (user) {
          return { user, source: "supabase" }
        } else {
          console.warn(`Supabase failed to update user profile for ID ${userId}, falling back to JSON (simulated).`)
          const staticUser = staticUsers.find((u) => u.id === userId) as UserProfile | undefined
          return { user: staticUser ? { ...staticUser, ...profileData } : null, source: "json" }
        }
      } catch (error) {
        console.error(
          `Error in updateUserProfile from Supabase for ID ${userId}, falling back to JSON (simulated):`,
          error,
        )
        const staticUser = staticUsers.find((u) => u.id === userId) as UserProfile | undefined
        return { user: staticUser ? { ...staticUser, ...profileData } : null, source: "json" }
      }
    } else {
      console.warn(`Supabase not configured, using JSON data for updateUserProfile ID ${userId} (simulated).`)
      const staticUser = staticUsers.find((u) => u.id === userId) as UserProfile | undefined
      return { user: staticUser ? { ...staticUser, ...profileData } : null, source: "json" }
    }
  }

  static async getLocations(companyId?: string): Promise<{ locations: Location[]; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const locations = await SupabaseService.getLocations(companyId)
        if (locations && locations.length > 0) {
          return { locations, source: "supabase" }
        } else {
          console.warn("Supabase returned no locations, falling back to JSON.")
          return { locations: staticLocations as Location[], source: "json" }
        }
      } catch (error) {
        console.error("Error in getLocations from Supabase, falling back to JSON:", error)
        return { locations: staticLocations as Location[], source: "json" }
      }
    } else {
      console.warn("Supabase not configured, using JSON data for locations.")
      return { locations: staticLocations as Location[], source: "json" }
    }
  }

  static async getLocationById(id: string): Promise<{ location: Location | null; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const location = await SupabaseService.getLocationById(id)
        if (location) {
          return { location, source: "supabase" }
        } else {
          console.warn(`Supabase returned no location for ID ${id}, falling back to JSON.`)
          const staticLocation = staticLocations.find((l) => l.id === id) as Location | undefined
          return { location: staticLocation || null, source: "json" }
        }
      } catch (error) {
        console.error(`Error in getLocationById from Supabase for ID ${id}, falling back to JSON:`, error)
        const staticLocation = staticLocations.find((l) => l.id === id) as Location | undefined
        return { location: staticLocation || null, source: "json" }
      }
    } else {
      console.warn(`Supabase not configured, using JSON data for location ID ${id}.`)
      const staticLocation = staticLocations.find((l) => l.id === id) as Location | undefined
      return { location: staticLocation || null, source: "json" }
    }
  }

  static async createLocation(
    locationData: Omit<Location, "id" | "created_at" | "updated_at">,
  ): Promise<{ location: Location | null; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const location = await SupabaseService.createLocation(locationData)
        if (location) {
          return { location, source: "supabase" }
        } else {
          console.warn("Supabase failed to create location, falling back to JSON (simulated).")
          return {
            location: {
              ...locationData,
              id: "new-json-id",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            source: "json",
          }
        }
      } catch (error) {
        console.error("Error in createLocation from Supabase, falling back to JSON (simulated):", error)
        return {
          location: {
            ...locationData,
            id: "new-json-id",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          source: "json",
        }
      }
    } else {
      console.warn("Supabase not configured, using JSON data for createLocation (simulated).")
      return {
        location: {
          ...locationData,
          id: "new-json-id",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        source: "json",
      }
    }
  }

  static async getSpots(locationId?: string): Promise<{ spots: Spot[]; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const spots = await SupabaseService.getSpots(locationId)
        if (spots && spots.length > 0) {
          return { spots, source: "supabase" }
        } else {
          console.warn("Supabase returned no spots, falling back to JSON.")
          return { spots: staticSpots as Spot[], source: "json" }
        }
      } catch (error) {
        console.error("Error in getSpots from Supabase, falling back to JSON:", error)
        return { spots: staticSpots as Spot[], source: "json" }
      }
    } else {
      console.warn("Supabase not configured, using JSON data for spots.")
      return { spots: staticSpots as Spot[], source: "json" }
    }
  }

  static async createSpot(
    spotData: Omit<Spot, "id" | "created_at" | "updated_at">,
  ): Promise<{ spot: Spot | null; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const spot = await SupabaseService.createSpot(spotData)
        if (spot) {
          return { spot, source: "supabase" }
        } else {
          console.warn("Supabase failed to create spot, falling back to JSON (simulated).")
          return {
            spot: {
              ...spotData,
              id: "new-json-id",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            source: "json",
          }
        }
      } catch (error) {
        console.error("Error in createSpot from Supabase, falling back to JSON (simulated):", error)
        return {
          spot: {
            ...spotData,
            id: "new-json-id",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          source: "json",
        }
      }
    } else {
      console.warn("Supabase not configured, using JSON data for createSpot (simulated).")
      return {
        spot: {
          ...spotData,
          id: "new-json-id",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        source: "json",
      }
    }
  }

  static async getReservations(
    userId?: string,
    locationId?: string,
  ): Promise<{ reservations: Reservation[]; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const reservations = await SupabaseService.getReservations(userId, locationId)
        if (reservations && reservations.length > 0) {
          return { reservations, source: "supabase" }
        } else {
          console.warn("Supabase returned no reservations, falling back to JSON.")
          return { reservations: staticReservations as Reservation[], source: "json" }
        }
      } catch (error) {
        console.error("Error in getReservations from Supabase, falling back to JSON:", error)
        return { reservations: staticReservations as Reservation[], source: "json" }
      }
    } else {
      console.warn("Supabase not configured, using JSON data for reservations.")
      return { reservations: staticReservations as Reservation[], source: "json" }
    }
  }

  static async createReservation(
    reservationData: Omit<Reservation, "id" | "created_at" | "updated_at">,
  ): Promise<{ reservation: Reservation | null; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const reservation = await SupabaseService.createReservation(reservationData)
        if (reservation) {
          return { reservation, source: "supabase" }
        } else {
          console.warn("Supabase failed to create reservation, falling back to JSON (simulated).")
          return {
            reservation: {
              ...reservationData,
              id: "new-json-id",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            source: "json",
          }
        }
      } catch (error) {
        console.error("Error in createReservation from Supabase, falling back to JSON (simulated):", error)
        return {
          reservation: {
            ...reservationData,
            id: "new-json-id",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          source: "json",
        }
      }
    } else {
      console.warn("Supabase not configured, using JSON data for createReservation (simulated).")
      return {
        reservation: {
          ...reservationData,
          id: "new-json-id",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        source: "json",
      }
    }
  }

  static async updateReservation(
    id: string,
    reservationData: Partial<Reservation>,
  ): Promise<{ reservation: Reservation | null; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const reservation = await SupabaseService.updateReservation(id, reservationData)
        if (reservation) {
          return { reservation, source: "supabase" }
        } else {
          console.warn(`Supabase failed to update reservation for ID ${id}, falling back to JSON (simulated).`)
          const staticReservation = staticReservations.find((r) => r.id === id) as Reservation | undefined
          return {
            reservation: staticReservation ? { ...staticReservation, ...reservationData } : null,
            source: "json",
          }
        }
      } catch (error) {
        console.error(`Error in updateReservation from Supabase for ID ${id}, falling back to JSON (simulated):`, error)
        const staticReservation = staticReservations.find((r) => r.id === id) as Reservation | undefined
        return { reservation: staticReservation ? { ...staticReservation, ...reservationData } : null, source: "json" }
      }
    } else {
      console.warn(`Supabase not configured, using JSON data for updateReservation ID ${id} (simulated).`)
      const staticReservation = staticReservations.find((r) => r.id === id) as Reservation | undefined
      return { reservation: staticReservation ? { ...staticReservation, ...reservationData } : null, source: "json" }
    }
  }

  // New method to get the current database status (Supabase or JSON)
  static async getDatabaseStatus(): Promise<"supabase" | "json"> {
    return isSupabaseConfigured() ? "supabase" : "json"
  }
}

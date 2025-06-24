import { SupabaseService } from "./supabase-service"
import * as jsonData from "@/data"
import type { Company, UserProfile, Location, Spot, Reservation } from "@/types"

// Determine if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-supabase-url" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "your-supabase-anon-key"
  )
}

export class Database {
  // Companies
  static async getCompanies(): Promise<{ companies: Company[]; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const companies = await SupabaseService.getCompanies()
        if (companies && companies.length > 0) {
          console.log("Fetching companies from Supabase.")
          return { companies, source: "supabase" }
        }
        console.warn("Supabase returned no companies, falling back to JSON data.")
      } catch (error) {
        console.error("Error fetching companies from Supabase, falling back to JSON data:", error)
      }
    } else {
      console.log("Supabase not configured, using JSON data for companies.")
    }
    return { companies: jsonData.companies as Company[], source: "json" }
  }

  static async getCompanyById(id: string): Promise<Company | null> {
    if (isSupabaseConfigured()) {
      try {
        const company = await SupabaseService.getCompanyById(id)
        if (company) {
          console.log(`Fetching company ${id} from Supabase.`)
          return company
        }
        console.warn(`Supabase returned no company for ID ${id}, falling back to JSON data.`)
      } catch (error) {
        console.error(`Error fetching company ${id} from Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, using JSON data for company ${id}.`)
    }
    return (jsonData.companies as Company[]).find((c) => c.id === id) || null
  }

  static async createCompany(
    companyData: Omit<Company, "id" | "created_at">,
  ): Promise<{ company: Company | null; source: "supabase" | "json" }> {
    if (isSupabaseConfigured()) {
      try {
        const newCompany = await SupabaseService.createCompany(companyData)
        if (newCompany) {
          console.log("Creating company in Supabase.")
          return { company: newCompany, source: "supabase" }
        }
      } catch (error) {
        console.error("Error creating company in Supabase, falling back to JSON data:", error)
      }
    } else {
      console.log("Supabase not configured, creating company in JSON data (simulated).")
    }
    // Simulate creation for JSON data
    const newId = String(Math.max(...jsonData.companies.map((c) => Number(c.id))) + 1)
    const createdCompany = { ...companyData, id: newId, created_at: new Date().toISOString() } as Company
    jsonData.companies.push(createdCompany) // This won't persist in a real app
    return { company: createdCompany, source: "json" }
  }

  static async updateCompany(id: string, companyData: Partial<Company>): Promise<Company | null> {
    if (isSupabaseConfigured()) {
      try {
        const updatedCompany = await SupabaseService.updateCompany(id, companyData)
        if (updatedCompany) {
          console.log(`Updating company ${id} in Supabase.`)
          return updatedCompany
        }
      } catch (error) {
        console.error(`Error updating company ${id} in Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, updating company ${id} in JSON data (simulated).`)
    }
    const index = (jsonData.companies as Company[]).findIndex((c) => c.id === id)
    if (index !== -1) {
      jsonData.companies[index] = { ...jsonData.companies[index], ...companyData } as Company
      return jsonData.companies[index] as Company
    }
    return null
  }

  static async deleteCompany(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const success = await SupabaseService.deleteCompany(id)
        if (success) {
          console.log(`Deleting company ${id} from Supabase.`)
          return true
        }
      } catch (error) {
        console.error(`Error deleting company ${id} from Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, deleting company ${id} from JSON data (simulated).`)
    }
    const initialLength = (jsonData.companies as Company[]).length
    jsonData.companies = (jsonData.companies as Company[]).filter((c) => c.id !== id)
    return (jsonData.companies as Company[]).length < initialLength
  }

  // Users
  static async getUsers(companyId?: string): Promise<UserProfile[]> {
    if (isSupabaseConfigured()) {
      try {
        const users = await SupabaseService.getUsers(companyId)
        if (users && users.length > 0) {
          console.log("Fetching users from Supabase.")
          return users
        }
        console.warn("Supabase returned no users, falling back to JSON data.")
      } catch (error) {
        console.error("Error fetching users from Supabase, falling back to JSON data:", error)
      }
    } else {
      console.log("Supabase not configured, using JSON data for users.")
    }
    return (jsonData.users as UserProfile[]).filter((user) => !companyId || user.company_id === companyId)
  }

  static async getUserById(id: string): Promise<UserProfile | null> {
    if (isSupabaseConfigured()) {
      try {
        const user = await SupabaseService.getUserProfile(id)
        if (user) {
          console.log(`Fetching user ${id} from Supabase.`)
          return user
        }
        console.warn(`Supabase returned no user for ID ${id}, falling back to JSON data.`)
      } catch (error) {
        console.error(`Error fetching user ${id} from Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, using JSON data for user ${id}.`)
    }
    return (jsonData.users as UserProfile[]).find((u) => u.id === id) || null
  }

  static async createUser(userData: Omit<UserProfile, "id" | "created_at">): Promise<UserProfile | null> {
    if (isSupabaseConfigured()) {
      try {
        const newUser = await SupabaseService.createUser(userData)
        if (newUser) {
          console.log("Creating user in Supabase.")
          return newUser
        }
      } catch (error) {
        console.error("Error creating user in Supabase, falling back to JSON data:", error)
      }
    } else {
      console.log("Supabase not configured, creating user in JSON data (simulated).")
    }
    const newId = String(Math.max(...jsonData.users.map((u) => Number(u.id))) + 1)
    const createdUser = { ...userData, id: newId, created_at: new Date().toISOString() } as UserProfile
    jsonData.users.push(createdUser)
    return createdUser
  }

  static async updateUser(id: string, userData: Partial<UserProfile>): Promise<UserProfile | null> {
    if (isSupabaseConfigured()) {
      try {
        const updatedUser = await SupabaseService.updateUserProfile(id, userData)
        if (updatedUser) {
          console.log(`Updating user ${id} in Supabase.`)
          return updatedUser
        }
      } catch (error) {
        console.error(`Error updating user ${id} in Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, updating user ${id} in JSON data (simulated).`)
    }
    const index = (jsonData.users as UserProfile[]).findIndex((u) => u.id === id)
    if (index !== -1) {
      jsonData.users[index] = { ...jsonData.users[index], ...userData } as UserProfile
      return jsonData.users[index] as UserProfile
    }
    return null
  }

  static async deleteUser(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const success = await SupabaseService.deleteUser(id)
        if (success) {
          console.log(`Deleting user ${id} from Supabase.`)
          return true
        }
      } catch (error) {
        console.error(`Error deleting user ${id} from Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, deleting user ${id} from JSON data (simulated).`)
    }
    const initialLength = (jsonData.users as UserProfile[]).length
    jsonData.users = (jsonData.users as UserProfile[]).filter((u) => u.id !== id)
    return (jsonData.users as UserProfile[]).length < initialLength
  }

  // Locations
  static async getLocations(companyId?: string): Promise<Location[]> {
    if (isSupabaseConfigured()) {
      try {
        const locations = await SupabaseService.getLocations(companyId)
        if (locations && locations.length > 0) {
          console.log("Fetching locations from Supabase.")
          return locations
        }
        console.warn("Supabase returned no locations, falling back to JSON data.")
      } catch (error) {
        console.error("Error fetching locations from Supabase, falling back to JSON data:", error)
      }
    } else {
      console.log("Supabase not configured, using JSON data for locations.")
    }
    return (jsonData.locations as Location[]).filter((loc) => !companyId || loc.company_id === companyId)
  }

  static async getLocationById(id: string): Promise<Location | null> {
    if (isSupabaseConfigured()) {
      try {
        const location = await SupabaseService.getLocationById(id)
        if (location) {
          console.log(`Fetching location ${id} from Supabase.`)
          return location
        }
        console.warn(`Supabase returned no location for ID ${id}, falling back to JSON data.`)
      } catch (error) {
        console.error(`Error fetching location ${id} from Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, using JSON data for location ${id}.`)
    }
    return (jsonData.locations as Location[]).find((l) => l.id === id) || null
  }

  static async createLocation(locationData: Omit<Location, "id" | "created_at">): Promise<Location | null> {
    if (isSupabaseConfigured()) {
      try {
        const newLocation = await SupabaseService.createLocation(locationData)
        if (newLocation) {
          console.log("Creating location in Supabase.")
          return newLocation
        }
      } catch (error) {
        console.error("Error creating location in Supabase, falling back to JSON data:", error)
      }
    } else {
      console.log("Supabase not configured, creating location in JSON data (simulated).")
    }
    const newId = String(Math.max(...jsonData.locations.map((l) => Number(l.id))) + 1)
    const createdLocation = { ...locationData, id: newId, created_at: new Date().toISOString() } as Location
    jsonData.locations.push(createdLocation)
    return createdLocation
  }

  static async updateLocation(id: string, locationData: Partial<Location>): Promise<Location | null> {
    if (isSupabaseConfigured()) {
      try {
        const updatedLocation = await SupabaseService.updateLocation(id, locationData)
        if (updatedLocation) {
          console.log(`Updating location ${id} in Supabase.`)
          return updatedLocation
        }
      } catch (error) {
        console.error(`Error updating location ${id} in Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, updating location ${id} in JSON data (simulated).`)
    }
    const index = (jsonData.locations as Location[]).findIndex((l) => l.id === id)
    if (index !== -1) {
      jsonData.locations[index] = { ...jsonData.locations[index], ...locationData } as Location
      return jsonData.locations[index] as Location
    }
    return null
  }

  static async deleteLocation(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const success = await SupabaseService.deleteLocation(id)
        if (success) {
          console.log(`Deleting location ${id} from Supabase.`)
          return true
        }
      } catch (error) {
        console.error(`Error deleting location ${id} from Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, deleting location ${id} from JSON data (simulated).`)
    }
    const initialLength = (jsonData.locations as Location[]).length
    jsonData.locations = (jsonData.locations as Location[]).filter((l) => l.id !== id)
    return (jsonData.locations as Location[]).length < initialLength
  }

  // Spots
  static async getSpots(locationId?: string): Promise<Spot[]> {
    if (isSupabaseConfigured()) {
      try {
        const spots = await SupabaseService.getSpots(locationId)
        if (spots && spots.length > 0) {
          console.log("Fetching spots from Supabase.")
          return spots
        }
        console.warn("Supabase returned no spots, falling back to JSON data.")
      } catch (error) {
        console.error("Error fetching spots from Supabase, falling back to JSON data:", error)
      }
    } else {
      console.log("Supabase not configured, using JSON data for spots.")
    }
    return (jsonData.spots as Spot[]).filter((spot) => !locationId || spot.location_id === locationId)
  }

  static async getSpotById(id: string): Promise<Spot | null> {
    if (isSupabaseConfigured()) {
      try {
        const spot = await SupabaseService.getSpotById(id)
        if (spot) {
          console.log(`Fetching spot ${id} from Supabase.`)
          return spot
        }
        console.warn(`Supabase returned no spot for ID ${id}, falling back to JSON data.`)
      } catch (error) {
        console.error(`Error fetching spot ${id} from Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, using JSON data for spot ${id}.`)
    }
    return (jsonData.spots as Spot[]).find((s) => s.id === id) || null
  }

  static async createSpot(spotData: Omit<Spot, "id">): Promise<Spot | null> {
    if (isSupabaseConfigured()) {
      try {
        const newSpot = await SupabaseService.createSpot(spotData)
        if (newSpot) {
          console.log("Creating spot in Supabase.")
          return newSpot
        }
      } catch (error) {
        console.error("Error creating spot in Supabase, falling back to JSON data:", error)
      }
    } else {
      console.log("Supabase not configured, creating spot in JSON data (simulated).")
    }
    const newId = String(Math.max(...jsonData.spots.map((s) => Number(s.id))) + 1)
    const createdSpot = { ...spotData, id: newId } as Spot
    jsonData.spots.push(createdSpot)
    return createdSpot
  }

  static async updateSpot(id: string, spotData: Partial<Spot>): Promise<Spot | null> {
    if (isSupabaseConfigured()) {
      try {
        const updatedSpot = await SupabaseService.updateSpot(id, spotData)
        if (updatedSpot) {
          console.log(`Updating spot ${id} in Supabase.`)
          return updatedSpot
        }
      } catch (error) {
        console.error(`Error updating spot ${id} in Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, updating spot ${id} in JSON data (simulated).`)
    }
    const index = (jsonData.spots as Spot[]).findIndex((s) => s.id === id)
    if (index !== -1) {
      jsonData.spots[index] = { ...jsonData.spots[index], ...spotData } as Spot
      return jsonData.spots[index] as Spot
    }
    return null
  }

  static async deleteSpot(id: string): Promise<boolean> {
    if (isSupabaseConfigured()) {
      try {
        const success = await SupabaseService.deleteSpot(id)
        if (success) {
          console.log(`Deleting spot ${id} from Supabase.`)
          return true
        }
      } catch (error) {
        console.error(`Error deleting spot ${id} from Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, deleting spot ${id} from JSON data (simulated).`)
    }
    const initialLength = (jsonData.spots as Spot[]).length
    jsonData.spots = (jsonData.spots as Spot[]).filter((s) => s.id !== id)
    return (jsonData.spots as Spot[]).length < initialLength
  }

  // Reservations
  static async getReservations(userId?: string, locationId?: string): Promise<Reservation[]> {
    if (isSupabaseConfigured()) {
      try {
        const reservations = await SupabaseService.getReservations(userId, locationId)
        if (reservations && reservations.length > 0) {
          console.log("Fetching reservations from Supabase.")
          return reservations
        }
        console.warn("Supabase returned no reservations, falling back to JSON data.")
      } catch (error) {
        console.error("Error fetching reservations from Supabase, falling back to JSON data:", error)
      }
    } else {
      console.log("Supabase not configured, using JSON data for reservations.")
    }
    return (jsonData.reservations as Reservation[]).filter(
      (res) => (!userId || res.user_id === userId) && (!locationId || res.location_id === locationId),
    )
  }

  static async getReservationById(id: string): Promise<Reservation | null> {
    if (isSupabaseConfigured()) {
      try {
        const reservation = await SupabaseService.getReservationById(id)
        if (reservation) {
          console.log(`Fetching reservation ${id} from Supabase.`)
          return reservation
        }
        console.warn(`Supabase returned no reservation for ID ${id}, falling back to JSON data.`)
      } catch (error) {
        console.error(`Error fetching reservation ${id} from Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, using JSON data for reservation ${id}.`)
    }
    return (jsonData.reservations as Reservation[]).find((r) => r.id === id) || null
  }

  static async createReservation(reservationData: Omit<Reservation, "id" | "created_at">): Promise<Reservation | null> {
    if (isSupabaseConfigured()) {
      try {
        const newReservation = await SupabaseService.createReservation(reservationData)
        if (newReservation) {
          console.log("Creating reservation in Supabase.")
          return newReservation
        }
      } catch (error) {
        console.error("Error creating reservation in Supabase, falling back to JSON data:", error)
      }
    } else {
      console.log("Supabase not configured, creating reservation in JSON data (simulated).")
    }
    const newId = String(Math.max(...jsonData.reservations.map((r) => Number(r.id))) + 1)
    const createdReservation = { ...reservationData, id: newId, created_at: new Date().toISOString() } as Reservation
    jsonData.reservations.push(createdReservation)
    return createdReservation
  }

  static async updateReservation(id: string, reservationData: Partial<Reservation>): Promise<Reservation | null> {
    if (isSupabaseConfigured()) {
      try {
        const updatedReservation = await SupabaseService.updateReservation(id, reservationData)
        if (updatedReservation) {
          console.log(`Updating reservation ${id} in Supabase.`)
          return updatedReservation
        }
      } catch (error) {
        console.error(`Error updating reservation ${id} in Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, updating reservation ${id} in JSON data (simulated).`)
    }
    const index = (jsonData.reservations as Reservation[]).findIndex((r) => r.id === id)
    if (index !== -1) {
      jsonData.reservations[index] = { ...jsonData.reservations[index], ...reservationData } as Reservation
      return jsonData.reservations[index] as Reservation
    }
    return null
  }

  static async cancelReservation(id: string): Promise<Reservation | null> {
    if (isSupabaseConfigured()) {
      try {
        const cancelledReservation = await SupabaseService.cancelReservation(id)
        if (cancelledReservation) {
          console.log(`Cancelling reservation ${id} in Supabase.`)
          return cancelledReservation
        }
      } catch (error) {
        console.error(`Error cancelling reservation ${id} in Supabase, falling back to JSON data:`, error)
      }
    } else {
      console.log(`Supabase not configured, cancelling reservation ${id} in JSON data (simulated).`)
    }
    const index = (jsonData.reservations as Reservation[]).findIndex((r) => r.id === id)
    if (index !== -1) {
      jsonData.reservations[index] = { ...jsonData.reservations[index], status: "cancelled" } as Reservation
      return jsonData.reservations[index] as Reservation
    }
    return null
  }
}

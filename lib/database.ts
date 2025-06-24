import { SupabaseService } from "./supabase-service"
import type { Company, Location, UserProfile, Spot, Reservation } from "./supabase"
import type { User } from "@/types" // Import User type from types/index.ts

export class Database {
  // Companies
  static async getCompanies(): Promise<Company[]> {
    try {
      return await SupabaseService.getCompanies()
    } catch (error) {
      console.error("Error fetching companies from Supabase:", error)
      return [] // Return empty array on error
    }
  }

  static async getCompanyById(id: string): Promise<Company | null> {
    try {
      return await SupabaseService.getCompanyById(id)
    } catch (error) {
      console.error("Error fetching company by ID from Supabase:", error)
      return null // Return null on error
    }
  }

  static async createCompany(companyData: Omit<Company, "id" | "created_at">): Promise<Company | null> {
    try {
      // SupabaseService.createCompany expects Omit<Company, "id" | "created_at" | "updated_at">
      // Add a dummy updated_at for type compatibility, Supabase will set its own
      const dataToCreate = { ...companyData, updated_at: new Date().toISOString() }
      return await SupabaseService.createCompany(dataToCreate)
    } catch (error) {
      console.error("Error creating company in Supabase:", error)
      return null // Return null on error
    }
  }

  static async updateCompany(id: string, companyData: Partial<Company>): Promise<Company | null> {
    try {
      return await SupabaseService.updateCompany(id, companyData)
    } catch (error) {
      console.error("Error updating company in Supabase:", error)
      return null // Return null on error
    }
  }

  static async deleteCompany(id: string): Promise<boolean> {
    try {
      return await SupabaseService.deleteCompany(id)
    } catch (error) {
      console.error("Error deleting company in Supabase:", error)
      return false // Return false on error
    }
  }

  // Users
  static async getUsers(): Promise<User[]> {
    try {
      const profiles = await SupabaseService.getUsers()
      // Map Supabase UserProfile to your application's User type
      return profiles.map((profile) => ({
        id: profile.id,
        company_id: profile.company_id || "",
        name: profile.full_name || "",
        email: profile.email || "", // Assuming email is part of UserProfile or can be fetched
        phone: profile.phone || "",
        role: profile.role,
        status: profile.status,
        last_login: profile.last_login || "",
        created_at: profile.created_at,
        updated_at: profile.updated_at,
      }))
    } catch (error) {
      console.error("Error fetching users from Supabase:", error)
      return [] // Return empty array on error
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      const profile = await SupabaseService.getUserProfile(id)
      if (profile) {
        return {
          id: profile.id,
          company_id: profile.company_id || "",
          name: profile.full_name || "",
          email: profile.email || "", // Assuming email is part of UserProfile or can be fetched
          phone: profile.phone || "",
          role: profile.role,
          status: profile.status,
          last_login: profile.last_login || "",
          created_at: profile.created_at,
          updated_at: profile.updated_at,
        }
      }
      return null
    } catch (error) {
      console.error("Error fetching user by ID from Supabase:", error)
      return null // Return null on error
    }
  }

  static async createUser(userData: Omit<User, "id" | "created_at">): Promise<User | null> {
    try {
      // Map your application's User type to Supabase UserProfile type
      const profileData: Omit<UserProfile, "id" | "created_at" | "updated_at"> = {
        full_name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        status: userData.status,
        company_id: userData.company_id,
        last_login: userData.last_login || new Date().toISOString(), // Provide a default if not present
      }
      const newProfile = await SupabaseService.createUser(profileData)
      if (newProfile) {
        return {
          id: newProfile.id,
          company_id: newProfile.company_id || "",
          name: newProfile.full_name || "",
          email: newProfile.email || "",
          phone: newProfile.phone || "",
          role: newProfile.role,
          status: newProfile.status,
          last_login: newProfile.last_login || "",
          created_at: newProfile.created_at,
          updated_at: newProfile.updated_at,
        }
      }
      return null
    } catch (error) {
      console.error("Error creating user in Supabase:", error)
      return null // Return null on error
    }
  }

  static async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    try {
      // Map your application's User type to Supabase UserProfile type
      const profileData: Partial<UserProfile> = {
        full_name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        status: userData.status,
        company_id: userData.company_id,
        last_login: userData.last_login,
      }
      const updatedProfile = await SupabaseService.updateUserProfile(id, profileData)
      if (updatedProfile) {
        return {
          id: updatedProfile.id,
          company_id: updatedProfile.company_id || "",
          name: updatedProfile.full_name || "",
          email: updatedProfile.email || "",
          phone: updatedProfile.phone || "",
          role: updatedProfile.role,
          status: updatedProfile.status,
          last_login: updatedProfile.last_login || "",
          created_at: updatedProfile.created_at,
          updated_at: updatedProfile.updated_at,
        }
      }
      return null
    } catch (error) {
      console.error("Error updating user in Supabase:", error)
      return null // Return null on error
    }
  }

  static async deleteUser(id: string): Promise<boolean> {
    try {
      return await SupabaseService.deleteUser(id)
    } catch (error) {
      console.error("Error deleting user in Supabase:", error)
      return false // Return false on error
    }
  }

  // Locations
  static async getLocations(): Promise<Location[]> {
    try {
      return await SupabaseService.getLocations()
    } catch (error) {
      console.error("Error fetching locations from Supabase:", error)
      return [] // Return empty array on error
    }
  }

  static async getLocationById(id: string): Promise<Location | null> {
    try {
      return await SupabaseService.getLocationById(id)
    } catch (error) {
      console.error("Error fetching location by ID from Supabase:", error)
      return null // Return null on error
    }
  }

  static async getLocationsByCompany(companyId: string): Promise<Location[]> {
    try {
      return await SupabaseService.getLocations(companyId)
    } catch (error) {
      console.error("Error fetching locations by company from Supabase:", error)
      return [] // Return empty array on error
    }
  }

  static async createLocation(locationData: Omit<Location, "id" | "created_at">): Promise<Location | null> {
    try {
      const dataToCreate = { ...locationData, updated_at: new Date().toISOString() }
      return await SupabaseService.createLocation(dataToCreate)
    } catch (error) {
      console.error("Error creating location in Supabase:", error)
      return null // Return null on error
    }
  }

  static async updateLocation(id: string, locationData: Partial<Location>): Promise<Location | null> {
    try {
      return await SupabaseService.updateLocation(id, locationData)
    } catch (error) {
      console.error("Error updating location in Supabase:", error)
      return null // Return null on error
    }
  }

  static async deleteLocation(id: string): Promise<boolean> {
    try {
      return await SupabaseService.deleteLocation(id)
    } catch (error) {
      console.error("Error deleting location in Supabase:", error)
      return false // Return false on error
    }
  }

  // Reservations
  static async getReservations(): Promise<Reservation[]> {
    try {
      return await SupabaseService.getReservations()
    } catch (error) {
      console.error("Error fetching reservations from Supabase:", error)
      return [] // Return empty array on error
    }
  }

  static async getReservationById(id: string): Promise<Reservation | null> {
    try {
      return await SupabaseService.getReservationById(id)
    } catch (error) {
      console.error("Error fetching reservation by ID from Supabase:", error)
      return null // Return null on error
    }
  }

  static async getReservationsByUser(userId: string): Promise<Reservation[]> {
    try {
      return await SupabaseService.getReservations(userId)
    } catch (error) {
      console.error("Error fetching reservations by user from Supabase:", error)
      return [] // Return empty array on error
    }
  }

  static async getReservationsByLocation(locationId: string): Promise<Reservation[]> {
    try {
      return await SupabaseService.getReservations(undefined, locationId)
    } catch (error) {
      console.error("Error fetching reservations by location from Supabase:", error)
      return [] // Return empty array on error
    }
  }

  static async createReservation(reservationData: Omit<Reservation, "id" | "created_at">): Promise<Reservation | null> {
    try {
      const dataToCreate = { ...reservationData, updated_at: new Date().toISOString() }
      return await SupabaseService.createReservation(dataToCreate)
    } catch (error) {
      console.error("Error creating reservation in Supabase:", error)
      return null // Return null on error
    }
  }

  static async updateReservation(id: string, reservationData: Partial<Reservation>): Promise<Reservation | null> {
    try {
      return await SupabaseService.updateReservation(id, reservationData)
    } catch (error) {
      console.error("Error updating reservation in Supabase:", error)
      return null // Return null on error
    }
  }

  static async cancelReservation(id: string): Promise<Reservation | null> {
    try {
      return await SupabaseService.cancelReservation(id)
    } catch (error) {
      console.error("Error cancelling reservation in Supabase:", error)
      return null // Return null on error
    }
  }

  // Spots
  static async getSpots(): Promise<Spot[]> {
    try {
      return await SupabaseService.getSpots()
    } catch (error) {
      console.error("Error fetching spots from Supabase:", error)
      return [] // Return empty array on error
    }
  }

  static async getSpotById(id: string): Promise<Spot | null> {
    try {
      return await SupabaseService.getSpotById(id)
    } catch (error) {
      console.error("Error fetching spot by ID from Supabase:", error)
      return null // Return null on error
    }
  }

  static async getSpotsByLocation(locationId: string): Promise<Spot[]> {
    try {
      return await SupabaseService.getSpots(locationId)
    } catch (error) {
      console.error("Error fetching spots by location from Supabase:", error)
      return [] // Return empty array on error
    }
  }

  static async createSpot(spotData: Omit<Spot, "id">): Promise<Spot | null> {
    try {
      const dataToCreate = { ...spotData, updated_at: new Date().toISOString() }
      return await SupabaseService.createSpot(dataToCreate)
    } catch (error) {
      console.error("Error creating spot in Supabase:", error)
      return null // Return null on error
    }
  }

  static async updateSpot(id: string, spotData: Partial<Spot>): Promise<Spot | null> {
    try {
      return await SupabaseService.updateSpot(id, spotData)
    } catch (error) {
      console.error("Error updating spot in Supabase:", error)
      return null // Return null on error
    }
  }

  static async deleteSpot(id: string): Promise<boolean> {
    try {
      return await SupabaseService.deleteSpot(id)
    } catch (error) {
      console.error("Error deleting spot in Supabase:", error)
      return false // Return false on error
    }
  }
}

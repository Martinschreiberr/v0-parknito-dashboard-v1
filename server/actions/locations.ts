"use server"

import { Database } from "@/lib/database"
import type { Location, PaginationParams, FilterParams, PaginatedResponse } from "@/types"

// Get all locations with pagination and filtering
export async function getLocations(
  pagination: PaginationParams = { page: 1, limit: 10 },
  filters: FilterParams = {},
): Promise<PaginatedResponse<Location>> {
  try {
    const locations = await Database.getLocations()

    // Apply filters
    let filteredLocations = locations

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredLocations = filteredLocations.filter(
        (location: any) =>
          location.name.toLowerCase().includes(searchLower) || location.address.toLowerCase().includes(searchLower),
      )
    }

    if (filters.status) {
      filteredLocations = filteredLocations.filter((location: any) => location.status === filters.status)
    }

    if (filters.company_id) {
      filteredLocations = filteredLocations.filter((location: any) => location.company_id === filters.company_id)
    }

    // Calculate pagination
    const total = filteredLocations.length
    const total_pages = Math.ceil(total / pagination.limit)
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit

    const paginatedLocations = filteredLocations.slice(start, end)

    return {
      data: paginatedLocations,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        total_pages,
      },
    }
  } catch (error) {
    console.error("Error fetching locations:", error)
    throw new Error("Failed to fetch locations")
  }
}

// Get a single location by ID
export async function getLocationById(id: string): Promise<Location | null> {
  try {
    return await Database.getLocationById(id)
  } catch (error) {
    console.error("Error fetching location:", error)
    throw new Error("Failed to fetch location")
  }
}

// Get locations by company ID
export async function getLocationsByCompany(
  companyId: string,
  pagination: PaginationParams = { page: 1, limit: 10 },
): Promise<PaginatedResponse<Location>> {
  try {
    const locations = await Database.getLocationsByCompany(companyId)

    // Calculate pagination
    const total = locations.length
    const total_pages = Math.ceil(total / pagination.limit)
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit

    const paginatedLocations = locations.slice(start, end)

    return {
      data: paginatedLocations,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        total_pages,
      },
    }
  } catch (error) {
    console.error("Error fetching company locations:", error)
    throw new Error("Failed to fetch company locations")
  }
}

// Create a new location
export async function createLocation(locationData: Omit<Location, "id" | "created_at">): Promise<Location> {
  try {
    return await Database.createLocation(locationData)
  } catch (error) {
    console.error("Error creating location:", error)
    throw new Error("Failed to create location")
  }
}

// Update an existing location
export async function updateLocation(id: string, locationData: Partial<Location>): Promise<Location | null> {
  try {
    return await Database.updateLocation(id, locationData)
  } catch (error) {
    console.error("Error updating location:", error)
    throw new Error("Failed to update location")
  }
}

// Delete a location
export async function deleteLocation(id: string): Promise<boolean> {
  try {
    return await Database.deleteLocation(id)
  } catch (error) {
    console.error("Error deleting location:", error)
    throw new Error("Failed to delete location")
  }
}

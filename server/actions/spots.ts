"use server"

import { Database } from "@/lib/database"
import type { Spot, PaginationParams, FilterParams, PaginatedResponse } from "@/types"

// Get all spots with pagination and filtering
export async function getSpots(
  pagination: PaginationParams = { page: 1, limit: 10 },
  filters: FilterParams = {},
): Promise<PaginatedResponse<Spot>> {
  try {
    const spots = await Database.getSpots()

    // Apply filters
    let filteredSpots = spots

    if (filters.status) {
      filteredSpots = filteredSpots.filter((spot: any) => spot.status === filters.status)
    }

    if (filters.location_id) {
      filteredSpots = filteredSpots.filter((spot: any) => spot.location_id === filters.location_id)
    }

    // Calculate pagination
    const total = filteredSpots.length
    const total_pages = Math.ceil(total / pagination.limit)
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit

    const paginatedSpots = filteredSpots.slice(start, end)

    return {
      data: paginatedSpots,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        total_pages,
      },
    }
  } catch (error) {
    console.error("Error fetching spots:", error)
    throw new Error("Failed to fetch spots")
  }
}

// Get a single spot by ID
export async function getSpotById(id: string): Promise<Spot | null> {
  try {
    return await Database.getSpotById(id)
  } catch (error) {
    console.error("Error fetching spot:", error)
    throw new Error("Failed to fetch spot")
  }
}

// Get spots by location ID
export async function getSpotsByLocation(
  locationId: string,
  pagination: PaginationParams = { page: 1, limit: 10 },
): Promise<PaginatedResponse<Spot>> {
  try {
    const spots = await Database.getSpotsByLocation(locationId)

    // Calculate pagination
    const total = spots.length
    const total_pages = Math.ceil(total / pagination.limit)
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit

    const paginatedSpots = spots.slice(start, end)

    return {
      data: paginatedSpots,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        total_pages,
      },
    }
  } catch (error) {
    console.error("Error fetching location spots:", error)
    throw new Error("Failed to fetch location spots")
  }
}

// Create a new spot
export async function createSpot(spotData: Omit<Spot, "id">): Promise<Spot> {
  try {
    return await Database.createSpot(spotData)
  } catch (error) {
    console.error("Error creating spot:", error)
    throw new Error("Failed to create spot")
  }
}

// Update an existing spot
export async function updateSpot(id: string, spotData: Partial<Spot>): Promise<Spot | null> {
  try {
    return await Database.updateSpot(id, spotData)
  } catch (error) {
    console.error("Error updating spot:", error)
    throw new Error("Failed to update spot")
  }
}

// Delete a spot
export async function deleteSpot(id: string): Promise<boolean> {
  try {
    return await Database.deleteSpot(id)
  } catch (error) {
    console.error("Error deleting spot:", error)
    throw new Error("Failed to delete spot")
  }
}

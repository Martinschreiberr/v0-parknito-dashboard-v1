"use server"

import { Database } from "@/lib/database"
import type { Reservation, PaginationParams, FilterParams, PaginatedResponse } from "@/types"

// Get all reservations with pagination and filtering
export async function getReservations(
  pagination: PaginationParams = { page: 1, limit: 10 },
  filters: FilterParams = {},
): Promise<PaginatedResponse<Reservation>> {
  try {
    const reservations = await Database.getReservations()

    // Apply filters
    let filteredReservations = reservations

    if (filters.status) {
      filteredReservations = filteredReservations.filter((reservation: any) => reservation.status === filters.status)
    }

    if (filters.location_id) {
      filteredReservations = filteredReservations.filter(
        (reservation: any) => reservation.location_id === filters.location_id,
      )
    }

    if (filters.start_date) {
      filteredReservations = filteredReservations.filter(
        (reservation: any) => new Date(reservation.start_time) >= new Date(filters.start_date!),
      )
    }

    if (filters.end_date) {
      filteredReservations = filteredReservations.filter(
        (reservation: any) => new Date(reservation.end_time) <= new Date(filters.end_date!),
      )
    }

    // Calculate pagination
    const total = filteredReservations.length
    const total_pages = Math.ceil(total / pagination.limit)
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit

    const paginatedReservations = filteredReservations.slice(start, end)

    return {
      data: paginatedReservations,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        total_pages,
      },
    }
  } catch (error) {
    console.error("Error fetching reservations:", error)
    throw new Error("Failed to fetch reservations")
  }
}

// Get a single reservation by ID
export async function getReservationById(id: string): Promise<Reservation | null> {
  try {
    return await Database.getReservationById(id)
  } catch (error) {
    console.error("Error fetching reservation:", error)
    throw new Error("Failed to fetch reservation")
  }
}

// Get reservations by user ID
export async function getReservationsByUser(
  userId: string,
  pagination: PaginationParams = { page: 1, limit: 10 },
): Promise<PaginatedResponse<Reservation>> {
  try {
    const reservations = await Database.getReservationsByUser(userId)

    // Calculate pagination
    const total = reservations.length
    const total_pages = Math.ceil(total / pagination.limit)
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit

    const paginatedReservations = reservations.slice(start, end)

    return {
      data: paginatedReservations,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        total_pages,
      },
    }
  } catch (error) {
    console.error("Error fetching user reservations:", error)
    throw new Error("Failed to fetch user reservations")
  }
}

// Get reservations by location ID
export async function getReservationsByLocation(
  locationId: string,
  pagination: PaginationParams = { page: 1, limit: 10 },
): Promise<PaginatedResponse<Reservation>> {
  try {
    const reservations = await Database.getReservationsByLocation(locationId)

    // Calculate pagination
    const total = reservations.length
    const total_pages = Math.ceil(total / pagination.limit)
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit

    const paginatedReservations = reservations.slice(start, end)

    return {
      data: paginatedReservations,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        total_pages,
      },
    }
  } catch (error) {
    console.error("Error fetching location reservations:", error)
    throw new Error("Failed to fetch location reservations")
  }
}

// Create a new reservation
export async function createReservation(reservationData: Omit<Reservation, "id" | "created_at">): Promise<Reservation> {
  try {
    return await Database.createReservation(reservationData)
  } catch (error) {
    console.error("Error creating reservation:", error)
    throw new Error("Failed to create reservation")
  }
}

// Update an existing reservation
export async function updateReservation(
  id: string,
  reservationData: Partial<Reservation>,
): Promise<Reservation | null> {
  try {
    return await Database.updateReservation(id, reservationData)
  } catch (error) {
    console.error("Error updating reservation:", error)
    throw new Error("Failed to update reservation")
  }
}

// Cancel a reservation
export async function cancelReservation(id: string): Promise<Reservation | null> {
  try {
    return await Database.cancelReservation(id)
  } catch (error) {
    console.error("Error cancelling reservation:", error)
    throw new Error("Failed to cancel reservation")
  }
}

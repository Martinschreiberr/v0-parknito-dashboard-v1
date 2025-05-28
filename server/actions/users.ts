"use server"

import { Database } from "@/lib/database"
import type { User, PaginationParams, FilterParams, PaginatedResponse } from "@/types"

// Get all users with pagination and filtering
export async function getUsers(
  pagination: PaginationParams = { page: 1, limit: 10 },
  filters: FilterParams = {},
): Promise<PaginatedResponse<User>> {
  try {
    const users = await Database.getUsers()

    // Apply filters
    let filteredUsers = users

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredUsers = filteredUsers.filter(
        (user: any) => user.name.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower),
      )
    }

    if (filters.status) {
      filteredUsers = filteredUsers.filter((user: any) => user.status === filters.status)
    }

    if (filters.company_id) {
      filteredUsers = filteredUsers.filter((user: any) => user.company_id === filters.company_id)
    }

    // Calculate pagination
    const total = filteredUsers.length
    const total_pages = Math.ceil(total / pagination.limit)
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit

    const paginatedUsers = filteredUsers.slice(start, end)

    return {
      data: paginatedUsers,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        total_pages,
      },
    }
  } catch (error) {
    console.error("Error fetching users:", error)
    throw new Error("Failed to fetch users")
  }
}

// Get a single user by ID
export async function getUserById(id: string): Promise<User | null> {
  try {
    return await Database.getUserById(id)
  } catch (error) {
    console.error("Error fetching user:", error)
    throw new Error("Failed to fetch user")
  }
}

// Create a new user
export async function createUser(userData: Omit<User, "id" | "created_at">): Promise<User> {
  try {
    return await Database.createUser(userData)
  } catch (error) {
    console.error("Error creating user:", error)
    throw new Error("Failed to create user")
  }
}

// Update an existing user
export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  try {
    return await Database.updateUser(id, userData)
  } catch (error) {
    console.error("Error updating user:", error)
    throw new Error("Failed to update user")
  }
}

// Delete a user
export async function deleteUser(id: string): Promise<boolean> {
  try {
    return await Database.deleteUser(id)
  } catch (error) {
    console.error("Error deleting user:", error)
    throw new Error("Failed to delete user")
  }
}

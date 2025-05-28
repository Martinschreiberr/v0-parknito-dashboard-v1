"use server"

import { Database } from "@/lib/database"
import type { Company, PaginationParams, FilterParams, PaginatedResponse } from "@/types"

// Get all companies with pagination and filtering
export async function getCompanies(
  pagination: PaginationParams = { page: 1, limit: 10 },
  filters: FilterParams = {},
): Promise<PaginatedResponse<Company>> {
  try {
    const companies = await Database.getCompanies()

    // Apply filters
    let filteredCompanies = companies

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredCompanies = filteredCompanies.filter(
        (company: any) =>
          company.name.toLowerCase().includes(searchLower) || company.contact_email.toLowerCase().includes(searchLower),
      )
    }

    if (filters.status) {
      filteredCompanies = filteredCompanies.filter((company: any) => company.status === filters.status)
    }

    // Calculate pagination
    const total = filteredCompanies.length
    const total_pages = Math.ceil(total / pagination.limit)
    const start = (pagination.page - 1) * pagination.limit
    const end = start + pagination.limit

    const paginatedCompanies = filteredCompanies.slice(start, end)

    return {
      data: paginatedCompanies,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        total_pages,
      },
    }
  } catch (error) {
    console.error("Error fetching companies:", error)
    throw new Error("Failed to fetch companies")
  }
}

// Get a single company by ID
export async function getCompanyById(id: string): Promise<Company | null> {
  try {
    return await Database.getCompanyById(id)
  } catch (error) {
    console.error("Error fetching company:", error)
    throw new Error("Failed to fetch company")
  }
}

// Create a new company
export async function createCompany(companyData: Omit<Company, "id" | "created_at">): Promise<Company> {
  try {
    return await Database.createCompany(companyData)
  } catch (error) {
    console.error("Error creating company:", error)
    throw new Error("Failed to create company")
  }
}

// Update an existing company
export async function updateCompany(id: string, companyData: Partial<Company>): Promise<Company | null> {
  try {
    return await Database.updateCompany(id, companyData)
  } catch (error) {
    console.error("Error updating company:", error)
    throw new Error("Failed to update company")
  }
}

// Delete a company
export async function deleteCompany(id: string): Promise<boolean> {
  try {
    return await Database.deleteCompany(id)
  } catch (error) {
    console.error("Error deleting company:", error)
    throw new Error("Failed to delete company")
  }
}

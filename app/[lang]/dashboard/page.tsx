import { redirect } from "next/navigation"
import { Database } from "@/lib/database"

interface DashboardRedirectProps {
  params: { lang: string }
}

export default async function DashboardRedirect({ params }: DashboardRedirectProps) {
  let companies: any[] = []

  try {
    // Fetch companies from external data folder
    companies = await Database.getCompanies()
  } catch (error) {
    console.error("Error fetching companies:", error)
    // If database fails, redirect to hardcoded company ID
    redirect(`/${params.lang}/dashboard/1/overview`)
  }

  // If companies exist, redirect to the first active one
  if (companies && companies.length > 0) {
    const activeCompany = companies.find((company: any) => company.status === "active")
    const defaultCompany = activeCompany || companies[0]
    redirect(`/${params.lang}/dashboard/${defaultCompany.id}/overview`)
  }

  // If no companies exist, create a default one
  let newCompany: any
  try {
    newCompany = await Database.createCompany({
      name: "Default Company",
      email: "admin@company.com",
      phone: "+1-555-0123",
      address: "123 Business St, City, State 12345",
      subscription_plan: "basic",
      status: "active",
      location_count: 0,
      user_count: 1,
      monthly_revenue: 0,
    })
  } catch (createError) {
    console.error("Error creating default company:", createError)
    // Final fallback
    redirect(`/${params.lang}/dashboard/1/overview`)
  }

  // Redirect to the new company
  redirect(`/${params.lang}/dashboard/${newCompany.id}/overview`)
}

// Generate static params for all supported languages
export async function generateStaticParams() {
  return [{ lang: "en-us" }, { lang: "cs-cz" }]
}

// Add metadata for the page
export const metadata = {
  title: "Dashboard",
  description: "Parking Management Dashboard",
}

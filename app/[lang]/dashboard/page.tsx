import { redirect } from "next/navigation"
import { Database } from "@/lib/database"

interface DashboardRedirectProps {
  params: { lang: string }
}

export default async function DashboardRedirect({ params }: DashboardRedirectProps) {
  let companies: any[] = []
  let defaultCompanyId: string | null = null
  let dataSource: "supabase" | "json" = "json" // Default to JSON

  try {
    const result = await Database.getCompanies()
    companies = result.companies
    dataSource = result.source
    console.log(`DashboardRedirect: Companies fetched from ${dataSource} source.`)
  } catch (error) {
    console.error("DashboardRedirect: Unexpected error during company fetch, ensuring JSON fallback.", error)
    // The Database.getCompanies already handles fallback, so this catch is for truly unexpected errors.
    const result = await Database.getCompanies() // Re-call to ensure JSON fallback is used
    companies = result.companies
    dataSource = result.source
    console.log(`DashboardRedirect: Recovered to fetch companies from ${dataSource} source after error.`)
  }

  // If companies exist, try to redirect to the first active one or the first available
  if (companies && companies.length > 0) {
    const activeCompany = companies.find((company: any) => company.status === "active")
    const companyToRedirect = activeCompany || companies[0]
    defaultCompanyId = companyToRedirect.id
  }

  // If no companies found or determined, try to create a default one
  if (!defaultCompanyId) {
    let newCompanyResult: { company: any | null; source: "supabase" | "json" }
    try {
      newCompanyResult = await Database.createCompany({
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
      if (newCompanyResult.company && newCompanyResult.company.id) {
        defaultCompanyId = newCompanyResult.company.id
        console.log(
          `DashboardRedirect: Created new default company with ID: ${defaultCompanyId} from ${newCompanyResult.source} source.`,
        )
      } else {
        console.warn(
          "DashboardRedirect: Database.createCompany did not return a valid company ID, falling back to hardcoded ID.",
        )
      }
    } catch (createError) {
      console.error("DashboardRedirect: Error creating default company, falling back to hardcoded ID.", createError)
    }
  }

  // Final fallback: if no company ID could be determined, use a hardcoded one.
  // This ensures a redirect always happens.
  if (!defaultCompanyId) {
    console.warn(
      "DashboardRedirect: No company ID could be determined after all attempts, redirecting to hardcoded ID '1'.",
    )
    defaultCompanyId = "1" // Hardcoded fallback ID
  }

  redirect(`/${params.lang}/dashboard/${defaultCompanyId}/overview`)
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

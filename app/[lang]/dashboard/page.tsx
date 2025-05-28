import { redirect } from "next/navigation"
import { Database } from "@/lib/database"

interface DashboardRedirectProps {
  params: { lang: string }
}

export default async function DashboardRedirect({ params }: DashboardRedirectProps) {
  try {
    // Fetch companies from external data folder
    const companies = await Database.getCompanies()

    // If companies exist, redirect to the first active one
    if (companies && companies.length > 0) {
      const activeCompany = companies.find((company: any) => company.status === "active")
      const defaultCompany = activeCompany || companies[0]
      redirect(`/${params.lang}/dashboard/${defaultCompany.id}/overview`)
    }

    // If no companies exist, create a default one
    const newCompany = await Database.createCompany({
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

    // Redirect to the new company (this will throw a redirect error, which is expected)
    redirect(`/${params.lang}/dashboard/${newCompany.id}/overview`)
  } catch (error: any) {
    // Check if this is a Next.js redirect error (which is expected behavior)
    if (error?.digest?.includes("NEXT_REDIRECT")) {
      // Re-throw redirect errors as they are expected
      throw error
    }

    console.error("Error in dashboard redirect:", error)
    // Final fallback for any other errors
    redirect(`/${params.lang}/dashboard/1/overview`)
  }
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

import { redirect } from "next/navigation"
import { Database } from "@/lib/database"

interface DashboardRedirectProps {
  params: { lang: string }
}

export default async function DashboardRedirect({ params }: DashboardRedirectProps) {
  try {
    console.log("[DashboardRedirect] Fetching companies...")
    const companies = await Database.getCompanies()
    
    if (companies && companies.length > 0) {
      // Find the first active company or use the first available
      const activeCompany = companies.find((company: any) => company.status === "active")
      const companyToRedirect = activeCompany || companies[0]
      
      console.log(`[DashboardRedirect] Redirecting to company: ${companyToRedirect.id}`)
      redirect(`/${params.lang}/dashboard/${companyToRedirect.id}/overview`)
    } else {
      // No companies found, redirect to setup
      console.log("[DashboardRedirect] No companies found, redirecting to setup")
      redirect(`/${params.lang}/setup`)
    }
  } catch (error) {
    console.error("[DashboardRedirect] Error fetching companies:", error)
    
    // If it's a configuration error, show a helpful message
    if (error instanceof Error && error.message.includes("Supabase is not properly configured")) {
      throw new Error(
        "Database connection failed. Please ensure your Supabase environment variables are properly configured: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_JWT_SECRET."
      )
    }
    
    // For other errors, redirect to setup
    redirect(`/${params.lang}/setup`)
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

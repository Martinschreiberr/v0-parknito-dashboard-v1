import { type NextRequest, NextResponse } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

// Define supported languages with hyphen format
export const supportedLanguages = ["en-us", "cs-cz"]
export const defaultLanguage = "en-us"

// Language names for display
export const languageNames = {
  "en-us": "English",
  "cs-cz": "Čeština",
}

// Function to get the preferred language from request headers
function getLocale(request: NextRequest) {
  // Negotiator expects a plain object, but headers is a Headers instance
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get the best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  // Convert browser language codes to our format (e.g., en-US -> en-us)
  const formattedLanguages = languages.map((lang) => {
    return lang.toLowerCase()
  })

  // Try to match with our supported languages
  try {
    return match(formattedLanguages, supportedLanguages, defaultLanguage)
  } catch (error) {
    return defaultLanguage
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname already has a language prefix
  const pathnameHasLanguage = supportedLanguages.some(
    (language) => pathname.startsWith(`/${language}/`) || pathname === `/${language}`,
  )

  if (pathnameHasLanguage) return

  // Special case for dashboard path
  if (pathname.startsWith("/dashboard")) {
    const locale = getLocale(request)

    // Extract company ID if present
    const dashboardMatch = pathname.match(/\/dashboard\/([^/]+)/)
    const companyId = dashboardMatch ? dashboardMatch[1] : "1" // Default to company ID 1 if not specified

    if (dashboardMatch) {
      // If company ID is in the path, preserve the rest of the path
      const restOfPath = pathname.substring(pathname.indexOf(companyId) + companyId.length)
      request.nextUrl.pathname = `/${locale}/dashboard/${companyId}${restOfPath}`
    } else {
      // If no company ID, redirect to overview with default company ID
      request.nextUrl.pathname = `/${locale}/dashboard/1/overview`
    }

    return NextResponse.redirect(request.nextUrl)
  }

  // Handle old routes and redirect to new structure
  if (pathname === "/companies") {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}/dashboard/1/companies`
    return NextResponse.redirect(request.nextUrl)
  }

  if (pathname === "/locations") {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}/dashboard/1/locations`
    return NextResponse.redirect(request.nextUrl)
  }

  if (pathname === "/reservations") {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}/dashboard/1/reservations`
    return NextResponse.redirect(request.nextUrl)
  }

  if (pathname === "/users") {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}/dashboard/1/users`
    return NextResponse.redirect(request.nextUrl)
  }

  if (pathname === "/reports") {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}/dashboard/1/reports`
    return NextResponse.redirect(request.nextUrl)
  }

  // Redirect if there is no language prefix
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
}

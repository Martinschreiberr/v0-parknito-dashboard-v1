import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

const locales = ["en-us", "cs-cz"]
const defaultLocale = "en-us"

function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    return defaultLocale
  }

  return locales.find((locale) => pathname.startsWith(`/${locale}`)) || defaultLocale
}

export async function middleware(request: NextRequest) {
  console.log(`[Middleware] Processing: ${request.nextUrl.pathname}`)

  try {
    // Handle locale routing
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      console.log(`[Middleware] Redirecting to add locale: ${pathname}`)
      return NextResponse.redirect(
        new URL(`/${defaultLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url),
      )
    }

    // Create response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    // Only try Supabase auth if environment variables are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value
            },
            set(name: string, value: string, options: any) {
              request.cookies.set({
                name,
                value,
                ...options,
              })
              response = NextResponse.next({
                request: {
                  headers: request.headers,
                },
              })
              response.cookies.set({
                name,
                value,
                ...options,
              })
            },
            remove(name: string, options: any) {
              request.cookies.set({
                name,
                value: "",
                ...options,
              })
              response = NextResponse.next({
                request: {
                  headers: request.headers,
                },
              })
              response.cookies.set({
                name,
                value: "",
                ...options,
              })
            },
          },
        })

        // Get user session
        const {
          data: { user },
        } = await supabase.auth.getUser()
        console.log(`[Middleware] User status: ${user ? "authenticated" : "not authenticated"}`)
      } catch (authError) {
        console.log(`[Middleware] Auth check failed:`, authError)
        // Continue without auth - don't block the request
      }
    } else {
      console.log(`[Middleware] Supabase not configured - continuing without auth`)
    }

    return response
  } catch (error) {
    console.error(`[Middleware] Critical error:`, error)
    // Return a basic response to prevent complete failure
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

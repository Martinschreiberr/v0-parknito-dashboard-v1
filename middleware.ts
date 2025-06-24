import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

// Language configuration
export const locales = ["en-us", "cs-cz"] as const
export const defaultLanguage = "en-us" as const

// Check if Supabase is configured
function isSupabaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-supabase-url" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "your-supabase-anon-key"
  )
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const pathname = request.nextUrl.pathname

  // Handle language routing first
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  // Handle authentication only if Supabase is configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              const cookie = request.cookies.get(name)
              console.log(
                `[Middleware] Cookie GET: name='${name}', value='${cookie?.value ? cookie.value.substring(0, 10) + "..." : "null"}'`,
              )
              return cookie?.value
            },
            set(name: string, value: string, options: any) {
              console.log(`[Middleware] Cookie SET: name='${name}', value='${value.substring(0, 10)}...'`)
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
              console.log(`[Middleware] Cookie REMOVE: name='${name}'`)
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
          // Explicitly set the cookie name prefix to ensure consistency
          // This must match the client-side configuration in lib/supabase-client.ts
          cookieOptions: {
            name: "sb",
          },
        },
      )

      // Check if user is authenticated for protected routes
      const isProtectedRoute = pathname.includes("/dashboard")
      const isAuthRoute =
        pathname.includes("/login") || pathname.includes("/signup") || pathname.includes("/reset-password")

      if (isProtectedRoute) {
        console.log(`[Middleware] Checking protected route: ${pathname}`)

        try {
          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser()

          if (userError) {
            console.log(`[Middleware] Error getting user for protected route: ${userError.message}`)
          }
          console.log(`[Middleware] Protected route (${pathname}): User ID - ${user ? user.id : "null"}`)

          if (!user) {
            const locale = pathname.split("/")[1]
            console.log(`[Middleware] User not found for protected route, redirecting to /${locale}/login`)
            return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
          }
        } catch (error) {
          console.error(`[Middleware] Exception checking user for protected route:`, error)
          const locale = pathname.split("/")[1]
          return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
        }
      }

      if (isAuthRoute) {
        console.log(`[Middleware] Checking auth route: ${pathname}`)

        try {
          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser()

          if (userError) {
            console.log(`[Middleware] Error getting user for auth route: ${userError.message}`)
          }
          console.log(`[Middleware] Auth route (${pathname}): User ID - ${user ? user.id : "null"}`)

          if (user) {
            const locale = pathname.split("/")[1]
            console.log(`[Middleware] User found on auth route, redirecting to /${locale}/dashboard`)
            return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
          }
        } catch (error) {
          console.error(`[Middleware] Exception checking user for auth route:`, error)
          // Continue to auth route if there's an error
        }
      }
    } catch (error) {
      console.error("[Middleware] Auth middleware caught unexpected error:", error)
      // Continue without auth if there's an error
    }
  } else {
    console.log("[Middleware] Supabase not configured or public route, skipping authentication middleware")
  }

  return response
}

function getLocale(request: NextRequest): string {
  // Check if any of the supported locales are in the pathname
  const pathname = request.nextUrl.pathname
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale
    }
  }

  // Get the preferred locale from the Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    // Simple language detection - you might want to use a library for more robust detection
    if (acceptLanguage.includes("cs")) {
      return "cs-cz"
    }
  }

  return defaultLanguage
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. Please ensure they are configured in your Vercel project.",
  )
  // Throw an error to prevent the application from proceeding with an unconfigured Supabase client
  throw new Error("Supabase environment variables missing in lib/supabase-client.ts.")
}

// Declare a global variable to store the Supabase client instance
// This helps prevent multiple instances during hot module reloads in development
declare global {
  var supabaseInstance: ReturnType<typeof createClient> | undefined
}

// Ensure the client is only created once, even with hot module reloading
export const supabase =
  globalThis.supabaseInstance ||
  createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      cookieOptions: {
        name: "sb", // Ensure consistent cookie naming for client-side
      },
    },
  })

// Store the instance globally to prevent re-creation on HMR
globalThis.supabaseInstance = supabase

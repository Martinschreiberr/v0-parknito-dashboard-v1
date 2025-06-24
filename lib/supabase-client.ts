import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Explicitly set the cookie name prefix to ensure consistency
    // This will result in cookies like 'sb-access-token', 'sb-refresh-token'
    cookieOptions: {
      name: "sb",
    },
  },
})

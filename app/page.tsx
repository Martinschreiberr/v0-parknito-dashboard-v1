import { redirect } from "next/navigation"
import { defaultLanguage } from "@/middleware"

// Redirect from the root to the default language
export default function RootPage() {
  redirect(`/${defaultLanguage}`)
}

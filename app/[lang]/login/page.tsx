import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { getDictionary } from "@/lib/dictionary"

export const metadata: Metadata = {
  title: "Login - ParkSmart",
  description: "Login to your ParkSmart account",
}

export default async function LoginPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <LoginForm dict={dict.auth || {}} lang={params.lang} />
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { getDictionary } from "@/lib/dictionary"

export const metadata: Metadata = {
  title: "Reset Password - ParkSmart",
  description: "Reset your ParkSmart account password",
}

export default async function ResetPasswordPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <ResetPasswordForm dict={dict.auth || {}} lang={params.lang} />
      </div>
    </div>
  )
}

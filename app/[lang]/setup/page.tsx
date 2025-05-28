import { redirect } from "next/navigation"
import { Database } from "@/lib/database"
import { getDictionary } from "@/lib/dictionary"
import { SetupForm } from "@/components/setup/setup-form"

interface SetupPageProps {
  params: { lang: string }
}

export default async function SetupPage({ params }: SetupPageProps) {
  const dict = await getDictionary(params.lang)

  // Check if companies already exist
  const companies = await Database.getCompanies()
  if (companies.length > 0) {
    // If companies exist, redirect to dashboard
    redirect(`/${params.lang}/dashboard`)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ParkingOS</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {dict?.setup?.title || "Welcome to ParkingOS"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {dict?.setup?.description || "Let's set up your first company to get started"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SetupForm dict={dict} lang={params.lang} />
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: "Setup - ParkingOS",
  description: "Set up your parking management system",
}

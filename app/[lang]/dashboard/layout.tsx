import type React from "react"
import { getDictionary } from "@/lib/dictionary"
import { ParkingDashboardLayout } from "@/components/layout"

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang)

  // Extract company ID from the URL if available
  const companyId = "1" // Default company ID

  return (
    <ParkingDashboardLayout dict={dict} lang={params.lang} companyId={companyId}>
      {children}
    </ParkingDashboardLayout>
  )
}

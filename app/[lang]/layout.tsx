import type React from "react"
import { Inter } from "next/font/google"
import { getDictionary } from "@/lib/dictionary"
import { AuthProvider } from "@/lib/auth"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <html lang={params.lang} className={inter.className}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

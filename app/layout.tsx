import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ParkSmart - Parking Management Platform",
  description: "Modern multi-tenant SaaS parking management platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}


import './globals.css'

"use client"

import { useState, useEffect } from "react"
import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Building2, MapPin, Calendar, Users, BarChart3, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock company data
const companies = [
  { id: "1", name: "Acme Corp" },
  { id: "2", name: "Globex Corporation" },
  { id: "3", name: "Initech" },
  { id: "4", name: "Umbrella Corporation" },
]

interface ParkingDashboardLayoutProps {
  children: React.ReactNode
  dict: any
  lang: string
  companyId?: string
}

export function ParkingDashboardLayout({ children, dict, lang, companyId = "1" }: ParkingDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Extract company ID from pathname if not provided
  const extractedCompanyId = pathname.match(/\/dashboard\/([^/]+)/)?.[1] || companyId

  // Create navigation object with fallbacks
  const nav = {
    overview: dict?.nav?.overview || "Overview",
    companies: dict?.nav?.companies || "Companies",
    locations: dict?.nav?.locations || "Locations",
    reservations: dict?.nav?.reservations || "Reservations",
    users: dict?.nav?.users || "Users",
    reports: dict?.nav?.reports || "Reports",
    home: dict?.nav?.home || "Home",
    company_switcher: dict?.nav?.company_switcher || "Switch Company",
  }

  // Navigation items
  const navigation = [
    {
      name: nav.overview,
      href: `/${lang}/dashboard/${extractedCompanyId}/overview`,
      icon: LayoutDashboard,
    },
    {
      name: nav.companies,
      href: `/${lang}/dashboard/${extractedCompanyId}/companies`,
      icon: Building2,
    },
    {
      name: nav.locations,
      href: `/${lang}/dashboard/${extractedCompanyId}/locations`,
      icon: MapPin,
    },
    {
      name: nav.reservations,
      href: `/${lang}/dashboard/${extractedCompanyId}/reservations`,
      icon: Calendar,
    },
    {
      name: nav.users,
      href: `/${lang}/dashboard/${extractedCompanyId}/users`,
      icon: Users,
    },
    {
      name: nav.reports,
      href: `/${lang}/dashboard/${extractedCompanyId}/reports`,
      icon: BarChart3,
    },
  ]

  // Handle company change
  const handleCompanyChange = (value: string) => {
    const pathParts = pathname.split("/")
    const currentSection = pathParts[pathParts.length - 1] || "overview"
    router.push(`/${lang}/dashboard/${value}/${currentSection}`)
  }

  // Handle mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Find current company
  const currentCompany = companies.find((company) => company.id === extractedCompanyId) || companies[0]

  if (!mounted) {
    return (
      <div className="flex min-h-screen">
        <div className="w-64 border-r bg-gray-100/40">
          <div className="flex h-14 items-center border-b px-4">
            <span className="text-lg font-semibold tracking-tight">ParkSmart</span>
          </div>
        </div>
        <div className="flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4">
            <div className="flex-1" />
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "border-r bg-gray-100/40 transition-all duration-300 ease-in-out",
          "fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0",
          sidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:w-16 lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-14 items-center border-b px-4">
            <Link href={`/${lang}/dashboard/${extractedCompanyId}/overview`} className="font-semibold">
              <span
                className={cn(
                  "text-lg tracking-tight transition-opacity duration-300",
                  sidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-0",
                )}
              >
                ParkSmart
              </span>
            </Link>
          </div>

          {/* Company Switcher */}
          {sidebarOpen && (
            <div className="border-b p-4">
              <label className="text-xs font-medium text-gray-500 mb-2 block">{nav.company_switcher}</label>
              <Select value={extractedCompanyId} onValueChange={handleCompanyChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-gray-200 text-gray-900 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                      !sidebarOpen && "lg:justify-center lg:px-2",
                    )}
                    title={!sidebarOpen ? item.name : undefined}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span
                      className={cn(
                        "transition-opacity duration-300",
                        sidebarOpen ? "opacity-100" : "opacity-0 lg:opacity-0",
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6">
          {/* Sidebar Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            className="flex-shrink-0"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLang={lang} />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

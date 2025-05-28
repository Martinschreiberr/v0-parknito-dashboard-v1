"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Menu, X, Car } from "lucide-react"

interface NavbarProps {
  dict?: {
    features?: string
    pricing?: string
    about?: string
    contact?: string
    login?: string
    signup?: string
    dashboard?: string
  }
  lang?: string
}

export const LandingNavbar = ({ dict, lang = "en" }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ParkSmart</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 md:flex">
          <Link
            href={`/${lang}#features`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {dict?.features || "Features"}
          </Link>
          <Link
            href={`/${lang}#pricing`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {dict?.pricing || "Pricing"}
          </Link>
          <Link
            href={`/${lang}#about`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {dict?.about || "About"}
          </Link>
          <Link
            href={`/${lang}#contact`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {dict?.contact || "Contact"}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center space-x-4 md:flex">
          <LanguageSwitcher currentLang={lang} />
          <Link href={`/${lang}/login`}>
            <Button variant="ghost" size="sm">
              {dict?.login || "Login"}
            </Button>
          </Link>
          <Link href={`/${lang}/dashboard`}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              {dict?.dashboard || "Dashboard"}
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center space-x-2 md:hidden">
          <LanguageSwitcher currentLang={lang} />
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-4">
            <Link
              href={`/${lang}#features`}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {dict?.features || "Features"}
            </Link>
            <Link
              href={`/${lang}#pricing`}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {dict?.pricing || "Pricing"}
            </Link>
            <Link
              href={`/${lang}#about`}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {dict?.about || "About"}
            </Link>
            <Link
              href={`/${lang}#contact`}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {dict?.contact || "Contact"}
            </Link>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <Link href={`/${lang}/login`}>
                <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                  {dict?.login || "Login"}
                </Button>
              </Link>
              <Link href={`/${lang}/dashboard`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsOpen(false)}>
                  {dict?.dashboard || "Dashboard"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

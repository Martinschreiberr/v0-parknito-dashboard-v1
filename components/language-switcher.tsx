"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe } from "lucide-react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// Language names for display
const languageNames: Record<string, string> = {
  "en-us": "English",
  "cs-cz": "Čeština",
}

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Safely handle pathname and currentLang
  const safePathname = pathname || "/"
  const safeCurrentLang = currentLang || "en-us"

  // Normalize the current language to ensure it's in the correct format
  const normalizedCurrentLang = safeCurrentLang.replace("_", "-").toLowerCase()

  // Get all supported languages
  const languages = Object.keys(languageNames)

  // Create paths for each language
  const paths = languages.map((lang) => {
    // Split pathname into segments
    const segments = safePathname.split("/").filter(Boolean)

    // If the first segment is a language code, replace it
    if (segments.length > 0 && Object.keys(languageNames).includes(segments[0])) {
      segments[0] = lang
    } else {
      // If no language segment exists, prepend the new language
      segments.unshift(lang)
    }

    // Reconstruct the path
    return "/" + segments.join("/")
  })

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang, i) => (
          <DropdownMenuItem key={lang} asChild>
            <Link
              href={paths[i] || `/${lang}`}
              className={normalizedCurrentLang === lang ? "font-bold" : ""}
              onClick={() => setOpen(false)}
            >
              {languageNames[lang] || lang}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

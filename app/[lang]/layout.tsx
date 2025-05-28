import type React from "react"
import { getDictionary } from "@/lib/dictionary"
import { LanguageSwitcher } from "@/components/language-switcher"
import { supportedLanguages } from "@/middleware"

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }))
}

export async function generateMetadata({ params: { lang } }) {
  const dictionary = await getDictionary(lang)
  return {
    title: dictionary.title,
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const safeLang = params.lang || "en-us"
  const dict = await getDictionary(safeLang)

  return (
    <html lang={params.lang.split(/[-_]/)[0]}>
      <head>
        {/* You can add global metadata here
        <meta name="description" content="A description of your app" /> */}
      </head>
      <body>
        {/* In the layout component, ensure lang is passed correctly */}
        {/* <LanguageSwitcher currentLang={params.lang || "en-us"} />  */}
        {children}
      </body>
    </html>
  )
}

import "server-only"

const dictionaries = {
  "en-us": () => import("@/dictionaries/en.json").then((module) => module.default),
  "cs-cz": () => import("@/dictionaries/cs.json").then((module) => module.default),
}

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en-us"]>>
export type Locale = keyof typeof dictionaries

// Normalize locale format to ensure consistency
function normalizeLocale(locale: string): Locale {
  // Convert underscore format to hyphen format (en_us -> en-us)
  const normalizedLocale = locale.replace("_", "-").toLowerCase() as Locale

  // Check if the normalized locale exists in our dictionaries
  if (dictionaries[normalizedLocale]) {
    return normalizedLocale
  }

  // Fallback to en-us if the locale is not supported
  return "en-us"
}

export const getDictionary = async (locale: string) => {
  const normalizedLocale = normalizeLocale(locale)
  return dictionaries[normalizedLocale]()
}

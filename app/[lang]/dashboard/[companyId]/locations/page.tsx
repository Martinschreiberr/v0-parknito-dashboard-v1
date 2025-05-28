import Link from "next/link"
import { Filter, Grid3X3, LayoutGrid, Plus, Search } from "lucide-react"
import { getDictionary } from "@/lib/dictionary"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocationsGrid } from "@/components/locations/locations-grid"
import { LocationsList } from "@/components/locations/locations-list"

export default async function LocationsPage({
  params,
}: {
  params: {
    lang: string
    companyId: string
  }
}) {
  const dict = await getDictionary(params.lang)

  // Create fallback texts in case the dictionary structure is missing
  const locationsText = {
    title: dict?.locations?.title || "Locations",
    description: dict?.locations?.description || "Manage your parking locations",
    add_location: dict?.locations?.add_location || "Add Location",
    search: dict?.locations?.search || "Search locations...",
    filters: dict?.locations?.filters || "Filters",
    grid: dict?.locations?.grid || "Cards",
    list: dict?.locations?.list || "Table",
    showing_locations: dict?.locations?.showing_locations || "Showing {{count}} locations",
  }

  // Safely replace the placeholder
  const showingLocationsText = locationsText.showing_locations
    ? locationsText.showing_locations.replace("{{count}}", "12")
    : "Showing 12 locations"

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{locationsText.title}</h1>
          <p className="text-muted-foreground">{locationsText.description}</p>
        </div>
        <Button className="bg-[#0066FF] hover:bg-[#0055DD]" asChild>
          <Link href={`/${params.lang}/dashboard/${params.companyId}/locations/new`}>
            <Plus className="mr-2 h-4 w-4" />
            {locationsText.add_location}
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder={locationsText.search} className="w-full pl-8" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            {locationsText.filters}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              {locationsText.grid}
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              {locationsText.list}
            </TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">{showingLocationsText}</div>
        </div>
        <TabsContent value="grid" className="mt-6">
          <LocationsGrid lang={params.lang} dict={dict} companyId={params.companyId} />
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          <LocationsList lang={params.lang} dict={dict} companyId={params.companyId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

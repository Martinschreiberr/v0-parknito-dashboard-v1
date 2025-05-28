import Link from "next/link"
import { ArrowLeft, Edit, MapPin, Plus, Settings } from "lucide-react"
import { getDictionary } from "@/lib/dictionary"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocationSpots } from "@/components/location/location-spots"
import { LocationReservations } from "@/components/location/location-reservations"
import { LocationPermissions } from "@/components/location/location-permissions"
import { LocationAccess } from "@/components/location/location-access"
import { CreateReservationModal } from "@/components/reservations/create-reservation-modal"

export default async function LocationDetailPage({ params }: { params: { id: string; lang: string } }) {
  const dict = await getDictionary(params.lang as "en" | "cs")

  // In a real app, you would fetch the location data based on the ID
  const location = {
    id: params.id,
    name: "Headquarters",
    address: "123 Main St, San Francisco, CA",
    company: "Acme Corporation",
    spots: 42,
    occupancy: 85,
    revenue: 12450,
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href={`/${params.lang}/locations`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to locations</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-semibold tracking-tight">{location.name}</h1>
        </div>
        <CreateReservationModal preselectedLocationId={params.id} lang={params.lang} dict={dict}>
          <Button className="bg-[#0066FF] hover:bg-[#0055DD]">
            <Plus className="mr-2 h-4 w-4" />
            {dict.locations.reserve_spot}
          </Button>
        </CreateReservationModal>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{dict.locations.details.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100">
                    <MapPin className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium">{location.name}</p>
                    <p className="text-sm text-muted-foreground">{location.company}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm font-medium">{dict.locations.details.address}</p>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm font-medium">{dict.locations.details.total_spots}</p>
                    <p className="text-lg">{location.spots}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{dict.locations.details.occupancy}</p>
                    <p className="text-lg">{location.occupancy}%</p>
                  </div>
                </div>

                <Button variant="outline" className="mt-2 w-full" asChild>
                  <Link href={`/${params.lang}/locations/${location.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    {dict.locations.details.edit_location}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>{dict.locations.quick_access.title}</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/${params.lang}/locations/${location.id}/access`}>
                    <Settings className="mr-2 h-4 w-4" />
                    {dict.locations.quick_access.manage}
                  </Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link
                  href={`/${params.lang}/locations/${location.id}/access`}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <span>{dict.locations.quick_access.gate_controls}</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{dict.access.status.online}</Badge>
                </Link>
                <Link
                  href={`/${params.lang}/locations/${location.id}/access`}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <span>{dict.locations.quick_access.license_plate}</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{dict.access.status.active}</Badge>
                </Link>
                <Link
                  href={`/${params.lang}/locations/${location.id}/access`}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <span>{dict.locations.quick_access.phone_access}</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{dict.access.status.active}</Badge>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="spots">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="spots">{dict.locations.tabs.spot_management}</TabsTrigger>
              <TabsTrigger value="reservations">{dict.locations.tabs.reservations}</TabsTrigger>
              <TabsTrigger value="access">{dict.locations.tabs.access_controls}</TabsTrigger>
              <TabsTrigger value="permissions">{dict.locations.tabs.permissions}</TabsTrigger>
            </TabsList>
            <TabsContent value="spots" className="mt-4">
              <LocationSpots locationId={location.id} lang={params.lang} dict={dict} />
            </TabsContent>
            <TabsContent value="reservations" className="mt-4">
              <LocationReservations locationId={location.id} lang={params.lang} dict={dict} />
            </TabsContent>
            <TabsContent value="access" className="mt-4">
              <LocationAccess locationId={location.id} lang={params.lang} dict={dict} />
            </TabsContent>
            <TabsContent value="permissions" className="mt-4">
              <LocationPermissions locationId={location.id} lang={params.lang} dict={dict} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

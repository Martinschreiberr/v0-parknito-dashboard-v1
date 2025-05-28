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

export default async function LocationDetailPage({
  params,
}: {
  params: {
    lang: string
    companyId: string
    locationId: string
  }
}) {
  const dict = await getDictionary(params.lang)

  // Fallback dictionary for location detail page
  const fallbackDict = {
    locations: {
      details: {
        title: "Location Details",
        address: "Address",
        total_spots: "Total Spots",
        occupancy: "Occupancy",
        edit_location: "Edit Location",
      },
      reserve_spot: "Reserve Spot",
      tabs: {
        spot_management: "Spot Management",
        reservations: "Reservations",
        access_controls: "Access Controls",
        permissions: "Permissions",
      },
      quick_access: {
        title: "Quick Access",
        manage: "Manage",
        gate_controls: "Gate Controls",
        license_plate: "License Plate Recognition",
        phone_access: "Phone Access",
      },
    },
    access: {
      status: {
        online: "Online",
        active: "Active",
      },
    },
  }

  // In a real app, you would fetch the location data based on the ID
  const location = {
    id: params.locationId,
    name: "Headquarters",
    address: "123 Main St, San Francisco, CA",
    company: "Acme Corporation",
    spots: 42,
    occupancy: 85,
    revenue: 12450,
  }

  // Safely access dictionary values with fallbacks
  const detailsTitle = dict?.locations?.details?.title || fallbackDict.locations.details.title
  const addressLabel = dict?.locations?.details?.address || fallbackDict.locations.details.address
  const totalSpotsLabel = dict?.locations?.details?.total_spots || fallbackDict.locations.details.total_spots
  const occupancyLabel = dict?.locations?.details?.occupancy || fallbackDict.locations.details.occupancy
  const editLocationLabel = dict?.locations?.details?.edit_location || fallbackDict.locations.details.edit_location
  const reserveSpotLabel = dict?.locations?.reserve_spot || fallbackDict.locations.reserve_spot

  const tabSpotManagement = dict?.locations?.tabs?.spot_management || fallbackDict.locations.tabs.spot_management
  const tabReservations = dict?.locations?.tabs?.reservations || fallbackDict.locations.tabs.reservations
  const tabAccessControls = dict?.locations?.tabs?.access_controls || fallbackDict.locations.tabs.access_controls
  const tabPermissions = dict?.locations?.tabs?.permissions || fallbackDict.locations.tabs.permissions

  const quickAccessTitle = dict?.locations?.quick_access?.title || fallbackDict.locations.quick_access.title
  const quickAccessManage = dict?.locations?.quick_access?.manage || fallbackDict.locations.quick_access.manage
  const gateControlsLabel =
    dict?.locations?.quick_access?.gate_controls || fallbackDict.locations.quick_access.gate_controls
  const licensePlateLabel =
    dict?.locations?.quick_access?.license_plate || fallbackDict.locations.quick_access.license_plate
  const phoneAccessLabel =
    dict?.locations?.quick_access?.phone_access || fallbackDict.locations.quick_access.phone_access

  const statusOnline = dict?.access?.status?.online || fallbackDict.access.status.online
  const statusActive = dict?.access?.status?.active || fallbackDict.access.status.active

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href={`/${params.lang}/dashboard/${params.companyId}/locations`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to locations</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-semibold tracking-tight">{location.name}</h1>
        </div>
        <CreateReservationModal
          preselectedLocationId={params.locationId}
          lang={params.lang}
          dict={dict}
          companyId={params.companyId}
        >
          <Button className="bg-[#0066FF] hover:bg-[#0055DD]">
            <Plus className="mr-2 h-4 w-4" />
            {reserveSpotLabel}
          </Button>
        </CreateReservationModal>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{detailsTitle}</CardTitle>
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
                  <p className="text-sm font-medium">{addressLabel}</p>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm font-medium">{totalSpotsLabel}</p>
                    <p className="text-lg">{location.spots}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{occupancyLabel}</p>
                    <p className="text-lg">{location.occupancy}%</p>
                  </div>
                </div>

                <Button variant="outline" className="mt-2 w-full" asChild>
                  <Link href={`/${params.lang}/dashboard/${params.companyId}/locations/${location.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    {editLocationLabel}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>{quickAccessTitle}</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/${params.lang}/dashboard/${params.companyId}/locations/${location.id}/access`}>
                    <Settings className="mr-2 h-4 w-4" />
                    {quickAccessManage}
                  </Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link
                  href={`/${params.lang}/dashboard/${params.companyId}/locations/${location.id}/access`}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <span>{gateControlsLabel}</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{statusOnline}</Badge>
                </Link>
                <Link
                  href={`/${params.lang}/dashboard/${params.companyId}/locations/${location.id}/access`}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <span>{licensePlateLabel}</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{statusActive}</Badge>
                </Link>
                <Link
                  href={`/${params.lang}/dashboard/${params.companyId}/locations/${location.id}/access`}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <span>{phoneAccessLabel}</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{statusActive}</Badge>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="spots">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="spots">{tabSpotManagement}</TabsTrigger>
              <TabsTrigger value="reservations">{tabReservations}</TabsTrigger>
              <TabsTrigger value="access">{tabAccessControls}</TabsTrigger>
              <TabsTrigger value="permissions">{tabPermissions}</TabsTrigger>
            </TabsList>
            <TabsContent value="spots" className="mt-4">
              <LocationSpots locationId={location.id} lang={params.lang} dict={dict} companyId={params.companyId} />
            </TabsContent>
            <TabsContent value="reservations" className="mt-4">
              <LocationReservations
                locationId={location.id}
                lang={params.lang}
                dict={dict}
                companyId={params.companyId}
              />
            </TabsContent>
            <TabsContent value="access" className="mt-4">
              <LocationAccess locationId={location.id} lang={params.lang} dict={dict} companyId={params.companyId} />
            </TabsContent>
            <TabsContent value="permissions" className="mt-4">
              <LocationPermissions
                locationId={location.id}
                lang={params.lang}
                dict={dict}
                companyId={params.companyId}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

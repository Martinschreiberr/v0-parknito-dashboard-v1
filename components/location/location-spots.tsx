"use client"

import { useState } from "react"
import { Car, MoreHorizontal } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateReservationModal } from "@/components/reservations/create-reservation-modal"

type Spot = {
  id: string
  number: string
  type: "standard" | "compact" | "handicap" | "electric"
  status: "occupied" | "free" | "reserved" | "maintenance"
  user?: string
  vehicle?: string
  until?: string
}

const spots: Spot[] = [
  {
    id: "1",
    number: "A1",
    type: "standard",
    status: "occupied",
    user: "John Smith",
    vehicle: "Tesla Model 3 (ABC-123)",
    until: "5:30 PM",
  },
  {
    id: "2",
    number: "A2",
    type: "standard",
    status: "free",
  },
  {
    id: "3",
    number: "A3",
    type: "handicap",
    status: "reserved",
    user: "Sarah Johnson",
    until: "Tomorrow",
  },
  {
    id: "4",
    number: "A4",
    type: "electric",
    status: "occupied",
    user: "Michael Brown",
    vehicle: "Nissan Leaf (XYZ-789)",
    until: "4:15 PM",
  },
  {
    id: "5",
    number: "B1",
    type: "standard",
    status: "maintenance",
  },
  {
    id: "6",
    number: "B2",
    type: "compact",
    status: "free",
  },
  {
    id: "7",
    number: "B3",
    type: "standard",
    status: "occupied",
    user: "Emily Davis",
    vehicle: "Honda Civic (DEF-456)",
    until: "6:00 PM",
  },
  {
    id: "8",
    number: "B4",
    type: "electric",
    status: "free",
  },
  {
    id: "9",
    number: "C1",
    type: "standard",
    status: "occupied",
    user: "Robert Wilson",
    vehicle: "Toyota Prius (GHI-789)",
    until: "7:30 PM",
  },
  {
    id: "10",
    number: "C2",
    type: "standard",
    status: "free",
  },
  {
    id: "11",
    number: "C3",
    type: "handicap",
    status: "free",
  },
  {
    id: "12",
    number: "C4",
    type: "standard",
    status: "reserved",
    user: "Jennifer Lee",
    until: "Tomorrow",
  },
]

export function LocationSpots({ locationId, lang, dict }: { locationId: string; lang: string; dict: Dictionary }) {
  const [view, setView] = useState<"grid" | "list">("grid")

  // Create fallback dictionary for spots
  const spotsFallback = {
    title: "Parking Spots",
    grid_view: "Grid View",
    list_view: "List View",
    spot: "Spot",
    type: "Type",
    status: "Status",
    user: "User",
    vehicle: "Vehicle",
    until: "Until",
    actions: "Actions",
    reserve_spot: "Reserve Spot",
    spot_types: {
      standard: "Standard",
      compact: "Compact",
      handicap: "Handicap",
      electric: "Electric",
    },
    status_types: {
      occupied: "Occupied",
      free: "Available",
      reserved: "Reserved",
      maintenance: "Maintenance",
    },
    actions_menu: {
      view_details: "View Details",
      edit_spot: "Edit Spot",
      create_reservation: "Create Reservation",
      mark_available: "Mark Available",
      cancel_reservation: "Cancel Reservation",
    },
  }

  // Merge dictionary with fallbacks
  const spots_dict = {
    title: dict?.spots?.title || spotsFallback.title,
    grid_view: dict?.spots?.grid_view || spotsFallback.grid_view,
    list_view: dict?.spots?.list_view || spotsFallback.list_view,
    spot: dict?.spots?.spot || spotsFallback.spot,
    type: dict?.spots?.type || spotsFallback.type,
    status: dict?.spots?.status || spotsFallback.status,
    user: dict?.spots?.user || spotsFallback.user,
    vehicle: dict?.spots?.vehicle || spotsFallback.vehicle,
    until: dict?.spots?.until || spotsFallback.until,
    actions: dict?.spots?.actions || spotsFallback.actions,
    reserve_spot: dict?.spots?.reserve_spot || spotsFallback.reserve_spot,
    spot_types: {
      standard: dict?.spots?.spot_types?.standard || spotsFallback.spot_types.standard,
      compact: dict?.spots?.spot_types?.compact || spotsFallback.spot_types.compact,
      handicap: dict?.spots?.spot_types?.handicap || spotsFallback.spot_types.handicap,
      electric: dict?.spots?.spot_types?.electric || spotsFallback.spot_types.electric,
    },
    status_types: {
      occupied: dict?.spots?.status_types?.occupied || spotsFallback.status_types.occupied,
      free: dict?.spots?.status_types?.free || spotsFallback.status_types.free,
      reserved: dict?.spots?.status_types?.reserved || spotsFallback.status_types.reserved,
      maintenance: dict?.spots?.status_types?.maintenance || spotsFallback.status_types.maintenance,
    },
    actions_menu: {
      view_details: dict?.spots?.actions_menu?.view_details || spotsFallback.actions_menu.view_details,
      edit_spot: dict?.spots?.actions_menu?.edit_spot || spotsFallback.actions_menu.edit_spot,
      create_reservation:
        dict?.spots?.actions_menu?.create_reservation || spotsFallback.actions_menu.create_reservation,
      mark_available: dict?.spots?.actions_menu?.mark_available || spotsFallback.actions_menu.mark_available,
      cancel_reservation:
        dict?.spots?.actions_menu?.cancel_reservation || spotsFallback.actions_menu.cancel_reservation,
    },
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{spots_dict.title}</h2>
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")}>
            <TabsList className="grid w-[180px] grid-cols-2">
              <TabsTrigger value="grid">{spots_dict.grid_view}</TabsTrigger>
              <TabsTrigger value="list">{spots_dict.list_view}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {spots.map((spot) => (
            <Card key={spot.id} className="overflow-hidden">
              <div
                className={`h-2 w-full ${
                  spot.status === "occupied"
                    ? "bg-amber-500"
                    : spot.status === "free"
                      ? "bg-green-500"
                      : spot.status === "reserved"
                        ? "bg-blue-500"
                        : "bg-red-500"
                }`}
              />
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-md ${
                        spot.type === "handicap"
                          ? "bg-blue-100"
                          : spot.type === "electric"
                            ? "bg-green-100"
                            : spot.type === "compact"
                              ? "bg-purple-100"
                              : "bg-slate-100"
                      }`}
                    >
                      <Car
                        className={`h-5 w-5 ${
                          spot.type === "handicap"
                            ? "text-blue-500"
                            : spot.type === "electric"
                              ? "text-green-500"
                              : spot.type === "compact"
                                ? "text-purple-500"
                                : "text-slate-500"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Spot {spot.number}</p>
                      <p className="text-sm capitalize text-muted-foreground">
                        {spots_dict.spot_types[spot.type as keyof typeof spots_dict.spot_types]}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{spots_dict.actions}</DropdownMenuLabel>
                      <DropdownMenuItem>{spots_dict.actions_menu.view_details}</DropdownMenuItem>
                      <DropdownMenuItem>{spots_dict.actions_menu.edit_spot}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {spot.status === "free" ? (
                        <CreateReservationModal
                          preselectedLocationId={locationId}
                          buttonVariant={null}
                          lang={lang}
                          dict={dict}
                        >
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            {spots_dict.actions_menu.create_reservation}
                          </DropdownMenuItem>
                        </CreateReservationModal>
                      ) : spot.status === "maintenance" ? (
                        <DropdownMenuItem className="text-green-600">
                          {spots_dict.actions_menu.mark_available}
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-red-600">
                          {spots_dict.actions_menu.cancel_reservation}
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4">
                  <Badge
                    className={`${
                      spot.status === "occupied"
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                        : spot.status === "free"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : spot.status === "reserved"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                    }`}
                  >
                    {spots_dict.status_types[spot.status]}
                  </Badge>
                </div>

                {spot.status !== "free" && spot.status !== "maintenance" && (
                  <div className="mt-3 space-y-1">
                    {spot.user && <p className="text-sm">{spot.user}</p>}
                    {spot.vehicle && <p className="text-xs text-muted-foreground">{spot.vehicle}</p>}
                    {spot.until && <p className="text-xs text-muted-foreground">Until: {spot.until}</p>}
                  </div>
                )}

                {spot.status === "free" && (
                  <div className="mt-3">
                    <CreateReservationModal
                      preselectedLocationId={locationId}
                      buttonVariant="outline"
                      lang={lang}
                      dict={dict}
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        {spots_dict.reserve_spot}
                      </Button>
                    </CreateReservationModal>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">{spots_dict.spot}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{spots_dict.type}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{spots_dict.status}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{spots_dict.user}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{spots_dict.vehicle}</th>
                <th className="px-4 py-3 text-left text-sm font-medium">{spots_dict.until}</th>
                <th className="px-4 py-3 text-right text-sm font-medium">{spots_dict.actions}</th>
              </tr>
            </thead>
            <tbody>
              {spots.map((spot) => (
                <tr key={spot.id} className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">{spot.number}</td>
                  <td className="px-4 py-3 text-sm capitalize">
                    {spots_dict.spot_types[spot.type as keyof typeof spots_dict.spot_types]}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Badge
                      className={`${
                        spot.status === "occupied"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          : spot.status === "free"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : spot.status === "reserved"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                      }`}
                    >
                      {spots_dict.status_types[spot.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">{spot.user || "-"}</td>
                  <td className="px-4 py-3 text-sm">{spot.vehicle || "-"}</td>
                  <td className="px-4 py-3 text-sm">{spot.until || "-"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {spot.status === "free" && (
                        <CreateReservationModal
                          preselectedLocationId={locationId}
                          buttonVariant="outline"
                          lang={lang}
                          dict={dict}
                        >
                          <Button variant="outline" size="sm">
                            {spots_dict.reserve_spot}
                          </Button>
                        </CreateReservationModal>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{spots_dict.actions}</DropdownMenuLabel>
                          <DropdownMenuItem>{spots_dict.actions_menu.view_details}</DropdownMenuItem>
                          <DropdownMenuItem>{spots_dict.actions_menu.edit_spot}</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {spot.status === "free" ? (
                            <CreateReservationModal
                              preselectedLocationId={locationId}
                              buttonVariant={null}
                              lang={lang}
                              dict={dict}
                            >
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                {spots_dict.actions_menu.create_reservation}
                              </DropdownMenuItem>
                            </CreateReservationModal>
                          ) : spot.status === "maintenance" ? (
                            <DropdownMenuItem className="text-green-600">
                              {spots_dict.actions_menu.mark_available}
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-red-600">
                              {spots_dict.actions_menu.cancel_reservation}
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

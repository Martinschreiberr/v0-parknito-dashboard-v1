"use client"

import { useState } from "react"
import { CalendarClock, Car, MoreHorizontal, Plus, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Reservation = {
  id: string
  company: string
  user: string
  licensePlate: string
  spot: string
  startDate: string
  endDate: string
  type: "subscription" | "guest"
  status: "upcoming" | "active" | "expired"
}

const reservations: Reservation[] = [
  {
    id: "1",
    company: "Acme Corporation",
    user: "John Smith",
    licensePlate: "ABC-123",
    spot: "A1",
    startDate: "May 10, 2025",
    endDate: "May 10, 2025",
    type: "subscription",
    status: "active",
  },
  {
    id: "2",
    company: "TechGiant Inc.",
    user: "Sarah Johnson",
    licensePlate: "DEF-456",
    spot: "A3",
    startDate: "May 11, 2025",
    endDate: "May 15, 2025",
    type: "subscription",
    status: "upcoming",
  },
  {
    id: "3",
    company: "Globex Industries",
    user: "Michael Brown",
    licensePlate: "XYZ-789",
    spot: "A4",
    startDate: "May 10, 2025",
    endDate: "May 10, 2025",
    type: "subscription",
    status: "active",
  },
  {
    id: "4",
    company: "Initech LLC",
    user: "Emily Davis",
    licensePlate: "GHI-789",
    spot: "B3",
    startDate: "May 10, 2025",
    endDate: "May 10, 2025",
    type: "subscription",
    status: "active",
  },
  {
    id: "5",
    company: "Umbrella Corporation",
    user: "Robert Wilson",
    licensePlate: "JKL-012",
    spot: "C1",
    startDate: "May 10, 2025",
    endDate: "May 10, 2025",
    type: "subscription",
    status: "active",
  },
  {
    id: "6",
    company: "Massive Dynamic",
    user: "Jennifer Lee",
    licensePlate: "MNO-345",
    spot: "C4",
    startDate: "May 12, 2025",
    endDate: "May 12, 2025",
    type: "guest",
    status: "upcoming",
  },
  {
    id: "7",
    company: "Stark Industries",
    user: "David Miller",
    licensePlate: "PQR-678",
    spot: "B2",
    startDate: "May 5, 2025",
    endDate: "May 9, 2025",
    type: "guest",
    status: "expired",
  },
]

export function LocationReservations({ locationId }: { locationId: string }) {
  const [reservationType, setReservationType] = useState<"all" | "subscription" | "guest">("all")
  const [reservationStatus, setReservationStatus] = useState<"all" | "upcoming" | "active" | "expired">("all")

  const filteredReservations = reservations.filter((reservation) => {
    if (reservationType !== "all" && reservation.type !== reservationType) return false
    if (reservationStatus !== "all" && reservation.status !== reservationStatus) return false
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Reservations</h2>
        <Button className="bg-[#0066FF] hover:bg-[#0055DD]">
          <Plus className="mr-2 h-4 w-4" />
          New Reservation
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={reservationType} onValueChange={(v) => setReservationType(v as any)}>
          <TabsList className="grid w-full grid-cols-3 sm:w-[360px]">
            <TabsTrigger value="all">All Types</TabsTrigger>
            <TabsTrigger value="subscription">Subscriptions</TabsTrigger>
            <TabsTrigger value="guest">Guest Passes</TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs value={reservationStatus} onValueChange={(v) => setReservationStatus(v as any)}>
          <TabsList className="grid w-full grid-cols-4 sm:w-[360px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredReservations.map((reservation) => (
          <Card key={reservation.id}>
            <div
              className={`h-2 w-full ${
                reservation.status === "active"
                  ? "bg-green-500"
                  : reservation.status === "upcoming"
                    ? "bg-blue-500"
                    : "bg-gray-500"
              }`}
            />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100">
                    <Car className="h-4 w-4 text-slate-500" />
                  </div>
                  <CardTitle className="text-lg">Spot {reservation.spot}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Edit reservation</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {reservation.status === "upcoming" ? (
                      <>
                        <DropdownMenuItem>Approve</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                      </>
                    ) : reservation.status === "active" ? (
                      <>
                        <DropdownMenuItem>Extend</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">End early</DropdownMenuItem>
                      </>
                    ) : (
                      <DropdownMenuItem>Renew</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>{reservation.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{reservation.user}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{reservation.licensePlate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {reservation.startDate === reservation.endDate
                      ? reservation.startDate
                      : `${reservation.startDate} - ${reservation.endDate}`}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Badge
                    variant="outline"
                    className={
                      reservation.type === "subscription"
                        ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                    }
                  >
                    {reservation.type === "subscription" ? "Subscription" : "Guest Pass"}
                  </Badge>

                  <Badge
                    className={`${
                      reservation.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : reservation.status === "upcoming"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {reservation.status === "active"
                      ? "Active"
                      : reservation.status === "upcoming"
                        ? "Upcoming"
                        : "Expired"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

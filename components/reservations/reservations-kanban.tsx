"use client"

import { Car, MoreHorizontal, User } from "lucide-react"

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

type Reservation = {
  id: string
  company: string
  user: string
  licensePlate: string
  spot: string
  location: string
  timeWindow: string
  status: "upcoming" | "active" | "expired"
}

const reservations: Record<string, Reservation[]> = {
  upcoming: [
    {
      id: "1",
      company: "TechGiant Inc.",
      user: "Sarah Johnson",
      licensePlate: "DEF-456",
      spot: "A3",
      location: "Headquarters",
      timeWindow: "May 11 - May 15, 2025",
      status: "upcoming",
    },
    {
      id: "2",
      company: "Massive Dynamic",
      user: "Jennifer Lee",
      licensePlate: "MNO-345",
      spot: "C4",
      location: "Downtown Office",
      timeWindow: "May 12, 2025",
      status: "upcoming",
    },
    {
      id: "3",
      company: "Stark Industries",
      user: "Tony Stark",
      licensePlate: "STK-001",
      spot: "A1",
      location: "Research Center",
      timeWindow: "May 13 - May 14, 2025",
      status: "upcoming",
    },
  ],
  active: [
    {
      id: "4",
      company: "Acme Corporation",
      user: "John Smith",
      licensePlate: "ABC-123",
      spot: "A1",
      location: "Headquarters",
      timeWindow: "May 10, 2025",
      status: "active",
    },
    {
      id: "5",
      company: "Globex Industries",
      user: "Michael Brown",
      licensePlate: "XYZ-789",
      spot: "A4",
      location: "West Campus",
      timeWindow: "May 10, 2025",
      status: "active",
    },
    {
      id: "6",
      company: "Initech LLC",
      user: "Emily Davis",
      licensePlate: "GHI-789",
      spot: "B3",
      location: "Downtown Office",
      timeWindow: "May 10, 2025",
      status: "active",
    },
    {
      id: "7",
      company: "Umbrella Corporation",
      user: "Robert Wilson",
      licensePlate: "JKL-012",
      spot: "C1",
      location: "Headquarters",
      timeWindow: "May 10, 2025",
      status: "active",
    },
  ],
  expired: [
    {
      id: "8",
      company: "Stark Industries",
      user: "David Miller",
      licensePlate: "PQR-678",
      spot: "B2",
      location: "Research Center",
      timeWindow: "May 5 - May 9, 2025",
      status: "expired",
    },
    {
      id: "9",
      company: "Acme Corporation",
      user: "Lisa Wang",
      licensePlate: "LMN-456",
      spot: "A2",
      location: "Headquarters",
      timeWindow: "May 8, 2025",
      status: "expired",
    },
  ],
}

export function ReservationsKanban() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Upcoming</h3>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{reservations.upcoming.length}</Badge>
        </div>

        {reservations.upcoming.map((reservation) => (
          <Card key={reservation.id} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{reservation.company}</div>
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
                    <DropdownMenuItem>Approve</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{reservation.user}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{reservation.licensePlate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {reservation.location} - Spot {reservation.spot}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{reservation.timeWindow}</div>
              </div>

              <div className="mt-3 flex justify-between">
                <Button variant="outline" size="sm">
                  Approve
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Active</h3>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{reservations.active.length}</Badge>
        </div>

        {reservations.active.map((reservation) => (
          <Card key={reservation.id} className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{reservation.company}</div>
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
                    <DropdownMenuItem>Extend</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">End early</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{reservation.user}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{reservation.licensePlate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {reservation.location} - Spot {reservation.spot}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{reservation.timeWindow}</div>
              </div>

              <div className="mt-3 flex justify-between">
                <Button variant="outline" size="sm">
                  Extend
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  End
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Expired</h3>
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{reservations.expired.length}</Badge>
        </div>

        {reservations.expired.map((reservation) => (
          <Card key={reservation.id} className="border-l-4 border-l-gray-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{reservation.company}</div>
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
                    <DropdownMenuItem>Renew</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{reservation.user}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{reservation.licensePlate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {reservation.location} - Spot {reservation.spot}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{reservation.timeWindow}</div>
              </div>

              <div className="mt-3 flex justify-center">
                <Button variant="outline" size="sm">
                  Renew
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

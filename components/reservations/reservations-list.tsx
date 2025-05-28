"use client"

import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

const reservations: Reservation[] = [
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
]

export function ReservationsList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>User</TableHead>
          <TableHead>License Plate</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Spot</TableHead>
          <TableHead>Time Window</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell className="font-medium">{reservation.company}</TableCell>
            <TableCell>{reservation.user}</TableCell>
            <TableCell>{reservation.licensePlate}</TableCell>
            <TableCell>{reservation.location}</TableCell>
            <TableCell>{reservation.spot}</TableCell>
            <TableCell>{reservation.timeWindow}</TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell className="text-right">
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

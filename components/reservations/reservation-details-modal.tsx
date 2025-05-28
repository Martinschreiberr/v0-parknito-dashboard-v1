"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, User, MapPin, Calendar } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary"

interface Reservation {
  id: string
  company: string
  user: string
  licensePlate: string
  spot: string
  location: string
  timeWindow: string
  status: "upcoming" | "active" | "expired"
}

interface ReservationDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  reservation: Reservation
  lang: string
  dict: Dictionary
}

export function ReservationDetailsModal({ isOpen, onClose, reservation, lang, dict }: ReservationDetailsModalProps) {
  // Get status badge styling
  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          {dict.reservations?.status?.active || "Active"}
        </Badge>
      )
    } else if (status === "upcoming") {
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          {dict.reservations?.status?.upcoming || "Upcoming"}
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          {dict.reservations?.status?.expired || "Expired"}
        </Badge>
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{dict.reservations?.details?.title || "Reservation Details"}</span>
            {getStatusBadge(reservation.status)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{reservation.user}</p>
              <p className="text-xs text-muted-foreground">{reservation.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{dict.reservations?.details?.license_plate || "License Plate"}</p>
              <p className="text-xs">{reservation.licensePlate}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{dict.reservations?.details?.location || "Location"}</p>
              <p className="text-xs">
                {reservation.location} - {dict.reservations?.details?.spot || "Spot"} {reservation.spot}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{dict.reservations?.details?.time_window || "Time Window"}</p>
              <p className="text-xs">{reservation.timeWindow}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {reservation.status === "upcoming" && (
            <>
              <Button variant="outline" className="flex-1">
                {dict.reservations?.actions?.edit || "Edit"}
              </Button>
              <Button variant="destructive" className="flex-1">
                {dict.reservations?.actions?.cancel || "Cancel"}
              </Button>
            </>
          )}

          {reservation.status === "active" && (
            <>
              <Button variant="outline" className="flex-1">
                {dict.reservations?.actions?.extend || "Extend"}
              </Button>
              <Button variant="destructive" className="flex-1">
                {dict.reservations?.actions?.end || "End Early"}
              </Button>
            </>
          )}

          {reservation.status === "expired" && (
            <Button className="flex-1">{dict.reservations?.actions?.renew || "Renew"}</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

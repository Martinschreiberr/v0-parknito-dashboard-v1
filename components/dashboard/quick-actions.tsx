"use client"

import { Plus, Calendar, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface QuickActionsProps {
  lang: string
  dict: any
  companyId: string
}

export function QuickActions({ lang, dict, companyId }: QuickActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {dict.dashboard?.quickActions?.title || "Quick Actions"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{dict.dashboard?.quickActions?.label || "Create New"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Calendar className="mr-2 h-4 w-4" />
          {dict.dashboard?.quickActions?.newReservation || "New Reservation"}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4" />
          {dict.dashboard?.quickActions?.newUser || "New User"}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MapPin className="mr-2 h-4 w-4" />
          {dict.dashboard?.quickActions?.newLocation || "New Location"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

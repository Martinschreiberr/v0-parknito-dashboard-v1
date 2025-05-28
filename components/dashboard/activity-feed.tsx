import type React from "react"
import { CalendarClock, Car, Key, UserPlus } from "lucide-react"

import { cn } from "@/lib/utils"

type ActivityItem = {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  timestamp: string
  type: "gate" | "reservation" | "permission" | "user"
}

const activityItems: ActivityItem[] = [
  {
    id: "1",
    icon: <Car className="h-4 w-4" />,
    title: "Gate Access",
    description: "Vehicle ABC-123 entered TechGiant HQ",
    timestamp: "Just now",
    type: "gate",
  },
  {
    id: "2",
    icon: <CalendarClock className="h-4 w-4" />,
    title: "New Reservation",
    description: "John Smith reserved spot A12 at Acme Corp",
    timestamp: "10 minutes ago",
    type: "reservation",
  },
  {
    id: "3",
    icon: <Key className="h-4 w-4" />,
    title: "Permission Change",
    description: "Admin granted access to Globex visitors",
    timestamp: "1 hour ago",
    type: "permission",
  },
  {
    id: "4",
    icon: <Car className="h-4 w-4" />,
    title: "Gate Access",
    description: "Vehicle XYZ-789 exited Initech Garage",
    timestamp: "2 hours ago",
    type: "gate",
  },
  {
    id: "5",
    icon: <UserPlus className="h-4 w-4" />,
    title: "New User",
    description: "Sarah Johnson added to Umbrella Corp",
    timestamp: "3 hours ago",
    type: "user",
  },
  {
    id: "6",
    icon: <CalendarClock className="h-4 w-4" />,
    title: "New Reservation",
    description: "Mike Davis reserved spot B23 at Globex",
    timestamp: "5 hours ago",
    type: "reservation",
  },
]

export function DashboardActivityFeed() {
  return (
    <div className="space-y-4">
      {activityItems.map((item) => (
        <div key={item.id} className="flex items-start gap-4">
          <div
            className={cn(
              "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full",
              item.type === "gate" && "bg-blue-100 text-blue-700",
              item.type === "reservation" && "bg-green-100 text-green-700",
              item.type === "permission" && "bg-amber-100 text-amber-700",
              item.type === "user" && "bg-purple-100 text-purple-700",
            )}
          >
            {item.icon}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.timestamp}</p>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

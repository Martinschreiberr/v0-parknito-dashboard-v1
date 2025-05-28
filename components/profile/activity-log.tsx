"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Search, Download, Calendar, MapPin, User, Settings, Shield } from "lucide-react"

interface ActivityLogProps {
  dictionary: any
}

export function ActivityLog({ dictionary }: ActivityLogProps) {
  const activities = [
    {
      id: 1,
      type: "login",
      description: "Signed in from Chrome on Windows",
      timestamp: "2024-01-15 09:30:00",
      location: "San Francisco, CA",
      icon: Shield,
      severity: "info",
    },
    {
      id: 2,
      type: "reservation",
      description: "Created reservation for Downtown Garage - Spot A1",
      timestamp: "2024-01-15 08:45:00",
      location: "Downtown Garage",
      icon: Calendar,
      severity: "success",
    },
    {
      id: 3,
      type: "profile",
      description: "Updated profile information",
      timestamp: "2024-01-14 16:20:00",
      location: "Web App",
      icon: User,
      severity: "info",
    },
    {
      id: 4,
      type: "reservation",
      description: "Cancelled reservation for Airport Parking - Spot B12",
      timestamp: "2024-01-14 14:15:00",
      location: "Airport Parking",
      icon: Calendar,
      severity: "warning",
    },
    {
      id: 5,
      type: "settings",
      description: "Changed notification preferences",
      timestamp: "2024-01-13 11:30:00",
      location: "Web App",
      icon: Settings,
      severity: "info",
    },
    {
      id: 6,
      type: "location",
      description: "Checked in at Mall Parking - Spot C5",
      timestamp: "2024-01-13 10:00:00",
      location: "Mall Parking",
      icon: MapPin,
      severity: "success",
    },
    {
      id: 7,
      type: "login",
      description: "Signed in from Safari on iPhone",
      timestamp: "2024-01-12 18:45:00",
      location: "Los Angeles, CA",
      icon: Shield,
      severity: "info",
    },
    {
      id: 8,
      type: "reservation",
      description: "Extended reservation for Office Complex - Spot D8",
      timestamp: "2024-01-12 15:30:00",
      location: "Office Complex",
      icon: Calendar,
      severity: "info",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "login":
        return dictionary?.profile?.login || "Login"
      case "reservation":
        return dictionary?.profile?.reservation || "Reservation"
      case "profile":
        return dictionary?.profile?.profile || "Profile"
      case "settings":
        return dictionary?.profile?.settings || "Settings"
      case "location":
        return dictionary?.profile?.location || "Location"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            {dictionary?.profile?.activityLog || "Activity Log"}
          </CardTitle>
          <CardDescription>
            {dictionary?.profile?.activityLogDesc || "View your recent account activity and actions."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={dictionary?.profile?.searchActivity || "Search activity..."} className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{dictionary?.profile?.allTypes || "All Types"}</SelectItem>
                <SelectItem value="login">{dictionary?.profile?.loginOnly || "Login Only"}</SelectItem>
                <SelectItem value="reservation">
                  {dictionary?.profile?.reservationsOnly || "Reservations Only"}
                </SelectItem>
                <SelectItem value="profile">{dictionary?.profile?.profileOnly || "Profile Only"}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              {dictionary?.profile?.export || "Export"}
            </Button>
          </div>

          {/* Activity List */}
          <div className="space-y-3">
            {activities.map((activity) => {
              const IconComponent = activity.icon
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{activity.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(activity.type)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{new Date(activity.timestamp).toLocaleString()}</span>
                      <span>•</span>
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Load More */}
          <div className="flex justify-center pt-4">
            <Button variant="outline">{dictionary?.profile?.loadMore || "Load More Activities"}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>{dictionary?.profile?.activitySummary || "Activity Summary"}</CardTitle>
          <CardDescription>
            {dictionary?.profile?.activitySummaryDesc || "Your activity overview for the past 30 days."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-muted-foreground">{dictionary?.profile?.totalLogins || "Total Logins"}</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">18</div>
              <div className="text-sm text-muted-foreground">
                {dictionary?.profile?.reservationsMade || "Reservations Made"}
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-muted-foreground">
                {dictionary?.profile?.profileUpdates || "Profile Updates"}
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-muted-foreground">
                {dictionary?.profile?.settingsChanged || "Settings Changed"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

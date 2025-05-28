import { MapPin, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface LocationOverviewProps {
  lang: string
  dict: any
  companyId: string
}

const mockLocations = [
  {
    id: "1",
    name: "TechGiant HQ",
    occupancy: 85,
    totalSpots: 120,
    availableSpots: 18,
    trend: "up",
    trendValue: 12,
  },
  {
    id: "2",
    name: "Acme Corp",
    occupancy: 67,
    totalSpots: 80,
    availableSpots: 26,
    trend: "down",
    trendValue: 8,
  },
  {
    id: "3",
    name: "Globex",
    occupancy: 92,
    totalSpots: 150,
    availableSpots: 12,
    trend: "up",
    trendValue: 5,
  },
]

export function LocationOverview({ lang, dict, companyId }: LocationOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {dict.dashboard?.locationOverview?.title || "Location Overview"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockLocations.map((location) => (
          <div key={location.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{location.name}</span>
              </div>
              <Badge variant={location.trend === "up" ? "default" : "secondary"}>
                {location.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {location.trendValue}%
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{location.occupancy}% occupied</span>
                <span className="text-muted-foreground">
                  {location.availableSpots}/{location.totalSpots} available
                </span>
              </div>
              <Progress value={location.occupancy} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

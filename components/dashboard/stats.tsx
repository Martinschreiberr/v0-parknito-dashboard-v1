import { Building2, Car, DollarSign, Percent } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardStats({ dict }: { dict: Dictionary }) {
  // Create a fallback mechanism in case the expected dictionary structure is not available
  const stats = {
    total_companies: dict?.dashboard?.stats?.total_spots || "Total Companies",
    total_locations: dict?.dashboard?.stats?.available_spots || "Total Locations",
    current_occupancy: dict?.dashboard?.stats?.occupied_spots || "Current Occupancy",
    revenue_this_month: dict?.dashboard?.stats?.revenue || "Revenue This Month",
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{stats.total_companies}</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{stats.total_locations}</CardTitle>
          <Car className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">86</div>
          <p className="text-xs text-muted-foreground">+5 from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{stats.current_occupancy}</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">78.3%</div>
          <p className="text-xs text-muted-foreground">+12.5% from last week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{stats.revenue_this_month}</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$48,294</div>
          <p className="text-xs text-muted-foreground">+8.2% from last month</p>
        </CardContent>
      </Card>
    </>
  )
}

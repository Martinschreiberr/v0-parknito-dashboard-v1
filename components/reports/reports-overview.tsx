"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Car, DollarSign, Clock, Users } from "lucide-react"

interface ReportsOverviewProps {
  lang: string
  dict: any
  companyId?: string
}

// Sample data for charts
const occupancyData = [
  { name: "Mon", occupied: 85, available: 15 },
  { name: "Tue", occupied: 92, available: 8 },
  { name: "Wed", occupied: 78, available: 22 },
  { name: "Thu", occupied: 88, available: 12 },
  { name: "Fri", occupied: 95, available: 5 },
  { name: "Sat", occupied: 65, available: 35 },
  { name: "Sun", occupied: 45, available: 55 },
]

const revenueData = [
  { month: "Jan", revenue: 12500, target: 15000 },
  { month: "Feb", revenue: 14200, target: 15000 },
  { month: "Mar", revenue: 16800, target: 15000 },
  { month: "Apr", revenue: 15400, target: 15000 },
  { month: "May", revenue: 18200, target: 15000 },
  { month: "Jun", revenue: 19500, target: 15000 },
]

const locationData = [
  { name: "Downtown", value: 35, color: "#0088FE" },
  { name: "Airport", value: 28, color: "#00C49F" },
  { name: "Mall", value: 22, color: "#FFBB28" },
  { name: "Office", value: 15, color: "#FF8042" },
]

export function ReportsOverview({ lang, dict, companyId }: ReportsOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {dict?.reports?.overview?.total_revenue || "Total Revenue"}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$96,600</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" />
              +12.5% {dict?.reports?.overview?.from_last_month || "from last month"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {dict?.reports?.overview?.occupancy_rate || "Avg Occupancy"}
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.2%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" />
              +2.1% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {dict?.reports?.overview?.avg_duration || "Avg Duration"}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4{dict?.reports?.overview?.hours || "h"}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 text-red-500" />
              -0.3h {dict?.reports?.overview?.from_last_month || "from last month"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {dict?.reports?.overview?.active_users || "Active Users"}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500" />
              +8.2% {dict?.reports?.overview?.from_last_month || "from last month"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Occupancy Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Occupancy Rate</CardTitle>
            <CardDescription>Occupied vs Available spots by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                occupied: {
                  label: "Occupied",
                  color: "hsl(var(--chart-1))",
                },
                available: {
                  label: "Available",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="occupied" stackId="a" fill="var(--color-occupied)" />
                  <Bar dataKey="available" stackId="a" fill="var(--color-available)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue vs target</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
                target: {
                  label: "Target",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={3} />
                  <Line type="monotone" dataKey="target" stroke="var(--color-target)" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Location Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Location</CardTitle>
            <CardDescription>Distribution across parking locations</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                downtown: { label: "Downtown", color: "#0088FE" },
                airport: { label: "Airport", color: "#00C49F" },
                mall: { label: "Mall", color: "#FFBB28" },
                office: { label: "Office", color: "#FF8042" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Statistics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Peak Hours</span>
              <span className="text-sm text-muted-foreground">9:00 AM - 11:00 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Busiest Location</span>
              <span className="text-sm text-muted-foreground">Downtown (35%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Stay</span>
              <span className="text-sm text-muted-foreground">2.4 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Customer Satisfaction</span>
              <span className="text-sm text-muted-foreground">4.7/5.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Monthly Growth</span>
              <span className="text-sm text-green-600">+12.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Spots</span>
              <span className="text-sm text-muted-foreground">1,250</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

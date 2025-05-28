"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts"
import { Button } from "@/components/ui/button"
import { CalendarDays, Download, TrendingUp } from "lucide-react"

interface OccupancyReportProps {
  lang: string
  dict: any
  companyId: string
}

// Sample occupancy data
const hourlyData = [
  { hour: "6:00", occupancy: 15, capacity: 100 },
  { hour: "7:00", occupancy: 35, capacity: 100 },
  { hour: "8:00", occupancy: 65, capacity: 100 },
  { hour: "9:00", occupancy: 85, capacity: 100 },
  { hour: "10:00", occupancy: 92, capacity: 100 },
  { hour: "11:00", occupancy: 88, capacity: 100 },
  { hour: "12:00", occupancy: 95, capacity: 100 },
  { hour: "13:00", occupancy: 90, capacity: 100 },
  { hour: "14:00", occupancy: 85, capacity: 100 },
  { hour: "15:00", occupancy: 78, capacity: 100 },
  { hour: "16:00", occupancy: 82, capacity: 100 },
  { hour: "17:00", occupancy: 88, capacity: 100 },
  { hour: "18:00", occupancy: 75, capacity: 100 },
  { hour: "19:00", occupancy: 55, capacity: 100 },
  { hour: "20:00", occupancy: 35, capacity: 100 },
  { hour: "21:00", occupancy: 25, capacity: 100 },
  { hour: "22:00", occupancy: 15, capacity: 100 },
]

const weeklyData = [
  { day: "Mon", peak: 95, average: 78, low: 25 },
  { day: "Tue", peak: 92, average: 82, low: 30 },
  { day: "Wed", peak: 88, average: 75, low: 28 },
  { day: "Thu", peak: 90, average: 80, low: 32 },
  { day: "Fri", peak: 98, average: 85, low: 35 },
  { day: "Sat", peak: 75, average: 60, low: 20 },
  { day: "Sun", peak: 65, average: 45, low: 15 },
]

const locationData = [
  { location: "Downtown", current: 85, capacity: 120, utilization: 70.8 },
  { location: "Airport", current: 95, capacity: 150, utilization: 63.3 },
  { location: "Mall", current: 78, capacity: 100, utilization: 78.0 },
  { location: "Office Complex", current: 65, capacity: 80, utilization: 81.3 },
  { location: "University", current: 45, capacity: 90, utilization: 50.0 },
]

export function OccupancyReport({ lang, dict, companyId }: OccupancyReportProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Occupancy Analysis</h2>
          <p className="text-muted-foreground">Detailed parking space utilization metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CalendarDays className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.2%</div>
            <p className="text-xs text-muted-foreground">368 of 471 spots occupied</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Peak Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95.3%</div>
            <p className="text-xs text-muted-foreground">at 12:30 PM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72.8%</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3" />
              +5.2% vs last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Turnover Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2x</div>
            <p className="text-xs text-muted-foreground">spots per day</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hourly Occupancy */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Hourly Occupancy</CardTitle>
            <CardDescription>Real-time occupancy throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                occupancy: {
                  label: "Occupancy %",
                  color: "hsl(var(--chart-1))",
                },
                capacity: {
                  label: "Capacity",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="occupancy"
                    stroke="var(--color-occupancy)"
                    fill="var(--color-occupancy)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Patterns */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Occupancy Patterns</CardTitle>
            <CardDescription>Peak, average, and low occupancy by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                peak: {
                  label: "Peak",
                  color: "hsl(var(--chart-1))",
                },
                average: {
                  label: "Average",
                  color: "hsl(var(--chart-2))",
                },
                low: {
                  label: "Low",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="peak" stroke="var(--color-peak)" strokeWidth={2} />
                  <Line type="monotone" dataKey="average" stroke="var(--color-average)" strokeWidth={2} />
                  <Line type="monotone" dataKey="low" stroke="var(--color-low)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Location Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Occupancy by Location</CardTitle>
          <CardDescription>Current status across all parking locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {locationData.map((location) => (
              <div key={location.location} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{location.location}</h4>
                  <p className="text-sm text-muted-foreground">
                    {location.current} of {location.capacity} spots occupied
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-semibold">{location.utilization}%</div>
                    <div className="text-xs text-muted-foreground">Utilization</div>
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${location.utilization}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

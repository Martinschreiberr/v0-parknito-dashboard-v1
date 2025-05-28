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
  AreaChart,
  Area,
} from "recharts"
import { Button } from "@/components/ui/button"
import { CalendarDays, Download, Clock, Users, Car } from "lucide-react"

interface UsageReportProps {
  lang: string
  dict: any
  companyId: string
}

// Sample usage data
const hourlyUsage = [
  { hour: "6:00", entries: 5, exits: 2, duration: 1.2 },
  { hour: "7:00", entries: 15, exits: 8, duration: 1.8 },
  { hour: "8:00", entries: 35, exits: 12, duration: 2.1 },
  { hour: "9:00", entries: 45, exits: 18, duration: 2.5 },
  { hour: "10:00", entries: 38, exits: 25, duration: 2.8 },
  { hour: "11:00", entries: 32, exits: 28, duration: 3.2 },
  { hour: "12:00", entries: 28, exits: 35, duration: 2.9 },
  { hour: "13:00", entries: 25, exits: 32, duration: 2.6 },
  { hour: "14:00", entries: 22, exits: 28, duration: 2.4 },
  { hour: "15:00", entries: 18, exits: 25, duration: 2.2 },
  { hour: "16:00", entries: 25, exits: 22, duration: 2.0 },
  { hour: "17:00", entries: 35, exits: 18, duration: 1.8 },
  { hour: "18:00", entries: 28, exits: 35, duration: 1.5 },
  { hour: "19:00", entries: 15, exits: 28, duration: 1.2 },
  { hour: "20:00", entries: 8, exits: 15, duration: 1.0 },
  { hour: "21:00", entries: 5, exits: 8, duration: 0.8 },
  { hour: "22:00", entries: 2, exits: 5, duration: 0.5 },
]

const durationDistribution = [
  { range: "0-30 min", count: 125, percentage: 15 },
  { range: "30-60 min", count: 200, percentage: 24 },
  { range: "1-2 hours", count: 250, percentage: 30 },
  { range: "2-4 hours", count: 150, percentage: 18 },
  { range: "4-8 hours", count: 80, percentage: 10 },
  { range: "8+ hours", count: 25, percentage: 3 },
]

const weeklyPatterns = [
  { day: "Monday", avgDuration: 2.4, totalSessions: 145, peakHour: "12:00" },
  { day: "Tuesday", avgDuration: 2.6, totalSessions: 167, peakHour: "11:00" },
  { day: "Wednesday", avgDuration: 2.3, totalSessions: 152, peakHour: "12:30" },
  { day: "Thursday", avgDuration: 2.5, totalSessions: 163, peakHour: "11:30" },
  { day: "Friday", avgDuration: 2.8, totalSessions: 182, peakHour: "13:00" },
  { day: "Saturday", avgDuration: 3.2, totalSessions: 118, peakHour: "14:00" },
  { day: "Sunday", avgDuration: 2.9, totalSessions: 95, peakHour: "15:00" },
]

const userSegments = [
  { segment: "Regular Commuters", count: 450, avgDuration: 8.5, frequency: "Daily" },
  { segment: "Occasional Visitors", count: 320, avgDuration: 2.1, frequency: "Weekly" },
  { segment: "Event Attendees", count: 180, avgDuration: 4.2, frequency: "Monthly" },
  { segment: "Short-term Shoppers", count: 280, avgDuration: 1.3, frequency: "Bi-weekly" },
]

export function UsageReport({ lang, dict, companyId }: UsageReportProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Usage Analytics</h2>
          <p className="text-muted-foreground">Detailed analysis of parking usage patterns</p>
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">Per session</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">Active this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12:00</div>
            <p className="text-xs text-muted-foreground">45 entries/hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hourly Traffic */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Traffic Pattern</CardTitle>
            <CardDescription>Entries and exits throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                entries: {
                  label: "Entries",
                  color: "hsl(var(--chart-1))",
                },
                exits: {
                  label: "Exits",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="entries"
                    stackId="1"
                    stroke="var(--color-entries)"
                    fill="var(--color-entries)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="exits"
                    stackId="2"
                    stroke="var(--color-exits)"
                    fill="var(--color-exits)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Duration Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Parking Duration Distribution</CardTitle>
            <CardDescription>How long users typically park</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Sessions",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={durationDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Patterns */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Usage Patterns</CardTitle>
            <CardDescription>Average duration and total sessions by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                avgDuration: {
                  label: "Avg Duration (hours)",
                  color: "hsl(var(--chart-1))",
                },
                totalSessions: {
                  label: "Total Sessions",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyPatterns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="avgDuration"
                    stroke="var(--color-avgDuration)"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="totalSessions"
                    stroke="var(--color-totalSessions)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* User Segments */}
        <Card>
          <CardHeader>
            <CardTitle>User Segments</CardTitle>
            <CardDescription>Analysis of different user types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userSegments.map((segment) => (
                <div key={segment.segment} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{segment.segment}</h4>
                    <p className="text-sm text-muted-foreground">
                      {segment.count} users • {segment.frequency} usage
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{segment.avgDuration}h</div>
                    <div className="text-xs text-muted-foreground">Avg duration</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

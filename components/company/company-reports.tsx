"use client"

import { Download } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const revenueData = [
  { month: "Jan", revenue: 8200 },
  { month: "Feb", revenue: 9400 },
  { month: "Mar", revenue: 10800 },
  { month: "Apr", revenue: 11200 },
  { month: "May", revenue: 12450 },
  { month: "Jun", revenue: 11800 },
]

const usageData = [
  { month: "Jan", usage: 68 },
  { month: "Feb", usage: 72 },
  { month: "Mar", usage: 75 },
  { month: "Apr", usage: 82 },
  { month: "May", usage: 85 },
  { month: "Jun", usage: 80 },
]

const locationRevenueData = [
  { location: "Headquarters", revenue: 12450 },
  { location: "Downtown Office", revenue: 8320 },
  { location: "West Campus", revenue: 9640 },
  { location: "Research Center", revenue: 4200 },
]

export function CompanyReports({ companyId }: { companyId: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Reports</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue trends over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "#0066FF",
                  },
                }}
                className="aspect-[4/2]"
              >
                <LineChart
                  accessibilityLayer
                  data={revenueData}
                  margin={{
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0066FF"
                    strokeWidth={2}
                    dot={{ fill: "#0066FF", r: 4 }}
                    activeDot={{ r: 6, fill: "#0066FF" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Monthly Usage</CardTitle>
              <CardDescription>Occupancy rates over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ChartContainer
                config={{
                  usage: {
                    label: "Usage",
                    color: "#0066FF",
                  },
                }}
                className="aspect-[4/2]"
              >
                <LineChart
                  accessibilityLayer
                  data={usageData}
                  margin={{
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="usage"
                    stroke="#0066FF"
                    strokeWidth={2}
                    dot={{ fill: "#0066FF", r: 4 }}
                    activeDot={{ r: 6, fill: "#0066FF" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Revenue by Location</CardTitle>
              <CardDescription>Current month revenue breakdown by location</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "#0066FF",
                  },
                }}
                className="aspect-[4/2]"
              >
                <BarChart
                  accessibilityLayer
                  data={locationRevenueData}
                  layout="vertical"
                  margin={{
                    left: 120,
                    right: 10,
                    top: 10,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid horizontal strokeDasharray="3 3" />
                  <YAxis dataKey="location" type="category" width={110} tickLine={false} axisLine={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="#0066FF" radius={4} barSize={20} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

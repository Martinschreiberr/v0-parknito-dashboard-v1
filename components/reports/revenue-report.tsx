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
import { Button } from "@/components/ui/button"
import { CalendarDays, Download, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

interface RevenueReportProps {
  lang: string
  dict: any
  companyId: string
}

// Sample revenue data
const monthlyRevenue = [
  { month: "Jan", revenue: 12500, target: 15000, growth: 8.2 },
  { month: "Feb", revenue: 14200, target: 15000, growth: 13.6 },
  { month: "Mar", revenue: 16800, target: 15000, growth: 18.3 },
  { month: "Apr", revenue: 15400, target: 15000, growth: 2.7 },
  { month: "May", revenue: 18200, target: 15000, growth: 21.3 },
  { month: "Jun", revenue: 19500, target: 15000, growth: 30.0 },
]

const revenueByLocation = [
  { name: "Downtown", value: 35000, color: "#0088FE" },
  { name: "Airport", value: 28000, color: "#00C49F" },
  { name: "Mall", value: 22000, color: "#FFBB28" },
  { name: "Office", value: 15000, color: "#FF8042" },
]

const dailyRevenue = [
  { day: "Mon", revenue: 2800, transactions: 145 },
  { day: "Tue", revenue: 3200, transactions: 167 },
  { day: "Wed", revenue: 2900, transactions: 152 },
  { day: "Thu", revenue: 3100, transactions: 163 },
  { day: "Fri", revenue: 3500, transactions: 182 },
  { day: "Sat", revenue: 2200, transactions: 118 },
  { day: "Sun", revenue: 1800, transactions: 95 },
]

const revenueStreams = [
  { category: "Hourly Parking", amount: 45000, percentage: 45, change: 12.5 },
  { category: "Monthly Passes", amount: 28000, percentage: 28, change: 8.3 },
  { category: "Daily Parking", amount: 15000, percentage: 15, change: -2.1 },
  { category: "Event Parking", amount: 8000, percentage: 8, change: 25.7 },
  { category: "Penalties", amount: 4000, percentage: 4, change: -15.2 },
]

export function RevenueReport({ lang, dict, companyId }: RevenueReportProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Revenue Analysis</h2>
          <p className="text-muted-foreground">Financial performance and revenue insights</p>
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
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$100,000</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3" />
              +15.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average per Day</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,226</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3" />
              +8.7% vs last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue per Spot</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$212</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3" />
              +5.3% vs last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Achievement</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">108%</div>
            <p className="text-xs text-green-600">
              <TrendingUp className="inline h-3 w-3" />
              Above target by $8,000
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Revenue vs target over the last 6 months</CardDescription>
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
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" />
                  <Bar dataKey="target" fill="var(--color-target)" opacity={0.5} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue by Location */}
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
                    data={revenueByLocation}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                  >
                    {revenueByLocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Daily Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue This Week</CardTitle>
            <CardDescription>Revenue and transaction count by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
                transactions: {
                  label: "Transactions",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar yAxisId="left" dataKey="revenue" fill="var(--color-revenue)" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="transactions"
                    stroke="var(--color-transactions)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue Streams */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Streams</CardTitle>
            <CardDescription>Breakdown by revenue category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueStreams.map((stream) => (
                <div key={stream.category} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{stream.category}</h4>
                    <p className="text-sm text-muted-foreground">{stream.percentage}% of total revenue</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">${stream.amount.toLocaleString()}</div>
                    <div
                      className={`text-xs flex items-center ${stream.change >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {stream.change >= 0 ? (
                        <TrendingUp className="inline h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="inline h-3 w-3 mr-1" />
                      )}
                      {Math.abs(stream.change)}%
                    </div>
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

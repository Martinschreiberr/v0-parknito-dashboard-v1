"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import type { Dictionary } from "@/lib/dictionary"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const occupancyData = [
  { company: "Acme Corp", occupancy: 85 },
  { company: "TechGiant", occupancy: 72 },
  { company: "Globex", occupancy: 65 },
  { company: "Initech", occupancy: 90 },
  { company: "Umbrella", occupancy: 78 },
]

const usageData = [
  { time: "6am", usage: 10 },
  { time: "8am", usage: 45 },
  { time: "10am", usage: 75 },
  { time: "12pm", usage: 85 },
  { time: "2pm", usage: 80 },
  { time: "4pm", usage: 90 },
  { time: "6pm", usage: 65 },
  { time: "8pm", usage: 40 },
  { time: "10pm", usage: 20 },
]

export function DashboardCharts({ dict }: { dict: Dictionary }) {
  // Create fallback texts in case the dictionary structure is missing
  const chartTexts = {
    occupancy_by_company: dict?.dashboard?.charts?.occupancy_by_company || "Occupancy by Company",
    current_rates: dict?.dashboard?.charts?.current_rates || "Current Rates",
    peak_usage: dict?.dashboard?.charts?.peak_usage || "Peak Usage",
    hourly_usage: dict?.dashboard?.charts?.hourly_usage || "Hourly Usage",
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{chartTexts.occupancy_by_company}</CardTitle>
          <CardDescription>{chartTexts.current_rates}</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <ChartContainer
            config={{
              occupancy: {
                label: "Occupancy",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="aspect-[4/3]"
          >
            <BarChart
              accessibilityLayer
              data={occupancyData}
              layout="vertical"
              margin={{
                left: 80,
                right: 10,
                top: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid horizontal strokeDasharray="3 3" />
              <YAxis dataKey="company" type="category" width={70} tickLine={false} axisLine={false} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="occupancy" fill="#0066FF" radius={4} barSize={20} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{chartTexts.peak_usage}</CardTitle>
          <CardDescription>{chartTexts.hourly_usage}</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <ChartContainer
            config={{
              usage: {
                label: "Usage",
                color: "#0066FF",
              },
            }}
            className="aspect-[4/3]"
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
              <XAxis dataKey="time" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
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
    </>
  )
}

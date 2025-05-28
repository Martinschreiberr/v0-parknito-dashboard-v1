"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, LineChart, PieChart, Table2, FileSpreadsheet, Download } from "lucide-react"

interface CustomReportBuilderProps {
  lang: string
  dict: any
  companyId: string
}

export function CustomReportBuilder({ lang, dict, companyId }: CustomReportBuilderProps) {
  const [reportType, setReportType] = useState("occupancy")
  const [chartType, setChartType] = useState("bar")

  // Translations with fallbacks
  const t = {
    title: dict?.reports?.custom?.title || "Custom Report Builder",
    description:
      dict?.reports?.custom?.description || "Create custom reports by selecting data sources and visualization options",
    dataSource: dict?.reports?.custom?.data_source || "Data Source",
    visualization: dict?.reports?.custom?.visualization || "Visualization",
    fields: dict?.reports?.custom?.fields || "Fields",
    filters: dict?.reports?.custom?.filters || "Filters",
    preview: dict?.reports?.custom?.preview || "Preview",
    generate: dict?.reports?.custom?.generate || "Generate Report",
    save: dict?.reports?.custom?.save || "Save Template",
    export: dict?.reports?.custom?.export || "Export",
    bar: dict?.reports?.custom?.bar_chart || "Bar Chart",
    line: dict?.reports?.custom?.line_chart || "Line Chart",
    pie: dict?.reports?.custom?.pie_chart || "Pie Chart",
    table: dict?.reports?.custom?.table || "Table",
    occupancy: dict?.reports?.custom?.occupancy_data || "Occupancy Data",
    revenue: dict?.reports?.custom?.revenue_data || "Revenue Data",
    usage: dict?.reports?.custom?.usage_data || "Usage Data",
    users: dict?.reports?.custom?.users_data || "Users Data",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Data Source Selection */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">{t.dataSource}</h3>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder={t.dataSource} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="occupancy">{t.occupancy}</SelectItem>
                <SelectItem value="revenue">{t.revenue}</SelectItem>
                <SelectItem value="usage">{t.usage}</SelectItem>
                <SelectItem value="users">{t.users}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Visualization Type */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">{t.visualization}</h3>
            <Tabs value={chartType} onValueChange={setChartType} className="w-full">
              <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
                <TabsTrigger value="bar" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {t.bar}
                </TabsTrigger>
                <TabsTrigger value="line" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  {t.line}
                </TabsTrigger>
                <TabsTrigger value="pie" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  {t.pie}
                </TabsTrigger>
                <TabsTrigger value="table" className="flex items-center gap-2">
                  <Table2 className="h-4 w-4" />
                  {t.table}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Fields and Filters */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{t.fields}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] rounded-md border border-dashed flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Drag and drop fields here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{t.filters}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] rounded-md border border-dashed flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Configure filters here</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{t.preview}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-md border border-dashed flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Report preview will appear here</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button>{t.generate}</Button>
            <Button variant="outline">{t.save}</Button>
            <Button variant="outline" className="ml-auto">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Excel
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

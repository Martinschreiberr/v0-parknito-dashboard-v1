import { Suspense } from "react"
import { getDictionary } from "@/lib/dictionary"
import { ReportsOverview } from "@/components/reports/reports-overview"
import { ReportsFilters } from "@/components/reports/reports-filters"
import { OccupancyReport } from "@/components/reports/occupancy-report"
import { RevenueReport } from "@/components/reports/revenue-report"
import { UsageReport } from "@/components/reports/usage-report"
import { CustomReportBuilder } from "@/components/reports/custom-report-builder"
import { ReportScheduler } from "@/components/reports/report-scheduler"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Calendar, BarChart3, DollarSign, Clock, Settings } from "lucide-react"

export default async function ReportsPage({
  params,
}: {
  params: {
    lang: string
    companyId: string
  }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{dict.reports?.title || "Reports & Analytics"}</h1>
          <p className="text-muted-foreground">
            {dict.reports?.subtitle || "Comprehensive insights into your parking operations"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            {dict.reports?.actions?.schedule || "Schedule Reports"}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {dict.reports?.actions?.export_all || "Export All"}
          </Button>
          <Button size="sm">
            <Settings className="mr-2 h-4 w-4" />
            {dict.reports?.actions?.custom_report || "Custom Report"}
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <Suspense fallback={<div className="h-32 rounded-lg bg-muted animate-pulse" />}>
        <ReportsOverview lang={params.lang} dict={dict} companyId={params.companyId} />
      </Suspense>

      {/* Filters */}
      <ReportsFilters lang={params.lang} dict={dict} />

      {/* Reports Tabs */}
      <Tabs defaultValue="occupancy" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="occupancy" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            {dict.reports?.tabs?.occupancy || "Occupancy"}
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            {dict.reports?.tabs?.revenue || "Revenue"}
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {dict.reports?.tabs?.usage || "Usage"}
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {dict.reports?.tabs?.custom || "Custom"}
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {dict.reports?.tabs?.scheduled || "Scheduled"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="occupancy" className="space-y-4">
          <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
            <OccupancyReport lang={params.lang} dict={dict} companyId={params.companyId} />
          </Suspense>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
            <RevenueReport lang={params.lang} dict={dict} companyId={params.companyId} />
          </Suspense>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
            <UsageReport lang={params.lang} dict={dict} companyId={params.companyId} />
          </Suspense>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
            <CustomReportBuilder lang={params.lang} dict={dict} companyId={params.companyId} />
          </Suspense>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
            <ReportScheduler lang={params.lang} dict={dict} companyId={params.companyId} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

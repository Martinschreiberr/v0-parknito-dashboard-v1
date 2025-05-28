import { Suspense } from "react"
import { getDictionary } from "@/lib/dictionary"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportsOverview } from "@/components/reports/reports-overview"
import { ReportsFilters } from "@/components/reports/reports-filters"
import { OccupancyReport } from "@/components/reports/occupancy-report"
import { RevenueReport } from "@/components/reports/revenue-report"
import { UsageReport } from "@/components/reports/usage-report"

export default async function ReportsPage({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(lang as "en" | "cs")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{dict.reports.title}</h1>
        <p className="text-muted-foreground">{dict.reports.description}</p>
      </div>

      <ReportsFilters lang={lang} dict={dict} />

      <Suspense fallback={<div>Loading...</div>}>
        <ReportsOverview lang={lang} dict={dict} />
      </Suspense>

      <Tabs defaultValue="occupancy" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="occupancy">{dict.reports.tabs.occupancy}</TabsTrigger>
          <TabsTrigger value="revenue">{dict.reports.tabs.revenue}</TabsTrigger>
          <TabsTrigger value="usage">{dict.reports.tabs.usage}</TabsTrigger>
        </TabsList>
        <TabsContent value="occupancy">
          <OccupancyReport lang={lang} dict={dict} />
        </TabsContent>
        <TabsContent value="revenue">
          <RevenueReport lang={lang} dict={dict} />
        </TabsContent>
        <TabsContent value="usage">
          <UsageReport lang={lang} dict={dict} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

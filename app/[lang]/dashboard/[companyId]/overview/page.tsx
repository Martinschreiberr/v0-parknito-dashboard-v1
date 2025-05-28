import { Suspense } from "react"
import { getDictionary } from "@/lib/dictionary"
import { DashboardStats } from "@/components/dashboard/stats"
import { DashboardCharts } from "@/components/dashboard/charts"
import { DashboardActivityFeed } from "@/components/dashboard/activity-feed"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentReservations } from "@/components/dashboard/recent-reservations"
import { LocationOverview } from "@/components/dashboard/location-overview"

export default async function OverviewPage({
  params,
}: {
  params: { lang: string; companyId: string }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {dict.dashboard?.overview?.title || "Dashboard Overview"}
          </h1>
          <p className="text-muted-foreground">
            {dict.dashboard?.overview?.subtitle?.replace("{companyId}", params.companyId) ||
              `Welcome to your parking management dashboard for Company ${params.companyId}`}
          </p>
        </div>
        <QuickActions lang={params.lang} dict={dict} companyId={params.companyId} />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<div className="h-32 rounded-lg bg-muted animate-pulse" />}>
          <DashboardStats dict={dict} companyId={params.companyId} />
        </Suspense>
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
          <DashboardCharts dict={dict} companyId={params.companyId} />
        </Suspense>
        <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
          <DashboardActivityFeed lang={params.lang} dict={dict} companyId={params.companyId} />
        </Suspense>
      </div>

      {/* Recent Activity and Location Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
            <RecentReservations lang={params.lang} dict={dict} companyId={params.companyId} />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
            <LocationOverview lang={params.lang} dict={dict} companyId={params.companyId} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

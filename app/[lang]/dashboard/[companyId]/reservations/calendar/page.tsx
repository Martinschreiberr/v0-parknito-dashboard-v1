import { Suspense } from "react"
import { getDictionary } from "@/lib/dictionary"
import { ReservationsCalendar } from "@/components/reservations/reservations-calendar"
import { ReservationsCalendarFilters } from "@/components/reservations/reservations-calendar-filters"
import { ReservationsCalendarSkeleton } from "@/components/reservations/reservations-calendar-skeleton"
import { CreateReservationModal } from "@/components/reservations/create-reservation-modal"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Download, ArrowLeft, List, Kanban } from "lucide-react"
import Link from "next/link"

export default async function ReservationsCalendarPage({
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
          <div className="flex items-center gap-2">
            <Link href={`/${params.lang}/dashboard/${params.companyId}/reservations`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-3xl font-semibold tracking-tight">
              {dict.reservations?.calendar?.title || "Reservations Calendar"}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {dict.reservations?.calendar?.description || "View and manage reservations in calendar format"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {dict.reservations?.actions?.export || "Export"}
          </Button>
          <CreateReservationModal lang={params.lang} dict={dict}>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              {dict.reservations?.actions?.create || "New Reservation"}
            </Button>
          </CreateReservationModal>
        </div>
      </div>

      {/* Calendar View Tabs */}
      <Tabs defaultValue="month" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="day">{dict.reservations?.calendar?.day || "Day"}</TabsTrigger>
            <TabsTrigger value="week">{dict.reservations?.calendar?.week || "Week"}</TabsTrigger>
            <TabsTrigger value="month">{dict.reservations?.calendar?.month || "Month"}</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Link href={`/${params.lang}/dashboard/${params.companyId}/reservations`}>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                {dict.reservations?.views?.list || "List"}
              </Button>
            </Link>
            <Link href={`/${params.lang}/dashboard/${params.companyId}/reservations?view=kanban`}>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Kanban className="h-4 w-4" />
                {dict.reservations?.views?.kanban || "Kanban"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <ReservationsCalendarFilters lang={params.lang} dict={dict} />

        <TabsContent value="day" className="space-y-4">
          <Suspense fallback={<ReservationsCalendarSkeleton />}>
            <ReservationsCalendar lang={params.lang} dict={dict} companyId={params.companyId} view="day" />
          </Suspense>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <Suspense fallback={<ReservationsCalendarSkeleton />}>
            <ReservationsCalendar lang={params.lang} dict={dict} companyId={params.companyId} view="week" />
          </Suspense>
        </TabsContent>

        <TabsContent value="month" className="space-y-4">
          <Suspense fallback={<ReservationsCalendarSkeleton />}>
            <ReservationsCalendar lang={params.lang} dict={dict} companyId={params.companyId} view="month" />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

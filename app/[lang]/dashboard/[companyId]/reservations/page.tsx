import { Suspense } from "react"
import { getDictionary } from "@/lib/dictionary"
import { ReservationsKanban } from "@/components/reservations/reservations-kanban"
import { ReservationsList } from "@/components/reservations/reservations-list"
import { ReservationsFilters } from "@/components/reservations/reservations-filters"
import { ReservationsStats } from "@/components/reservations/reservations-stats"
import { CreateReservationModal } from "@/components/reservations/create-reservation-modal"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Download, Calendar, List, Kanban } from "lucide-react"
import Link from "next/link"

export default async function ReservationsPage({
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
          <h1 className="text-3xl font-semibold tracking-tight">{dict.reservations?.title || "Reservations"}</h1>
          <p className="text-muted-foreground">
            {dict.reservations?.subtitle || "Manage parking reservations and bookings"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {dict.reservations?.actions?.export || "Export"}
          </Button>
          <Link href={`/${params.lang}/dashboard/${params.companyId}/reservations/calendar`}>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              {dict.reservations?.actions?.calendar || "Calendar View"}
            </Button>
          </Link>
          <CreateReservationModal lang={params.lang} dict={dict}>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              {dict.reservations?.actions?.create || "New Reservation"}
            </Button>
          </CreateReservationModal>
        </div>
      </div>

      {/* Stats Overview */}
      <Suspense fallback={<div className="h-32 rounded-lg bg-muted animate-pulse" />}>
        <ReservationsStats lang={params.lang} dict={dict} companyId={params.companyId} />
      </Suspense>

      {/* Filters */}
      <ReservationsFilters lang={params.lang} dict={dict} />

      {/* Reservations Views */}
      <Tabs defaultValue="kanban" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kanban" className="flex items-center gap-2">
            <Kanban className="h-4 w-4" />
            {dict.reservations?.views?.kanban || "Kanban"}
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            {dict.reservations?.views?.list || "List"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-4">
          <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
            <ReservationsKanban lang={params.lang} dict={dict} companyId={params.companyId} />
          </Suspense>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <div className="rounded-md border">
            <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
              <ReservationsList lang={params.lang} dict={dict} companyId={params.companyId} />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

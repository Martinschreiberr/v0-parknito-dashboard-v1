import { CalendarClock, Download, Search } from "lucide-react"
import { getDictionary } from "@/lib/dictionary"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateReservationModal } from "@/components/reservations/create-reservation-modal"
import { ReservationsKanban } from "@/components/reservations/reservations-kanban"
import { ReservationsList } from "@/components/reservations/reservations-list"

export default async function ReservationsPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as "en" | "cs")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{dict.reservations.title}</h1>
          <p className="text-muted-foreground">{dict.reservations.description}</p>
        </div>
        <CreateReservationModal lang={params.lang} dict={dict} />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder={dict.reservations.search} className="w-full pl-8" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CalendarClock className="mr-2 h-4 w-4" />
            May 10, 2025
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {dict.reservations.export}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="kanban">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="kanban">{dict.reservations.kanban}</TabsTrigger>
          <TabsTrigger value="list">{dict.reservations.list}</TabsTrigger>
        </TabsList>
        <TabsContent value="kanban" className="mt-4">
          <ReservationsKanban lang={params.lang} dict={dict} />
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <ReservationsList lang={params.lang} dict={dict} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

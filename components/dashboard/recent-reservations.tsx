import { Calendar, Clock, MapPin, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface RecentReservationsProps {
  lang: string
  dict: any
  companyId: string
}

const mockReservations = [
  {
    id: "1",
    user: "John Smith",
    location: "TechGiant HQ",
    spot: "A12",
    date: "2024-01-15",
    time: "09:00 - 17:00",
    status: "active",
  },
  {
    id: "2",
    user: "Sarah Johnson",
    location: "Acme Corp",
    spot: "B23",
    date: "2024-01-15",
    time: "10:00 - 16:00",
    status: "upcoming",
  },
  {
    id: "3",
    user: "Mike Davis",
    location: "Globex",
    spot: "C45",
    date: "2024-01-14",
    time: "08:30 - 18:00",
    status: "completed",
  },
]

export function RecentReservations({ lang, dict, companyId }: RecentReservationsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          {dict.dashboard?.recentReservations?.title || "Recent Reservations"}
        </CardTitle>
        <Button variant="outline" size="sm">
          {dict.dashboard?.recentReservations?.viewAll || "View All"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockReservations.map((reservation) => (
          <div key={reservation.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{reservation.user}</span>
                <Badge
                  variant={
                    reservation.status === "active"
                      ? "default"
                      : reservation.status === "upcoming"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {reservation.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {reservation.location} - {reservation.spot}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {reservation.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {reservation.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

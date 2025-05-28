"use client"

import { useState, useEffect } from "react"
import { Calendar, momentLocalizer, type Views } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { ReservationDetailsModal } from "./reservation-details-modal"
import type { Dictionary } from "@/lib/dictionary"

// Configure moment locale
moment.locale("en")

// Setup the localizer with proper configuration
const localizer = momentLocalizer(moment)

// Define event types
interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  status: "upcoming" | "active" | "expired"
  location: string
  spot: string
  user: string
  licensePlate: string
  allDay?: boolean
  resource?: any
}

interface ReservationsCalendarProps {
  lang: string
  dict: Dictionary
  companyId: string
  view?: "day" | "week" | "month"
}

export function ReservationsCalendar({ lang, dict, companyId, view = "month" }: ReservationsCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentView, setCurrentView] = useState<keyof typeof Views>(view as keyof typeof Views)
  const [currentDate, setCurrentDate] = useState(new Date())

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockEvents: CalendarEvent[] = [
      {
        id: "1",
        title: "Sarah Johnson - Spot A3",
        start: new Date(2025, 4, 11, 9, 0),
        end: new Date(2025, 4, 15, 17, 0),
        status: "upcoming",
        location: "Headquarters",
        spot: "A3",
        user: "Sarah Johnson",
        licensePlate: "DEF-456",
      },
      {
        id: "2",
        title: "Jennifer Lee - Spot C4",
        start: new Date(2025, 4, 12, 8, 0),
        end: new Date(2025, 4, 12, 18, 0),
        status: "upcoming",
        location: "Downtown Office",
        spot: "C4",
        user: "Jennifer Lee",
        licensePlate: "MNO-345",
      },
      {
        id: "3",
        title: "Tony Stark - Spot A1",
        start: new Date(2025, 4, 13, 10, 0),
        end: new Date(2025, 4, 14, 16, 0),
        status: "upcoming",
        location: "Research Center",
        spot: "A1",
        user: "Tony Stark",
        licensePlate: "STK-001",
      },
      {
        id: "4",
        title: "John Smith - Spot A1",
        start: new Date(2025, 4, 10, 8, 0),
        end: new Date(2025, 4, 10, 20, 0),
        status: "active",
        location: "Headquarters",
        spot: "A1",
        user: "John Smith",
        licensePlate: "ABC-123",
      },
      {
        id: "5",
        title: "Michael Brown - Spot A4",
        start: new Date(2025, 4, 10, 9, 0),
        end: new Date(2025, 4, 10, 19, 0),
        status: "active",
        location: "West Campus",
        spot: "A4",
        user: "Michael Brown",
        licensePlate: "XYZ-789",
      },
      {
        id: "6",
        title: "Emily Davis - Spot B3",
        start: new Date(2025, 4, 10, 7, 30),
        end: new Date(2025, 4, 10, 17, 30),
        status: "active",
        location: "Downtown Office",
        spot: "B3",
        user: "Emily Davis",
        licensePlate: "GHI-789",
      },
      {
        id: "7",
        title: "Robert Wilson - Spot C1",
        start: new Date(2025, 4, 10, 8, 0),
        end: new Date(2025, 4, 10, 18, 0),
        status: "active",
        location: "Headquarters",
        spot: "C1",
        user: "Robert Wilson",
        licensePlate: "JKL-012",
      },
      {
        id: "8",
        title: "David Miller - Spot B2",
        start: new Date(2025, 4, 5, 9, 0),
        end: new Date(2025, 4, 9, 17, 0),
        status: "expired",
        location: "Research Center",
        spot: "B2",
        user: "David Miller",
        licensePlate: "PQR-678",
      },
      {
        id: "9",
        title: "Lisa Wang - Spot A2",
        start: new Date(2025, 4, 8, 8, 0),
        end: new Date(2025, 4, 8, 18, 0),
        status: "expired",
        location: "Headquarters",
        spot: "A2",
        user: "Lisa Wang",
        licensePlate: "LMN-456",
      },
    ]

    // Set today's date to May 10, 2025 for demo purposes
    const today = new Date(2025, 4, 10)
    setCurrentDate(today)
    setEvents(mockEvents)
  }, [])

  // Handle event selection
  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  // Handle navigation
  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate)
  }

  // Handle view change
  const handleViewChange = (newView: keyof typeof Views) => {
    setCurrentView(newView)
  }

  // Custom event styling
  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "#3b82f6" // default blue

    if (event.status === "active") {
      backgroundColor = "#22c55e" // green
    } else if (event.status === "upcoming") {
      backgroundColor = "#3b82f6" // blue
    } else if (event.status === "expired") {
      backgroundColor = "#6b7280" // gray
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
        fontWeight: 500,
      },
    }
  }

  // Define custom formats
  const formats = {
    timeGutterFormat: "HH:mm",
    dayFormat: "ddd D",
    dayHeaderFormat: "dddd, MMMM D",
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${moment(start).format("MMM D")} - ${moment(end).format("MMM D, YYYY")}`,
    monthHeaderFormat: "MMMM YYYY",
    weekdayFormat: "ddd",
    selectRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${moment(start).format("MMM D")} - ${moment(end).format("MMM D")}`,
    eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
    agendaTimeFormat: "HH:mm",
    agendaDateFormat: "ddd MMM D",
    agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
      `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
  }

  // Define custom messages
  const messages = {
    today: dict.reservations?.calendar?.today || "Today",
    previous: dict.reservations?.calendar?.previous || "Previous",
    next: dict.reservations?.calendar?.next || "Next",
    month: dict.reservations?.calendar?.month || "Month",
    week: dict.reservations?.calendar?.week || "Week",
    day: dict.reservations?.calendar?.day || "Day",
    agenda: dict.reservations?.calendar?.agenda || "Agenda",
    date: dict.reservations?.calendar?.date || "Date",
    time: dict.reservations?.calendar?.time || "Time",
    event: dict.reservations?.calendar?.event || "Event",
    noEventsInRange: dict.reservations?.calendar?.no_events || "No reservations in this time range",
    showMore: (total: number) => `+${total} more`,
  }

  return (
    <div className="space-y-4">
      {/* Custom Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => handleNavigate(new Date(2025, 4, 10))}>
            <CalendarIcon className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-medium">
            {currentView === "day" && moment(currentDate).format("MMMM D, YYYY")}
            {currentView === "week" &&
              `${moment(currentDate).startOf("week").format("MMM D")} - ${moment(currentDate).endOf("week").format("MMM D, YYYY")}`}
            {currentView === "month" && moment(currentDate).format("MMMM YYYY")}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={currentView === "day" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewChange("day")}
          >
            {dict.reservations?.calendar?.day || "Day"}
          </Button>
          <Button
            variant={currentView === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewChange("week")}
          >
            {dict.reservations?.calendar?.week || "Week"}
          </Button>
          <Button
            variant={currentView === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewChange("month")}
          >
            {dict.reservations?.calendar?.month || "Month"}
          </Button>
        </div>
      </div>

      {/* Calendar */}
      <Card className="p-4">
        <div className="h-[700px]">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            view={currentView}
            views={["month", "week", "day"]}
            date={currentDate}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            formats={formats}
            messages={messages}
            popup
            showMultiDayTimes
            step={60}
            timeslots={1}
            min={new Date(2025, 4, 10, 6, 0, 0)}
            max={new Date(2025, 4, 10, 22, 0, 0)}
          />
        </div>
      </Card>

      {/* Legend */}
      <Card className="p-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm">{dict.reservations?.status?.active || "Active"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm">{dict.reservations?.status?.upcoming || "Upcoming"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-500 rounded"></div>
            <span className="text-sm">{dict.reservations?.status?.expired || "Expired"}</span>
          </div>
        </div>
      </Card>

      {/* Reservation Details Modal */}
      {selectedEvent && (
        <ReservationDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          reservation={{
            id: selectedEvent.id,
            company: "Company Name",
            user: selectedEvent.user,
            licensePlate: selectedEvent.licensePlate,
            spot: selectedEvent.spot,
            location: selectedEvent.location,
            timeWindow: `${moment(selectedEvent.start).format("MMM D, YYYY HH:mm")} - ${moment(selectedEvent.end).format("MMM D, YYYY HH:mm")}`,
            status: selectedEvent.status,
          }}
          lang={lang}
          dict={dict}
        />
      )}
    </div>
  )
}

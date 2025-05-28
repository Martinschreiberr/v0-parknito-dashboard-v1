"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { Dictionary } from "@/lib/dictionary"

interface ReservationsCalendarFiltersProps {
  lang: string
  dict: Dictionary
}

export function ReservationsCalendarFilters({ lang, dict }: ReservationsCalendarFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Handle adding a filter badge
  const addFilter = (type: string, value: string) => {
    if (value === "all") {
      // Remove any existing filters of this type
      setActiveFilters(activeFilters.filter((filter) => !filter.startsWith(`${type}:`)))
      return
    }

    const filterString = `${type}:${value}`
    if (!activeFilters.includes(filterString)) {
      // Remove any existing filters of this type
      const updatedFilters = activeFilters.filter((filter) => !filter.startsWith(`${type}:`))
      setActiveFilters([...updatedFilters, filterString])
    }
  }

  // Handle removing a filter badge
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))

    // Reset the corresponding filter state
    const [type, value] = filter.split(":")
    if (type === "status") setStatusFilter("all")
    if (type === "location") setLocationFilter("all")
  }

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
    addFilter("status", value)
  }

  // Handle location filter change
  const handleLocationChange = (value: string) => {
    setLocationFilter(value)
    addFilter("location", value)
  }

  // Get display name for filter values
  const getFilterDisplayName = (filter: string) => {
    const [type, value] = filter.split(":")

    if (type === "status") {
      if (value === "active") return dict.reservations?.status?.active || "Active"
      if (value === "upcoming") return dict.reservations?.status?.upcoming || "Upcoming"
      if (value === "expired") return dict.reservations?.status?.expired || "Expired"
    }

    if (type === "location") {
      return value // In a real app, you'd map this to a location name
    }

    return value
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={dict.reservations?.search || "Search reservations..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={dict.reservations?.filters?.status || "Status"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{dict.reservations?.filters?.all_statuses || "All Statuses"}</SelectItem>
            <SelectItem value="upcoming">{dict.reservations?.status?.upcoming || "Upcoming"}</SelectItem>
            <SelectItem value="active">{dict.reservations?.status?.active || "Active"}</SelectItem>
            <SelectItem value="expired">{dict.reservations?.status?.expired || "Expired"}</SelectItem>
          </SelectContent>
        </Select>

        {/* Location Filter */}
        <Select value={locationFilter} onValueChange={handleLocationChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={dict.reservations?.filters?.location || "Location"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{dict.reservations?.filters?.all_locations || "All Locations"}</SelectItem>
            <SelectItem value="headquarters">Headquarters</SelectItem>
            <SelectItem value="downtown">Downtown Office</SelectItem>
            <SelectItem value="west">West Campus</SelectItem>
            <SelectItem value="research">Research Center</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {dict.reservations?.filters?.active_filters || "Active Filters:"}
          </span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {getFilterDisplayName(filter)}
              <button onClick={() => removeFilter(filter)} className="ml-1 rounded-full hover:bg-muted p-0.5">
                <span className="sr-only">Remove filter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setActiveFilters([])
              setStatusFilter("all")
              setLocationFilter("all")
            }}
            className="h-7 text-xs"
          >
            {dict.reservations?.filters?.clear_all || "Clear All"}
          </Button>
        </div>
      )}
    </div>
  )
}

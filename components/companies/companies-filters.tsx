"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { Dictionary } from "@/lib/dictionary"

interface CompaniesFiltersProps {
  lang: string
  dict: Dictionary
}

export function CompaniesFilters({ lang, dict }: CompaniesFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [sizeFilter, setSizeFilter] = useState<string>("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("")
    setSizeFilter("")
    setActiveFilters([])
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{dict.companies?.filters?.title || "Filters"}</h3>
        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-2 h-4 w-4" />
            {dict.companies?.filters?.clear_all || "Clear All"}
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={dict.companies?.filters?.search_placeholder || "Search companies..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={dict.companies?.filters?.status || "Status"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{dict.companies?.filters?.all_statuses || "All Statuses"}</SelectItem>
            <SelectItem value="active">{dict.companies?.status?.active || "Active"}</SelectItem>
            <SelectItem value="paused">{dict.companies?.status?.paused || "Paused"}</SelectItem>
            <SelectItem value="pending">{dict.companies?.status?.pending || "Pending"}</SelectItem>
          </SelectContent>
        </Select>

        {/* Size Filter */}
        <Select value={sizeFilter} onValueChange={setSizeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={dict.companies?.filters?.size || "Company Size"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{dict.companies?.filters?.all_sizes || "All Sizes"}</SelectItem>
            <SelectItem value="small">Small (1-50 users)</SelectItem>
            <SelectItem value="medium">Medium (51-200 users)</SelectItem>
            <SelectItem value="large">Large (200+ users)</SelectItem>
          </SelectContent>
        </Select>

        {/* Advanced Filters */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {dict.companies?.filters?.advanced || "Advanced"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">{dict.companies?.filters?.advanced_filters || "Advanced Filters"}</h4>

              <div className="space-y-2">
                <Label>{dict.companies?.filters?.location_count || "Location Count"}</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="1-5" />
                    <Label htmlFor="1-5">1-5 locations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="6-10" />
                    <Label htmlFor="6-10">6-10 locations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="11+" />
                    <Label htmlFor="11+">11+ locations</Label>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setActiveFilters(activeFilters.filter((f) => f !== filter))
                }}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

interface ReportsFiltersProps {
  lang: string
  dict: any
}

export function ReportsFilters({ lang, dict }: ReportsFiltersProps) {
  const filterLabels = {
    dateRange: dict.reports?.filters?.date_range || "Date Range",
    location: dict.reports?.filters?.location || "Location",
    company: dict.reports?.filters?.company || "Company",
  }

  return (
    <div>
      <h2>{filterLabels.dateRange}</h2>
      <h2>{filterLabels.location}</h2>
      <h2>{filterLabels.company}</h2>
    </div>
  )
}

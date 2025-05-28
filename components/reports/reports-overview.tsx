interface ReportsOverviewProps {
  lang: string
  dict: any
  companyId: string
}

export function ReportsOverview({ lang, dict, companyId }: ReportsOverviewProps) {
  const title = dict.reports?.overview?.title || "Reports Overview"
  const subtitle = dict.reports?.overview?.subtitle || "Key metrics and insights"

  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <p>Company ID: {companyId}</p>
      {/* Add your reports overview content here */}
    </div>
  )
}

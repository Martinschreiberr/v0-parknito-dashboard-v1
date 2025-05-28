interface OccupancyReportProps {
  lang: string
  dict: any
  companyId: string
}

export function OccupancyReport({ lang, dict, companyId }: OccupancyReportProps) {
  const t = (key: string) => dict?.[key] || key

  // Use companyId for data filtering or other logic here
  // Example: Fetch data based on companyId

  return (
    <div>
      <h1>{t("Occupancy Report")}</h1>
      <p>
        {t("Language")}: {lang}
      </p>
      <p>
        {t("Company ID")}: {companyId}
      </p>
      {/* Rest of the report content */}
    </div>
  )
}

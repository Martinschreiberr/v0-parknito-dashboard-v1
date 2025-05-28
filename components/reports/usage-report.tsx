interface UsageReportProps {
  lang: string
  dict: any
  companyId: string
}

export function UsageReport({ lang, dict, companyId }: UsageReportProps) {
  const t = (key: string, fallback: string = key) => {
    return dict?.[key] || fallback
  }

  return (
    <div>
      <h1>{t("usageReportTitle", "Usage Report")}</h1>
      <p>
        {t("companyId", "Company ID")}: {companyId}
      </p>
      {/* Add your report content here, filtering data by companyId */}
    </div>
  )
}

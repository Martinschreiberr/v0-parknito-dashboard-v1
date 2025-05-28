import { Suspense } from "react"
import { getDictionary } from "@/lib/dictionary"
import { CompaniesTable } from "@/components/companies/companies-table"
import { CompaniesFilters } from "@/components/companies/companies-filters"
import { CompaniesStats } from "@/components/companies/companies-stats"
import { CreateCompanyModal } from "@/components/companies/create-company-modal"
import { Button } from "@/components/ui/button"
import { Plus, Download, Upload } from "lucide-react"

export default async function CompaniesPage({
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
          <h1 className="text-3xl font-semibold tracking-tight">{dict.companies?.title || "Companies"}</h1>
          <p className="text-muted-foreground">
            {dict.companies?.subtitle || "Manage and monitor all companies in your parking network"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            {dict.companies?.actions?.import || "Import"}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {dict.companies?.actions?.export || "Export"}
          </Button>
          <CreateCompanyModal lang={params.lang} dict={dict}>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              {dict.companies?.actions?.add_company || "Add Company"}
            </Button>
          </CreateCompanyModal>
        </div>
      </div>

      {/* Stats Overview */}
      <Suspense fallback={<div className="h-32 rounded-lg bg-muted animate-pulse" />}>
        <CompaniesStats lang={params.lang} dict={dict} />
      </Suspense>

      {/* Filters */}
      <CompaniesFilters lang={params.lang} dict={dict} />

      {/* Companies Table */}
      <div className="rounded-md border">
        <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
          <CompaniesTable lang={params.lang} dict={dict} />
        </Suspense>
      </div>
    </div>
  )
}

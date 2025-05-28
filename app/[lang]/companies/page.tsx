import Link from "next/link"
import { Download, Plus, Search } from "lucide-react"
import { getDictionary } from "@/lib/dictionary"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CompaniesTable } from "@/components/companies/companies-table"

export default async function CompaniesPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  // Ensure companies section exists in dictionary with fallbacks
  const companiesDict = dict.companies || {}

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{companiesDict.title || "Companies"}</h1>
          <p className="text-muted-foreground">
            {companiesDict.description || "Manage your companies and their locations"}
          </p>
        </div>
        <Button className="bg-[#0066FF] hover:bg-[#0055DD]" asChild>
          <Link href={`/${params.lang}/companies/new`}>
            <Plus className="mr-2 h-4 w-4" />
            {companiesDict.add || "Add Company"}
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder={companiesDict.search || "Search companies..."} className="w-full pl-8" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {dict.common?.export || "Export"}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <CompaniesTable lang={params.lang} dict={dict} />
        </CardContent>
      </Card>
    </div>
  )
}

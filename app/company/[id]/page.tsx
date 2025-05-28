import Link from "next/link"
import { ArrowLeft, Building2, Edit, MapPin, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyLocations } from "@/components/company/company-locations"
import { CompanyUsers } from "@/components/company/company-users"
import { CompanyReports } from "@/components/company/company-reports"

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the company data based on the ID
  const company = {
    id: params.id,
    name: "Acme Corporation",
    logo: "/placeholder.svg?height=40&width=40",
    tier: "Enterprise",
    description: "Global leader in innovative solutions",
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href="/companies">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to companies</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-semibold tracking-tight">{company.name}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Company Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100">
                    <Building2 className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium">{company.name}</p>
                    <p className="text-sm text-muted-foreground">{company.tier} Plan</p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">{company.description}</p>
                </div>

                <Button variant="outline" className="mt-2 w-full" asChild>
                  <Link href={`/companies/${company.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Company
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>Locations</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href={`/companies/${company.id}/locations/new`}>
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add Location</span>
                  </Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link
                  href={`/locations/1`}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Headquarters (42 spots)</span>
                </Link>
                <Link
                  href={`/locations/2`}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Downtown Office (28 spots)</span>
                </Link>
                <Link
                  href={`/locations/3`}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>West Campus (36 spots)</span>
                </Link>
                <Link
                  href={`/locations/4`}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Research Center (15 spots)</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="locations">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="locations" className="mt-4">
              <CompanyLocations companyId={company.id} />
            </TabsContent>
            <TabsContent value="users" className="mt-4">
              <CompanyUsers companyId={company.id} />
            </TabsContent>
            <TabsContent value="reports" className="mt-4">
              <CompanyReports companyId={company.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Building2, Users, MapPin, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Dictionary } from "@/lib/dictionary"

interface CompaniesStatsProps {
  lang: string
  dict: Dictionary
}

export function CompaniesStats({ lang, dict }: CompaniesStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {dict.companies?.stats?.total_companies || "Total Companies"}
          </CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">
            +2 {dict.companies?.stats?.from_last_month || "from last month"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {dict.companies?.stats?.active_companies || "Active Companies"}
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">21</div>
          <p className="text-xs text-muted-foreground">87.5% {dict.companies?.stats?.active_rate || "active rate"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{dict.companies?.stats?.total_users || "Total Users"}</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,247</div>
          <p className="text-xs text-muted-foreground">
            +89 {dict.companies?.stats?.from_last_month || "from last month"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {dict.companies?.stats?.total_locations || "Total Locations"}
          </CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">86</div>
          <p className="text-xs text-muted-foreground">
            +5 {dict.companies?.stats?.from_last_month || "from last month"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, MoreHorizontal, UserCog } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Company = {
  id: string
  name: string
  locations: number
  users: number
  status: "active" | "paused" | "pending"
}

const companies: Company[] = [
  {
    id: "1",
    name: "Acme Corporation",
    locations: 12,
    users: 48,
    status: "active",
  },
  {
    id: "2",
    name: "TechGiant Inc.",
    locations: 8,
    users: 36,
    status: "active",
  },
  {
    id: "3",
    name: "Globex Industries",
    locations: 5,
    users: 24,
    status: "active",
  },
  {
    id: "4",
    name: "Initech LLC",
    locations: 3,
    users: 15,
    status: "paused",
  },
  {
    id: "5",
    name: "Umbrella Corporation",
    locations: 7,
    users: 32,
    status: "active",
  },
  {
    id: "6",
    name: "Massive Dynamic",
    locations: 4,
    users: 18,
    status: "pending",
  },
  {
    id: "7",
    name: "Stark Industries",
    locations: 6,
    users: 27,
    status: "active",
  },
]

export function CompaniesTable({ lang, dict }: { lang: string; dict: Dictionary }) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])

  // Ensure companies section exists in dictionary with fallbacks
  const companiesDict = dict.companies || {}
  const tableDict = companiesDict.table || {}
  const statusDict = companiesDict.status || {}

  const toggleSelectAll = () => {
    if (selectedCompanies.length === companies.length) {
      setSelectedCompanies([])
    } else {
      setSelectedCompanies(companies.map((company) => company.id))
    }
  }

  const toggleSelectCompany = (id: string) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter((companyId) => companyId !== id))
    } else {
      setSelectedCompanies([...selectedCompanies, id])
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">{tableDict.company_name || "Company Name"}</TableHead>
          <TableHead className="w-[100px] text-center">{tableDict.locations || "Locations"}</TableHead>
          <TableHead className="w-[100px] text-center">{tableDict.active_users || "Active Users"}</TableHead>
          <TableHead className="w-[100px]">{tableDict.status || "Status"}</TableHead>
          <TableHead className="w-[80px] text-right">{tableDict.actions || "Actions"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell className="font-medium">
              <Link href={`/${lang}/companies/${company.id}`} className="flex items-center gap-2 hover:underline">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100">
                  <Building2 className="h-4 w-4 text-slate-500" />
                </div>
                {company.name}
              </Link>
            </TableCell>
            <TableCell className="text-center">{company.locations}</TableCell>
            <TableCell className="text-center">{company.users}</TableCell>
            <TableCell>
              <Badge
                variant={
                  company.status === "active" ? "default" : company.status === "paused" ? "secondary" : "outline"
                }
                className={
                  company.status === "active"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : company.status === "paused"
                      ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-100"
                }
              >
                {company.status === "active"
                  ? statusDict.active || "Active"
                  : company.status === "paused"
                    ? statusDict.paused || "Paused"
                    : statusDict.pending || "Pending"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{dict.common?.actions || "Actions"}</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Link href={`/${lang}/companies/${company.id}`} className="flex w-full items-center">
                      {dict.common?.view || "View details"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${lang}/companies/${company.id}/edit`} className="flex w-full items-center">
                      {dict.common?.edit || "Edit company"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCog className="mr-2 h-4 w-4" />
                    {companiesDict.assign_admin || "Assign admin role"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    {companiesDict.delete || "Delete company"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

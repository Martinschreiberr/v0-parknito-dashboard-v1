"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, Download, Edit, Plus, Trash2, Users } from "lucide-react"

interface ReportSchedulerProps {
  lang: string
  dict: any
  companyId: string
}

export function ReportScheduler({ lang, dict, companyId }: ReportSchedulerProps) {
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: 1,
      name: "Weekly Occupancy Report",
      type: "occupancy",
      frequency: "weekly",
      recipients: "admin@example.com",
      active: true,
      nextRun: "2023-06-12",
    },
    {
      id: 2,
      name: "Monthly Revenue Summary",
      type: "revenue",
      frequency: "monthly",
      recipients: "finance@example.com",
      active: true,
      nextRun: "2023-07-01",
    },
    {
      id: 3,
      name: "Daily Usage Statistics",
      type: "usage",
      frequency: "daily",
      recipients: "operations@example.com",
      active: false,
      nextRun: "2023-06-06",
    },
  ])

  // Translations with fallbacks
  const t = {
    title: dict?.reports?.scheduler?.title || "Scheduled Reports",
    description: dict?.reports?.scheduler?.description || "Manage your scheduled reports and create new ones",
    create: dict?.reports?.scheduler?.create || "Create Scheduled Report",
    name: dict?.reports?.scheduler?.name || "Report Name",
    type: dict?.reports?.scheduler?.type || "Type",
    frequency: dict?.reports?.scheduler?.frequency || "Frequency",
    recipients: dict?.reports?.scheduler?.recipients || "Recipients",
    status: dict?.reports?.scheduler?.status || "Status",
    nextRun: dict?.reports?.scheduler?.next_run || "Next Run",
    actions: dict?.reports?.scheduler?.actions || "Actions",
    active: dict?.reports?.scheduler?.active || "Active",
    inactive: dict?.reports?.scheduler?.inactive || "Inactive",
    daily: dict?.reports?.scheduler?.daily || "Daily",
    weekly: dict?.reports?.scheduler?.weekly || "Weekly",
    monthly: dict?.reports?.scheduler?.monthly || "Monthly",
    occupancy: dict?.reports?.scheduler?.occupancy || "Occupancy",
    revenue: dict?.reports?.scheduler?.revenue || "Revenue",
    usage: dict?.reports?.scheduler?.usage || "Usage",
  }

  const toggleStatus = (id: number) => {
    setScheduledReports((reports) =>
      reports.map((report) => (report.id === id ? { ...report, active: !report.active } : report)),
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </div>
        <Button size="sm" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t.create}
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.name}</TableHead>
              <TableHead>{t.type}</TableHead>
              <TableHead>{t.frequency}</TableHead>
              <TableHead>{t.recipients}</TableHead>
              <TableHead>{t.nextRun}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead className="text-right">{t.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduledReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {report.type === "occupancy" && <Users className="h-4 w-4" />}
                    {report.type === "revenue" && <Download className="h-4 w-4" />}
                    {report.type === "usage" && <Clock className="h-4 w-4" />}
                    {t[report.type as keyof typeof t] || report.type}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {t[report.frequency as keyof typeof t] || report.frequency}
                  </div>
                </TableCell>
                <TableCell>{report.recipients}</TableCell>
                <TableCell>{report.nextRun}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch checked={report.active} onCheckedChange={() => toggleStatus(report.id)} />
                    <span className="text-sm">{report.active ? t.active : t.inactive}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

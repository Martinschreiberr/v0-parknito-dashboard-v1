"use client"

import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Permission = {
  id: string
  name: string
  description: string
  roles: {
    admin: boolean
    manager: boolean
    staff: boolean
    visitor: boolean
  }
}

const permissions: Permission[] = [
  {
    id: "1",
    name: "View Location Details",
    description: "Can view basic location information",
    roles: {
      admin: true,
      manager: true,
      staff: true,
      visitor: true,
    },
  },
  {
    id: "2",
    name: "Manage Spots",
    description: "Can add, edit, and delete parking spots",
    roles: {
      admin: true,
      manager: true,
      staff: false,
      visitor: false,
    },
  },
  {
    id: "3",
    name: "Create Reservations",
    description: "Can create new parking reservations",
    roles: {
      admin: true,
      manager: true,
      staff: true,
      visitor: false,
    },
  },
  {
    id: "4",
    name: "Approve Reservations",
    description: "Can approve pending reservations",
    roles: {
      admin: true,
      manager: true,
      staff: false,
      visitor: false,
    },
  },
  {
    id: "5",
    name: "Cancel Reservations",
    description: "Can cancel existing reservations",
    roles: {
      admin: true,
      manager: true,
      staff: false,
      visitor: false,
    },
  },
  {
    id: "6",
    name: "Manage Access Settings",
    description: "Can configure access methods (camera, phone, etc.)",
    roles: {
      admin: true,
      manager: false,
      staff: false,
      visitor: false,
    },
  },
  {
    id: "7",
    name: "View Reports",
    description: "Can view usage and revenue reports",
    roles: {
      admin: true,
      manager: true,
      staff: false,
      visitor: false,
    },
  },
  {
    id: "8",
    name: "Remote Gate Control",
    description: "Can remotely open/close gates",
    roles: {
      admin: true,
      manager: true,
      staff: true,
      visitor: false,
    },
  },
]

export function LocationPermissions({ locationId }: { locationId: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Permission Matrix</h2>
        <Button variant="outline">Edit Permissions</Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Role-Based Access Control</CardTitle>
          <CardDescription>Manage what each role can do at this location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Permission</TableHead>
                  <TableHead className="text-center">Admin</TableHead>
                  <TableHead className="text-center">Manager</TableHead>
                  <TableHead className="text-center">Staff</TableHead>
                  <TableHead className="text-center">Visitor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{permission.name}</p>
                        <p className="text-sm text-muted-foreground">{permission.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {permission.roles.admin ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {permission.roles.manager ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {permission.roles.staff ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {permission.roles.visitor ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

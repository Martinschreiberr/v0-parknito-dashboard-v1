import Link from "next/link"
import { MoreHorizontal, Plus, UserCog } from "lucide-react"

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
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "user"
  status: "active" | "invited" | "disabled"
}

const users: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@acme.com",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@acme.com",
    role: "manager",
    status: "active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@acme.com",
    role: "user",
    status: "active",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@acme.com",
    role: "user",
    status: "active",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@acme.com",
    role: "manager",
    status: "active",
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer.lee@acme.com",
    role: "user",
    status: "invited",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@acme.com",
    role: "user",
    status: "disabled",
  },
]

export function CompanyUsers({ companyId }: { companyId: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button className="bg-[#0066FF] hover:bg-[#0055DD]" asChild>
          <Link href={`/companies/${companyId}/users/invite`}>
            <Plus className="mr-2 h-4 w-4" />
            Invite User
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input placeholder="Search users..." className="max-w-sm" />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                        : user.role === "manager"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : "bg-slate-100 text-slate-800 hover:bg-slate-100"
                    }
                  >
                    {user.role === "admin" ? "Admin" : user.role === "manager" ? "Manager" : "User"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "active" ? "default" : user.status === "invited" ? "secondary" : "outline"}
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : user.status === "invited"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {user.status === "active" ? "Active" : user.status === "invited" ? "Invited" : "Disabled"}
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
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Link href={`/users/${user.id}`} className="flex w-full items-center">
                          View profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCog className="mr-2 h-4 w-4" />
                        Change role
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === "active" ? (
                        <DropdownMenuItem className="text-red-600">Disable account</DropdownMenuItem>
                      ) : user.status === "disabled" ? (
                        <DropdownMenuItem className="text-green-600">Enable account</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>Resend invitation</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

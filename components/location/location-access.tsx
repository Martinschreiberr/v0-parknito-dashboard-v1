"use client"

import { useState } from "react"
import { Camera, Car, Copy, Edit, Phone, Plus, Trash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

type AccessMethod = {
  id: string
  name: string
  type: "camera" | "phone" | "remote"
  status: "active" | "inactive" | "maintenance"
  details: string
}

type AuthorizedPhone = {
  id: string
  name: string
  phoneNumber: string
  company: string
  role: string
  lastUsed?: string
}

type AuthorizedPlate = {
  id: string
  licensePlate: string
  vehicleModel: string
  owner: string
  company: string
  expiresAt: string
}

// Sample data for access methods
const accessMethods: AccessMethod[] = [
  {
    id: "1",
    name: "Main Entrance Camera",
    type: "camera",
    status: "active",
    details: "License plate recognition camera at main entrance",
  },
  {
    id: "2",
    name: "Exit Gate Camera",
    type: "camera",
    status: "active",
    details: "License plate recognition camera at exit gate",
  },
  {
    id: "3",
    name: "Phone Access System",
    type: "phone",
    status: "active",
    details: "Dial-in system for authorized phone numbers",
  },
  {
    id: "4",
    name: "Remote Gate Control",
    type: "remote",
    status: "active",
    details: "Admin remote access for gate control",
  },
]

// Sample data for authorized phone numbers
const authorizedPhones: AuthorizedPhone[] = [
  {
    id: "1",
    name: "John Smith",
    phoneNumber: "+1 (555) 123-4567",
    company: "Acme Corporation",
    role: "Admin",
    lastUsed: "May 9, 2025",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    phoneNumber: "+1 (555) 234-5678",
    company: "TechGiant Inc.",
    role: "Manager",
    lastUsed: "May 8, 2025",
  },
  {
    id: "3",
    name: "Michael Brown",
    phoneNumber: "+1 (555) 345-6789",
    company: "Globex Industries",
    role: "User",
    lastUsed: "May 7, 2025",
  },
  {
    id: "4",
    name: "Emily Davis",
    phoneNumber: "+1 (555) 456-7890",
    company: "Initech LLC",
    role: "User",
    lastUsed: "May 5, 2025",
  },
]

// Sample data for authorized license plates
const authorizedPlates: AuthorizedPlate[] = [
  {
    id: "1",
    licensePlate: "ABC-123",
    vehicleModel: "Tesla Model 3",
    owner: "John Smith",
    company: "Acme Corporation",
    expiresAt: "Dec 31, 2025",
  },
  {
    id: "2",
    licensePlate: "DEF-456",
    vehicleModel: "Toyota Prius",
    owner: "Sarah Johnson",
    company: "TechGiant Inc.",
    expiresAt: "Nov 15, 2025",
  },
  {
    id: "3",
    licensePlate: "GHI-789",
    vehicleModel: "Honda Civic",
    owner: "Michael Brown",
    company: "Globex Industries",
    expiresAt: "Oct 1, 2025",
  },
  {
    id: "4",
    licensePlate: "JKL-012",
    vehicleModel: "Ford Mustang",
    owner: "Emily Davis",
    company: "Initech LLC",
    expiresAt: "Sep 30, 2025",
  },
  {
    id: "5",
    licensePlate: "MNO-345",
    vehicleModel: "Chevrolet Bolt",
    owner: "Robert Wilson",
    company: "Umbrella Corporation",
    expiresAt: "Aug 15, 2025",
  },
]

export function LocationAccess({ locationId }: { locationId: string }) {
  const [gateStatus, setGateStatus] = useState<"closed" | "opening" | "open" | "closing">("closed")
  const [accessSettings, setAccessSettings] = useState({
    cameraEnabled: true,
    phoneEnabled: true,
    remoteEnabled: true,
  })

  const handleGateAction = (action: "open" | "close") => {
    if (action === "open") {
      setGateStatus("opening")
      setTimeout(() => {
        setGateStatus("open")
        toast({
          title: "Gate opened successfully",
          description: "The gate has been opened remotely.",
        })
      }, 2000)
    } else {
      setGateStatus("closing")
      setTimeout(() => {
        setGateStatus("closed")
        toast({
          title: "Gate closed successfully",
          description: "The gate has been closed remotely.",
        })
      }, 2000)
    }
  }

  const toggleAccessMethod = (method: "cameraEnabled" | "phoneEnabled" | "remoteEnabled") => {
    setAccessSettings((prev) => ({
      ...prev,
      [method]: !prev[method],
    }))

    toast({
      title: `${method.replace("Enabled", "")} access ${accessSettings[method] ? "disabled" : "enabled"} successfully`,
      description: `The ${method.replace("Enabled", "")} access method has been ${
        accessSettings[method] ? "disabled" : "enabled"
      }.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Access Controls</h2>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gate">Gate Control</TabsTrigger>
          <TabsTrigger value="plates">License Plates</TabsTrigger>
          <TabsTrigger value="phones">Phone Numbers</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accessMethods.map((method) => (
              <Card key={method.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {method.type === "camera" ? (
                        <Camera className="h-5 w-5 text-slate-500" />
                      ) : method.type === "phone" ? (
                        <Phone className="h-5 w-5 text-slate-500" />
                      ) : (
                        <Car className="h-5 w-5 text-slate-500" />
                      )}
                      <CardTitle className="text-base">{method.name}</CardTitle>
                    </div>
                    <Badge
                      className={
                        method.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : method.status === "inactive"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {method.status === "active"
                        ? "Active"
                        : method.status === "inactive"
                          ? "Inactive"
                          : "Maintenance"}
                    </Badge>
                  </div>
                  <CardDescription>{method.details}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Switch
                      checked={
                        method.type === "camera"
                          ? accessSettings.cameraEnabled
                          : method.type === "phone"
                            ? accessSettings.phoneEnabled
                            : accessSettings.remoteEnabled
                      }
                      onCheckedChange={() =>
                        toggleAccessMethod(
                          method.type === "camera"
                            ? "cameraEnabled"
                            : method.type === "phone"
                              ? "phoneEnabled"
                              : "remoteEnabled",
                        )
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Access Activity Log</CardTitle>
              <CardDescription>Recent access events at this location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <Car className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Vehicle Entry</p>
                      <p className="text-xs text-muted-foreground">Just now</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tesla Model 3 (ABC-123) entered via license plate recognition
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Phone Access</p>
                      <p className="text-xs text-muted-foreground">10 minutes ago</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sarah Johnson accessed via phone number verification
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                    <Car className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Vehicle Exit</p>
                      <p className="text-xs text-muted-foreground">25 minutes ago</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Honda Civic (GHI-789) exited via license plate recognition
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <Car className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Remote Access</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Admin opened gate remotely for visitor vehicle</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gate Control Tab */}
        <TabsContent value="gate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Remote Gate Control</CardTitle>
              <CardDescription>Remotely open and close the parking gate</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-6 py-6">
              <div
                className={`flex h-32 w-32 items-center justify-center rounded-full ${
                  gateStatus === "closed" ? "bg-red-100" : gateStatus === "open" ? "bg-green-100" : "bg-amber-100"
                }`}
              >
                <div
                  className={`text-center ${
                    gateStatus === "closed"
                      ? "text-red-700"
                      : gateStatus === "open"
                        ? "text-green-700"
                        : "text-amber-700"
                  }`}
                >
                  <Car className="mx-auto h-12 w-12" />
                  <p className="mt-2 font-medium capitalize">{gateStatus}</p>
                </div>
              </div>

              <div className="flex w-full max-w-md gap-4">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="lg"
                  disabled={gateStatus === "open" || gateStatus === "opening"}
                  onClick={() => handleGateAction("open")}
                >
                  {gateStatus === "opening" ? "Opening..." : "Open Gate"}
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  size="lg"
                  disabled={gateStatus === "closed" || gateStatus === "closing"}
                  onClick={() => handleGateAction("close")}
                >
                  {gateStatus === "closing" ? "Closing..." : "Close Gate"}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t px-6 py-4">
              <p className="text-center text-sm text-muted-foreground">
                Gate operations are logged and require admin permissions. Use responsibly.
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gate Operation History</CardTitle>
              <CardDescription>Recent gate operations at this location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Gate Opened</p>
                    <p className="text-sm text-muted-foreground">By: John Smith (Admin)</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Today, 10:15 AM</p>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Gate Closed</p>
                    <p className="text-sm text-muted-foreground">By: John Smith (Admin)</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Today, 10:18 AM</p>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Gate Opened</p>
                    <p className="text-sm text-muted-foreground">By: Sarah Johnson (Manager)</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Today, 9:32 AM</p>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Gate Closed</p>
                    <p className="text-sm text-muted-foreground">By: Sarah Johnson (Manager)</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Today, 9:35 AM</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Gate Opened</p>
                    <p className="text-sm text-muted-foreground">By: System (Automatic)</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Today, 8:45 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* License Plates Tab */}
        <TabsContent value="plates" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Authorized License Plates</h3>
              <p className="text-sm text-muted-foreground">
                Vehicles with these license plates can enter automatically
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#0066FF] hover:bg-[#0055DD]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add License Plate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New License Plate</DialogTitle>
                  <DialogDescription>Add a new authorized license plate for automatic access.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="license-plate">License Plate</Label>
                    <Input id="license-plate" placeholder="e.g. ABC-123" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="vehicle-model">Vehicle Model</Label>
                    <Input id="vehicle-model" placeholder="e.g. Tesla Model 3" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="owner">Owner</Label>
                    <Input id="owner" placeholder="e.g. John Smith" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="e.g. Acme Corporation" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="expires">Expires At</Label>
                    <Input id="expires" type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-[#0066FF] hover:bg-[#0055DD]">
                    Add License Plate
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">License Plate</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Vehicle</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Owner</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Company</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Expires</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {authorizedPlates.map((plate) => (
                      <tr key={plate.id} className="border-b">
                        <td className="px-4 py-3 text-sm font-medium">{plate.licensePlate}</td>
                        <td className="px-4 py-3 text-sm">{plate.vehicleModel}</td>
                        <td className="px-4 py-3 text-sm">{plate.owner}</td>
                        <td className="px-4 py-3 text-sm">{plate.company}</td>
                        <td className="px-4 py-3 text-sm">{plate.expiresAt}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>License Plate Recognition Settings</CardTitle>
              <CardDescription>Configure the license plate recognition system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Entry</Label>
                  <p className="text-sm text-muted-foreground">Allow automatic entry for recognized plates</p>
                </div>
                <Switch
                  checked={accessSettings.cameraEnabled}
                  onCheckedChange={() => toggleAccessMethod("cameraEnabled")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Capture Unrecognized Plates</Label>
                  <p className="text-sm text-muted-foreground">Save images of unrecognized license plates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notification on Entry</Label>
                  <p className="text-sm text-muted-foreground">Send notifications when plates are recognized</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Log All Plate Readings</Label>
                  <p className="text-sm text-muted-foreground">Keep a log of all license plate readings</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Phone Numbers Tab */}
        <TabsContent value="phones" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Authorized Phone Numbers</h3>
              <p className="text-sm text-muted-foreground">Users with these phone numbers can dial in for access</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#0066FF] hover:bg-[#0055DD]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Phone Number
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Phone Number</DialogTitle>
                  <DialogDescription>Add a new authorized phone number for dial-in access.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="e.g. John Smith" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="e.g. +1 (555) 123-4567" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="e.g. Acme Corporation" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" placeholder="e.g. Admin, Manager, User" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-[#0066FF] hover:bg-[#0055DD]">
                    Add Phone Number
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Phone Number</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Company</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Last Used</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {authorizedPhones.map((phone) => (
                      <tr key={phone.id} className="border-b">
                        <td className="px-4 py-3 text-sm font-medium">{phone.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-1">
                            {phone.phoneNumber}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-1 h-6 w-6"
                              onClick={() => {
                                navigator.clipboard.writeText(phone.phoneNumber)
                                toast({
                                  title: "Phone number copied",
                                  description: "The phone number has been copied to your clipboard.",
                                })
                              }}
                            >
                              <Copy className="h-3 w-3" />
                              <span className="sr-only">Copy</span>
                            </Button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{phone.company}</td>
                        <td className="px-4 py-3 text-sm">{phone.role}</td>
                        <td className="px-4 py-3 text-sm">{phone.lastUsed || "Never"}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phone Access Settings</CardTitle>
              <CardDescription>Configure the phone-based access system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Phone Access System</Label>
                  <p className="text-sm text-muted-foreground">Enable phone-based access control</p>
                </div>
                <Switch
                  checked={accessSettings.phoneEnabled}
                  onCheckedChange={() => toggleAccessMethod("phoneEnabled")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require PIN Code</Label>
                  <p className="text-sm text-muted-foreground">Require additional PIN verification</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Call Recording</Label>
                  <p className="text-sm text-muted-foreground">Record all access calls for security</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Access Hours</Label>
                  <p className="text-sm text-muted-foreground">Limit phone access to business hours</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Access Phone Number</h4>
                    <p className="text-sm text-muted-foreground">Users call this number to request access</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 text-sm">+1 (555) 987-6543</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        navigator.clipboard.writeText("+1 (555) 987-6543")
                        toast({
                          title: "Phone number copied",
                          description: "The access phone number has been copied to your clipboard.",
                        })
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import Link from "next/link"
import { MapPin, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Location = {
  id: string
  name: string
  address: string
  spots: number
  occupancy: number
  revenue: number
}

const locations: Location[] = [
  {
    id: "1",
    name: "Headquarters",
    address: "123 Main St, San Francisco, CA",
    spots: 42,
    occupancy: 85,
    revenue: 12450,
  },
  {
    id: "2",
    name: "Downtown Office",
    address: "456 Market St, San Francisco, CA",
    spots: 28,
    occupancy: 92,
    revenue: 8320,
  },
  {
    id: "3",
    name: "West Campus",
    address: "789 Oak Ave, Palo Alto, CA",
    spots: 36,
    occupancy: 78,
    revenue: 9640,
  },
  {
    id: "4",
    name: "Research Center",
    address: "101 Pine St, Mountain View, CA",
    spots: 15,
    occupancy: 60,
    revenue: 4200,
  },
]

export function CompanyLocations({ companyId }: { companyId: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Locations</h2>
        <Button className="bg-[#0066FF] hover:bg-[#0055DD]" asChild>
          <Link href={`/companies/${companyId}/locations/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {locations.map((location) => (
          <Card key={location.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100">
                    <MapPin className="h-4 w-4 text-slate-500" />
                  </div>
                  <CardTitle className="text-lg">{location.name}</CardTitle>
                </div>
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
                      <Link href={`/locations/${location.id}`} className="flex w-full items-center">
                        View details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/locations/${location.id}/edit`} className="flex w-full items-center">
                        Edit location
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Delete location</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>{location.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Total Spots</p>
                  <p className="text-lg font-medium">{location.spots}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Occupancy</p>
                  <p className="text-lg font-medium">{location.occupancy}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="text-lg font-medium">${location.revenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/locations/${location.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

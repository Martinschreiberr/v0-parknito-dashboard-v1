import Link from "next/link"
import { Building2, MapPin, MoreHorizontal, Star } from "lucide-react"
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

// Import locations from the grid component
import { locations } from "./locations-grid"

export function LocationsList({ lang, dict, companyId }: { lang: string; dict: Dictionary; companyId: string }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-center">Spots</TableHead>
            <TableHead className="text-center">Occupancy</TableHead>
            <TableHead className="text-center">Price/Hour</TableHead>
            <TableHead className="text-center">Rating</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow key={location.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {location.featured && <Badge className="bg-[#0066FF] hover:bg-[#0055DD]">Featured</Badge>}
                  <Link
                    href={`/${lang}/dashboard/${companyId}/locations/${location.id}/detail`}
                    className="font-medium hover:underline"
                  >
                    {location.name}
                  </Link>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  {location.company}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {location.address}, {location.city}
                </div>
              </TableCell>
              <TableCell className="text-center">{location.spots}</TableCell>
              <TableCell className="text-center">{location.occupancy}%</TableCell>
              <TableCell className="text-center">${location.pricePerHour}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{location.rating}</span>
                  <span className="text-muted-foreground">({location.reviews})</span>
                </div>
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
                      <Link
                        href={`/${lang}/dashboard/${companyId}/locations/${location.id}/detail`}
                        className="flex w-full items-center"
                      >
                        View details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={`/${lang}/dashboard/${companyId}/locations/${location.id}/edit`}
                        className="flex w-full items-center"
                      >
                        Edit location
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Delete location</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

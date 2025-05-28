import Link from "next/link"
import Image from "next/image"
import { Building2, Car, MapPin, MoreHorizontal, Percent, Star, Heart } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  city: string
  company: string
  spots: number
  occupancy: number
  revenue: number
  rating: number
  reviews: number
  image: string
  featured?: boolean
  pricePerHour?: number
}

// Update the locations array export
export const locations: Location[] = [
  {
    id: "1",
    name: "Downtown Garage",
    address: "123 Main St",
    city: "San Francisco, CA",
    company: "Acme Corporation",
    spots: 42,
    occupancy: 85,
    revenue: 12450,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    pricePerHour: 8,
  },
  {
    id: "2",
    name: "Central Plaza Parking",
    address: "456 Market St",
    city: "San Francisco, CA",
    company: "TechGiant Inc.",
    spots: 28,
    occupancy: 92,
    revenue: 8320,
    rating: 4.6,
    reviews: 98,
    image: "/placeholder.svg?height=400&width=600",
    pricePerHour: 12,
  },
  {
    id: "3",
    name: "West Campus Lot",
    address: "789 Oak Ave",
    city: "Palo Alto, CA",
    company: "Globex Industries",
    spots: 36,
    occupancy: 78,
    revenue: 9640,
    rating: 4.5,
    reviews: 87,
    image: "/placeholder.svg?height=400&width=600",
    pricePerHour: 6,
  },
  {
    id: "4",
    name: "Research Center Garage",
    address: "101 Pine St",
    city: "Mountain View, CA",
    company: "Initech LLC",
    spots: 15,
    occupancy: 60,
    revenue: 4200,
    rating: 4.2,
    reviews: 45,
    image: "/placeholder.svg?height=400&width=600",
    pricePerHour: 10,
  },
  {
    id: "5",
    name: "Waterfront Parking",
    address: "200 Bay St",
    city: "San Francisco, CA",
    company: "Umbrella Corporation",
    spots: 64,
    occupancy: 75,
    revenue: 15800,
    rating: 4.7,
    reviews: 112,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    pricePerHour: 15,
  },
  {
    id: "6",
    name: "Tech Park Garage",
    address: "350 Innovation Dr",
    city: "Sunnyvale, CA",
    company: "Massive Dynamic",
    spots: 48,
    occupancy: 82,
    revenue: 11200,
    rating: 4.4,
    reviews: 76,
    image: "/placeholder.svg?height=400&width=600",
    pricePerHour: 9,
  },
  {
    id: "7",
    name: "Financial District Lot",
    address: "500 Montgomery St",
    city: "San Francisco, CA",
    company: "Stark Industries",
    spots: 32,
    occupancy: 88,
    revenue: 9800,
    rating: 4.6,
    reviews: 92,
    image: "/placeholder.svg?height=400&width=600",
    pricePerHour: 14,
  },
  {
    id: "8",
    name: "University Parking",
    address: "250 Campus Dr",
    city: "Stanford, CA",
    company: "Acme Corporation",
    spots: 56,
    occupancy: 70,
    revenue: 8400,
    rating: 4.3,
    reviews: 68,
    image: "/placeholder.svg?height=400&width=600",
    pricePerHour: 5,
  },
  {
    id: "9",
    name: "Shopping Center Garage",
    address: "800 Retail Way",
    city: "San Jose, CA",
    company: "TechGiant Inc.",
    spots: 120,
    occupancy: 65,
    revenue: 18600,
    rating: 4.5,
    reviews: 105,
    image: "/placeholder.svg?height=400&width=600",
    pricePerHour: 7,
  },
  {
    id: "10",
    name: "Airport Long-Term Parking",
    address: "1000 Airport Blvd",
    city: "San Francisco, CA",
    company: "Globex Industries",
    spots: 200,
    occupancy: 90,
    revenue: 45000,
    rating: 4.7,
    reviews: 230,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    pricePerHour: 20,
  },
  {
    id: "11",
    name: "Convention Center Garage",
    address: "150 Convention Way",
    city: "San Jose, CA",
    company: "Initech LLC",
    spots: 80,
    occupancy: 55,
    revenue: 12000,
    rating: 4.1,
    reviews: 62,
    image: "/placeholder.svg?height=400&width=600",
    pricePerHour: 11,
  },
  {
    id: "12",
    name: "Medical Center Parking",
    address: "300 Hospital Dr",
    city: "Palo Alto, CA",
    company: "Umbrella Corporation",
    spots: 45,
    occupancy: 72,
    revenue: 8900,
    rating: 4.4,
    reviews: 83,
    image: "/placeholder.svg?height=400&width=600",
    pricePerHour: 13,
  },
]

export function LocationsGrid({ lang, dict, companyId }: { lang: string; dict: Dictionary; companyId: string }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {locations.map((location) => (
        <Card
          key={location.id}
          className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <div className="relative">
            <Link href={`/${lang}/dashboard/${companyId}/locations/${location.id}/detail`}>
              <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                <Image
                  src={location.image || "/placeholder.svg"}
                  alt={location.name}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Heart icon (like Airbnb) */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to favorites</span>
            </Button>

            {/* Featured badge */}
            {location.featured && (
              <Badge className="absolute left-3 top-3 bg-[#0066FF] hover:bg-[#0055DD] text-white">Featured</Badge>
            )}

            {/* More options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 bottom-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity"
                >
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
          </div>

          <CardContent className="p-4">
            <Link href={`/${lang}/dashboard/${companyId}/locations/${location.id}/detail`}>
              <div className="space-y-2">
                {/* Location name and rating */}
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-base leading-tight hover:underline line-clamp-1">
                    {location.name}
                  </h3>
                  <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                    <Star className="h-4 w-4 fill-current text-black" />
                    <span className="text-sm font-medium">{location.rating}</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {location.address}, {location.city}
                  </span>
                </div>

                {/* Company */}
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="line-clamp-1">{location.company}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Car className="h-4 w-4" />
                      <span>{location.spots}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Percent className="h-4 w-4" />
                      <span>{location.occupancy}%</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="pt-1">
                  <div className="flex items-baseline gap-1">
                    <span className="font-semibold text-base">${location.pricePerHour}</span>
                    <span className="text-sm text-gray-600">per hour</span>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

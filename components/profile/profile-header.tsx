"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, MapPin, Calendar, Mail, Phone } from "lucide-react"

interface ProfileHeaderProps {
  dictionary: any
}

export function ProfileHeader({ dictionary }: ProfileHeaderProps) {
  // Mock user data - in real app, this would come from auth/database
  const user = {
    name: "John Doe",
    email: "john.doe@company.com",
    role: "admin",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    avatar: "/placeholder.svg?height=120&width=120",
    phone: "+1 (555) 123-4567",
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="secondary" className="capitalize">
              {user.role}
            </Badge>
          </div>

          {/* User Info Section */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground text-lg">{user.company}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {dictionary?.profile?.joinedIn || "Joined"} {user.joinDate}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button>{dictionary?.profile?.editProfile || "Edit Profile"}</Button>
              <Button variant="outline">{dictionary?.profile?.downloadData || "Download Data"}</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

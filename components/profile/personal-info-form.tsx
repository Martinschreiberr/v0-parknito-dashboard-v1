"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Save, User, Building, MapPin } from "lucide-react"

interface PersonalInfoFormProps {
  dictionary: any
}

export function PersonalInfoForm({ dictionary }: PersonalInfoFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {dictionary?.profile?.basicInfo || "Basic Information"}
          </CardTitle>
          <CardDescription>
            {dictionary?.profile?.basicInfoDesc || "Update your personal information and contact details."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{dictionary?.profile?.firstName || "First Name"}</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{dictionary?.profile?.lastName || "Last Name"}</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{dictionary?.profile?.email || "Email"}</Label>
            <Input id="email" type="email" defaultValue="john.doe@company.com" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{dictionary?.profile?.phone || "Phone"}</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">{dictionary?.profile?.timezone || "Timezone"}</Label>
              <Select defaultValue="pst">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">Pacific Standard Time</SelectItem>
                  <SelectItem value="est">Eastern Standard Time</SelectItem>
                  <SelectItem value="cst">Central Standard Time</SelectItem>
                  <SelectItem value="mst">Mountain Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">{dictionary?.profile?.bio || "Bio"}</Label>
            <Textarea
              id="bio"
              placeholder={dictionary?.profile?.bioPlaceholder || "Tell us about yourself..."}
              defaultValue="Experienced parking management professional with 5+ years in the industry."
            />
          </div>
        </CardContent>
      </Card>

      {/* Work Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {dictionary?.profile?.workInfo || "Work Information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">{dictionary?.profile?.jobTitle || "Job Title"}</Label>
              <Input id="jobTitle" defaultValue="Parking Operations Manager" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">{dictionary?.profile?.department || "Department"}</Label>
              <Input id="department" defaultValue="Operations" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="manager">{dictionary?.profile?.manager || "Manager"}</Label>
            <Input id="manager" defaultValue="Sarah Johnson" />
          </div>
        </CardContent>
      </Card>

      {/* Location & Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {dictionary?.profile?.locationPrefs || "Location & Preferences"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">{dictionary?.profile?.country || "Country"}</Label>
              <Select defaultValue="us">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="cz">Czech Republic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">{dictionary?.profile?.language || "Language"}</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="cs">Čeština</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{dictionary?.profile?.publicProfile || "Public Profile"}</Label>
                <p className="text-sm text-muted-foreground">
                  {dictionary?.profile?.publicProfileDesc || "Make your profile visible to other users"}
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{dictionary?.profile?.showEmail || "Show Email"}</Label>
                <p className="text-sm text-muted-foreground">
                  {dictionary?.profile?.showEmailDesc || "Display your email address on your profile"}
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? dictionary?.profile?.saving || "Saving..." : dictionary?.profile?.saveChanges || "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

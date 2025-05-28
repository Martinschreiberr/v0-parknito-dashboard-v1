"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createCompany } from "@/server/actions/companies"
import { createUser } from "@/server/actions/users"

interface SetupFormProps {
  dict: any
  lang: string
}

export function SetupForm({ dict, lang }: SetupFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    adminEmail: "",
    adminName: "",
    phone: "",
    address: "",
    subscriptionPlan: "basic",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create the company
      const company = await createCompany({
        name: formData.companyName,
        email: formData.adminEmail,
        phone: formData.phone,
        address: formData.address,
        subscription_plan: formData.subscriptionPlan,
        status: "active",
        location_count: 0,
        user_count: 1,
        monthly_revenue: 0,
      })

      // Create the admin user
      await createUser({
        name: formData.adminName,
        email: formData.adminEmail,
        role: "admin",
        company_id: company.id,
        status: "active",
        phone: formData.phone,
      })

      // Redirect to the new company's dashboard
      router.push(`/${lang}/dashboard/${company.id}/overview`)
    } catch (error) {
      console.error("Setup error:", error)
      // Handle error (you could add toast notification here)
    } finally {
      setIsLoading(false)
    }
  }

  const setupDict = dict?.setup || {}

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="companyName">{setupDict.company_name || "Company Name"}</Label>
        <Input
          id="companyName"
          type="text"
          required
          value={formData.companyName}
          onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
          placeholder={setupDict.company_name_placeholder || "Enter your company name"}
        />
      </div>

      <div>
        <Label htmlFor="adminName">{setupDict.admin_name || "Admin Name"}</Label>
        <Input
          id="adminName"
          type="text"
          required
          value={formData.adminName}
          onChange={(e) => setFormData((prev) => ({ ...prev, adminName: e.target.value }))}
          placeholder={setupDict.admin_name_placeholder || "Enter admin full name"}
        />
      </div>

      <div>
        <Label htmlFor="adminEmail">{setupDict.admin_email || "Admin Email"}</Label>
        <Input
          id="adminEmail"
          type="email"
          required
          value={formData.adminEmail}
          onChange={(e) => setFormData((prev) => ({ ...prev, adminEmail: e.target.value }))}
          placeholder={setupDict.admin_email_placeholder || "admin@company.com"}
        />
      </div>

      <div>
        <Label htmlFor="phone">{setupDict.phone || "Phone Number"}</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          placeholder={setupDict.phone_placeholder || "+1-555-0123"}
        />
      </div>

      <div>
        <Label htmlFor="address">{setupDict.address || "Company Address"}</Label>
        <Input
          id="address"
          type="text"
          value={formData.address}
          onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
          placeholder={setupDict.address_placeholder || "123 Business St, City, State"}
        />
      </div>

      <div>
        <Label htmlFor="subscriptionPlan">{setupDict.subscription_plan || "Subscription Plan"}</Label>
        <Select
          value={formData.subscriptionPlan}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, subscriptionPlan: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder={setupDict.select_plan || "Select a plan"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">{setupDict.plan_basic || "Basic - $29/month"}</SelectItem>
            <SelectItem value="professional">{setupDict.plan_professional || "Professional - $79/month"}</SelectItem>
            <SelectItem value="enterprise">{setupDict.plan_enterprise || "Enterprise - $199/month"}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? setupDict.creating || "Creating..." : setupDict.create_company || "Create Company & Get Started"}
      </Button>
    </form>
  )
}

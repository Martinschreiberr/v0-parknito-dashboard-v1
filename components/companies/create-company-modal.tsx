"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Dictionary } from "@/lib/dictionary"

interface CreateCompanyModalProps {
  lang: string
  dict: Dictionary
  children: React.ReactNode
}

export function CreateCompanyModal({ lang, dict, children }: CreateCompanyModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    size: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Creating company:", formData)
    setOpen(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      size: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dict.companies?.create_modal?.title || "Add New Company"}</DialogTitle>
          <DialogDescription>
            {dict.companies?.create_modal?.description || "Create a new company profile for parking management."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{dict.companies?.create_modal?.company_name || "Company Name"}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={dict.companies?.create_modal?.name_placeholder || "Enter company name"}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">{dict.companies?.create_modal?.email || "Email"}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={dict.companies?.create_modal?.email_placeholder || "company@example.com"}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">{dict.companies?.create_modal?.phone || "Phone"}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={dict.companies?.create_modal?.phone_placeholder || "+1 (555) 123-4567"}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="size">{dict.companies?.create_modal?.company_size || "Company Size"}</Label>
              <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={dict.companies?.create_modal?.size_placeholder || "Select company size"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (1-50 employees)</SelectItem>
                  <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                  <SelectItem value="large">Large (200+ employees)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">{dict.companies?.create_modal?.address || "Address"}</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder={dict.companies?.create_modal?.address_placeholder || "Enter company address"}
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">{dict.companies?.create_modal?.description || "Description"}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={
                  dict.companies?.create_modal?.description_placeholder || "Brief description of the company"
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {dict.companies?.create_modal?.cancel || "Cancel"}
            </Button>
            <Button type="submit">{dict.companies?.create_modal?.create || "Create Company"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"
import type { Dictionary } from "@/lib/dictionary"

import { useState } from "react"
import { CalendarIcon, Car, Check, ChevronRight, MapPin, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

// Import locations from the grid component
import { locations } from "../locations/locations-grid"

type Step = {
  id: string
  title: string
  description: string
}

// Sample spots data
const spots = [
  { id: "1", number: "A1", type: "standard", available: true },
  { id: "2", number: "A2", type: "standard", available: true },
  { id: "3", number: "A3", type: "handicap", available: true },
  { id: "4", number: "A4", type: "electric", available: true },
  { id: "5", number: "B1", type: "standard", available: false },
  { id: "6", number: "B2", type: "compact", available: true },
  { id: "7", number: "B3", type: "standard", available: false },
  { id: "8", number: "B4", type: "electric", available: true },
]

// Sample companies data
const companies = [
  { id: "1", name: "Acme Corporation" },
  { id: "2", name: "TechGiant Inc." },
  { id: "3", name: "Globex Industries" },
  { id: "4", name: "Initech LLC" },
  { id: "5", name: "Umbrella Corporation" },
]

// Sample users data
const users = [
  { id: "1", name: "John Smith", email: "john.smith@example.com", company: "Acme Corporation" },
  { id: "2", name: "Sarah Johnson", email: "sarah.johnson@example.com", company: "TechGiant Inc." },
  { id: "3", name: "Michael Brown", email: "michael.brown@example.com", company: "Globex Industries" },
  { id: "4", name: "Emily Davis", email: "emily.davis@example.com", company: "Initech LLC" },
  { id: "5", name: "Robert Wilson", email: "robert.wilson@example.com", company: "Umbrella Corporation" },
]

type CreateReservationModalProps = {
  children?: React.ReactNode
  preselectedLocationId?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | null
  lang?: string
  dict?: Dictionary
}

export function CreateReservationModal({
  children,
  preselectedLocationId,
  buttonVariant = "default",
  lang = "en",
  dict,
}: CreateReservationModalProps) {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    locationId: preselectedLocationId || "",
    spotId: "",
    startDate: new Date(),
    endDate: new Date(),
    userId: "",
    company: "",
    licensePlate: "",
    vehicleModel: "",
    reservationType: "subscription",
  })

  // Create a comprehensive fallback dictionary structure
  const fallbackDict = {
    reservations: {
      create_reservation: "Create Reservation",
      modal: {
        title: "Create New Reservation",
        description: "Complete the steps below to create a new parking reservation.",
        steps: {
          location: {
            title: "Select Location",
            description: "Choose a parking location",
            select_location: "Select a location",
            available_spots: "Available Spots",
            current_occupancy: "Current Occupancy",
          },
          spot: {
            title: "Select Spot",
            description: "Choose an available parking spot",
            select_spot: "Select an available parking spot",
          },
          date: {
            title: "Date & Time",
            description: "Select reservation period",
            reservation_type: "Reservation Type",
            subscription: "Subscription",
            subscription_desc: "Long-term recurring reservation",
            guest: "Guest Pass",
            guest_desc: "One-time reservation",
            date_range: "Select Date Range",
            start_date: "Start Date",
            end_date: "End Date",
            pick_date: "Pick a date",
          },
          details: {
            title: "User & Vehicle",
            description: "Enter user and vehicle details",
            company: "Company",
            select_company: "Select a company",
            user: "User",
            select_user: "Select a user",
            license_plate: "License Plate",
            license_plate_placeholder: "e.g. ABC-123",
            vehicle_model: "Vehicle Model",
            vehicle_model_placeholder: "e.g. Tesla Model 3",
          },
          review: {
            title: "Review & Confirm",
            description: "Review your reservation details",
            summary: "Reservation Summary",
            location: "Location:",
            spot: "Spot:",
            type: "Type:",
            dates: "Dates:",
            user: "User:",
            vehicle: "Vehicle:",
            ready: "Ready to confirm",
            ready_desc: "Click the button below to create this reservation",
          },
        },
        back: "Back",
        continue: "Continue",
        create: "Create Reservation",
        success: "Reservation created!",
        success_desc: "Your parking reservation has been successfully created.",
      },
    },
  }

  // Merge the provided dictionary with the fallback
  const d = {
    reservations: {
      create_reservation: dict?.reservations?.create_reservation || fallbackDict.reservations.create_reservation,
      modal: {
        title: dict?.reservations?.modal?.title || fallbackDict.reservations.modal.title,
        description: dict?.reservations?.modal?.description || fallbackDict.reservations.modal.description,
        steps: {
          location: {
            title:
              dict?.reservations?.modal?.steps?.location?.title || fallbackDict.reservations.modal.steps.location.title,
            description:
              dict?.reservations?.modal?.steps?.location?.description ||
              fallbackDict.reservations.modal.steps.location.description,
            select_location:
              dict?.reservations?.modal?.steps?.location?.select_location ||
              fallbackDict.reservations.modal.steps.location.select_location,
            available_spots:
              dict?.reservations?.modal?.steps?.location?.available_spots ||
              fallbackDict.reservations.modal.steps.location.available_spots,
            current_occupancy:
              dict?.reservations?.modal?.steps?.location?.current_occupancy ||
              fallbackDict.reservations.modal.steps.location.current_occupancy,
          },
          spot: {
            title: dict?.reservations?.modal?.steps?.spot?.title || fallbackDict.reservations.modal.steps.spot.title,
            description:
              dict?.reservations?.modal?.steps?.spot?.description ||
              fallbackDict.reservations.modal.steps.spot.description,
            select_spot:
              dict?.reservations?.modal?.steps?.spot?.select_spot ||
              fallbackDict.reservations.modal.steps.spot.select_spot,
          },
          date: {
            title: dict?.reservations?.modal?.steps?.date?.title || fallbackDict.reservations.modal.steps.date.title,
            description:
              dict?.reservations?.modal?.steps?.date?.description ||
              fallbackDict.reservations.modal.steps.date.description,
            reservation_type:
              dict?.reservations?.modal?.steps?.date?.reservation_type ||
              fallbackDict.reservations.modal.steps.date.reservation_type,
            subscription:
              dict?.reservations?.modal?.steps?.date?.subscription ||
              fallbackDict.reservations.modal.steps.date.subscription,
            subscription_desc:
              dict?.reservations?.modal?.steps?.date?.subscription_desc ||
              fallbackDict.reservations.modal.steps.date.subscription_desc,
            guest: dict?.reservations?.modal?.steps?.date?.guest || fallbackDict.reservations.modal.steps.date.guest,
            guest_desc:
              dict?.reservations?.modal?.steps?.date?.guest_desc ||
              fallbackDict.reservations.modal.steps.date.guest_desc,
            date_range:
              dict?.reservations?.modal?.steps?.date?.date_range ||
              fallbackDict.reservations.modal.steps.date.date_range,
            start_date:
              dict?.reservations?.modal?.steps?.date?.start_date ||
              fallbackDict.reservations.modal.steps.date.start_date,
            end_date:
              dict?.reservations?.modal?.steps?.date?.end_date || fallbackDict.reservations.modal.steps.date.end_date,
            pick_date:
              dict?.reservations?.modal?.steps?.date?.pick_date || fallbackDict.reservations.modal.steps.date.pick_date,
          },
          details: {
            title:
              dict?.reservations?.modal?.steps?.details?.title || fallbackDict.reservations.modal.steps.details.title,
            description:
              dict?.reservations?.modal?.steps?.details?.description ||
              fallbackDict.reservations.modal.steps.details.description,
            company:
              dict?.reservations?.modal?.steps?.details?.company ||
              fallbackDict.reservations.modal.steps.details.company,
            select_company:
              dict?.reservations?.modal?.steps?.details?.select_company ||
              fallbackDict.reservations.modal.steps.details.select_company,
            user: dict?.reservations?.modal?.steps?.details?.user || fallbackDict.reservations.modal.steps.details.user,
            select_user:
              dict?.reservations?.modal?.steps?.details?.select_user ||
              fallbackDict.reservations.modal.steps.details.select_user,
            license_plate:
              dict?.reservations?.modal?.steps?.details?.license_plate ||
              fallbackDict.reservations.modal.steps.details.license_plate,
            license_plate_placeholder:
              dict?.reservations?.modal?.steps?.details?.license_plate_placeholder ||
              fallbackDict.reservations.modal.steps.details.license_plate_placeholder,
            vehicle_model:
              dict?.reservations?.modal?.steps?.details?.vehicle_model ||
              fallbackDict.reservations.modal.steps.details.vehicle_model,
            vehicle_model_placeholder:
              dict?.reservations?.modal?.steps?.details?.vehicle_model_placeholder ||
              fallbackDict.reservations.modal.steps.details.vehicle_model_placeholder,
          },
          review: {
            title:
              dict?.reservations?.modal?.steps?.review?.title || fallbackDict.reservations.modal.steps.review.title,
            description:
              dict?.reservations?.modal?.steps?.review?.description ||
              fallbackDict.reservations.modal.steps.review.description,
            summary:
              dict?.reservations?.modal?.steps?.review?.summary || fallbackDict.reservations.modal.steps.review.summary,
            location:
              dict?.reservations?.modal?.steps?.review?.location ||
              fallbackDict.reservations.modal.steps.review.location,
            spot: dict?.reservations?.modal?.steps?.review?.spot || fallbackDict.reservations.modal.steps.review.spot,
            type: dict?.reservations?.modal?.steps?.review?.type || fallbackDict.reservations.modal.steps.review.type,
            dates:
              dict?.reservations?.modal?.steps?.review?.dates || fallbackDict.reservations.modal.steps.review.dates,
            user: dict?.reservations?.modal?.steps?.review?.user || fallbackDict.reservations.modal.steps.review.user,
            vehicle:
              dict?.reservations?.modal?.steps?.review?.vehicle || fallbackDict.reservations.modal.steps.review.vehicle,
            ready:
              dict?.reservations?.modal?.steps?.review?.ready || fallbackDict.reservations.modal.steps.review.ready,
            ready_desc:
              dict?.reservations?.modal?.steps?.review?.ready_desc ||
              fallbackDict.reservations.modal.steps.review.ready_desc,
          },
        },
        back: dict?.reservations?.modal?.back || fallbackDict.reservations.modal.back,
        continue: dict?.reservations?.modal?.continue || fallbackDict.reservations.modal.continue,
        create: dict?.reservations?.modal?.create || fallbackDict.reservations.modal.create,
        success: dict?.reservations?.modal?.success || fallbackDict.reservations.modal.success,
        success_desc: dict?.reservations?.modal?.success_desc || fallbackDict.reservations.modal.success_desc,
      },
    },
  }

  const steps: Step[] = [
    {
      id: "location",
      title: d.reservations.modal.steps.location.title,
      description: d.reservations.modal.steps.location.description,
    },
    {
      id: "spot",
      title: d.reservations.modal.steps.spot.title,
      description: d.reservations.modal.steps.spot.description,
    },
    {
      id: "date",
      title: d.reservations.modal.steps.date.title,
      description: d.reservations.modal.steps.date.description,
    },
    {
      id: "details",
      title: d.reservations.modal.steps.details.title,
      description: d.reservations.modal.steps.details.description,
    },
    {
      id: "review",
      title: d.reservations.modal.steps.review.title,
      description: d.reservations.modal.steps.review.description,
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Here you would submit the form data to your API
    console.log("Submitting reservation:", formData)

    // Show success message
    toast({
      title: d.reservations.modal.success,
      description: d.reservations.modal.success_desc,
    })

    // Close the modal after submission
    setOpen(false)

    // Reset form and step
    setFormData({
      locationId: preselectedLocationId || "",
      spotId: "",
      startDate: new Date(),
      endDate: new Date(),
      userId: "",
      company: "",
      licensePlate: "",
      vehicleModel: "",
      reservationType: "subscription",
    })
    setCurrentStep(0)
  }

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const selectedLocation = locations.find((loc) => loc.id === formData.locationId)
  const selectedSpot = spots.find((spot) => spot.id === formData.spotId)
  const selectedUser = users.find((user) => user.id === formData.userId)

  // Reset steps when modal opens
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset to first step when closing
      setTimeout(() => {
        setCurrentStep(0)
      }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant={buttonVariant || "default"}
            className={buttonVariant ? "" : "bg-[#0066FF] hover:bg-[#0055DD]"}
          >
            <Plus className="mr-2 h-4 w-4" />
            {d.reservations.create_reservation}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{d.reservations.modal.title}</DialogTitle>
          <DialogDescription>{d.reservations.modal.description}</DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="relative mb-6 mt-4">
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted"></div>
          <ol className="relative z-10 flex w-full justify-between">
            {steps.map((step, index) => (
              <li key={step.id} className="flex items-center justify-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    index < currentStep
                      ? "bg-[#0066FF] text-white"
                      : index === currentStep
                        ? "border-2 border-[#0066FF] bg-white text-[#0066FF]"
                        : "border border-muted bg-muted/50 text-muted-foreground",
                  )}
                >
                  {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="py-2">
          <h3 className="text-lg font-medium">{steps[currentStep].title}</h3>
          <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
        </div>

        {/* Step content */}
        <div className="mt-4">
          {/* Step 1: Select Location */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="location">{d.reservations.modal.steps.location.select_location}</Label>
                <Select
                  value={formData.locationId}
                  onValueChange={(value) => updateFormData("locationId", value)}
                  disabled={!!preselectedLocationId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={d.reservations.modal.steps.location.select_location} />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name} - {location.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.locationId && (
                <div className="rounded-md border p-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{selectedLocation?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedLocation?.address}, {selectedLocation?.city}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {d.reservations.modal.steps.location.available_spots}
                      </p>
                      <p className="font-medium">
                        {Math.floor(selectedLocation!.spots * (1 - selectedLocation!.occupancy / 100))} of{" "}
                        {selectedLocation?.spots}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {d.reservations.modal.steps.location.current_occupancy}
                      </p>
                      <p className="font-medium">{selectedLocation?.occupancy}%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Select Spot */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>{d.reservations.modal.steps.spot.select_spot}</Label>
                <RadioGroup
                  value={formData.spotId}
                  onValueChange={(value) => updateFormData("spotId", value)}
                  className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                >
                  {spots.map((spot) => (
                    <div key={spot.id}>
                      <RadioGroupItem
                        value={spot.id}
                        id={`spot-${spot.id}`}
                        className="peer sr-only"
                        disabled={!spot.available}
                      />
                      <Label
                        htmlFor={`spot-${spot.id}`}
                        className={cn(
                          "flex h-16 cursor-pointer flex-col items-center justify-center rounded-md border-2 p-2 text-center hover:bg-muted peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                          spot.available
                            ? "peer-data-[state=checked]:border-[#0066FF] peer-data-[state=checked]:text-[#0066FF]"
                            : "",
                        )}
                      >
                        <span className="text-lg font-medium">{spot.number}</span>
                        <span className="text-xs capitalize text-muted-foreground">{spot.type}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {formData.spotId && (
                <div className="rounded-md border p-4">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Spot {selectedSpot?.number}</p>
                      <p className="text-sm capitalize text-muted-foreground">{selectedSpot?.type} spot</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Date & Time */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>{d.reservations.modal.steps.date.reservation_type}</Label>
                <RadioGroup
                  value={formData.reservationType}
                  onValueChange={(value) => updateFormData("reservationType", value as "subscription" | "guest")}
                  className="grid grid-cols-2 gap-2"
                >
                  <div>
                    <RadioGroupItem value="subscription" id="subscription" className="peer sr-only" />
                    <Label
                      htmlFor="subscription"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-4 text-center hover:bg-muted peer-data-[state=checked]:border-[#0066FF] peer-data-[state=checked]:text-[#0066FF]"
                    >
                      <span className="text-lg font-medium">{d.reservations.modal.steps.date.subscription}</span>
                      <span className="text-xs text-muted-foreground">
                        {d.reservations.modal.steps.date.subscription_desc}
                      </span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="guest" id="guest" className="peer sr-only" />
                    <Label
                      htmlFor="guest"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 p-4 text-center hover:bg-muted peer-data-[state=checked]:border-[#0066FF] peer-data-[state=checked]:text-[#0066FF]"
                    >
                      <span className="text-lg font-medium">{d.reservations.modal.steps.date.guest}</span>
                      <span className="text-xs text-muted-foreground">
                        {d.reservations.modal.steps.date.guest_desc}
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label>{d.reservations.modal.steps.date.date_range}</Label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="start-date" className="text-sm">
                      {d.reservations.modal.steps.date.start_date}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="start-date"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? (
                            formData.startDate.toLocaleDateString()
                          ) : (
                            <span>{d.reservations.modal.steps.date.pick_date}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) => date && updateFormData("startDate", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="end-date" className="text-sm">
                      {d.reservations.modal.steps.date.end_date}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal" id="end-date">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? (
                            formData.endDate.toLocaleDateString()
                          ) : (
                            <span>{d.reservations.modal.steps.date.pick_date}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) => date && updateFormData("endDate", date)}
                          initialFocus
                          disabled={(date) => date < formData.startDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: User & Vehicle Details */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="company">{d.reservations.modal.steps.details.company}</Label>
                <Select value={formData.company} onValueChange={(value) => updateFormData("company", value)}>
                  <SelectTrigger id="company">
                    <SelectValue placeholder={d.reservations.modal.steps.details.select_company} />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="user">{d.reservations.modal.steps.details.user}</Label>
                <Select value={formData.userId} onValueChange={(value) => updateFormData("userId", value)}>
                  <SelectTrigger id="user">
                    <SelectValue placeholder={d.reservations.modal.steps.details.select_user} />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} - {user.company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="license-plate">{d.reservations.modal.steps.details.license_plate}</Label>
                  <Input
                    id="license-plate"
                    placeholder={d.reservations.modal.steps.details.license_plate_placeholder}
                    value={formData.licensePlate}
                    onChange={(e) => updateFormData("licensePlate", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vehicle-model">{d.reservations.modal.steps.details.vehicle_model}</Label>
                  <Input
                    id="vehicle-model"
                    placeholder={d.reservations.modal.steps.details.vehicle_model_placeholder}
                    value={formData.vehicleModel}
                    onChange={(e) => updateFormData("vehicleModel", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Confirm */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <h4 className="mb-2 font-medium">{d.reservations.modal.steps.review.summary}</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">
                      {d.reservations.modal.steps.review.location}
                    </dt>
                    <dd className="text-sm">{selectedLocation?.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">
                      {d.reservations.modal.steps.review.spot}
                    </dt>
                    <dd className="text-sm">{selectedSpot?.number}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">
                      {d.reservations.modal.steps.review.type}
                    </dt>
                    <dd className="text-sm capitalize">{formData.reservationType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">
                      {d.reservations.modal.steps.review.dates}
                    </dt>
                    <dd className="text-sm">
                      {formData.startDate.toLocaleDateString()} - {formData.endDate.toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">
                      {d.reservations.modal.steps.review.user}
                    </dt>
                    <dd className="text-sm">{selectedUser?.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-muted-foreground">
                      {d.reservations.modal.steps.review.vehicle}
                    </dt>
                    <dd className="text-sm">
                      {formData.vehicleModel} ({formData.licensePlate})
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-md bg-muted/50 p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0066FF] text-white">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{d.reservations.modal.steps.review.ready}</p>
                    <p className="text-sm text-muted-foreground">{d.reservations.modal.steps.review.ready_desc}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          {currentStep > 0 ? (
            <Button type="button" variant="outline" onClick={handleBack}>
              {d.reservations.modal.back}
            </Button>
          ) : (
            <div></div>
          )}
          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-[#0066FF] hover:bg-[#0055DD]"
              disabled={(currentStep === 0 && !formData.locationId) || (currentStep === 1 && !formData.spotId)}
            >
              {d.reservations.modal.continue}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" onClick={handleSubmit} className="bg-[#0066FF] hover:bg-[#0055DD]">
              {d.reservations.modal.create}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

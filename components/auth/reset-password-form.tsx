"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Car } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ResetPasswordFormProps {
  dict: {
    title?: string
    description?: string
    email?: string
    reset_button?: string
    back_to_login?: string
    error_message?: string
    success_message?: string
  }
  lang: string
}

export function ResetPasswordForm({ dict, lang }: ResetPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const { error } = await resetPassword(email)

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
          <Car className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{dict.title || "Reset your password"}</h1>
        <p className="text-sm text-gray-500">
          {dict.description || "Enter your email address and we'll send you a link to reset your password."}
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{dict.error_message || error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 bg-green-50">
          <AlertDescription className="text-green-800">
            {dict.success_message || "Check your email for a link to reset your password."}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{dict.email || "Email address"}</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : dict.reset_button || "Reset password"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <Link href={`/${lang}/login`} className="font-medium text-blue-600 hover:text-blue-500">
          {dict.back_to_login || "Back to login"}
        </Link>
      </div>
    </div>
  )
}

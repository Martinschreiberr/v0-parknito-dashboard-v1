"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Car } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SignupFormProps {
  dict: {
    title?: string
    name?: string
    email?: string
    password?: string
    confirm_password?: string
    signup_button?: string
    have_account?: string
    login?: string
    error_message?: string
    password_mismatch?: string
  }
  lang: string
}

export function SignupForm({ dict, lang }: SignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError(dict.password_mismatch || "Passwords do not match")
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password, { full_name: name })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      // Redirect to verification page or dashboard
      router.push(`/${lang}/login?verified=true`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
          <Car className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{dict.title || "Create your account"}</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{dict.error_message || error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{dict.name || "Full name"}</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
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
        <div className="space-y-2">
          <Label htmlFor="password">{dict.password || "Password"}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">{dict.confirm_password || "Confirm password"}</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : dict.signup_button || "Sign up"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-500">{dict.have_account || "Already have an account?"}</span>{" "}
        <Link href={`/${lang}/login`} className="font-medium text-blue-600 hover:text-blue-500">
          {dict.login || "Sign in"}
        </Link>
      </div>
    </div>
  )
}

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

interface LoginFormProps {
  dict: {
    title?: string
    email?: string
    password?: string
    login_button?: string
    forgot_password?: string
    no_account?: string
    signup?: string
    error_message?: string
  }
  lang: string
}

export function LoginForm({ dict, lang }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push(`/${lang}/dashboard`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
          <Car className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{dict.title || "Sign in to your account"}</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{dict.error_message || error}</AlertDescription>
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{dict.password || "Password"}</Label>
            <Link href={`/${lang}/reset-password`} className="text-sm font-medium text-blue-600 hover:text-blue-500">
              {dict.forgot_password || "Forgot password?"}
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : dict.login_button || "Sign in"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-gray-500">{dict.no_account || "Don't have an account?"}</span>{" "}
        <Link href={`/${lang}/signup`} className="font-medium text-blue-600 hover:text-blue-500">
          {dict.signup || "Sign up"}
        </Link>
      </div>
    </div>
  )
}

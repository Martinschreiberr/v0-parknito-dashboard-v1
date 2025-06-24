"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "./supabase-client" // Import the single client instance

// Auth types
export type AuthUser = {
  id: string
  email: string
  user_metadata: {
    full_name?: string
    name?: string
    avatar_url?: string
  }
  app_metadata: {
    role?: string
    company_id?: string
  }
}

export type AuthState = {
  user: AuthUser | null
  loading: boolean
  error: Error | null
}

// Auth context
export const AuthContext = createContext<{
  user: AuthUser | null
  loading: boolean
  error: Error | null
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, metadata?: { full_name?: string }) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: Error | null }>
  updateProfile: (data: { full_name?: string; avatar_url?: string }) => Promise<{ error: Error | null }>
}>({
  user: null,
  loading: true,
  error: null,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  resetPassword: async () => ({ error: null }),
  updateProfile: async () => ({ error: null }),
})

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState((prev) => ({
        ...prev,
        user: session?.user as AuthUser | null,
        loading: false,
      }))
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((prev) => ({
        ...prev,
        user: session?.user as AuthUser | null,
        loading: false,
      }))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    console.log(`[Auth] Attempting sign-in for email: ${email.substring(0, 5)}...`)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        console.error(`[Auth] Sign-in failed for ${email.substring(0, 5)}...:`, error.message)
      } else {
        console.log(`[Auth] Sign-in successful for ${email.substring(0, 5)}...`)
      }
      return { error }
    } catch (error) {
      console.error(`[Auth] Sign-in caught unexpected error for ${email.substring(0, 5)}...:`, error)
      return { error: error as Error }
    }
  }

  // Sign up with email and password
  const signUp = async (email: string, password: string, metadata?: { full_name?: string }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut()
  }

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  // Update user profile
  const updateProfile = async (data: { full_name?: string; avatar_url?: string }) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data,
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Auth hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

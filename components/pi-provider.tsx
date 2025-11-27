"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface PiUser {
  uid: string
  username: string
}

interface PiContextType {
  user: PiUser | null
  isAuthenticated: boolean
  authenticate: () => Promise<void>
  isLoading: boolean
  error: string | null
}

const PiContext = createContext<PiContextType | undefined>(undefined)

export function PiProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PiUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initialize Pi SDK when component mounts
    if (typeof window !== "undefined" && (window as any).Pi) {
      try {
        ;(window as any).Pi.init({ version: "2.0", sandbox: true })
        console.log("[v0] Pi SDK initialized")
        setIsLoading(false)
      } catch (err) {
        console.error("[v0] Pi SDK initialization failed:", err)
        setError("Failed to initialize Pi Network SDK")
        setIsLoading(false)
      }
    } else {
      // Fallback for non-Pi Browser environment
      console.log("[v0] Pi SDK not available - using demo mode")
      setIsLoading(false)
    }
  }, [])

  const authenticate = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (typeof window !== "undefined" && (window as any).Pi) {
        const scopes = ["username", "payments"]

        // Authenticate with Pi Network
        const auth = await (window as any).Pi.authenticate(scopes, onIncompletePaymentFound)

        console.log("[v0] Pi authentication successful:", auth)

        setUser({
          uid: auth.user.uid,
          username: auth.user.username,
        })
        setIsAuthenticated(true)
      } else {
        // Demo mode for non-Pi Browser
        console.log("[v0] Demo authentication")
        setUser({
          uid: "demo-user-" + Date.now(),
          username: "Demo User",
        })
        setIsAuthenticated(true)
      }
    } catch (err) {
      console.error("[v0] Authentication error:", err)
      setError("Failed to authenticate with Pi Network")
    } finally {
      setIsLoading(false)
    }
  }

  const onIncompletePaymentFound = (payment: any) => {
    console.log("[v0] Incomplete payment found:", payment)
    // Handle incomplete payments here
  }

  return (
    <PiContext.Provider value={{ user, isAuthenticated, authenticate, isLoading, error }}>
      {children}
    </PiContext.Provider>
  )
}

export function usePi() {
  const context = useContext(PiContext)
  if (context === undefined) {
    throw new Error("usePi must be used within a PiProvider")
  }
  return context
}

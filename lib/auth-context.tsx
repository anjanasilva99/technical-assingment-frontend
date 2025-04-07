"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authApi, type AuthResponse } from "@/lib/api"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  accessToken: string | null
  refreshToken: string | null
  login: (username: string, password: string) => Promise<void>
  register: (userData: {
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
  }) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [tokenExpiry, setTokenExpiry] = useState<number | null>(null)
  const router = useRouter()

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken")
    const storedRefreshToken = localStorage.getItem("refreshToken")
    const storedExpiry = localStorage.getItem("tokenExpiry")

    if (storedAccessToken && storedRefreshToken && storedExpiry) {
      setAccessToken(storedAccessToken)
      setRefreshToken(storedRefreshToken)
      setTokenExpiry(Number(storedExpiry))
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }, [])

  // Set up token refresh
  useEffect(() => {
    if (!accessToken || !refreshToken || !tokenExpiry) return

    const timeUntilExpiry = tokenExpiry - Date.now()
    if (timeUntilExpiry <= 0) {
      handleRefreshToken()
      return
    }

    // Refresh token 1 minute before expiry
    const refreshTime = Math.max(timeUntilExpiry - 60000, 0)
    const refreshTimer = setTimeout(handleRefreshToken, refreshTime)

    return () => clearTimeout(refreshTimer)
  }, [accessToken, refreshToken, tokenExpiry])

  const handleRefreshToken = async () => {
    if (!refreshToken) return

    try {
      const response = await authApi.refreshToken(refreshToken)
      updateAuthState(response)
    } catch (error) {
      console.error("Failed to refresh token:", error)
      handleLogout()
    }
  }

  const updateAuthState = (authResponse: AuthResponse) => {
    const { access_token, refresh_token, expires_in } = authResponse

    // Calculate expiry time in milliseconds
    const expiryTime = Date.now() + expires_in * 1000

    // Update state
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
    setTokenExpiry(expiryTime)
    setIsAuthenticated(true)

    // Store in localStorage
    localStorage.setItem("accessToken", access_token)
    localStorage.setItem("refreshToken", refresh_token)
    localStorage.setItem("tokenExpiry", expiryTime.toString())
  }

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await authApi.login({ username, password })
      updateAuthState(response)
      router.push("/books")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (userData: {
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
  }) => {
    setIsLoading(true)
    try {
      const response = await authApi.register(userData)
      updateAuthState(response)
      router.push("/books")
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      if (accessToken && refreshToken) {
        await authApi.logout(accessToken, refreshToken)
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Clear auth state regardless of API response
      setAccessToken(null)
      setRefreshToken(null)
      setTokenExpiry(null)
      setIsAuthenticated(false)
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("tokenExpiry")
      router.push("/auth/login")
      setIsLoading(false)
    }
  }

  const value = {
    isAuthenticated,
    isLoading,
    accessToken,
    refreshToken,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


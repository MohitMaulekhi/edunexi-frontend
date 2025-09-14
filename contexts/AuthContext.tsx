"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser, getUserProfile } from '@/lib/auth'
import type { User, AuthContextType, UserRole } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const clearAuthData = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }, [])

  // Validate token with Strapi
  const validateToken = useCallback(async (authToken: string): Promise<boolean> => {
    try {
      const user = await getUserProfile(authToken)
      return user !== null
    } catch (error) {
      console.error('Token validation error:', error)
      return false
    }
  }, [])

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('auth_token')
      const storedUser = localStorage.getItem('auth_user')
      
      if (storedToken && storedUser) {
        try {
          // Validate token and get fresh user data
          const userData = await getUserProfile(storedToken)
          if (userData) {
            console.log('Initialized user data:', userData)
            setToken(storedToken)
            setUser(userData)
            // Update localStorage with fresh data
            localStorage.setItem('auth_user', JSON.stringify(userData))
          } else {
            clearAuthData()
          }
        } catch (error) {
          console.error('Error initializing auth data:', error)
          clearAuthData()
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [validateToken, clearAuthData])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      // Call Strapi auth endpoint using axios-based auth function
      const loginResponse = await loginUser({ email, password })
      
      if (loginResponse.success && loginResponse.token) {
        // Get user data with populated relationships
        const userData = await getUserProfile(loginResponse.token)
        
        if (userData) {
          console.log('User data received:', userData) // Debug log
          setToken(loginResponse.token)
          setUser(userData)
          
          // Store in localStorage
          localStorage.setItem('auth_token', loginResponse.token)
          localStorage.setItem('auth_user', JSON.stringify(userData))
          
          return { success: true }
        }
        
        return { success: false, error: 'Failed to fetch user data' }
      } else {
        return { success: false, error: loginResponse.error || 'Invalid credentials' }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      return { success: false, error: 'Network error. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const logout = useCallback(() => {
    clearAuthData()
    router.push('/login')
  }, [clearAuthData, router])

  const refreshUser = useCallback(async () => {
    if (!token) return

    try {
      const userData = await getUserProfile(token)
      
      if (userData) {
        setUser(userData)
        localStorage.setItem('auth_user', JSON.stringify(userData))
      } else {
        logout()
      }
    } catch (error) {
      console.error('Error refreshing user data:', error)
      logout()
    }
  }, [token, logout])

  // Role-based helper functions
  const getUserRole = useCallback((): UserRole | null => {
    return user?.role?.type as UserRole || null
  }, [user])

  const isStudent = useCallback((): boolean => {
    return getUserRole() === 'student'
  }, [getUserRole])

  const isUniversityAdmin = useCallback((): boolean => {
    return getUserRole() === 'university_admin'
  }, [getUserRole])


  const getDefaultRoute = useCallback((): string => {
    const role = getUserRole()
    switch (role) {
      case 'student':
        return '/student'
      case 'university_admin':
        return '/university'
      default:
        return '/login'
    }
  }, [getUserRole])

  const value = {
    user,
    login,
    logout,
    loading,
    token,
    refreshUser,
    getUserRole,
    isStudent,
    isUniversityAdmin,
    getDefaultRoute,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext

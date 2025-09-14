"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'
import type { UserRole } from '@/types'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, loading, getUserRole, getDefaultRoute } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo)
    } else if (!loading && user && allowedRoles.length > 0) {
      const userRole = getUserRole()
      const hasPermission = userRole ? allowedRoles.includes(userRole) : false
      if (!hasPermission) {
        router.push(getDefaultRoute())
      }
    }
  }, [user, loading, router, allowedRoles, redirectTo, getUserRole, getDefaultRoute])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (allowedRoles.length > 0) {
    const userRole = getUserRole()
    const hasPermission = userRole ? allowedRoles.includes(userRole) : false
    if (!hasPermission) {
      return null
    }
  }

  return <>{children}</>
}

export default ProtectedRoute

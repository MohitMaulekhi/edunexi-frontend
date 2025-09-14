// Role-based utility functions
import type { User, UserRole } from '@/types'

export function getUserRole(user: User | null): UserRole | null {
  return user?.role?.type as UserRole || null
}

export function isStudent(user: User | null): boolean {
  return getUserRole(user) === 'student'
}

export function isUniversityAdmin(user: User | null): boolean {
  return getUserRole(user) === 'university_admin'
}

export function getDefaultRoute(user: User | null): string {
  const role = getUserRole(user)
  switch (role) {
    case 'student':
      return '/student'
    case 'university_admin':
      return '/university'
    default:
      return '/login'
  }
}

export function canAccessRoute(user: User | null, requiredRoles: UserRole[]): boolean {
  if (!user || requiredRoles.length === 0) return true
  const userRole = getUserRole(user)
  return userRole ? requiredRoles.includes(userRole) : false
}

// Role display names for UI
export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case 'student':
      return 'Student'
    case 'university_admin':
      return 'University Admin'
    default:
      return 'Unknown'
  }
}

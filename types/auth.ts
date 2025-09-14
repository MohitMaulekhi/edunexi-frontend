// Authentication related types
import type { StudentProfile } from './student'
import type { UniversityProfile } from './university'

export interface User {
  id: number
  documentId: string
  email: string
  username: string
  provider: string
  confirmed: boolean
  blocked: boolean
  role: {
    id: number
    documentId: string
    name: string
    description?: string
    type: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  university: UniversityProfile | null
  student: StudentProfile | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loading: boolean
  token: string | null
  refreshUser: () => Promise<void>
  getUserRole: () => UserRole | null
  isStudent: () => boolean
  isUniversityAdmin: () => boolean
  getDefaultRoute: () => string
}



export interface LoginResponse {
  success: boolean
  error?: string
  user?: User
  token?: string
}

// Note: University and Student types moved to their respective files for better organization

// Role types for better type safety
export type UserRole = 'student' | 'university_admin' | 'super_admin'

export interface RoleInfo {
  id: number
  name: string
  type: UserRole
  description?: string
}

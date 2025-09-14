// Common types and interfaces used across the application

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  statusCode?: number
}

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T = any> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface SearchParams {
  query?: string
  filters?: Record<string, any>
  pagination?: PaginationParams
}

export interface FileUpload {
  id: string
  name: string
  originalName: string
  url: string
  type: string
  size: number
  uploadedBy: string
  uploadedAt: string
}

export interface Address {
  street?: string
  city: string
  state: string
  country: string
  zipCode: string
}

export interface ContactInfo {
  email?: string
  phone?: string
  mobile?: string
}

export interface SocialLinks {
  linkedin?: string
  github?: string
  twitter?: string
  website?: string
}

export interface AuditFields {
  createdAt: string
  updatedAt: string
  createdBy?: string
  updatedBy?: string
}

export interface StrapiEntity {
  id: number
  documentId: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

// Form validation types
export interface ValidationError {
  field: string
  message: string
}

export interface FormState<T = any> {
  data: T
  errors: ValidationError[]
  isSubmitting: boolean
  isValid: boolean
}

// Filter and sort types
export interface FilterOption {
  label: string
  value: string
  count?: number
}

export interface SortOption {
  label: string
  value: string
  order: 'asc' | 'desc'
}

// Dashboard widget types
export interface DashboardWidget {
  id: string
  type: 'stat' | 'chart' | 'list' | 'calendar' | 'feed'
  title: string
  size: 'small' | 'medium' | 'large'
  position: { x: number; y: number }
  data?: any
  config?: any
}

// Status types
export type Status = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'draft' | 'published'

// Generic ID types
export type ID = string | number

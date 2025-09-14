// University-related types and interfaces

export interface UniversityProfile {
  id: number
  documentId: string
  name: string
  universityCode: string
  description?: string
  address: string
  city: string
  state: string
  country: string
  zipCode: string
  contactNumber: string
  email?: string
  website?: string
  establishedYear?: number
  isActive: boolean
  studentCapacity?: number
  accreditation?: string
  coursesOffered: Course[]
  departments: Department[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface Department {
  id: string
  name: string
  code: string
  description?: string
  headOfDepartment?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Course {
  id: string
  courseCode: string
  courseName: string
  credits: number
  description?: string
  prerequisites?: string[]
  department: string
  semester: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UniversityStats {
  totalStudents: number
  pendingApprovals: number
  monthlyApprovals: number
  activePrograms: number
  totalDepartments: number
  activeCourses: number
}

export interface ApprovalRequest {
  id: string
  studentId: string
  studentName: string
  achievement: string
  category: string
  description?: string
  attachments?: string[]
  submittedDate: string
  status: 'pending' | 'approved' | 'rejected'
  reviewedBy?: string
  reviewedDate?: string
  reviewComments?: string
}

// University admin dashboard data
export interface UniversityDashboardData {
  stats: UniversityStats
  pendingApprovals: ApprovalRequest[]
  recentApprovals: ApprovalRequest[]
  recentStudents: StudentSummary[]
  upcomingEvents: UniversityEventSummary[]
}

export interface StudentSummary {
  id: string
  name: string
  email: string
  studentId: string
  department?: string
  year?: string
  semester?: number
  enrollmentDate?: string
  status: 'active' | 'inactive' | 'graduated'
}

export interface UniversityEventSummary {
  id: string
  title: string
  description: string
  date: string
  location: string
  type: 'academic' | 'cultural' | 'sports' | 'technical' | 'social'
  registrationCount: number
}

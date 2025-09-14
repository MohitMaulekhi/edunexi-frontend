// Student-related types and interfaces

export interface Achievement {
  id: string
  title: string
  description: string
  category: 'academic' | 'competition' | 'research' | 'volunteer' | 'leadership' | 'other'
  date: string
  status: 'pending' | 'approved' | 'rejected'
  points: number
  attachments?: string[]
  approvedBy?: string
  approvedDate?: string
  rejectionReason?: string
  createdAt: string
  updatedAt: string
}

export interface StudentProfile {
  id: number
  documentId: string
  studentId: string
  CGPA?: number
  semester?: number
  year?: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior'
  department?: string
  major?: string
  phoneNumber?: string
  enrollmentDate?: string
  expectedGraduation?: string
  address?: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface CGPARecord {
  id: string
  semester: number
  year: string
  gpa: number
  totalCredits: number
  earnedCredits: number
  courses: CourseRecord[]
  createdAt: string
  updatedAt: string
}

export interface CourseRecord {
  id: string
  courseCode: string
  courseName: string
  credits: number
  grade: string
  gradePoints: number
  semester: number
  year: string
}

export interface Society {
  id: string
  name: string
  description: string
  category: 'academic' | 'cultural' | 'sports' | 'technical' | 'social'
  memberCount: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Student registration interfaces
export interface StudentRegistrationData {
  email: string
  password: string
  department?: string
  year?: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior'
  semester?: number
  phoneNumber?: string
  CGPA?: number
  enrollmentDate?: string
  expectedGraduation?: string
  address?: string
}

export interface StudentRegistrationResponse {
  success: boolean
  error?: string
  student?: {
    id: number
    username: string
    email: string
    student: StudentProfile
  }
}

// Student dashboard stats
export interface StudentStats {
  totalAchievements: number
  approvedAchievements: number
  pendingAchievements: number
  totalPoints: number
  currentCGPA?: number
  currentSemester?: number
}

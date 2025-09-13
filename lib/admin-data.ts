// Static data for university admin dashboard
export interface StudentRecord {
  id: string
  name: string
  studentId: string
  email: string
  department: string
  year: number
  cgpa: number
  totalAchievements: number
  approvedAchievements: number
  pendingAchievements: number
  totalPoints: number
  attendancePercentage: number
  status: "active" | "inactive" | "graduated"
}

export interface PendingApproval {
  id: string
  studentId: string
  studentName: string
  achievementTitle: string
  category: string
  description: string
  submittedDate: string
  attachments?: string[]
  points: number
}

export interface InstitutionalStats {
  totalStudents: number
  activeStudents: number
  totalAchievements: number
  pendingApprovals: number
  averageCGPA: number
  totalEvents: number
  upcomingEvents: number
  departmentStats: {
    name: string
    students: number
    avgCGPA: number
    achievements: number
  }[]
}

export interface AdminEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: "workshop" | "seminar" | "competition" | "cultural" | "academic"
  capacity: number
  registered: number
  status: "draft" | "published" | "completed" | "cancelled"
  organizer: string
}

// Mock data for admin dashboard
export const studentRecords: StudentRecord[] = [
  {
    id: "1",
    name: "John Doe",
    studentId: "STU001",
    email: "john.doe@student.edu",
    department: "Computer Science",
    year: 4,
    cgpa: 8.9,
    totalAchievements: 12,
    approvedAchievements: 9,
    pendingAchievements: 3,
    totalPoints: 580,
    attendancePercentage: 92,
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    studentId: "STU002",
    email: "jane.smith@student.edu",
    department: "Engineering",
    year: 3,
    cgpa: 8.5,
    totalAchievements: 8,
    approvedAchievements: 6,
    pendingAchievements: 2,
    totalPoints: 420,
    attendancePercentage: 88,
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    studentId: "STU003",
    email: "mike.johnson@student.edu",
    department: "Business",
    year: 2,
    cgpa: 7.8,
    totalAchievements: 5,
    approvedAchievements: 4,
    pendingAchievements: 1,
    totalPoints: 250,
    attendancePercentage: 85,
    status: "active",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    studentId: "STU004",
    email: "sarah.wilson@student.edu",
    department: "Computer Science",
    year: 4,
    cgpa: 9.2,
    totalAchievements: 15,
    approvedAchievements: 13,
    pendingAchievements: 2,
    totalPoints: 750,
    attendancePercentage: 95,
    status: "active",
  },
]

export const pendingApprovals: PendingApproval[] = [
  {
    id: "1",
    studentId: "STU001",
    studentName: "John Doe",
    achievementTitle: "Hackathon Winner - TechFest 2024",
    category: "competition",
    description: "First place in 48-hour hackathon competition",
    submittedDate: "2024-03-10",
    attachments: ["certificate.pdf", "project_demo.mp4"],
    points: 80,
  },
  {
    id: "2",
    studentId: "STU002",
    studentName: "Jane Smith",
    achievementTitle: "Research Paper Publication",
    category: "academic",
    description: "Published research paper in IEEE conference",
    submittedDate: "2024-03-08",
    attachments: ["paper.pdf", "acceptance_letter.pdf"],
    points: 120,
  },
  {
    id: "3",
    studentId: "STU004",
    studentName: "Sarah Wilson",
    achievementTitle: "Google Summer of Code Mentor",
    category: "internship",
    description: "Selected as mentor for GSoC 2024 program",
    submittedDate: "2024-03-05",
    points: 100,
  },
]

export const institutionalStats: InstitutionalStats = {
  totalStudents: 1250,
  activeStudents: 1180,
  totalAchievements: 3420,
  pendingApprovals: 45,
  averageCGPA: 8.2,
  totalEvents: 156,
  upcomingEvents: 8,
  departmentStats: [
    {
      name: "Computer Science",
      students: 420,
      avgCGPA: 8.4,
      achievements: 1250,
    },
    {
      name: "Engineering",
      students: 380,
      avgCGPA: 8.1,
      achievements: 980,
    },
    {
      name: "Business",
      students: 250,
      avgCGPA: 7.9,
      achievements: 650,
    },
    {
      name: "Arts & Sciences",
      students: 200,
      avgCGPA: 8.0,
      achievements: 540,
    },
  ],
}

export const adminEvents: AdminEvent[] = [
  {
    id: "1",
    title: "AI/ML Workshop Series",
    description: "Comprehensive workshop on Artificial Intelligence and Machine Learning",
    date: "2024-04-15",
    time: "10:00 AM",
    location: "Computer Lab A",
    type: "workshop",
    capacity: 50,
    registered: 42,
    status: "published",
    organizer: "Dr. Sarah Wilson",
  },
  {
    id: "2",
    title: "Career Fair 2024",
    description: "Annual career fair with top tech companies",
    date: "2024-04-20",
    time: "9:00 AM",
    location: "Main Auditorium",
    type: "seminar",
    capacity: 500,
    registered: 380,
    status: "published",
    organizer: "Career Services",
  },
  {
    id: "3",
    title: "Inter-College Coding Competition",
    description: "Programming competition for all departments",
    date: "2024-04-25",
    time: "2:00 PM",
    location: "Online Platform",
    type: "competition",
    capacity: 200,
    registered: 156,
    status: "published",
    organizer: "CS Department",
  },
  {
    id: "4",
    title: "Research Symposium",
    description: "Student research presentation and poster session",
    date: "2024-05-01",
    time: "11:00 AM",
    location: "Conference Hall",
    type: "academic",
    capacity: 300,
    registered: 0,
    status: "draft",
    organizer: "Research Office",
  },
]

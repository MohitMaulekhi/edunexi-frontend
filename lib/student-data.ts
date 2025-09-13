// Static data for student dashboard
export interface Achievement {
  id: string
  title: string
  description: string
  category: "academic" | "extracurricular" | "certification" | "internship" | "competition"
  date: string
  status: "pending" | "approved" | "rejected"
  points: number
  attachments?: string[]
}

export interface CGPARecord {
  semester: string
  cgpa: number
  credits: number
  subjects: {
    name: string
    grade: string
    credits: number
  }[]
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  type: "workshop" | "seminar" | "competition" | "cultural"
  location: string
  registrationRequired: boolean
  registered?: boolean
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  date: string
  read: boolean
}

export interface Society {
  id: string
  name: string
  description: string
  role?: string
  joinedDate?: string
  isActive: boolean
}

// Mock data for student dashboard
export const studentAchievements: Achievement[] = [
  {
    id: "1",
    title: "Best Paper Award - IEEE Conference",
    description: "Received best paper award for research on Machine Learning applications",
    category: "academic",
    date: "2024-03-15",
    status: "approved",
    points: 100,
    attachments: ["certificate.pdf"],
  },
  {
    id: "2",
    title: "Google Summer of Code 2024",
    description: "Selected for GSoC program working on open source project",
    category: "internship",
    date: "2024-05-01",
    status: "approved",
    points: 150,
  },
  {
    id: "3",
    title: "Hackathon Winner - TechFest 2024",
    description: "First place in 48-hour hackathon competition",
    category: "competition",
    date: "2024-02-20",
    status: "pending",
    points: 80,
  },
  {
    id: "4",
    title: "AWS Cloud Practitioner Certification",
    description: "Completed AWS Cloud Practitioner certification",
    category: "certification",
    date: "2024-01-10",
    status: "approved",
    points: 50,
  },
]

export const cgpaRecords: CGPARecord[] = [
  {
    semester: "Semester 7",
    cgpa: 8.9,
    credits: 22,
    subjects: [
      { name: "Machine Learning", grade: "A+", credits: 4 },
      { name: "Database Systems", grade: "A", credits: 3 },
      { name: "Software Engineering", grade: "A+", credits: 4 },
      { name: "Computer Networks", grade: "A", credits: 3 },
      { name: "Project Work", grade: "A+", credits: 8 },
    ],
  },
  {
    semester: "Semester 6",
    cgpa: 8.7,
    credits: 24,
    subjects: [
      { name: "Data Structures", grade: "A+", credits: 4 },
      { name: "Operating Systems", grade: "A", credits: 4 },
      { name: "Web Development", grade: "A+", credits: 3 },
      { name: "Mathematics III", grade: "B+", credits: 4 },
      { name: "Technical Writing", grade: "A", credits: 2 },
    ],
  },
]

export const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "AI/ML Workshop",
    description: "Hands-on workshop on Artificial Intelligence and Machine Learning",
    date: "2024-04-15",
    type: "workshop",
    location: "Computer Lab A",
    registrationRequired: true,
    registered: false,
  },
  {
    id: "2",
    title: "Career Fair 2024",
    description: "Annual career fair with top tech companies",
    date: "2024-04-20",
    type: "seminar",
    location: "Main Auditorium",
    registrationRequired: false,
  },
  {
    id: "3",
    title: "Coding Competition",
    description: "Inter-college coding competition",
    date: "2024-04-25",
    type: "competition",
    location: "Online",
    registrationRequired: true,
    registered: true,
  },
]

export const notifications: Notification[] = [
  {
    id: "1",
    title: "Achievement Approved",
    message: "Your IEEE Conference paper award has been approved and added to your profile.",
    type: "success",
    date: "2024-03-16",
    read: false,
  },
  {
    id: "2",
    title: "New Event Registration",
    message: "Registration is now open for the AI/ML Workshop on April 15th.",
    type: "info",
    date: "2024-03-14",
    read: false,
  },
  {
    id: "3",
    title: "CGPA Updated",
    message: "Your Semester 7 CGPA has been updated in the system.",
    type: "info",
    date: "2024-03-12",
    read: true,
  },
]

export const societies: Society[] = [
  {
    id: "1",
    name: "Computer Science Society",
    description: "Society for CS students to collaborate and learn together",
    role: "Vice President",
    joinedDate: "2023-08-01",
    isActive: true,
  },
  {
    id: "2",
    name: "IEEE Student Branch",
    description: "IEEE student chapter for technical activities",
    role: "Member",
    joinedDate: "2023-09-15",
    isActive: true,
  },
  {
    id: "3",
    name: "Robotics Club",
    description: "Club focused on robotics and automation projects",
    joinedDate: "2024-01-10",
    isActive: true,
  },
]

export const studentStats = {
  totalAchievements: 12,
  approvedAchievements: 9,
  pendingAchievements: 3,
  totalPoints: 580,
  currentCGPA: 8.9,
  overallCGPA: 8.6,
  attendancePercentage: 92,
  activeSocieties: 3,
}

// Static data for authentication
export interface User {
  id: string
  email: string
  password: string
  role: "student" | "university"
  name: string
  studentId?: string
  department?: string
  universityName?: string
}

// Mock user database
export const users: User[] = [
  // Students
  {
    id: "1",
    email: "john.doe@student.edu",
    password: "student123",
    role: "student",
    name: "John Doe",
    studentId: "STU001",
    department: "Computer Science",
  },
  {
    id: "2",
    email: "jane.smith@student.edu",
    password: "student123",
    role: "student",
    name: "Jane Smith",
    studentId: "STU002",
    department: "Engineering",
  },
  // University Admins
  {
    id: "3",
    email: "admin@university.edu",
    password: "admin123",
    role: "university",
    name: "Dr. Sarah Wilson",
    universityName: "Tech University",
  },
  {
    id: "4",
    email: "registrar@university.edu",
    password: "admin123",
    role: "university",
    name: "Michael Johnson",
    universityName: "Tech University",
  },
]

export function authenticateUser(email: string, password: string): User | null {
  const user = users.find((u) => u.email === email && u.password === password)
  return user || null
}

export function getUserById(id: string): User | null {
  return users.find((u) => u.id === id) || null
}

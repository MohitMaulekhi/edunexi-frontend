"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  ArrowLeft,
  Loader2
} from "lucide-react"
import Link from "next/link"
import type { StudentSummary, StudentProfile, User } from '@/types'

interface StudentWithUser extends StudentProfile {
  user: Pick<User, 'id' | 'username' | 'email'> & {
    firstName: string
    lastName: string
  }
}

function StudentsPageContent() {
  const { user, token } = useAuth()
  const router = useRouter()
  
  // Redirect if not university admin
  if (!user || user.role?.name !== "University Admin") {
    router.push("/login")
    return null
  }

  const [students, setStudents] = useState<StudentWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")

  // Fetch students
  useEffect(() => {
    fetchStudents()
  }, [token])

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/user-management/students`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      } else {
        setError('Failed to fetch students')
      }
    } catch (error) {
      console.error('Error fetching students:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Filter students based on search and department
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDepartment = !selectedDepartment || student.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  // Get unique departments for filter
  const departments = Array.from(new Set(students.map(s => s.department))).filter(Boolean)

  const handleDeleteStudent = async (studentId: number) => {
    if (!confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/user-management/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setStudents(students.filter(s => s.id !== studentId))
      } else {
        alert('Failed to delete student')
      }
    } catch (error) {
      console.error('Error deleting student:', error)
      alert('Network error. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/university" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Student Management</h1>
                <p className="text-muted-foreground">Manage students at {user?.university?.name}</p>
              </div>
            </div>
            <Link href="/university/students/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, or student ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Students ({filteredStudents.length})</CardTitle>
                <CardDescription>
                  {searchQuery || selectedDepartment 
                    ? `Showing filtered results` 
                    : `All students in your university`}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                Loading students...
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No students found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || selectedDepartment 
                    ? "Try adjusting your filters" 
                    : "Get started by adding your first student"}
                </p>
                <Link href="/university/students/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Student
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Info</TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Year/Semester</TableHead>
                      <TableHead>CGPA</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {student.user.firstName} {student.user.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {student.user.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.studentId}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.department}</div>
                            {student.major && (
                              <div className="text-sm text-muted-foreground">{student.major}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{student.year}</div>
                            {student.semester && (
                              <div className="text-sm text-muted-foreground">
                                Semester {student.semester}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {student.CGPA ? (
                            <Badge variant={student.CGPA >= 3.5 ? "default" : student.CGPA >= 3.0 ? "secondary" : "destructive"}>
                              {student.CGPA.toFixed(2)}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {student.phoneNumber || (
                            <span className="text-muted-foreground">No phone</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Student
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteStudent(student.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Student
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function StudentsPage() {
  return (
    <ProtectedRoute allowedRoles={["university_admin"]}>
      <StudentsPageContent />
    </ProtectedRoute>
  )
}

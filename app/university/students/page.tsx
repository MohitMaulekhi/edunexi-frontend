"use client"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

import studentsData from "./generate.json"
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
  department: string
  major?: string
  year?: string
  semester?: number
  CGPA?: number
  phoneNumber?: string
}

function StudentsPageContent() {
  const { user, token } = useAuth()
  const router = useRouter()

  // Redirect if not university admin
  if (!user || user.role?.name !== "University Admin") {
    router.push("/login")
    return null
  }


  // Dummy student data for demo
  const [students] = useState<StudentWithUser[]>(studentsData as StudentWithUser[])
  const [loading] = useState(false)
  const [error] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")

  // Remove API delete for demo
  // Remove duplicate handleDeleteStudent and setStudents
  const handleDeleteStudent = (studentId: number) => {
    alert('This is a demo. Student would be deleted in a real app.')
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

  // Prepare chart data
  const departmentStats = students.reduce((acc, s) => {
    if (!s.department || typeof s.CGPA !== "number") return acc
    if (!acc[s.department]) acc[s.department] = { department: s.department, total: 0, count: 0 }
    acc[s.department].total += s.CGPA
    acc[s.department].count += 1
    return acc
  }, {} as Record<string, { department: string; total: number; count: number }>)

  const chartData = Object.values(departmentStats).map(d => ({
    department: d.department,
    avgCGPA: d.count > 0 ? parseFloat((d.total / d.count).toFixed(2)) : 0
  }))
  // Dynamic Y-axis for better bar heights
  // 1️⃣ Dynamic Y-axis range for department average CGPA chart
  const cgpaValues = chartData.map(d => d.avgCGPA)
  const minCGPA = Math.floor(Math.min(...cgpaValues) - 0.5)
  const maxCGPA = Math.ceil(Math.max(...cgpaValues) + 0.5)

  // 2️⃣ Grade distribution
  const gradeBuckets = { 'A+': 0, 'A': 0, 'B+': 0, 'B': 0, 'C': 0 }
  students.forEach(s => {
    if (typeof s.CGPA !== 'number') return
    if (s.CGPA >= 9) gradeBuckets['A+']++
    else if (s.CGPA >= 8) gradeBuckets['A']++
    else if (s.CGPA >= 7) gradeBuckets['B+']++
    else if (s.CGPA >= 6) gradeBuckets['B']++
    else gradeBuckets['C']++
  })
  const gradeData = Object.entries(gradeBuckets).map(([grade, count]) => ({ grade, count }))

  // 3️⃣ Branch-wise insight (average and highest CGPA)
  const branchStats = students.reduce((acc, s) => {
    if (!s.department || typeof s.CGPA !== 'number') return acc
    if (!acc[s.department]) acc[s.department] = { department: s.department, total: 0, count: 0, maxCGPA: 0 }
    acc[s.department].total += s.CGPA
    acc[s.department].count += 1
    acc[s.department].maxCGPA = Math.max(acc[s.department].maxCGPA, s.CGPA)
    return acc
  }, {} as Record<string, { department: string; total: number; count: number; maxCGPA: number }>)
  const branchInsightData = Object.values(branchStats).map(b => ({
    department: b.department,
    avgCGPA: parseFloat((b.total / b.count).toFixed(2)),
    maxCGPA: b.maxCGPA
  }))



  return (
    <div className="min-h-screen bg-[#000000] font-poppins">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/university" className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Users className="h-10 w-10 text-blue-500" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent">
                  Student Management
                </h1>
                <p className="text-gray-300 text-lg">Manage students at {user?.university?.name}</p>
              </div>
            </div>
            <Link href="/university/students/create">
              <Button className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Filter className="h-5 w-5 mr-2 text-blue-500" />
              Filters
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or student ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/50 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-black/50 text-white"
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
        </div>



        {/* Students Table */}
        <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Students ({filteredStudents.length})</h2>
                <p className="text-gray-300">
                  {searchQuery || selectedDepartment
                    ? `Showing filtered results`
                    : `All students in your university`}
                </p>
              </div>
            </div>
          </div>
          <div>
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
            {/* 1️⃣ Department-wise Average CGPA */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Average CGPA by Department</CardTitle>
                  <CardDescription>Department-wise average CGPA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="department"
                          interval={0}
                          angle={-30}
                          textAnchor="end"
                          tick={{ fontSize: 12, fill: '#fff' }}
                        />
                        <YAxis domain={[minCGPA, maxCGPA]} />
                        <Tooltip />
                        <Bar dataKey="avgCGPA" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 2️⃣ Grade distribution */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                  <CardDescription>Number of students per grade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={gradeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="grade" tick={{ fontSize: 12, fill: '#fff' }} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 3️⃣ Branch-wise insight (Average + Highest CGPA) */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Branch-wise CGPA Insights</CardTitle>
                  <CardDescription>Average and Highest CGPA per branch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={branchInsightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="department"
                          interval={0}
                          angle={-30}
                          textAnchor="end"
                          tick={{ fontSize: 12, fill: '#fff' }}
                        />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Bar dataKey="avgCGPA" fill="#3b82f6" name="Average CGPA" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="maxCGPA" fill="#f97316" name="Highest CGPA" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
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

import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogoutButton } from "@/components/logout-button"
import { Users, Search, Download, Eye, Edit, Mail, Phone } from "lucide-react"
import { studentRecords } from "@/lib/admin-data"
import Link from "next/link"

export default async function StudentsPage() {
  const session = await getSession()

  if (!session || session.user.role !== "university") {
    redirect("/login?role=university")
  }

  const activeStudents = studentRecords.filter((s) => s.status === "active")
  const totalAchievements = studentRecords.reduce((sum, s) => sum + s.totalAchievements, 0)
  const avgCGPA = studentRecords.reduce((sum, s) => sum + s.cgpa, 0) / studentRecords.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/university" className="text-muted-foreground hover:text-foreground">
                ← Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  Student Management
                </h1>
                <p className="text-muted-foreground">Manage student records and performance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{session.user.universityName}</Badge>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentRecords.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeStudents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalAchievements}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average CGPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{avgCGPA.toFixed(1)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search students..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="eng">Engineering</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="arts">Arts & Sciences</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1">Year 1</SelectItem>
                <SelectItem value="2">Year 2</SelectItem>
                <SelectItem value="3">Year 3</SelectItem>
                <SelectItem value="4">Year 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Bulk Email
            </Button>
          </div>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentRecords.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{student.name}</h3>
                        <Badge variant="outline">{student.studentId}</Badge>
                        <Badge
                          variant={student.status === "active" ? "default" : "secondary"}
                          className={student.status === "active" ? "bg-green-500" : ""}
                        >
                          {student.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{student.department}</span>
                        <span>Year {student.year}</span>
                        <span>{student.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{student.cgpa}</div>
                      <div className="text-xs text-muted-foreground">CGPA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{student.totalAchievements}</div>
                      <div className="text-xs text-muted-foreground">Achievements</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{student.totalPoints}</div>
                      <div className="text-xs text-muted-foreground">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{student.attendancePercentage}%</div>
                      <div className="text-xs text-muted-foreground">Attendance</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Bulk Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Send Notification to All
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Selected
              </Button>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Generate Contact List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LogoutButton } from "@/components/logout-button"
import {
  Users,
  Award,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  FileText,
  Settings,
  Plus,
} from "lucide-react"
import { institutionalStats, pendingApprovals, adminEvents, studentRecords } from "@/lib/admin-data"
import Link from "next/link"

export default async function UniversityDashboard() {
  const session = await getSession()

  if (!session || session.user.role !== "university") {
    redirect("/login?role=university")
  }

  const recentApprovals = pendingApprovals.slice(0, 4)
  const upcomingEvents = adminEvents.filter((e) => e.status === "published").slice(0, 3)
  const topPerformers = studentRecords.sort((a, b) => b.totalPoints - a.totalPoints).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">University Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {session.user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{session.user.universityName}</Badge>
              <Badge variant="outline">Administrator</Badge>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{institutionalStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">{institutionalStats.activeStudents} active students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{institutionalStats.totalAchievements}</div>
              <p className="text-xs text-muted-foreground">{institutionalStats.pendingApprovals} pending approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average CGPA</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{institutionalStats.averageCGPA}</div>
              <p className="text-xs text-muted-foreground">Institution-wide average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{institutionalStats.upcomingEvents}</div>
              <p className="text-xs text-muted-foreground">{institutionalStats.totalEvents} total events</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Approvals */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Pending Approvals
                    <Badge variant="destructive" className="ml-2">
                      {pendingApprovals.length}
                    </Badge>
                  </CardTitle>
                  <CardDescription>Student achievements awaiting review</CardDescription>
                </div>
                <Link href="/university/approvals">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentApprovals.map((approval) => (
                  <div key={approval.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{approval.achievementTitle}</h4>
                        <Badge variant="outline" className="capitalize">
                          {approval.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{approval.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {approval.studentName} ({approval.studentId})
                        </span>
                        <span>{approval.points} points</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 hover:bg-green-50 bg-transparent">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 bg-transparent">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Department Performance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Department Performance
                  </CardTitle>
                  <CardDescription>Academic performance by department</CardDescription>
                </div>
                <Link href="/university/analytics">
                  <Button variant="outline" size="sm">
                    View Analytics
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {institutionalStats.departmentStats.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{dept.name}</h4>
                        <p className="text-sm text-muted-foreground">{dept.students} students</p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-lg font-bold text-primary">{dept.avgCGPA}</div>
                        <div className="text-xs text-muted-foreground">{dept.achievements} achievements</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/university/events/new">
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </Link>
                <Link href="/university/notifications/new">
                  <Button className="w-full bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Send Notification
                  </Button>
                </Link>
                <Link href="/university/students">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Students
                  </Button>
                </Link>
                <Link href="/university/reports">
                  <Button className="w-full bg-transparent" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Events
                </CardTitle>
                <Link href="/university/events">
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-sm">{event.title}</h5>
                      <Badge variant="outline" className="capitalize">
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span>
                        {event.registered}/{event.capacity} registered
                      </span>
                    </div>
                    <Progress value={(event.registered / event.capacity) * 100} className="mt-2 h-1" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topPerformers.map((student, index) => (
                  <div key={student.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{student.name}</h5>
                      <p className="text-xs text-muted-foreground">{student.department}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">{student.totalPoints}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="default" className="bg-green-500">
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Service</span>
                  <Badge variant="default" className="bg-green-500">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup Status</span>
                  <Badge variant="secondary">Last: 2h ago</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server Load</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={65} className="w-16 h-2" />
                    <span className="text-xs text-muted-foreground">65%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

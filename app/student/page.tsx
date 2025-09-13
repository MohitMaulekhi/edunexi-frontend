import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/logout-button"
import { Award, BookOpen, Calendar, Bell, Users, TrendingUp, FileText, Star, CheckCircle } from "lucide-react"
import { studentStats, studentAchievements, cgpaRecords, upcomingEvents, notifications } from "@/lib/student-data"
import Link from "next/link"

export default async function StudentDashboard() {
  const session = await getSession()

  if (!session || session.user.role !== "student") {
    redirect("/login?role=student")
  }

  const recentAchievements = studentAchievements.slice(0, 3)
  const recentEvents = upcomingEvents.slice(0, 3)
  const unreadNotifications = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {session.user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{session.user.studentId}</Badge>
              <Badge variant="outline">{session.user.department}</Badge>
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
              <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentStats.totalAchievements}</div>
              <p className="text-xs text-muted-foreground">
                {studentStats.approvedAchievements} approved, {studentStats.pendingAchievements} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievement Points</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentStats.totalPoints}</div>
              <p className="text-xs text-muted-foreground">Lifetime points earned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentStats.currentCGPA}</div>
              <p className="text-xs text-muted-foreground">Overall: {studentStats.overallCGPA}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentStats.attendancePercentage}%</div>
              <Progress value={studentStats.attendancePercentage} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Achievements */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Recent Achievements
                  </CardTitle>
                  <CardDescription>Your latest accomplishments</CardDescription>
                </div>
                <Link href="/student/achievements">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <Badge
                          variant={
                            achievement.status === "approved"
                              ? "default"
                              : achievement.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {achievement.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{new Date(achievement.date).toLocaleDateString()}</span>
                        <span>{achievement.points} points</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* CGPA Breakdown */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Academic Performance
                  </CardTitle>
                  <CardDescription>Your semester-wise CGPA breakdown</CardDescription>
                </div>
                <Link href="/student/academics">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cgpaRecords.slice(0, 2).map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{record.semester}</h4>
                        <p className="text-sm text-muted-foreground">{record.credits} credits</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{record.cgpa}</div>
                        <p className="text-xs text-muted-foreground">CGPA</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                  {unreadNotifications > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {unreadNotifications}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border rounded-lg ${!notification.read ? "bg-muted/50" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h5 className="font-medium text-sm">{notification.title}</h5>
                      {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{new Date(notification.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Events
                </CardTitle>
                <Link href="/student/events">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-sm">{event.title}</h5>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      {event.registered && <Badge variant="secondary">Registered</Badge>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/student/achievements/new">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Award className="h-4 w-4 mr-2" />
                    Add Achievement
                  </Button>
                </Link>
                <Link href="/student/portfolio">
                  <Button className="w-full bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Portfolio
                  </Button>
                </Link>
                <Link href="/student/societies">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Join Society
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

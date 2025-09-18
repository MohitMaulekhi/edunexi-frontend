"use client"

import { useAuth } from "@/contexts/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { DashboardStatsSkeleton, DashboardCardSkeleton, DashboardQuickActionsSkeleton, DashboardNotificationsSkeleton } from "@/components/ui/dashboard-skeleton"
import { SmoothTransition } from "@/components/ui/smooth-transition"
import { Award, BookOpen, Calendar, Bell, Users, TrendingUp, FileText, Star, CheckCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

function StudentDashboardContent() {
  const { user, logout } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [dataLoaded, setDataLoaded] = useState(false)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setDataLoaded(true)
    }, 1500) // Simulate API call delay

    return () => clearTimeout(timer)
  }, [])

  if (!user) return null

  // Mock data for dashboard (replace with actual Strapi data later)
  const recentAchievements = [
    {
      id: "1",
      title: "Dean's List",
      description: "Achieved academic excellence",
      category: "academic" as const,
      date: "2024-09-01",
      status: "approved" as const,
      points: 100,
    },
    {
      id: "2", 
      title: "Hackathon Winner",
      description: "Won first place in university hackathon",
      category: "competition" as const,
      date: "2024-08-15",
      status: "approved" as const,
      points: 150,
    },
    {
      id: "3",
      title: "Research Publication",
      description: "Published paper in conference proceedings",
      category: "academic" as const,
      date: "2024-07-20",
      status: "pending" as const,
      points: 200,
    }
  ]

  const recentEvents = [
    {
      id: "1",
      title: "Career Fair",
      description: "Annual career fair with top companies",
      date: "2024-09-20",
      location: "Main Hall",
      type: "career" as const,
      registered: false,
    },
    {
      id: "2",
      title: "Tech Talk",
      description: "Latest trends in AI and ML",
      date: "2024-09-25", 
      location: "Auditorium",
      type: "academic" as const,
      registered: true,
    }
  ]

  const cgpaRecords = [
    {
      semester: "Spring 2024",
      cgpa: 3.8,
      credits: 18,
      subjects: []
    },
    {
      semester: "Fall 2023", 
      cgpa: 3.7,
      credits: 18,
      subjects: []
    }
  ]

  const notifications = [
    {
      id: "1",
      title: "Achievement Approved",
      message: "Your Dean's List achievement has been approved",
      read: false,
      date: "2024-09-10"
    },
    {
      id: "2",
      title: "New Event",
      message: "Career Fair next week",
      read: false, 
      date: "2024-09-09"
    }
  ]

  const unreadNotifications = notifications.filter((n) => !n.read).length

  const studentStats = {
    totalAchievements: recentAchievements.length,
    approvedAchievements: recentAchievements.filter(a => a.status === 'approved').length,
    pendingAchievements: recentAchievements.filter(a => a.status === 'pending').length,
    totalPoints: recentAchievements.reduce((sum, a) => sum + a.points, 0),
    currentCGPA: user.student?.CGPA || 3.75,
    overallCGPA: user.student?.CGPA || 3.75,
    attendancePercentage: 85
  }

  return (
    <div className="min-h-screen bg-[#000000] font-poppins">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header - Integrated into content */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Award className="h-7 w-7 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent">Student Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.username}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 w-full sm:w-auto">
              <Badge variant="secondary" className="text-xs min-h-[32px] flex items-center">{user.student?.studentId}</Badge>
              <Badge variant="outline" className="text-xs min-h-[32px] flex items-center">{user.student?.department}</Badge>
            </div>
          </div>
        </div>
        {/* Stats Overview */}
        {isLoading ? (
          <DashboardStatsSkeleton />
        ) : (
          <SmoothTransition show={dataLoaded} type="fade" duration="normal">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 mb-6 sm:mb-8">
          <AnimatedCard 
            hoverEffect="lift" 
            animationDelay={0}
            className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-l-4 border-l-blue-500"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-0">
              <CardTitle className="text-sm sm:text-base font-medium">Total Achievements</CardTitle>
              <Award className="h-6 w-6 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-2xl sm:text-3xl md:text-2xl font-bold gradient-text-primary">{studentStats.totalAchievements}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                <span className="text-green-400">{studentStats.approvedAchievements} approved</span>, <span className="text-orange-400">{studentStats.pendingAchievements} pending</span>
              </p>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard 
            hoverEffect="glow" 
            glowColor="purple"
            animationDelay={100}
            className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-l-4 border-l-purple-500"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-0">
              <CardTitle className="text-sm sm:text-base font-medium">Achievement Points</CardTitle>
              <Star className="h-6 w-6 sm:h-5 sm:w-5 text-purple-400 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-2xl sm:text-3xl md:text-2xl font-bold text-purple-400">{studentStats.totalPoints}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">Lifetime points earned</p>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard 
            hoverEffect="glow" 
            glowColor="green"
            animationDelay={200}
            className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-l-4 border-l-green-500"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-0">
              <CardTitle className="text-sm sm:text-base font-medium">Current CGPA</CardTitle>
              <TrendingUp className="h-6 w-6 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-2xl sm:text-3xl md:text-2xl font-bold text-green-400">{studentStats.currentCGPA}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">Overall: <span className="text-green-300">{studentStats.overallCGPA}</span></p>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard 
            hoverEffect="glow" 
            glowColor="orange"
            animationDelay={300}
            className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-l-4 border-l-orange-500"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-0">
              <CardTitle className="text-sm sm:text-base font-medium">Attendance</CardTitle>
              <CheckCircle className="h-6 w-6 sm:h-5 sm:w-5 text-orange-400 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-2xl sm:text-3xl md:text-2xl font-bold text-orange-400">{studentStats.attendancePercentage}%</div>
              <Progress value={studentStats.attendancePercentage} className="mt-3" />
            </CardContent>
          </AnimatedCard>
            </div>
          </SmoothTransition>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 md:space-y-7">
            {/* Recent Achievements */}
            {isLoading ? (
              <DashboardCardSkeleton />
            ) : (
              <SmoothTransition show={dataLoaded} type="slide-up" delay={400}>
                <AnimatedCard 
                  hoverEffect="lift"
                  className="rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl border-t-2 border-t-blue-500"
                >
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-0 gap-4 sm:gap-0">
                <div>
                  <CardTitle className="flex items-center text-base sm:text-lg gradient-text-primary">
                    <Award className="h-5 w-5 mr-2 flex-shrink-0 text-blue-400" />
                    Recent Achievements
                  </CardTitle>
                  <CardDescription className="text-sm">Your latest accomplishments</CardDescription>
                </div>
                <Link href="/student/achievements">
                  <LoadingButton 
                    variant="outline" 
                    size="sm" 
                    className="min-h-[48px] w-full sm:w-auto px-4 hover:scale-105 transition-transform duration-200"
                  >
                    View All
                  </LoadingButton>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-5 px-0">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className={`flex items-start space-x-4 p-4 md:p-5 border rounded-xl bg-[#000000] hover:bg-[#111111] transition-colors duration-200 ${
                    achievement.category === 'academic' ? 'border-l-4 border-l-blue-400 border-gray-700' :
                    achievement.category === 'competition' ? 'border-l-4 border-l-purple-400 border-gray-700' :
                    'border-gray-700'
                  }`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm sm:text-base truncate">{achievement.title}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              achievement.category === 'academic' ? 'border-blue-400 text-blue-400' :
                              achievement.category === 'competition' ? 'border-purple-400 text-purple-400' :
                              'border-gray-400 text-gray-400'
                            }`}
                          >
                            {achievement.category}
                          </Badge>
                        </div>
                        <Badge
                          variant={
                            achievement.status === "approved"
                              ? "default"
                              : achievement.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className={`self-start sm:self-center ${
                            achievement.status === "approved" ? "bg-green-600 hover:bg-green-700" :
                            achievement.status === "pending" ? "bg-orange-600 hover:bg-orange-700" :
                            ""
                          }`}
                        >
                          {achievement.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-1 sm:gap-0">
                        <span>{new Date(achievement.date).toLocaleDateString()}</span>
                        <span className="font-medium text-purple-400">{achievement.points} points</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
                </AnimatedCard>
              </SmoothTransition>
            )}

            {/* CGPA Breakdown */}
            {isLoading ? (
              <DashboardCardSkeleton />
            ) : (
              <SmoothTransition show={dataLoaded} type="slide-up" delay={500}>
                <AnimatedCard 
                  hoverEffect="lift"
                  className="rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl border-t-2 border-t-green-500"
                >
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-0 gap-4 sm:gap-0">
                <div>
                  <CardTitle className="flex items-center text-base sm:text-lg gradient-text-primary">
                    <BookOpen className="h-5 w-5 mr-2 flex-shrink-0 text-green-400" />
                    Academic Performance
                  </CardTitle>
                  <CardDescription className="text-sm">Your semester-wise CGPA breakdown</CardDescription>
                </div>
                <Link href="/student/academics">
                  <LoadingButton 
                    variant="outline" 
                    size="sm" 
                    className="min-h-[48px] w-full sm:w-auto px-4 hover:scale-105 transition-transform duration-200"
                  >
                    View Details
                  </LoadingButton>
                </Link>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-4 md:space-y-5">
                  {cgpaRecords.slice(0, 2).map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 md:p-5 border border-gray-700 rounded-xl bg-[#000000] hover:bg-[#111111] transition-colors duration-200 border-l-4 border-l-green-400">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-sm sm:text-base">{record.semester}</h4>
                        <p className="text-sm text-muted-foreground">{record.credits} credits</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-xl sm:text-2xl font-bold ${
                          record.cgpa >= 3.7 ? 'text-green-400' :
                          record.cgpa >= 3.0 ? 'text-orange-400' :
                          'text-red-400'
                        }`}>{record.cgpa}</div>
                        <p className="text-xs text-muted-foreground">CGPA</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
                </AnimatedCard>
              </SmoothTransition>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:space-y-7">
            {/* Notifications */}
            {isLoading ? (
              <DashboardNotificationsSkeleton />
            ) : (
              <SmoothTransition show={dataLoaded} type="slide-up" delay={600}>
                <AnimatedCard 
                  hoverEffect="glow"
                  glowColor="red"
                  className="rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl border-t-2 border-t-red-500"
                >
              <CardHeader className="flex flex-row items-center justify-between px-0 pb-4">
                <CardTitle className="flex items-center flex-wrap gap-2 text-base sm:text-lg gradient-text-primary">
                  <Bell className="h-5 w-5 flex-shrink-0 text-red-400" />
                  <span>Notifications</span>
                  {unreadNotifications > 0 && (
                    <Badge variant="destructive" className="text-xs bg-red-600 hover:bg-red-700 animate-pulse">
                      {unreadNotifications}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-0">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border border-gray-700 rounded-xl bg-[#000000] hover:bg-[#111111] transition-colors duration-200 cursor-pointer min-h-[80px] ${!notification.read ? "border-blue-400/50" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-sm flex-1 pr-2">{notification.title}</h5>
                      {!notification.read && <div className="w-2 h-2 bg-primary rounded-full mt-1 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{new Date(notification.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </CardContent>
                </AnimatedCard>
              </SmoothTransition>
            )}

            {/* Upcoming Events */}
            {isLoading ? (
              <DashboardCardSkeleton />
            ) : (
              <SmoothTransition show={dataLoaded} type="slide-up" delay={700}>
                <AnimatedCard 
                  hoverEffect="glow"
                  glowColor="blue"
                  className="rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl border-t-2 border-t-indigo-500"
                >
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-0 gap-4 sm:gap-0 pb-4">
                <CardTitle className="flex items-center text-base sm:text-lg gradient-text-primary">
                  <Calendar className="h-5 w-5 mr-2 flex-shrink-0 text-indigo-400" />
                  Upcoming Events
                </CardTitle>
                <Link href="/student/events">
                  <LoadingButton 
                    variant="outline" 
                    size="sm" 
                    className="min-h-[48px] w-full sm:w-auto px-4 hover:scale-105 transition-transform duration-200"
                  >
                    View All
                  </LoadingButton>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4 px-0">
                {recentEvents.map((event) => (
                  <div key={event.id} className={`p-4 border rounded-xl bg-[#000000] hover:bg-[#111111] transition-colors duration-200 cursor-pointer min-h-[80px] ${
                    event.type === 'career' ? 'border-l-4 border-l-orange-400 border-gray-700' :
                    event.type === 'academic' ? 'border-l-4 border-l-blue-400 border-gray-700' :
                    'border-gray-700'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                      <h5 className="font-medium text-sm flex-1">{event.title}</h5>
                      <Badge 
                        variant="outline" 
                        className={`self-start sm:self-center ${
                          event.type === 'career' ? 'border-orange-400 text-orange-400' :
                          event.type === 'academic' ? 'border-blue-400 text-blue-400' :
                          'border-gray-400 text-gray-400'
                        }`}
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{event.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-2 sm:gap-0">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      {event.registered && <Badge variant="secondary" className="self-start sm:self-center bg-green-600 hover:bg-green-700">Registered</Badge>}
                    </div>
                  </div>
                ))}
              </CardContent>
                </AnimatedCard>
              </SmoothTransition>
            )}

            {/* Quick Actions */}
            {isLoading ? (
              <DashboardQuickActionsSkeleton />
            ) : (
              <SmoothTransition show={dataLoaded} type="slide-up" delay={800}>
                <AnimatedCard 
                  hoverEffect="glow"
                  glowColor="purple"
                  className="rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl border-t-2 border-t-purple-500"
                >
              <CardHeader className="px-0 pb-4">
                <CardTitle className="text-base sm:text-lg gradient-text-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-0">
                <Link href="/student/achievements/new">
                  <LoadingButton 
                    className="w-full min-h-[48px] text-sm hover:scale-[1.02] transition-transform duration-200" 
                    variant="outline"
                    icon={<Award className="h-4 w-4" />}
                  >
                    Add Achievement
                  </LoadingButton>
                </Link>
                <Link href="/student/portfolio">
                  <LoadingButton 
                    className="w-full min-h-[48px] text-sm hover:scale-[1.02] transition-transform duration-200" 
                    variant="outline"
                    icon={<FileText className="h-4 w-4" />}
                  >
                    Generate Portfolio
                  </LoadingButton>
                </Link>
                <Link href="/student/societies">
                  <LoadingButton 
                    className="w-full min-h-[48px] text-sm hover:scale-[1.02] transition-transform duration-200" 
                    variant="outline"
                    icon={<Users className="h-4 w-4" />}
                  >
                    Join Society
                  </LoadingButton>
                </Link>
              </CardContent>
                </AnimatedCard>
              </SmoothTransition>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StudentDashboard() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentDashboardContent />
    </ProtectedRoute>
  )
}

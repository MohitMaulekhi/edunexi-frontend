"use client"

import { useAuth } from "@/contexts/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { DashboardStatsSkeleton, UniversityApprovalsSkeleton } from "@/components/ui/dashboard-skeleton"
import { SmoothTransition } from "@/components/ui/smooth-transition"
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  LogOut,
  School
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

function UniversityDashboardContent() {
  const { user, logout } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [dataLoaded, setDataLoaded] = useState(false)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setDataLoaded(true)
    }, 1200) // Simulate API call delay

    return () => clearTimeout(timer)
  }, [])

  if (!user) return null

  // Mock data for university dashboard (replace with actual Strapi data later)
  const pendingApprovals = [
    {
      id: "1",
      studentName: "John Doe",
      achievement: "Conference Presentation",
      category: "Research",
      submittedDate: "2024-09-10",
      type: "pending" as const,
    },
    {
      id: "2",
      studentName: "Lakshay ",
      achievement: "Hackathon Winner",
      category: "Competition",
      submittedDate: "2024-09-08",
      type: "pending" as const,
    },
  ]

  const recentApprovals = [
    {
      id: "3",
      studentName: "Mike Johnson",
      achievement: "Dean's List",
      category: "Academic",
      approvedDate: "2024-09-09",
      type: "approved" as const,
    },
  ]

  const universityStats = {
    totalStudents: 1250,
    pendingApprovals: 23,
    monthlyApprovals: 156,
    activePrograms: 8,
  }

  return (
    <div className="min-h-screen bg-[#000000] font-poppins">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Page Header - Integrated into content */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-2">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <School className="h-7 w-7 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent">University Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user.username}</p>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{user.university?.name}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-3 lg:gap-4 w-full sm:w-auto">
            <Link href="/university/notifications">
              <Button variant="outline" size="sm" className="min-h-[48px] flex-1 sm:flex-none px-4">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Notifications</span>
                <span className="sm:hidden">Alerts</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        {isLoading ? (
          <DashboardStatsSkeleton />
        ) : (
          <SmoothTransition show={dataLoaded} type="fade" duration="normal">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          <AnimatedCard 
            hoverEffect="lift" 
            animationDelay={0}
            className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-l-4 border-l-blue-500"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-0">
              <CardTitle className="text-sm sm:text-base font-medium">Total Students</CardTitle>
              <Users className="h-6 w-6 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-2xl sm:text-3xl md:text-2xl font-bold gradient-text-primary">{universityStats.totalStudents}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">Active enrolled students</p>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard 
            hoverEffect="glow" 
            glowColor="orange"
            animationDelay={100}
            className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-l-4 border-l-orange-500"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-0">
              <CardTitle className="text-sm sm:text-base font-medium">Pending Approvals</CardTitle>
              <Clock className="h-6 w-6 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0 animate-pulse" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-2xl sm:text-3xl md:text-2xl font-bold text-orange-400">{universityStats.pendingApprovals}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">Awaiting review</p>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard 
            hoverEffect="glow" 
            glowColor="green"
            animationDelay={200}
            className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-l-4 border-l-green-500"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-0">
              <CardTitle className="text-sm sm:text-base font-medium">Monthly Approvals</CardTitle>
              <CheckCircle className="h-6 w-6 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-2xl sm:text-3xl md:text-2xl font-bold text-green-400">{universityStats.monthlyApprovals}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">This month</p>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard 
            hoverEffect="glow" 
            glowColor="purple"
            animationDelay={300}
            className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-l-4 border-l-purple-500"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-0">
              <CardTitle className="text-sm sm:text-base font-medium">Active Programs</CardTitle>
              <BarChart3 className="h-6 w-6 sm:h-5 sm:w-5 text-purple-400 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-2xl sm:text-3xl md:text-2xl font-bold text-purple-400">{universityStats.activePrograms}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">Running programs</p>
            </CardContent>
          </AnimatedCard>
            </div>
          </SmoothTransition>
        )}

        {/* Quick Actions */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl min-h-[140px] sm:min-h-[150px] md:min-h-[160px] bg-black/70 backdrop-blur-md border border-gray-700 animate-pulse">
                <div className="text-center py-3 sm:py-4 md:py-5">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 bg-gray-700 rounded mx-auto mb-3" />
                  <div className="h-4 w-24 bg-gray-700 rounded mx-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <SmoothTransition show={dataLoaded} type="fade" delay={400}>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          <Link href="/university/approvals">
            <AnimatedCard 
              hoverEffect="lift"
              animationDelay={0}
              className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl cursor-pointer min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-t-2 border-t-green-500"
            >
              <CardHeader className="text-center py-3 sm:py-4 md:py-5 px-0">
                <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-green-400 mx-auto mb-3" />
                <CardTitle className="text-sm sm:text-base font-medium gradient-text-primary">Review Approvals</CardTitle>
              </CardHeader>
            </AnimatedCard>
          </Link>

          <Link href="/university/students">
            <AnimatedCard 
              hoverEffect="lift"
              animationDelay={100}
              className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl cursor-pointer min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-t-2 border-t-blue-500"
            >
              <CardHeader className="text-center py-3 sm:py-4 md:py-5 px-0">
                <Users className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-blue-400 mx-auto mb-3" />
                <CardTitle className="text-sm sm:text-base font-medium gradient-text-primary">Manage Students</CardTitle>
              </CardHeader>
            </AnimatedCard>
          </Link>

          <Link href="/university/events">
            <AnimatedCard 
              hoverEffect="lift"
              animationDelay={200}
              className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl cursor-pointer min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-t-2 border-t-indigo-500"
            >
              <CardHeader className="text-center py-3 sm:py-4 md:py-5 px-0">
                <Calendar className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-indigo-400 mx-auto mb-3" />
                <CardTitle className="text-sm sm:text-base font-medium gradient-text-primary">Events</CardTitle>
              </CardHeader>
            </AnimatedCard>
          </Link>

          <Link href="/university/notifications">
            <AnimatedCard 
              hoverEffect="lift"
              animationDelay={300}
              className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl cursor-pointer min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-t-2 border-t-red-500"
            >
              <CardHeader className="text-center py-3 sm:py-4 md:py-5 px-0">
                <Bell className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-red-400 mx-auto mb-3" />
                <CardTitle className="text-sm sm:text-base font-medium gradient-text-primary">Notifications</CardTitle>
              </CardHeader>
            </AnimatedCard>
          </Link>
            </div>
          </SmoothTransition>
        )}

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7 lg:gap-8">
          {/* Pending Approvals */}
          {isLoading ? (
            <UniversityApprovalsSkeleton />
          ) : (
            <SmoothTransition show={dataLoaded} type="slide-up" delay={600}>
              <AnimatedCard 
                hoverEffect="lift"
                className="rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl border-t-2 border-t-orange-500"
              >
            <CardHeader className="px-0 pb-4">
              <CardTitle className="flex items-center text-base sm:text-lg gradient-text-primary">
                <AlertCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 animate-pulse" />
                Pending Approvals
              </CardTitle>
              <CardDescription className="text-sm">Achievement submissions awaiting your review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-5 px-0">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 border rounded-xl bg-[#000000] hover:bg-[#111111] transition-colors duration-200 gap-4 sm:gap-4 min-h-[80px] ${
                  approval.category === 'Research' ? 'border-l-4 border-l-purple-400 border-gray-700' :
                  approval.category === 'Competition' ? 'border-l-4 border-l-orange-400 border-gray-700' :
                  'border-gray-700'
                } border-l-4 border-l-orange-400`}>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm sm:text-base truncate">{approval.studentName}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{approval.achievement}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        approval.category === 'Research' ? 'border-purple-400 text-purple-400' :
                        approval.category === 'Competition' ? 'border-orange-400 text-orange-400' :
                        'border-gray-400 text-gray-400'
                      }`}
                    >
                      {approval.category}
                    </Badge>
                  </div>
                  <LoadingButton 
                    size="sm" 
                    className="min-h-[48px] w-full sm:w-auto px-4 hover:scale-[1.02] transition-transform duration-200"
                  >
                    Review
                  </LoadingButton>
                </div>
              ))}
              {pendingApprovals.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No pending approvals</p>
              )}
            </CardContent>
              </AnimatedCard>
            </SmoothTransition>
          )}

          {/* Recent Approvals */}
          {isLoading ? (
            <UniversityApprovalsSkeleton />
          ) : (
            <SmoothTransition show={dataLoaded} type="slide-up" delay={700}>
              <AnimatedCard 
                hoverEffect="lift"
                className="rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl border-t-2 border-t-green-500"
              >
            <CardHeader className="px-0 pb-4">
              <CardTitle className="flex items-center text-base sm:text-lg gradient-text-primary">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                Recent Approvals
              </CardTitle>
              <CardDescription className="text-sm">Recently approved achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-5 px-0">
              {recentApprovals.map((approval) => (
                <div key={approval.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 border rounded-xl bg-[#000000] hover:bg-[#111111] transition-colors duration-200 gap-4 sm:gap-4 min-h-[80px] ${
                  approval.category === 'Academic' ? 'border-l-4 border-l-blue-400 border-gray-700' :
                  'border-gray-700'
                } border-l-4 border-l-green-400`}>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm sm:text-base truncate">{approval.studentName}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{approval.achievement}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        approval.category === 'Academic' ? 'border-blue-400 text-blue-400' :
                        'border-gray-400 text-gray-400'
                      }`}
                    >
                      {approval.category}
                    </Badge>
                  </div>
                  <Badge variant="default" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto text-center min-h-[32px] flex items-center justify-center">
                    Approved
                  </Badge>
                </div>
              ))}
              {recentApprovals.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No recent approvals</p>
              )}
            </CardContent>
              </AnimatedCard>
            </SmoothTransition>
          )}
        </div>
      </div>
    </div>
  )
}

export default function UniversityDashboard() {
  return (
    <ProtectedRoute allowedRoles={["university_admin"]}>
      <UniversityDashboardContent />
    </ProtectedRoute>
  )
}

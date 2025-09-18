"use client"

import { useAuth } from "@/contexts/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Award, 
  Calendar, 
  BarChart3, 
  Bell, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  LogOut,
  School
} from "lucide-react"
import Link from "next/link"

function UniversityDashboardContent() {
  const { user, logout } = useAuth()

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
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-2">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <School className="h-7 w-7 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold">University Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user.username}</p>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{user.university?.name}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-3 lg:gap-4 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="min-h-[44px] flex-1 sm:flex-none px-4">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Notifications</span>
              <span className="sm:hidden">Alerts</span>
            </Button>
            <Button variant="outline" size="sm" onClick={logout} className="min-h-[44px] flex-1 sm:flex-none px-4">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Exit</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          <Card className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-0">
              <CardTitle className="text-sm sm:text-base font-medium">Total Students</CardTitle>
              <Users className="h-6 w-6 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-2xl sm:text-3xl md:text-2xl font-bold gradient-text-primary">{universityStats.totalStudents}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">Active enrolled students</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-0">
              <CardTitle className="text-sm sm:text-base font-medium">Pending Approvals</CardTitle>
              <Clock className="h-6 w-6 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0 animate-pulse" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-2xl sm:text-3xl md:text-2xl font-bold text-orange-400">{universityStats.pendingApprovals}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-0">
              <CardTitle className="text-sm sm:text-base font-medium">Monthly Approvals</CardTitle>
              <CheckCircle className="h-6 w-6 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-2xl sm:text-3xl md:text-2xl font-bold text-green-400">{universityStats.monthlyApprovals}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">This month</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-0">
              <CardTitle className="text-sm sm:text-base font-medium">Active Programs</CardTitle>
              <BarChart3 className="h-6 w-6 sm:h-5 sm:w-5 text-purple-400 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-0">
              <div className="text-2xl sm:text-3xl md:text-2xl font-bold text-purple-400">{universityStats.activePrograms}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">Running programs</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          <Link href="/university/approvals">
            <Card className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-t-2 border-t-green-500">
              <CardHeader className="text-center py-3 sm:py-4 md:py-5 px-0">
                <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-green-400 mx-auto mb-3" />
                <CardTitle className="text-sm sm:text-base font-medium gradient-text-primary">Review Approvals</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/university/students">
            <Card className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-t-2 border-t-blue-500">
              <CardHeader className="text-center py-3 sm:py-4 md:py-5 px-0">
                <Users className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-blue-400 mx-auto mb-3" />
                <CardTitle className="text-sm sm:text-base font-medium gradient-text-primary">Manage Students</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/university/events">
            <Card className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-t-2 border-t-indigo-500">
              <CardHeader className="text-center py-3 sm:py-4 md:py-5 px-0">
                <Calendar className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-indigo-400 mx-auto mb-3" />
                <CardTitle className="text-sm sm:text-base font-medium gradient-text-primary">Events</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/university/notifications">
            <Card className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer min-h-[140px] sm:min-h-[150px] md:min-h-[160px] border-t-2 border-t-red-500">
              <CardHeader className="text-center py-3 sm:py-4 md:py-5 px-0">
                <Bell className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-red-400 mx-auto mb-3" />
                <CardTitle className="text-sm sm:text-base font-medium gradient-text-primary">Notifications</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7 lg:gap-8">
          {/* Pending Approvals */}
          <Card className="rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-2 border-t-orange-500">
            <CardHeader className="px-0 pb-4">
              <CardTitle className="flex items-center text-base sm:text-lg gradient-text-primary">
                <AlertCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 animate-pulse" />
                Pending Approvals
              </CardTitle>
              <CardDescription className="text-sm">Achievement submissions awaiting your review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-5 px-0">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 border rounded-xl bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-colors duration-200 gap-4 sm:gap-4 ${
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
                  <Button size="sm" className="min-h-[44px] w-full sm:w-auto px-4 hover:scale-[1.02] transition-transform duration-200">Review</Button>
                </div>
              ))}
              {pendingApprovals.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No pending approvals</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Approvals */}
          <Card className="rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-2 border-t-green-500">
            <CardHeader className="px-0 pb-4">
              <CardTitle className="flex items-center text-base sm:text-lg gradient-text-primary">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                Recent Approvals
              </CardTitle>
              <CardDescription className="text-sm">Recently approved achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-5 px-0">
              {recentApprovals.map((approval) => (
                <div key={approval.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 border rounded-xl bg-black/30 backdrop-blur-sm hover:bg-black/40 transition-colors duration-200 gap-4 sm:gap-4 ${
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
          </Card>
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

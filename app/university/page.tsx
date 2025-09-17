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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <School className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">University Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.username}</p>
              <p className="text-sm text-muted-foreground">{user.university?.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{universityStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Active enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{universityStats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Approvals</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{universityStats.monthlyApprovals}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{universityStats.activePrograms}</div>
              <p className="text-xs text-muted-foreground">Running programs</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/university/approvals">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center py-4">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-sm">Review Approvals</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/university/students">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center py-4">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-sm">Manage Students</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/university/events">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center py-4">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-sm">Events</CardTitle>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/university/notifications">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center py-4">
                <Bell className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-sm">Notifications</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                Pending Approvals
              </CardTitle>
              <CardDescription>Achievement submissions awaiting your review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{approval.studentName}</h4>
                    <p className="text-sm text-muted-foreground">{approval.achievement}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {approval.category}
                    </Badge>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
              ))}
              {pendingApprovals.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No pending approvals</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Recent Approvals
              </CardTitle>
              <CardDescription>Recently approved achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{approval.studentName}</h4>
                    <p className="text-sm text-muted-foreground">{approval.achievement}</p>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {approval.category}
                    </Badge>
                  </div>
                  <Badge variant="default" className="bg-green-500">
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

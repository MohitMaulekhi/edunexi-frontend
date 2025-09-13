import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, Award, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Smart Student Hub</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            A centralized platform for tracking student achievements, managing academic records, and generating verified
            digital portfolios.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Award className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Achievement Tracking</CardTitle>
              <CardDescription>
                Document and validate participation in conferences, certifications, and activities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Real-time updates on academic performance, attendance, and credit-based activities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Faculty Approval</CardTitle>
              <CardDescription>Faculty and admin approval system to maintain credibility of records</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Login Options */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">Choose Your Portal</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Student Portal</CardTitle>
                <CardDescription>
                  Access your dashboard, track achievements, and manage your academic profile
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/login?role=student">
                  <Button className="w-full" size="lg">
                    Student Login
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-4">Demo: john.doe@student.edu / student123</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">University Portal</CardTitle>
                <CardDescription>
                  Manage student records, approve achievements, and generate institutional reports
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/login?role=university">
                  <Button className="w-full bg-transparent" variant="outline" size="lg">
                    University Login
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-4">Demo: admin@university.edu / admin123</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

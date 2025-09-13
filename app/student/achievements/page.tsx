import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogoutButton } from "@/components/logout-button"
import { Award, Plus, Search, Download, Eye } from "lucide-react"
import { studentAchievements } from "@/lib/student-data"
import Link from "next/link"

export default async function AchievementsPage() {
  const session = await getSession()

  if (!session || session.user.role !== "student") {
    redirect("/login?role=student")
  }

  const approvedAchievements = studentAchievements.filter((a) => a.status === "approved")
  const pendingAchievements = studentAchievements.filter((a) => a.status === "pending")
  const totalPoints = approvedAchievements.reduce((sum, a) => sum + a.points, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/student" className="text-muted-foreground hover:text-foreground">
                ← Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  My Achievements
                </h1>
                <p className="text-muted-foreground">Track and manage your accomplishments</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">{session.user.studentId}</Badge>
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
              <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentAchievements.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedAchievements.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingAchievements.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalPoints}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search achievements..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="extracurricular">Extracurricular</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="competition">Competition</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Link href="/student/achievements/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Achievement
              </Button>
            </Link>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Achievements List */}
        <div className="space-y-4">
          {studentAchievements.map((achievement) => (
            <Card key={achievement.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{achievement.title}</h3>
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
                      <Badge variant="outline" className="capitalize">
                        {achievement.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{achievement.description}</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span>Date: {new Date(achievement.date).toLocaleDateString()}</span>
                      <span>Points: {achievement.points}</span>
                      {achievement.attachments && <span>Attachments: {achievement.attachments.length}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {achievement.status === "pending" && (
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {studentAchievements.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No achievements yet</h3>
              <p className="text-muted-foreground mb-4">Start documenting your accomplishments to build your profile</p>
              <Link href="/student/achievements/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Achievement
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

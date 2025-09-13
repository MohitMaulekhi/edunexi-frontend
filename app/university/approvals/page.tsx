import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { LogoutButton } from "@/components/logout-button"
import { Clock, Search, CheckCircle, AlertCircle, Eye, Download, MessageSquare } from "lucide-react"
import { pendingApprovals } from "@/lib/admin-data"
import Link from "next/link"

export default async function ApprovalsPage() {
  const session = await getSession()

  if (!session || session.user.role !== "university") {
    redirect("/login?role=university")
  }

  const totalPending = pendingApprovals.length
  const totalPoints = pendingApprovals.reduce((sum, a) => sum + a.points, 0)

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
                  <Clock className="h-6 w-6 mr-2" />
                  Achievement Approvals
                </h1>
                <p className="text-muted-foreground">Review and approve student achievements</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="destructive">{totalPending} Pending</Badge>
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
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{totalPending}</div>
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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Processing Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">2.3</div>
              <p className="text-xs text-muted-foreground">days</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search by student name or achievement..." className="pl-10" />
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
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="points">Points</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Approvals List */}
        <div className="space-y-6">
          {pendingApprovals.map((approval) => (
            <Card key={approval.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{approval.achievementTitle}</h3>
                      <Badge variant="outline" className="capitalize">
                        {approval.category}
                      </Badge>
                      <Badge variant="secondary">{approval.points} points</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>
                        <strong>Student:</strong> {approval.studentName} ({approval.studentId})
                      </span>
                      <span>
                        <strong>Submitted:</strong> {new Date(approval.submittedDate).toLocaleDateString()}
                      </span>
                      {approval.attachments && (
                        <span>
                          <strong>Attachments:</strong> {approval.attachments.length} files
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">{approval.description}</p>

                    {/* Attachments */}
                    {approval.attachments && approval.attachments.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Attachments:</h4>
                        <div className="flex gap-2">
                          {approval.attachments.map((attachment, index) => (
                            <Button key={index} variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              {attachment}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Review Comments */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Review Comments (Optional):</h4>
                      <Textarea placeholder="Add comments for the student..." className="min-h-[80px]" />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Contact Student
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 bg-transparent">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bulk Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Bulk Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button variant="outline">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Selected
              </Button>
              <Button variant="outline">
                <AlertCircle className="h-4 w-4 mr-2" />
                Reject Selected
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Selected
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {pendingApprovals.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
              <p className="text-muted-foreground">No pending approvals at the moment.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

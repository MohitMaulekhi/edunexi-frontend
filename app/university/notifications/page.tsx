import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogoutButton } from "@/components/logout-button"
import { Bell, Search, Plus, Send, Eye, Edit, Trash2, Users, Calendar } from "lucide-react"
import Link from "next/link"

// Mock notification data
const notifications = [
  {
    id: "1",
    title: "New Achievement Approval Process",
    message: "We have updated our achievement approval process. Please review the new guidelines.",
    type: "info" as const,
    recipients: "All Students",
    sentDate: "2024-03-15",
    status: "sent" as const,
    readCount: 856,
    totalRecipients: 1180,
  },
  {
    id: "2",
    title: "Career Fair Registration Open",
    message: "Registration is now open for the Annual Career Fair 2024. Don't miss this opportunity!",
    type: "success" as const,
    recipients: "Final Year Students",
    sentDate: "2024-03-14",
    status: "sent" as const,
    readCount: 234,
    totalRecipients: 280,
  },
  {
    id: "3",
    title: "System Maintenance Notice",
    message: "The student portal will be under maintenance on March 20th from 2 AM to 6 AM.",
    type: "warning" as const,
    recipients: "All Users",
    sentDate: "2024-03-12",
    status: "sent" as const,
    readCount: 1050,
    totalRecipients: 1180,
  },
  {
    id: "4",
    title: "Scholarship Application Deadline",
    message: "Reminder: Scholarship applications are due by March 25th. Submit your applications early.",
    type: "error" as const,
    recipients: "Eligible Students",
    sentDate: "",
    status: "draft" as const,
    readCount: 0,
    totalRecipients: 450,
  },
]

export default async function NotificationsPage() {
  const session = await getSession()

  if (!session || session.user.role !== "university") {
    redirect("/login?role=university")
  }

  const sentNotifications = notifications.filter((n) => n.status === "sent")
  const draftNotifications = notifications.filter((n) => n.status === "draft")
  const totalSent = sentNotifications.length
  const totalReads = sentNotifications.reduce((sum, n) => sum + n.readCount, 0)

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
                  <Bell className="h-6 w-6 mr-2" />
                  Notification Center
                </h1>
                <p className="text-muted-foreground">Send and manage notifications to students</p>
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
              <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSent}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Draft</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{draftNotifications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Reads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalReads}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.round((totalReads / sentNotifications.reduce((sum, n) => sum + n.totalRecipients, 0)) * 100)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search notifications..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Important</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Link href="/university/notifications/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Notification
              </Button>
            </Link>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{notification.title}</h3>
                      <Badge
                        variant={
                          notification.type === "info"
                            ? "default"
                            : notification.type === "success"
                              ? "default"
                              : notification.type === "warning"
                                ? "secondary"
                                : "destructive"
                        }
                        className={
                          notification.type === "success"
                            ? "bg-green-600"
                            : notification.type === "warning"
                              ? "bg-yellow-600"
                              : ""
                        }
                      >
                        {notification.type}
                      </Badge>
                      <Badge
                        variant={notification.status === "sent" ? "default" : "secondary"}
                        className={notification.status === "sent" ? "bg-green-600" : ""}
                      >
                        {notification.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{notification.message}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {notification.recipients}
                      </span>
                      {notification.sentDate && (
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(notification.sentDate).toLocaleDateString()}
                        </span>
                      )}
                      {notification.status === "sent" && (
                        <span>
                          Read: {notification.readCount}/{notification.totalRecipients} (
                          {Math.round((notification.readCount / notification.totalRecipients) * 100)}%)
                        </span>
                      )}
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
                    {notification.status === "sent" && (
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-1" />
                        View Recipients
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {notification.status === "draft" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          Send Now
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 bg-transparent">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Broadcast to All</CardTitle>
              <CardDescription>Send notification to all students</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Create Broadcast</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Department Specific</CardTitle>
              <CardDescription>Target specific departments</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                Select Department
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Schedule Later</CardTitle>
              <CardDescription>Schedule notifications for later</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

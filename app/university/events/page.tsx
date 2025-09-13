import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { LogoutButton } from "@/components/logout-button"
import { Calendar, Search, Plus, Edit, Eye, Trash2, Users, MapPin, Clock } from "lucide-react"
import { adminEvents } from "@/lib/admin-data"
import Link from "next/link"

export default async function AdminEventsPage() {
  const session = await getSession()

  if (!session || session.user.role !== "university") {
    redirect("/login?role=university")
  }

  const publishedEvents = adminEvents.filter((e) => e.status === "published")
  const draftEvents = adminEvents.filter((e) => e.status === "draft")
  const totalRegistrations = adminEvents.reduce((sum, e) => sum + e.registered, 0)

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
                  <Calendar className="h-6 w-6 mr-2" />
                  Event Management
                </h1>
                <p className="text-muted-foreground">Create and manage campus events</p>
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
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminEvents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{publishedEvents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Draft</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{draftEvents.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalRegistrations}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search events..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="competition">Competition</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Link href="/university/events/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {adminEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <Badge
                        variant={
                          event.status === "published"
                            ? "default"
                            : event.status === "draft"
                              ? "secondary"
                              : event.status === "completed"
                                ? "outline"
                                : "destructive"
                        }
                        className={
                          event.status === "published"
                            ? "bg-green-600"
                            : event.status === "completed"
                              ? "bg-blue-600"
                              : ""
                        }
                      >
                        {event.status}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{event.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {event.organizer}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Registration Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Registration Progress</span>
                    <span>
                      {event.registered}/{event.capacity} ({Math.round((event.registered / event.capacity) * 100)}%)
                    </span>
                  </div>
                  <Progress value={(event.registered / event.capacity) * 100} />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-1" />
                      Registrations ({event.registered})
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    {event.status === "draft" && <Button size="sm">Publish</Button>}
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

        {/* Event Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Event Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["workshop", "seminar", "competition", "academic", "cultural"].map((type) => {
                  const count = adminEvents.filter((e) => e.type === type).length
                  const percentage = (count / adminEvents.length) * 100
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <span className="capitalize font-medium">{type}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={percentage} className="w-20 h-2" />
                        <span className="text-sm text-muted-foreground w-8">{count}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registration Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Average Registration Rate</span>
                  <span className="font-bold">
                    {Math.round(
                      (adminEvents.reduce((sum, e) => sum + (e.registered / e.capacity) * 100, 0) /
                        adminEvents.length) *
                        100,
                    ) / 100}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Most Popular Event Type</span>
                  <span className="font-bold">Workshop</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Capacity</span>
                  <span className="font-bold">{adminEvents.reduce((sum, e) => sum + e.capacity, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Utilization Rate</span>
                  <span className="font-bold">
                    {Math.round((totalRegistrations / adminEvents.reduce((sum, e) => sum + e.capacity, 0)) * 100)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

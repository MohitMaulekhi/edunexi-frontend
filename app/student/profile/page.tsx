import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LogoutButton } from "@/components/logout-button"
import { User, Mail, Phone, MapPin, Calendar, Award, BookOpen, Users, Download, Edit } from "lucide-react"
import { studentStats, studentAchievements, cgpaRecords, societies } from "@/lib/student-data"
import Link from "next/link"

export default async function ProfilePage() {
  const session = await getSession()

  if (!session || session.user.role !== "student") {
    redirect("/login?role=student")
  }

  const approvedAchievements = studentAchievements.filter((a) => a.status === "approved")
  const activeSocieties = societies.filter((s) => s.isActive)

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
                  <User className="h-6 w-6 mr-2" />
                  My Profile
                </h1>
                <p className="text-muted-foreground">View and manage your student profile</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-xl">{session.user.name}</CardTitle>
                <CardDescription>{session.user.studentId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{session.user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{session.user.department}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">New York, NY</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined: August 2021</span>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Strength</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Profile Completion</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{approvedAchievements.length}</div>
                    <div className="text-xs text-muted-foreground">Achievements</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{studentStats.totalPoints}</div>
                    <div className="text-xs text-muted-foreground">Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/student/portfolio">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Portfolio
                  </Button>
                </Link>
                <Button className="w-full bg-transparent" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Transcript
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  View Certificates
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Academic Performance
                </CardTitle>
                <CardDescription>Your semester-wise academic record</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">{studentStats.currentCGPA}</div>
                    <div className="text-sm text-muted-foreground">Current CGPA</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary">{studentStats.overallCGPA}</div>
                    <div className="text-sm text-muted-foreground">Overall CGPA</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {cgpaRecords.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{record.semester}</h4>
                        <p className="text-sm text-muted-foreground">{record.credits} credits</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">{record.cgpa}</div>
                        <p className="text-xs text-muted-foreground">CGPA</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
              <CardContent>
                <div className="space-y-4">
                  {approvedAchievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <Award className="h-5 w-5 text-primary mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{new Date(achievement.date).toLocaleDateString()}</span>
                          <Badge variant="outline">{achievement.points} points</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Societies & Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Societies & Activities
                </CardTitle>
                <CardDescription>Your involvement in student organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeSocieties.map((society) => (
                    <div key={society.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{society.name}</h4>
                        <p className="text-sm text-muted-foreground">{society.description}</p>
                        {society.joinedDate && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Joined: {new Date(society.joinedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        {society.role && <Badge variant="secondary">{society.role}</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills & Interests */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Interests</CardTitle>
                <CardDescription>Your technical and soft skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {["JavaScript", "Python", "React", "Node.js", "Machine Learning", "AWS"].map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {["AI/ML", "Web Development", "Robotics", "Data Science", "Open Source"].map((interest) => (
                        <Badge key={interest} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LogoutButton } from "@/components/logout-button"
import { FileText, Download, Eye, Share, Award, BookOpen, Users, Calendar, Star, ExternalLink } from "lucide-react"
import { studentStats, studentAchievements, cgpaRecords, societies } from "@/lib/student-data"
import Link from "next/link"

export default async function PortfolioPage() {
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
                  <FileText className="h-6 w-6 mr-2" />
                  Digital Portfolio
                </h1>
                <p className="text-muted-foreground">Generate and manage your verified academic portfolio</p>
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
          {/* Left Column - Portfolio Actions */}
          <div className="space-y-6">
            {/* Portfolio Status */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Status</CardTitle>
                <CardDescription>Your portfolio completion and verification status</CardDescription>
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
                    <div className="text-xs text-muted-foreground">Verified Items</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{studentStats.totalPoints}</div>
                    <div className="text-xs text-muted-foreground">Total Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generation Options */}
            <Card>
              <CardHeader>
                <CardTitle>Generate Portfolio</CardTitle>
                <CardDescription>Create your professional portfolio in different formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Portfolio
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Web Portfolio
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Share className="h-4 w-4 mr-2" />
                  Generate Shareable Link
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Export to LinkedIn
                </Button>
              </CardContent>
            </Card>

            {/* Portfolio Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Include CGPA</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show Contact Info</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Include Societies</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Public Visibility</span>
                  <Badge variant="secondary">Private</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Customize Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Portfolio Preview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Preview Header */}
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl">{session.user.name}</CardTitle>
                <CardDescription className="text-lg">
                  {session.user.department} • {session.user.studentId}
                </CardDescription>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{studentStats.currentCGPA}</div>
                    <div className="text-xs text-muted-foreground">Current CGPA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{approvedAchievements.length}</div>
                    <div className="text-xs text-muted-foreground">Achievements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">{studentStats.totalPoints}</div>
                    <div className="text-xs text-muted-foreground">Points</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Academic Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Academic Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{studentStats.currentCGPA}</div>
                    <div className="text-sm text-muted-foreground">Current Semester</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{studentStats.overallCGPA}</div>
                    <div className="text-sm text-muted-foreground">Overall CGPA</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {cgpaRecords.slice(0, 3).map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{record.semester}</h4>
                        <p className="text-sm text-muted-foreground">{record.credits} credits</p>
                      </div>
                      <div className="text-lg font-bold text-primary">{record.cgpa}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Key Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedAchievements.slice(0, 5).map((achievement) => (
                    <div key={achievement.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <Badge variant="outline" className="capitalize">
                            {achievement.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{new Date(achievement.date).toLocaleDateString()}</span>
                          <span>{achievement.points} points</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Extracurricular Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Extracurricular Activities
                </CardTitle>
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
                            <Calendar className="h-3 w-3 inline mr-1" />
                            Since {new Date(society.joinedDate).toLocaleDateString()}
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

            {/* Skills & Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {["JavaScript", "Python", "React", "Node.js", "Machine Learning", "AWS", "Docker", "Git"].map(
                        (skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Certifications</h4>
                    <div className="space-y-2">
                      {approvedAchievements
                        .filter((a) => a.category === "certification")
                        .map((cert) => (
                          <div key={cert.id} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm font-medium">{cert.title}</span>
                            <span className="text-xs text-muted-foreground">{new Date(cert.date).getFullYear()}</span>
                          </div>
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

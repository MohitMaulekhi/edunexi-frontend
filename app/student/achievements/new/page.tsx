"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogoutButton } from "@/components/logout-button"
import { Award, Upload, Calendar, Save, X } from "lucide-react"
import Link from "next/link"

export default function NewAchievementPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    points: "",
    attachments: [] as File[],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // In a real app, you'd upload files and submit to API
      // For now, we'll simulate the process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess("Achievement submitted successfully! It will be reviewed by the administration.")
      setTimeout(() => {
        router.push("/student/achievements")
      }, 2000)
    } catch {
      setError("Failed to submit achievement. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }))
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/student/achievements" className="text-muted-foreground hover:text-foreground">
                ← Back to Achievements
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  Add New Achievement
                </h1>
                <p className="text-muted-foreground">Document your accomplishments for review</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Achievement Details</CardTitle>
            <CardDescription>
              Provide detailed information about your achievement. All submissions will be reviewed by faculty before
              approval.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Achievement Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Best Paper Award - IEEE Conference 2024"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select achievement category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic Excellence</SelectItem>
                    <SelectItem value="competition">Competition/Contest</SelectItem>
                    <SelectItem value="certification">Certification</SelectItem>
                    <SelectItem value="internship">Internship/Work Experience</SelectItem>
                    <SelectItem value="extracurricular">Extracurricular Activity</SelectItem>
                    <SelectItem value="research">Research Publication</SelectItem>
                    <SelectItem value="leadership">Leadership Role</SelectItem>
                    <SelectItem value="community">Community Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide a detailed description of your achievement, including context, your role, and impact..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              {/* Date and Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Achievement Date *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points">Suggested Points</Label>
                  <Input
                    id="points"
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData((prev) => ({ ...prev, points: e.target.value }))}
                    placeholder="e.g., 100"
                    min="0"
                    max="500"
                  />
                  <p className="text-xs text-muted-foreground">
                    Points will be assigned by faculty based on achievement significance
                  </p>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="attachments">Supporting Documents</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload certificates, photos, or other supporting documents
                    </p>
                    <Input
                      id="attachments"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("attachments")?.click()}
                    >
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* File List */}
                {formData.attachments.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files:</Label>
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Guidelines */}
              <Alert>
                <AlertDescription>
                  <strong>Submission Guidelines:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Provide accurate and verifiable information</li>
                    <li>Include supporting documents when possible</li>
                    <li>Achievements will be reviewed within 3-5 business days</li>
                    <li>You may be contacted for additional information</li>
                  </ul>
                </AlertDescription>
              </Alert>

              {/* Error/Success Messages */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Submitting..." : "Submit for Review"}
                </Button>
                <Link href="/student/achievements">
                  <Button type="button" variant="outline" disabled={loading}>
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">What qualifies as an achievement?</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Academic awards and recognitions</li>
                  <li>Competition wins or notable placements</li>
                  <li>Professional certifications</li>
                  <li>Internships and work experiences</li>
                  <li>Leadership roles in organizations</li>
                  <li>Research publications or presentations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Tips for better approval chances:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Provide clear, detailed descriptions</li>
                  <li>Include official documentation</li>
                  <li>Mention your specific role and contribution</li>
                  <li>Add context about the achievement's significance</li>
                  <li>Ensure all information is accurate</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

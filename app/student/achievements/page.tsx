"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogoutButton } from "@/components/logout-button"
import { AchievementsList } from "@/components/AchievementsList"
import { Award, Plus } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { fetchMyAchievements } from "@/lib/achievement"

interface Achievement {
  id: number
  documentId: string
  ipfsHash: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  ipfsUrl: string
  studentId: string
  score: number
  authenticScore: number
  category: string
}

const AchievementsPage = () => {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadAchievements = async () => {
      if (!user?.student?.studentId) return

      try {
        setLoading(true)
        setError("")
        const data = await fetchMyAchievements(user.student.studentId)
        setAchievements(Array.isArray(data) ? data : [])
      } catch (err: any) {
        setError(`Failed to load achievements: ${err.message || 'Please try again.'}`)
      } finally {
        setLoading(false)
      }
    }

    if (user?.student?.studentId) {
      loadAchievements()
    } else if (user === null) {
      setLoading(false)
      setError("Please log in to view achievements.")
    } else if (user && !user.student?.studentId) {
      setLoading(false)
      setError("No student profile found. Please contact support.")
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your achievements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <Award className="h-6 w-6 mr-2 text-yellow-600" />
                  My Achievements
                </h1>
                <p className="text-muted-foreground">Track your accomplishments stored on blockchain</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/student/achievements/new">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Achievement
                </Button>
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && achievements.length === 0 ? (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No achievements yet</h2>
            <p className="text-muted-foreground mb-6">
              Start documenting your accomplishments and build your achievement portfolio.
            </p>
            <Link href="/student/achievements/new">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Achievement
              </Button>
            </Link>
          </div>
        ) : (
          <AchievementsList achievements={achievements} loading={loading} />
        )}
      </div>
    </div>
  )
}

export default AchievementsPage

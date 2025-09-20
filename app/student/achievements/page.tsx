"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogoutButton } from "@/components/logout-button"
import { AchievementsList } from "@/components/AchievementsList"
import { Award, Plus, ArrowLeft, User } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { fetchMyAchievements } from "@/lib/achievement"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your achievements...</p>
        </div>
      </div>
    )
  }

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-[#000000] font-poppins">
      {/* Modern Header with responsive design */}
      <div className="sticky top-0 z-40 bg-black/70 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Back button and title */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link href="/student">
                <Button variant="ghost" size="sm" className="min-h-[44px] min-w-[44px] p-2 hover:bg-gray-800/50">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600/20 via-indigo-500/20 to-purple-500/20 rounded-xl border border-blue-400/30">
                  <Award className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent">
                    My Achievements
                  </h1>
                  <p className="text-sm text-gray-400 hidden sm:block">
                    Manage and showcase your accomplishments
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop user info and logout */}

            {/* Mobile add button */}
            <div className="lg:hidden">
              <Link href="/student/achievements/new">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600 min-h-[44px] min-w-[44px] p-2">
                  <Plus className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Quick Actions Bar - Desktop */}
        <div className="hidden lg:flex items-center justify-between mb-8 p-4 bg-black/50 backdrop-blur-md border border-gray-700/50 rounded-2xl">
          <div className="flex items-center space-x-6">
            <div className="text-sm text-gray-400">
              Total Achievements: <span className="text-white font-semibold">{achievements.length}</span>
            </div>
            <div className="h-4 w-px bg-gray-600" />
            <div className="text-sm text-gray-400">
              Status: <span className="text-green-400 font-semibold">Active</span>
            </div>
          </div>
          <Link href="/student/achievements/new">
            <Button className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Achievement
            </Button>
          </Link>
        </div>

        {!loading && achievements.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 sm:p-12 shadow-xl max-w-2xl mx-auto">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 rounded-full blur-xl" />
                <Award className="relative h-16 w-16 sm:h-20 sm:w-20 text-yellow-500 mx-auto" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">No achievements yet</h2>
              <p className="text-gray-300 text-base sm:text-lg mb-8 px-4">
                Start documenting your accomplishments and build your achievement portfolio.
              </p>
              <Link href="/student/achievements/new">
                <Button className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600 flex items-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 min-h-[48px]">
                  <Plus className="h-5 w-5" />
                  Add Your First Achievement
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Mobile Stats */}
            <div className="lg:hidden grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  {achievements.length}
                </div>
                <div className="text-sm text-gray-400">Total</div>
              </div>
              <div className="bg-black/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Active
                </div>
                <div className="text-sm text-gray-400">Status</div>
              </div>
            </div>
            
            <AchievementsList achievements={achievements} loading={loading} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AchievementsPage

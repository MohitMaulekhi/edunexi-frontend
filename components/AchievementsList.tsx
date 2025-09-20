"use client"

import React from 'react'
import { AchievementCard } from './AchievementCard'
import { AchievementLoadingCard } from './AchievementLoadingCard'

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

interface AchievementsListProps {
  achievements: Achievement[]
  loading: boolean
}

export const AchievementsList = ({ achievements, loading }: AchievementsListProps) => {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-6 w-48 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="grid gap-6">
          {/* Show 2 loading cards for better UX */}
          <AchievementLoadingCard />
          <AchievementLoadingCard />
        </div>
      </div>
    )
  }

  if (achievements.length === 0) {
    return null // This will be handled by the parent component
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-bold text-white">
          Total Achievements: {achievements.length}
        </h2>
        <div className="text-sm text-gray-400">
          Blockchain-verified accomplishments
        </div>
      </div>
      <div className="grid gap-4 sm:gap-6">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  )
}

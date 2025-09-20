"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Award, 
  Calendar, 
  Star, 
  FileText, 
  Download, 
  ExternalLink
} from "lucide-react"

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

interface AchievementMetadata {
  title: string
  description: string
  category: string
  date: string
  score: number
  authentic_score: number
  studentId: string
  studentName: string
  studentEmail: string
  submissionTimestamp: string
  attachments: Array<{
    fileName: string
    fileSize: number
    fileType: string
    ipfsHash: string
    ipfsUrl: string
  }>
  blockchain: {
    network: "IPFS"
    timestamp: string
    submissionHash: string
  }
}

interface AchievementCardProps {
  achievement: Achievement
}

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const [ipfsData, setIpfsData] = useState<AchievementMetadata | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show basic card immediately, then load IPFS data
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(achievement.ipfsUrl)
        if (!response.ok) throw new Error('Failed to load')
        const data = await response.json()
        setIpfsData(data)
      } catch (error) {
        setIpfsData({
          title: 'Achievement Details',
          description: 'Unable to load full details',
          category: achievement.category,
          date: achievement.createdAt,
          score: achievement.score,
          authentic_score: achievement.authenticScore,
          studentId: achievement.studentId,
          studentName: 'Student',
          studentEmail: '',
          submissionTimestamp: achievement.createdAt,
          attachments: [],
          blockchain: {
            network: "IPFS",
            timestamp: achievement.createdAt,
            submissionHash: achievement.ipfsHash
          }
        })
      } finally {
        setLoading(false)
      }
    }, 100) // Small delay to show basic card first

    return () => clearTimeout(timer)
  }, [achievement])

  const getCategoryColor = (category: string) => {
    const colors = {
      'academic': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'competition': 'bg-green-500/20 text-green-400 border-green-500/30',
      'certification': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'internship': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'research': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'leadership': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'community': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'extracurricular': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'other': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
    return colors[category.toLowerCase() as keyof typeof colors] || colors.other
  }

  return (
    <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 animate-fade-in-up">
      <div className="pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3 mb-3">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 flex-shrink-0" />
              <span className="break-words">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base">Loading achievement...</span>
                    <div className="h-4 w-4 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin flex-shrink-0"></div>
                  </div>
                ) : (
                  ipfsData?.title || 'Achievement Details'
                )}
              </span>
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded animate-pulse w-full"></div>
                  <div className="h-3 bg-gray-700 rounded animate-pulse w-2/3"></div>
                </div>
              ) : (
                ipfsData?.description || 'Achievement description not available'
              )}
            </p>
          </div>
          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:ml-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(achievement.category)} whitespace-nowrap`}>
              {achievement.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-yellow-400">
              <Star className="h-4 w-4" />
              <span className="font-bold">{achievement.score} pts</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{ipfsData?.date || new Date(achievement.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          </div>
        ) : (
          ipfsData && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-300">Student:</span>
                  <p className="text-gray-400 break-words">{ipfsData.studentName}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-300">Submitted:</span>
                  <p className="text-gray-400">
                    {new Date(ipfsData.submissionTimestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              {ipfsData.attachments && ipfsData.attachments.length > 0 && (
                <div>
                  <div className="font-semibold text-sm mb-3 text-white">
                    Supporting Documents ({ipfsData.attachments.length})
                  </div>
                  <div className="space-y-2 bg-gray-800/50 p-4 rounded-2xl border border-gray-600">
                    {ipfsData.attachments.map((file, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-700/50 rounded-xl border border-gray-600">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <FileText className="h-4 w-4 text-blue-400 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-white truncate">{file.fileName}</p>
                            <p className="text-xs text-gray-400">
                              {file.fileType} • {(file.fileSize / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(file.ipfsUrl, '_blank')}
                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 min-h-[36px]"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const link = document.createElement('a')
                              link.href = file.ipfsUrl
                              link.download = file.fileName
                              link.click()
                            }}
                            className="flex items-center gap-1 text-green-400 hover:text-green-300 min-h-[36px]"
                          >
                            <Download className="h-3 w-3" />
                            <span className="hidden sm:inline">Download</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs pt-4 border-t border-gray-700">
                <span className="font-semibold text-gray-300">IPFS Record:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(achievement.ipfsUrl, '_blank')}
                  className="flex items-center gap-1 text-xs p-2 h-8 text-purple-400 hover:text-purple-300 self-start sm:self-auto"
                >
                  <ExternalLink className="h-3 w-3" />
                  View on IPFS
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

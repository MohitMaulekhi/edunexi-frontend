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
      'academic': 'bg-blue-100 text-blue-800',
      'competition': 'bg-green-100 text-green-800',
      'certification': 'bg-purple-100 text-purple-800',
      'internship': 'bg-orange-100 text-orange-800',
      'research': 'bg-pink-100 text-pink-800',
      'leadership': 'bg-indigo-100 text-indigo-800',
      'community': 'bg-yellow-100 text-yellow-800',
      'extracurricular': 'bg-cyan-100 text-cyan-800',
      'other': 'bg-gray-100 text-gray-800'
    }
    return colors[category.toLowerCase() as keyof typeof colors] || colors.other
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              {loading ? (
                <div className="flex items-center gap-2">
                  <span>Loading achievement...</span>
                  <div className="h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              ) : (
                ipfsData?.title || 'Achievement Details'
              )}
            </CardTitle>
            <CardDescription className="mt-2">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              ) : (
                ipfsData?.description || 'Achievement description not available'
              )}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getCategoryColor(achievement.category)}>
              {achievement.category}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>{achievement.score} pts</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{ipfsData?.date || new Date(achievement.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          </div>
        ) : (
          ipfsData && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Student:</span>
                  <p className="text-muted-foreground">{ipfsData.studentName}</p>
                </div>
                <div>
                  <span className="font-semibold">Submitted:</span>
                  <p className="text-muted-foreground">
                    {new Date(ipfsData.submissionTimestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              {ipfsData.attachments && ipfsData.attachments.length > 0 && (
                <div>
                  <div className="font-semibold text-sm mb-2">
                    Supporting Documents ({ipfsData.attachments.length})
                  </div>
                  <div className="space-y-2 bg-gray-50 p-3 rounded-md">
                    {ipfsData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">{file.fileName}</p>
                            <p className="text-xs text-muted-foreground">
                              {file.fileType} • {(file.fileSize / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(file.ipfsUrl, '_blank')}
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View
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
                            className="flex items-center gap-1"
                          >
                            <Download className="h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold">IPFS Record:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(achievement.ipfsUrl, '_blank')}
                  className="flex items-center gap-1 text-xs p-1 h-6"
                >
                  <ExternalLink className="h-3 w-3" />
                  View on IPFS
                </Button>
              </div>
            </div>
          )
        )}
      </CardContent>
    </Card>
  )
}

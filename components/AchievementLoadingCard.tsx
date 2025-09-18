"use client"

import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const AchievementLoadingCard = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-48"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import React from 'react'

export const AchievementLoadingCard = () => {
  return (
    <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl animate-pulse">
      <div className="pb-6">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 bg-gray-700 rounded"></div>
              <div className="h-6 bg-gray-700 rounded w-48"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-700 rounded w-full"></div>
              <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3 ml-6">
            <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
            <div className="h-4 w-16 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-700 rounded"></div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-1/3"></div>
            <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-600">
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

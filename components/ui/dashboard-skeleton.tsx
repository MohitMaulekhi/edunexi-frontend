import React from 'react'
import { Skeleton } from './skeleton'

export const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 mb-6 sm:mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-xl min-h-[140px] sm:min-h-[150px] md:min-h-[160px] bg-black/70 backdrop-blur-md border border-gray-700 animate-pulse">
          <div className="flex flex-row items-center justify-between space-y-0 pb-3">
            <Skeleton className="h-4 w-24 bg-gray-700" />
            <Skeleton className="h-6 w-6 bg-gray-700 rounded" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-8 w-16 bg-gray-700" />
            <Skeleton className="h-3 w-32 bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const DashboardCardSkeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl bg-black/70 backdrop-blur-md border border-gray-700 animate-pulse ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-0 gap-4 sm:gap-0 pb-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40 bg-gray-700" />
          <Skeleton className="h-4 w-32 bg-gray-700" />
        </div>
        <Skeleton className="h-9 w-20 bg-gray-700 rounded-lg" />
      </div>
      <div className="space-y-4 px-0">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border border-gray-700 rounded-xl bg-black/30 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48 bg-gray-700" />
                <Skeleton className="h-3 w-32 bg-gray-700" />
              </div>
              <Skeleton className="h-6 w-16 bg-gray-700 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full bg-gray-700 mb-2" />
            <div className="flex justify-between">
              <Skeleton className="h-3 w-20 bg-gray-700" />
              <Skeleton className="h-3 w-16 bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const DashboardQuickActionsSkeleton = () => {
  return (
    <div className="rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl bg-black/70 backdrop-blur-md border border-gray-700 animate-pulse">
      <div className="px-0 pb-4">
        <Skeleton className="h-6 w-32 bg-gray-700" />
      </div>
      <div className="space-y-4 px-0">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="w-full h-12 bg-gray-700 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

export const DashboardNotificationsSkeleton = () => {
  return (
    <div className="rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl bg-black/70 backdrop-blur-md border border-gray-700 animate-pulse">
      <div className="flex flex-row items-center justify-between px-0 pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 bg-gray-700 rounded" />
          <Skeleton className="h-6 w-28 bg-gray-700" />
          <Skeleton className="h-5 w-5 bg-gray-700 rounded-full" />
        </div>
      </div>
      <div className="space-y-4 px-0">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border border-gray-700 rounded-xl bg-black/30 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-2">
              <Skeleton className="h-4 w-32 bg-gray-700" />
              <Skeleton className="w-2 h-2 bg-gray-700 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full bg-gray-700 mb-2" />
            <Skeleton className="h-3 w-20 bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  )
}

export const UniversityApprovalsSkeleton = () => {
  return (
    <div className="rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl bg-black/70 backdrop-blur-md border border-gray-700 animate-pulse">
      <div className="px-0 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-5 w-5 bg-gray-700 rounded" />
          <Skeleton className="h-6 w-36 bg-gray-700" />
        </div>
        <Skeleton className="h-4 w-48 bg-gray-700" />
      </div>
      <div className="space-y-4 md:space-y-5 px-0">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 border rounded-xl bg-black/30 backdrop-blur-sm gap-4 sm:gap-4 border-gray-700">
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-4 w-32 bg-gray-700" />
              <Skeleton className="h-3 w-48 bg-gray-700" />
              <Skeleton className="h-5 w-20 bg-gray-700 rounded-full" />
            </div>
            <Skeleton className="h-9 w-20 bg-gray-700 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}
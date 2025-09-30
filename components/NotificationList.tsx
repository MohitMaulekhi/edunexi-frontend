"use client"

import React, { useState } from 'react';
import { Notification } from '@/types/notification';
import { NotificationCard } from './NotificationCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Search, Filter, RefreshCw } from 'lucide-react';
import { NotificationService } from '@/lib/notification-service';
import { useAuth } from '@/contexts/AuthContext';

interface NotificationListProps {
  universityId: string;
  className?: string;
}

export function NotificationList({ universityId, className = "" }: NotificationListProps) {
  // Static notification data
  const staticNotifications: Notification[] = [
    {
      id: "1",
      title: "Welcome to Edunexi!",
      description: "Your account has been created successfully.",
      createdAt: "2025-09-30T09:00:00Z",
      category: "info",
      priority: "normal",
      universityId,
    },
    {
      id: "2",
      title: "Event Reminder",
      description: "Don't forget to attend the Science Symposium tomorrow.",
      createdAt: "2025-10-01T10:00:00Z",
      category: "event",
      priority: "high",
      universityId,
    },
    {
      id: "3",
      title: "Profile Update Needed",
      description: "Please update your profile to access new features.",
      createdAt: "2025-09-29T08:30:00Z",
      category: "alert",
      priority: "low",
      universityId,
    },
  ];

  const [notifications, setNotifications] = useState<Notification[]>(staticNotifications);
  const [loading, setLoading] = useState(false); // No loading for static data
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRefresh = () => {
    setNotifications(staticNotifications);
    setError(null);
  };

  const filteredNotifications = notifications.filter(notification =>
    searchTerm === '' || 
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-black/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start space-x-4">
              <Skeleton className="h-5 w-5 rounded" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <div className="flex space-x-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-16 w-full" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Failed to Load Notifications</h3>
        <p className="text-gray-400 text-center mb-4 max-w-md">{error}</p>
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search */}
      <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button onClick={handleRefresh} size="sm" variant="outline">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-black/50 rounded-lg p-8 border border-gray-700">
            <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Notifications Found</h3>
            <p className="text-gray-400">
              {searchTerm
                ? "No notifications match your search."
                : "There are no notifications to display at the moment."}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}

        </div>
      )}

      {/* Results Summary */}
      <div className="text-center">
        <p className="text-sm text-gray-400">
          Showing {filteredNotifications.length} of {notifications.length} notifications
        </p>
      </div>
    </div>
  );
}

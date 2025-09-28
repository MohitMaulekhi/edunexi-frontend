"use client"

import React from 'react';
import { Notification } from '@/types/notification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Award, 
  Calendar, 
  AlertCircle, 
  Download, 
  FileText,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { NotificationService } from '@/lib/notification-service';

interface NotificationCardProps {
  notification: Notification;
  onDownload?: (hash: string, filename: string) => void;
  className?: string;
}

const getNotificationIcon = (category: string) => {
  switch (category) {
    case 'Announcement':
      return <Bell className="h-5 w-5 text-blue-500" />;
    case 'Achievement':
      return <Award className="h-5 w-5 text-green-500" />;
    case 'Event':
      return <Calendar className="h-5 w-5 text-purple-500" />;
    case 'Urgent':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case 'System':
      return <AlertCircle className="h-5 w-5 text-orange-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

const getNotificationColor = (category: string) => {
  switch (category) {
    case 'Announcement':
      return 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40';
    case 'Achievement':
      return 'bg-green-500/10 border-green-500/20 hover:border-green-500/40';
    case 'Event':
      return 'bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40';
    case 'Urgent':
      return 'bg-red-500/10 border-red-500/20 hover:border-red-500/40';
    case 'System':
      return 'bg-orange-500/10 border-orange-500/20 hover:border-orange-500/40';
    default:
      return 'bg-gray-500/10 border-gray-500/20 hover:border-gray-500/40';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'destructive';
    case 'high':
      return 'secondary';
    case 'normal':
      return 'outline';
    case 'low':
      return 'secondary';
    default:
      return 'outline';
  }
};

export function NotificationCard({ 
  notification, 
  onDownload,
  className = ""
}: NotificationCardProps) {
  const handleDownload = async () => {
    if (notification.attachedFile && onDownload) {
      try {
        await NotificationService.downloadAttachment(
          notification.attachedFile.ipfsHash, 
          notification.attachedFile.name
        );
      } catch (error) {
        console.error('Error downloading attachment:', error);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${getNotificationColor(notification.category)} ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {getNotificationIcon(notification.category)}
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-white">
                {notification.title}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={getPriorityColor(notification.priority)} className="text-xs">
                  {notification.priority}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {notification.category}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <Clock className="h-3 w-3 mr-1" />
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-300 mb-4 leading-relaxed">
          {notification.description}
        </p>
        
        {notification.attachedFile && (
          <div className="bg-black/30 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-white">
                    {notification.attachedFile.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatFileSize(notification.attachedFile.size)} • {notification.attachedFile.mimeType}
                  </p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleDownload}
                className="flex items-center space-x-2"
              >
                <Download className="h-3 w-3" />
                <span>Download</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

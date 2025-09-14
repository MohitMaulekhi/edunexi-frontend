// Notification-related types and interfaces

export interface Notification {
  id: string
  documentId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement' | 'event' | 'announcement'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  recipient: 'all' | 'students' | 'faculty' | 'admins' | 'specific'
  recipientIds?: string[]
  sender: string
  senderRole: 'system' | 'admin' | 'faculty' | 'student'
  isRead: boolean
  isArchived: boolean
  actionRequired?: boolean
  actionUrl?: string
  actionText?: string
  expiryDate?: string
  attachments?: NotificationAttachment[]
  createdAt: string
  updatedAt: string
  readAt?: string
}

export interface NotificationAttachment {
  id: string
  name: string
  url: string
  type: 'image' | 'document' | 'link'
  size?: number
}

export interface NotificationPreferences {
  id: string
  userId: string
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  categories: {
    achievements: boolean
    events: boolean
    announcements: boolean
    grades: boolean
    administrative: boolean
  }
  frequency: 'immediate' | 'daily' | 'weekly'
  quietHours: {
    enabled: boolean
    startTime: string
    endTime: string
  }
}

export interface NotificationStats {
  total: number
  unread: number
  byType: Record<Notification['type'], number>
  byPriority: Record<Notification['priority'], number>
}

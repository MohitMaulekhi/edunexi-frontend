import { createIPFS, readIPFS } from './ipfs';
import { 
  NotificationIPFSData, 
  Notification, 
  CreateNotificationRequest, 
  NotificationResponse
} from '@/types/notification';

export class NotificationService {
  private static API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';
  private static PINATA_GATEWAY_URL = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || 'https://gateway.pinata.cloud';

  static async createNotification(
    universityId: string,
    request: CreateNotificationRequest,
    authToken: string
  ): Promise<string> {
    try {
      let attachedFileData = undefined;

      // Upload attached file to IPFS if provided
      if (request.attachedFile) {
        const fileUploadResult = await createIPFS(request.attachedFile, request.attachedFile.name);
        
        if (!fileUploadResult.success || !fileUploadResult.hash) {
          throw new Error(fileUploadResult.error || 'Failed to upload file to IPFS');
        }

        attachedFileData = {
          name: request.attachedFile.name,
          ipfsHash: fileUploadResult.hash,
          size: request.attachedFile.size,
          mimeType: request.attachedFile.type,
        };
      }

      // Create notification data for IPFS
      const notificationData: NotificationIPFSData = {
        title: request.title,
        description: request.description,
        attachedFile: attachedFileData,
        createdAt: new Date().toISOString(),
        universityId,
      };

      // Upload notification data to IPFS
      const notificationUploadResult = await createIPFS(notificationData, `notification-${Date.now()}`);
      
      if (!notificationUploadResult.success || !notificationUploadResult.hash) {
        throw new Error(notificationUploadResult.error || 'Failed to upload notification data to IPFS');
      }

      // Add notification hash to university via Strapi
      const response = await fetch(`${this.API_BASE_URL}/universities/${universityId}/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          ipfsHash: notificationUploadResult.hash,
          title: request.title,
          category: 'General',
          priority: 'Normal',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add notification to university');
      }

      return notificationUploadResult.hash;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  static async getNotificationsForUniversity(
    universityId: string, 
    authToken?: string
  ): Promise<Notification[]> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch(`${this.API_BASE_URL}/universities/${universityId}/notifications`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch university notifications');
      }

      const result: NotificationResponse = await response.json();
      const notifications: Notification[] = [];

      // Fetch IPFS data for each notification
      for (const strapiNotification of result.data.notifications) {
        try {
          const ipfsResult = await readIPFS(strapiNotification.ipfsHash);
          
          if (!ipfsResult.success || !ipfsResult.data) {
            throw new Error(ipfsResult.error || 'Failed to retrieve notification data');
          }

          const notificationData = ipfsResult.data as NotificationIPFSData;

          const notification: Notification = {
            id: strapiNotification.ipfsHash,
            title: notificationData.title,
            description: notificationData.description,
            category: strapiNotification.category,
            priority: strapiNotification.priority,
            attachedFile: notificationData.attachedFile ? {
              ...notificationData.attachedFile,
              url: `${this.PINATA_GATEWAY_URL}/ipfs/${notificationData.attachedFile.ipfsHash}`,
            } : undefined,
            createdAt: notificationData.createdAt,
            universityId: notificationData.universityId,
          };

          notifications.push(notification);
        } catch (error) {
          console.error(`Error fetching IPFS data for notification ${strapiNotification.ipfsHash}:`, error);
          // Create a fallback notification with available data
          const fallbackNotification: Notification = {
            id: strapiNotification.ipfsHash,
            title: strapiNotification.title,
            description: 'Failed to load notification details',
            category: strapiNotification.category,
            priority: strapiNotification.priority,
            createdAt: strapiNotification.createdAt,
            universityId,
          };
          notifications.push(fallbackNotification);
        }
      }

      return notifications;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  static async removeNotification(
    universityId: string, 
    ipfsHash: string, 
    authToken: string
  ): Promise<void> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/universities/${universityId}/notifications/${ipfsHash}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove notification');
      }
    } catch (error) {
      console.error('Error removing notification:', error);
      throw error;
    }
  }

  static async getNotificationByHash(
    universityId: string, 
    ipfsHash: string, 
    authToken?: string
  ): Promise<Notification> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch(`${this.API_BASE_URL}/universities/${universityId}/notifications/${ipfsHash}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notification');
      }

      const result = await response.json();
      const ipfsResult = await readIPFS(ipfsHash);
      
      if (!ipfsResult.success || !ipfsResult.data) {
        throw new Error(ipfsResult.error || 'Failed to retrieve notification data from IPFS');
      }

      const notificationData = ipfsResult.data as NotificationIPFSData;

      const notification: Notification = {
        id: ipfsHash,
        title: notificationData.title,
        description: notificationData.description,
        category: result.data.notification.category,
        priority: result.data.notification.priority,
        attachedFile: notificationData.attachedFile ? {
          ...notificationData.attachedFile,
          url: `${this.PINATA_GATEWAY_URL}/ipfs/${notificationData.attachedFile.ipfsHash}`,
        } : undefined,
        createdAt: notificationData.createdAt,
        universityId: notificationData.universityId,
      };

      return notification;
    } catch (error) {
      console.error('Error fetching notification by hash:', error);
      throw error;
    }
  }

  static async downloadAttachment(ipfsHash: string, filename: string): Promise<void> {
    try {
      const response = await fetch(`${this.PINATA_GATEWAY_URL}/ipfs/${ipfsHash}`);
      
      if (!response.ok) {
        throw new Error('Failed to download file from IPFS');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file from IPFS:', error);
      throw new Error('Failed to download file');
    }
  }
}

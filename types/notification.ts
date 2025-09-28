// IPFS data structure for notification content
export interface NotificationIPFSData {
  title: string;
  description: string;
  attachedFile?: {
    name: string;
    ipfsHash: string;
    size: number;
    mimeType: string;
  };
  createdAt: string;
  universityId: string;
}

// Complete notification object for frontend use
export interface Notification {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  attachedFile?: {
    name: string;
    ipfsHash: string;
    size: number;
    mimeType: string;
    url: string;
  };
  createdAt: string;
  universityId: string;
}

// Request interface for creating notifications
export interface CreateNotificationRequest {
  title: string;
  description: string;
  attachedFile?: File;
}

// Strapi API response interfaces
export interface NotificationResponse {
  success: boolean;
  data: {
    university: {
      id: string;
      name: string;
    };
    notifications: {
      ipfsHash: string;
      title: string;
      category: string;
      priority: string;
      createdAt: string;
      createdBy: string;
    }[];
    total: number;
  };
}

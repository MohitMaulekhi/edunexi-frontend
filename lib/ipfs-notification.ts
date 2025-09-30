import { NotificationIPFSData } from "@/types/notification";


export class IPFSNotificationService {
  private static IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://ipfs.io/ipfs/';
  private static PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  private static PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

  static async uploadFile(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.PINATA_API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file to IPFS');
      }

      const result = await response.json();
      return result.IpfsHash;
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }

  static async uploadNotificationData(notificationData: NotificationIPFSData): Promise<string> {
    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.PINATA_API_KEY}`,
        },
        body: JSON.stringify({
          pinataContent: notificationData,
          pinataMetadata: {
            name: `notification-${Date.now()}`,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload notification data to IPFS');
      }

      const result = await response.json();
      return result.IpfsHash;
    } catch (error) {
      console.error('Error uploading notification data to IPFS:', error);
      throw new Error('Failed to upload notification data to IPFS');
    }
  }

  static async retrieveNotificationData(hash: string): Promise<NotificationIPFSData> {
    try {
      const response = await fetch(`${this.IPFS_GATEWAY}${hash}`);
      
      if (!response.ok) {
        throw new Error('Failed to retrieve notification data from IPFS');
      }

      const data = await response.json();
      return data as NotificationIPFSData;
    } catch (error) {
      console.error('Error retrieving notification data from IPFS:', error);
      throw new Error('Failed to retrieve notification data from IPFS');
    }
  }

  static getFileUrl(hash: string): string {
    return `${this.IPFS_GATEWAY}${hash}`;
  }

  static async downloadFile(hash: string, filename: string): Promise<void> {
    try {
      const response = await fetch(`${this.IPFS_GATEWAY}${hash}`);
      
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
      throw new Error('Failed to download file from IPFS');
    }
  }
}

"use client"

import React, { useState } from 'react';
import { CreateNotificationRequest } from '@/types/notification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  X, 
  FileText, 
  Send, 
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { NotificationService } from '@/lib/notification-service';
import { useAuth } from '@/contexts/AuthContext';

interface CreateNotificationFormProps {
  universityId: string;
  onNotificationCreated?: (hash: string) => void;
  onCancel?: () => void;
  className?: string;
}

export function CreateNotificationForm({ 
  universityId, 
  onNotificationCreated, 
  onCancel,
  className = ""
}: CreateNotificationFormProps) {
  const { token } = useAuth();
  const [formData, setFormData] = useState<CreateNotificationRequest>({
    title: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (field: keyof CreateNotificationRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }

    if (!token) {
      setError('Authentication required');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const notificationRequest: CreateNotificationRequest = {
        ...formData,
        attachedFile: selectedFile || undefined,
      };

      const hash = await NotificationService.createNotification(
        universityId,
        notificationRequest,
        token
      );

      setSuccess('Notification created successfully!');
      setFormData({
        title: '',
        description: '',
      });
      setSelectedFile(null);

      if (onNotificationCreated) {
        onNotificationCreated(hash);
      }
    } catch (err) {
      console.error('Error creating notification:', err);
      setError(err instanceof Error ? err.message : 'Failed to create notification');
    } finally {
      setLoading(false);
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
    <Card className={`bg-black/50 border-gray-700 ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white flex items-center">
          <Send className="h-5 w-5 mr-2 text-blue-400" />
          Create New Notification
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-300">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-500/50 bg-green-500/10">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-300">
                {success}
              </AlertDescription>
            </Alert>
          )}



          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300">
              Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter notification title..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="bg-black/50 border-gray-600"
              maxLength={200}
            />
            <p className="text-xs text-gray-500">
              {formData.title.length}/200 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Enter detailed description..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="bg-black/50 border-gray-600 min-h-[120px]"
              maxLength={1000}
            />
            <p className="text-xs text-gray-500">
              {formData.description.length}/1000 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">
              Attachment (Optional)
            </Label>
            
            {!selectedFile ? (
              <label className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors cursor-pointer block">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, JPG, PNG up to 10MB
                </p>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  className="hidden"
                />
              </label>
            ) : (
              <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatFileSize(selectedFile.size)} • {selectedFile.type}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading || !formData.title.trim() || !formData.description.trim()}
              className="min-w-[120px]"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Create Notification
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

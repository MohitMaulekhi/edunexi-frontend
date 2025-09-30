"use client";
import React, { useEffect } from "react";
import {
  Bell,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NotificationList } from "@/components/NotificationList";
import { useAuth } from "@/contexts/AuthContext";

const StudentNotifications: React.FC = () => {
  const { user, refreshUser } = useAuth();

  // Get university from either direct assignment or student profile
  const userUniversity = user?.university || user?.student?.university;

  if (!userUniversity) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
          <p className="text-gray-400">You need to be associated with a university to view notifications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/student">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Notifications
                </h1>
                <p className="text-gray-400 text-sm">
                  Stay updated with university announcements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Notifications List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Bell className="h-5 w-5 mr-2 text-blue-400" />
              University Notifications
            </h2>
          </div>
          
          <NotificationList 
            universityId={userUniversity.id.toString()}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentNotifications;

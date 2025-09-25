"use client";
import React from "react";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

type NotificationType =
  | "exam"
  | "attendance"
  | "lecture"
  | "assignment"
  | "general";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  type: NotificationType;
}

const UniversityNotifications: React.FC = () => {
  const notifications: Notification[] = [
    {
      id: 1,
      title: "Exam Schedule Released",
      message:
        "The final exam schedule for Semester 5 has been published. Check the university portal for details.",
      date: "2025-09-20",
      type: "exam",
    },
    {
      id: 2,
      title: "Library Closed on Saturday",
      message:
        "The central library will be closed for maintenance on 20th September.",
      date: "2025-09-21",
      type: "general",
    },
    {
      id: 3,
      title: "Guest Lecture: AI in Biotechnology",
      message:
        "Join us for an exciting guest lecture on AI applications in biotechnology.",
      date: "2025-09-25",
      type: "lecture",
    },
    {
      id: 4,
      title: "Student Attendance Alert",
      message:
        "Multiple students have attendance below the required 75%. Please review and take necessary action.",
      date: "2025-09-26",
      type: "attendance",
    },
    {
      id: 5,
      title: "New Assignment Deadline Reminder",
      message:
        "Reminder: Assignment submissions for Biotech 101 are due next week. Please notify students.",
      date: "2025-09-27",
      type: "assignment",
    },
    {
      id: 6,
      title: "Faculty Meeting Scheduled",
      message:
        "Monthly faculty meeting scheduled for next Friday. Please confirm your attendance.",
      date: "2025-09-28",
      type: "general",
    },
    {
      id: 7,
      title: "Midterm Results Review",
      message:
        "Midterm examination results are ready for review. Please verify and approve grades.",
      date: "2025-09-29",
      type: "exam",
    },
  ];

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "exam":
        return <BookOpen className="w-6 h-6 text-white" />;
      case "attendance":
        return <AlertTriangle className="w-6 h-6 text-white" />;
      case "lecture":
        return <Bell className="w-6 h-6 text-white" />;
      case "assignment":
        return <CheckCircle className="w-6 h-6 text-white" />;
      case "general":
        return <Bell className="w-6 h-6 text-white" />;
      default:
        return <Bell className="w-6 h-6 text-white" />;
    }
  };

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case "exam":
        return "bg-blue-500/20 border-blue-500/30";
      case "attendance":
        return "bg-red-500/20 border-red-500/30";
      case "lecture":
        return "bg-green-500/20 border-green-500/30";
      case "assignment":
        return "bg-yellow-500/20 border-yellow-500/30";
      case "general":
        return "bg-purple-500/20 border-purple-500/30";
      default:
        return "bg-pink-500/20 border-pink-500/30";
    }
  };

  const getTypeBadgeColor = (type: NotificationType) => {
    switch (type) {
      case "exam":
        return "text-blue-400";
      case "attendance":
        return "text-red-400";
      case "lecture":
        return "text-green-400";
      case "assignment":
        return "text-yellow-400";
      case "general":
        return "text-purple-400";
      default:
        return "text-pink-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] font-poppins">
      <div className="mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/university"
            className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent mb-4">
              University Notifications
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest notifications and important updates
            </p>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {notifications.map((note) => (
            <div
              key={note.id}
              className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div
                  className={`p-4 ${getTypeColor(
                    note.type
                  )} rounded-2xl flex-shrink-0 border`}
                >
                  {getIcon(note.type)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-bold text-white">
                      {note.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-medium ${getTypeBadgeColor(
                          note.type
                        )} capitalize`}
                      >
                        {note.type}
                      </span>
                      <time className="text-sm text-gray-400">
                        {new Date(note.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {note.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no notifications) */}
        {notifications.length === 0 && (
          <div className="text-center py-16">
            <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No notifications
            </h3>
            <p className="text-gray-500">
              All caught up! Check back later for new updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityNotifications;

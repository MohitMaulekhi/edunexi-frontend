"use client";
import React from "react";
import { Bell, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";

type NotificationType = "exam" | "attendance" | "lecture" | "assignment" | "general";

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
      message: "The final exam schedule for Semester 5 has been published. Check the university portal for details.",
      date: "2025-09-20", 
      type: "exam" 
    },
    { 
      id: 2, 
      title: "Library Closed on Saturday", 
      message: "The central library will be closed for maintenance on 20th September.",
      date: "2025-09-21", 
      type: "general" 
    },
    { 
      id: 3, 
      title: "Guest Lecture: AI in Biotechnology", 
      message: "Join us for an exciting guest lecture on AI applications in biotechnology.",
      date: "2025-09-25", 
      type: "lecture" 
    },
    { 
      id: 4, 
      title: "Your Attendance is Below 75%", 
      message: "Your current attendance is below the required 75%. Please ensure regular attendance.",
      date: "2025-09-26", 
      type: "attendance" 
    },
    { 
      id: 5, 
      title: "New Assignment Uploaded for Biotech 101", 
      message: "A new assignment has been uploaded for Biotech 101. Submission deadline is next week.",
      date: "2025-09-27", 
      type: "assignment" 
    },
    { 
      id: 6, 
      title: "Attendance Reminder: Submit Excuse Letter", 
      message: "Please submit your excuse letter for recent absences to the academic office.",
      date: "2025-09-28", 
      type: "attendance" 
    },
    { 
      id: 7, 
      title: "Midterm Exam Results Released", 
      message: "Midterm examination results have been published. Check your student portal.",
      date: "2025-09-29", 
      type: "exam" 
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
        return "bg-blue-500/30";
      case "attendance":
        return "bg-red-500/30";
      case "lecture":
        return "bg-green-500/30";
      case "assignment":
        return "bg-yellow-500/30";
      case "general":
        return "bg-purple-500/30";
      default:
        return "bg-pink-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-800 animate-gradient-x text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-4 text-center tracking-wide drop-shadow-lg">
          University Notifications
        </h1>
        <p className="text-center mb-12 text-gray-200 text-lg">
          Stay updated with the latest notifications from your university. Never miss an important update!
        </p>

        <div className="space-y-6">
          {notifications.map((note) => (
            <div
              key={note.id}
              className="flex items-start gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 border border-white/20"
            >
              <div className={`p-3 ${getTypeColor(note.type)} rounded-full flex-shrink-0`}>
                {getIcon(note.type)}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">{note.title}</h2>
                <p className="text-gray-200 mb-3 leading-relaxed">{note.message}</p>
                <p className="text-gray-300 text-sm">Date: {note.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default UniversityNotifications;
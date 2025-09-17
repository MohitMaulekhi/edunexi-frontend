"use client";
import React from "react";
import { Bell, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";

<<<<<<< HEAD

type NotificationType = 'info' | 'warning' | 'success';
const dummyNotifications: Array<{
  title: string;
  message: string;
  date: string;
  type: NotificationType;
}> = [
  {
    title: 'Exam Schedule Released',
    message: 'The final exam schedule for Semester 5 has been published. Check the university portal for details.',
    date: '2025-09-10',
    type: 'info',
  },
  {
    title: 'Library Closed on 20th Sep',
    message: 'The central library will be closed for maintenance on 20th September.',
    date: '2025-09-15',
    type: 'warning',
  },
  {
    title: 'New Internship Opportunities',
    message: 'Multiple companies have posted new internship opportunities. Visit the career cell page to apply.',
    date: '2025-09-12',
    type: 'success',
  },
]

const typeColors: Record<NotificationType, string> = {
  info: 'border-blue-400 bg-blue-50',
  warning: 'border-yellow-400 bg-yellow-50',
  success: 'border-green-400 bg-green-50',
}

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">University Notifications</h1>
        <div className="grid gap-6">
          {dummyNotifications.map((notif, idx) => (
            <div key={idx} className={`border-l-4 p-6 rounded shadow-sm hover:shadow-md transition ${typeColors[notif.type]}`}>
              <h2 className="text-lg font-semibold mb-1">{notif.title}</h2>
              <p className="text-gray-700 mb-2">{notif.message}</p>
              <span className="text-xs text-gray-400">{notif.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
=======
type NotificationType = "exam" | "attendance" | "lecture" | "assignment" | "general";

interface Notification {
  id: number;
  title: string;
  date: string;
  type: NotificationType;
>>>>>>> 06c4ce5 (dark theme)
}

const UniversityNotifications: React.FC = () => {
  const notifications: Notification[] = [
    { id: 1, title: "Exam Schedule Released", date: "2025-09-20", type: "exam" },
    { id: 2, title: "Library Closed on Saturday", date: "2025-09-21", type: "general" },
    { id: 3, title: "Guest Lecture: AI in Biotechnology", date: "2025-09-25", type: "lecture" },
    { id: 4, title: "Your Attendance is Below 75%", date: "2025-09-26", type: "attendance" },
    { id: 5, title: "New Assignment Uploaded for Biotech 101", date: "2025-09-27", type: "assignment" },
    { id: 6, title: "Attendance Reminder: Submit Excuse Letter", date: "2025-09-28", type: "attendance" },
    { id: 7, title: "Midterm Exam Results Released", date: "2025-09-29", type: "exam" },
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
      default:
        return <Bell className="w-6 h-6 text-white" />;
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
              className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 border border-white/20"
            >
              <div className="p-3 bg-pink-500/30 rounded-full">{getIcon(note.type)}</div>
              <div>
                <h2 className="text-2xl font-semibold">{note.title}</h2>
                <p className="text-gray-300 mt-1 text-sm">Date: {note.date}</p>
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

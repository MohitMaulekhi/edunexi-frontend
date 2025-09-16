import React from 'react'


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
}

export default page

import React from 'react'


const dummyEvents = [
  {
    name: 'Orientation Day',
    date: '2025-09-01',
    location: 'Main Auditorium',
    description: 'Welcome event for new students with campus tour and introduction.'
  },
  {
    name: 'Tech Fest 2025',
    date: '2025-10-15',
    location: 'Innovation Block',
    description: 'Annual technology festival with workshops, hackathons, and guest speakers.'
  },
  {
    name: 'Sports Meet',
    date: '2025-11-20',
    location: 'Sports Ground',
    description: 'Inter-college sports competition with various games and prizes.'
  },
]

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-green-800">Student Events</h1>
        <div className="grid gap-6">
          {dummyEvents.map((event, idx) => (
            <div key={idx} className="border-l-4 border-green-500 bg-green-50 p-6 rounded shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold text-green-700 mb-1">{event.name}</h2>
              <p className="text-gray-700 mb-2">{event.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="bg-green-100 px-2 py-1 rounded">Date: {event.date}</span>
                <span className="bg-blue-100 px-2 py-1 rounded">Location: {event.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page

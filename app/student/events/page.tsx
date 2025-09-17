import React from "react";

<<<<<<< HEAD

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
=======
const events = [
  {
    id: 1,
    title: "Orientation Day",
    date: "2025-09-01",
    location: "Main Auditorium",
    excerpt:
      "Welcome event for new students — campus tour, department intros, and clubs fair.",
    color: "from-green-200 to-green-50",
  },
  {
    id: 2,
    title: "Tech Fest 2025",
    date: "2025-10-15",
    location: "Innovation Block",
    excerpt:
      "Annual technology festival with workshops, hackathons, guest speakers and demo booths.",
    color: "from-blue-200 to-purple-50",
  },
  {
    id: 3,
    title: "Sports Meet",
    date: "2025-11-20",
    location: "Sports Ground",
    excerpt:
      "Inter-department sports competition with athletics, team games and prize distribution.",
    color: "from-yellow-100 to-yellow-50",
  },
];

export default function StudentEventsPage() {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800">Student Events</h1>
          <p className="mt-2 text-slate-600">Upcoming events and campus highlights.</p>
        </header>
>>>>>>> 06c4ce5 (dark theme)

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <article
              key={e.id}
              className={`rounded-lg overflow-hidden shadow-md border border-slate-100 bg-gradient-to-br ${e.color} p-5`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{e.title}</h2>
                  <p className="text-sm text-slate-700 mt-1">{e.location}</p>
                </div>
                <time className="text-xs text-slate-600">{e.date}</time>
              </div>

              <p className="mt-4 text-slate-700 text-sm">{e.excerpt}</p>

              <div className="mt-4 flex items-center gap-3">
                <a
                  className="text-sm text-primary underline"
                  href="#"
                >
                  View details
                </a>
                <button className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-white/80 text-slate-800 shadow">Save</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

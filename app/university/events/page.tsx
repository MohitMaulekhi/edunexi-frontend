import React from "react";

const events = [
  {
    id: 1,
    title: "Campus Research Expo",
    date: "2025-09-22",
    location: "Exhibition Hall",
    excerpt: "Showcase of student and faculty research projects with poster sessions and demos.",
    color: "from-indigo-100 to-indigo-50",
  },
  {
    id: 2,
    title: "Alumni Meet",
    date: "2025-10-05",
    location: "Auditorium",
    excerpt: "Reconnect with alumni, talks on career growth, and networking sessions.",
    color: "from-indigo-100 to-indigo-50",
  },
  {
    id: 3,
    title: "Green Campus Drive",
    date: "2025-11-12",
    location: "Campus Grounds",
    excerpt: "Campus-wide tree planting, clean-up drives, and sustainability workshops.",
    color: "from-emerald-100 to-emerald-50",
  },
];

export default function UniversityEventsPage() {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800">University Events</h1>
          <p className="mt-2 text-slate-600">Campus-wide events, notices and community activities.</p>
        </header>

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
                <a className="text-sm text-primary underline" href="#">View details</a>
                <button className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-white/80 text-slate-800 shadow">Register</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

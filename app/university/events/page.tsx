"use client";

import React from "react";

const events = [
  {
    id: 1,
    title: "Campus Research Expo",
    date: "2025-09-22",
    location: "Exhibition Hall",
    excerpt:
      "Showcase of student and faculty research projects with poster sessions and demos.",
  },
  {
    id: 2,
    title: "Alumni Meet",
    date: "2025-10-05",
    location: "Auditorium",
    excerpt:
      "Reconnect with alumni, talks on career growth, and networking sessions.",
  },
  {
    id: 3,
    title: "Green Campus Drive",
    date: "2025-11-12",
    location: "Campus Grounds",
    excerpt:
      "Campus-wide tree planting, clean-up drives, and sustainability workshops.",
  },
  {
    id: 4,
    title: "Tech Innovation Fair",
    date: "2025-12-01",
    location: "Innovation Center",
    excerpt:
      "Student-led startups and prototypes showcasing cutting-edge technology.",
  },
  {
    id: 5,
    title: "Cultural Fest",
    date: "2026-01-15",
    location: "Open Grounds",
    excerpt:
      "Music, dance, and drama performances celebrating campus diversity.",
  },
  {
    id: 6,
    title: "Sports Championship",
    date: "2026-02-20",
    location: "Sports Complex",
    excerpt:
      "Inter-college tournaments across multiple sports and athletic events.",
  },
];

export default function UniversityEventsPage() {
  const [selectedEvent, setSelectedEvent] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen py-12 bg-gradient-to-tr from-gray-950 via-black to-gray-900 text-white font-sans">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            University Events
          </h1>
          <p className="mt-2 text-gray-300">
            Campus-wide events, notices and community activities.
          </p>
        </header>

        {/* Event Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <article
              key={e.id}
              onClick={() =>
                setSelectedEvent(selectedEvent === e.id ? null : e.id)
              }
              className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/10 p-6 
              hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-blue-900/40 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white tracking-tight">{e.title}</h2>
<p className="text-sm text-gray-200 mt-1 tracking-wide">{e.location}</p>

                </div>
                <time className="text-xs text-gray-300">{e.date}</time>
              </div>

              {/* Event excerpt */}
              <p className="mt-4 text-gray-400 text-sm">{e.excerpt}</p>

              {/* Action buttons */}
              <div className="mt-4 flex items-center gap-3">
                <a
                  className="text-sm text-blue-400 underline hover:text-blue-300"
                  href="#"
                >
                  View details
                </a>

                <button
                  className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold 
                  bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg 
                  hover:from-blue-800 hover:to-blue-700 transition-all duration-300"
                >
                  Register
                </button>
              </div>

              {/* Expanded details (optional, can be removed if you want minimal) */}
              {selectedEvent === e.id && (
                <div className="mt-4 text-gray-200 text-sm space-y-3">
                  <p><strong>Location:</strong> {e.location}</p>
                  <p>{e.excerpt}</p>
                  <button
                    onClick={(ev) => {
                      ev.stopPropagation();
                      setSelectedEvent(null);
                    }}
                    className="mt-2 px-3 py-1 rounded bg-blue-900 text-white hover:bg-blue-800 transition"
                  >
                    Close
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

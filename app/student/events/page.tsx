import React from "react";
import { Calendar, MapPin, BookmarkPlus } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  color: string;
  category: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Orientation Day",
    date: "2025-09-01",
    location: "Main Auditorium",
    description: "Welcome event for new students with campus tour, department introductions, and clubs fair.",
    color: "from-green-400 to-green-600",
    category: "Academic"
  },
  {
    id: 2,
    title: "Tech Fest 2025",
    date: "2025-10-15",
    location: "Innovation Block",
    description: "Annual technology festival with workshops, hackathons, guest speakers and demo booths.",
    color: "from-blue-400 to-purple-600",
    category: "Technology"
  },
  {
    id: 3,
    title: "Sports Meet",
    date: "2025-11-20",
    location: "Sports Ground",
    description: "Inter-department sports competition with athletics, team games and prize distribution.",
    color: "from-yellow-400 to-orange-500",
    category: "Sports"
  },
  {
    id: 4,
    title: "Cultural Festival",
    date: "2025-12-05",
    location: "Cultural Center",
    description: "Annual cultural celebration featuring music, dance, drama performances and art exhibitions.",
    color: "from-pink-400 to-red-500",
    category: "Cultural"
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const StudentEventsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            Student Events
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover upcoming events, festivals, and activities happening on campus. 
            Join us for unforgettable experiences!
          </p>
        </header>

        {/* Events Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {events.map((event) => (
            <article
              key={event.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Gradient Header */}
              <div className={`h-32 bg-gradient-to-r ${event.color} relative`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-slate-800">
                    {event.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Calendar className="w-8 h-8 text-white/80" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 mb-3 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{event.location}</span>
                </div>

                <div className="flex items-center gap-2 mb-4 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{formatDate(event.date)}</span>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                    View Details
                  </button>
                  <button className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
                    <BookmarkPlus className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Don't Miss Out!
            </h3>
            <p className="text-slate-600 mb-6">
              Subscribe to our newsletter to get notified about upcoming events and exclusive opportunities.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEventsPage;

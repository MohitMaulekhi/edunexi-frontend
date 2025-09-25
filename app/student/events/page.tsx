import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, BookmarkPlus, ArrowLeft, Users } from "lucide-react";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  attendees: number;
}

const events: Event[] = [
  {
    id: 1,
    title: "Orientation Day",
    date: "2025-09-01",
    location: "Main Auditorium",
    description:
      "Welcome event for new students with campus tour, department introductions, and clubs fair.",
    category: "Academic",
    attendees: 250,
  },
  {
    id: 2,
    title: "Tech Fest 2025",
    date: "2025-10-15",
    location: "Innovation Block",
    description:
      "Annual technology festival with workshops, hackathons, guest speakers and demo booths.",
    category: "Technology",
    attendees: 500,
  },
  {
    id: 3,
    title: "Sports Meet",
    date: "2025-11-20",
    location: "Sports Ground",
    description:
      "Inter-department sports competition with athletics, team games and prize distribution.",
    category: "Sports",
    attendees: 300,
  },
  {
    id: 4,
    title: "Cultural Festival",
    date: "2025-12-05",
    location: "Cultural Center",
    description:
      "Annual cultural celebration featuring music, dance, drama performances and art exhibitions.",
    category: "Cultural",
    attendees: 400,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "academic":
      return "bg-blue-500/20 border-blue-500/30 text-blue-400";
    case "technology":
      return "bg-purple-500/20 border-purple-500/30 text-purple-400";
    case "sports":
      return "bg-orange-500/20 border-orange-500/30 text-orange-400";
    case "cultural":
      return "bg-pink-500/20 border-pink-500/30 text-pink-400";
    default:
      return "bg-gray-500/20 border-gray-500/30 text-gray-400";
  }
};

const StudentEventsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#000000] font-poppins">
      <div className="mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/student"
            className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent mb-4">
              Student Events
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover upcoming events, festivals, and activities happening on
              campus
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {events.map((event) => (
            <article
              key={event.id}
              className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {/* Event Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {event.title}
                  </h2>
                  <div className="flex items-center text-gray-400 text-sm mb-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                      event.category
                    )}`}
                  >
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {event.description}
              </p>

              {/* Event Stats */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-gray-400 text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  {event.attendees} expected
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600"
                >
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  Register
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Don't Miss Out!
            </h3>
            <p className="text-gray-300 mb-6">
              Stay updated with campus events and never miss an opportunity to
              engage with your community.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600"
            >
              View All Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEventsPage;

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Campus Research Expo",
    date: "2025-09-22",
    location: "Exhibition Hall",
    excerpt: "Showcase of student and faculty research projects with poster sessions and demos.",
    category: "Research",
    attendees: 150,
  },
  {
    id: 2,
    title: "Alumni Meet",
    date: "2025-10-05",
    location: "Auditorium",
    excerpt: "Reconnect with alumni, talks on career growth, and networking sessions.",
    category: "Networking",
    attendees: 200,
  },
  {
    id: 3,
    title: "Green Campus Drive",
    date: "2025-11-12",
    location: "Campus Grounds",
    excerpt: "Campus-wide tree planting, clean-up drives, and sustainability workshops.",
    category: "Environment",
    attendees: 300,
  },
];

export default function UniversityEventsPage() {

  return (
    <div className="min-h-screen bg-[#000000] font-poppins">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/university" className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent mb-4">
              University Events
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Campus-wide events, notices and community activities
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {/* Event Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-2">{event.title}</h2>
                  <div className="flex items-center text-gray-400 text-sm mb-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {event.excerpt}
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
                <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600">
                  Manage
                </Button>
              </div>


            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Create New Event
            </h3>
            <p className="text-gray-300 mb-6">
              Organize campus events and engage with your university community.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:via-indigo-600 hover:to-purple-600">
              Create Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

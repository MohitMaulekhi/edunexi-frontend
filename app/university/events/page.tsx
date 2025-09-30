"use client";
import React, { useEffect, useState } from "react";
import { Event, EventDetails } from "@/types/events";
import { fetchEvents } from "@/lib/event";
import { EventCard } from "@/components/EventCard";
import { EventDetailsModal } from "@/components/EventDetailsModal";
import { CreateEventForm } from "@/components/CreateEventForm";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const UniversityEventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const {user,token} = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      fetchEvents(token!).then((data) => {
        setEvents(data);
        setLoading(false);
      });
    }
  }, [refreshKey]);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleEventCreated = () => {
    setShowCreateForm(false);
    setRefreshKey((prev) => prev + 1);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-gray-400">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          University Events
        </h1>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          {showCreateForm ? "Cancel" : "Create Event"}
        </Button>
      </div>
      {showCreateForm && <CreateEventForm onEventCreated={handleEventCreated} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {events.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="bg-black/50 rounded-lg p-8 border border-gray-700 inline-block">
              <h3 className="text-lg font-semibold text-white mb-2">No Events Found</h3>
              <p className="text-gray-400 mb-2">There are currently no events scheduled for your university.</p>
              <p className="text-gray-500 text-sm">Click "Create Event" to add a new event.</p>
            </div>
          </div>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={{
                id: event.id,
                Title: event.Title,
                Type: event.Type,
                DateTime: event.DateTime,
                Venue: event.Venue,
              }}
              onClick={() => handleEventClick(event)}
            />
          ))
        )}
      </div>
      <EventDetailsModal
        event={selectedEvent}
        open={!!selectedEvent}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default UniversityEventsPage;

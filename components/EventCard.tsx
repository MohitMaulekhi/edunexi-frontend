import React from "react";
import { EventCardData } from "@/types/events";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";

interface EventCardProps {
  event: EventCardData;
  onClick: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => (
  <Card
    className="cursor-pointer hover:shadow-xl transition border border-blue-700/30 bg-gradient-to-br from-black via-blue-950 to-black rounded-xl"
    onClick={onClick}
  >
    <CardContent className="p-5 flex flex-col gap-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-xl text-blue-400 truncate max-w-[70%]">{event.Title}</h3>
        <span className="text-xs px-2 py-1 rounded bg-blue-700/20 text-blue-300 font-semibold">
          {event.Type}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <CalendarDays className="h-4 w-4 text-blue-400" />
        <span>{new Date(event.DateTime).toLocaleString()}</span>
      </div>
      {event.Venue && (
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <MapPin className="h-4 w-4 text-purple-400" />
          <span>Venue: {event.Venue}</span>
        </div>
      )}
      {/* Add a subtle divider and a details button */}
      <div className="flex justify-end mt-2">
        <span className="text-xs text-blue-400 hover:underline">View Details</span>
      </div>
    </CardContent>
  </Card>
);

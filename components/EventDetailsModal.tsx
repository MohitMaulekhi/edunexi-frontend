import React from "react";
import { EventDetails } from "@/types/events";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  uid: string;
}

interface EventDetailsModalProps {
  event: EventDetails | null;
  open: boolean;
  onClose: () => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  open,
  onClose,
}) => {
  if (!event) return null;
  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent className=" bg-black/90 border border-gray-700 rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-blue-400 mb-2">
            {event.Title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 space-y-4">
            <div className="flex gap-2 items-center">
              <span className="text-xs px-2 py-1 rounded bg-blue-700/20 text-blue-300 font-semibold">
                {event.Type}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-gray-700/30 text-gray-300">
                {new Date(event.DateTime).toLocaleString()}
              </span>
              {event.Venue && (
                <span className="text-xs px-2 py-1 rounded bg-purple-700/20 text-purple-300">
                  {event.Venue}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-300">
              <strong>Description:</strong>
              <span className="ml-2 text-gray-400">{event.Description}</span>
            </div>
            <div className="flex gap-6 mt-2">
              <div className="bg-blue-900/30 rounded-lg px-4 py-3">
                <span className="block text-xs text-blue-400 font-semibold">
                  Registered
                </span>
                <span className="block text-xl font-bold">
                  {event.Registered?.length ?? 0}
                </span>
              </div>
              <div className="bg-green-900/30 rounded-lg px-4 py-3">
                <span className="block text-xs text-green-400 font-semibold">
                  Attended
                </span>
                <span className="block text-xl font-bold">
                  {event.Attendees?.length ?? 0}
                </span>
              </div>
              <div className="bg-yellow-900/30 rounded-lg px-4 py-3">
                <span className="block text-xs text-yellow-400 font-semibold">
                  Winners
                </span>
                <span className="block text-xl font-bold">
                  {event.Winners?.map((w) => w.studentId).join(", ") || "None"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-full md:w-auto">
            <span className="text-xs text-gray-400 mb-2">Event QR Code</span>
            <div className="bg-white p-2 md:p-4 rounded-lg shadow w-full flex justify-center">
              <QRCodeSVG
                value={event.id}
                size={Math.min(
                  window.innerWidth > 768 ? 200 : 120,
                  200
                )}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <span className="text-xs text-gray-500 mt-2">
              Scan to check-in or view event
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, BookmarkPlus, ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { registerForEvent, AttendaceForEvent, fetchEvents } from "@/lib/event";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { QrReader } from "react-qr-reader";

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

const StudentEventsPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();
  const [registering, setRegistering] = useState<string | null>(null);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    fetchEvents(token)
      .then((data) => setEvents(data))
      .catch(() => setError("Failed to load events"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleRegister = async (eventId: string) => {
    if (!token) return;
    const event = events.find((e) => e.id === eventId);
    if (isRegistered(event)) {
      toast.warning("You are already registered for this event.");
      return;
    }
    setRegistering(eventId);
    try{
      const success = await registerForEvent(token, eventId);
      toast.success("You have successfully registered for the event!");
    }
    catch(e:any){
      toast.error(e.message ??"Registration failed. Please try again.");
    }finally{
      setRegistering(null);
    }
    
  };

  const handleAttendance = () => {
    setShowQrModal(true);
    setQrError(null);
  };

  const handleScan = async (scannedId: string | null) => {
    if (!scannedId) return;
    /// scanned id is         value={"https://edunexi-frontend.vercel.app/university/events/" + event.id}
    const id = scannedId.split("/").pop();
    setAttendanceLoading(true);
    setQrError(null);
    
    setAttendanceLoading(false);
    setShowQrModal(false);
    try{
      const success = await AttendaceForEvent(token!, id!);
      toast.success("Attendance marked successfully!");
    }
    catch(e:any){
      toast.error(e.message ??"Failed to mark attendance");
    }
    finally{
      setAttendanceLoading(false);
      setShowQrModal(false);
    }
     
  };

  const isRegistered = (event: any) => {
    return event.Registered?.some((u: any) => u.id === user?.id);
  };

  return (
    <div className="min-h-screen bg-[#000000] font-poppins">
      <div className="mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full max-w-7xl">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#E5E5E5] to-[#60A5FA] bg-clip-text text-transparent mb-4">
              Student Events
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Discover upcoming events, festivals, and activities happening on
              campus
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {loading ? (
            <div className="col-span-full text-center py-16">
              <span className="text-gray-400">Loading events...</span>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-16">
              <span className="text-red-400">{error}</span>
            </div>
          ) : events.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <span className="text-gray-400">No events found.</span>
            </div>
          ) : (
            events.map((event) => (
              <article
                key={event.id}
                className="bg-black/70 backdrop-blur-md border border-gray-700 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col"
              >
                {/* Event Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-2">
                      {event.Title}
                    </h2>
                    <div className="flex items-center text-gray-400 text-sm mb-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.Venue}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.DateTime}
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                        event.Type
                      )}`}
                    >
                      {event.Type}
                    </span>
                  </div>
                </div>

                {/* Event Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {event.Description}
                </p>

                {/* Event Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    {event.Registered?.length ?? 0} registered
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
                    onClick={() => handleRegister(event.id)}
                    disabled={registering === event.id || isRegistered(event)}
                  >
                    {registering === event.id ? (
                      <span className="flex items-center justify-center">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Registering...
                      </span>
                    ) : isRegistered(event) ? (
                      <span className="flex items-center justify-center text-red-400">
                        Already Registered
                      </span>
                    ) : (
                      <>
                        <BookmarkPlus className="w-4 h-4 mr-2" />
                        Register
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-green-600 via-teal-500 to-blue-500 hover:from-green-700 hover:via-teal-600 hover:to-blue-600"
                    onClick={handleAttendance}
                  >
                    Mark Attendance
                  </Button>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Call to Action */}
      </div>

      {/* QR Scanner Modal */}
      <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Scan Event QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            {attendanceLoading ? (
              <span className="flex items-center justify-center">
                <span className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Marking attendance...
              </span>
            ) : (
              <>
                <div style={{ width: "100%" }}>
                  <QrReader
                    constraints={{ facingMode: "environment" }}
                    onResult={(result: any, error: any) => {
                      if (!!result) {
                        handleScan(result.getText());
                      } else if (error) {
                        setQrError("QR scan failed. Try again.");
                      }
                    }}
                  />
                </div>
                {qrError && (
                  <span className="text-red-400 text-sm">{qrError}</span>
                )}
                <span className="text-xs text-gray-400">
                  Align the QR code within the frame
                </span>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentEventsPage;

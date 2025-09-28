import React, { useState } from "react";
import { CreateEventRequest } from "@/types/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createEvent } from "@/lib/event";
import { useAuth } from "@/contexts/AuthContext";

const EVENT_TYPES = ["Hackathon", "Cultural", "Workshops", "Coding", "Other"];

interface CreateEventFormProps {
  onEventCreated?: () => void;
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({ onEventCreated }) => {
  const { token } = useAuth();
  const [form, setForm] = useState<CreateEventRequest>({
    Title: "",
    Description: "",
    Type: EVENT_TYPES[0],
    DateTime: "",
    Venue: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof CreateEventRequest, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createEvent(token!, form);
      setForm({ Title: "", Description: "", Type: EVENT_TYPES[0], DateTime: "", Venue: "" });
      if (onEventCreated) onEventCreated();
    } catch (err) {
      setError("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-black/50 rounded-lg border border-gray-700">
      <Input placeholder="Title" value={form.Title} onChange={e => handleChange("Title", e.target.value)} required />
      <Textarea placeholder="Description" value={form.Description} onChange={e => handleChange("Description", e.target.value)} required />
      <Select value={form.Type} onValueChange={val => handleChange("Type", val)}>
        <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
        <SelectContent>
          {EVENT_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
        </SelectContent>
      </Select>
      <Input type="datetime-local" value={form.DateTime} onChange={e => handleChange("DateTime", e.target.value)} required />
      <Input placeholder="Venue" value={form.Venue} onChange={e => handleChange("Venue", e.target.value)} />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Event"}</Button>
    </form>
  );
};

// Event-related types and interfaces

import { StudentProfile } from "./student";

export interface Event {
  id: string;
  documentId: string;
  Title: string;
  Description: string;
  Type:
    | "Hackathon"
    | "Cultural"
    | "Workshops"
    | "Coding"
    | "Other"
    | "workshop"
    | "seminar"
    | "conference";

  DateTime: string;
  Venue?: string;
  Registered: StudentProfile[];
  Attendees: StudentProfile[];
  Winners: StudentProfile[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CreateEventRequest {
  Title: string;
  Description: string;
  Type: string;
  DateTime: string;
  Venue?: string;
}

export interface EventCardData {
  id: string;
  Title: string;
  Type: string;
  DateTime: string;
  Venue?: string;
}

export interface EventDetails extends Event {}

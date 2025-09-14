// Event-related types and interfaces

export interface Event {
  id: string
  documentId: string
  title: string
  description: string
  type: 'academic' | 'cultural' | 'sports' | 'technical' | 'social' | 'workshop' | 'seminar' | 'conference'
  category: 'internal' | 'external' | 'intercollegiate'
  date: string
  startTime: string
  endTime: string
  location: string
  venue?: string
  maxParticipants?: number
  currentParticipants: number
  registrationDeadline: string
  isRegistrationOpen: boolean
  requirements?: string[]
  benefits?: string[]
  contactPerson: string
  contactEmail: string
  contactPhone?: string
  organizer: string
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled'
  isActive: boolean
  attachments?: EventAttachment[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface EventAttachment {
  id: string
  name: string
  url: string
  type: 'image' | 'document' | 'video' | 'other'
  size?: number
  createdAt: string
}

export interface EventRegistration {
  id: string
  eventId: string
  studentId: string
  studentName: string
  studentEmail: string
  registrationDate: string
  status: 'registered' | 'attended' | 'absent' | 'cancelled'
  notes?: string
  certificateIssued?: boolean
  feedbackProvided?: boolean
}

export interface EventFeedback {
  id: string
  eventId: string
  studentId: string
  rating: number // 1-5 scale
  feedback: string
  suggestions?: string
  wouldRecommend: boolean
  submittedDate: string
}

export interface EventCalendar {
  month: number
  year: number
  events: EventSummary[]
}

export interface EventSummary {
  id: string
  title: string
  date: string
  type: Event['type']
  status: Event['status']
  participantCount: number
}

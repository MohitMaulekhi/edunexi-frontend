// Student data functions using axios
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

/// events functions
export async function registerForEvent(token: string, eventId: string): Promise<boolean> {
  try {
    await axios.post(`${API_URL}/api/events/${eventId}/register`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return true
  } catch (error) {
    console.error('Failed to register for event:', error)
    return false
  }
}

export async function AttendaceForEvent(token: string, eventId: string): Promise<boolean> {
  try {
    await axios.post(`${API_URL}/api/events/${eventId}/attendance`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return true
  } catch (error) {
    console.error('Failed to mark attendance for event:', error)
    return false
  }
}

export async function fetchEvents(token: string): Promise<any[]> {
  try {
    const response = await axios.get(`${API_URL}/api/events`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch events:', error)
    return []
  }
}

export async function createEvent(token: string, eventData: any): Promise<any | null> {
  try {
    const response = await axios.post(`${API_URL}/api/events`, { data: eventData }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to create event:', error)
    return null
  }
}
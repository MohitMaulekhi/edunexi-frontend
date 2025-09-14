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



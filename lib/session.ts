import { cookies } from "next/headers"
import type { User } from "./auth"

export interface Session {
  user: User
  expires: Date
}

export async function createSession(user: User): Promise<string> {
  const sessionId = Math.random().toString(36).substring(2, 15)
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  // In a real app, you'd store this in a database
  const session: Session = { user, expires }

  // Store session in cookie
  const cookieStore = await cookies()
  cookieStore.set("session", JSON.stringify({ sessionId, user, expires }), {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  return sessionId
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) return null

    const sessionData = JSON.parse(sessionCookie.value)
    const expires = new Date(sessionData.expires)

    if (expires < new Date()) {
      await destroySession()
      return null
    }

    return {
      user: sessionData.user,
      expires,
    }
  } catch {
    return null
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

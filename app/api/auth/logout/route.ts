import { NextResponse } from "next/server"
import { destroySession } from "@/lib/session"

export async function POST() {
  try {
    await destroySession()
    return NextResponse.json({ message: "Logout successful" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

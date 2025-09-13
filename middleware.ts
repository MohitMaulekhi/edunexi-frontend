import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get session from cookie
  const sessionCookie = request.cookies.get("session")
  let session = null

  if (sessionCookie) {
    try {
      session = JSON.parse(sessionCookie.value)
      const expires = new Date(session.expires)
      if (expires < new Date()) {
        session = null
      }
    } catch {
      session = null
    }
  }

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/signup"]
  const isPublicRoute = publicRoutes.includes(pathname)

  // If no session and trying to access protected route
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If logged in and trying to access login/signup
  if (session && (pathname === "/login" || pathname === "/signup")) {
    const redirectUrl = session.user.role === "student" ? "/student" : "/university"
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // Role-based route protection
  if (session) {
    const userRole = session.user.role

    // Student trying to access university routes
    if (userRole === "student" && pathname.startsWith("/university")) {
      return NextResponse.redirect(new URL("/student", request.url))
    }

    // University admin trying to access student routes
    if (userRole === "university" && pathname.startsWith("/student")) {
      return NextResponse.redirect(new URL("/university", request.url))
    }

    // Redirect to appropriate dashboard if accessing root while logged in
    if (pathname === "/") {
      const redirectUrl = userRole === "student" ? "/student" : "/university"
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

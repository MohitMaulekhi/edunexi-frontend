import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Skip files with extensions
  ) {
    return NextResponse.next()
  }

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login"]
  const isPublicRoute = publicRoutes.includes(pathname)

  // For client-side auth with localStorage, we'll let the components handle protection
  // Middleware is mainly for server-side redirects and static route protection
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

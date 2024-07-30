import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token
    const isApiRoute = req.nextUrl.pathname.startsWith('/api')
    const isAdminRoute = req.nextUrl.pathname.startsWith('/home/admin')

    if ((isApiRoute || isAdminRoute) && token?.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: "/home/auth",
      error: "/home/error",
    },
  }
)

export const config = {
  matcher: [
    "/home/:path*",
    // "/home/dashboard/:path*",
    "/api/((?!hello).*)", // Allow all API except /api/hello
    // "/api/:path*", // Allow all API
  ]
}
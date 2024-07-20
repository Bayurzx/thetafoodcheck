import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: "/home/auth",
        error: "/home/error",
    },
})

export const config = {
    matcher: [
        "/home/form/:path*",
        "/home/dashboard/:path*",

        // Exclude auth-related paths
        // "/((?!api|_next/static|_next/image|favicon.ico).*)",
        // "/((?!home/auth|home/error|api|_next/static|_next/image|favicon.ico).*)",
        // "/((?!/home/auth|/home/error|/api|/_next/static|/_next/image|/favicon.ico).*)",

    ]

}
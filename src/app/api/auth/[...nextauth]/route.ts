import NextAuth, { NextAuthOptions } from "next-auth"

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github"

// import { MongoDBAdapter } from '@auth/mongodb-adapter'
// import { Adapter } from "next-auth/adapters";
// import clientPromise from "@/db/mongodb";


export const authConfig: NextAuthOptions = {
    // adapter: MongoDBAdapter(clientPromise) as Adapter,
    
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,

            profile: (profile) => {
                return {
                    id: profile.id.toString(),
                    name: profile.login ?? profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                }
            },

        }),
    ],

    callbacks: {
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub || "";
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },

    },

    pages: {
        signIn: "/home/auth",
        error: "/home/error",
    },
    // debug: true, // Enable debug messages in the console

}

const handler = NextAuth(authConfig)


export { handler as GET, handler as POST }
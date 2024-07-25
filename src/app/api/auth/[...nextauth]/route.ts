import NextAuth, { NextAuthOptions } from "next-auth"

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github"

// import { MongoDBAdapter } from '@auth/mongodb-adapter'
// import { Adapter } from "next-auth/adapters";
import clientPromise from "@/db/mongodb";

const ADMIN_EMAILS = (process.env.ALLOWED_ADMINS as string)?.split(",")

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
        async session({ session, token, user }) {
            // console.log("session @ routes", session);
            // console.log("token @ routes", token);
            // console.log("user @ routes", user);
            
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


        async signIn({ user, account, profile, email, credentials, }) {
            // console.log("user @ routes", user);
            // console.log("account @ routes", account);
            // console.log("profile @ routes", profile);

            const client = await clientPromise;
            const db = client.db('users_db');
            const usersCollection = db.collection('users');
            
            const existingUser = await usersCollection.findOne({ email: user.email });

            if (!existingUser) {
                await usersCollection.insertOne({
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    provider: account?.provider,
                    providerId: account?.providerAccountId,
                    healthDataFilled: false, // Set default to false

                });
            }

            return true;
        },
        async jwt({ token, user }) {
            console.log("jwt_token @ routes", token);
            console.log("jwt_user @ routes", user);

            if (user) {
                token.id = user.id;
                token.email = user.email; // Include email in token for further use
                if (user?.email) {
                    token.role = ADMIN_EMAILS.includes(user.email) ? 'admin' : 'user'
                  }
            
            }
            return token;
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
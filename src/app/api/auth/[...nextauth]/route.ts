import NextAuth, { NextAuthOptions } from "next-auth"

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github"


export const authConfig: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID  as string,
            clientSecret: process.env.GITHUB_SECRET  as string,

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
        }
    },
}

const handler = NextAuth(authConfig)


export { handler as GET, handler as POST }
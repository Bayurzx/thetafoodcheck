'use client'

import { SessionProvider } from "next-auth/react"

export function OauthProviders({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

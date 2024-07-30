'use client'

import OAuthLogin from "@/components/oauth-login"
import { Suspense } from 'react'


export default function Auth() {
    return (
        <>
            <div className="">
                <Suspense>

                    <OAuthLogin />

                </Suspense>
            </div>
        </>
    )
}

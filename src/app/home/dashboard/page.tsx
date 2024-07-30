'use client'
import DashboardView from "@/components/dashboard-view";

export default function Dashboard() {
    return (
        <>
            <div className="p-10">
                <div className="w-full max-w-4xl min-h-screen">
                    <p className="text-2xl">Progress Report and subscription get more insight on your data</p>

                    <DashboardView />
                </div>
            </div>
        </>
    )
}

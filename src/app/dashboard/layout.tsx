import Sidebar from '@/components/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <Sidebar />
        <main>{children}</main>
        </div>
    </div>
  );
}

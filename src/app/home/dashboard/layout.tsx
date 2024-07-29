import Sidebar from '@/components/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Sidebar /> */}
      <div className="flex flex-col h-screen">
        <div className="flex flex-grow">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

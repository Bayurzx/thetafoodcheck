
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Sidebar /> */}
      <div className="flex flex-col">
        <div className="flex flex-grow">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}


export default function FormLayout({ children }: { children: React.ReactNode }) {
    return (
    <div className="flex flex-col">
      <div className="flex flex-grow">
        <main>{children}</main>
        </div>
    </div>
  );
}

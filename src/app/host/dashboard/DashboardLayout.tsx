import HostNavGuest from "@/components/Navbar/HostNavbar";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <h2>Navbar</h2>
      </div>
      {children}
      <div>
        <h2>Footer</h2>
      </div>
    </>
  );
}

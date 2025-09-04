import HostNavGuest from "@/components/Navbar/HostNavbar";
import FooterHost from "@/components/Footer/FooterHost";
import Footer from "@/components/Footer/Footer";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HostNavGuest />
      <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        {children}
      </div>
      <Footer />
    </>
  );
}

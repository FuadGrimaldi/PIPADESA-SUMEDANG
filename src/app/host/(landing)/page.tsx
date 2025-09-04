import HostLandingPage from "@/components/Host/Landing";

export default async function LandingHostHomePage() {
  return (
    <div className="container min-h-screen  ">
      <div className="relative px-[31px] lg:px-[100px] px-4 py-8">
        <div className="relative pt-16">
          <HostLandingPage />
        </div>
      </div>
    </div>
  );
}

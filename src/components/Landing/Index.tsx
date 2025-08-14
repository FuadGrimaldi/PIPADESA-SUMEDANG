import { headers } from "next/headers";
import Hero from "./HeroSubdomain";

export default function RootLanding() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  let subdomain = "";
  if (host.includes("localhost")) {
    subdomain = host.split(".")[0]; // Contoh: tenant1.localhost:3000
  } else {
    subdomain = host.split(".")[0]; // tenant1.domain.com
  }

  const isMainDomain = host === "localhost:3000" || host === "yourdomain.com";

  return <Hero subdomain={isMainDomain ? null : subdomain} />;
}

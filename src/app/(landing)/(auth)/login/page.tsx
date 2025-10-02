import SubdomainLogin from "@/components/Auth/SigninSubdomain";
import { headers } from "next/headers";
import { getDesaBySubdomain } from "@/lib/prisma-services/profileDesaService";

export default async function LoginPageSubdomain() {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const subdomain = host.split(".")[0];
  const desa = await getDesaBySubdomain(subdomain); // Fetch desa data if needed
  return (
    <div>
      <SubdomainLogin
        desaId={Number(desa?.id)}
        nama_desa={desa?.nama_desa ?? ""}
      />
    </div>
  );
}

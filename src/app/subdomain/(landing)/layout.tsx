import SubdomainLayout from "./SubdomainLayout";
import "../../globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SubdomainLayout>{children}</SubdomainLayout>;
}

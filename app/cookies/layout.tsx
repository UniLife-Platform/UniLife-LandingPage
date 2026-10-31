import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie Preferences & Privacy Center",
  description:
    "Choose which cookies and tokens UniLife can store on your device, see the full storage inventory, and read answers to common privacy questions.",
  path: "/cookies",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

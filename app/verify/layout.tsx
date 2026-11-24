import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Verify a Certificate",
  description:
    "Check that a UniLife volunteer or role-completion certificate is genuine by entering its serial number or scanning its QR code.",
  path: "/verify",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

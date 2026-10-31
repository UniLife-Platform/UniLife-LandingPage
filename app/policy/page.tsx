import { buildMetadata } from "@/lib/seo";
import PolicyContent from "./PolicyContent";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How UniLife collects, uses and protects your personal information.",
  path: "/policy",
});

export default function PolicyPage() {
  return <PolicyContent />;
}
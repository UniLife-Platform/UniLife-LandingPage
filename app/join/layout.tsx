import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Join UniLife",
  description:
    "Help build the digital infrastructure for African universities. Apply as a Campus Ambassador, Department Partner or Core Team Builder.",
  path: "/join",
});

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Join the UniLife Team",
  description:
    "UniLife is built by students for students. Find a role that fits, from builders to organisers, and message us. No formal CV required.",
  path: "/team",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

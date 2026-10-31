import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Child Safety Standards",
  description:
    "UniLife's zero-tolerance policy on child sexual abuse and exploitation, how to report concerns, and the actions we take on every report.",
  path: "/child-safety",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

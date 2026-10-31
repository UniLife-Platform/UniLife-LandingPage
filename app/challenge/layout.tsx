import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Campus Challenges & Innovation Sprints",
  description:
    "Join university innovation challenges, pitch to industry leaders and compete for seed grants and incubation with UniLife.",
  path: "/challenge",
});

// Re-render hourly so a passed deadline flips to "Closed" without a redeploy
export const revalidate = 3600;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

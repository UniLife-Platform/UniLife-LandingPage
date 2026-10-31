import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing & Plans",
  description:
    "Start free on UniLife and upgrade with SP when you need more. Compare plans and see how to earn SP through streaks, referrals and study.",
  path: "/pricing",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

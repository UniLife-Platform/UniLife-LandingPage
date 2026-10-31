import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Student Sponsorships & Funding",
  description:
    "Browse verified sponsorships and funding opportunities for Nigerian university students, listed on UniLife with no middleman fees.",
  path: "/sponsorships",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

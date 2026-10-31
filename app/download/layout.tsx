import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Download the UniLife App",
  description:
    "Get UniLife on Android for past questions with AI explanations, the campus marketplace, student discussions and rewards. iOS waitlist open.",
  path: "/download",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

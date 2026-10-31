import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about student verification, the campus marketplace, past questions with AI, status points and campus leadership on UniLife.",
  path: "/faq",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

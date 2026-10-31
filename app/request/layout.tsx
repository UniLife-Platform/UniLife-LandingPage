import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Request UniLife for Your Campus",
  description:
    "Want UniLife at your university? Rally your coursemates, submit a campus request and help move your school up our expansion roadmap.",
  path: "/request",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

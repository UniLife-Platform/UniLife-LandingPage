import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Partnership & Sponsorship Hub",
  description:
    "Shape the digital heartbeat of the campus. Forward-thinking brands can integrate their services or amplify their reach across the OOU student ecosystem.",
  path: "/alliances",
});

export default function AlliancesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

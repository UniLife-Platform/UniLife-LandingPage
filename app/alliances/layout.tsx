import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnership & Sponsorship Hub | UniLife",
  description:
    "Shape the digital heartbeat of the campus. Forward-thinking brands can either integrate their services or amplify their reach across the OOU student ecosystem.",
  openGraph: {
    title: "Partnership & Sponsorship Hub | UniLife",
    description:
      "Shape the digital heartbeat of the campus. Forward-thinking brands can either integrate their services or amplify their reach across the OOU student ecosystem.",
    url: "https://unilife.com.ng/alliances",
    siteName: "UniLife",
    locale: "en_NG",
    type: "website",
  },
};

export default function AlliancesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

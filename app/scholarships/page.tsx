import type { Metadata } from "next";
import SponsorshipPageContent from "@/app/sponsorships/page";

export const metadata: Metadata = {
  title: "Scholarships & Student Grants (2026) | UniLife Nigeria",
  description:
    "Explore verified corporate scholarships, university tuition grants, and financial sponsorships for Nigerian undergraduates and postgraduates with zero middleman fees.",
  alternates: {
    canonical: "https://unilife.com.ng/scholarships",
  },
  openGraph: {
    title: "Verified Student Scholarships & Grants (2026) | UniLife Nigeria",
    description:
      "Explore verified corporate scholarships, university tuition grants, and financial sponsorships for Nigerian undergraduates and postgraduates.",
    url: "https://unilife.com.ng/scholarships",
    type: "website",
    siteName: "UniLife",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verified Student Scholarships & Grants (2026) | UniLife Nigeria",
    description:
      "Explore verified corporate scholarships, university tuition grants, and financial sponsorships for Nigerian undergraduates.",
  },
};

export default function ScholarshipsPage() {
  return <SponsorshipPageContent />;
}

import { buildMetadata } from "@/lib/seo";
import ScholarshipsDirectory from "@/components/ScholarshipsDirectory";

export const metadata = buildMetadata({
  title: "Scholarships & Student Grants (2026)",
  description:
    "Explore verified corporate scholarships, university tuition grants and financial sponsorships for Nigerian undergraduates and postgraduates with zero middleman fees.",
  path: "/scholarships",
});

export default function ScholarshipsPage() {
  return <ScholarshipsDirectory activeNav="/scholarships" />;
}
import { buildMetadata } from "@/lib/seo";
import TermsContent from "./TermsContent";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The rules for using UniLife: accounts, the SP system, UniShop and your responsibilities as a member.",
  path: "/terms",
});

export default function TermsPage() {
  return <TermsContent />;
}
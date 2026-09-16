import type { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service | UniLife",
  description:
    "The rules for using UniLife — accounts, the SP system, UniShop, and your responsibilities as a member.",
};

export default function TermsPage() {
  return <TermsContent />;
}
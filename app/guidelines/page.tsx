import { buildMetadata } from "@/lib/seo";
import GuidelinesContent from "./GuidelinesContent";

export const metadata = buildMetadata({
  title: "Community Guidelines",
  description:
    "The house rules for UniLife: how we keep the platform safe, honest and useful for every student.",
  path: "/guidelines",
});

export default function GuidelinesPage() {
  return <GuidelinesContent />;
}
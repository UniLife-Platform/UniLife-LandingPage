import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sell on the UniLife Campus Marketplace",
  description:
    "Open a storefront and sell textbooks, fashion, snacks, tech or services to a verified campus audience. Founding merchant slots are limited.",
  path: "/sellers",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About UniLife",
  description:
    "UniLife merges a social network, academic tools and a verified student marketplace into one campus super-app, built by students for students.",
  path: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

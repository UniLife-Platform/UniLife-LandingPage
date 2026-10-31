import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "UniLife for Students",
  description:
    "Connect with verified classmates, access past questions, form study groups and stay inside your real university community. No randoms, no bots.",
  path: "/students",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

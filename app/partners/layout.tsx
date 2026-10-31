import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Partner With UniLife",
  description:
    "Give your department, student union or club a verified digital headquarters on UniLife to centralise announcements and engage every member.",
  path: "/partners",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

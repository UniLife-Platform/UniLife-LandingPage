import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Delete Your UniLife Account",
  description:
    "See exactly what is removed when you delete your UniLife account, what may remain visible to others, and how to submit a deletion request.",
  path: "/delete-account",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

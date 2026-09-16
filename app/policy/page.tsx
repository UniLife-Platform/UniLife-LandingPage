import type { Metadata } from "next";
import PolicyContent from "./PolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | UniLife",
  description:
    "How UniLife collects, uses, and protects your personal information.",
};

export default function PolicyPage() {
  return <PolicyContent />;
}
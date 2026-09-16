import type { Metadata } from "next";
import GuidelinesContent from "./GuidelinesContent";

export const metadata: Metadata = {
  title: "Community Guidelines | UniLife",
  description:
    "The house rules for UniLife — how we keep the platform safe, honest, and useful for every student.",
};

export default function GuidelinesPage() {
  return <GuidelinesContent />;
}
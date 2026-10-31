import { buildMetadata } from "@/lib/seo";
import ContactContent from "./ContactContent";

export const metadata = buildMetadata({
  title: "Contact UniLife",
  description:
    "Get in touch with the UniLife team. Students, sellers and school bodies are all welcome.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
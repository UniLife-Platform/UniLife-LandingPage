import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact | UniLife",
  description:
    "Get in touch with the UniLife team — students, sellers, and school bodies all welcome.",
};

export default function ContactPage() {
  return <ContactContent />;
}
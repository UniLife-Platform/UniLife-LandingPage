import type { ValidCertificate } from "@/lib/certificates";
import CertificateBold from "./CertificateBold";
import CertificateClassic from "./CertificateClassic";

export type CertificateLayout = "bold" | "classic";

/** Anything other than "bold" falls back to the classic layout. */
export function parseLayout(value: string | string[] | undefined): CertificateLayout {
  const v = Array.isArray(value) ? value[0] : value;
  return v === "bold" ? "bold" : "classic";
}

export default function Certificate({
  cert,
  layout,
}: {
  cert: ValidCertificate;
  layout: CertificateLayout;
}) {
  return layout === "bold" ? (
    <CertificateBold cert={cert} />
  ) : (
    <CertificateClassic cert={cert} />
  );
}

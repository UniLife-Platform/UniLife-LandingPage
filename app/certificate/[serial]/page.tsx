import type { Metadata } from "next";
import Link from "next/link";
import Certificate, { parseLayout } from "@/components/certificate/Certificate";
import ScaledCertificate from "@/components/certificate/ScaledCertificate";
import PrintButton from "@/components/certificate/PrintButton";
import { buildMetadata } from "@/lib/seo";
import { isValid, lookupCertificate } from "@/lib/certificates";
import { CERT_HEIGHT, CERT_WIDTH } from "@/components/certificate/shared";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ serial: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Your Certificate",
    description: "Download your UniLife certificate.",
    path: "/verify",
    noindex: true,
  });
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

// Print rules: hide everything except the certificate and print it at full A4
// landscape size with its backgrounds. The page box matches the certificate
// exactly (1123 x 794 px) so it never spills onto a second sheet.
const PRINT_CSS = `
@page { size: ${CERT_WIDTH}px ${CERT_HEIGHT}px; margin: 0; }
@media print {
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: ${CERT_WIDTH}px !important;
    height: ${CERT_HEIGHT}px !important;
    overflow: hidden !important;
    background: #ffffff !important;
  }
  body * { visibility: hidden !important; }
  #cert-print, #cert-print * { visibility: visible !important; }
  #cert-print {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: ${CERT_WIDTH}px !important;
    height: ${CERT_HEIGHT}px !important;
    overflow: hidden !important;
  }
  .cert-fit { width: ${CERT_WIDTH}px !important; height: ${CERT_HEIGHT}px !important; max-width: none !important; }
  .cert-stage { transform: none !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}
`;

export default async function CertificatePrintPage({ params, searchParams }: Props) {
  const { serial } = await params;
  const query = await searchParams;
  const layout = parseLayout(query.layout);
  const autoPrint = query.print === "1";

  const result = await lookupCertificate(safeDecode(serial).slice(0, 40));
  const cert = result.kind === "found" && isValid(result.certificate) ? result.certificate : null;

  if (!cert) {
    return (
      <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-body flex items-center justify-center px-6">
        <div className="max-w-[480px] text-center">
          <h1 className="font-display text-4xl uppercase mb-4">Certificate unavailable</h1>
          <p className="text-[var(--ink-secondary)] mb-6">
            We couldn&apos;t find a valid certificate for this link.
          </p>
          <Link href="/verify" className="underline font-semibold">
            Go to certificate verification
          </Link>
        </div>
      </main>
    );
  }

  const other = layout === "classic" ? "bold" : "classic";
  const base = `/certificate/${encodeURIComponent(cert.serial)}`;

  return (
    <main className="min-h-screen bg-[var(--paper-subtle)] text-[var(--ink)] font-body">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      <div className="max-w-[1123px] mx-auto px-4 sm:px-6 pt-6 pb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/verify/${encodeURIComponent(cert.serial)}`}
          className="text-sm font-semibold underline underline-offset-4"
        >
          &larr; Back to verification
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`${base}?layout=${other}`}
            className="rounded-full border border-[var(--border-strong)] px-4 py-2 text-sm font-semibold hover:bg-[var(--paper)] transition-colors"
          >
            Switch to {other} layout
          </Link>
          <PrintButton autoPrint={autoPrint} />
        </div>
      </div>

      <div className="max-w-[1123px] mx-auto px-4 sm:px-6 pb-10">
        <div id="cert-print" className="bg-white shadow-md">
          <ScaledCertificate>
            <Certificate cert={cert} layout={layout} />
          </ScaledCertificate>
        </div>
        <p className="mt-4 text-sm text-[var(--ink-muted)]">
          In the print window, choose &ldquo;Save as PDF&rdquo;, set margins to None, and turn on
          &ldquo;Background graphics&rdquo; if your browser shows that option.
        </p>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Certificate from "@/components/certificate/Certificate";
import ScaledCertificate from "@/components/certificate/ScaledCertificate";
import { buildMetadata } from "@/lib/seo";
import {
  formatIssuedLong,
  formatPeriod,
  isValid,
  lookupCertificate,
  normalizeSerial,
  type ValidCertificate,
} from "@/lib/certificates";
import { ShieldCheck, AlertCircle, Download, Search } from "lucide-react";

// Always check the database; a certificate can be revoked at any time.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ serial: string }> };

// Generic on purpose: individual certificates are not indexed and their
// holders' names never go into page titles or link previews.
export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Certificate Verification",
    description: "Verify a UniLife certificate.",
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

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--paper)] text-[var(--ink)] min-h-screen overflow-x-clip font-body antialiased">
      <Nav active="/verify" />
      <section className="pt-24 pb-24 px-6 md:px-16 max-w-[1160px] mx-auto">{children}</section>
      <Footer />
    </div>
  );
}

function StatusCard({
  tone,
  title,
  children,
}: {
  tone: "bad" | "warn";
  title: string;
  children: React.ReactNode;
}) {
  const color = tone === "bad" ? "var(--accent-pink-text)" : "var(--ink-secondary)";
  return (
    <div className="max-w-[640px] mx-auto text-center">
      <div
        className="mx-auto mb-6 w-14 h-14 rounded-full flex items-center justify-center border-2"
        style={{ borderColor: color, color }}
      >
        <AlertCircle size={28} aria-hidden="true" />
      </div>
      <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] uppercase mb-4 leading-[1.05]">
        {title}
      </h1>
      <div className="text-[var(--ink-secondary)] text-lg leading-relaxed">{children}</div>
      <div className="mt-8">
        <Link
          href="/verify"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-semibold hover:bg-[var(--paper-subtle)] transition-colors"
        >
          <Search size={16} aria-hidden="true" />
          Check another certificate
        </Link>
      </div>
    </div>
  );
}

function statement(c: ValidCertificate): string {
  return c.type === "volunteer"
    ? `${c.recipient_name} served as a volunteer with UniLife as ${c.title} at ${c.org_unit}.`
    : `${c.recipient_name} successfully completed the role of ${c.title} in the ${c.org_unit} team at UniLife.`;
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="py-3.5 border-b border-[var(--border-light)] last:border-b-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-6">
      <dt className="font-mono text-xs tracking-widest uppercase text-[var(--ink-muted)] sm:w-44 shrink-0">
        {label}
      </dt>
      <dd className={`${mono ? "font-mono tracking-wide" : "font-semibold"} break-words`}>{value}</dd>
    </div>
  );
}

export default async function VerifyResultPage({ params }: Props) {
  const { serial: rawParam } = await params;
  const typed = safeDecode(rawParam).slice(0, 40);
  const result = await lookupCertificate(typed);

  if (result.kind === "not_configured" || result.kind === "error") {
    return (
      <Shell>
        <StatusCard tone="warn" title="Verification unavailable">
          <p>
            We couldn&apos;t check this certificate right now. Please try again in a few minutes, or
            email{" "}
            <a className="underline" href="mailto:hello@unilife.com.ng">
              hello@unilife.com.ng
            </a>
            .
          </p>
        </StatusCard>
      </Shell>
    );
  }

  if (result.kind === "not_found") {
    return (
      <Shell>
        <StatusCard tone="bad" title="No certificate found">
          <p>
            We have no certificate with the serial number{" "}
            <span className="font-mono text-[var(--ink)] break-all">{normalizeSerial(typed)}</span>.
            Check for typing mistakes (the letters I and O are never used) and try again.
          </p>
          <p className="mt-3 text-base">
            If you were given this certificate and think it should be genuine, email{" "}
            <a className="underline" href="mailto:hello@unilife.com.ng">
              hello@unilife.com.ng
            </a>
            .
          </p>
        </StatusCard>
      </Shell>
    );
  }

  const cert = result.certificate;

  if (cert.status === "revoked") {
    return (
      <Shell>
        <StatusCard tone="bad" title="This certificate has been revoked">
          <p>
            UniLife issued certificate{" "}
            <span className="font-mono text-[var(--ink)]">{cert.serial}</span> on{" "}
            {formatIssuedLong(cert.issued_at)}
            {cert.revoked_at ? `, and withdrew it on ${formatIssuedLong(cert.revoked_at.slice(0, 10))}` : ""}
            . It should no longer be accepted as valid.
          </p>
          <p className="mt-3 text-base">
            Questions? Email{" "}
            <a className="underline" href="mailto:hello@unilife.com.ng">
              hello@unilife.com.ng
            </a>
            .
          </p>
        </StatusCard>
      </Shell>
    );
  }

  if (!isValid(cert)) {
    // A "valid" record with missing fields should never happen; don't vouch for it.
    return (
      <Shell>
        <StatusCard tone="warn" title="Verification unavailable">
          <p>
            This record is incomplete. Please email{" "}
            <a className="underline" href="mailto:hello@unilife.com.ng">
              hello@unilife.com.ng
            </a>{" "}
            with the serial number.
          </p>
        </StatusCard>
      </Shell>
    );
  }

  const typeLabel = cert.type === "volunteer" ? "Volunteer certificate" : "Role completion certificate";
  const titleLabel = cert.type === "volunteer" ? "Volunteered as" : "Role completed";
  const unitLabel = cert.type === "volunteer" ? "Campus" : "Team";
  const downloadHref = (layout: "classic" | "bold") =>
    `/certificate/${encodeURIComponent(cert.serial)}?layout=${layout}&print=1`;

  return (
    <Shell>
      {/* The answer a recruiter needs, first. */}
      <div className="max-w-[760px] mx-auto text-center">
        <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs tracking-widest uppercase bg-[rgba(52,211,153,0.18)] text-[#047857] dark:text-[#6ee7b7] mb-6">
          <ShieldCheck size={15} aria-hidden="true" />
          Verified by UniLife
        </span>
        <h1 className="font-display text-[clamp(2.2rem,5.5vw,3.8rem)] uppercase mb-5 leading-[1.05]">
          This certificate is genuine
        </h1>
        <p className="text-lg md:text-xl leading-relaxed text-[var(--ink-secondary)]">
          {statement(cert)}
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] items-start">
        <dl className="rounded-3xl border border-[var(--border-light)] bg-[var(--card-bg)] px-6 py-2">
          <Row label="Recipient" value={cert.recipient_name} />
          <Row label="Certificate" value={typeLabel} />
          <Row label={titleLabel} value={cert.title} />
          <Row label={unitLabel} value={cert.org_unit} />
          <Row label="Period" value={formatPeriod(cert.period_start, cert.period_end)} />
          <Row label="Issued" value={formatIssuedLong(cert.issued_at)} />
          <Row label="Signed by" value={`${cert.signatory_name}, ${cert.signatory_title}`} />
          <Row label="Serial number" value={cert.serial} mono />
        </dl>

        <div className="min-w-0">
          <div className="rounded-2xl overflow-hidden border border-[var(--border-light)] bg-white shadow-sm">
            <ScaledCertificate>
              <Certificate cert={cert} layout="classic" />
            </ScaledCertificate>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={downloadHref("classic")}
              className="inline-flex items-center gap-2 rounded-full bg-[#14151A] text-[#F6F2E7] px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Download size={16} strokeWidth={2.4} aria-hidden="true" />
              Download classic PDF
            </a>
            <a
              href={downloadHref("bold")}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-semibold hover:bg-[var(--paper-subtle)] transition-colors"
            >
              <Download size={16} strokeWidth={2.4} aria-hidden="true" />
              Download bold PDF
            </a>
          </div>
          <p className="mt-3 text-sm text-[var(--ink-muted)]">
            In the print window that opens, choose &ldquo;Save as PDF&rdquo;.
          </p>
        </div>
      </div>
    </Shell>
  );
}

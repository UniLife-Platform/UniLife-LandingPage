import { getSupabaseClient } from "@/lib/supabase/client";

export type CertificateType = "volunteer" | "role_completion";
export type CertificateStatus = "valid" | "revoked";

/** What the public verify function returns. Never includes the email. */
export type CertificateRecord = {
  serial: string;
  type: CertificateType;
  status: CertificateStatus;
  // These are null when the certificate has been revoked.
  recipient_name: string | null;
  title: string | null;
  org_unit: string | null;
  period_start: string | null; // ISO date (YYYY-MM-DD)
  period_end: string | null;
  issued_at: string; // ISO date
  signatory_name: string | null;
  signatory_title: string | null;
  revoked_at: string | null;
};

/** A certificate that is valid, with every printed field present. */
export type ValidCertificate = CertificateRecord & {
  status: "valid";
  recipient_name: string;
  title: string;
  org_unit: string;
  period_start: string;
  period_end: string;
  signatory_name: string;
  signatory_title: string;
};

export function isValid(c: CertificateRecord): c is ValidCertificate {
  return (
    c.status === "valid" &&
    !!c.recipient_name &&
    !!c.title &&
    !!c.org_unit &&
    !!c.period_start &&
    !!c.period_end &&
    !!c.signatory_name &&
    !!c.signatory_title
  );
}

export type LookupResult =
  | { kind: "found"; certificate: CertificateRecord }
  | { kind: "not_found" }
  | { kind: "not_configured" }
  | { kind: "error" };

const SERIAL_PATTERN = /^UL-(VOL|ROLE)-\d{2}-[A-Z0-9]{6}$/;

/** Tidy what a person typed or scanned: trim, upper-case, swap slashes/spaces for dashes. */
export function normalizeSerial(input: string): string {
  return input
    .trim()
    .toUpperCase()
    .replace(/[\s/_]+/g, "-");
}

export function looksLikeSerial(input: string): boolean {
  return SERIAL_PATTERN.test(normalizeSerial(input));
}

export async function lookupCertificate(rawSerial: string): Promise<LookupResult> {
  const serial = normalizeSerial(rawSerial);
  if (!SERIAL_PATTERN.test(serial)) return { kind: "not_found" };

  const supabase = getSupabaseClient();
  if (!supabase) return { kind: "not_configured" };

  const { data, error } = await supabase.rpc("verify_certificate", {
    p_serial: serial,
  });

  if (error) return { kind: "error" };
  const rows = (data as CertificateRecord[] | null) ?? [];
  if (rows.length === 0) return { kind: "not_found" };
  return { kind: "found", certificate: rows[0] };
}

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d };
}

/** "Mar 2026 – Nov 2026" */
export function formatPeriod(startIso: string, endIso: string): string {
  const s = parts(startIso);
  const e = parts(endIso);
  return `${MONTHS_SHORT[s.m]} ${s.y} – ${MONTHS_SHORT[e.m]} ${e.y}`;
}

/** "24 NOV 2026" (the certificates print this in capitals) */
export function formatIssuedShort(iso: string): string {
  const { y, m, d } = parts(iso);
  return `${d} ${MONTHS_SHORT[m].toUpperCase()} ${y}`;
}

/** "24 November 2026" */
export function formatIssuedLong(iso: string): string {
  const { y, m, d } = parts(iso);
  return `${d} ${MONTHS_LONG[m]} ${y}`;
}

export const VERIFY_BASE_URL = "https://unilife.com.ng/verify";

export function verifyUrl(serial: string): string {
  return `${VERIFY_BASE_URL}/${serial}`;
}

import { Mrs_Saint_Delafield } from "next/font/google";
import type { CertificateType } from "@/lib/certificates";

// Handwriting-style font used for the typed founder signature.
const signatureFont = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
export const SIGNATURE_FONT = signatureFont.style.fontFamily;

// The site already loads these three families as CSS variables (app/layout.tsx).
export const DISPLAY = "var(--font-anton), 'Anton', sans-serif";
export const BODY = "var(--font-work-sans), 'Work Sans', sans-serif";
export const MONO = "var(--font-plex-mono), 'IBM Plex Mono', monospace";

// Certificates are always printed on light paper, so these never switch with dark mode.
export const INK = "#14151A";
export const INK_SECONDARY = "#46473f";
export const INK_MUTED = "#66665b";
export const PAPER = "#F6F2E7";
export const NIGHT = "#0A0A0C";
export const PINK = "#ff3d81";
export const BLUE = "#4f7fff";
export const YELLOW = "#FFD23F";

/** A4 landscape at 96 dpi. */
export const CERT_WIDTH = 1123;
export const CERT_HEIGHT = 794;

export const THEME: Record<
  CertificateType,
  { accent: string; accentText: string; second: string }
> = {
  volunteer: { accent: BLUE, accentText: "#2f5bd8", second: YELLOW },
  role_completion: { accent: PINK, accentText: "#c4144f", second: BLUE },
};

export const COPY: Record<
  CertificateType,
  {
    pill: string;
    eyebrow: string;
    boldTitle: string;
    boldDescription: string;
    boldLabels: [string, string, string];
    classicBrandLabel: string;
    classicTitle: string;
    classicStatement: string;
    classicDescription: string;
    classicLabels: [string, string, string];
  }
> = {
  volunteer: {
    pill: "VOLUNTEER",
    eyebrow: "CERTIFICATE OF SERVICE",
    boldTitle: "Volunteer",
    boldDescription:
      "In recognition of their time, effort and commitment as a volunteer with UniLife, helping make campus life better for students.",
    boldLabels: ["VOLUNTEERED AS", "CAMPUS", "PERIOD"],
    classicBrandLabel: "Volunteers",
    classicTitle: "Certificate of Volunteer Service",
    classicStatement: "has successfully served as a volunteer with UniLife",
    classicDescription:
      "In recognition of their time, effort and commitment, helping make campus life better for students.",
    classicLabels: ["VOLUNTEERED AS", "CAMPUS", "PERIOD"],
  },
  role_completion: {
    pill: "ROLE COMPLETION",
    eyebrow: "CERTIFICATE OF COMPLETION",
    boldTitle: "Role Completed",
    boldDescription:
      "For successfully completing their role at UniLife, delivering the responsibilities of the position with commitment and follow-through.",
    boldLabels: ["ROLE COMPLETED", "DEPARTMENT", "DURATION"],
    classicBrandLabel: "Team",
    classicTitle: "Certificate of Completion",
    classicStatement: "has successfully completed their role at UniLife",
    classicDescription:
      "By completing this role, the above-named team member has met the responsibilities and standards of the position.",
    classicLabels: ["ROLE COMPLETED", "TEAM", "PERIOD"],
  },
};

/** Shrinks long names so they stay on one line inside the certificate. */
export function fitFontSize(text: string, base: number, maxChars: number): number {
  if (text.length <= maxChars) return base;
  return Math.max(Math.round(base * 0.55), Math.floor((base * maxChars) / text.length));
}

export function Seal({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        border: `3px solid ${color}`,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(-8deg)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 84,
          height: 84,
          borderRadius: 42,
          border: `1.5px dashed ${color}`,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 12.5l5 5L20 6.5" />
        </svg>
        <span
          style={{
            fontFamily: DISPLAY,
            fontSize: 17,
            letterSpacing: "0.06em",
            lineHeight: 1,
            color,
          }}
        >
          VERIFIED
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: "0.1em",
            lineHeight: 1,
            fontWeight: 600,
            color,
          }}
        >
          UNILIFE
        </span>
      </div>
    </div>
  );
}

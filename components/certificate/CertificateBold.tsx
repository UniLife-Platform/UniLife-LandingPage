import type { CSSProperties } from "react";
import {
  formatIssuedShort,
  formatPeriod,
  verifyUrl,
  type ValidCertificate,
} from "@/lib/certificates";
import {
  BODY,
  COPY,
  CERT_HEIGHT,
  CERT_WIDTH,
  DISPLAY,
  INK,
  INK_MUTED,
  INK_SECONDARY,
  MONO,
  NIGHT,
  PAPER,
  PINK,
  BLUE,
  SIGNATURE_FONT,
  THEME,
  YELLOW,
  Seal,
  fitFontSize,
} from "./shared";
import VerifyQr from "./VerifyQr";

const monoLabel: CSSProperties = {
  fontFamily: MONO,
  fontSize: 12,
  letterSpacing: "0.16em",
  color: INK_MUTED,
};

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        borderTop: `2px solid ${INK}`,
        paddingTop: 8,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        minWidth: 0,
      }}
    >
      <span style={monoLabel}>{label}</span>
      <span style={{ fontSize: 18, fontWeight: 700, overflowWrap: "anywhere" }}>{value}</span>
    </div>
  );
}

/** The poster-style certificate (A4 landscape, 1123 x 794 px). */
export default function CertificateBold({ cert }: { cert: ValidCertificate }) {
  const theme = THEME[cert.type];
  const copy = COPY[cert.type];
  const url = verifyUrl(cert.serial);
  const nameSize = fitFontSize(cert.recipient_name, 58, 24);

  return (
    <div
      style={{
        width: CERT_WIDTH,
        height: CERT_HEIGHT,
        boxSizing: "border-box",
        padding: 24,
        background: PAPER,
        color: INK,
        fontFamily: BODY,
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          minHeight: 0,
          border: `2px solid ${INK}`,
          display: "flex",
          flexDirection: "row",
          background: PAPER,
        }}
      >
        {/* Left band */}
        <div
          style={{
            width: 72,
            flexShrink: 0,
            background: NIGHT,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "26px 0 28px 0",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon.png"
            alt="UniLife logo"
            width={40}
            height={40}
            style={{ width: 40, height: 40, borderRadius: 9, objectFit: "cover" }}
          />
          <div
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.22em",
              color: PAPER,
              whiteSpace: "nowrap",
            }}
          >
            UNILIFE · BUILT BY STUDENTS, FOR STUDENTS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ width: 14, height: 14, background: PINK }} />
            <div style={{ width: 14, height: 14, background: BLUE }} />
            <div style={{ width: 14, height: 14, background: YELLOW }} />
          </div>
        </div>

        {/* Main */}
        <div style={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              height: 12,
              background: theme.accent,
              borderBottom: `2px solid ${INK}`,
              flexShrink: 0,
            }}
          />

          <div
            style={{
              flexGrow: 1,
              minHeight: 0,
              padding: "30px 48px 30px 48px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 26,
                    letterSpacing: "0.04em",
                    lineHeight: 1,
                  }}
                >
                  UNILIFE
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    background: theme.accent,
                    color: INK,
                    padding: "5px 12px",
                    border: `2px solid ${INK}`,
                    fontWeight: 600,
                  }}
                >
                  {copy.pill}
                </span>
              </div>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  color: INK_SECONDARY,
                }}
              >
                CERT NO. {cert.serial}
              </span>
            </div>

            {/* Title */}
            <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 4 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 14,
                  letterSpacing: "0.26em",
                  color: theme.accentText,
                  fontWeight: 600,
                }}
              >
                {copy.eyebrow}
              </span>
              <div
                role="heading"
                aria-level={1}
                style={{
                  margin: 0,
                  fontFamily: DISPLAY,
                  fontWeight: 400,
                  fontSize: 112,
                  lineHeight: 1,
                  letterSpacing: "0.01em",
                  textTransform: "uppercase",
                  color: INK,
                }}
              >
                {copy.boldTitle}
              </div>
            </div>

            {/* Recipient */}
            <div
              style={{
                marginTop: 22,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 16, color: INK_SECONDARY }}>
                This certificate is proudly presented to
              </span>
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: nameSize,
                  lineHeight: 1.12,
                  textTransform: "uppercase",
                  background: YELLOW,
                  padding: "0 16px",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {cert.recipient_name}
              </span>
            </div>

            <p
              style={{
                margin: "18px 0 0 0",
                maxWidth: 700,
                fontSize: 17,
                lineHeight: 1.55,
                color: INK_SECONDARY,
              }}
            >
              {copy.boldDescription}
            </p>

            {/* Details */}
            <div
              style={{
                marginTop: 22,
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                columnGap: 28,
              }}
            >
              <Detail label={copy.boldLabels[0]} value={cert.title} />
              <Detail label={copy.boldLabels[1]} value={cert.org_unit} />
              <Detail
                label={copy.boldLabels[2]}
                value={formatPeriod(cert.period_start, cert.period_end)}
              />
            </div>

            <div style={{ flexGrow: 1 }} />

            {/* Footer */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 24,
              }}
            >
              {/* Signature */}
              <div style={{ width: 230, display: "flex", flexDirection: "column", gap: 4 }}>
                <div
                  style={{
                    height: 44,
                    display: "flex",
                    alignItems: "flex-end",
                    fontFamily: SIGNATURE_FONT,
                    fontSize: 50,
                    lineHeight: 0.8,
                    whiteSpace: "nowrap",
                  }}
                >
                  {cert.signatory_name}
                </div>
                <div
                  style={{
                    borderTop: `2px solid ${INK}`,
                    paddingTop: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{cert.signatory_name}</span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      color: INK_MUTED,
                      textTransform: "uppercase",
                    }}
                  >
                    {cert.signatory_title}
                  </span>
                </div>
              </div>

              <Seal color={theme.accentText} />

              {/* Verify block */}
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 104,
                    height: 104,
                    flexShrink: 0,
                    boxSizing: "border-box",
                    border: `2px solid ${INK}`,
                    background: "#FFFFFF",
                    padding: 7,
                  }}
                >
                  <VerifyQr url={url} size={86} label="QR code that opens the verification page" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 12,
                      letterSpacing: "0.14em",
                      color: INK_MUTED,
                    }}
                  >
                    SCAN OR VISIT TO VERIFY
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600 }}>
                    unilife.com.ng/verify
                  </span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 12,
                      letterSpacing: "0.14em",
                      color: INK_MUTED,
                      marginTop: 6,
                    }}
                  >
                    CERTIFICATE ID
                  </span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 17,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {cert.serial}
                  </span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      color: INK_SECONDARY,
                    }}
                  >
                    ISSUED {formatIssuedShort(cert.issued_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

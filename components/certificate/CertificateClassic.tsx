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

function Cell({
  label,
  value,
  divider,
}: {
  label: string;
  value: string;
  divider?: boolean;
}) {
  return (
    <div
      style={{
        padding: "11px 8px",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        minWidth: 0,
        ...(divider
          ? {
              borderLeft: "1px solid rgba(20,21,26,0.25)",
              borderRight: "1px solid rgba(20,21,26,0.25)",
            }
          : {}),
      }}
    >
      <span style={monoLabel}>{label}</span>
      <span style={{ fontSize: 18, fontWeight: 700, overflowWrap: "anywhere" }}>{value}</span>
    </div>
  );
}

/** The classic certificate (A4 landscape, 1123 x 794 px). */
export default function CertificateClassic({ cert }: { cert: ValidCertificate }) {
  const theme = THEME[cert.type];
  const copy = COPY[cert.type];
  const url = verifyUrl(cert.serial);
  const nameSize = fitFontSize(cert.recipient_name, 54, 28);

  return (
    <div
      style={{
        position: "relative",
        width: CERT_WIDTH,
        height: CERT_HEIGHT,
        boxSizing: "border-box",
        background: "#FFFFFF",
        color: INK,
        fontFamily: BODY,
        overflow: "hidden",
        textAlign: "left",
      }}
    >
      {/* Frame */}
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 20,
          right: 20,
          bottom: 20,
          border: `2px solid ${INK}`,
          overflow: "hidden",
          background: "#FFFFFF",
        }}
      >
        {/* Corner shapes */}
        <svg
          width="1079"
          height="750"
          viewBox="0 0 1079 750"
          style={{ position: "absolute", left: 0, top: 0 }}
          aria-hidden="true"
        >
          <polygon points="0,0 150,0 0,380" fill={theme.accent} />
          <polygon points="164,0 180,0 30,380 14,380" fill={theme.second} />
          <polygon points="1079,750 929,750 1079,370" fill={theme.accent} />
          <polygon points="915,750 899,750 1049,370 1065,370" fill={theme.second} />
        </svg>

        {/* Watermark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 289,
            top: 140,
            width: 500,
            height: 500,
            borderRadius: 110,
            objectFit: "cover",
            opacity: 0.05,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            boxSizing: "border-box",
            padding: "40px 56px 36px 56px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Logo lockup */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon.png"
              alt="UniLife logo"
              width={50}
              height={50}
              style={{ width: 50, height: 50, borderRadius: 11, objectFit: "cover" }}
            />
            <span
              style={{
                fontFamily: DISPLAY,
                fontSize: 32,
                letterSpacing: "0.05em",
                lineHeight: 1,
              }}
            >
              UNILIFE
            </span>
            <div style={{ width: 2, height: 36, background: INK }} />
            <span style={{ fontSize: 20, fontWeight: 500 }}>{copy.classicBrandLabel}</span>
          </div>

          <div
            role="heading"
            aria-level={1}
            style={{
              margin: "24px 0 0 0",
              fontSize: 52,
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: INK,
            }}
          >
            {copy.classicTitle}
          </div>

          {/* Ornament */}
          <div
            style={{
              marginTop: 14,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 46, height: 2, background: INK }} />
            <div style={{ width: 9, height: 9, background: PINK }} />
            <div style={{ width: 9, height: 9, background: BLUE }} />
            <div style={{ width: 9, height: 9, background: YELLOW }} />
            <div style={{ width: 46, height: 2, background: INK }} />
          </div>

          <div style={{ marginTop: 16, fontSize: 18, color: INK_SECONDARY }}>
            This is to certify that
          </div>

          <div
            style={{
              marginTop: 4,
              fontSize: nameSize,
              fontWeight: 700,
              lineHeight: 1.2,
              padding: "0 14px",
              background: `linear-gradient(transparent 64%, ${YELLOW} 64%)`,
              whiteSpace: "nowrap",
            }}
          >
            {cert.recipient_name}
          </div>

          <div style={{ marginTop: 10, fontSize: 23, lineHeight: 1.3 }}>
            {copy.classicStatement}
          </div>

          <p
            style={{
              margin: "10px 0 0 0",
              maxWidth: 700,
              fontSize: 17,
              lineHeight: 1.55,
              color: INK_SECONDARY,
            }}
          >
            {copy.classicDescription}
          </p>

          {/* Details strip */}
          <div
            style={{
              marginTop: 20,
              width: 800,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              borderTop: `2px solid ${INK}`,
              borderBottom: `2px solid ${INK}`,
              textAlign: "left",
            }}
          >
            <Cell label={copy.classicLabels[0]} value={cert.title} />
            <Cell label={copy.classicLabels[1]} value={cert.org_unit} divider />
            <Cell
              label={copy.classicLabels[2]}
              value={formatPeriod(cert.period_start, cert.period_end)}
            />
          </div>

          <div style={{ flexGrow: 1 }} />

          {/* Footer row */}
          <div
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "0 180px 0 0",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            {/* Verify */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  flexShrink: 0,
                  boxSizing: "border-box",
                  border: `2px solid ${INK}`,
                  background: "#FFFFFF",
                  padding: 6,
                }}
              >
                <VerifyQr url={url} size={80} label="QR code that opens the verification page" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    color: INK_MUTED,
                  }}
                >
                  SERIAL NUMBER
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 17,
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    color: theme.accentText,
                  }}
                >
                  {cert.serial}
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
                  SCAN OR VISIT TO VERIFY
                </span>
                <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 500 }}>
                  unilife.com.ng/verify
                </span>
              </div>
            </div>

            {/* Signature */}
            <div style={{ width: 240, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  height: 58,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  fontFamily: SIGNATURE_FONT,
                  fontSize: 58,
                  lineHeight: 0.8,
                  color: INK,
                  whiteSpace: "nowrap",
                }}
              >
                {cert.signatory_name}
              </div>
              <div style={{ width: "100%", borderTop: `2px solid ${INK}`, marginTop: 2 }} />
              <div style={{ marginTop: 6, fontSize: 16, fontWeight: 700 }}>
                {cert.signatory_name}
              </div>
              <div style={{ fontSize: 15, color: INK_SECONDARY }}>{cert.signatory_title}</div>
            </div>

            {/* Seal + date */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Seal color={theme.accentText} />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  color: INK_SECONDARY,
                  whiteSpace: "nowrap",
                }}
              >
                PRESENTED {formatIssuedShort(cert.issued_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

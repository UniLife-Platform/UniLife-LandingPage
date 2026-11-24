"use client";

import { QRCodeSVG } from "qrcode.react";

/** Real QR code that opens the verification page for this certificate's serial. */
export default function VerifyQr({
  url,
  size,
  label,
}: {
  url: string;
  size: number;
  label: string;
}) {
  return (
    <QRCodeSVG
      value={url}
      size={size}
      level="M"
      marginSize={0}
      bgColor="#FFFFFF"
      fgColor="#14151A"
      title={label}
    />
  );
}

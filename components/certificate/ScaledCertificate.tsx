"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CERT_HEIGHT, CERT_WIDTH } from "./shared";

/**
 * Shrinks the fixed-size (1123 x 794) certificate to fit the available width on
 * screen. When printing, the page CSS in /certificate/[serial] resets the scale
 * (.cert-fit / .cert-stage) so the PDF comes out at full A4 landscape size.
 */
export default function ScaledCertificate({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / CERT_WIDTH));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="cert-fit"
      style={{ width: "100%", maxWidth: CERT_WIDTH, height: CERT_HEIGHT * scale }}
    >
      <div
        className="cert-stage"
        style={{
          width: CERT_WIDTH,
          height: CERT_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

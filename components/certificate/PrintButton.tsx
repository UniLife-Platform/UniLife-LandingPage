"use client";

import { useEffect } from "react";
import { Download } from "lucide-react";

/**
 * "Download PDF" opens the browser's print dialog, where "Save as PDF" is the
 * destination. With autoPrint the dialog opens by itself once fonts are ready,
 * which is what the Download buttons on the verify page use.
 */
export default function PrintButton({ autoPrint = false }: { autoPrint?: boolean }) {
  useEffect(() => {
    if (!autoPrint) return;
    let cancelled = false;
    const run = async () => {
      try {
        await document.fonts.ready;
      } catch {
        /* fonts API unavailable: print anyway */
      }
      // Small pause so the scaled preview and QR code have painted.
      setTimeout(() => {
        if (!cancelled) window.print();
      }, 400);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [autoPrint]);

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-[#14151A] text-[#F6F2E7] px-5 py-2.5 text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
    >
      <Download size={16} strokeWidth={2.4} aria-hidden="true" />
      Download PDF
    </button>
  );
}

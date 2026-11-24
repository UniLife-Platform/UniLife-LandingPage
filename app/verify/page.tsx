"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ShieldCheck, Search, AlertCircle } from "lucide-react";
import { looksLikeSerial, normalizeSerial } from "@/lib/certificates";

export default function VerifyPage() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const serial = normalizeSerial(value);
    if (!looksLikeSerial(serial)) {
      setError("That doesn't look like a UniLife serial number. It looks like UL-VOL-26-7K2QX9.");
      return;
    }
    setError("");
    router.push(`/verify/${encodeURIComponent(serial)}`);
  }

  return (
    <div className="bg-[var(--paper)] text-[var(--ink)] min-h-screen overflow-x-clip font-body antialiased">
      <Nav active="/verify" />

      <section className="pt-24 pb-24 px-6 md:px-16 max-w-[760px] mx-auto">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--ink-secondary)] bg-[var(--card-bg)] border border-[var(--border-light)] px-4 py-1.5 rounded-full mb-6 uppercase">
            <ShieldCheck size={14} aria-hidden="true" />
            Certificate verification
          </span>
          <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] uppercase mb-5 leading-[1.02]">
            Verify a UniLife certificate
          </h1>
          <p className="text-[var(--ink-secondary)] text-lg leading-relaxed max-w-[560px] mx-auto mb-10">
            Enter the serial number printed on the certificate, or scan the QR code on it. We&apos;ll
            confirm whether UniLife issued it.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="serial" className="sr-only">
              Certificate serial number
            </label>
            <input
              id="serial"
              name="serial"
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError("");
              }}
              placeholder="UL-VOL-26-7K2QX9"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "serial-error" : undefined}
              className="w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--card-bg)] px-5 py-4 font-mono text-base tracking-wide text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none focus:border-[var(--focus-ring)] focus:ring-2 focus:ring-[var(--focus-ring)]"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#14151A] text-[#F6F2E7] px-7 py-4 font-semibold cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Search size={18} strokeWidth={2.4} aria-hidden="true" />
            Verify
          </button>
        </form>

        {error && (
          <p
            id="serial-error"
            role="alert"
            className="mt-4 flex items-start gap-2 text-sm text-[var(--accent-pink-text)]"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}

        <p className="mt-8 text-sm text-[var(--ink-muted)] text-center">
          The serial number is at the bottom of the certificate, next to the QR code.
        </p>
      </section>

      <Footer />
    </div>
  );
}

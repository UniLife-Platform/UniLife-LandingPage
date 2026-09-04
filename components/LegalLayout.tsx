"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const WHATSAPP_URL = "https://wa.me/2348164670694";

export function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-[64px_1fr] gap-4 md:gap-8 py-9 border-b border-[rgba(20,21,26,0.08)] last:border-b-0"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="font-mono text-[0.75rem] font-bold text-[#8a8a7f] tracking-widest uppercase pt-1">
        {number}
      </div>
      <div>
        <h2 className="font-display text-xl md:text-2xl uppercase mb-4 leading-tight text-[#14151A]">
          {title}
        </h2>
        <div className="legal-prose text-[#46473f] text-[0.98rem] leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export function Sub({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-5">
      <h3 className="font-bold text-[0.95rem] text-[#14151A] mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2 mt-3 mb-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#FFD23F] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LegalLayout({
  active,
  kicker,
  title,
  intro,
  effectiveDate,
  lastUpdated,
  heroImage,
  heroImageAlt,
  badge,
  children,
  ctaTitle,
  ctaBody,
}: {
  active: string;
  kicker: string;
  title: string;
  intro: string;
  effectiveDate: string;
  lastUpdated: string;
  heroImage: string;
  heroImageAlt: string;
  badge: { label: string; value: string };
  children: ReactNode;
  ctaTitle: string;
  ctaBody: string;
}) {
  return (
    <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased">
      <Nav active={active} />

      {/* ---- PAGE HEAD & HERO IMAGE ---- */}
      <section className="pt-24 pb-16 px-6 md:px-16 max-w-[1160px] mx-auto">
        <div className="text-center max-w-[820px] mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
              {kicker}
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase mb-6 leading-[1.02] text-[#14151A]">
              {title}
            </h1>
            <p className="text-[#46473f] text-lg md:text-xl leading-relaxed max-w-[680px] mx-auto mb-8">
              {intro}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="font-mono text-[0.74rem] px-4 py-2 rounded-full border border-[rgba(20,21,26,0.12)] text-[#8a8a7f] bg-white">
                Effective <b className="text-[#14151A]">{effectiveDate}</b>
              </span>
              <span className="font-mono text-[0.74rem] px-4 py-2 rounded-full border border-[rgba(20,21,26,0.12)] text-[#8a8a7f] bg-white">
                Updated <b className="text-[#14151A]">{lastUpdated}</b>
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full h-[30vh] md:h-[42vh] rounded-[32px] overflow-hidden shadow-2xl relative bg-[#EFE9D9]"
        >
          <img
            src={heroImage}
            alt={heroImageAlt}
            className="w-full h-full object-cover"
          />

          <motion.div
            className="absolute bottom-5 left-5 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-[rgba(20,21,26,0.12)] max-w-[240px]"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="flex justify-between font-mono text-[0.65rem] text-[#8a8a7f] mb-2 font-semibold uppercase">
              <span>{badge.label}</span>
            </div>
            <div className="bg-[#f4f6fc] p-3 rounded-xl border-l-4 border-[#4f7fff]">
              <div className="text-[0.85rem] text-[#14151A] leading-snug font-medium">
                {badge.value}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ---- CONTENT CARD ---- */}
      <section className="pb-16 px-6 md:px-16 max-w-[1160px]  mx-auto">
        <div className="bg-white border border-[rgba(20,21,26,0.12)] rounded-[32px] p-8 md:p-14 shadow-sm">
          {children}
        </div>
      </section>

      {/* ---- CLOSING CTA ---- */}
      <section className="pb-24  max-w-[1160px] mx-auto">
        <motion.div
          className="bg-[#14151A] text-[#F6F2E7] rounded-[32px] p-12 md:p-16 text-center relative shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Background texture"
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay"
          />
          <h2 className="relative z-10 font-display text-[clamp(2rem,4vw,2.8rem)] uppercase mb-4 text-[#F6F2E7]">
            {ctaTitle}
          </h2>
          <p className="relative z-10 text-[rgba(246,242,231,0.75)] mb-10 max-w-[500px] mx-auto leading-relaxed text-lg">
            {ctaBody}
          </p>
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-[#FFD23F] !text-[#14151A] border-2 border-[#FFD23F] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all whitespace-nowrap"
            >
              Message on WhatsApp →
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-white border-2 border-[rgba(255,255,255,0.2)] hover:bg-[#F6F2E7] hover:!text-[#14151A] transition-all whitespace-nowrap"
            >
              Contact us
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

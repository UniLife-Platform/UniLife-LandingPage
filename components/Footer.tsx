"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Smartphone } from "lucide-react";

const SOCIALS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/2348164670694",
    icon: MessageCircle,
  },
  { label: "Email", href: "mailto:unilife.edu.org@gmail.com", icon: Mail },
  {
    label: "Open the app",
    href: "https://app.unilife.com.ng",
    icon: Smartphone,
  },
];

// Simple brand glyphs not covered by lucide-react's base icon set
function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82c-.87-.96-1.34-2.19-1.34-3.47h-3.19v13.44c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9c.31 0 .61.05.89.14V9.86a6.18 6.18 0 0 0-.89-.06 6.14 6.14 0 0 0-6.14 6.14A6.14 6.14 0 0 0 9.17 22a6.14 6.14 0 0 0 6.14-6.14V9.01a8.4 8.4 0 0 0 4.91 1.58V7.4a5.2 5.2 0 0 1-3.62-1.58z" />
    </svg>
  );
}

function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 2.9h3.1l-6.8 7.75L23.2 21.1h-6.27l-4.9-6.41-5.61 6.41H3.3l7.27-8.3L2.8 2.9h6.43l4.43 5.86 5.24-5.86Zm-1.1 16.35h1.72L7.31 4.65H5.46l12.34 14.6Z" />
    </svg>
  );
}

const FOLLOW_LINKS = [
  {
    label: "Instagram",
    handle: "@unilife_connect",
    href: "https://www.instagram.com/unilife_connect",
    icon: InstagramIcon,
  },
  {
    label: "TikTok",
    handle: "@unilifeconnect",
    href: "https://www.tiktok.com/@unilifeconnect?_r=1&_t=ZS-992NpLGLfAC",
    icon: TikTokIcon,
  },
  {
    label: "X",
    handle: "@unilife_connect",
    href: "https://x.com/unilife_connect",
    icon: XIcon,
  },
  {
    label: "WhatsApp",
    handle: "Join the channel",
    href: "https://chat.whatsapp.com/I4DTryVfFCPDMqyceqxcQl",
    icon: MessageCircle,
  },
];

const PLATFORM_LINKS = [
  { label: "For students", href: "/students" },
  { label: "For sellers", href: "/sellers" },
  { label: "For partners", href: "/partners" },
  { label: "Pricing", href: "/pricing" },
];

const COMPANY_LINKS = [
  { label: "About & vision", href: "/about" },
  { label: "Join the team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Community Guidelines", href: "/guidelines" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.li variants={fadeUp}>
      <Link
        href={href}
        className="group inline-flex items-center gap-0 text-[0.92rem] text-[rgba(246,242,231,0.75)] hover:text-[#FFD23F] transition-colors duration-200"
      >
        <span className="inline-block w-0 group-hover:w-2.5 overflow-hidden transition-all duration-200 ease-out">
          →
        </span>
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          {label}
        </span>
      </Link>
    </motion.li>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#14151A] text-[#F6F2E7] overflow-hidden">
      {/* ambient glow accents */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#4f7fff] opacity-[0.08] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 w-[420px] h-[420px] rounded-full bg-[#ff3d81] opacity-[0.07] blur-[110px]" />

      <div className="relative px-6 md:px-16 max-w-[1160px] mx-auto pt-24 pb-10">
        {/* ---- BRAND + SOCIAL ROW ---- */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="max-w-[420px]">
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-6 group"
            >
              <motion.span
                whileHover={{ rotate: -6, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="block"
              >
                <Image
                  className="w-12 h-12 rounded-xl object-cover shadow-[0_6px_20px_rgba(79,127,255,0.35)]"
                  src="/icon.png"
                  alt="UniLife logo"
                  width={48}
                  height={48}
                />
              </motion.span>
              <span className="font-display text-[2.1rem] leading-none tracking-[0.5px] text-[#F6F2E7]">
                UNI<b className="text-[#4f7fff] font-normal">LIFE</b>
              </span>
            </Link>
            <p className="text-[rgba(246,242,231,0.6)] text-[0.98rem] leading-relaxed">
              The digital campus ecosystem for university students, everywhere.
              Built by students, for students.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="inline-flex items-center gap-2.5 pl-2.5 pr-5 py-2.5 rounded-full bg-[rgba(246,242,231,0.06)] border border-[rgba(246,242,231,0.14)] hover:border-[#FFD23F] hover:bg-[rgba(255,210,63,0.08)] transition-colors duration-200"
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <span className="w-8 h-8 rounded-full bg-[#F6F2E7] text-[#14151A] flex items-center justify-center shrink-0">
                  <Icon size={15} strokeWidth={2.4} />
                </span>
                <span className="font-semibold text-[0.88rem] text-[#F6F2E7] whitespace-nowrap">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ---- "WE'RE EVERYWHERE" TEASER BAND ---- */}
        <motion.div
          className="relative overflow-hidden rounded-[28px] p-8 md:p-10 mb-16 bg-gradient-to-br from-[#1c1d24] to-[#14151A] border border-[rgba(246,242,231,0.1)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="pointer-events-none absolute -top-16 right-10 w-[220px] h-[220px] rounded-full bg-[#FFD23F] opacity-[0.06] blur-[80px]" />

          <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-14">
            <div className="max-w-[340px]">
              <motion.span
                className="inline-block mb-3"
                animate={{ rotate: [0, -10, 10, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 3,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              >
                <span className="font-mono text-[0.7rem] tracking-widest uppercase text-[#FFD23F] bg-[rgba(255,210,63,0.1)] border border-[rgba(255,210,63,0.25)] px-3 py-1.5 rounded-full">
                  👀 Psst... we&apos;re everywhere
                </span>
              </motion.span>
              <h3 className="font-display text-2xl md:text-[1.7rem] uppercase leading-tight mb-2 text-[#F6F2E7]">
                Catch the vibes, updates & opportunities
              </h3>
              <p className="text-[rgba(246,242,231,0.55)] text-[0.9rem] leading-relaxed">
                Tap follow and let&apos;s build together —{" "}
                <b className="text-[#FFD23F] font-semibold">
                  #LetsGrowTogether
                </b>
              </p>
            </div>

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FOLLOW_LINKS.map(({ label, handle, href, icon: Icon }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col gap-3 p-4 rounded-2xl bg-[rgba(246,242,231,0.04)] border border-[rgba(246,242,231,0.1)] hover:border-[#FFD23F] hover:bg-[rgba(246,242,231,0.07)] transition-colors duration-200"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: 0.06 * i }}
                  whileHover={{ y: -4 }}
                >
                  <span className="w-9 h-9 rounded-full bg-[#F6F2E7] text-[#14151A] flex items-center justify-center group-hover:bg-[#FFD23F] transition-colors duration-200">
                    <Icon size={16} />
                  </span>
                  <div>
                    <div className="font-bold text-[0.88rem] text-[#F6F2E7] leading-tight">
                      {label}
                    </div>
                    <div className="text-[0.72rem] text-[rgba(246,242,231,0.45)] leading-tight mt-0.5 truncate">
                      {handle}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ---- NAV COLUMNS ---- */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-10 pb-16 border-t border-[rgba(246,242,231,0.1)] pt-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div>
            <motion.h5
              variants={fadeUp}
              className="font-mono text-[0.68rem] font-bold tracking-widest uppercase text-[rgba(246,242,231,0.4)] mb-5"
            >
              Platform
            </motion.h5>
            <motion.ul variants={stagger} className="flex flex-col gap-3.5">
              {PLATFORM_LINKS.map((l) => (
                <FooterLink key={l.href} {...l} />
              ))}
            </motion.ul>
          </div>

          <div>
            <motion.h5
              variants={fadeUp}
              className="font-mono text-[0.68rem] font-bold tracking-widest uppercase text-[rgba(246,242,231,0.4)] mb-5"
            >
              Company
            </motion.h5>
            <motion.ul variants={stagger} className="flex flex-col gap-3.5">
              {COMPANY_LINKS.map((l) => (
                <FooterLink key={l.href} {...l} />
              ))}
            </motion.ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <motion.h5
              variants={fadeUp}
              className="font-mono text-[0.68rem] font-bold tracking-widest uppercase text-[rgba(246,242,231,0.4)] mb-5"
            >
              Legal
            </motion.h5>
            <motion.ul variants={stagger} className="flex flex-col gap-3.5">
              {LEGAL_LINKS.map((l) => (
                <FooterLink key={l.href} {...l} />
              ))}
            </motion.ul>
          </div>
        </motion.div>

        {/* ---- BOTTOM BAR ---- */}
        <div className="relative pt-8">
          <motion.div
            className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-[#4f7fff] via-[#FFD23F] to-[#ff3d81] origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ width: "100%" }}
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-mono text-[0.7rem] tracking-widest uppercase text-[rgba(246,242,231,0.45)] text-center sm:text-left">
              © 2026 UniLife — Built by students, for students
            </span>
            <span className="font-mono text-[0.7rem] tracking-widest uppercase text-[rgba(246,242,231,0.45)] bg-[rgba(246,242,231,0.06)] border border-[rgba(246,242,231,0.12)] px-3 py-1.5 rounded-full">
              Open to students at any university
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

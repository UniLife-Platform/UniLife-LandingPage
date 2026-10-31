"use client";

import { useRef, MouseEvent } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, Lock, Check, Users } from "lucide-react";
import InitialsAvatar from "@/components/Avatar";
import { SITE_STATS, withRef } from "@/lib/siteStats";

// --- Magnetic Button Component ---
function MagneticButton({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.25);
    y.set((clientY - centerY) * 0.25);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block w-full sm:w-auto"
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block w-full sm:w-auto" onClick={onClick}>
        {Content}
      </a>
    );
  }

  return Content;
}

// --- Role data ---
type Role = {
  num: string;
  title: string;
  tagline: string;
  desc: string;
  audience: string;
  perks: string[];
  ctaLabel: string;
  ctaHref?: string;
  locked?: boolean;
  accent: string; // brand fill colour (always paired with dark ink text)
};

const ROLES: Role[] = [
  {
    num: "01",
    title: "Campus Ambassador",
    tagline: "Run your campus.",
    desc: "Be the face of UniLife in your department. Onboard your class, climb the leaderboard and get rewarded for the growth you drive.",
    audience: "Students from 100L to alumni with strong campus connections",
    perks: [
      "Monthly data stipends & official merch",
      "Leaderboard cash pot bonuses",
      "Direct team mentorship & priority beta access",
    ],
    ctaLabel: "Apply as Ambassador",
    ctaHref: withRef("https://tally.so/r/QKblzg", "join-ambassador"),
    accent: "#ff3d81",
  },
  {
    num: "02",
    title: "Department Partner",
    tagline: "Digitise your union.",
    desc: "For Faculty Presidents, Department Executives and Student Union leaders. We build the rails for dues, voting and ticketing on campus.",
    audience: "SUG Executives, Faculty Presidents & Club Heads",
    perks: [
      "Zero-fee digital dues collection & e-receipts",
      "Tamper-proof departmental e-voting",
      "Free barcode event ticketing engine",
    ],
    ctaLabel: "Opening soon",
    locked: true,
    accent: "#4f7fff",
  },
  {
    num: "03",
    title: "Core Team Builder",
    tagline: "Ship the product.",
    desc: "Don't just use the app, help build it. We need people who get things done, from developers and designers to writers, marketers, community leads and operations minds, to scale UniLife across the continent.",
    audience: "Developers, designers, writers, marketers, community & operations people",
    perks: [
      `Ship to ${SITE_STATS.activeStudents} active students`,
      "Real ownership on a live product, from code to campaigns",
    ],
    ctaLabel: "Submit Builder Application",
    ctaHref: withRef("https://tally.so/r/Y51Aa0", "join-builder"),
    accent: "#FFD23F",
  },
];

const QUICK_PICK = [
  { q: "I want to earn and lead on my campus", a: "Ambassador", i: 0 },
  { q: "I run a department, faculty or union", a: "Partner", i: 1 },
  { q: "I build, design, write or grow things", a: "Builder", i: 2 },
];

// --- Role card ---
function RoleCard({ role, index }: { role: Role; index: number }) {
  return (
    <motion.article
      id={`role-${index + 1}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-[28px] border-2 overflow-hidden transition-transform duration-300 hover:-translate-y-1 scroll-mt-28"
      style={{
        background: "var(--card-bg)",
        color: "var(--ink)",
        borderColor: "var(--ink)",
        boxShadow: `6px 6px 0 ${role.accent}`,
      }}
    >
      {/* Accent header */}
      <div
        className="relative flex items-start justify-between px-6 pt-6 pb-8"
        style={{ background: role.accent, color: "#14151A" }}
      >
        <span className="font-display text-6xl sm:text-7xl leading-none tracking-tight">
          {role.num}
        </span>
        {role.locked ? (
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#14151A] text-white">
            <Lock className="w-3 h-3" /> Opening soon
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#14151A] text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Applications open
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 gap-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] mb-2" style={{ color: "var(--ink-muted)" }}>
            {role.tagline}
          </p>
          <h3 className="font-display text-3xl sm:text-4xl uppercase leading-[1.05] tracking-tight">
            {role.title}
          </h3>
        </div>

        <p className="text-[0.95rem] leading-relaxed" style={{ color: "var(--ink-secondary)" }}>
          {role.desc}
        </p>

        <div
          className="flex items-start gap-3 rounded-xl p-3 border"
          style={{ background: "var(--paper-subtle)", borderColor: "var(--border-light)" }}
        >
          <Users className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--ink)" }} aria-hidden />
          <div className="text-sm leading-snug">
            <span className="block font-mono text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "var(--ink-muted)" }}>
              Best suited for
            </span>
            <span className="font-medium">{role.audience}</span>
          </div>
        </div>

        <ul className="flex flex-col gap-2.5">
          {role.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2.5 text-sm leading-snug">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{ background: role.accent, color: "#14151A" }}
              >
                <Check className="w-3 h-3" strokeWidth={3} aria-hidden />
              </span>
              <span>{perk}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto pt-2">
          {role.locked ? (
            <button
              disabled
              aria-disabled="true"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-dashed px-6 py-3.5 font-bold text-sm cursor-not-allowed"
              style={{ borderColor: "var(--border-strong)", color: "var(--ink-secondary)" }}
            >
              <Lock className="w-4 h-4" aria-hidden />
              <span>{role.ctaLabel}</span>
            </button>
          ) : (
            <a
              href={role.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold text-sm transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
            >
              <span>{role.ctaLabel}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function JoinUs() {
  return (
    <div
      className="min-h-screen overflow-x-clip font-body antialiased relative pb-0"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <Nav active="/join" />

      {/* ---- HERO ---- */}
      <header className="px-4 sm:px-6 md:px-16 pt-12 sm:pt-20 md:pt-28 pb-10 sm:pb-20 md:pb-24 max-w-[1400px] mx-auto flex flex-col justify-center relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-8">
            <span className="h-[2px] w-6 sm:w-12" style={{ background: "var(--ink)" }} />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold">
              Phase 1 Expansion
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.75rem,10vw,4.5rem)] sm:text-7xl md:text-8xl lg:text-[clamp(5rem,10.5vw,13rem)] leading-[0.9] md:leading-[0.85] uppercase tracking-tighter mb-5 sm:mb-8">
            Build <br />
            <span
              className="relative inline-block text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--accent-pink-text), var(--accent-blue-text))",
              }}
            >
              The Future.
            </span>
          </h1>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-end mt-4 sm:mt-12 md:mt-16 justify-between">
            {/* Avatars */}
            <div className="flex items-center">
              <div className="flex -space-x-3 sm:-space-x-4 shrink-0">
                {["Harrison A", "Shadrach O", "Abel T"].map((name) => (
                  <InitialsAvatar
                    key={name}
                    name={name}
                    className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 text-sm sm:text-base border-2 border-[var(--paper)] shadow-sm"
                  />
                ))}
                <div
                  className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center font-mono text-xs sm:text-sm font-bold shadow-sm"
                  style={{ borderColor: "var(--paper)", background: "var(--ink)", color: "var(--paper)" }}
                >
                  {SITE_STATS.buildersCount}
                </div>
              </div>
              <div className="ml-3 sm:ml-4 text-xs sm:text-sm font-mono" style={{ color: "var(--ink-secondary)" }}>
                <span className="font-bold block" style={{ color: "var(--ink)" }}>Campus Builders</span>
                <span>Across {SITE_STATS.universitiesCount} Universities</span>
              </div>
            </div>

            {/* Pitch paragraph + CTA */}
            <div className="flex flex-col items-start md:items-end gap-4 sm:gap-6 max-w-[600px] w-full">
              <p
                className="text-sm sm:text-lg md:text-[1.2rem] leading-[1.6] font-medium md:text-right"
                style={{ color: "var(--ink-secondary)" }}
              >
                We aren&apos;t looking for standard resumes. We are looking for builders, hustlers, and student leaders
                to architect the digital infrastructure for African universities.
              </p>
              <div className="w-full sm:w-auto">
                <MagneticButton href="#pathways">
                  <div
                    className="w-full sm:w-auto px-7 sm:px-10 py-3.5 sm:py-5 rounded-full font-bold text-sm sm:text-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                    style={{
                      background: "var(--ink)",
                      color: "var(--paper)",
                      boxShadow: "4px 4px 0 #ff3d81",
                    }}
                  >
                    <span>Pick your role</span>
                    <span className="font-mono" aria-hidden>↓</span>
                  </div>
                </MagneticButton>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* ---- ROLES SECTION ---- */}
      <section
        id="pathways"
        className="relative pb-20 sm:pb-28 md:pb-36 px-4 sm:px-6 md:px-16 pt-4 md:pt-12 scroll-mt-20"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-none mb-3">
                Three ways <br className="hidden sm:inline" /> to join
              </h2>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider" style={{ color: "var(--ink-muted)" }}>
                Pick the one that fits what you do on campus
              </p>
            </div>

            {/* Quick pick */}
            <nav aria-label="Not sure which role?" className="flex flex-col gap-2 sm:max-w-sm w-full">
              <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--ink-muted)" }}>
                Not sure? Start here
              </span>
              {QUICK_PICK.map((item) => (
                <a
                  key={item.a}
                  href={`#role-${item.i + 1}`}
                  className="flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-sm transition-colors hover:bg-[var(--paper-subtle)]"
                  style={{ borderColor: "var(--border-strong)" }}
                >
                  <span style={{ color: "var(--ink-secondary)" }}>{item.q}</span>
                  <span className="inline-flex items-center gap-1 font-bold shrink-0">
                    {item.a} <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                  </span>
                </a>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-7 pb-2 pr-1.5">
            {ROLES.map((role, i) => (
              <RoleCard key={role.title} role={role} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-40 bg-white">
        <Footer />
      </div>
    </div>
  );
}

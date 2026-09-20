"use client";

import { useState, useRef, MouseEvent, KeyboardEvent } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { ArrowRight, Lock, CheckCircle2, ChevronRight, Users } from "lucide-react";

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

// --- Arena Panel Types ---
type Panel = {
  level: string;
  shortRole: string;
  title: string;
  desc: string;
  ctaLabel: string;
  ctaHref?: string;
  locked?: boolean;
  accent: string; // hex
  image?: string;
  perks: string[];
  audience: string;
};

const PANELS: Panel[] = [
  {
    level: "Level 01",
    shortRole: "Ambassador",
    title: "Campus Ambassador",
    desc: "Dominate your department. Be the boots on the ground, onboard your class, and climb the global leaderboard. Earn monthly data stipends, exclusive merch, and extreme networking ops.",
    ctaLabel: "Apply as Ambassador",
    ctaHref: "https://tally.so/r/QKblzg",
    accent: "#ff3d81",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    perks: ["Monthly data stipends & official merch", "Leaderboard cash pot bonuses", "Direct team mentorship & priority beta access"],
    audience: "100L–400L students with strong campus connections",
  },
  {
    level: "Level 02",
    shortRole: "Partner",
    title: "Department Partner",
    desc: "For Faculty Presidents, Department Executives, and Student Union Leaders. We build the rails for digital dues collection, tamper-proof e-voting, and event ticketing directly on campus.",
    ctaLabel: "Access Locked (Opening Soon)",
    locked: true,
    accent: "#4f7fff",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1200&auto=format&fit=crop",
    perks: ["Zero-fee digital dues collection & e-receipts", "Tamper-proof departmental e-voting", "Free barcode event ticketing engine"],
    audience: "SUG Executives, Faculty Presidents & Club Heads",
  },
  {
    level: "Level 03",
    shortRole: "Core Builder",
    title: "Core Team Builder",
    desc: "You don't just want to use the app, you want to write the codebase. We need aggressive, fast-shipping Next.js, Flutter, and Backend talent to scale this ecosystem continent-wide.",
    ctaLabel: "Submit Builder Application",
    ctaHref: "https://tally.so/r/Y51Aa0",
    accent: "#FFD23F",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    perks: ["Ship to 50,000+ active students", "Production Next.js & Flutter repo access", "Direct monthly stipends & equity opportunities"],
    audience: "Engineers, Product Designers & Growth Hackers",
  },
];

// --- Desktop Arena Panel ---
function DesktopArenaPanel({
  panel,
  index,
  isActive,
  onActivate,
}: {
  panel: Panel;
  index: number;
  isActive: boolean;
  onActivate: (i: number) => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate(index);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      onClick={() => onActivate(index)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      style={{ flexGrow: isActive ? 5 : 1 }}
      className={`
        relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0A0A0C]
        cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#ff3d81]
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        h-full flex-1 basis-0
      `}
    >
      {/* Spotlight glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 hover:opacity-100 transition duration-500 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${panel.accent}33, transparent 80%)
          `,
        }}
      />

      {/* Background image & gradient overlay */}
      <div className="absolute inset-0 z-0">
        {panel.image ? (
          <img
            src={panel.image}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isActive ? "opacity-35 scale-105" : "opacity-15 scale-100"
            }`}
            alt=""
          />
        ) : (
          <div className="absolute inset-0 border border-white/5 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/85 to-[#0A0A0C]/50" />
      </div>

      {/* INACTIVE STATE: Vertical rotated typography */}
      {!isActive && (
        <div className="relative z-10 h-full flex flex-col p-8 justify-between">
          <div className="flex flex-col items-start gap-4 shrink-0">
            <span
              className="font-mono text-xs tracking-widest uppercase border px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{ borderColor: `${panel.accent}55`, color: panel.accent, background: `${panel.accent}18` }}
            >
              {panel.level}
            </span>
            {panel.locked ? (
              <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">🔒</span>
            ) : (
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: panel.accent, boxShadow: `0 0 15px ${panel.accent}` }}
              />
            )}
          </div>

          <div className="flex-1 flex items-end pb-6 min-w-0">
            <h3 className="font-display text-2xl lg:text-3xl uppercase tracking-tight text-white/70 whitespace-nowrap [writing-mode:vertical-rl] rotate-180 truncate">
              {panel.title}
            </h3>
          </div>
        </div>
      )}

      {/* ACTIVE STATE: Wide expanded view */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10"
          >
            {/* Top row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-xs tracking-widest uppercase border px-3.5 py-1.5 rounded-full whitespace-nowrap font-bold"
                  style={{ borderColor: `${panel.accent}88`, color: panel.accent, background: `${panel.accent}20` }}
                >
                  {panel.level}
                </span>
                {panel.locked ? (
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Applications Open
                  </span>
                )}
              </div>
            </div>

            {/* Content & Body */}
            <div className="flex flex-col justify-end">
              <h3 className="font-display text-3xl lg:text-5xl uppercase text-white mb-4 tracking-tight leading-tight">
                {panel.title}
              </h3>

              <p className="text-white/75 text-base lg:text-lg mb-6 leading-relaxed font-normal max-w-xl">
                {panel.desc}
              </p>

              {/* Quick Perks */}
              <div className="flex flex-wrap gap-2 mb-8">
                {panel.perks.map((perk, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-white/85 bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    {perk}
                  </span>
                ))}
              </div>

              {/* CTA Action */}
              <div>
                {panel.locked ? (
                  <button
                    disabled
                    aria-disabled="true"
                    className="inline-flex items-center justify-center gap-3 bg-white/10 text-white/40 px-8 py-4 rounded-full font-bold text-base border border-white/10 cursor-not-allowed"
                  >
                    <span>{panel.ctaLabel}</span>
                    <Lock className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href={panel.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full font-bold text-base transition-all duration-300 text-[#0A0A0C] hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                    style={{ background: panel.accent }}
                  >
                    <span>{panel.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUBLIME MOBILE ROLE VIEW ---
function MobileRoleView({
  activePanel,
  setActivePanel,
}: {
  activePanel: number;
  setActivePanel: (i: number) => void;
}) {
  const current = PANELS[activePanel];

  return (
    <div className="flex flex-col gap-4">
      {/* Segmented Pill Selector (Horizontal Scroll / Snap) */}
      <div className="grid grid-cols-3 gap-2 bg-black/5 p-1.5 rounded-2xl border border-black/10">
        {PANELS.map((p, idx) => {
          const isSel = activePanel === idx;
          return (
            <button
              key={p.level}
              onClick={() => setActivePanel(idx)}
              className={`py-2.5 px-2 rounded-xl text-center font-mono text-xs font-bold uppercase transition-all duration-200 flex flex-col items-center justify-center gap-0.5 relative ${
                isSel
                  ? "bg-[#0A0A0C] text-white shadow-md"
                  : "text-black/60 hover:text-black hover:bg-black/5"
              }`}
            >
              <span className="text-[10px] tracking-wider opacity-80">{p.level}</span>
              <span className="truncate w-full font-sans text-xs font-bold tracking-tight">
                {p.shortRole}
              </span>
              {isSel && (
                <motion.span
                  layoutId="mobileActiveDot"
                  className="w-1.5 h-1.5 rounded-full mt-0.5"
                  style={{ background: p.accent }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Sublime Active Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.level}
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[28px] border-2 border-[#0A0A0C] bg-[#0A0A0C] text-white shadow-[5px_5px_0px_#14151A]"
        >
          {/* Card Media Header */}
          <div className="relative h-44 w-full overflow-hidden bg-[#14151A]">
            {current.image ? (
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover opacity-45"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1a1b23] to-[#0A0A0C]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/60 to-transparent" />

            {/* Header Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm"
                style={{
                  borderColor: current.accent,
                  color: current.accent,
                  background: `${current.accent}25`,
                }}
              >
                {current.level}
              </span>

              {current.locked ? (
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold uppercase px-3 py-1 rounded-full bg-white/10 text-white/60 border border-white/10">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Open
                </span>
              )}
            </div>

            {/* Card Role Title on Image */}
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="font-display text-2xl uppercase tracking-tight text-white leading-tight">
                {current.title}
              </h3>
            </div>
          </div>

          {/* Card Content Body */}
          <div className="p-5 flex flex-col gap-4">
            <p className="text-white/80 text-sm leading-relaxed font-normal">
              {current.desc}
            </p>

            {/* Target Audience */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
              <Users className="w-4 h-4 text-[#FFD23F] shrink-0" />
              <div className="text-xs">
                <span className="text-white/40 uppercase font-mono block text-[10px]">Best Suited For</span>
                <span className="text-white/90 font-medium">{current.audience}</span>
              </div>
            </div>

            {/* Perks Checklist */}
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                Key Privileges & Perks:
              </span>
              {current.perks.map((perk, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 text-xs text-white/90 bg-white/[0.04] p-2.5 rounded-xl border border-white/5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{perk}</span>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              {current.locked ? (
                <button
                  disabled
                  className="w-full py-4 rounded-full font-bold text-sm bg-white/10 text-white/40 border border-white/10 flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <span>{current.ctaLabel}</span>
                  <Lock className="w-4 h-4" />
                </button>
              ) : (
                <a
                  href={current.ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-full font-bold text-sm text-[#0A0A0C] flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(0,0,0,0.4)] active:scale-[0.98] transition-transform"
                  style={{ background: current.accent }}
                >
                  <span>{current.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Quick Peek of the Other 2 Pathways */}
      <div className="pt-2 flex flex-col gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-black/50 px-1">
          Switch to other pathways:
        </span>
        <div className="grid grid-cols-2 gap-2">
          {PANELS.map((p, idx) => {
            if (idx === activePanel) return null;
            return (
              <button
                key={p.level}
                onClick={() => setActivePanel(idx)}
                className="bg-white border-2 border-[#0A0A0C] p-3 rounded-xl text-left shadow-[2px_2px_0px_#14151A] active:translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-black/50">
                    {p.level}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-black/40" />
                </div>
                <div className="font-display text-xs uppercase font-bold text-[#0A0A0C] truncate">
                  {p.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function JoinUs() {
  const [activePanel, setActivePanel] = useState(0);

  return (
    <div className="bg-[#EAE7DF] text-[#0A0A0C] min-h-screen overflow-x-clip font-body antialiased relative selection:bg-[#ff3d81] selection:text-white pb-0">
      <Nav active="/join" />

      {/* ---- HERO ---- */}
      <header className="px-4 sm:px-6 md:px-16 pt-12 sm:pt-20 md:pt-28 pb-10 sm:pb-20 md:pb-24 max-w-[1400px] mx-auto flex flex-col justify-center relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-8">
            <span className="h-[2px] w-6 sm:w-12 bg-[#0A0A0C]" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[#0A0A0C]">
              Phase 1 Expansion
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.75rem,10vw,4.5rem)] sm:text-7xl md:text-8xl lg:text-[clamp(5rem,10.5vw,13rem)] leading-[0.9] md:leading-[0.85] uppercase tracking-tighter text-[#0A0A0C] mb-5 sm:mb-8">
            Build <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff3d81] via-[#4f7fff] to-[#0A0A0C]">
              The Future.
            </span>
          </h1>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-end mt-4 sm:mt-12 md:mt-16 justify-between">
            {/* Avatars */}
            <div className="flex items-center">
              <div className="flex -space-x-3 sm:-space-x-4 shrink-0">
                <img
                  className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-[#EAE7DF] grayscale hover:grayscale-0 transition-all duration-500 object-cover shadow-sm"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Harrison"
                  alt="Core team member avatar"
                />
                <img
                  className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-[#EAE7DF] grayscale hover:grayscale-0 transition-all duration-500 object-cover shadow-sm"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shadrach"
                  alt="Lead team member avatar"
                />
                <img
                  className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-[#EAE7DF] grayscale hover:grayscale-0 transition-all duration-500 object-cover shadow-sm"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Abel"
                  alt="PM team member avatar"
                />
                <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-[#EAE7DF] bg-[#0A0A0C] text-white flex items-center justify-center font-mono text-xs sm:text-sm font-bold shadow-sm">
                  +40
                </div>
              </div>
              <div className="ml-3 sm:ml-4 text-xs sm:text-sm font-mono text-[#46473f]">
                <span className="font-bold text-[#0A0A0C] block">Campus Builders</span>
                <span>Across 12+ Universities</span>
              </div>
            </div>

            {/* Pitch paragraph + CTA */}
            <div className="flex flex-col items-start md:items-end gap-4 sm:gap-6 max-w-[600px] w-full">
              <p className="text-sm sm:text-lg md:text-[1.2rem] leading-[1.6] text-[#46473f] font-medium md:text-right">
                We aren&apos;t looking for standard resumes. We are looking for builders, hustlers, and student leaders
                to architect the digital infrastructure for African universities.
              </p>
              <div className="w-full sm:w-auto">
                <MagneticButton href="#pathways">
                  <div className="w-full sm:w-auto bg-[#0A0A0C] text-white px-7 sm:px-10 py-3.5 sm:py-5 rounded-full font-bold text-sm sm:text-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[4px_4px_0px_#ff3d81]">
                    <span>Select Your Role</span>
                    <span className="font-mono">↓</span>
                  </div>
                </MagneticButton>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* ---- PATHWAYS SECTION ---- */}
      <motion.section
        id="pathways"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative pb-20 sm:pb-32 md:pb-40 px-4 sm:px-6 md:px-16 pt-4 md:pt-12"
      >
        <div className="max-w-[1400px] mx-auto mb-6 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#0A0A0C] leading-none mb-2">
              Choose <br className="hidden sm:inline" /> Your Arena
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#0A0A0C]/60 uppercase tracking-wider">
              3 Pathways To Shape Campus Technology
            </p>
          </div>

          <div className="hidden md:block font-mono text-sm tracking-widest uppercase text-[#8a8a7f]">
            Hover or click to explore →
          </div>
        </div>

        {/* MOBILE VIEW (< md screens) */}
        <div className="md:hidden max-w-lg mx-auto">
          <MobileRoleView activePanel={activePanel} setActivePanel={setActivePanel} />
        </div>

        {/* DESKTOP VIEW (>= md screens) */}
        <div className="hidden md:flex max-w-[1400px] mx-auto flex-row gap-4 h-[580px]">
          {PANELS.map((panel, i) => (
            <DesktopArenaPanel
              key={panel.title}
              panel={panel}
              index={i}
              isActive={activePanel === i}
              onActivate={setActivePanel}
            />
          ))}
        </div>
      </motion.section>

      <div className="relative z-40 bg-white">
        <Footer />
      </div>
    </div>
  );
}

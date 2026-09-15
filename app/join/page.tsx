"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Head from "next/head";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, MouseEvent, KeyboardEvent, useRef } from "react";

// --- MAGNETIC BUTTON COMPONENT ---
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative inline-flex items-center justify-center"
    >
      {children}
    </motion.a>
  );
}

// --- ARENA PANEL (replaces the sticky stack) ---
type Panel = {
  level: string;
  title: string;
  desc: string;
  ctaLabel: string;
  ctaHref?: string;
  locked?: boolean;
  accent: string; // hex
  image?: string;
  badge?: string;
};

function ArenaPanel({
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
        transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        min-h-[100px] md:min-h-[560px] flex-1 basis-0
      `}
    >
      {/* Spotlight glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-500 hover:opacity-100 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${panel.accent}33, transparent 80%)
          `,
        }}
      />

      {/* Background */}
      <div className="absolute inset-0 z-0">
        {panel.image ? (
          <img
            src={panel.image}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isActive ? "opacity-40 scale-105" : "opacity-15 scale-100"
            }`}
            alt=""
          />
        ) : (
          <div className="absolute inset-0 border border-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/85 to-[#0A0A0C]/30 md:bg-gradient-to-r" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-row md:flex-col p-6 md:p-10">
        {/* Top row: level + status dot (always visible) */}
        <div className="flex md:flex-col items-center md:items-start justify-between md:justify-start gap-4 shrink-0">
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

        {/* Collapsed label — vertical on desktop, inline on mobile when inactive */}
        {!isActive && (
          <div className="flex-1 flex items-center md:items-end justify-center md:justify-start md:pb-6 min-w-0">
            <h3
              className="font-display text-xl md:text-3xl uppercase tracking-tight text-white/70 whitespace-nowrap md:[writing-mode:vertical-rl] md:rotate-180 truncate"
            >
              {panel.title}
            </h3>
          </div>
        )}

        {/* Expanded content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex-1 flex flex-col justify-end min-w-0"
            >
              <h3 className="font-display text-4xl md:text-6xl uppercase text-white mb-4 md:mb-6 tracking-tighter">
                {panel.title}
              </h3>
              <p className="text-white/60 text-base md:text-[1.1rem] mb-6 md:mb-10 leading-relaxed font-light max-w-[550px]">
                {panel.desc}
              </p>

              {panel.locked ? (
                <button
                  disabled
                  aria-disabled="true"
                  className="inline-flex items-center gap-4 bg-white/5 text-white/30 px-8 py-4 rounded-full font-bold text-lg border border-white/10 cursor-not-allowed w-fit"
                >
                  {panel.ctaLabel} <span className="font-mono text-xl">🔒</span>
                </button>
              ) : (
                <a
                  href={panel.ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-4 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 w-fit text-[#0A0A0C]"
                  style={{ background: panel.accent }}
                >
                  {panel.ctaLabel} <span className="font-mono text-xl">→</span>
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function JoinUs() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [activePanel, setActivePanel] = useState(0);

  useEffect(() => {
    const updateMousePosition = (e: globalThis.MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHoveringLink(!!(target.closest("a") || target.closest("button")));
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const panels: Panel[] = [
    {
      level: "Level 01",
      title: "Campus Ambassador",
      desc: "Dominate your department. Be the boots on the ground, onboard your class, and climb the global leaderboard. Earn data stipends, exclusive merch, and extreme networking ops.",
      ctaLabel: "Apply Now",
      ctaHref: "https://tally.so/r/QKblzg",
      accent: "#ff3d81",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    },
    {
      level: "Level 02",
      title: "Department Partner",
      desc: "For Faculty Presidents and Student Union Leaders. We are building the rails for digital dues collection, tamper-proof e-voting, and event ticketing directly on campus.",
      ctaLabel: "Access Locked",
      locked: true,
      accent: "#8a8a7f",
    },
    {
      level: "Level 03",
      title: "Core Team Builder",
      desc: "You don't just want to use the app, you want to write the codebase. We need aggressive, fast-shipping Next.js, Flutter, and Backend talent to scale this ecosystem continent-wide.",
      ctaLabel: "Prove Your Worth",
      ctaHref: "https://tally.so/r/Y51Aa0",
      accent: "#FFD23F",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <Head>
        <title>Join The Squad — UniLife</title>
      </Head>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (pointer: fine) {
          body { cursor: none; }
          a, button, input { cursor: none !important; }
        }
      `,
        }}
      />

      <div className="bg-[#EAE7DF] text-[#0A0A0C] min-h-screen overflow-x-clip font-body antialiased relative selection:bg-[#ff3d81] selection:text-white pb-0">
        {/* CUSTOM INVERSE CURSOR (mouse only, see media query above) */}
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] mix-blend-difference bg-white hidden md:flex items-center justify-center text-black font-mono text-[0.6rem] uppercase tracking-widest font-bold overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          animate={{
            x: mousePosition.x - (isHoveringLink ? 40 : 12),
            y: mousePosition.y - (isHoveringLink ? 40 : 12),
            width: isHoveringLink ? 80 : 24,
            height: isHoveringLink ? 80 : 24,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isHoveringLink ? 1 : 0 }}
            className="absolute whitespace-nowrap"
          >
            Click
          </motion.span>
        </motion.div>

        <Nav active="/join" />

        {/* ---- HERO ---- */}
        <header className="px-6 md:px-16 pt-24 pb-32 max-w-[1400px] mx-auto min-h-[85vh] flex flex-col justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[2px] w-12 bg-[#0A0A0C]"></span>
              <span className="font-mono text-sm tracking-[0.2em] uppercase font-bold text-[#0A0A0C]">
                Phase 1 Expansion
              </span>
            </div>

            <h1 className="font-display text-[clamp(4.5rem,11vw,14rem)] leading-[0.85] uppercase tracking-tighter text-[#0A0A0C] mb-8">
              Build <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff3d81] via-[#4f7fff] to-[#0A0A0C]">
                The Future.
              </span>
            </h1>

            <div className="flex flex-col md:flex-row gap-12 items-start md:items-end mt-16 justify-between">
              <div className="flex -space-x-4">
                <img
                  className="w-16 h-16 rounded-full border-2 border-[#EAE7DF] grayscale hover:grayscale-0 transition-all duration-500 object-cover"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Harrison"
                  alt="Core team member avatar"
                />
                <img
                  className="w-16 h-16 rounded-full border-2 border-[#EAE7DF] grayscale hover:grayscale-0 transition-all duration-500 object-cover"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shadrach"
                  alt="Lead team member avatar"
                />
                <img
                  className="w-16 h-16 rounded-full border-2 border-[#EAE7DF] grayscale hover:grayscale-0 transition-all duration-500 object-cover"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Abel"
                  alt="PM team member avatar"
                />
                <div className="w-16 h-16 rounded-full border-2 border-[#EAE7DF] bg-[#0A0A0C] text-white flex items-center justify-center font-mono text-sm shadow-lg">
                  +40
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-6 max-w-[600px]">
                <p className="text-[1.2rem] leading-[1.65] text-[#46473f] font-medium md:text-right">
                  We aren't looking for standard resumes. We are looking for builders, hackers, and student leaders
                  to architect the digital infrastructure for African universities.
                </p>
                <MagneticButton href="#pathways">
                  <div className="bg-[#0A0A0C] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3">
                    Select Your Role <span className="font-mono">↓</span>
                  </div>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </header>

        {/* ---- PATHWAYS (expanding panels, replaces the sticky stack) ---- */}
        <motion.section
          id="pathways"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative pb-40 px-6 md:px-16 pt-12"
        >
          <div className="max-w-[1400px] mx-auto mb-16 flex justify-between items-end">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] uppercase tracking-tight text-[#0A0A0C] leading-none">
              Choose <br /> Your Arena
            </h2>
            <div className="hidden md:block font-mono text-sm tracking-widest uppercase text-[#8a8a7f]">
              Hover to explore →
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-4 md:h-[560px]">
            {panels.map((panel, i) => (
              <ArenaPanel
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
    </>
  );
}
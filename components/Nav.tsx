"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const LOGIN_URL = "https://app.unilife.com.ng";
const DROPDOWN_CLOSE_DELAY = 120;

type NavItem = {
  href: string;
  label: string;
  desc: string;
  icon: string;
};

const FEATURES: NavItem[] = [
  { href: "/#study", label: "Study Hub & AI", desc: "Past questions and PDF AI tutor.", icon: "📚" },
  { href: "/#marketplace", label: "Campus Marketplace", desc: "Buy and sell peer-to-peer.", icon: "🏪" },
  { href: "/#gamification", label: "Campus Economy", desc: "Earn SP and climb the leaderboards.", icon: "🏆" },
];

const SOLUTIONS: NavItem[] = [
  { href: "/students", label: "For Students", desc: "Connect, study, and earn rewards.", icon: "🎓" },
  { href: "/sellers", label: "For Sellers", desc: "Open a UniShop with zero fees.", icon: "💼" },
  { href: "/partners", label: "For School Bodies", desc: "Verified pages for unions and clubs.", icon: "🏛️" },
];

const JOIN_US: NavItem[] = [
  { href: "/join", label: "Campus Ambassadors", desc: "Lead the expansion at your school.", icon: "📢" },
  { href: "/join", label: "Department Partners", desc: "Digitize your faculty association.", icon: "🤝" },
  { href: "/join", label: "Core Team", desc: "Build the future of campus tech.", icon: "💻" },
];

const OTHERS: NavItem[] = [
  { href: "/challenge", label: "Challenges & Sprints", desc: "Compete in live university innovation challenges.", icon: "⚡" },
  { href: "/scholarships", label: "Scholarships", desc: "Verified tuition grants, student funds & sponsorships.", icon: "🎓" },
];

// --- Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 }
  },
  exit: { opacity: 0, transition: { duration: 0.1 } }
};

const slideInItem = {
  hidden: { opacity: 0, x: -10, y: 5 },
  show: { opacity: 1, x: 0, y: 0, transition: { type: "spring" as const, stiffness: 400, damping: 20 } }
};

// --- Desktop Mega Menu Component ---
function DesktopMegaMenu({ active, isDark }: { active?: string; isDark?: boolean }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), DROPDOWN_CLOSE_DELAY);
  };

  const isActive = [FEATURES, SOLUTIONS, JOIN_US, OTHERS].flat().some((item) => {
    const itemPath = item.href.split("#")[0];
    return itemPath === active && itemPath !== "/";
  });

  return (
    <div
      className="relative group"
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        className={`relative flex items-center gap-1.5 text-[0.92rem] py-2 transition-colors duration-200 outline-none cursor-pointer
          ${
            isActive
              ? isDark
                ? "font-bold text-[#FFD23F]"
                : "font-bold text-[#14151A]"
              : isDark
              ? "font-medium text-[#F6F2E7]/80 hover:text-white"
              : "font-semibold text-[#2d2e35] hover:text-[#14151A]"
          }
          after:absolute after:-bottom-1 after:left-0 after:h-[2.5px] after:w-full after:origin-left after:scale-x-0 after:bg-[#FFD23F] after:rounded-full after:transition-transform after:duration-300
          ${isActive ? "after:scale-x-100" : "group-hover:after:scale-x-100"}
        `}
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={() => {
          clearCloseTimer();
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        Explore
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          className={open ? (isDark ? "text-[#FFD23F]" : "text-[#14151A]") : "text-current"}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[min(1080px,94vw)]"
          >
            <div
              className={`rounded-[28px] p-8 sm:p-9 flex gap-6 ${
                isDark
                  ? "bg-[#181920]/98 backdrop-blur-2xl border border-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.7)] text-[#F6F2E7]"
                  : "bg-white/98 backdrop-blur-2xl border border-[rgba(20,21,26,0.12)] shadow-[0_35px_90px_rgba(20,21,26,0.16)] text-[#14151A]"
              }`}
            >
              
              {/* Column 1: Products */}
              <div className="flex-1">
                <h4 className={`font-mono text-[0.68rem] font-bold tracking-widest uppercase mb-3.5 pl-3 ${isDark ? "text-[#FFD23F]/90" : "text-[#8a8a7f]"}`}>
                  Products
                </h4>
                <div className="flex flex-col gap-1.5">
                  {FEATURES.map((item, idx) => (
                    <Link
                      key={`${item.href}-${idx}`}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-start gap-3.5 p-3 rounded-[16px] transition-all duration-200 group hover:translate-x-1 hover:shadow-xs ${
                        isDark ? "hover:bg-white/5" : "hover:bg-[#f4f6fc]"
                      }`}
                    >
                      <div className={`text-xl w-11 h-11 flex items-center justify-center rounded-2xl shadow-xs group-hover:scale-110 group-hover:-rotate-3 transition-all shrink-0 duration-300 ${
                        isDark
                          ? "bg-white/5 border border-white/10 group-hover:border-[#FFD23F]/50 group-hover:bg-white/10"
                          : "bg-[#fdfbf7] border border-[rgba(20,21,26,0.06)] group-hover:border-[#4f7fff]/30 group-hover:bg-white"
                      }`}>
                        {item.icon}
                      </div>
                      <div className="pt-0.5">
                        <div className={`font-bold text-[0.92rem] mb-0.5 transition-colors ${
                          isDark ? "text-[#F6F2E7] group-hover:text-[#FFD23F]" : "text-[#14151A] group-hover:text-[#4f7fff]"
                        }`}>
                          {item.label}
                        </div>
                        <div className={`text-[0.78rem] leading-snug transition-colors ${
                          isDark ? "text-white/60 group-hover:text-white/80" : "text-[#73757d] group-hover:text-[#46473f]"
                        }`}>
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Solutions */}
              <div className={`flex-1 border-l pl-6 ${isDark ? "border-white/10" : "border-[rgba(20,21,26,0.08)]"}`}>
                <h4 className={`font-mono text-[0.68rem] font-bold tracking-widest uppercase mb-3.5 pl-3 ${isDark ? "text-[#FFD23F]/90" : "text-[#8a8a7f]"}`}>
                  Solutions
                </h4>
                <div className="flex flex-col gap-1.5">
                  {SOLUTIONS.map((item, idx) => (
                    <Link
                      key={`${item.href}-${idx}`}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-start gap-3.5 p-3 rounded-[16px] transition-all duration-200 group hover:translate-x-1 hover:shadow-xs ${
                        isDark ? "hover:bg-white/5" : "hover:bg-[#f4f6fc]"
                      }`}
                    >
                      <div className={`text-xl w-11 h-11 flex items-center justify-center rounded-2xl shadow-xs group-hover:scale-110 group-hover:-rotate-3 transition-all shrink-0 duration-300 ${
                        isDark
                          ? "bg-white/5 border border-white/10 group-hover:border-[#FFD23F]/50 group-hover:bg-white/10"
                          : "bg-[#fdfbf7] border border-[rgba(20,21,26,0.06)] group-hover:border-[#4f7fff]/30 group-hover:bg-white"
                      }`}>
                        {item.icon}
                      </div>
                      <div className="pt-0.5">
                        <div className={`font-bold text-[0.92rem] mb-0.5 transition-colors ${
                          isDark ? "text-[#F6F2E7] group-hover:text-[#FFD23F]" : "text-[#14151A] group-hover:text-[#4f7fff]"
                        }`}>
                          {item.label}
                        </div>
                        <div className={`text-[0.78rem] leading-snug transition-colors ${
                          isDark ? "text-white/60 group-hover:text-white/80" : "text-[#73757d] group-hover:text-[#46473f]"
                        }`}>
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: Join Us */}
              <div className={`flex-1 border-l pl-6 ${isDark ? "border-white/10" : "border-[rgba(20,21,26,0.08)]"}`}>
                <h4 className={`font-mono text-[0.68rem] font-bold tracking-widest uppercase mb-3.5 pl-3 ${isDark ? "text-[#FFD23F]/90" : "text-[#8a8a7f]"}`}>
                  Join Us
                </h4>
                <div className="flex flex-col gap-1.5">
                  {JOIN_US.map((item, idx) => (
                    <Link
                      key={`${item.href}-${idx}`}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-start gap-3.5 p-3 rounded-[16px] transition-all duration-200 group hover:translate-x-1 hover:shadow-xs ${
                        isDark ? "hover:bg-white/5" : "hover:bg-[#f4f6fc]"
                      }`}
                    >
                      <div className={`text-xl w-11 h-11 flex items-center justify-center rounded-2xl shadow-xs group-hover:scale-110 group-hover:-rotate-3 transition-all shrink-0 duration-300 ${
                        isDark
                          ? "bg-white/5 border border-white/10 group-hover:border-[#FFD23F]/50 group-hover:bg-white/10"
                          : "bg-[#fdfbf7] border border-[rgba(20,21,26,0.06)] group-hover:border-[#4f7fff]/30 group-hover:bg-white"
                      }`}>
                        {item.icon}
                      </div>
                      <div className="pt-0.5">
                        <div className={`font-bold text-[0.92rem] mb-0.5 transition-colors ${
                          isDark ? "text-[#F6F2E7] group-hover:text-[#FFD23F]" : "text-[#14151A] group-hover:text-[#4f7fff]"
                        }`}>
                          {item.label}
                        </div>
                        <div className={`text-[0.78rem] leading-snug transition-colors ${
                          isDark ? "text-white/60 group-hover:text-white/80" : "text-[#73757d] group-hover:text-[#46473f]"
                        }`}>
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 4: Others (Challenges & Sponsorships) */}
              <div className={`flex-1 border-l pl-6 ${isDark ? "border-white/10" : "border-[rgba(20,21,26,0.08)]"}`}>
                <h4 className={`font-mono text-[0.68rem] font-bold tracking-widest uppercase mb-3.5 pl-3 ${isDark ? "text-[#FFD23F]/90" : "text-[#8a8a7f]"}`}>
                  Others
                </h4>
                <div className="flex flex-col gap-1.5">
                  {OTHERS.map((item, idx) => (
                    <Link
                      key={`${item.href}-${idx}`}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-start gap-3.5 p-3 rounded-[16px] transition-all duration-200 group hover:translate-x-1 hover:shadow-xs ${
                        isDark ? "hover:bg-white/5" : "hover:bg-[#f4f6fc]"
                      }`}
                    >
                      <div className={`text-xl w-11 h-11 flex items-center justify-center rounded-2xl shadow-xs group-hover:scale-110 group-hover:-rotate-3 transition-all shrink-0 duration-300 ${
                        isDark
                          ? "bg-white/5 border border-white/10 group-hover:border-[#ff3d81]/50 group-hover:bg-white/10"
                          : "bg-[#fdfbf7] border border-[rgba(20,21,26,0.06)] group-hover:border-[#ff3d81]/30 group-hover:bg-white"
                      }`}>
                        {item.icon}
                      </div>
                      <div className="pt-0.5">
                        <div className={`font-bold text-[0.92rem] mb-0.5 transition-colors ${
                          isDark ? "text-[#F6F2E7] group-hover:text-[#ff3d81]" : "text-[#14151A] group-hover:text-[#ff3d81]"
                        }`}>
                          {item.label}
                        </div>
                        <div className={`text-[0.78rem] leading-snug transition-colors ${
                          isDark ? "text-white/60 group-hover:text-white/80" : "text-[#73757d] group-hover:text-[#46473f]"
                        }`}>
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Mobile Accordion Component ---
function MobileAccordion({
  title,
  items,
  closeNav,
  isOpen,
  onToggle,
  isDark,
}: {
  title: string;
  items: NavItem[];
  closeNav: () => void;
  isOpen: boolean;
  onToggle: () => void;
  isDark?: boolean;
}) {
  return (
    <motion.div variants={slideInItem} className="flex flex-col w-full">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`flex items-center justify-between w-full py-3 text-[1.05rem] font-bold outline-none cursor-pointer ${
          isDark ? "text-[#F6F2E7]" : "text-[#14151A]"
        }`}
      >
        {title}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          width="12" height="8" viewBox="0 0 10 6" fill="none"
          className={isDark ? "text-white/50" : "text-[#8a8a7f]"}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2 } }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1.5 py-3 pl-4 border-l-[3px] border-[#FFD23F]/30 ml-2 mb-2">
              {items.map((item, idx) => (
                <Link
                  key={`${item.href}-${idx}`}
                  href={item.href}
                  onClick={closeNav}
                  className={`px-4 py-2.5 rounded-xl text-[0.92rem] font-medium flex items-center gap-3 transition-colors active:scale-[0.98] ${
                    isDark
                      ? "bg-white/5 text-[#F6F2E7] hover:bg-white/10"
                      : "bg-[#f4f6fc] text-[#46473f] hover:bg-[#e9edf8]"
                  }`}
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DesktopLink({
  href,
  label,
  active,
  isDark,
}: {
  href: string;
  label: string;
  active?: string;
  isDark?: boolean;
}) {
  const isActive = active === href;
  return (
    <Link
      href={href}
      className={`relative group text-[0.92rem] py-2 transition-colors duration-200 outline-none
        ${
          isActive
            ? isDark
              ? "font-bold text-[#FFD23F]"
              : "font-bold text-[#14151A]"
            : isDark
            ? "font-medium text-[#F6F2E7]/80 hover:text-white"
            : "font-semibold text-[#2d2e35] hover:text-[#14151A]"
        }
        after:absolute after:-bottom-1 after:left-0 after:h-[2.5px] after:w-full after:origin-left after:scale-x-0 after:bg-[#FFD23F] after:rounded-full after:transition-transform after:duration-300
        ${isActive ? "after:scale-x-100" : "group-hover:after:scale-x-100"}
      `}
    >
      {label}
    </Link>
  );
}

// --- Main Nav Component ---
export default function Nav({
  active,
  theme,
}: {
  active?: string;
  theme?: "light" | "dark";
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<"product" | "solutions" | "join" | "others" | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Automatic dark mode detection on dark pages (such as /alliances) or explicit theme
  const isDark = theme === "dark" || active === "/alliances";

  const closeNav = () => {
    setMobileMenuOpen(false);
    setOpenSection(null);
  };

  const toggleSection = (section: "product" | "solutions" | "join" | "others") => {
    setOpenSection((current) => (current === section ? null : section));
  };

  return (
    <>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.button
            aria-label="Close menu"
            onClick={closeNav}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed inset-0 z-[55] backdrop-blur-md cursor-default ${
              isDark ? "bg-black/60" : "bg-[#14151A]/20"
            }`}
          />
        )}
      </AnimatePresence>

      <div className="sticky top-6 z-[60] px-6 md:px-16 max-w-[1660px] mx-auto pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center justify-between px-6 py-2.5 rounded-full transition-colors duration-300 ${
            isDark
              ? "bg-[#181920]/95 backdrop-blur-xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-[#F6F2E7]"
              : "bg-white/95 backdrop-blur-xl border border-black/10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-[#14151A]"
          }`}
        >
          {/* ---- BRAND ---- */}
          <Link href="/" className="flex items-center gap-2.5 flex-1 group">
            <motion.span
              whileHover={prefersReducedMotion ? undefined : { rotate: -6, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
              className="block"
            >
              <Image className="w-[32px] h-[32px] rounded-lg object-cover shadow-[0_4px_14px_rgba(79,127,255,0.2)] border border-[rgba(20,21,26,0.05)]" src="/icon.png" alt="UniLife logo" width={32} height={32} priority />
            </motion.span>
            <span className={`font-display text-[1.15rem] tracking-[0.5px] transition-opacity group-hover:opacity-80 ${
              isDark ? "text-[#F6F2E7]" : "text-[#14151A]"
            }`}>
              UNI<b className="text-[#4f7fff] font-normal">LIFE</b>
            </span>
          </Link>

          {/* ---- DESKTOP LINKS ---- */}
          <div className="hidden lg:flex items-center gap-7 justify-center flex-1">
            <DesktopLink href="/" label="Home" active={active} isDark={isDark} />
            <DesktopMegaMenu active={active} isDark={isDark} />
            <DesktopLink href="/about" label="About" active={active} isDark={isDark} />
            <DesktopLink href="/pricing" label="Pricing" active={active} isDark={isDark} />
            <DesktopLink href="/faq" label="FAQ" active={active} isDark={isDark} />
            <DesktopLink href="/contact" label="Contact" active={active} isDark={isDark} />
          </div>

          {/* ---- DESKTOP ACTIONS ---- */}
          <div className="hidden lg:flex items-center justify-end gap-6 flex-1">
            <Link
              href={LOGIN_URL}
              className={`font-body font-bold text-[0.92rem] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                isDark
                  ? "text-[#F6F2E7] hover:text-[#FFD23F] after:bg-[#FFD23F]"
                  : "text-[#14151A] hover:text-[#4f7fff] after:bg-[#4f7fff]"
              }`}
            >
              Sign In
            </Link>
            <motion.a
              className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-[0.88rem] border-2 shadow-[4px_4px_0_#ff3d81] transition-all ${
                isDark
                  ? "bg-[#FFD23F] text-[#14151A]! border-[#FFD23F]"
                  : "bg-[#14151A] text-[#F6F2E7]! border-[#14151A]"
              }`}
              href="/download"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.04, y: -2, boxShadow: "6px 6px 0 #ff3d81" }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.96, y: 0, boxShadow: "2px 2px 0 #ff3d81" }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              Download App →
            </motion.a>
          </div>

          {/* ---- MOBILE TOGGLE ---- */}
          <button
            className={`lg:hidden relative w-10 h-10 border rounded-full shrink-0 flex flex-col justify-center items-center overflow-hidden cursor-pointer ${
              isDark
                ? "border-white/20 bg-white/10"
                : "border-[rgba(20,21,26,0.15)] bg-white/50"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: -4 }}
              className={`absolute w-4 h-[2px] rounded-full transition-transform ${isDark ? "bg-[#F6F2E7]" : "bg-[#14151A]"}`}
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
              className={`absolute w-4 h-[2px] rounded-full transition-opacity ${isDark ? "bg-[#F6F2E7]" : "bg-[#14151A]"}`}
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 4 }}
              className={`absolute w-4 h-[2px] rounded-full transition-transform ${isDark ? "bg-[#F6F2E7]" : "bg-[#14151A]"}`}
            />
          </button>
        </motion.nav>

        {/* ---- MOBILE MENU DRAWER ---- */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
              className={`absolute top-[calc(100%+12px)] left-4 right-4 rounded-[28px] p-6 pointer-events-auto max-h-[85vh] overflow-y-auto z-[60] ${
                isDark
                  ? "bg-[#181920] border border-white/15 text-[#F6F2E7] shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                  : "bg-white border border-[rgba(20,21,26,0.12)] text-[#14151A] shadow-[0_30px_60px_rgba(20,21,26,0.18)]"
              }`}
            >
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-2 mb-6">
                <motion.div variants={slideInItem}>
                  <Link
                    href="/"
                    onClick={closeNav}
                    className={`block py-3 text-[1.1rem] font-bold ${
                      isDark ? "text-[#F6F2E7] active:text-[#FFD23F]" : "text-[#14151A] active:text-[#4f7fff]"
                    }`}
                  >
                    Home
                  </Link>
                </motion.div>
                
                <MobileAccordion
                  title="Products"
                  items={FEATURES}
                  closeNav={closeNav}
                  isOpen={openSection === "product"}
                  onToggle={() => toggleSection("product")}
                  isDark={isDark}
                />
                <MobileAccordion
                  title="Solutions"
                  items={SOLUTIONS}
                  closeNav={closeNav}
                  isOpen={openSection === "solutions"}
                  onToggle={() => toggleSection("solutions")}
                  isDark={isDark}
                />
                <MobileAccordion
                  title="Join Us"
                  items={JOIN_US}
                  closeNav={closeNav}
                  isOpen={openSection === "join"}
                  onToggle={() => toggleSection("join")}
                  isDark={isDark}
                />
                <MobileAccordion
                  title="Others"
                  items={OTHERS}
                  closeNav={closeNav}
                  isOpen={openSection === "others"}
                  onToggle={() => toggleSection("others")}
                  isDark={isDark}
                />

                <motion.div variants={slideInItem}>
                  <Link
                    href="/about"
                    onClick={closeNav}
                    className={`block py-3 mt-2 text-[1.1rem] font-bold border-t ${
                      isDark
                        ? "text-[#F6F2E7] border-white/10 active:text-[#FFD23F]"
                        : "text-[#14151A] border-[rgba(20,21,26,0.06)] active:text-[#4f7fff]"
                    }`}
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div variants={slideInItem}>
                  <Link
                    href="/pricing"
                    onClick={closeNav}
                    className={`block py-3 text-[1.1rem] font-bold ${
                      isDark ? "text-[#F6F2E7] active:text-[#FFD23F]" : "text-[#14151A] active:text-[#4f7fff]"
                    }`}
                  >
                    Pricing
                  </Link>
                </motion.div>
                <motion.div variants={slideInItem}>
                  <Link
                    href="/faq"
                    onClick={closeNav}
                    className={`block py-3 text-[1.1rem] font-bold ${
                      isDark ? "text-[#F6F2E7] active:text-[#FFD23F]" : "text-[#14151A] active:text-[#4f7fff]"
                    }`}
                  >
                    FAQ &amp; Answers
                  </Link>
                </motion.div>
                <motion.div variants={slideInItem}>
                  <Link
                    href="/contact"
                    onClick={closeNav}
                    className={`block py-3 text-[1.1rem] font-bold ${
                      isDark ? "text-[#F6F2E7] active:text-[#FFD23F]" : "text-[#14151A] active:text-[#4f7fff]"
                    }`}
                  >
                    Contact
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                variants={slideInItem}
                initial="hidden"
                animate="show"
                className={`grid grid-cols-1 gap-3 pt-6 border-t ${
                  isDark ? "border-white/10" : "border-[rgba(20,21,26,0.08)]"
                }`}
              >
                <Link
                  href={LOGIN_URL}
                  className={`flex items-center justify-center w-full py-4 rounded-full font-bold active:scale-[0.98] transition-transform ${
                    isDark
                      ? "bg-white/10 text-white hover:bg-white/15"
                      : "bg-[#f4f6fc] text-[#14151A] hover:bg-[#e9edf8]"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/download"
                  className={`flex items-center justify-center w-full py-4 rounded-full font-bold shadow-xl active:scale-[0.98] transition-transform ${
                    isDark
                      ? "bg-[#FFD23F] text-[#14151A]"
                      : "bg-[#14151A] text-white"
                  }`}
                >
                  Download App
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

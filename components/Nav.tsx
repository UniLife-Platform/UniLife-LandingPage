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
  { href: "/challenge", label: "OOU Challenge '26", desc: "Dr. Ogunkoya's 2026/27 venture sprint.", icon: "🏆" },
  { href: "/students", label: "For Students", desc: "Connect, study, and earn rewards.", icon: "🎓" },
  { href: "/sponsorships", label: "Sponsorships & Grants", desc: "Verified student funds & scholarships.", icon: "💎" },
  { href: "/sellers", label: "For Sellers", desc: "Open a UniShop with zero fees.", icon: "💼" },
  { href: "/partners", label: "For School Bodies", desc: "Verified pages for unions and clubs.", icon: "🏛️" },
];

const JOIN_US: NavItem[] = [
  { href: "/join", label: "Campus Ambassadors", desc: "Lead the expansion at your school.", icon: "📢" },
  { href: "/join", label: "Department Partners", desc: "Digitize your faculty association.", icon: "🤝" },
  { href: "/join", label: "Core Team", desc: "Build the future of campus tech.", icon: "💻" },
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
function DesktopMegaMenu({ active }: { active?: string }) {
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

  const isActive = [FEATURES, SOLUTIONS, JOIN_US].flat().some((item) => {
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
        className={`relative flex items-center gap-1.5 text-[0.92rem] py-2 transition-colors duration-200 outline-none
          ${isActive ? "font-bold text-[#14151A]" : "font-medium text-[#14151A]"}
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
          className={open ? "text-[#14151A]" : "text-current"}
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
            className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[880px]"
          >
            <div className="bg-white border border-[rgba(20,21,26,0.12)] rounded-[24px] shadow-[0_40px_80px_rgba(20,21,26,0.12)] p-8 flex gap-6">
              
              {/* Column 1: Product */}
              <div className="flex-1">
                <h4 className="font-mono text-[0.65rem] font-bold tracking-widest text-[#8a8a7f] uppercase mb-4 pl-3">Product</h4>
                <div className="flex flex-col gap-1">
                  {FEATURES.map((item, idx) => (
                    <Link
                      key={`${item.href}-${idx}`}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-4 p-3 hover:bg-[#f4f6fc] rounded-[14px] transition-colors group"
                    >
                      <div className="text-xl bg-[#fdfbf7] border border-[rgba(20,21,26,0.05)] w-11 h-11 flex items-center justify-center rounded-full shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform shrink-0 duration-300">
                        {item.icon}
                      </div>
                      <div className="pt-0.5">
                        <div className="font-bold text-[#14151A] text-[0.92rem] mb-0.5 group-hover:text-[#4f7fff] transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[0.78rem] text-[#8a8a7f] leading-snug">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Solutions */}
              <div className="flex-1 border-l border-[rgba(20,21,26,0.06)] pl-6">
                <h4 className="font-mono text-[0.65rem] font-bold tracking-widest text-[#8a8a7f] uppercase mb-4 pl-3">Solutions</h4>
                <div className="flex flex-col gap-1">
                  {SOLUTIONS.map((item, idx) => (
                    <Link
                      key={`${item.href}-${idx}`}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-4 p-3 hover:bg-[#f4f6fc] rounded-[14px] transition-colors group"
                    >
                      <div className="text-xl bg-[#fdfbf7] border border-[rgba(20,21,26,0.05)] w-11 h-11 flex items-center justify-center rounded-full shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform shrink-0 duration-300">
                        {item.icon}
                      </div>
                      <div className="pt-0.5">
                        <div className="font-bold text-[#14151A] text-[0.92rem] mb-0.5 group-hover:text-[#4f7fff] transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[0.78rem] text-[#8a8a7f] leading-snug">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: Join Us */}
              <div className="flex-1 border-l border-[rgba(20,21,26,0.06)] pl-6">
                <h4 className="font-mono text-[0.65rem] font-bold tracking-widest text-[#8a8a7f] uppercase mb-4 pl-3">Join Us</h4>
                <div className="flex flex-col gap-1">
                  {JOIN_US.map((item, idx) => (
                    <Link
                      key={`${item.href}-${idx}`}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-4 p-3 hover:bg-[#f4f6fc] rounded-[14px] transition-colors group"
                    >
                      <div className="text-xl bg-[#fdfbf7] border border-[rgba(20,21,26,0.05)] w-11 h-11 flex items-center justify-center rounded-full shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform shrink-0 duration-300">
                        {item.icon}
                      </div>
                      <div className="pt-0.5">
                        <div className="font-bold text-[#14151A] text-[0.92rem] mb-0.5 group-hover:text-[#4f7fff] transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[0.78rem] text-[#8a8a7f] leading-snug">
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
}: {
  title: string;
  items: NavItem[];
  closeNav: () => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div variants={slideInItem} className="flex flex-col w-full">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full py-3 text-[1.1rem] font-bold text-[#14151A] outline-none"
      >
        {title}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          width="12" height="8" viewBox="0 0 10 6" fill="none"
          className="text-[#8a8a7f]"
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
                  className="px-4 py-3 rounded-xl bg-[#f4f6fc] text-[0.95rem] font-medium text-[#46473f] flex items-center gap-3 transition-colors active:scale-[0.98]"
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
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

function DesktopLink({ href, label, active }: { href: string; label: string; active?: string }) {
  const isActive = active === href;
  return (
    <Link
      href={href}
      className={`relative group text-[0.92rem] py-2 transition-colors duration-200 outline-none
        ${isActive ? "font-bold text-[#14151A]" : "font-medium text-[#8a8a7f] hover:text-[#14151A]"}
        after:absolute after:-bottom-1 after:left-0 after:h-[2.5px] after:w-full after:origin-left after:scale-x-0 after:bg-[#FFD23F] after:rounded-full after:transition-transform after:duration-300
        ${isActive ? "after:scale-x-100" : "group-hover:after:scale-x-100"}
      `}
    >
      {label}
    </Link>
  );
}

// --- Main Nav Component ---
export default function Nav({ active }: { active?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<"product" | "solutions" | "join" | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const closeNav = () => {
    setMobileMenuOpen(false);
    setOpenSection(null);
  };

  const toggleSection = (section: "product" | "solutions" | "join") => {
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
            className="fixed inset-0 z-[55] bg-[#14151A]/20 backdrop-blur-md cursor-default"
          />
        )}
      </AnimatePresence>

      <div className="sticky top-6 z-[60] px-6 md:px-16 max-w-[1660px] mx-auto pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pointer-events-auto flex items-center justify-between px-6 py-2.5 bg-white/90 backdrop-blur-xl border border-black/10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
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
            <span className="font-display text-[1.15rem] tracking-[0.5px] text-[#14151A] group-hover:opacity-80 transition-opacity">
              UNI<b className="text-[#4f7fff] font-normal">LIFE</b>
            </span>
          </Link>

          {/* ---- DESKTOP LINKS ---- */}
          <div className="hidden lg:flex items-center gap-7 justify-center flex-1">
            <DesktopLink href="/" label="Home" active={active} />
            <DesktopMegaMenu active={active} />
            <DesktopLink href="/about" label="About" active={active} />
            <DesktopLink href="/pricing" label="Pricing" active={active} />
            <DesktopLink href="/faq" label="FAQ" active={active} />
            <DesktopLink href="/contact" label="Contact" active={active} />
          </div>

          {/* ---- DESKTOP ACTIONS ---- */}
          <div className="hidden lg:flex items-center justify-end gap-6 flex-1">
            <Link href={LOGIN_URL} className="font-body font-bold text-[0.92rem] text-[#14151A] hover:text-[#4f7fff] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:bg-[#4f7fff] after:transition-transform after:duration-300">
              Sign In
            </Link>
            <motion.a
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-[0.88rem] bg-[#14151A] text-[#F6F2E7]! border-2 border-[#14151A] shadow-[4px_4px_0_#ff3d81]"
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
            className="lg:hidden relative w-10 h-10 border border-[rgba(20,21,26,0.15)] rounded-full shrink-0 bg-white/50 flex flex-col justify-center items-center overflow-hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <motion.span animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: -4 }} className="absolute w-4 h-[2px] bg-[#14151A] rounded-full transition-transform" />
            <motion.span animate={mobileMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }} className="absolute w-4 h-[2px] bg-[#14151A] rounded-full transition-opacity" />
            <motion.span animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 4 }} className="absolute w-4 h-[2px] bg-[#14151A] rounded-full transition-transform" />
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
              className="absolute top-[calc(100%+12px)] left-4 right-4 bg-white border border-[rgba(20,21,26,0.12)] rounded-[28px] p-6 shadow-[0_30px_60px_rgba(20,21,26,0.18)] pointer-events-auto max-h-[85vh] overflow-y-auto z-[60]"
            >
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-2 mb-6">
                <motion.div variants={slideInItem}>
                  <Link href="/" onClick={closeNav} className="block py-3 text-[1.1rem] font-bold text-[#14151A] active:text-[#4f7fff]">Home</Link>
                </motion.div>
                
                <MobileAccordion
                  title="Product"
                  items={FEATURES}
                  closeNav={closeNav}
                  isOpen={openSection === "product"}
                  onToggle={() => toggleSection("product")}
                />
                <MobileAccordion
                  title="Solutions"
                  items={SOLUTIONS}
                  closeNav={closeNav}
                  isOpen={openSection === "solutions"}
                  onToggle={() => toggleSection("solutions")}
                />
                <MobileAccordion
                  title="Join Us"
                  items={JOIN_US}
                  closeNav={closeNav}
                  isOpen={openSection === "join"}
                  onToggle={() => toggleSection("join")}
                />

                <motion.div variants={slideInItem}>
                  <Link href="/about" onClick={closeNav} className="block py-3 mt-2 text-[1.1rem] font-bold text-[#14151A] border-t border-[rgba(20,21,26,0.06)] active:text-[#4f7fff]">About</Link>
                </motion.div>
                <motion.div variants={slideInItem}>
                  <Link href="/pricing" onClick={closeNav} className="block py-3 text-[1.1rem] font-bold text-[#14151A] active:text-[#4f7fff]">Pricing</Link>
                </motion.div>
                <motion.div variants={slideInItem}>
                  <Link href="/faq" onClick={closeNav} className="block py-3 text-[1.1rem] font-bold text-[#14151A] active:text-[#4f7fff]">FAQ & Answers</Link>
                </motion.div>
                <motion.div variants={slideInItem}>
                  <Link href="/contact" onClick={closeNav} className="block py-3 text-[1.1rem] font-bold text-[#14151A] active:text-[#4f7fff]">Contact</Link>
                </motion.div>
              </motion.div>

              <motion.div variants={slideInItem} initial="hidden" animate="show" className="grid grid-cols-1 gap-3 pt-6 border-t border-[rgba(20,21,26,0.08)]">
                <Link href={LOGIN_URL} className="flex items-center justify-center w-full py-4 rounded-full font-bold bg-[#f4f6fc] text-[#14151A] active:scale-[0.98] transition-transform">
                  Sign In
                </Link>
                <Link href="/download"className="flex items-center justify-center w-full py-4 rounded-full font-bold bg-[#14151A] !text-white shadow-xl active:scale-[0.98] transition-transform">
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
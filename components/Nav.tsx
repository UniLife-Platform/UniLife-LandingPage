"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students" },
  { href: "/sellers", label: "Sellers" },
  { href: "/partners", label: "Partners" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
];

// Points at the current live web app. Swap this when the app moves
// to app.unilife.com.ng.
const LOGIN_URL = "https://unilife.com.ng/app";
const APP_URL = "https://www.harrisonking.com.ng/apps/unilife";

export default function Nav({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      className="site-nav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link className="brand" href="/">
        <motion.span
          whileHover={{ rotate: -6, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          style={{ display: "block" }}
        >
          <Image
            className="brand__mark"
            src="/icon.png"
            alt="UniLife logo"
            width={36}
            height={36}
          />
        </motion.span>
        <span>
          UNI<b>LIFE</b>
        </span>
      </Link>

      {/* Desktop nav */}
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={active === link.href ? "active" : ""}>
              {link.label}
            </Link>
          </li>
        ))}
        <li className="nav-cta">
          <motion.a
            className="btn btn-primary"
            href={LOGIN_URL}
            style={{ padding: "10px 18px" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Log In
          </motion.a>
          <motion.a
            className="btn btn-primary"
            href={APP_URL}
            style={{ padding: "10px 18px" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Get the app
          </motion.a>
        </li>
      </ul>

      {/* Mobile toggle */}
      <button
        className={`nav-toggle${open ? " is-open" : ""}`}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobileNavPanel"
        onClick={() => setOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobileNavPanel"
            className="mobile-nav-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <Link
                  href={link.href}
                  className={active === link.href ? "active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              className="mobile-cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: NAV_LINKS.length * 0.04 }}
            >
              <a href={LOGIN_URL} className="btn btn-ghost" onClick={() => setOpen(false)}>
                Log in
              </a>
              <a href={APP_URL} className="btn btn-primary" onClick={() => setOpen(false)}>
                Get the app
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

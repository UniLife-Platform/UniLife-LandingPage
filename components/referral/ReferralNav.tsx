"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/referral", label: "Home" },
  { href: "/referral/about", label: "About" },
  { href: "/referral/tiers", label: "Prize Tiers" },
  { href: "/referral/money", label: "The Pot" },
  { href: "/referral/leaderboard", label: "Leaderboard" },
  { href: "/referral/help", label: "Get Involved" },
  { href: "/referral/contact", label: "Contact" },
];

export default function ReferralNav({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="topnav">
        <Link className="brand" href="/referral">
          <Image src="/icon.png" alt="UniLife" width={26} height={26} />
          UNILIFE <small>&nbsp;·&nbsp;REFERRAL CHALLENGE</small>
        </Link>
        <div className="nav-right">
          <ul className="nav-links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={active === link.href ? "active" : ""}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className={`hamburger${open ? " open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={active === link.href ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}

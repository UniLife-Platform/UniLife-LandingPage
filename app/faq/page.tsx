"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/2348164670694";
const EMAIL_URL = "mailto:unilife.edu.org@gmail.com";

type QA = { q: string; a: string };
type Category = {
  title: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  items: QA[];
};

const CATEGORIES: Category[] = [
  {
    title: "Getting started",
    accent: "#4f7fff",
    accentBg: "rgba(79,127,255,0.08)",
    accentBorder: "rgba(79,127,255,0.25)",
    items: [
      {
        q: "Is UniLife free to use?",
        a: "Yes. The Free plan gives you a real profile, marketplace listings, and study hub access at no cost. Pro and Creator plans exist for students and sellers who want extra features like unlimited listings, ad-free browsing, and priority support — but nothing about basic access requires paying.",
      },
      {
        q: "Do I need my school email to sign up?",
        a: "You'll need to verify with a valid student email or matric number tied to an accredited university. This is what keeps UniLife a closed, verified network instead of an open platform with strangers and bots.",
      },
      {
        q: "Is UniLife only for one university?",
        a: "No — UniLife is open to students at any university. We started at OOU, but the platform is built to support any accredited institution as more students join.",
      },
      {
        q: "What if my university isn't listed yet?",
        a: "Sign up anyway using your student email. Departments and campus-specific features roll out as more students from your school join — the more people bring their campus in, the faster it activates.",
      },
    ],
  },
  {
    title: "SP & rewards",
    accent: "#059669",
    accentBg: "rgba(52,211,153,0.12)",
    accentBorder: "rgba(52,211,153,0.3)",
    items: [
      {
        q: "What is SP (Status Points)?",
        a: "SP is UniLife's in-app rewards currency. You earn it through daily login streaks, contributing study materials, referrals, and other activity, and spend it on things like ad-free browsing, marketplace listing boosts, and custom profile themes.",
      },
      {
        q: "Can I withdraw or cash out SP?",
        a: "No. SP is a rewards balance, not stored monetary value — it can't be redeemed, refunded, or transferred outside the app. You can top up SP with Naira to spend inside UniLife, but it never converts back the other way.",
      },
      {
        q: "How do I earn SP for free?",
        a: "Daily login streaks, uploading verified past questions or notes, referring friends, and other in-app contributions all earn SP automatically — no purchase required.",
      },
      {
        q: "Do SP levels or ranks expire?",
        a: "Your SP balance carries over, but department leaderboards reset each semester so every student gets a fresh shot at the top spots.",
      },
    ],
  },
  {
    title: "Marketplace & selling",
    accent: "#b8860b",
    accentBg: "rgba(255,210,63,0.18)",
    accentBorder: "rgba(255,210,63,0.4)",
    items: [
      {
        q: "How do I open a UniShop?",
        a: "Head to the Sellers section in-app and set up your storefront — add your first listing, verify your student profile, and you're live. It's free for early adopters, with no listing fees.",
      },
      {
        q: "Is it safe to buy from strangers on UniLife?",
        a: "Every seller on UniLife is a verified student, not an anonymous account — but we still recommend meeting in well-lit, public campus areas, inspecting items before payment, and avoiding wire transfers to people you haven't met. UniLife isn't a party to transactions and can't guarantee individual listings.",
      },
      {
        q: "What can I sell?",
        a: "Textbooks, electronics, hostel essentials, and other legitimate items students need. Prohibited items follow our Terms of Use — no counterfeit goods, weapons, drugs, or anything illegal.",
      },
      {
        q: "What happens if a transaction goes wrong?",
        a: "Report it immediately through the in-app reporting system. UniLife can suspend accounts for violations, but as a peer-to-peer marketplace we're not able to resolve individual payment disputes — that's why we push hard on public, in-person meetups over sight-unseen payments.",
      },
    ],
  },
  {
    title: "Privacy & safety",
    accent: "#ff3d81",
    accentBg: "rgba(255,61,129,0.08)",
    accentBorder: "rgba(255,61,129,0.25)",
    items: [
      {
        q: "Who can see my profile and posts?",
        a: "Only verified students on UniLife can see campus content — the platform isn't indexed or open to the public. Your specific privacy settings (like anonymous posting in confessions) are controlled in-app.",
      },
      {
        q: "Can I post anonymously?",
        a: "Yes, in designated spaces like community confessions. Your identity stays hidden from other users, though UniLife still requires an underlying verified account to prevent abuse.",
      },
      {
        q: "How do I report harassment or a fake account?",
        a: "Use the in-app reporting system on any post, listing, or profile. Reports are reviewed and can result in warnings, suspensions, or permanent bans depending on severity — see our Terms of Use for the full policy.",
      },
      {
        q: "How do I delete my account?",
        a: "You can delete your account anytime from app settings. Your personal information is removed; content you've shared publicly (like study notes) may remain but is anonymized.",
      },
    ],
  },
  {
    title: "Partners & organisations",
    accent: "#4f7fff",
    accentBg: "rgba(79,127,255,0.08)",
    accentBorder: "rgba(79,127,255,0.25)",
    items: [
      {
        q: "How does my department or club get a verified page?",
        a: "Reach out through our Partners page — verified pages are currently rolling out in tiers, with Founding Partner status reserved for the first organisations to onboard their members.",
      },
      {
        q: "Does it cost anything to partner with UniLife?",
        a: "No upfront cost. We ask for one official announcement post, onboarding 20–50 active members through your partner link, and nominating executives for the Partners Feedback Council — that's it.",
      },
    ],
  },
];

function AccordionItem({ item, accent }: { item: QA; accent: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[rgba(20,21,26,0.1)] overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
      >
        <span className="font-bold text-[0.98rem] text-[#14151A] leading-snug">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold"
          style={{ background: `${accent}1a`, color: accent }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[#46473f] text-[0.92rem] leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-hidden font-body antialiased">
      <Nav active="/faq" />

      {/* ---- PAGE HEAD ---- */}
      <section className="pt-24 pb-16 px-6 md:px-16 max-w-[1160px] mx-auto">
        <div className="text-center max-w-[720px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
              Got questions?
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase mb-6 leading-[1.02] text-[#14151A]">
              Everything you&apos;re wondering about UniLife.
            </h1>
            <p className="text-[#46473f] text-lg md:text-xl leading-relaxed max-w-[600px] mx-auto">
              From SP to safety to selling — the honest answers, no fine print.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---- FAQ CATEGORIES ---- */}
      <section className="pb-20 px-6 md:px-16 max-w-[820px] mx-auto flex flex-col gap-14">
        {CATEGORIES.map((cat, ci) => (
          <div key={cat.title}>
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: cat.accent }}
              />
              <h2 className="font-display text-xl md:text-2xl uppercase leading-tight text-[#14151A]">
                {cat.title}
              </h2>
            </motion.div>

            <motion.div
              className="flex flex-col gap-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ staggerChildren: 0.06 }}
            >
              {cat.items.map((item) => (
                <motion.div
                  key={item.q}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.35 }}
                >
                  <AccordionItem item={item} accent={cat.accent} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </section>

      {/* ---- STILL HAVE QUESTIONS ---- */}
      <section className="pb-24 px-6 md:px-16 max-w-[1160px] mx-auto">
        <motion.div
          className="bg-[#14151A] text-[#F6F2E7] rounded-[32px] p-12 md:p-16 text-center relative shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.4rem)] uppercase mb-4 text-[#F6F2E7]">
            Still have a question?
          </h2>
          <p className="text-[rgba(246,242,231,0.75)] mb-10 max-w-[460px] mx-auto leading-relaxed text-lg">
            We'd rather answer it directly than have you guess.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-[#FFD23F] !text-[#14151A] border-2 border-[#FFD23F] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all whitespace-nowrap"
            >
              Message on WhatsApp →
            </a>
            <a
              href={EMAIL_URL}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-white border-2 border-[rgba(255,255,255,0.2)] hover:bg-[#F6F2E7] hover:!text-[#14151A] transition-all whitespace-nowrap"
            >
              Email us
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
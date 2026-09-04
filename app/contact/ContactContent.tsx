"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/2348164670694";
const EMAIL_URL = "mailto:unilife.edu.org@gmail.com";

const CHANNELS = [
  {
    emoji: "💬",
    title: "WhatsApp",
    detail: "+234 816 467 0694",
    sub: "Fastest way to reach us — usually a reply within the hour.",
    href: WHATSAPP_URL,
    accent: "#34d399",
    accentBg: "rgba(52,211,153,0.15)",
    accentBorder: "rgba(52,211,153,0.3)",
    external: true,
  },
  {
    emoji: "✉️",
    title: "Email",
    detail: "unilife.edu.org@gmail.com",
    sub: "Best for partnerships, press, and anything that needs a paper trail.",
    href: EMAIL_URL,
    accent: "#4f7fff",
    accentBg: "rgba(79,127,255,0.1)",
    accentBorder: "rgba(79,127,255,0.3)",
    external: false,
  },
  {
    emoji: "🌐",
    title: "Website",
    detail: "unilife.com.ng",
    sub: "See what we're building and where we're live right now.",
    href: "https://unilife.com.ng",
    accent: "#ff3d81",
    accentBg: "rgba(255,61,129,0.1)",
    accentBorder: "rgba(255,61,129,0.3)",
    external: true,
  },
];

const AUDIENCES = [
  {
    emoji: "🎓",
    title: "I'm a student",
    body: "Questions about your account, SP balance, or getting your campus verified.",
    href: "/students",
  },
  {
    emoji: "🛍️",
    title: "I want to sell",
    body: "Open a UniShop storefront and start reaching your campus today.",
    href: "/sellers",
  },
  {
    emoji: "🏫",
    title: "I'm a school body",
    body: "Class reps, hostel heads, and department associations — let's partner up.",
    href: "/partners",
  },
];

export default function ContactContent() {
  return (
    <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased">
      <Nav active="/contact" />

      {/* ---- PAGE HEAD & HERO IMAGE ---- */}
      <section className="pt-24 pb-16 px-6 md:px-16 max-w-[1160px] mx-auto">
        <div className="text-center max-w-[820px] mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
              Let&apos;s talk
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase mb-6 leading-[1.02] text-[#14151A]">
              Say hello.
            </h1>
            <p className="text-[#46473f] text-lg md:text-xl leading-relaxed max-w-[640px] mx-auto mb-10">
              Whether you&apos;re a student with feedback, a seller ready to
              open a storefront, or a school body ready to partner — we read
              everything, and a real person replies.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-[#14151A] !text-white border-2 border-[#14151A] shadow-[4px_4px_0_#ff3d81] hover:shadow-[6px_6px_0_#ff3d81] hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                Message on WhatsApp →
              </a>
              <a
                href={EMAIL_URL}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-[#14151A] border-2 border-[#14151A] hover:bg-[#14151A] hover:!text-white transition-all whitespace-nowrap"
              >
                Email us
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full h-[36vh] md:h-[52vh] rounded-[32px] overflow-hidden shadow-2xl relative bg-[#EFE9D9]"
        >
          <img
            src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student checking messages on their phone between classes"
            className="w-full h-full object-cover"
          />

          <motion.div
            className="absolute bottom-5 left-5 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-[rgba(20,21,26,0.12)] max-w-[260px]"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <div className="flex justify-between font-mono text-[0.65rem] text-[#8a8a7f] mb-2 font-semibold uppercase">
              <span>Response time</span>
              <span>~1 hour</span>
            </div>
            <div className="bg-[#f4f6fc] p-3 rounded-xl border-l-4 border-[#4f7fff]">
              <div className="text-[0.85rem] text-[#14151A] leading-snug font-medium">
                No ticket numbers, no bots — just the founder&apos;s inbox.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ---- CHANNELS ---- */}
      <section className="py-16 px-6 md:px-16 max-w-[1160px] mx-auto">
        <motion.div
          className="max-w-[700px] mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-3 py-1 rounded-full mb-4 uppercase">
            Reach us directly
          </span>
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 leading-tight">
            Pick your channel.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="block bg-white rounded-2xl p-8 shadow-sm hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,21,26,0.08)] transition-all duration-300"
              style={{
                borderTop: `4px solid ${c.accent}`,
                borderLeft: "1px solid rgba(20,21,26,0.12)",
                borderRight: "1px solid rgba(20,21,26,0.12)",
                borderBottom: "1px solid rgba(20,21,26,0.12)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 border"
                style={{ background: c.accentBg, borderColor: c.accentBorder }}
              >
                {c.emoji}
              </div>
              <h3 className="font-bold text-[1.15rem] mb-1">{c.title}</h3>
              <div className="font-mono text-[0.85rem] text-[#14151A] mb-3 font-semibold">
                {c.detail}
              </div>
              <p className="text-[#46473f] text-[0.9rem] leading-relaxed">
                {c.sub}
              </p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ---- WHO ARE YOU ---- */}
      <section className="py-16 px-6 md:px-16 max-w-[1160px] mx-auto">
        <div className="bg-[rgba(255,210,63,0.15)] rounded-[32px] p-10 md:p-16">
          <motion.div
            className="max-w-[700px] mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block font-mono text-xs tracking-widest text-[#14151A] bg-white border border-[rgba(20,21,26,0.12)] px-3 py-1 rounded-full mb-4 uppercase font-bold">
              Tell us who you are
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 leading-tight">
              We&apos;ll point you the right way.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {AUDIENCES.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Link
                  href={a.href}
                  className="block bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-7 h-full shadow-sm hover:-translate-y-1 transition-transform"
                >
                  <div className="text-2xl mb-4">{a.emoji}</div>
                  <h4 className="font-bold text-[1.1rem] mb-2">{a.title}</h4>
                  <p className="text-[#46473f] text-[0.9rem] leading-relaxed mb-4">
                    {a.body}
                  </p>
                  <span className="font-mono text-[0.75rem] font-bold text-[#14151A] uppercase tracking-wide">
                    Go there →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FOUNDER STRIP ---- */}
      <section className="py-16 px-6 md:px-16 max-w-[1160px] mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center bg-white border border-[rgba(20,21,26,0.12)] rounded-[32px] p-8 md:p-10 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Harrison"
            alt="Harrison Ariwodo, Founder of UniLife"
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8fb0ff] to-[#1c2c66] p-2 shrink-0"
          />
          <div>
            <div className="font-mono text-[0.7rem] tracking-widest uppercase text-[#8a8a7f] font-semibold mb-1">
              Founder, UniLife
            </div>
            <h3 className="font-bold text-[1.3rem] mb-1">Harrison Ariwodo</h3>
            <p className="text-[#46473f] text-[0.95rem] leading-relaxed">
              Every message that comes through this page lands with me directly
              — no support queue in between.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ---- CLOSING CTA ---- */}
      <section className="py-24 px-6 md:px-16 max-w-[1160px] mx-auto">
        <motion.div
          className="bg-[#14151A] text-[#F6F2E7] rounded-[32px] p-12 md:p-16 text-center relative shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://images.pexels.com/photos/1105315/pexels-photo-1105315.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Background texture"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <h2 className="relative z-10 font-display text-[clamp(2rem,4vw,2.8rem)] uppercase mb-4 text-[#F6F2E7]">
            Still have questions?
          </h2>
          <p className="relative z-10 text-[rgba(246,242,231,0.75)] mb-10 max-w-[500px] mx-auto leading-relaxed text-lg">
            Check our terms and privacy policy, or just message us directly —
            whichever&apos;s faster for you.
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
              href="/policy"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-white border-2 border-[rgba(255,255,255,0.2)] hover:bg-[#F6F2E7] hover:!text-[#14151A] transition-all whitespace-nowrap"
            >
              Read our policies
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

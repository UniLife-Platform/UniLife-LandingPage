"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "motion/react";
import { MessageCircle, ArrowUpRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/2348164670694";
const EMAIL_URL = "mailto:hello@unilife.com.ng";

function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82c-.87-.96-1.34-2.19-1.34-3.47h-3.19v13.44c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9c.31 0 .61.05.89.14V9.86a6.18 6.18 0 0 0-.89-.06 6.14 6.14 0 0 0-6.14 6.14A6.14 6.14 0 0 0 9.17 22a6.14 6.14 0 0 0 6.14-6.14V9.01a8.4 8.4 0 0 0 4.91 1.58V7.4a5.2 5.2 0 0 1-3.62-1.58z" />
    </svg>
  );
}

function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 2.9h3.1l-6.8 7.75L23.2 21.1h-6.27l-4.9-6.41-5.61 6.41H3.3l7.27-8.3L2.8 2.9h6.43l4.43 5.86 5.24-5.86Zm-1.1 16.35h1.72L7.31 4.65H5.46l12.34 14.6Z" />
    </svg>
  );
}

const SOCIAL_COMMUNITIES = [
  {
    platform: "Instagram",
    handle: "@unilife_connect",
    description: "Daily campus highlights, student spot-checks, behind-the-scenes & giveaway drops.",
    href: "https://www.instagram.com/unilife_connect",
    icon: InstagramIcon,
    badge: "Official IG",
    tagline: "Visual updates & campus stories",
    accentColor: "#E1306C",
    bgHover: "hover:border-[#E1306C]/40 hover:shadow-[0_16px_36px_rgba(225,48,108,0.12)]",
    buttonBg: "group-hover:bg-[#E1306C] group-hover:text-white",
  },
  {
    platform: "TikTok",
    handle: "@unilifeconnect",
    description: "Campus street interviews, university banter, student hustle breakdowns & viral moments.",
    href: "https://www.tiktok.com/@unilifeconnect?_r=1&_t=ZS-992NpLGLfAC",
    icon: TikTokIcon,
    badge: "Viral Content",
    tagline: "Short clips & student lives",
    accentColor: "#000000",
    bgHover: "hover:border-black/50 hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)]",
    buttonBg: "group-hover:bg-black group-hover:text-white",
  },
  {
    platform: "X (formerly Twitter)",
    handle: "@unilife_connect",
    description: "Live announcements, university policy discussions, feature release notes & student spaces.",
    href: "https://x.com/unilife_connect",
    icon: XIcon,
    badge: "Discussions",
    tagline: "Real-time news & Spaces",
    accentColor: "#14151A",
    bgHover: "hover:border-[#14151A]/50 hover:shadow-[0_16px_36px_rgba(20,21,26,0.12)]",
    buttonBg: "group-hover:bg-[#14151A] group-hover:text-white",
  },
  {
    platform: "WhatsApp Channel",
    handle: "Join the Channel",
    description: "Instant drop alerts for scholarships, campus challenge deadlines, and verified university news.",
    href: "https://chat.whatsapp.com/I4DTryVfFCPDMqyceqxcQl",
    icon: MessageCircle,
    badge: "Instant Alerts",
    tagline: "Broadcast alerts & urgent updates",
    accentColor: "#25D366",
    bgHover: "hover:border-[#25D366]/40 hover:shadow-[0_16px_36px_rgba(37,211,102,0.12)]",
    buttonBg: "group-hover:bg-[#25D366] group-hover:text-white",
  },
];

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
    detail: "hello@unilife.com.ng",
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

      {/* ---- BOLD SOCIALS & COMMUNITY SHOWCASE ---- */}
      <section className="py-16 px-6 md:px-16 max-w-[1160px] mx-auto">
        <motion.div
          className="bg-white border-2 border-[#14151A] rounded-[32px] p-8 md:p-14 shadow-[8px_8px_0_#14151A]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-[#14151A]/10 mb-10">
            <div className="max-w-[620px]">
              <span className="inline-block font-mono text-xs tracking-widest text-[#14151A] bg-[#FFD23F] border border-[#14151A]/20 px-3.5 py-1 rounded-full mb-3 uppercase font-bold">
                Follow us on socials
              </span>
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-[#14151A] leading-tight">
                Connect With Campus Everywhere.
              </h2>
              <p className="text-[#46473f] text-sm md:text-base mt-2 leading-relaxed">
                We share campus highlights, drop real-time updates, spotlight student entrepreneurs, and host regular live community Spaces. Tap to follow us across our official handles.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14151A]">
                All Official Accounts Verified
              </span>
            </div>
          </div>

          {/* Socials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SOCIAL_COMMUNITIES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.a
                  key={item.platform}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-[#FAF9F5] border-2 border-[#14151A] rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group hover:-translate-y-1 ${item.bgHover}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center border-2 border-[#14151A] shadow-[2px_2px_0_#14151A] transition-transform group-hover:scale-105"
                        style={{
                          backgroundColor: item.platform === "WhatsApp Channel" ? "#25D366" : item.platform === "Instagram" ? "#E1306C" : "#14151A",
                          color: "#FFFFFF",
                        }}
                      >
                        <IconComp size={20} />
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-[#14151A]/15 text-[#14151A]">
                        {item.badge}
                      </span>
                    </div>

                    {/* Platform & Handle */}
                    <h3 className="font-display text-xl uppercase text-[#14151A] mb-1 group-hover:text-[#4f7fff] transition-colors">
                      {item.platform}
                    </h3>
                    <p className="font-mono text-xs font-bold text-[#8a8a7f] mb-3">
                      {item.handle}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-[#52534a] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Strip */}
                  <div className="pt-3 border-t border-[#14151A]/10 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#14151A] uppercase tracking-wider group-hover:underline underline-offset-4">
                      Follow page
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#14151A] text-white flex items-center justify-center transition-all group-hover:bg-[#FFD23F] group-hover:text-[#14151A] shadow-xs">
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
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

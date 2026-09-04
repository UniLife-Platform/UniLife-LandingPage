"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/2348164670694";
const EMAIL_URL = "mailto:unilife.edu.org@gmail.com";

type BenefitItem = { code: string; title: string; points: string[] };

const BENEFITS: BenefitItem[] = [
  {
    code: "COUNCIL",
    title: "Shape the platform's future",
    points: [
      "A permanent seat in the private Partners Feedback Council",
      "Propose and vote on new features before general release",
      "Beta-test new capabilities ahead of the wider campus",
    ],
  },
  {
    code: "REACH",
    title: "Algorithmic immunity — 100% guaranteed reach",
    points: [
      "Every post reaches 100% of your followers — zero filtering",
      "High-priority updates trigger push notifications to all followers",
      "Your voice always lands first",
    ],
  },
  {
    code: "STATUS",
    title: "Official recognition & campus status",
    points: [
      "Verified Partner badge displayed on your page",
      "Priority placement in the Official Bodies & Clubs directory",
      "Exclusive 'Founding Partner' badge — first 5 organisations only",
    ],
  },
];

type Partner = { name: string; href: string; img: string };

const PARTNERS: Partner[] = [
  {
    name: "SDG Youth Connect West Africa",
    href: "https://www.sdgyouthconnect.org/",
    img: "/partner-sdg-youth-connect.png",
  },
  {
    name: "Kinstek",
    href: "https://kinstek.vercel.app/",
    img: "/partner-kinstek.png",
  },
  {
    name: "NUESA",
    href: "https://www.nuesaoou.com.ng/",
    img: "/partner-nuesa.png",
  },
  {
    name: "Olabisi Onabanjo University",
    href: "https://main.oouagoiwoye.edu.ng/",
    img: "/partner-oou.png",
  },
];

function PartnersMarquee({ partners }: { partners: Partner[] }) {
  const [isPaused, setIsPaused] = useState(false);
  // duplicate the list so the loop is seamless
  const loop = [...partners, ...partners];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* edge fades so logos don't hard-cut at the container edge */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[#F6F2E7] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[#F6F2E7] to-transparent" />

      <motion.div
        className="flex gap-6 w-max"
        animate={isPaused ? {} : { x: ["0%", "-50%"] }}
        transition={{
          duration: partners.length * 6,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loop.map((p, i) => (
          <a
            key={`${p.name}-${i}`}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-8 flex items-center justify-center h-[140px] w-[220px] shrink-0 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,21,26,0.08)] transition-all duration-300"
          >
            <img
              src={p.img}
              alt={p.name}
              className="max-h-[64px] max-w-full object-contain"
            />
          </a>
        ))}
      </motion.div>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <>
      <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased">
        <Nav active="/partners" />

        {/* ---- PAGE HEAD ---- */}
        <section className="pt-24 pb-16 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="text-center max-w-[900px] mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
                Open to partnership
              </span>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase mb-6 leading-[1.02] text-[#14151A]">
                For school bodies, departments, student unions &amp; clubs.
              </h1>
              <p className="text-[#46473f] text-lg md:text-xl leading-relaxed max-w-[700px] mx-auto mb-10">
                A verified UniLife page is your organisation&apos;s permanent
                digital headquarters. Command attention, centralise operations,
                and engage every member — without fighting an algorithm.
              </p>

              <div className="flex flex-wrap justify-center gap-3.5 mb-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-[#14151A] !text-white border-2 border-[#14151A] shadow-[4px_4px_0_#ff3d81] hover:shadow-[6px_6px_0_#ff3d81] hover:-translate-y-0.5 transition-all whitespace-nowrap"
                >
                  Claim your partner page →
                </Link>
                <a
                  href="#tiers"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-[#14151A] border-2 border-[#14151A] hover:bg-[#14151A] hover:!text-white transition-all whitespace-nowrap"
                >
                  See the tiers
                </a>
              </div>
            </motion.div>

            {/* ---- STAT BOXES ---- */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[700px] mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            >
              {[
                { val: "100%", label: "Verified students" },
                { val: "Closed", label: "Authenticated network" },
                { val: "Live", label: "Platform status" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-5"
                >
                  <b className="block font-display text-2xl leading-none mb-1.5 text-[#14151A]">
                    {s.val}
                  </b>
                  <span className="font-mono text-[0.68rem] tracking-widest text-[#8a8a7f] uppercase font-semibold">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ---- HERO IMAGE ---- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full h-[40vh] md:h-[55vh] rounded-[32px] overflow-hidden shadow-2xl relative bg-[#EFE9D9] mb-20"
          >
            <img
              src="https://images.pexels.com/photos/6592665/pexels-photo-6592665.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Student union leaders in a meeting"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* ---- PULL QUOTE ---- */}
          <motion.div
            className="relative overflow-hidden rounded-[32px] p-12 md:p-20 text-center shadow-[0_20px_40px_rgba(20,21,26,0.15)] bg-[#14151A]"
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
            <h2 className="relative z-10 font-['Instrument_Serif',serif] italic text-3xl md:text-4xl lg:text-5xl text-[#F6F2E7] tracking-tight mb-3">
              &ldquo;Built for students, by students. A campus revolution starts
              here.&rdquo;
            </h2>
            <span className="relative z-10 font-mono text-xs tracking-widest text-[rgba(246,242,231,0.6)] uppercase">
              — UniLife mission statement
            </span>
          </motion.div>
        </section>

        {/* ---- CURRENT PARTNERS (sliding) ---- */}
        <section className="py-20 px-0 md:px-16 max-w-[1160px] mx-auto">
          <div className="text-center max-w-[700px] mx-auto mb-12 px-6 md:px-0">
            <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-3 py-1 rounded-full mb-4 uppercase">
              Current partners
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 leading-tight">
              Organisations already backing UniLife.
            </h2>
            <p className="text-[#46473f] text-lg leading-relaxed">
              A growing list of youth-focused bodies working alongside us — with
              room for more.
            </p>
          </div>

          <PartnersMarquee partners={PARTNERS} />

          <p className="text-center font-mono text-[0.78rem] text-[#8a8a7f] uppercase tracking-wide mt-8 px-6 md:px-0">
            Your organisation could be here — hover the strip to pause, or{" "}
            <Link href="/contact" className="underline text-[#14151A]">
              claim your slot
            </Link>
            .
          </p>
        </section>

        {/* ---- WHY PARTNER (image + cards split) ---- */}
        <section className="py-20 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-3 py-1 rounded-full mb-4 uppercase">
                Why partner with us
              </span>
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-6 leading-tight">
                Your organisation&apos;s digital headquarters.
              </h2>
              <p className="text-[#46473f] text-lg leading-relaxed mb-8">
                From executive council meetings to campus-wide announcements,
                give your body one credible, verified home online — instead of
                scattered flyers and buried group chats.
              </p>

              <div className="w-full h-auto aspect-video rounded-[24px] shadow-lg overflow-hidden bg-[#EFE9D9]">
                <img
                  src="https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Student council presenting to members"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  emoji: "📢",
                  title: "Command attention",
                  body: "Post announcements that reach 100% of your members instantly — no WhatsApp chaos, no algorithm burial.",
                },
                {
                  emoji: "🗂️",
                  title: "Centralise operations",
                  body: "One verified hub for event flyers, deadlines, and schedules. Members always know exactly where to look.",
                },
                {
                  emoji: "📊",
                  title: "Engage directly",
                  body: "Interactive polls, quizzes, and live feedback — know your community's pulse before you decide.",
                },
                {
                  emoji: "✨",
                  title: "Elevate your brand",
                  body: "A premium digital presence that signals authority — modern, tech-forward, and credible.",
                },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,21,26,0.08)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.08 * i }}
                >
                  <div className="w-11 h-11 rounded-xl bg-[#f4f6fc] flex items-center justify-center text-xl mb-4">
                    {f.emoji}
                  </div>
                  <h3 className="font-bold text-[1.05rem] mb-2.5">{f.title}</h3>
                  <p className="text-[#46473f] text-[0.88rem] leading-relaxed">
                    {f.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- EXCLUSIVE BENEFITS ---- */}
        <section className="py-20 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="max-w-[700px] mb-12">
            <span className="inline-block font-mono text-xs tracking-widest text-[#059669] bg-[rgba(52,211,153,0.15)] border border-[rgba(52,211,153,0.3)] px-3 py-1 rounded-full mb-4 uppercase font-bold">
              Exclusive benefits for your body
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 leading-tight">
              Three privileges reserved for verified partners.
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.code}
                className="bg-white border-t-4 border-t-[#34d399] border-x border-b border-[rgba(20,21,26,0.12)] rounded-2xl p-8 md:p-10 hover:-translate-y-1 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <div className="font-mono text-[0.7rem] font-bold text-[#059669] tracking-widest uppercase mb-3">
                  {b.code}
                </div>
                <h3 className="font-bold text-[1.35rem] mb-5">{b.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {b.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[#46473f] text-[0.95rem] leading-relaxed"
                    >
                      <span className="mt-1 text-[#34d399] shrink-0">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---- WHAT WE ASK (image + steps split) ---- */}
        <section className="py-20 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              {[
                {
                  n: 1,
                  title: "One announcement",
                  body: "Share one official post or story about UniLife. We supply the visual template — you just post it.",
                },
                {
                  n: 2,
                  title: "Onboard core members",
                  body: "Use your unique partner link to bring 20–50 of your active members onto the platform.",
                },
                {
                  n: 3,
                  title: "Nominate executives",
                  body: "Send 2–3 executive names to represent your body in the Partners Feedback Council.",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.n}
                  className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-transform"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#14151A] text-[#F6F2E7] font-display text-[1.05rem] flex items-center justify-center mb-5">
                    {s.n}
                  </div>
                  <h3 className="font-bold text-[1.15rem] mb-3">{s.title}</h3>
                  <p className="text-[#46473f] text-[0.95rem] leading-relaxed">
                    {s.body}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-mono text-xs tracking-widest text-[#ff3d81] bg-[rgba(255,61,129,0.1)] border border-[rgba(255,61,129,0.3)] px-3 py-1 rounded-full mb-4 uppercase font-bold">
                What we ask of you
              </span>
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-6 leading-tight">
                Three simple, one-time commitments.
              </h2>
              <p className="text-[#46473f] text-lg leading-relaxed mb-8">
                No ongoing obligations — we handle the rest. Your team stays
                focused on running the organisation; we handle the platform.
              </p>

              <div className="relative w-full h-auto aspect-square rounded-[24px] shadow-lg overflow-hidden bg-[#EFE9D9]">
                <img
                  src="https://images.pexels.com/photos/7414277/pexels-photo-7414277.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Students onboarding onto a platform together"
                  className="w-full h-full object-cover"
                />

                <motion.div
                  className="absolute -bottom-5 -left-5 md:bottom-6 md:-left-8 bg-white p-4 rounded-2xl shadow-2xl border border-[rgba(20,21,26,0.12)] w-[85%] max-w-[260px]"
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex justify-between font-mono text-[0.65rem] text-[#8a8a7f] mb-2 font-semibold uppercase">
                    <span>Partner link</span>
                    <span>32 joined</span>
                  </div>
                  <div className="bg-[#f4f6fc] p-3 rounded-xl border-l-4 border-[#34d399]">
                    <div className="text-[0.85rem] text-[#14151A] leading-snug font-medium">
                      18 more to unlock Founding Partner status.
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---- TIERED OFFER ---- */}
        <section
          id="tiers"
          className="py-20 px-6 md:px-16 max-w-[1160px] mx-auto"
        >
          <div className="max-w-[700px] mb-12">
            <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-3 py-1 rounded-full mb-4 uppercase">
              The tiered partnership offer
            </span>
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 leading-tight">
              First-come, first-served. No exceptions.
            </h2>
            <p className="text-[#46473f] text-lg leading-relaxed">
              Tier allocation is strictly sequential — once a tier fills, those
              slots close permanently.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Tier 1 — featured */}
            <motion.div
              className="relative bg-[#14151A] text-[#F6F2E7] rounded-[28px] p-8 md:p-10 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 right-0 w-[140px] h-[140px] rounded-bl-[28px] overflow-hidden opacity-90">
                <img
                  src="https://images.pexels.com/photos/6146978/pexels-photo-6146978.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Founding partner badge visual"
                  className="w-full h-full object-cover mix-blend-luminosity opacity-40"
                />
              </div>
              <span className="relative inline-block font-mono text-[0.7rem] tracking-widest text-[#14151A] bg-[#FFD23F] px-3 py-1 rounded-full mb-5 uppercase font-bold">
                Tier 1 · Founding partners
              </span>
              <h3 className="relative font-display text-3xl uppercase mb-1 leading-tight">
                First 5 organisations
              </h3>
              <p className="relative text-[rgba(246,242,231,0.6)] font-mono text-xs uppercase tracking-widest mb-6">
                to accept
              </p>
              <ul className="relative flex flex-col gap-3">
                {[
                  "Exclusive Founding Partner badge",
                  "Priority listing — top of Official Bodies directory",
                  "Verified page with 100% algorithmic reach",
                  "Full access to the Partners Feedback Council",
                  "Beta-test features before public release",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-[rgba(246,242,231,0.9)]"
                  >
                    <span className="mt-1 text-[#FFD23F] shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tier 2 */}
            <motion.div
              className="bg-white border border-[rgba(20,21,26,0.12)] rounded-[28px] p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-block font-mono text-[0.7rem] tracking-widest text-[#46473f] bg-[#f4f6fc] px-3 py-1 rounded-full mb-5 uppercase font-bold">
                Tier 2 · Verified partners
              </span>
              <h3 className="font-display text-3xl uppercase mb-1 leading-tight text-[#14151A]">
                Next 5 organisations
              </h3>
              <p className="text-[#8a8a7f] font-mono text-xs uppercase tracking-widest mb-6">
                to accept
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Verified Partner badge on your page",
                  "Listing in the Official Bodies directory",
                  "Guaranteed 100% algorithmic reach",
                  "Access to the Partners Feedback Council",
                  "Full announcement and poll tools",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-[#46473f]"
                  >
                    <span className="mt-1 text-[#34d399] shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="flex items-center gap-3 bg-[rgba(255,210,63,0.15)] border border-[rgba(255,210,63,0.4)] rounded-2xl px-6 py-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-lg shrink-0">⚡</span>
            <p className="text-[#46473f] text-[0.92rem] leading-relaxed font-medium">
              Tier 1 Founding Partner slots are permanently limited. Act now —
              or accept Tier 2.
            </p>
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
              src="https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Background texture"
              className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay"
            />
            <h2 className="relative z-10 font-display text-[clamp(2rem,4vw,2.8rem)] uppercase mb-4 text-[#F6F2E7]">
              Ready to claim your place?
            </h2>
            <p className="relative z-10 text-[rgba(246,242,231,0.75)] mb-10 max-w-[500px] mx-auto leading-relaxed text-lg">
              Reach out and your organisation&apos;s page can go live within
              days.
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
    </>
  );
}
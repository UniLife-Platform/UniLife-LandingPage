"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const APP_URL = "https://www.harrisonking.com.ng/apps/unilife";

export default function AboutPage() {
  return (
    <>
      <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased">
        <Nav active="/about" />

        {/* ---- PAGE HEAD & HERO IMAGE ---- */}
        <section className="pt-24 pb-16 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="text-center max-w-[900px] mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
                About & Vision
              </span>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase mb-6 leading-[1.02] text-[#14151A]">
                The ultimate campus survival engine.
              </h1>
              <p className="text-[#46473f] text-lg md:text-xl leading-relaxed max-w-[700px] mx-auto">
                UniLife merges a vibrant social network, an academic utility
                hub, and a localised student marketplace into one gamified
                platform — connecting students to the real people, places, and
                resources they need, every day.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full h-[40vh] md:h-[60vh] rounded-[32px] overflow-hidden shadow-2xl relative bg-[#EFE9D9]"
          >
            <img
              src="https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Students walking together on campus"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </section>

        {/* ---- PHILOSOPHY QUOTE ---- */}
        <section className="px-6 md:px-16 pb-20 max-w-[1160px] mx-auto">
          <motion.div
            className="relative overflow-hidden rounded-[32px] p-12 md:p-24 text-center shadow-[0_20px_40px_rgba(20,21,26,0.15)] bg-[#14151A]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Dark Overlay Background with Image */}
            <img
              src="https://images.pexels.com/photos/1105315/pexels-photo-1105315.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Background texture"
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
            />

            <h2 className="relative z-10 font-['Instrument_Serif',serif] italic text-4xl md:text-5xl lg:text-6xl text-[#F6F2E7] tracking-tight">
              &ldquo;The proximity is the product.&rdquo;
            </h2>
          </motion.div>
        </section>

        {/* ---- THE PROBLEM ---- */}
        <section className="py-20 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-mono text-xs tracking-widest text-[#ff3d81] bg-[rgba(255,61,129,0.1)] border border-[rgba(255,61,129,0.3)] px-3 py-1 rounded-full mb-4 uppercase font-bold">
                The Problem
              </span>
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-6 leading-tight">
                Campus life is fragmented.
              </h2>
              <p className="text-[#46473f] text-lg leading-relaxed mb-8">
                Important updates get buried, buying textbooks from strangers
                feels unsafe, and there is no central place to actually connect
                with the people you share a lecture hall with.
              </p>

              <div className="w-full h-auto aspect-video rounded-[24px] shadow-lg overflow-hidden bg-[#EFE9D9]">
                <img
                  src="https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Frustrated student studying"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <div className="flex flex-col gap-6">
              <motion.div
                className="bg-white border-t-4 border-t-[#ff3d81] border-x border-b border-[rgba(20,21,26,0.12)] rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-bold text-[1.15rem] mb-3">
                  Academic chaos
                </h3>
                <p className="text-[#46473f] text-[0.95rem] leading-relaxed">
                  Students miss impromptu lecture changes because vital updates
                  get buried under hundreds of irrelevant messages in noisy
                  WhatsApp groups. Exam prep is a logistical nightmare.
                </p>
              </motion.div>

              <motion.div
                className="bg-white border-t-4 border-t-[#ff3d81] border-x border-b border-[rgba(20,21,26,0.12)] rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="font-bold text-[1.15rem] mb-3">
                  Unsafe commerce
                </h3>
                <p className="text-[#46473f] text-[0.95rem] leading-relaxed">
                  The campus economy runs in the dark. Students rely on
                  anonymous accounts to buy essentials, leaving them vulnerable
                  to scams, while real student entrepreneurs struggle to gain
                  visibility.
                </p>
              </motion.div>

              <motion.div
                className="bg-white border-t-4 border-t-[#ff3d81] border-x border-b border-[rgba(20,21,26,0.12)] rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="font-bold text-[1.15rem] mb-3">
                  A disconnected campus
                </h3>
                <p className="text-[#46473f] text-[0.95rem] leading-relaxed">
                  No unified digital infrastructure exists. There is no single,
                  verified hub where a student can connect with their
                  department, discover events, or interact safely with peers.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ---- THE SOLUTION ---- */}
        <section className="py-20 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Cards on Left for desktop */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <motion.div
                className="bg-white border-t-4 border-t-[#34d399] border-x border-b border-[rgba(20,21,26,0.12)] rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-bold text-[1.15rem] mb-3">
                  The daily utility
                </h3>
                <p className="text-[#46473f] text-[0.95rem] leading-relaxed">
                  A smart, centralised timetable with instant push notifications
                  when a lecture shifts, plus a searchable Study Hub for past
                  questions and notes — no scrolling through chat history.
                </p>
              </motion.div>

              <motion.div
                className="bg-white border-t-4 border-t-[#34d399] border-x border-b border-[rgba(20,21,26,0.12)] rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="font-bold text-[1.15rem] mb-3">
                  The campus economy
                </h3>
                <p className="text-[#46473f] text-[0.95rem] leading-relaxed">
                  UniShop gives every student entrepreneur a branded digital
                  storefront. Every buyer and seller is a verified peer,
                  eliminating the anonymous scam risk that plagues general
                  marketplaces.
                </p>
              </motion.div>

              <motion.div
                className="bg-white border-t-4 border-t-[#34d399] border-x border-b border-[rgba(20,21,26,0.12)] rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="font-bold text-[1.15rem] mb-3">The hook</h3>
                <p className="text-[#46473f] text-[0.95rem] leading-relaxed">
                  Daily login streaks and study contributions earn Status Points
                  (SP) — a self-sustaining loop that keeps students engaged,
                  plus verified spaces for departments and clubs.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block font-mono text-xs tracking-widest text-[#059669] bg-[rgba(52,211,153,0.15)] border border-[rgba(52,211,153,0.3)] px-3 py-1 rounded-full mb-4 uppercase font-bold">
                Our Solution
              </span>
              <h2 className="font-display text-4xl md:text-5xl uppercase mb-6 leading-tight">
                Three systems, one platform.
              </h2>
              <p className="text-[#46473f] text-lg leading-relaxed mb-8">
                By merging the utility of an academic hub with the social
                network of a campus, UniLife creates an ecosystem where students
                actually want to spend their time.
              </p>

              <div className="w-full h-auto aspect-video rounded-[24px] shadow-lg overflow-hidden bg-[#EFE9D9]">
                <img
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Students collaborating and smiling"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---- GROWTH LOOPS ---- */}
        <section className="py-24 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="bg-[rgba(255,210,63,0.15)] rounded-[32px] p-10 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block font-mono text-xs tracking-widest text-[#14151A] bg-white border border-[rgba(20,21,26,0.12)] px-3 py-1 rounded-full mb-4 uppercase font-bold">
                  Built-in Growth
                </span>
                <h2 className="font-display text-4xl md:text-5xl uppercase mb-6 leading-tight">
                  The platform grows because using it is rewarding.
                </h2>
                <div className="w-full h-auto aspect-square lg:aspect-auto lg:h-[400px] rounded-[24px] shadow-xl mt-8 hidden md:block overflow-hidden bg-[#EFE9D9]">
                  <img
                    src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Vibrant student community"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-6 shadow-sm flex flex-col justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="font-mono text-[0.7rem] font-bold text-[#FFD23F] tracking-widest uppercase mb-2">
                    01
                  </div>
                  <h4 className="font-bold text-[1.1rem] mb-2">
                    Founder&apos;s challenge
                  </h4>
                  <p className="text-[#46473f] text-[0.9rem] leading-relaxed">
                    Invite 3 friends to unlock permanent &lsquo;Founder&rsquo;
                    status and bonus SP.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-6 shadow-sm flex flex-col justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="font-mono text-[0.7rem] font-bold text-[#FFD23F] tracking-widest uppercase mb-2">
                    02
                  </div>
                  <h4 className="font-bold text-[1.1rem] mb-2">
                    Group study notes
                  </h4>
                  <p className="text-[#46473f] text-[0.9rem] leading-relaxed">
                    To unlock a shared PDF, invite 2 classmates who also upload
                    a note of their own.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-6 shadow-sm flex flex-col justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="font-mono text-[0.7rem] font-bold text-[#FFD23F] tracking-widest uppercase mb-2">
                    03
                  </div>
                  <h4 className="font-bold text-[1.1rem] mb-2">
                    Campus ambassadors
                  </h4>
                  <p className="text-[#46473f] text-[0.9rem] leading-relaxed">
                    Student leaders — class reps, hostel heads — get an official
                    badge, early access, and shout-outs.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-6 shadow-sm flex flex-col justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="font-mono text-[0.7rem] font-bold text-[#FFD23F] tracking-widest uppercase mb-2">
                    04
                  </div>
                  <h4 className="font-bold text-[1.1rem] mb-2">
                    Exam leaderboard
                  </h4>
                  <p className="text-[#46473f] text-[0.9rem] leading-relaxed">
                    Top students per department for notes uploaded or quizzes
                    taken earn the &lsquo;Exam Champ&rsquo; badge.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- DOWNLOAD BAND ---- */}
        <section className="py-24 px-6 md:px-16 max-w-[1160px] mx-auto">
          <motion.div
            className="bg-[#14151A] text-[#F6F2E7] rounded-[32px] p-12 md:p-16 text-center relative shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] uppercase mb-4 text-[#F6F2E7]">
              Built by students, for students.
            </h2>
            <p className="text-[rgba(246,242,231,0.75)] mb-10 max-w-[500px] mx-auto leading-relaxed text-lg">
              UniLife started on one campus and is opening to students at
              universities everywhere. Come be part of it early.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={APP_URL}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-[#FFD23F] !text-[#14151A] border-2 border-[#FFD23F] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all whitespace-nowrap"
              >
                Download UniLife →
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-white border-2 border-[rgba(255,255,255,0.2)] hover:bg-[#F6F2E7] hover:!text-[#14151A] transition-all whitespace-nowrap"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  );
}

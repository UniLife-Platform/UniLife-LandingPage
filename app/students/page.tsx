"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "motion/react";
import Link from "next/link";

export default function StudentsPage() {
  return (
    <>
      <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased">
        <Nav active="/students" />

        {/* ---- HERO ---- */}
        <section className="pt-24 pb-16 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
                Built for real students
              </span>
              <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] uppercase mb-6 leading-[1.02] text-[#14151A]">
                Your campus, <br />
                <span className="text-[#ff3d81]">finally together.</span>
              </h1>
              <p className="text-[#46473f] text-lg leading-relaxed mb-8 max-w-[500px]">
                Join verified classmates, access past questions, form study groups, and stay inside your actual university community — no randoms, no bots.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/download"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-[#14151A] !text-white border-2 border-[#14151A] shadow-[4px_4px_0_#ff3d81] hover:shadow-[6px_6px_0_#ff3d81] hover:-translate-y-0.5 transition-all whitespace-nowrap"
                >
                  Get the app →
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-[#14151A] border-2 border-[#14151A] hover:bg-[#14151A] hover:!text-[#F6F2E7] transition-all whitespace-nowrap"
                >
                  See what’s inside
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="w-full h-auto aspect-square md:aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl bg-[#EFE9D9] relative"
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
                alt="Nigerian university students on campus"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl border border-[rgba(20,21,26,0.12)] rounded-2xl p-4 shadow-xl flex gap-4 items-center">
                <div className="w-12 h-12 bg-[#4f7fff] rounded-lg shrink-0 flex items-center justify-center text-xl text-white font-bold">
                  U
                </div>
                <div>
                  <b className="block text-[0.95rem] font-bold mb-0.5 leading-tight">
                    Verified student
                  </b>
                  <span className="font-mono text-[0.7rem] text-[#059669] font-bold uppercase">
                    Department joined
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---- FOUR THINGS YOU ACTUALLY NEED ---- */}
        <section id="features" className="py-20 px-6 md:px-16 max-w-[1160px] mx-auto">
          <div className="text-center mb-16 max-w-[700px] mx-auto">
            <span className="inline-block font-mono text-xs tracking-widest text-[#059669] bg-[rgba(52,211,153,0.15)] border border-[rgba(52,211,153,0.3)] px-3 py-1 rounded-full mb-4 uppercase font-bold">
              Built around real campus life
            </span>
            <h2 className="font-display text-3xl md:text-5xl uppercase mb-4">
              Four things you actually need.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "👥",
                title: "Your people",
                desc: "Departmental groups, course chats, and verified classmates only. No strangers from outside your school.",
              },
              {
                emoji: "📚",
                title: "Study Hub",
                desc: "Past questions, AI tutor for lecture PDFs, and tools that actually match your courses.",
              },
              {
                emoji: "🤝",
                title: "Peer connections",
                desc: "Find study buddies, form groups, and stay inside your faculty without jumping between apps.",
              },
              {
                emoji: "🏆",
                title: "Status & leaderboard",
                desc: "Earn Status Points, climb department rankings, and unlock campus perks.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 bg-[rgba(255,210,63,0.15)] border border-[rgba(255,210,63,0.4)] rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm">
                  {item.emoji}
                </div>
                <h3 className="font-bold text-[1.2rem] mb-3">{item.title}</h3>
                <p className="text-[#46473f] text-[1rem] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---- HOW IT WORKS ---- */}
        <section className="py-20 px-6 md:px-16 max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-3 py-1 rounded-full mb-4 uppercase">
              Getting started
            </span>
            <h2 className="font-display text-3xl md:text-4xl uppercase mb-4">
              Three steps. You’re in.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Verify",
                desc: "Sign up with your student email. Real students only.",
              },
              {
                step: "2",
                title: "Join your department",
                desc: "Find your faculty, course, and level. Your community loads automatically.",
              },
              {
                step: "3",
                title: "Use the tools",
                desc: "Access past questions, join study rooms, and connect with classmates.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="bg-white border border-[rgba(20,21,26,0.12)] rounded-2xl p-8 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#4f7fff] text-white flex items-center justify-center font-display text-xl mb-6 shadow-md border-2 border-white ring-4 ring-[rgba(79,127,255,0.15)]">
                  {step.step}
                </div>
                <h3 className="font-bold text-[1.15rem] mb-3">{step.title}</h3>
                <p className="text-[#46473f] text-[0.95rem] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---- COMPARISON ---- */}
        <section className="py-20 px-6 md:px-16 max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl uppercase mb-4">
              Why UniLife vs random groups
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 border border-[rgba(20,21,26,0.12)] rounded-[24px] overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#fdfbf7] p-8 md:p-12">
              <h4 className="font-mono text-[0.75rem] tracking-[2px] text-[#8a8a7f] uppercase mb-8 font-bold">
                WhatsApp & random apps
              </h4>
              <ul className="flex flex-col gap-5">
                {[
                  "Anyone can join — strangers and bots",
                  "Past questions scattered across groups",
                  "No structure by department or level",
                  "Hard to find serious study partners",
                  "Information gets lost quickly",
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 items-start text-[#46473f] text-[0.95rem] leading-relaxed">
                    <span className="text-[#ff3d81] font-mono font-bold mt-1 shrink-0">✕</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 md:p-12 border-t md:border-t-0 md:border-l border-[rgba(20,21,26,0.12)]">
              <h4 className="font-mono text-[0.75rem] tracking-[2px] text-[#14151A] uppercase mb-8 font-bold">
                UniLife
              </h4>
              <ul className="flex flex-col gap-5">
                {[
                  "Verified students from your school only",
                  "Organized past questions & AI tutor",
                  "Department and course-level communities",
                  "Easy to find study groups and peers",
                  "Everything stays in one place",
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 items-start text-[#14151A] font-medium text-[0.95rem] leading-relaxed">
                    <span className="text-[#34d399] font-mono font-bold mt-1 shrink-0">✓</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        {/* ---- CTA ---- */}
        <section className="py-24 px-6 md:px-16 max-w-[1160px] mx-auto">
          <motion.div
            className="bg-[#14151A] text-[#F6F2E7] rounded-[32px] p-12 md:p-16 text-center relative shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] uppercase mb-4 text-[#F6F2E7]">
              Ready to join your campus?
            </h2>
            <p className="text-[rgba(246,242,231,0.75)] mb-10 max-w-[500px] mx-auto leading-relaxed text-lg">
              Download UniLife and connect with verified students at your university.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/download"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-[#FFD23F] !text-[#14151A] border-2 border-[#FFD23F] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all whitespace-nowrap"
              >
                Download the app →
              </Link>
              <a
                href="https://wa.me/2348164670694"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-white border-2 border-[rgba(255,255,255,0.2)] hover:bg-[#F6F2E7] hover:!text-[#14151A] transition-all whitespace-nowrap"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </>
  );
}
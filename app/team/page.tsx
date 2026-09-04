"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/2348164670694";
const EMAIL_URL = "mailto:unilife.edu.org@gmail.com";

type Role = { title: string; desc: string };
type Department = {
  emoji: string;
  title: string;
  subtitle: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  roles: Role[];
};

const DEPARTMENTS: Department[] = [
  {
    emoji: "💻",
    title: "Product & Engineering",
    subtitle: "The Builders",
    accent: "#4f7fff",
    accentBg: "rgba(79,127,255,0.1)",
    accentBorder: "rgba(79,127,255,0.3)",
    roles: [
      {
        title: "Product Manager (PM)",
        desc: "Organizes the roadmap, breaks ideas down into tasks, and ensures developers hit their deadlines.",
      },
      {
        title: "UI/UX Designer",
        desc: "Designs the screens, dark-mode layouts, and visual flows of the app.",
      },
      {
        title: "Backend Engineer",
        desc: "Manages the databases (Supabase), server logic, and secure payment integrations (Paystack).",
      },
      {
        title: "Mobile Developer",
        desc: "Writes the actual code (Flutter) to make the app work on Android and iOS.",
      },
      {
        title: "QA / Product Tester",
        desc: "Methodically tests the app to find and report bugs before updates go live.",
      },
    ],
  },
  {
    emoji: "🚀",
    title: "Growth & Marketing",
    subtitle: "The Hype",
    accent: "#ff3d81",
    accentBg: "rgba(255,61,129,0.1)",
    accentBorder: "rgba(255,61,129,0.3)",
    roles: [
      {
        title: "Growth Marketer",
        desc: "Focuses entirely on user acquisition metrics, downloads, and optimizing the in-app referral loops.",
      },
      {
        title: "Social Media Manager",
        desc: "Coordinates the posting schedule and maintains the brand's voice across TikTok, Instagram, and X.",
      },
      {
        title: "Multimedia Content Creator",
        desc: "Makes the actual assets — shooting street interviews, editing videos, and creating campus memes.",
      },
      {
        title: "Copywriter",
        desc: "Writes all the high-energy text for push notifications, social captions, and in-app buttons.",
      },
    ],
  },
  {
    emoji: "📦",
    title: "Operations & Community",
    subtitle: "The Feet on the Ground",
    accent: "#059669",
    accentBg: "rgba(52,211,153,0.15)",
    accentBorder: "rgba(52,211,153,0.3)",
    roles: [
      {
        title: "Operations Lead",
        desc: "Handles day-to-day coordination, budgeting for printing, and managing offline logistics on campus.",
      },
      {
        title: "Merchant Acquisition Specialist",
        desc: 'Roofs around campuses to pitch, onboard, and support local student vendors setting up "UniShops".',
      },
      {
        title: "Campus Ambassador Lead",
        desc: "Recruits and manages the network of class reps and hostel heads driving local awareness.",
      },
      {
        title: "Community Moderator",
        desc: "Keeps the social feed and anonymous chats safe, clean, and active by removing spam or toxic posts.",
      },
    ],
  },
];

export default function TeamPage() {
  return (
    <div className="bg-[#F6F2E7] text-[#14151A] min-h-screen overflow-x-clip font-body antialiased">
      <Nav active="/team" />

      {/* ---- PAGE HEAD ---- */}
      <section className="pt-24 pb-16 px-6 md:px-16 max-w-[1160px] mx-auto">
        <div className="text-center max-w-[820px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block font-mono text-xs tracking-widest text-[#46473f] bg-white border border-[rgba(20,21,26,0.12)] px-4 py-1.5 rounded-full mb-6 uppercase">
              We&apos;re hiring, sort of
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase mb-6 leading-[1.02] text-[#14151A]">
              Build the future of campus life with us.
            </h1>
            <p className="text-[#46473f] text-lg md:text-xl leading-relaxed max-w-[680px] mx-auto mb-10">
              UniLife is built by students, for students — and we&apos;re
              looking for the next wave of builders, hustlers, and organisers to
              join the crew. No corporate resumes needed, just conviction and
              follow-through.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-[#14151A] !text-white border-2 border-[#14151A] shadow-[4px_4px_0_#ff3d81] hover:shadow-[6px_6px_0_#ff3d81] hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                Apply now →
              </a>
              <a
                href="#departments"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-[0.95rem] bg-transparent !text-[#14151A] border-2 border-[#14151A] hover:bg-[#14151A] hover:!text-white transition-all whitespace-nowrap"
              >
                See open roles
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- DEPARTMENTS ---- */}
      <section
        id="departments"
        className="pb-24 px-6 md:px-16 max-w-[1160px] mx-auto flex flex-col gap-20"
      >
        {DEPARTMENTS.map((dept, di) => (
          <div key={dept.title}>
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-2xl border"
                style={{
                  background: dept.accentBg,
                  borderColor: dept.accentBorder,
                }}
              >
                {dept.emoji}
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl uppercase leading-tight text-[#14151A]">
                  {dept.title}
                </h2>
                <span className="font-mono text-[0.7rem] tracking-widest uppercase text-[#8a8a7f] font-semibold">
                  {dept.subtitle}
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dept.roles.map((role, ri) => (
                <motion.div
                  key={role.title}
                  className="bg-white rounded-2xl p-7 shadow-sm hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,21,26,0.08)] transition-all duration-300"
                  style={{
                    borderTop: `4px solid ${dept.accent}`,
                    borderLeft: "1px solid rgba(20,21,26,0.12)",
                    borderRight: "1px solid rgba(20,21,26,0.12)",
                    borderBottom: "1px solid rgba(20,21,26,0.12)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.06 * ri + 0.05 * di }}
                >
                  <h3 className="font-bold text-[1.05rem] mb-2.5 leading-snug">
                    {role.title}
                  </h3>
                  <p className="text-[#46473f] text-[0.9rem] leading-relaxed">
                    {role.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ---- WHY JOIN ---- */}
      <section className="pb-24 px-6 md:px-16 max-w-[1160px] mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            {
              icon: "🎓",
              title: "Real experience",
              body: "Ship features that thousands of students actually use — not a portfolio filler project.",
            },
            {
              icon: "🤝",
              title: "A real team",
              body: "Work alongside people across product, growth, and ops who care about getting this right.",
            },
            {
              icon: "📈",
              title: "Room to grow",
              body: "Early team members get first pick of leadership roles as UniLife expands to new campuses.",
            },
          ].map((f) => (
            <motion.div
              key={f.title}
              className="bg-[rgba(255,210,63,0.15)] rounded-2xl p-8"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-[1.1rem] mb-2.5">{f.title}</h3>
              <p className="text-[#46473f] text-[0.9rem] leading-relaxed">
                {f.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---- CLOSING CTA ---- */}
      <section className="pb-24 px-6 md:px-16 max-w-[1160px] mx-auto">
        <motion.div
          className="bg-[#14151A] text-[#F6F2E7] rounded-[32px] p-12 md:p-16 text-center relative shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] uppercase mb-4 text-[#F6F2E7]">
            See a role that fits you?
          </h2>
          <p className="text-[rgba(246,242,231,0.75)] mb-10 max-w-[500px] mx-auto leading-relaxed text-lg">
            Send us a message with the role you&apos;re interested in and a bit
            about yourself — no formal CV required.
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

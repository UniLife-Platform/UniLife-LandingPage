import type { Metadata } from "next";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  Section,
  SectionHead,
  StatBoxGrid,
  StatBox,
  InfoNote,
  OrgRow,
  OrgCard,
  RoleCard,
  StepCard,
  Ticket,
  Btn,
  CtaRow,
  NoticeBand,
  TickList,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Join the Team | UniLife",
  description:
    "UniLife is building a campus team open to students at any university. Volunteer as a Campus Lead, Student Ambassador, Content Creator, and more.",
  openGraph: {
    title: "Join the UniLife Campus Team",
    description:
      "Leadership experience, an official title, and first access to new features. Open to students at any university.",
    images: ["https://unilife.com.ng/app_icon.png"],
    url: "https://unilife.com.ng/team",
    type: "website",
  },
};

const ROLES = [
  {
    code: "ROLE 01",
    title: "University Lead",
    items: [
      "Oversees the entire university team",
      "Coordinates campus leads and activities",
      "Reports to the UniLife founder",
    ],
  },
  {
    code: "ROLE 02",
    title: "Campus Lead",
    items: [
      "Manages a specific campus at their university",
      "Coordinates student ambassadors and volunteers",
      "Organises campus activations and awareness campaigns",
    ],
  },
  {
    code: "ROLE 03",
    title: "Student Ambassador",
    items: [
      "Promotes UniLife within their department/faculty",
      "Shares referral links and drives sign-ups",
      "Feeds student feedback back to the team",
    ],
  },
  {
    code: "ROLE 04",
    title: "Content Creator",
    items: [
      "Creates posts, reels, and flyers for UniLife",
      "Captures student testimonials and campus stories",
      "Supports awareness campaigns",
    ],
  },
  {
    code: "ROLE 05",
    title: "Community Manager",
    items: [
      "Manages department and interest-group communities",
      "Engages users and encourages participation",
      "Shares announcements and platform updates",
    ],
  },
  {
    code: "ROLE 06",
    title: "Partnership Coordinator",
    items: [
      "Builds relationships with student bodies and faculties",
      "Onboards new partner organisations",
      "Maintains partnership agreements and follow-ups",
    ],
  },
  {
    code: "ROLE 07",
    title: "Events & Activations Lead",
    items: [
      "Plans and runs campus events and onboarding sessions",
      "Coordinates logistics and volunteers on the day",
      "Measures event impact",
    ],
  },
];

const TABLE_ROWS = [
  { role: "University Lead", focus: "Overall coordination", fit: "Experienced leaders" },
  { role: "Campus Lead", focus: "Campus-specific execution", fit: "Local influencers" },
  { role: "Student Ambassador", focus: "Promotion and sign-ups", fit: "Students with wide networks" },
  { role: "Content Creator", focus: "Content and storytelling", fit: "Creatives, designers" },
  { role: "Community Manager", focus: "User engagement", fit: "Community builders" },
  { role: "Partnership Coordinator", focus: "Partner relationships", fit: "Networkers" },
  { role: "Events & Activations Lead", focus: "Campus events", fit: "Organisers" },
];

export default function TeamPage() {
  return (
    <>
      <Ticker
        items={[
          "Campus team recruitment now open",
          "Campus Leads wanted at universities everywhere",
          "Join the campus team WhatsApp group",
          "Official UniLife title and badge for every volunteer",
          "Open to students at any university, anywhere",
        ]}
      />
      <Nav active="/team" />

      <div className="page-head">
        <span className="eyebrow-tag">Recruiting now · Open to any university</span>
        <h1>
          Help us build the{" "}
          <span className="accent" style={{ color: "var(--chalk)" }}>
            digital backbone
          </span>{" "}
          of campus life.
        </h1>
        <p>
          UniLife is putting together its campus teams — students who want
          leadership experience, a real title, and a hand in shaping the
          platform their whole university runs on. Wherever you study,
          there&apos;s a lane for you.
        </p>
        <StatBoxGrid>
          <StatBox val="7" label="Open roles" />
          <StatBox val="Any" label="University" />
          <StatBox val="Flexible" label="Schedule" />
        </StatBoxGrid>
        <InfoNote>
          <b>Who can apply:</b> any currently enrolled student, at any
          university, in any year of study. No prior experience needed for
          most roles — we&apos;ll train you on the job.
        </InfoNote>
      </div>

      <Section id="structure">
        <SectionHead
          kicker="How the team is organised"
          title="Central coordination. Local execution."
          description="Every university gets its own University Lead, with a Campus Lead running the day-to-day on each of that university's campuses — the best of both worlds."
        />
        <OrgRow two>
          <OrgCard lead badge="Reports to founder" title="University Lead">
            Oversees the entire university — every campus it has — and
            coordinates campus leads and activities.
          </OrgCard>
          <OrgCard badge="Reports to University Lead" title="Campus Lead">
            Manages activities, ambassadors, and volunteers on their campus —
            one Campus Lead per campus, however many a university has.
          </OrgCard>
        </OrgRow>
      </Section>

      <Section id="roles" style={{ paddingTop: 0 }}>
        <SectionHead
          kicker="Open positions"
          title="Seven ways to get involved."
          description="Every role reports up through the campus and university leads above."
        />
        <div className="role-grid">
          {ROLES.map((role) => (
            <RoleCard key={role.code} code={role.code} title={role.title} items={role.items} />
          ))}
        </div>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <SectionHead kicker="At a glance" title="Find your fit." />
        <div className="table-wrap">
          <table className="role-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Focus</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row) => (
                <tr key={row.role}>
                  <td className="role-name">{row.role}</td>
                  <td>{row.focus}</td>
                  <td>{row.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <div className="info-grid">
          <div>
            <div className="kicker">What you get</div>
            <h2
              style={{
                fontSize: "clamp(1.9rem, 4.2vw, 2.5rem)",
                textTransform: "uppercase",
                marginBottom: 16,
                lineHeight: 1.05,
              }}
            >
              Real experience.
              <br />
              Real recognition.
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.65, maxWidth: 460 }}>
              This is volunteer work today, with a clear path to compensation
              once UniLife secures funding — and every contribution is logged
              toward that future.
            </p>
          </div>
          <div className="info-card">
            <h3>Volunteer benefits</h3>
            <div className="role" style={{ marginBottom: 18 }}>
              FOR ALL TEAM MEMBERS
            </div>
            <TickList
              items={[
                "Leadership experience you can point to",
                "An official UniLife title and badge",
                "Access to our partner network",
                "Recognition on our platform",
                "First access to new features",
                "Future compensation when UniLife secures funding",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <SectionHead kicker="How to apply" title="Three steps in." />
        <div className="step-grid">
          <StepCard n={1} title="Join the group">
            Tap in to the campus team WhatsApp group — that&apos;s where
            everything happens.
          </StepCard>
          <StepCard n={2} title="Introduce yourself">
            Drop your name, university, and the role you&apos;re after. Going
            for University Lead or Campus Lead? You&apos;ll also get a quick
            1-1 chat with our recruitment lead.
          </StepCard>
          <StepCard n={3} title="Get your role">
            Receive your official title and badge, and get looped into the
            team.
          </StepCard>
        </div>
      </Section>

      <Section>
        <Ticket
          title="Let's build something iconic."
          cta={
            <>
              <CtaRow>
                <Btn href="https://chat.whatsapp.com/JWWAYSiMfXgKtq9NU8tPEH">
                  Join the WhatsApp group →
                </Btn>
                <Btn href="mailto:unilife.edu.org@gmail.com" variant="dark">
                  Apply by email
                </Btn>
              </CtaRow>
              <NoticeBand>
                Open roles: University Lead · Campus Lead · Student
                Ambassador · Content Creator · Community Manager ·
                Partnership Coordinator · Events &amp; Activations Lead
              </NoticeBand>
              <div className="recruiter" style={{ marginTop: 28 }}>
                <div className="recruiter__avatar">RL</div>
                <div>
                  <div className="recruiter__name">
                    Applying for University or Campus Lead?
                  </div>
                  <div className="recruiter__role">
                    Message Shadrach directly for a quick chat
                  </div>
                </div>
              </div>
            </>
          }
        >
          Join the campus team WhatsApp group to get started — that&apos;s
          where role openings, updates, and the rest of the team live.
        </Ticket>
      </Section>

      <Footer />
    </>
  );
}

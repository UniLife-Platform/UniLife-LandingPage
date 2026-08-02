import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import IdCard from "@/components/IdCard";
import {
  Section,
  SectionHead,
  Grid,
  Stub,
  Flyer,
  CompareScript,
  Ticket,
  Btn,
  CtaRow,
} from "@/components/ui";

const APP_URL = "https://www.harrisonking.com.ng/apps/unilife";

export default function Home() {
  return (
    <>
      <Ticker />
      <Nav active="/" />

      <header className="hero">
        <div>
          <span className="eyebrow-tag">Enrolment open · unilife.com.ng</span>
          <h1>
            Your campus,
            <br />
            <span className="accent">finally</span>{" "}
            <span className="accent-2">online.</span>
          </h1>
          <p className="lede">
            One app for your department, your marketplace, and your
            leaderboard. UniLife is where real students — not strangers, not
            bots — run campus life together.
          </p>
          <div className="course-tags">
            <span className="course-tag">SOC 100 · Social feed</span>
            <span className="course-tag">MKT 201 · Marketplace</span>
            <span className="course-tag">LIB 301 · Study hub</span>
            <span className="course-tag">GAM 401 · SP wallet</span>
          </div>
          <CtaRow>
            <Btn href={APP_URL}>Download UniLife →</Btn>
            <Btn href="https://unilife.com.ng/app" variant="ghost">
              See what&apos;s inside
            </Btn>
          </CtaRow>
          <div className="stat-strip">
            <span className="stat-chip">
              <b>370+</b>&nbsp;active students and growing
            </span>
            <span className="stat-chip">
              <b>100%</b>&nbsp;verified community — no bots
            </span>
            <span className="stat-chip">
              Open to <b>any university</b>
            </span>
          </div>
        </div>

        <IdCard />
      </header>

      <Section id="pillars">
        <SectionHead
          kicker="Course outline"
          title="Four modules. One campus."
          description="Not another generic social app — a purpose-built survival kit for university life."
        />
        <Grid cols={4}>
          <Stub code="MKT 201" title="Campus marketplace">
            Buy and sell textbooks, electronics, and daily essentials —
            student to student, no strangers involved.
          </Stub>
          <Stub code="LIB 301" title="Study hub & AI tutor">
            A digital library, past questions, an AI that chats with your
            PDFs, and a built-in CGPA calculator.
          </Stub>
          <Stub code="SOC 100" title="Social feed & communities">
            Real-time posts, anonymous confessions, and server-like
            communities with voice and text channels.
          </Stub>
          <Stub code="GAM 401" title="Gamification & SP wallet">
            Earn Status Points through streaks and contributions; spend them
            on titles, themes, and ad-free upgrades.
          </Stub>
        </Grid>
      </Section>

      <Section>
        <SectionHead
          kicker="Pinned to the board"
          title="Whoever you are, there's a lane for you."
        />
        <Grid cols={3}>
          <Flyer href="/students" emoji="🎓" title="For students" cta="CLAIM YOUR PROFILE →">
            Study smarter, connect with real coursemates, and earn SP just for
            showing up.
          </Flyer>
          <Flyer
            href="/sellers"
            emoji="🏪"
            title="For sellers & entrepreneurs"
            cta="OPEN YOUR STOREFRONT →"
          >
            Open a branded UniShop and reach a captive, verified campus
            audience — zero fees for early adopters.
          </Flyer>
          <Flyer
            href="/partners"
            emoji="🏛️"
            title="For school bodies & leaders"
            cta="PARTNER WITH US →"
          >
            A free verified page, 100% announcement delivery, and direct
            feedback tools for your organisation.
          </Flyer>
        </Grid>
      </Section>

      <Section>
        <SectionHead
          kicker="Graded & returned"
          title="Everything about the old way, marked wrong."
        />
        <CompareScript
          oldItems={[
            "Chaotic WhatsApp groups full of random strangers",
            "Social algorithms burying your posts",
            "Zero verification — bots, scammers, outsiders",
            "No rewards for contributing to your community",
          ]}
          newItems={[
            "Organised, focused campus-only communities",
            "100% reach — your content always lands",
            "Every user is a verified, real student",
            "Achievement badges and Spotlight recognition",
          ]}
        />
      </Section>

      <Section>
        <Ticket
          title="Your admission is confirmed."
          cta={
            <CtaRow>
              <Btn href={APP_URL}>Download UniLife →</Btn>
              <Btn href="/pricing" variant="dark">
                See pricing plans
              </Btn>
            </CtaRow>
          }
        >
          Download the app, claim your verified profile, and start earning SP
          from day one.
        </Ticket>
      </Section>

      <Footer />
    </>
  );
}

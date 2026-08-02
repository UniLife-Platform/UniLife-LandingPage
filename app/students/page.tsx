import type { Metadata } from "next";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  Section,
  SectionHead,
  Grid,
  Stub,
  StepCard,
  CompareScript,
  Ticket,
  Btn,
  CtaRow,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "For Students | UniLife",
  description:
    "UniLife is the exclusive campus app for real, verified students — study tools, a safe marketplace, and a community that actually rewards you.",
};

const APP_URL = "https://www.harrisonking.com.ng/apps/unilife";

export default function StudentsPage() {
  return (
    <>
      <Ticker />
      <Nav active="/students" />

      <header className="page-head">
        <div className="kicker">Your exclusive invite</div>
        <h1>
          The campus is your world.
          <br />
          UniLife is your platform.
        </h1>
        <p>
          UniLife is the exclusive app built for real students — no
          outsiders, no bots. Just the people you see in lectures, at the
          library, and around campus every single day.
        </p>
        <CtaRow>
          <Btn href={APP_URL}>Download UniLife →</Btn>
          <Btn href="#steps" variant="ghost">
            How to get in
          </Btn>
        </CtaRow>
      </header>

      <Section>
        <SectionHead
          kicker="What you can do inside"
          title="Six tools built for your campus life."
          description="All in one verified space — no scattered chats, no random accounts."
        />
        <Grid cols={3}>
          <Stub emoji="📚" title="Dominate academics">
            Share and grab study notes, past questions, and PDFs directly from
            coursemates in your department.
          </Stub>
          <Stub emoji="🛍️" title="The marketplace">
            Buy and sell textbooks, electronics, fashion, and daily essentials
            with verified fellow students.
          </Stub>
          <Stub emoji="🏪" title="Launch your empire">
            Create your own storefront, take orders, and build a real campus
            business with a verified audience.
          </Stub>
          <Stub emoji="👥" title="Enter the arena">
            Join focused communities — tutorial groups, exclusive event
            pages, and department chats.
          </Stub>
          <Stub emoji="📱" title="Amplify your influence">
            Cross-post to TikTok, Instagram, and X — use your verified campus
            audience to boost your main socials.
          </Stub>
          <Stub emoji="💬" title="Real connections">
            Find study partners, build your network, or meet people you can
            actually see in real life.
          </Stub>
        </Grid>
      </Section>

      <Section>
        <SectionHead
          kicker="Why claim your profile now"
          title="The best time to join is today."
        />
        <Grid cols={2} style={{ maxWidth: 850, margin: "0 auto", gap: 16 }}>
          <Stub code="ROADMAP" title="You control the roadmap">
            Early members have real power. Hit the public feedback board to
            suggest and upvote features — the most-demanded tools get built
            first, and your voice shapes what the platform becomes.
          </Stub>
          <Stub code="REACH" title="Hyper-targeted reach">
            Your content is served first to students in your specific
            department and hostel — the people whose attention actually
            matters. No algorithm burying your posts, no irrelevant noise.
          </Stub>
          <Stub code="LEGACY" title="Build your campus legacy">
            Level up and earn exclusive achievement badges for being a top
            contributor, elite seller, or academic resource — and get
            featured on the Student Spotlight.
          </Stub>
        </Grid>
      </Section>

      <Section id="steps">
        <SectionHead
          kicker="How to get in"
          title="Three steps. Less than five minutes."
        />
        <div className="step-grid">
          <StepCard n={1} title="Download UniLife">
            Get the app from your invite link. The link is tied to your
            invite — use it to unlock your spot.
          </StepCard>
          <StepCard n={2} title="Verify your status">
            Confirm you&apos;re a real student using your university email
            address or student ID number.
          </StepCard>
          <StepCard n={3} title="Drop in & explore">
            Set up your profile, drop your first post, and start connecting
            with your campus.
          </StepCard>
        </div>
      </Section>

      <Section>
        <SectionHead kicker="What makes UniLife different" />
        <CompareScript
          oldItems={[
            "Chaotic WhatsApp groups with random strangers",
            "Social media algorithms burying your posts",
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
          title="Your campus is waiting."
          cta={
            <CtaRow>
              <Btn href={APP_URL}>Download UniLife →</Btn>
              <Btn href="/contact" variant="dark">
                Get your invite link
              </Btn>
            </CtaRow>
          }
        >
          See you on the inside. — The UniLife team
        </Ticket>
      </Section>

      <Footer />
    </>
  );
}

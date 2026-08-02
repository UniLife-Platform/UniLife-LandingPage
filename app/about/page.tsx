import type { Metadata } from "next";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  PageHead,
  Section,
  SectionHead,
  Grid,
  SideCard,
  LoopCard,
  Ticket,
  Btn,
  CtaRow,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About & Vision | UniLife",
  description:
    "UniLife merges a social network, an academic hub, and a student marketplace into one gamified campus platform.",
};

const APP_URL = "https://www.harrisonking.com.ng/apps/unilife";

export default function AboutPage() {
  return (
    <>
      <Ticker />
      <Nav active="/about" />

      <PageHead
        kicker="About & vision"
        title="The ultimate campus survival engine."
      >
        UniLife merges a vibrant social network, an academic utility hub, and
        a localised student marketplace into one gamified platform —
        connecting students to the real people, places, and resources they
        need, every day.
      </PageHead>

      <Section>
        <SectionHead
          kicker="The problem"
          title="Campus life is fragmented — and it shouldn't be."
        />
        <Grid cols={3}>
          <SideCard variant="problem" title="Academic chaos">
            Students miss impromptu lecture changes because vital updates get
            buried under hundreds of irrelevant messages in noisy WhatsApp
            groups. Past questions and study materials are scattered, making
            exam prep a logistical nightmare.
          </SideCard>
          <SideCard variant="problem" title="Unsafe commerce">
            The campus economy runs in the dark — students rely on anonymous
            accounts and fleeting statuses to buy laptops and textbooks,
            leaving them vulnerable to scams. Legitimate student entrepreneurs
            struggle to gain visibility.
          </SideCard>
          <SideCard variant="problem" title="A fragmented campus">
            No unified digital infrastructure exists — no single, verified
            hub where a student can connect with their department, discover
            events, or interact safely with peers across hostels.
          </SideCard>
        </Grid>
      </Section>

      <Section>
        <SectionHead kicker="Our solution" title="Three systems, one platform." />
        <Grid cols={3}>
          <SideCard variant="solution" title="The daily utility">
            A smart, centralised timetable with instant push notifications
            when a lecture shifts, plus a searchable Study Hub for past
            questions, lecture slides, and notes — no scrolling through
            months of chat history.
          </SideCard>
          <SideCard variant="solution" title="The campus economy">
            UniShop gives every student entrepreneur a branded digital
            storefront. Every buyer and seller is a verified peer, eliminating
            the anonymous scam risk that plagues general marketplaces.
          </SideCard>
          <SideCard variant="solution" title="The hook">
            Daily login streaks and study contributions earn Status Points
            (SP) — a self-sustaining loop that keeps students engaged, plus
            verified, algorithm-free spaces for departments, unions, and
            clubs.
          </SideCard>
        </Grid>
      </Section>

      <Section>
        <SectionHead
          kicker="Built-in growth loops"
          title="The platform grows because using it is rewarding."
        />
        <div className="loop-grid">
          <LoopCard title="Founder's challenge">
            Invite 3 friends to unlock permanent &lsquo;Founder&rsquo; status
            and bonus SP.
          </LoopCard>
          <LoopCard title="Group study notes">
            To unlock a shared PDF, invite 2 classmates who also upload a note
            of their own.
          </LoopCard>
          <LoopCard title="Campus ambassador program">
            Student leaders — class reps, hostel zonal heads — get an
            official badge, early access, and shout-outs.
          </LoopCard>
          <LoopCard title="Exam leaderboard">
            Top students per department for notes uploaded or quizzes taken
            earn the &lsquo;Exam Champ&rsquo; badge.
          </LoopCard>
        </div>
      </Section>

      <Section>
        <Ticket
          title="Built by students, for students."
          cta={
            <CtaRow>
              <Btn href={APP_URL}>Download UniLife →</Btn>
              <Btn href="/contact" variant="dark">
                Get in touch
              </Btn>
            </CtaRow>
          }
        >
          UniLife started on one campus and is opening to students at
          universities everywhere. Come be part of it early.
        </Ticket>
      </Section>

      <Footer />
    </>
  );
}

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
  TierCard,
  Ticket,
  Btn,
  CtaRow,
  StatBoxGrid,
  StatBox,
  PullQuote,
  NoticeBand,
  PartnerWall,
  PartnerChip,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Partner With Us | UniLife",
  description:
    "A verified UniLife page is your organisation's permanent digital headquarters — command attention, centralise operations, and engage every member.",
};

export default function PartnersPage() {
  return (
    <>
      <Ticker />
      <Nav active="/partners" />

      <header className="page-head">
        <div className="kicker">Open to partnership</div>
        <h1>For school bodies, departments, student unions &amp; clubs.</h1>
        <p>
          A verified UniLife page is your organisation&apos;s permanent
          digital headquarters. Command attention, centralise operations, and
          engage every member — without fighting an algorithm.
        </p>
        <CtaRow>
          <Btn href="/contact">Claim your partner page →</Btn>
          <Btn href="#tiers" variant="ghost">
            See the tiers
          </Btn>
        </CtaRow>
        <StatBoxGrid>
          <StatBox val="100%" label="Verified students" />
          <StatBox val="Closed" label="Authenticated network" />
          <StatBox val="Live" label="Platform status" />
        </StatBoxGrid>
        <PullQuote>
          &ldquo;Built for students, by students. A campus revolution starts
          here.&rdquo; — UniLife mission statement
        </PullQuote>
      </header>

      <Section>
        <SectionHead
          kicker="Current partners"
          title="Organisations already backing UniLife."
          description="A growing list of youth-focused bodies working alongside us — with room for more."
        />
        <PartnerWall>
          <PartnerChip
            href="https://www.sdgyouthconnect.org/"
            src="/partner-sdg-youth-connect.png"
            alt="SDG Youth Connect West Africa"
          />
          <PartnerChip placeholder={<>Your organisation<br />could be here</>} />
          <PartnerChip placeholder={<>Your organisation<br />could be here</>} />
        </PartnerWall>
      </Section>

      <Section>
        <SectionHead
          kicker="Why partner with us"
          title="Your organisation's digital headquarters."
        />
        <Grid cols={2}>
          <Stub emoji="📢" title="Command attention">
            Post announcements that reach 100% of your members instantly — no
            WhatsApp chaos, no algorithm burial.
          </Stub>
          <Stub emoji="🗂️" title="Centralise operations">
            One verified hub for event flyers, deadlines, and schedules.
            Members always know exactly where to look.
          </Stub>
          <Stub emoji="📊" title="Engage directly">
            Interactive polls, quizzes, and live feedback — know your
            community&apos;s pulse before you decide.
          </Stub>
          <Stub emoji="✨" title="Elevate your brand">
            A premium digital presence that signals authority — modern,
            tech-forward, and credible.
          </Stub>
        </Grid>
      </Section>

      <Section>
        <SectionHead
          kicker="Exclusive benefits for your body"
          title="Three privileges reserved for verified partners."
        />
        <Grid cols="list">
          <Stub code="COUNCIL" title="Shape the platform's future" raw>
            <ul className="tick-list">
              <li>
                A permanent seat in the private Partners Feedback Council
              </li>
              <li>
                Propose and vote on new features before general release
              </li>
              <li>Beta-test new capabilities ahead of the wider campus</li>
            </ul>
          </Stub>
          <Stub code="REACH" title="Algorithmic immunity — 100% guaranteed reach" raw>
            <ul className="tick-list">
              <li>
                Every post reaches 100% of your followers — zero filtering
              </li>
              <li>
                High-priority updates trigger push notifications to all
                followers
              </li>
              <li>Your voice always lands first</li>
            </ul>
          </Stub>
          <Stub code="STATUS" title="Official recognition & campus status" raw>
            <ul className="tick-list">
              <li>Verified Partner badge displayed on your page</li>
              <li>
                Priority placement in the Official Bodies &amp; Clubs
                directory
              </li>
              <li>
                Exclusive &lsquo;Founding Partner&rsquo; badge — first 5
                organisations only
              </li>
            </ul>
          </Stub>
        </Grid>
      </Section>

      <Section>
        <SectionHead
          kicker="What we ask of you"
          title="Three simple, one-time commitments."
          description="No ongoing obligations — we handle the rest."
        />
        <div className="step-grid">
          <StepCard n={1} title="One announcement">
            Share one official post or story about UniLife. We supply the
            visual template — you just post it.
          </StepCard>
          <StepCard n={2} title="Onboard core members">
            Use your unique partner link to bring 20–50 of your active
            members onto the platform.
          </StepCard>
          <StepCard n={3} title="Nominate executives">
            Send 2–3 executive names to represent your body in the Partners
            Feedback Council.
          </StepCard>
        </div>
      </Section>

      <Section id="tiers">
        <SectionHead
          kicker="The tiered partnership offer"
          title="First-come, first-served. No exceptions."
          description="Tier allocation is strictly sequential — once a tier fills, those slots close permanently."
        />
        <div className="tier-grid">
          <TierCard
            featured
            tag="Tier 1 · Founding partners"
            title="First 5 organisations"
            sub="to accept"
            items={[
              "Exclusive Founding Partner badge",
              "Priority listing — top of Official Bodies directory",
              "Verified page with 100% algorithmic reach",
              "Full access to the Partners Feedback Council",
              "Beta-test features before public release",
            ]}
          />
          <TierCard
            tag="Tier 2 · Verified partners"
            title="Next 5 organisations"
            sub="to accept"
            items={[
              "Verified Partner badge on your page",
              "Listing in the Official Bodies directory",
              "Guaranteed 100% algorithmic reach",
              "Access to the Partners Feedback Council",
              "Full announcement and poll tools",
            ]}
          />
        </div>
        <NoticeBand>
          ⚡ Tier 1 Founding Partner slots are permanently limited. Act now —
          or accept Tier 2.
        </NoticeBand>
      </Section>

      <Section>
        <Ticket
          title="Ready to claim your place?"
          cta={
            <CtaRow>
              <Btn href="https://wa.me/2348164670694">
                Message on WhatsApp →
              </Btn>
              <Btn href="mailto:unilife.edu.org@gmail.com" variant="dark">
                Email us
              </Btn>
            </CtaRow>
          }
        >
          Reach out and your organisation&apos;s page can go live within
          days.
        </Ticket>
      </Section>

      <Footer />
    </>
  );
}

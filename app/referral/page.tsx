import ReferralNav from "@/components/referral/ReferralNav";
import ReferralFooter from "@/components/referral/ReferralFooter";
import Pot from "@/components/referral/Pot";
import Reveal from "@/components/referral/Reveal";
import Countdown from "@/components/referral/Countdown";
import {
  Section,
  SectionHead,
  Grid,
  Card,
  Step,
  Rung,
  FairPlayBanner,
  HelpCard,
  StatChip,
  CtaRow,
  Btn,
} from "@/components/referral/ui";
import { CAMPAIGN_LAUNCH, TIERS, fmtNaira } from "@/lib/referral-config";

export default function ReferralHome() {
  const currentAmount = TIERS.filter((t) => t.funded).at(-1)?.amount ?? 0;

  return (
    <>
      <ReferralNav active="/referral" />

      <header className="hero">
        <div>
          <Reveal>
            <span className="eyebrow">OCT 8 – 21, 2026 · OLABISI ONABANJO UNIVERSITY</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="hero-title display">
              Unlock
              <br />
              the <span className="line2">Pot.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              One referral link. Nine milestones. A cash prize pool that
              grows every time a real, verified student joins UniLife — no
              bots, no fake accounts, no broken promises.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <CtaRow>
              <Btn href="/referral/tiers">See the prize ladder →</Btn>
              <Btn href="/referral/help" variant="ghost">
                Sponsor a tier
              </Btn>
            </CtaRow>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="stat-row">
              <StatChip>
                <b>350+</b>&nbsp;active users today
              </StatChip>
              <StatChip>
                <b>4 of 9</b>&nbsp;tiers already funded
              </StatChip>
              <StatChip>
                <b>Top 10</b>&nbsp;split the cash
              </StatChip>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <Countdown target={CAMPAIGN_LAUNCH} />
          </Reveal>
        </div>

        <Pot amountLabel={fmtNaira(currentAmount)} captionLabel="GUARANTEED · GROWING WITH EVERY SIGNUP" />
      </header>

      <Section id="about">
        <SectionHead
          kicker="01 — THE PLATFORM"
          title="Built by a student, for the whole campus."
          description="UniLife is the everyday app for OOU students — where you study, trade, connect, and stay safe, all in one place. This challenge exists to get it into every student's hands, fast."
        />
        <Reveal>
          <Grid cols={3}>
            <Card title="Study Library">
              Past questions, lecture notes, and PDFs organized by course —
              no more scattered WhatsApp forwards.
            </Card>
            <Card title="AI Quizzes & Flashcards">
              Turn any note into a revision set in seconds, built for exam
              crunch time.
            </Card>
            <Card title="Coursemate & Faculty Connect">
              Find classmates, seniors, and faculty groups without hunting
              through group chats.
            </Card>
            <Card title="Interest Communities">
              Anime, BTS, football, gaming — the campus finds its people.
            </Card>
            <Card title="Campus Security Alerts">
              Real-time safety notices that reach students before rumors do.
            </Card>
            <Card title="Campus Marketplace">
              Buy and sell safely within a verified student network.
            </Card>
          </Grid>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="stat-row">
            <StatChip>
              Partnered with <b>NUESA</b>
            </StatChip>
            <StatChip>
              <b>COESA</b>
            </StatChip>
            <StatChip>
              <b>COAL</b>
            </StatChip>
            <StatChip>
              <b>NIMechE</b>
            </StatChip>
            <StatChip>
              Live now at <b>unilife.com.ng</b> · Play Store / App Store next
            </StatChip>
          </div>
        </Reveal>
      </Section>

      <Section>
        <SectionHead
          kicker="02 — HOW THE GAME WORKS"
          title="Three moves. Everyone can play."
          description="No luck, no elimination — just verified signups. The more real students you bring in, the higher you climb."
        />
        <Reveal>
          <div className="steps">
            <Step shape="circle" tag="STEP 1" title="Share your link">
              Every student gets a unique referral link. Drop it in your
              WhatsApp groups, hall chats, or class page.
            </Step>
            <Step shape="tri" tag="STEP 2" title="They get verified">
              New signups confirm with ID, matric number, and a photo match.
              If it&apos;s not a real student, it doesn&apos;t count.
            </Step>
            <Step shape="square" tag="STEP 3" title="Climb and get paid">
              The top 10 referrers split the cash pool. The top 50 earn SP,
              UniLife&apos;s in-app currency.
            </Step>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="cta-row" style={{ marginTop: 26 }}>
            <Btn href="/referral/dashboard">Get your referral link →</Btn>
            <Btn href="/referral/leaderboard" variant="ghost">
              See the leaderboard
            </Btn>
          </div>
        </Reveal>
      </Section>

      <Section id="ladder">
        <SectionHead
          kicker="03 — THE PRIZE LADDER"
          title="Every 100 referrals unlocks the next rung."
          description="The first four tiers are funded directly by the founder — ₦100,000 already committed. Everything past that opens the moment sponsor funding lands."
        />
        <Reveal>
          <div className="ladder">
            {TIERS.slice(0, 4).map((tier) => (
              <Rung
                key={tier.threshold}
                funded={tier.funded}
                refs={`${tier.threshold.toLocaleString()} referrals`}
                milestone={`Milestone ${TIERS.indexOf(tier) + 1}`}
                amount={fmtNaira(tier.amount)}
              />
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="ladder-note">
            We only ever advertise the currently funded amount to students.
            Bonus tiers stay off the public board until sponsor money is
            actually in hand — no promises we can&apos;t keep.{" "}
            <a href="/referral/tiers" style={{ color: "var(--r-pink)" }}>
              See all 9 tiers →
            </a>
          </p>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <FairPlayBanner />
        </Reveal>
      </Section>

      <Section id="help">
        <SectionHead kicker="04 — GET INVOLVED" title="Four ways to back the campaign." />
        <Reveal>
          <div className="help-grid">
            <HelpCard shape="circle" title="Sponsor a tier">
              Fund a milestone from ₦25,000 to ₦250,000+ and get brand
              visibility — flyers, in-app banners, push notifications,
              co-branded winner announcements.
            </HelpCard>
            <HelpCard shape="tri" title="Seed anonymously">
              Any amount, no minimum, no public attribution required. Just a
              private report on results afterward.
            </HelpCard>
            <HelpCard shape="square" title="Make an introduction">
              Know an alum, local business, or fintech who wants direct
              access to a verified student audience? Connect us.
            </HelpCard>
            <HelpCard shape="circle" shapeColor="var(--r-green)" title="Amplify it">
              Share the campaign in WhatsApp groups, with student bodies, or
              your own network. Reach costs nothing.
            </HelpCard>
          </div>
        </Reveal>
      </Section>

      <ReferralFooter />
    </>
  );
}

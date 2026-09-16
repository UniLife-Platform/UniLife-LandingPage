import ReferralNav from "@/components/referral/ReferralNav";
import ReferralFooter from "@/components/referral/ReferralFooter";
import Reveal from "@/components/referral/Reveal";
import { PageHead, Section, SectionHead, Grid, Card, StatChip, Btn } from "@/components/referral/ui";

export default function ReferralAboutPage() {
  return (
    <>
      <ReferralNav active="/referral/about" />

      <PageHead kicker="ABOUT THE PLATFORM" title="Built by a student, for the whole campus.">
        UniLife is the everyday app open to students at any university students — where you study,
        trade, connect, and stay safe, all in one place. This referral
        challenge exists to get it into every student&apos;s hands, fast.
      </PageHead>

      <Section>
        <SectionHead kicker="WHAT'S INSIDE" title="Six reasons students actually open the app daily." />
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
      </Section>

      <Section>
        <SectionHead kicker="WHY A REFERRAL CHALLENGE" title="Growth that rewards the people doing the growing." />
        <Reveal>
          <Card title="The idea">
            Most apps spend on ads that reach strangers. UniLife would
            rather put that budget directly into the hands of the students
            already spreading the word — so the referral pot replaces an ad
            budget, split among real students instead of an ad platform.
          </Card>
        </Reveal>
      </Section>

      <Section>
        <SectionHead kicker="PARTNERS & BACKERS" title="Student bodies already on board." />
        <Reveal>
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
        <Reveal delay={0.1}>
          <div className="cta-row" style={{ marginTop: 30 }}>
            <Btn href="/referral/tiers">See the prize ladder →</Btn>
            <Btn href="/referral/help" variant="ghost">
              Become a partner
            </Btn>
          </div>
        </Reveal>
      </Section>

      <ReferralFooter />
    </>
  );
}

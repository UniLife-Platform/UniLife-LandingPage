import ReferralNav from "@/components/referral/ReferralNav";
import ReferralFooter from "@/components/referral/ReferralFooter";
import Reveal from "@/components/referral/Reveal";
import { PageHead, Section, SectionHead, HelpCard, CtaRow, Btn } from "@/components/referral/ui";

export default function HelpPage() {
  return (
    <>
      <ReferralNav active="/referral/help" />

      <PageHead kicker="GET INVOLVED" title="Four ways to back the campaign.">
        Whatever your budget or role — alum, local business, fintech, or
        just a student with a big network — there&apos;s a way in.
      </PageHead>

      <Section>
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

      <Section>
        <SectionHead kicker="WHY THIS IS A GOOD BET" title="The case, plainly." />
        <Reveal>
          <ul className="bets">
            <li>
              <span className="num">01</span>
              <span>
                <b>Direct, authentic access</b> to a verified student
                audience — hard to reach through normal advertising.
              </span>
            </li>
            <li>
              <span className="num">02</span>
              <span>
                <b>Every referral is identity-checked</b> — ID, matric
                number, photo match — before it counts. No bot or
                fake-account inflation.
              </span>
            </li>
            <li>
              <span className="num">03</span>
              <span>
                <b>The founder is co-investing</b> alongside sponsors, not
                asking anyone to fund the whole thing alone.
              </span>
            </li>
            <li>
              <span className="num">04</span>
              <span>
                <b>Nothing goes to waste.</b> If referral targets fall short
                of what&apos;s raised, leftover funds go to CAC
                registration, app store listings, and product development —
                always transparent.
              </span>
            </li>
            <li>
              <span className="num">05</span>
              <span>
                <b>A full post-campaign report</b> goes to every
                contributor: reach, engagement, and verified results.
              </span>
            </li>
          </ul>
        </Reveal>
      </Section>

      <Section>
        <SectionHead kicker="WHERE THE MONEY GOES" title="Held separately. Reported openly." />
        <Reveal>
          <div className="ledger-card">
            <p>
              Funds are held in a dedicated account, kept fully separate
              from personal spending, with a full public ledger shared
              after the campaign.
            </p>
            <p>
              A simple one-page sponsorship/seed agreement is available for
              anyone ready to contribute.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <CtaRow style={{ marginTop: 24 }}>
            <Btn href="/referral/contact">Talk to the founder →</Btn>
            <Btn href="/referral/money" variant="ghost">
              Watch the pot grow
            </Btn>
          </CtaRow>
        </Reveal>
      </Section>

      <ReferralFooter compact />
    </>
  );
}

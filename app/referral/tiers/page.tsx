import ReferralNav from "@/components/referral/ReferralNav";
import ReferralFooter from "@/components/referral/ReferralFooter";
import Reveal from "@/components/referral/Reveal";
import { PageHead, Section, SectionHead, Rung, Phase, FairPlayBanner, CtaRow, Btn } from "@/components/referral/ui";
import { TIERS, fmtNaira } from "@/lib/referral-config";

export default function TiersPage() {
  return (
    <>
      <ReferralNav active="/referral/tiers" />

      <PageHead kicker="THE PRIZE LADDER" title="Nine milestones. No secrets.">
        The first four tiers are funded directly by the founder —
        ₦100,000 already committed. Everything past that opens the moment
        sponsor funding lands, and never before.
      </PageHead>

      <Section>
        <Reveal>
          <div className="ladder">
            {TIERS.map((tier, i) => (
              <Rung
                key={tier.threshold}
                funded={tier.funded}
                refs={`${tier.threshold.toLocaleString()} referrals`}
                milestone={i === TIERS.length - 1 ? `Milestone ${i + 1} · Max tier` : `Milestone ${i + 1}`}
                amount={fmtNaira(tier.amount)}
              />
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="ladder-note">
            We only ever advertise the currently funded amount to students.
            Bonus tiers stay off the public board until sponsor money is
            actually in hand.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <CtaRow>
            <Btn href="/referral/money">See where we are right now →</Btn>
            <Btn href="/referral/help" variant="ghost">
              Sponsor a tier
            </Btn>
          </CtaRow>
        </Reveal>
      </Section>

      <Section>
        <SectionHead kicker="CAMPAIGN TIMELINE" title="Realistic, not reckless." />
        <Reveal>
          <div className="phase-track">
            <Phase when="OCT 8 – 21, 2026" title="Phase 1 · Core Campaign" badge="live">
              A fixed 14-day window chasing the four founder-funded
              milestones. This phase runs no matter what — it doesn&apos;t
              depend on outside money.
            </Phase>
            <Phase when="CONDITIONAL" title="Phase 2 & 3 · Bonus Extension Weeks" badge="locked">
              Only activate if earlier milestones are hit early — and only
              once sponsor funding for those specific tiers is confirmed in
              hand.
            </Phase>
            <Phase when="DAYS AFTER" title="Verification, Announcement & Payout">
              Whichever phase the campaign actually reaches, results are
              verified and winners are announced and paid within days.
            </Phase>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <FairPlayBanner />
        </Reveal>
      </Section>

      <ReferralFooter compact />
    </>
  );
}

import ReferralNav from "@/components/referral/ReferralNav";
import ReferralFooter from "@/components/referral/ReferralFooter";
import Reveal from "@/components/referral/Reveal";
import { PageHead, CtaRow, Btn } from "@/components/referral/ui";

export default function ReferralContactPage() {
  return (
    <>
      <ReferralNav active="/referral/contact" />

      <PageHead kicker="LET'S TALK" title="Ready to join the pot?">
        Funds are held in a dedicated account, kept fully separate from
        personal spending, with a full public ledger shared after the
        campaign. A one-page sponsorship/seed agreement is ready for anyone
        who wants to move forward.
      </PageHead>

      <section className="section" style={{ paddingTop: 20 }}>
        <Reveal>
          <div className="contact-card" style={{ maxWidth: 460 }}>
            <div className="name">Harrison Ariwodo</div>
            <div className="role">Founder, UniLife</div>
            <a className="contact-line" href="https://wa.me/2348164670694">
              <span className="ic"></span> WhatsApp — +234 816 467 0694
            </a>
            <a className="contact-line" href="mailto:unilife.edu.org@gmail.com">
              <span className="ic"></span> Email — unilife.edu.org@gmail.com
            </a>
            <a className="contact-line" href="https://unilife.com.ng">
              <span className="ic"></span> Website — unilife.com.ng
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <CtaRow style={{ marginTop: 26 }}>
            <Btn href="https://wa.me/2348164670694">Message on WhatsApp →</Btn>
            <Btn href="mailto:unilife.edu.org@gmail.com" variant="ghost">
              Email the founder
            </Btn>
          </CtaRow>
        </Reveal>
      </section>

      <ReferralFooter compact />
    </>
  );
}

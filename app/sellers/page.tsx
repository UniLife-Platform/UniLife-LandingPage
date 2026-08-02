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
  NoticeBand,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "For Sellers | UniLife",
  description:
    "Open a branded UniShop storefront and sell to a verified, captive campus audience — zero fees for early adopters.",
};

export default function SellersPage() {
  return (
    <>
      <Ticker />
      <Nav active="/sellers" />

      <header className="page-head">
        <div className="kicker">Campus commerce, reimagined</div>
        <h1>Elevate your hustle.</h1>
        <p>
          Open your UniLife storefront and sell to a verified campus
          audience. You already have the product — textbooks, streetwear,
          snacks, tech, or design skills. It&apos;s time to upgrade your
          distribution.
        </p>
        <CtaRow>
          <Btn href="/contact">Open my storefront →</Btn>
          <Btn href="#unlock" variant="ghost">
            How it works
          </Btn>
        </CtaRow>
      </header>

      <Section>
        <SectionHead
          kicker="The UniLife advantage"
          title="Four structural advantages no other selling platform on campus offers."
        />
        <Grid cols={2}>
          <Stub emoji="🏪" title="Your branded turf">
            Upload products, manage orders, and run your shop with a premium,
            professional interface that reflects your brand — not a generic
            listing page.
          </Stub>
          <Stub emoji="🎯" title="Zero wasted traffic">
            Every single user on the platform is a verified student on
            campus. You&apos;re marketing directly to buyers — no ad spend,
            no guesswork, no outsiders.
          </Stub>
          <Stub emoji="🔒" title="Trust built-in">
            All buyers and sellers are verified peers. The anonymous scam
            risk that plagues WhatsApp and DM sales is eliminated by design.
          </Stub>
          <Stub emoji="📡" title="Social amplification">
            Export your product listings directly to Instagram, TikTok, and X
            with a single tap — driving external traffic back into your
            verified store.
          </Stub>
        </Grid>
      </Section>

      <Section>
        <SectionHead
          kicker="Exclusive perks for day-one merchants"
          title="Three privileges reserved for founding merchants."
          description={<span className="sub">Once the slots fill, these perks close permanently.</span>}
        />
        <Grid cols="list">
          <Stub code="COUNCIL" title="The Sellers Council" raw>
            <ul className="tick-list" style={{ marginTop: 8 }}>
              <li>
                Private, invite-only merchant group shaping how campus
                commerce works
              </li>
              <li>Direct input on marketplace features and seller tools</li>
              <li>
                Early access to new capabilities before general release
              </li>
            </ul>
          </Stub>
          <Stub code="TARGETING" title="Precision targeting" raw>
            <ul className="tick-list" style={{ marginTop: 8 }}>
              <li>
                Your shop drops into the feeds of the highest-intent buyers
                for what you sell
              </li>
              <li>
                New inventory triggers push notifications to interested
                buyers
              </li>
              <li>No wasted impressions — every eyeball counts</li>
            </ul>
          </Stub>
          <Stub code="STATUS" title="Status & visibility" raw>
            <ul className="tick-list" style={{ marginTop: 8 }}>
              <li>
                Unlock the exclusive &lsquo;Top Merchant&rsquo; badge on your
                profile and storefront
              </li>
              <li>
                Your shop pinned to the discovery feed of every new user for
                a full week
              </li>
              <li>
                Be the first face new students see when they open the app
              </li>
            </ul>
          </Stub>
        </Grid>
      </Section>

      <Section id="unlock">
        <SectionHead kicker="To unlock your storefront" title="Just two actions." />
        <div className="step-grid step-grid--2">
          <StepCard n={1} title="List your first 3 items">
            Add at least 3 products — with photos, a price, and a short
            description. That&apos;s all it takes to go live.
          </StepCard>
          <StepCard n={2} title="Share one promo graphic">
            Post one promotional story about your new UniLife shop. We supply
            the professionally designed asset — you just share it.
          </StepCard>
        </div>
        <NoticeBand>
          ⚡ Day-One Merchant privileges are strictly limited. First to
          reply, first to benefit.
        </NoticeBand>
      </Section>

      <Section>
        <SectionHead kicker="Why sell here vs anywhere else" />
        <CompareScript
          oldTitle="WhatsApp & DMs"
          newTitle="UniLife storefront"
          oldItems={[
            "No product catalogue — buyers forget what you sell",
            "Scam risk — no identity verification for buyers",
            "Messages buried in busy group chats",
            "Zero analytics on what's performing",
            "Re-posting the same items repeatedly",
          ]}
          newItems={[
            "Permanent, browsable storefront always visible",
            "100% verified buyers — fraud risk eliminated",
            "Discovery feed + push notifications to buyers",
            "Sales dashboard and category performance data",
            "Live listings that sell for you around the clock",
          ]}
        />
      </Section>

      <Section>
        <Ticket
          title="Ready to dominate the campus market?"
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
          Message us and we&apos;ll send you the rapid-setup guide. Day-One
          Merchant slots are strictly limited.
        </Ticket>
      </Section>

      <Footer />
    </>
  );
}

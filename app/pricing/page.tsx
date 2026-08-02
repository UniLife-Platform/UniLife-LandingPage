import type { Metadata } from "next";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PageHead, PlanCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing | UniLife",
  description:
    "Simple, honest UniLife pricing — priced in SP, the platform's Status Points currency.",
};

const APP_URL = "https://www.harrisonking.com.ng/apps/unilife";

export default function PricingPage() {
  return (
    <>
      <Ticker />
      <Nav active="/pricing" />

      <PageHead
        kicker="Simple, honest pricing"
        title="Choose the plan that fits your campus journey."
      >
        Start free. Upgrade with SP when your hustle — or your following —
        outgrows it.
      </PageHead>

      <section className="section" style={{ padding: "50px var(--edge) 80px" }}>
        <div className="plan-grid">
          <PlanCard
            title="Free"
            price="0"
            unit="SP"
            period="/month"
            topup="No purchase needed"
            desc="Everything you need to get started on campus."
            items={[
              "Basic marketplace listing",
              "Limited study uploads",
              "Standard profile",
              "Ads supported",
              "Limited usage & storage",
              "Basic support",
            ]}
            ctaHref={APP_URL}
            ctaLabel="Start free"
          />
          <PlanCard
            featured
            title="Pro"
            price="2,500"
            unit="SP"
            period="/month"
            topup="≈ ₦2,500 to top up · or earn it free"
            desc="For students and sellers who are active every day."
            items={[
              "Unlimited marketplace listings",
              "Advanced shop analytics",
              "Gold profile badge",
              "Ad-free experience",
              "Increased usage & storage",
              "Some customization + priority support",
              "Optional add-ons available",
            ]}
            ctaHref={APP_URL}
            ctaLabel="Go Pro"
          />
          <PlanCard
            title="Creator"
            price="5,000"
            unit="SP"
            period="/month"
            topup="≈ ₦5,000 to top up · or earn it free"
            desc="For top sellers, creators, and community leaders."
            items={[
              "Full feature access",
              "Unlimited usage & storage",
              "Full customization",
              "Priority support",
              "Premium support & consulting included",
              "Everything in Pro",
            ]}
            ctaHref={APP_URL}
            ctaLabel="Go Creator"
          />
        </div>
        <p className="footnote">
          Prices shown in Status Points (SP), UniLife&apos;s in-app currency
          — top up with Naira anytime, or earn SP for free through daily
          streaks and contributions. Free tier users can upgrade or downgrade
          at any time — no lock-in contracts.
        </p>
      </section>

      <Footer />
    </>
  );
}

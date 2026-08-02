"use client";

import { useEffect, useState, useCallback } from "react";
import ReferralNav from "@/components/referral/ReferralNav";
import ReferralFooter from "@/components/referral/ReferralFooter";
import Reveal from "@/components/referral/Reveal";
import Pot from "@/components/referral/Pot";
import { Section, SectionHead, CtaRow, Btn } from "@/components/referral/ui";
import {
  TIERS,
  MAX_THRESHOLD,
  fmtNaira,
  fmtNum,
  currentFundedTier,
  nextTier,
} from "@/lib/referral-config";
import {
  getCampaignTotal,
  subscribeToReferralUpdates,
  SupabaseNotConfiguredError,
} from "@/lib/supabase/referral";

const DEMO_TOTAL = 620;

export default function MoneyPage() {
  const [total, setTotal] = useState<number | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      const t = await getCampaignTotal();
      setTotal(t);
      setIsDemo(false);
      setErrorMsg(null);
    } catch (err) {
      if (err instanceof SupabaseNotConfiguredError) {
        setTotal(DEMO_TOTAL);
        setIsDemo(true);
      } else {
        setErrorMsg("Couldn't reach the live count right now.");
        setTotal(DEMO_TOTAL);
        setIsDemo(true);
      }
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount
    void refetch();
  }, [refetch]);

  useEffect(() => {
    const unsubscribe = subscribeToReferralUpdates(refetch);
    return unsubscribe;
  }, [refetch]);

  const displayTotal = total ?? 0;
  const funded = currentFundedTier(displayTotal);
  const upcoming = nextTier(displayTotal);
  const currentPrize = funded?.amount ?? 0;
  const fillPct = Math.min(100, (displayTotal / MAX_THRESHOLD) * 100);

  return (
    <>
      <ReferralNav active="/referral/money" />

      <section className="section" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 30 }}>
        <Reveal>
          <span className="eyebrow" style={{ borderColor: "rgba(0,229,138,0.35)", background: "rgba(0,229,138,0.06)" }}>
            <span style={{ color: "var(--r-green)" }}>
              {isDemo ? "PREVIEW DATA" : "LIVE CAMPAIGN TOTAL"}
            </span>
          </span>
        </Reveal>

        {isDemo && (
          <p className="mono" style={{ color: "var(--r-muted-2)", fontSize: "0.78rem", marginTop: 14, maxWidth: 460 }}>
            {errorMsg ?? "Supabase isn't connected in this preview — showing sample numbers so the layout can be reviewed. Connect your project to make this genuinely live."}
          </p>
        )}

        <Reveal delay={0.05}>
          <div style={{ marginTop: 18 }}>
            <div className="mono" style={{ fontSize: "0.78rem", letterSpacing: 3, color: "var(--r-muted)", marginBottom: 6 }}>
              TOTAL COMMUNITY REFERRALS
            </div>
            <div className="mono display" style={{ fontSize: "clamp(3.2rem, 11vw, 8rem)", lineHeight: 1 }}>
              {fmtNum(displayTotal)}
            </div>
          </div>
        </Reveal>

        <Pot
          amountLabel={fmtNaira(currentPrize)}
          captionLabel={
            funded
              ? `Locked in at the ${fmtNum(funded.threshold)}-referral milestone — founder-funded, guaranteed.`
              : `First milestone unlocks at ${fmtNum(TIERS[0].threshold)} verified referrals.`
          }
          fillPct={fillPct}
          size="large"
        />
      </section>

      <Section>
        <SectionHead
          kicker="PROGRESS TOWARD THE MAX TIER"
          title={
            upcoming
              ? `${fmtNum(upcoming.threshold - displayTotal)} referrals to ${fmtNaira(upcoming.amount)}${upcoming.funded ? "" : " (opens with sponsor funding)"}`
              : "Max tier reached — every milestone unlocked."
          }
        />
        <Reveal>
          <div style={{ position: "relative", height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 4, margin: "50px 6px 60px" }}>
            <div
              style={{
                position: "absolute", top: 0, left: 0, height: "100%",
                background: "linear-gradient(90deg, var(--r-green), var(--r-gold))",
                borderRadius: 4, width: `${fillPct}%`, transition: "width 1.8s cubic-bezier(.2,.8,.2,1)",
              }}
            />
            {TIERS.map((t) => {
              const pos = (t.threshold / MAX_THRESHOLD) * 100;
              const done = displayTotal >= t.threshold && t.funded;
              return (
                <div
                  key={t.threshold}
                  style={{
                    position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%,-50%)",
                    width: 16, height: 16, borderRadius: "50%",
                    background: done ? "var(--r-green)" : "var(--r-bg)",
                    border: `3px solid ${done ? "var(--r-green)" : t.funded ? "var(--r-card-line)" : "var(--r-pink)"}`,
                    boxShadow: done ? "0 0 10px var(--r-green-glow)" : "none",
                  }}
                >
                  <span className="mono" style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: "0.7rem", fontWeight: 700, color: done ? "var(--r-green)" : "var(--r-muted)" }}>
                    {fmtNaira(t.amount)}
                  </span>
                  <span className="mono" style={{ position: "absolute", top: 22, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: "0.68rem", color: "var(--r-muted-2)" }}>
                    {fmtNum(t.threshold)}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
        <p style={{ textAlign: "center", color: "var(--r-muted-2)", fontSize: "0.85rem", fontStyle: "italic", maxWidth: 560, margin: "0 auto" }}>
          This total updates the moment the campaign team verifies a new
          signup (ID + matric number + photo match). Prize amounts only
          increase for tiers that are actually funded — locked tiers stay
          locked until sponsor money is confirmed in hand.
        </p>
        <Reveal delay={0.1}>
          <CtaRow style={{ justifyContent: "center" }}>
            <Btn href="/referral/help">Help fund the next tier →</Btn>
            <Btn href="/referral/tiers" variant="ghost">
              View full tier breakdown
            </Btn>
          </CtaRow>
        </Reveal>
      </Section>

      <ReferralFooter compact />
    </>
  );
}

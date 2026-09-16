"use client";

import { useEffect, useState, useCallback } from "react";
import ReferralNav from "@/components/referral/ReferralNav";
import ReferralFooter from "@/components/referral/ReferralFooter";
import Reveal from "@/components/referral/Reveal";
import { PageHead, Section, CtaRow, Btn } from "@/components/referral/ui";
import {
  getLeaderboard,
  subscribeToReferralUpdates,
  SupabaseNotConfiguredError,
  type LeaderboardEntry,
} from "@/lib/supabase/referral";

const DEMO_ENTRIES: LeaderboardEntry[] = [
  { display_name: "Chidinma A.", verified_count: 214 },
  { display_name: "Tunde O.", verified_count: 187 },
  { display_name: "Fatima B.", verified_count: 165 },
  { display_name: "Emeka N.", verified_count: 142 },
  { display_name: "Ronke S.", verified_count: 118 },
];

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    try {
      const data = await getLeaderboard(50);
      setEntries(data);
      setIsDemo(false);
    } catch (err) {
      if (err instanceof SupabaseNotConfiguredError) {
        setEntries(DEMO_ENTRIES);
        setIsDemo(true);
      } else {
        setEntries(DEMO_ENTRIES);
        setIsDemo(true);
      }
    } finally {
      setLoading(false);
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

  const top10 = entries.slice(0, 10);
  const rest = entries.slice(10, 50);

  return (
    <>
      <ReferralNav active="/referral/leaderboard" />

      <PageHead kicker="LIVE STANDINGS" title="Who's climbing the ladder.">
        The top 10 split the cash pool. The top 50 earn SP, UniLife&apos;s
        in-app currency. Rankings update the moment a new referral is
        verified.
      </PageHead>

      {isDemo && (
        <div style={{ padding: "0 6vw" }}>
          <p className="mono" style={{ color: "var(--r-muted-2)", fontSize: "0.78rem", maxWidth: 560 }}>
            Supabase isn&apos;t connected in this preview — showing sample
            names so the layout can be reviewed. Connect your project to
            make this genuinely live.
          </p>
        </div>
      )}

      <Section>
        <Reveal>
          <div className="kicker" style={{ marginBottom: 14 }}>
            TOP 10 · CASH POOL
          </div>
          <div className="lb-list">
            {loading ? (
              <div className="lb-empty">Loading standings…</div>
            ) : top10.length === 0 ? (
              <div className="lb-empty">
                No verified referrals yet — be the first to climb the board.
              </div>
            ) : (
              top10.map((entry, i) => (
                <div className={`lb-row${i < 3 ? " top3" : ""}`} key={`${entry.display_name}-${i}`}>
                  <div className="lb-rank">{i + 1}</div>
                  <div className="lb-name">{entry.display_name}</div>
                  <div className="lb-count">{entry.verified_count}</div>
                </div>
              ))
            )}
          </div>
        </Reveal>

        {rest.length > 0 && (
          <Reveal delay={0.1}>
            <div className="kicker" style={{ marginTop: 50, marginBottom: 14 }}>
              #11 – 50 · SP EARNERS
            </div>
            <div className="lb-list">
              {rest.map((entry, i) => (
                <div className="lb-row" key={`${entry.display_name}-${i + 10}`}>
                  <div className="lb-rank">{i + 11}</div>
                  <div className="lb-name">{entry.display_name}</div>
                  <div className="lb-count">{entry.verified_count}</div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.15}>
          <CtaRow style={{ marginTop: 30, justifyContent: "center" }}>
            <Btn href="/referral/dashboard">Get your referral link →</Btn>
            <Btn href="/referral/tiers" variant="ghost">
              See the prize ladder
            </Btn>
          </CtaRow>
        </Reveal>
      </Section>

      <ReferralFooter compact />
    </>
  );
}

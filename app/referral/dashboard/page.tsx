"use client";

import { useState } from "react";
import ReferralNav from "@/components/referral/ReferralNav";
import ReferralFooter from "@/components/referral/ReferralFooter";
import Reveal from "@/components/referral/Reveal";
import { PageHead, Section, SectionHead, Btn } from "@/components/referral/ui";
import {
  claimReferralCode,
  getMyStats,
  SupabaseNotConfiguredError,
  type MyStats,
} from "@/lib/supabase/referral";

const SITE_URL = "https://unilife.com.ng";

type Mode = "create" | "lookup";

export default function DashboardPage() {
  const [mode, setMode] = useState<Mode>("create");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [matric, setMatric] = useState("");
  const [lookupEmail, setLookupEmail] = useState("");

  const [stats, setStats] = useState<MyStats | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await claimReferralCode({ displayName: name, email, matricNumber: matric });
      const myStats = await getMyStats(email);
      setStats(myStats);
    } catch (err) {
      if (err instanceof SupabaseNotConfiguredError) {
        setError(
          "This dashboard isn't connected to a live backend yet — run the SQL in supabase/referral_schema.sql and add your project credentials to .env.local to enable it."
        );
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const myStats = await getMyStats(lookupEmail);
      if (!myStats) {
        setError("No referral link found for that email. Create one instead.");
      } else {
        setStats(myStats);
      }
    } catch (err) {
      if (err instanceof SupabaseNotConfiguredError) {
        setError(
          "This dashboard isn't connected to a live backend yet — run the SQL in supabase/referral_schema.sql and add your project credentials to .env.local to enable it."
        );
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      setBusy(false);
    }
  }

  function handleCopy(link: string) {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (stats) {
    const link = `${SITE_URL}/join?ref=${stats.code}`;
    return (
      <>
        <ReferralNav active="/referral/dashboard" />
        <PageHead kicker="YOUR DASHBOARD" title={`Welcome back, ${stats.display_name.split(" ")[0]}.`}>
          Share your link everywhere — every verified signup counts toward
          your rank.
        </PageHead>
        <Section>
          <Reveal>
            <div className="link-box">
              <span style={{ flex: 1 }}>{link}</span>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => handleCopy(link)}
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="stat-block">
              <div className="box">
                <div className="n">#{stats.rank}</div>
                <div className="l">Current rank</div>
              </div>
              <div className="box">
                <div className="n">{stats.verified_count}</div>
                <div className="l">Verified referrals</div>
              </div>
              <div className="box">
                <div className="n">{stats.pending_count}</div>
                <div className="l">Pending verification</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="cta-row" style={{ marginTop: 30 }}>
              <Btn href="/referral/leaderboard">See the full leaderboard →</Btn>
              <Btn href="/referral/tiers" variant="ghost">
                View prize tiers
              </Btn>
            </div>
          </Reveal>
        </Section>
        <ReferralFooter compact />
      </>
    );
  }

  return (
    <>
      <ReferralNav active="/referral/dashboard" />

      <PageHead kicker="YOUR REFERRAL LINK" title="Get your link. Track your climb.">
        Every student gets one unique link. Share it, get verified signups,
        and watch your rank move in real time.
      </PageHead>

      <Section>
        <div className="cta-row" style={{ marginBottom: 40 }}>
          <button
            className={`btn ${mode === "create" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => { setMode("create"); setError(null); }}
            type="button"
          >
            I&apos;m new here
          </button>
          <button
            className={`btn ${mode === "lookup" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => { setMode("lookup"); setError(null); }}
            type="button"
          >
            I already have a link
          </button>
        </div>

        {mode === "create" ? (
          <>
            <SectionHead kicker="STEP 1" title="A few details to generate your link." />
            <Reveal>
              <form className="dash-form" onSubmit={handleCreate}>
                <label>FULL NAME</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Obi" required />
                <label>EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@oou.edu.ng"
                  required
                />
                <label>MATRIC NUMBER</label>
                <input
                  value={matric}
                  onChange={(e) => setMatric(e.target.value)}
                  placeholder="OOU/2021/12345"
                  required
                />
                {error && <p className="form-error">{error}</p>}
                <button className="btn btn-primary" type="submit" disabled={busy}>
                  {busy ? "Generating…" : "Get my referral link →"}
                </button>
              </form>
            </Reveal>
          </>
        ) : (
          <>
            <SectionHead kicker="WELCOME BACK" title="Look up your existing link." />
            <Reveal>
              <form className="dash-form" onSubmit={handleLookup}>
                <label>EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={lookupEmail}
                  onChange={(e) => setLookupEmail(e.target.value)}
                  placeholder="ada@oou.edu.ng"
                  required
                />
                {error && <p className="form-error">{error}</p>}
                <button className="btn btn-primary" type="submit" disabled={busy}>
                  {busy ? "Looking up…" : "Find my link →"}
                </button>
              </form>
            </Reveal>
          </>
        )}
      </Section>

      <ReferralFooter compact />
    </>
  );
}

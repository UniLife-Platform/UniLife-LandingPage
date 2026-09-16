import { getSupabaseClient } from "./client";

export type LeaderboardEntry = {
  display_name: string;
  verified_count: number;
};

export type MyStats = {
  code: string;
  display_name: string;
  verified_count: number;
  pending_count: number;
  rank: number;
};

export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super("Supabase isn't connected yet. Add your project URL and anon key to .env.local.");
    this.name = "SupabaseNotConfiguredError";
  }
}

export async function getLeaderboard(limit = 50): Promise<LeaderboardEntry[]> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new SupabaseNotConfiguredError();

  const { data, error } = await supabase
    .from("public_leaderboard")
    .select("display_name, verified_count")
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function getCampaignTotal(): Promise<number> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new SupabaseNotConfiguredError();

  const { data, error } = await supabase
    .from("campaign_totals")
    .select("total_verified_referrals")
    .single();

  if (error) throw error;
  return data?.total_verified_referrals ?? 0;
}

export async function claimReferralCode(params: {
  displayName: string;
  email: string;
  matricNumber: string;
}): Promise<string> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new SupabaseNotConfiguredError();

  const { data, error } = await supabase.rpc("claim_referral_code", {
    p_display_name: params.displayName,
    p_email: params.email,
    p_matric_number: params.matricNumber,
  });

  if (error) throw error;
  return data as string;
}

export async function getMyStats(email: string): Promise<MyStats | null> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new SupabaseNotConfiguredError();

  const { data, error } = await supabase.rpc("get_my_referral_stats", {
    p_email: email,
  });

  if (error) throw error;
  const rows = (data as MyStats[]) ?? [];
  return rows[0] ?? null;
}

/**
 * Subscribes to live referral verification events so the leaderboard
 * and pot total can update in real time without a page refresh.
 * Returns an unsubscribe function.
 */
export function subscribeToReferralUpdates(onUpdate: () => void): () => void {
  const supabase = getSupabaseClient();
  if (!supabase) return () => {};

  const channel = supabase
    .channel("referrals-changes")
    .on("postgres_changes", { event: "*", schema: "public", table: "referrals" }, onUpdate)
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

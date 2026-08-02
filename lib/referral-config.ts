export const CAMPAIGN_LAUNCH = "2026-10-08T00:00:00+01:00";
export const CAMPAIGN_END = "2026-10-21T23:59:59+01:00";

export type Tier = {
  threshold: number;
  amount: number;
  funded: boolean;
};

export const TIERS: Tier[] = [
  { threshold: 100, amount: 10000, funded: true },
  { threshold: 250, amount: 25000, funded: true },
  { threshold: 500, amount: 50000, funded: true },
  { threshold: 1000, amount: 100000, funded: true },
  { threshold: 2500, amount: 150000, funded: false },
  { threshold: 5000, amount: 250000, funded: false },
  { threshold: 7500, amount: 300000, funded: false },
  { threshold: 10000, amount: 400000, funded: false },
  { threshold: 15000, amount: 500000, funded: false },
];

export const MAX_THRESHOLD = TIERS[TIERS.length - 1].threshold;

export function fmtNaira(n: number): string {
  return "₦" + n.toLocaleString("en-NG");
}

export function fmtNum(n: number): string {
  return n.toLocaleString("en-NG");
}

export function currentFundedTier(totalReferrals: number): Tier | null {
  let current: Tier | null = null;
  for (const tier of TIERS) {
    if (totalReferrals >= tier.threshold && tier.funded) {
      current = tier;
    }
  }
  return current;
}

export function nextTier(totalReferrals: number): Tier | undefined {
  return TIERS.find((t) => t.threshold > totalReferrals);
}

/**
 * Single source of truth for public numbers and claims used across marketing pages.
 * CONFIRM these before launch: students compare pages, so every page must say the same thing.
 * Last reviewed: (add date when you verify them)
 */
export const SITE_STATS = {
  /** People on the core / campus builder crew shown on /join */
  buildersCount: "40+",
  /** Universities where UniLife has builders or ambassadors */
  universitiesCount: "12+",
  /** Active students reached, used in role perks */
  activeStudents: "50,000+",
} as const;

/** Tally forms read hidden fields from the URL. Add a hidden field named "ref" to each form. */
export function withRef(url: string, ref: string): string {
  return `${url}${url.includes("?") ? "&" : "?"}ref=${encodeURIComponent(ref)}`;
}

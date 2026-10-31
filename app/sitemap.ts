import type { MetadataRoute } from "next";
import { ALL_CHALLENGES } from "@/lib/challengesData";

const BASE_URL = "https://unilife.com.ng";

// Only list real, indexable pages. Redirect aliases (/request-campus, /oou-challenge)
// and noindex pages (/referral) stay out. Google ignores priority and changeFrequency,
// and a fake lastModified of "now" on every URL makes the whole file untrustworthy,
// so lastModified is only set where we have a real date.
const STATIC_PATHS = [
  "",
  "/scholarships",
  "/challenge",
  "/students",
  "/sellers",
  "/sponsorships",
  "/faq",
  "/partners",
  "/alliances",
  "/request",
  "/pricing",
  "/about",
  "/cookies",
  "/contact",
  "/team",
  "/join",
  "/download",
  "/terms",
  "/policy",
  "/guidelines",
  "/child-safety",
  "/delete-account",
];

// Update when the content of these pages genuinely changes.
const LAST_MODIFIED: Record<string, string> = {
  "/scholarships": "2026-09-15", // matches the "last audited" date in /api/sponsorships
  "/sponsorships": "2026-09-15",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${BASE_URL}${path}`,
    ...(LAST_MODIFIED[path] ? { lastModified: LAST_MODIFIED[path] } : {}),
  }));

  const challenges: MetadataRoute.Sitemap = ALL_CHALLENGES.map((c) => ({
    url: `${BASE_URL}/challenge/${c.slug}`,
  }));

  return [...pages, ...challenges];
}

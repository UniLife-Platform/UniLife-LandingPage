import type { MetadataRoute } from "next";
import { ALL_CHALLENGES } from "@/lib/challengesData";

const BASE_URL = "https://unilife.com.ng";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, freq: "daily" as const },
    { path: "/scholarships", priority: 0.95, freq: "daily" as const },
    { path: "/challenge", priority: 0.95, freq: "daily" as const },
    { path: "/students", priority: 0.9, freq: "weekly" as const },
    { path: "/sellers", priority: 0.9, freq: "weekly" as const },
    { path: "/sponsorships", priority: 0.85, freq: "weekly" as const },
    { path: "/faq", priority: 0.85, freq: "weekly" as const },
    { path: "/partners", priority: 0.8, freq: "monthly" as const },
    { path: "/alliances", priority: 0.8, freq: "monthly" as const },
    { path: "/request", priority: 0.9, freq: "weekly" as const },
    { path: "/pricing", priority: 0.8, freq: "monthly" as const },
    { path: "/about", priority: 0.75, freq: "monthly" as const },
    { path: "/cookies", priority: 0.7, freq: "monthly" as const },
    { path: "/contact", priority: 0.7, freq: "monthly" as const },
    { path: "/team", priority: 0.6, freq: "monthly" as const },
    { path: "/join", priority: 0.6, freq: "monthly" as const },
    { path: "/terms", priority: 0.4, freq: "yearly" as const },
    { path: "/policy", priority: 0.4, freq: "yearly" as const },
    { path: "/download", priority: 0.8, freq: "weekly" as const },
    { path: "/guidelines", priority: 0.5, freq: "yearly" as const },
    { path: "/child-safety", priority: 0.5, freq: "yearly" as const },
    { path: "/delete-account", priority: 0.4, freq: "yearly" as const },
    { path: "/request-campus", priority: 0.6, freq: "monthly" as const },
    ...ALL_CHALLENGES.map((challenge) => ({ path: `/challenge/${challenge.slug}`, priority: 0.8, freq: "weekly" as const })),
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}

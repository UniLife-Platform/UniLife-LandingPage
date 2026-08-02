import type { MetadataRoute } from "next";

const BASE_URL = "https://unilife.com.ng";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/students", priority: 0.9, freq: "monthly" as const },
    { path: "/sellers", priority: 0.9, freq: "monthly" as const },
    { path: "/partners", priority: 0.8, freq: "monthly" as const },
    { path: "/pricing", priority: 0.8, freq: "monthly" as const },
    { path: "/about", priority: 0.7, freq: "monthly" as const },
    { path: "/team", priority: 0.6, freq: "monthly" as const },
    { path: "/contact", priority: 0.6, freq: "yearly" as const },
    { path: "/terms", priority: 0.3, freq: "yearly" as const },
    { path: "/policy", priority: 0.3, freq: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}

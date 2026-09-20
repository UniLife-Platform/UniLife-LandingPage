import { NextResponse } from "next/server";
import { VERIFIED_SPONSORSHIPS, SponsorshipOpportunity } from "@/lib/sponsorshipsData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase().trim();

  let results: SponsorshipOpportunity[] = [...VERIFIED_SPONSORSHIPS];

  if (category && category !== "all") {
    results = results.filter((item) => item.category === category);
  }

  if (search) {
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(search) ||
        item.provider.toLowerCase().includes(search) ||
        item.summary.toLowerCase().includes(search) ||
        item.tags.some((tag) => tag.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({
    status: "success",
    timestamp: new Date().toISOString(),
    totalVerified: results.length,
    lastAuditDate: "2026-09-15",
    opportunities: results,
  });
}

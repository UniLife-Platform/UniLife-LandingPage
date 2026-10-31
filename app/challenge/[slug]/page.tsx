import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import ChallengeDetail from "@/components/challenge/ChallengeDetail";
import { ALL_CHALLENGES, getChallengeBySlug } from "@/lib/challengesData";

export function generateStaticParams() {
  return ALL_CHALLENGES.map((challenge) => ({ slug: challenge.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);
  if (!challenge) return { title: "Challenge not found" };
  return buildMetadata({
    title: challenge.title,
    description: challenge.tagline,
    path: `/challenge/${challenge.slug}`,
  });
}

export default async function ChallengeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);
  if (!challenge) notFound();
  return <ChallengeDetail challenge={challenge} />;
}

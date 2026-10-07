import { notFound } from "next/navigation";
import ChallengeDetail from "@/components/challenge/ChallengeDetail";
import { ALL_CHALLENGES, getChallengeBySlug } from "@/lib/challengesData";

export function generateStaticParams() {
  return ALL_CHALLENGES.map((challenge) => ({ slug: challenge.slug }));
}

export default async function ChallengeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);
  if (!challenge) notFound();
  return <ChallengeDetail challenge={challenge} />;
}

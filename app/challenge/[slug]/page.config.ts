import { ALL_CHALLENGES } from "@/lib/challengesData";

export function generateStaticParams() {
  return ALL_CHALLENGES.map((challenge) => ({
    slug: challenge.slug,
  }));
}

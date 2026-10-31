import type { Metadata } from "next";

/**
 * Next.js merges metadata shallowly: a page that sets `openGraph` or `twitter`
 * replaces the root layout's whole object. This helper re-applies the shared
 * fields (site name, locale, card type, X handle) so every page stays complete.
 */
export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string; // short title, the root template appends "| UniLife (Nigeria)"
  description: string;
  path: string; // e.g. "/faq"
  noindex?: boolean;
}): Metadata {
  const fullTitle = `${title} | UniLife`;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: "UniLife",
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@unilife_connect",
      creator: "@unilife_connect",
      title: fullTitle,
      description,
    },
  };
}

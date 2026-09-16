// Add this component to your root layout (app/layout.tsx), rendered once
// inside <body> (or <head> via next/head). It does not render any visible
// UI — it's a <script type="application/ld+json"> block Google reads.

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://unilife.com.ng/#organization",
        name: "UniLife",
        url: "https://unilife.com.ng",
        logo: "https://unilife.com.ng/icon.png",
        sameAs: [
          "https://www.instagram.com/unilife_connect",
          "https://x.com/unilife_connect",
          "https://www.tiktok.com/@unilifeconnect",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://unilife.com.ng/#website",
        url: "https://unilife.com.ng",
        name: "UniLife",
        publisher: { "@id": "https://unilife.com.ng/#organization" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
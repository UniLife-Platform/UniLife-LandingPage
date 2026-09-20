// Structured Data script for Googlebot & Schema.org validators
export default function StructuredData() {
  const BASE_URL = "https://unilife.com.ng";
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "UniLife",
        alternateName: ["UniLife Nigeria", "UniLife Campus Network"],
        url: BASE_URL,
        logo: `${BASE_URL}/icon.png`,
        description:
          "Nigeria's premier university student super-app, connecting campus communities, student marketplace, challenges, and verified scholarships.",
        foundingLocation: {
          "@type": "Place",
          name: "Nigeria",
        },
        sameAs: [
          "https://www.instagram.com/unilife_connect",
          "https://x.com/unilife_connect",
          "https://www.tiktok.com/@unilifeconnect?_r=1&_t=ZS-992NpLGLfAC",
          "https://chat.whatsapp.com/I4DTryVfFCPDMqyceqxcQl",
          "https://wa.me/2348164670694",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "UniLife (Nigeria)",
        alternateName: ["UniLife", "UniLife App", "UniLife Nigeria"],
        publisher: { "@id": `${BASE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/scholarships?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      id="schema-org-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

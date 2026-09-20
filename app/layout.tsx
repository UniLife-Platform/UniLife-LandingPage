import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { CookieProvider } from "@/components/CookieContext";
import CookieConsentSystem from "@/components/CookieConsentSystem";

const BASE_URL = "https://unilife.com.ng";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "UniLife (Nigeria) – The All-in-One Campus Super-App",
    template: "%s | UniLife (Nigeria)",
  },
  description:
    "Discover UniLife (Nigeria): verified student scholarships, campus innovation challenges, student marketplace, hostel accommodation, and university peer communities.",
  keywords: [
    "UniLife",
    "UniLife Nigeria",
    "Nigerian university students",
    "Nigerian scholarships 2026",
    "OOU challenge",
    "campus marketplace Nigeria",
    "hostel accommodation students",
    "student tuition grants",
    "campus community app",
  ],
  authors: [{ name: "UniLife Team", url: BASE_URL }],
  creator: "UniLife",
  publisher: "UniLife Nigeria",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "UniLife (Nigeria) – The All-in-One Campus Super-App",
    description:
      "Discover UniLife (Nigeria): verified student scholarships, campus innovation challenges, student marketplace, hostel accommodation, and university peer communities.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "UniLife Nigeria Super-App",
      },
    ],
    url: BASE_URL,
    type: "website",
    siteName: "UniLife",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniLife (Nigeria) – The All-in-One Campus Super-App",
    description:
      "Discover UniLife (Nigeria): verified student scholarships, campus innovation challenges, student marketplace, hostel accommodation, and university peer communities.",
    images: ["/icon.png"],
    creator: "@unilife_connect",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

const jsonLd = {
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
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+2348164670694",
          contactType: "customer support",
          areaServed: "NG",
          availableLanguage: ["English"],
        },
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
    {
      "@type": "ItemList",
      "@id": `${BASE_URL}/#sitelinks`,
      name: "UniLife Main Sections",
      description: "Official sitelinks for UniLife Nigeria campus portal",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Scholarships & Opportunities",
          description:
            "Browse verified student scholarships, tuition grants, and financial sponsorships across Nigerian universities.",
          url: `${BASE_URL}/scholarships`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "University Challenges & Innovation",
          description:
            "Participate in the OOU Innovation Challenge or join the Industry Advisory Board to mentor students.",
          url: `${BASE_URL}/challenge`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Campus Marketplace & Sellers",
          description:
            "Buy and sell campus gadgets, textbooks, hostels, and student services safely with zero commission.",
          url: `${BASE_URL}/sellers`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "For Students & Campus Life",
          description:
            "Connect with your department, find study buddies, explore past questions, and climb the campus leaderboard.",
          url: `${BASE_URL}/students`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "Frequently Asked Questions (FAQ)",
          description:
            "Find instant answers regarding student verification, scholarships, account safety, and campus features.",
          url: `${BASE_URL}/faq`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 6,
          name: "Cookie & Tracking Settings",
          description:
            "Manage your privacy choices, data protection, and NDPR compliance preferences.",
          url: `${BASE_URL}/cookies`,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CookieProvider>
          <CustomCursor />
          <script
            id="schema-org-jsonld"
            key="schema-org-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
          <CookieConsentSystem />
        </CookieProvider>
      </body>
    </html>
  );
}

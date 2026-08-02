import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://unilife.com.ng";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "UniLife | Your Campus. Connected.",
  description:
    "Connect with your department, find study buddies, explore the student marketplace, and dominate the campus leaderboard. Jump in!",
  openGraph: {
    title: "UniLife | The Ultimate Campus Network",
    description:
      "Connect with your department, find study buddies, and dominate the campus leaderboard. Jump in!",
    images: ["/app_icon.png"],
    url: BASE_URL,
    type: "website",
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
      name: "UniLife",
      url: BASE_URL,
      logo: `${BASE_URL}/icon.png`,
      sameAs: ["https://wa.me/2348164670694"],
    },
    {
      "@type": "WebSite",
      name: "UniLife",
      url: BASE_URL,
    },
    {
      "@type": "SiteNavigationElement",
      name: [
        "Home",
        "Students",
        "Sellers",
        "Partners",
        "Pricing",
        "About",
        "Team",
      ],
      url: [
        BASE_URL,
        `${BASE_URL}/students`,
        `${BASE_URL}/sellers`,
        `${BASE_URL}/partners`,
        `${BASE_URL}/pricing`,
        `${BASE_URL}/about`,
        `${BASE_URL}/team`,
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

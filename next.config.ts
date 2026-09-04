import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Preserves the old app.unilife.com.ng entry point once this
        // Next.js site takes over the root domain — visitors get
        // bounced straight to the app's new permanent home instead
        // of hitting a 404.
        source: "/app",
        destination: "https://app.unilife.com.ng",
        permanent: true,
      },
      {
        source: "/app/:path*",
        destination: "https://app.unilife.com.ng/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

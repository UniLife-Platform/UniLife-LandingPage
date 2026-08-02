import type { Metadata } from "next";
import "@/components/referral/referral.css";
import ScrollProgress from "@/components/referral/ScrollProgress";

export const metadata: Metadata = {
  title: "UniLife Referral Challenge",
  description:
    "One referral link. Nine milestones. A cash prize pool that grows every time a real, verified student joins UniLife.",
  // Not launched yet — keep this out of search results even if deployed early.
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="referral-root">
      <ScrollProgress />
      <div className="grain"></div>
      <div className="mesh">
        <span className="blob b1"></span>
        <span className="blob b2"></span>
        <span className="blob b3"></span>
      </div>
      {children}
    </div>
  );
}

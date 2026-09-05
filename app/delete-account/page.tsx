"use client";

import Link from "next/link";
import LegalLayout, { Section, List } from "@/components/LegalLayout";

export default function DeleteAccountContent() {
  return (
    <LegalLayout
      active="/delete-account"
      kicker="Your data, your control"
      title="Account Deletion Request"
      intro="At UniLife, you have full control over your data. If you wish to permanently delete your account and all associated information, here is how to do it."
      effectiveDate="September 5, 2026"
      lastUpdated="September 5, 2026"
      heroImage="https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1600"
      heroImageAlt="Student using a smartphone in a campus setting"
      badge={{ label: "Applies to", value: "All registered UniLife users" }}
      ctaTitle="Having trouble?"
      ctaBody="If you cannot access your registered email, contact support and we will help you verify your identity."
    >
      <div className="mb-10">
        <h3 className="font-bold text-[0.95rem] text-[#14151A] mb-2">Leaving UniLife</h3>
        <p className="text-[#46473f] text-[0.98rem] leading-relaxed">
          We believe in giving you complete ownership of your digital footprint. When you request to delete your account, we wipe your data from our active databases. Please read below to understand exactly what is removed and how the process works.
        </p>
      </div>

      <Section number="01" title="How to request deletion">
        <p>
          Currently, account deletions are handled via a verified email request to ensure the security of your data.
        </p>
        <List
          items={[
            <span>Send an email to <a href="mailto:support@unilife.com.ng" className="text-[#14151A] underline decoration-[#FFD23F] decoration-2 underline-offset-2 font-semibold">support@unilife.com.ng</a>.</span>,
            "You MUST send the email from the exact address registered to your UniLife account.",
            "Use the subject line: Account Deletion Request.",
          ]}
        />
      </Section>

      <Section number="02" title="What gets deleted?">
        <p>When your account is processed for deletion, the following data is permanently erased:</p>
        <List
          items={[
            "Your profile data (Name, Username, Avatar, University, Department).",
            "All posts, polls, and media you have shared on the Campus Feed.",
            "Your UniShop/Campus Marketplace shop and all active listings.",
            "Your Student Points (SP) balance and earned badges.",
          ]}
        />
        <p className="mt-4">
          <em>Note: Messages you have sent to other users may remain visible in their inboxes, but your account name and avatar will be replaced with a generic "Deleted User" state.</em>
        </p>
      </Section>

      <Section number="03" title="Processing time">
        <p>
          Once we verify your request, your account and associated data will be permanently deleted within 7 days. 
        </p>
        <p className="font-bold text-[#14151A] mt-2">
          This action is completely irreversible. We cannot recover your account, SP balance, or posts once the deletion is processed.
        </p>
      </Section>

    </LegalLayout>
  );
}
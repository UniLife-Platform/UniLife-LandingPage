"use client";

import Link from "next/link";
import LegalLayout, { Section, List } from "@/components/LegalLayout";

export default function ChildSafetyContent() {
  return (
    <LegalLayout
      active="/child-safety"
      kicker="Protecting our community"
      title="Child Safety Standards"
      intro="UniLife's commitment and strict standards against child sexual abuse and exploitation (CSAE)."
      effectiveDate="September 5, 2026"
      lastUpdated="September 5, 2026"
      heroImage="https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg?auto=compress&cs=tinysrgb&w=1600"
      heroImageAlt="Group of diverse people forming a supportive circle"
      badge={{ label: "Enforced by", value: "UniLife Trust & Safety Team and Global Law Enforcement" }}
      ctaTitle="Report a severe violation?"
      ctaBody="Use the in-app reporting tools immediately, or contact our designated safety lead below."
    >
      <div className="mb-10">
        <h3 className="font-bold text-[0.95rem] text-[#14151A] mb-2">Our commitment</h3>
        <p className="text-[#46473f] text-[0.98rem] leading-relaxed">
          While UniLife is an app built for university students (16+), we maintain a strict, absolute zero-tolerance policy against any form of Child Sexual Abuse and Exploitation (CSAE) and Child Sexual Abuse Material (CSAM).
        </p>
      </div>

      <Section number="01" title="Zero-tolerance policy">
        <p>
          Any form of child endangerment, sexualization, solicitation, grooming, or sharing of non-consensual exploitative media is strictly prohibited on our platform. Accounts found violating this policy are not simply banned; they are documented and reported to the relevant authorities.
        </p>
      </Section>

      <Section number="02" title="Prohibited activities">
        <p>Users are strictly forbidden from engaging in:</p>
        <List
          items={[
            "Publishing, sharing, or requesting explicit or exploitative imagery involving minors.",
            "Attempting to groom, manipulate, or sexually solicit individuals under the legal age of majority.",
            "Promoting or sharing links to third-party services that host or facilitate CSAE or CSAM content.",
          ]}
        />
      </Section>

      <Section number="03" title="In-app reporting & enforcement">
        <p>
          UniLife provides built-in reporting mechanisms throughout the application. Users can report any feed post, comment, message, or profile directly through the action menu. 
        </p>
        <p className="mt-4 mb-2">Upon receiving a safety report, our team takes immediate action:</p>
        <List
          items={[
            "Immediate suspension and permanent termination of the offending account.",
            "Permanent removal of all associated media and content from our servers.",
            "Hardware and device-level bans to prevent re-registration.",
          ]}
        />
      </Section>

      <Section number="04" title="Cooperation with global authorities">
        <p>
          UniLife complies with national and international child protection laws. Whenever CSAM or child exploitation is identified, we preserve digital records and proactively report incidents to relevant law enforcement agencies and international organizations, including the National Center for Missing & Exploited Children (NCMEC) and local police authorities.
        </p>
      </Section>

      <Section number="05" title="Designated Child Safety Point of Contact">
        <p>
          For urgent child safety concerns, law enforcement inquiries, or regulatory compliance questions, reach our designated child safety lead directly at:
        </p>
        <p className="mt-4">
          <a
            className="text-[#14151A] underline decoration-[#FFD23F] decoration-2 underline-offset-2 font-semibold"
            href="mailto:support@unilife.com.ng"
          >
            support@unilife.com.ng
          </a>
        </p>
      </Section>
    </LegalLayout>
  );
}
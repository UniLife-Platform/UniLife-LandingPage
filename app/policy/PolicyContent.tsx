"use client";

import Link from "next/link";
import LegalLayout, { Section, Sub, List } from "@/components/LegalLayout";

export default function PolicyContent() {
  return (
    <LegalLayout
      active="/policy"
      kicker="Your data, your rules"
      title="Privacy Policy"
      intro="We built UniLife for students, not advertisers. Here's exactly what we collect, why, and how you stay in control of it."
      effectiveDate="January 7, 2026"
      lastUpdated="January 7, 2026"
      heroImage="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600"
      heroImageAlt="Laptop with a security lock overlay, representing data protection"
      badge={{ label: "We never", value: "Sell, rent, or trade your personal data" }}
      ctaTitle="Want your data deleted?"
      ctaBody="You can request access, correction, or deletion of your data any time — no lengthy back-and-forth required."
    >
      <div className="mb-10">
        <h3 className="font-bold text-[0.95rem] text-[#14151A] mb-2">Welcome to UniLife</h3>
        <p className="text-[#46473f] text-[0.98rem] leading-relaxed">
          At UniLife, we are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your
          data when you use our mobile application and services. By using
          UniLife, you agree to the collection and use of information in
          accordance with this policy.
        </p>
      </div>

      <Section number="01" title="Information we collect">
        <Sub title="Personal information">
          <p>
            When you create an account or use UniLife, we may collect the
            following:
          </p>
          <List
            items={[
              "Full name and username",
              "Email address",
              "Phone number (for verification and contact syncing)",
              "University affiliation, faculty, and department",
              "Profile picture (optional)",
              "Academic year and course information",
            ]}
          />
        </Sub>
        <Sub title="Usage information">
          <p>We automatically collect information about how you interact with UniLife:</p>
          <List
            items={[
              "Device information (model, operating system, unique identifiers)",
              "IP address and general location data",
              "App usage patterns and feature interactions",
              "Crash reports and performance data",
            ]}
          />
        </Sub>
        <Sub title="Content you create">
          <p>When you use UniLife features, we collect the content you create and share:</p>
          <List
            items={[
              "Posts, comments, and messages",
              "Study materials (PDFs, documents, notes)",
              "Quiz responses and academic content",
              "Photos and media files you upload",
            ]}
          />
        </Sub>
      </Section>

      <Section number="02" title="How we use your information">
        <List
          items={[
            "To provide, maintain, and improve UniLife services",
            "To create and manage your account",
            "To facilitate connections with other students at your university",
            "To personalise your campus experience based on your faculty and interests",
            "To enable sharing of academic resources and study materials",
            "To send important notifications about your account and app updates",
            "To analyse usage patterns and improve app functionality",
            "To ensure platform security and prevent fraud or abuse",
            "To respond to your support requests and communications",
            "To comply with legal obligations and enforce our Terms of Service",
          ]}
        />
      </Section>

      <Section number="03" title="Information sharing and disclosure">
        <Sub title="What we DON'T do">
          <p>
            UniLife does not sell, rent, or trade your personal information
            to third parties for marketing purposes.
          </p>
        </Sub>
        <Sub title="Public content">
          <p>
            Content you choose to share publicly on UniLife (posts, study
            materials, profile information) is visible to other users within
            your university community, including:
          </p>
          <List
            items={[
              "Public profile information (name, faculty, department)",
              "Study materials you upload and mark as shareable",
              "Posts and comments on public forums",
              "Quiz contributions and academic resources",
            ]}
          />
        </Sub>
        <Sub title="Service providers">
          <p>
            We may share information with trusted third-party service
            providers who help us operate UniLife:
          </p>
          <List
            items={[
              "Supabase (database and authentication services)",
              "Cloud storage providers for file hosting",
              "Analytics services to understand app usage",
              "Communication services for notifications",
            ]}
          />
          <p>
            These providers are contractually obligated to protect your data
            and use it only for the services they provide to us.
          </p>
        </Sub>
        <Sub title="Legal requirements">
          <p>
            We may disclose your information if required by law, court
            order, or government request, or if necessary to:
          </p>
          <List
            items={[
              "Protect the rights and safety of UniLife users",
              "Investigate potential violations of our Terms of Service",
              "Prevent fraud or security threats",
            ]}
          />
        </Sub>
        <Sub title="Account deletion">
          <p>
            When you delete your account, your profile and personal
            information are permanently removed. However, content
            you&apos;ve shared (study materials, posts) may remain in an
            anonymised form to preserve the community knowledge base.
          </p>
        </Sub>
      </Section>

      <Section number="04" title="Data security">
        <p>We take the security of your personal information seriously and implement industry-standard security measures:</p>
        <List
          items={[
            "End-to-end encryption for sensitive data transmission",
            "Secure authentication via Supabase with encrypted password storage",
            "Regular security audits and vulnerability assessments",
            "Access controls limiting employee access to user data",
            "Encrypted storage for private messages and personal information",
            "Secure servers with firewalls and intrusion detection",
          ]}
        />
        <p>
          However, no method of transmission over the internet is 100%
          secure. While we strive to protect your information, we cannot
          guarantee absolute security. You are responsible for maintaining
          the confidentiality of your account credentials.
        </p>
      </Section>

      <Section number="05" title="Data retention">
        <p>
          We retain your personal information for as long as necessary to
          provide our services and fulfil the purposes outlined in this
          Privacy Policy:
        </p>
        <List
          items={[
            "Active account data: retained while your account is active",
            "Deleted account data: personal information removed within 30 days",
            "Shared content: may be retained in anonymised form after account deletion",
            "Legal compliance: data may be retained longer if required by law",
            "Backup systems: data in backups is deleted according to our backup retention schedule",
          ]}
        />
        <p>
          You can request deletion of your data at any time through the app
          settings or by contacting us directly.
        </p>
      </Section>

      <Section number="06" title="Your rights and choices">
        <List
          items={[
            <span key="access"><b>Access and portability:</b> you can access and download your personal data at any time through the app settings.</span>,
            <span key="correction"><b>Correction:</b> you can update or correct your profile information directly in the app.</span>,
            <span key="deletion"><b>Deletion:</b> you can delete your account and personal information at any time via Settings &gt; Account &gt; Delete Account.</span>,
            <span key="optout"><b>Opt-out:</b> you can opt out of non-essential notifications and marketing communications in the app settings.</span>,
            <span key="restriction"><b>Data restriction:</b> you can request that we limit how we use your data by contacting us.</span>,
            <span key="consent"><b>Withdraw consent:</b> where we rely on your consent, you can withdraw it at any time through app settings.</span>,
          ]}
        />
        <p>
          To exercise these rights, contact us at{" "}
          <a
            className="text-[#14151A] underline decoration-[#FFD23F] decoration-2 underline-offset-2 font-semibold"
            href="mailto:unilife.edu.org@gmail.com"
          >
            unilife.edu.org@gmail.com
          </a>{" "}
          or use the in-app settings.
        </p>
      </Section>

      <Section number="07" title="Children's privacy">
        <p>
          UniLife is designed for university students and is not intended
          for children under the age of 13. We do not knowingly collect
          personal information from children under 13.
        </p>
        <p>
          If we become aware that we have collected personal information
          from a child under 13 without parental consent, we will take steps
          to delete that information as quickly as possible. If you believe
          we may have collected information from a child under 13, please
          contact us immediately.
        </p>
      </Section>

      <Section number="08" title="Changes to this Privacy Policy">
        <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make significant changes, we will:</p>
        <List
          items={[
            "Update the 'Last Updated' date at the top of this policy",
            "Notify you through the app or via email",
            "Request your consent if required by law",
          ]}
        />
        <p>
          We encourage you to review this Privacy Policy periodically. Your
          continued use of UniLife after changes are posted constitutes
          acceptance of the updated policy.
        </p>
      </Section>

      <Section number="09" title="Contact us">
        <p>
          If you have questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please{" "}
          <Link
            href="/contact"
            className="text-[#14151A] underline decoration-[#FFD23F] decoration-2 underline-offset-2 font-semibold"
          >
            contact us
          </Link>
          .
        </p>
      </Section>

      <Section number="10" title="International users">
        <p>
          UniLife is operated from Nigeria and is designed primarily for
          university students. If you are accessing the app from outside
          Nigeria, please be aware that your information may be transferred
          to, stored, and processed in Nigeria or other countries where our
          service providers operate.
        </p>
        <p>
          By using UniLife, you consent to the transfer of your information
          to countries that may have different data protection laws than
          your country of residence.
        </p>
      </Section>

      <Section number="11" title="Cookies and tracking">
        <p>UniLife uses cookies and similar tracking technologies to enhance your experience and analyse app usage:</p>
        <List
          items={[
            "Essential cookies: required for basic app functionality and security",
            "Performance cookies: help us understand how users interact with the app",
            "Functional cookies: remember your preferences and settings",
            "Analytics: track usage patterns to improve our services",
          ]}
        />
        <p>
          You can manage cookie preferences through your device settings.
          Note that disabling certain cookies may limit some app features.
        </p>
      </Section>
    </LegalLayout>
  );
}
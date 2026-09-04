"use client";

import Link from "next/link";
import LegalLayout, { Section, Sub, List } from "@/components/LegalLayout";

export default function TermsContent() {
  return (
    <LegalLayout
      active="/terms"
      kicker="The fine print"
      title="Terms of Service"
      intro="The short version: be real, be respectful, and don't scam anyone. Here's the full version, in plain language."
      effectiveDate="January 7, 2026"
      lastUpdated="January 7, 2026"
      heroImage="https://images.pexels.com/photos/5989942/pexels-photo-5989942.jpeg?auto=compress&cs=tinysrgb&w=1600"
      heroImageAlt="Student reviewing an agreement on a laptop"
      badge={{ label: "Applies to", value: "Every student, seller, and visitor using UniLife" }}
      ctaTitle="Questions about the rules?"
      ctaBody="If anything here is unclear, ask us directly — we'd rather explain it than have you guess."
    >
      <div className="mb-10">
        <h3 className="font-bold text-[0.95rem] text-[#14151A] mb-2">Welcome to UniLife</h3>
        <p className="text-[#46473f] text-[0.98rem] leading-relaxed">
          These Terms of Service (&quot;Terms&quot;) govern your access to and
          use of the UniLife mobile application and related services
          (&quot;UniLife,&quot; &quot;we,&quot; &quot;us&quot;). By creating an
          account or using UniLife, you agree to be bound by these Terms. If
          you don&apos;t agree, please don&apos;t use the app.
        </p>
      </div>

      <Section number="01" title="Eligibility">
        <p>UniLife is built for university students. To use it, you must:</p>
        <List
          items={[
            "Be at least 16 years old.",
            "Be currently enrolled at, or affiliated with, a recognised university or higher-education institution.",
            "Provide accurate information when verifying your student status.",
            "Not be previously banned or removed from UniLife for violating these Terms.",
          ]}
        />
        <p>
          We may ask for proof of enrolment (a student ID, matric number, or
          school email) to verify your account. Accounts that can&apos;t be
          verified may be limited or suspended.
        </p>
      </Section>

      <Section number="02" title="Your account">
        <p>
          You&apos;re responsible for the activity on your account and for
          keeping your login credentials secure.
        </p>
        <List
          items={[
            "One account per person. Impersonating another student or creating duplicate accounts is not allowed.",
            "Your profile information (name, faculty, department) should be accurate — it's how other verified students know they're talking to a real classmate.",
            "You must notify us promptly if you suspect unauthorised access to your account.",
            "We may suspend or terminate accounts that violate these Terms, including fake profiles and impersonation.",
          ]}
        />
      </Section>

      <Section number="03" title="Status Points (SP)">
        <p>
          SP is UniLife&apos;s in-app engagement currency, earned through
          activities like daily logins, study contributions, and referrals.
        </p>
        <List
          items={[
            "SP is not real money and has no cash value outside the app. It cannot be withdrawn, transferred for cash, or exchanged between users.",
            "SP can be spent on in-app perks — themes, listing boosts, and upgrades — at the rates shown in the app.",
            "We may adjust how SP is earned, spent, or valued at any time, including balances, to keep the system fair and sustainable.",
            "SP earned through fraudulent activity (fake accounts, referral abuse, bot activity) may be removed, and the associated account suspended.",
          ]}
        />
      </Section>

      <Section number="04" title="UniShop & the marketplace">
        <p>
          UniShop lets verified students buy and sell directly with each
          other. UniLife is a platform that connects buyers and sellers — we
          are not a party to the transactions themselves.
        </p>
        <Sub title="If you're selling">
          <List
            items={[
              "List only items you have the right to sell, and describe them honestly — condition, price, and availability.",
              "You are responsible for fulfilling orders, honouring the prices you list, and resolving issues with buyers directly and in good faith.",
              "Prohibited items (see Section 6) may not be listed under any circumstances.",
            ]}
          />
        </Sub>
        <Sub title="If you're buying">
          <List
            items={[
              "Verify what you're buying before paying, and use in-app messaging so there's a record of your agreement.",
              "UniLife does not guarantee the quality, safety, or legality of items listed by other students.",
              "Report suspicious sellers immediately — verified status can be revoked for confirmed scams.",
            ]}
          />
        </Sub>
      </Section>

      <Section number="05" title="Content you post">
        <p>
          You keep ownership of what you post — notes, past questions, posts,
          comments, and messages. By posting, you grant UniLife a licence to
          host, display, and distribute that content within the app so other
          students can use it.
        </p>
        <List
          items={[
            "Only upload material you have the right to share. Don't post copyrighted material you don't own or have permission to share.",
            "Study materials you mark as shareable become part of the community library for your course or department.",
            "We may remove content that violates these Terms without prior notice.",
          ]}
        />
      </Section>

      <Section number="06" title="Prohibited conduct">
        <p>The following are never allowed on UniLife:</p>
        <List
          items={[
            "Harassment, hate speech, threats, or bullying directed at any user.",
            "Scams, fraud, counterfeit goods, or knowingly misrepresenting an item for sale.",
            "Selling weapons, drugs, alcohol to minors, academic services that constitute cheating (e.g. paying someone to sit an exam), or any item illegal under Nigerian law.",
            "Impersonating another student, staff member, or organisation.",
            "Spamming, phishing, or attempting to access another user's account.",
            "Reverse-engineering, scraping, or interfering with UniLife's systems or security.",
          ]}
        />
        <p>
          Violating these rules can result in content removal, loss of SP,
          suspension, or permanent account termination, depending on
          severity.
        </p>
      </Section>

      <Section number="07" title="Intellectual property">
        <p>
          The UniLife name, logo, app design, and underlying software are
          owned by UniLife and protected by intellectual property law. You
          may not copy, modify, or distribute any part of the app or brand
          without our written permission.
        </p>
      </Section>

      <Section number="08" title="Disclaimers">
        <p>
          UniLife is provided &quot;as is.&quot; We work hard to keep it
          running smoothly, but we can&apos;t guarantee it will always be
          available, error-free, or perfectly secure. We are not responsible
          for disputes between users, the quality or legality of
          marketplace items, or losses arising from your use of the app.
        </p>
      </Section>

      <Section number="09" title="Termination">
        <p>
          You may delete your account at any time from Settings. We may
          suspend or terminate your access if you violate these Terms, pose a
          risk to other users, or if required by law. Sections that by their
          nature should survive termination (like intellectual property and
          disclaimers) will continue to apply.
        </p>
      </Section>

      <Section number="10" title="Changes to these Terms">
        <p>
          We may update these Terms as UniLife grows. When we make material
          changes, we&apos;ll update the &quot;Last Updated&quot; date and
          notify you in the app. Continuing to use UniLife after changes take
          effect means you accept the updated Terms.
        </p>
      </Section>

      <Section number="11" title="Governing law">
        <p>
          These Terms are governed by the laws of the Federal Republic of
          Nigeria. Any disputes will be handled in accordance with Nigerian
          law.
        </p>
      </Section>

      <Section number="12" title="Contact us">
        <p>
          Questions about these Terms? Reach out any time at{" "}
          <a
            className="text-[#14151A] underline decoration-[#FFD23F] decoration-2 underline-offset-2 font-semibold"
            href="mailto:unilife.edu.org@gmail.com"
          >
            unilife.edu.org@gmail.com
          </a>{" "}
          or visit our{" "}
          <Link
            href="/contact"
            className="text-[#14151A] underline decoration-[#FFD23F] decoration-2 underline-offset-2 font-semibold"
          >
            Contact page
          </Link>
          .
        </p>
      </Section>
    </LegalLayout>
  );
}
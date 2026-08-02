import type { Metadata } from "next";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { AlertBox } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Use | UniLife",
  description: "The rules and agreements governing your use of UniLife.",
};

export default function TermsPage() {
  return (
    <>
      <Ticker />
      <Nav />

      <main className="doc-wrapper">
        <div className="doc-header">
          <h1>Terms of Use</h1>
          <div className="last-updated">
            Effective Date: January 7, 2026
            <br />
            Last Updated: January 7, 2026
          </div>
        </div>

        <div className="doc-intro">
          <h3>Important legal agreement</h3>
          <p style={{ marginBottom: 0 }}>
            By accessing or using UniLife, you agree to be bound by these
            Terms of Use and our Privacy Policy. Please read these terms
            carefully before using our services. If you do not agree to these
            terms, you must not use UniLife.
          </p>
        </div>

        <div className="doc-body">
          <h2>1. Acceptance of terms</h2>
          <p>
            By creating an account, accessing, or using UniLife in any way,
            you acknowledge that you have read, understood, and agree to be
            bound by these Terms of Use and all applicable laws and
            regulations. Your continued use of UniLife constitutes acceptance
            of any updates or modifications to these terms.
          </p>

          <h2>2. User accounts and eligibility</h2>
          <h3>Eligibility</h3>
          <p>
            You must be at least 13 years old and currently enrolled in or
            affiliated with a university to use UniLife. By creating an
            account, you confirm that you meet these requirements.
          </p>

          <h3>Account security</h3>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials. Any activity conducted through your account
            is your responsibility.
          </p>
          <ul>
            <li>Do not share your password with others</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Use a strong, unique password</li>
            <li>You are liable for all activities under your account</li>
          </ul>

          <h2>3. Academic integrity</h2>
          <p>
            UniLife is committed to promoting academic integrity and
            supporting legitimate educational activities.
          </p>

          <h3>Users MUST:</h3>
          <ul>
            <li>
              Upload only legitimate study materials (notes, summaries,
              guides)
            </li>
            <li>Ensure all shared content is accurate and helpful</li>
            <li>Respect intellectual property rights</li>
            <li>Credit original authors when appropriate</li>
          </ul>

          <AlertBox>
            <h3>Users MUST NOT:</h3>
            <ul>
              <li>Share leaked exam papers or answer keys</li>
              <li>Upload copyrighted materials without permission</li>
              <li>Facilitate cheating or academic dishonesty</li>
              <li>Share current semester assignments or projects</li>
            </ul>
            <p style={{ marginTop: 12, fontWeight: "bold" }}>
              Violations will result in immediate account suspension or
              permanent ban.
            </p>
          </AlertBox>

          <h2>4. Prohibited content and conduct</h2>
          <AlertBox>
            <h3>Zero tolerance policy</h3>
            <p>
              The following content and behaviors are strictly prohibited and
              will result in immediate and permanent account termination,
              with possible legal action:
            </p>
            <ul style={{ marginTop: 12 }}>
              <li>
                Pornographic, sexually explicit, or adult content of any kind
              </li>
              <li>Child sexual abuse material (CSAM) or exploitation content</li>
              <li>Non-consensual intimate images or revenge porn</li>
              <li>Sexual harassment, solicitation, or grooming</li>
              <li>
                Hate speech, racism, discrimination, or content promoting
                violence
              </li>
              <li>Threats, doxxing, or targeted harassment</li>
              <li>Spam, phishing, malware, or fraudulent schemes</li>
              <li>Sale or promotion of illegal drugs, weapons, or contraband</li>
              <li>Self-harm or suicide promotion content</li>
              <li>Impersonation or identity theft</li>
              <li>Copyright infringement or pirated materials</li>
            </ul>
          </AlertBox>
          <p>
            We actively monitor content and employ automated detection
            systems. Violations are taken extremely seriously and reported to
            appropriate authorities as required by law.
          </p>

          <h2>5. Respectful interaction</h2>
          <p>
            UniLife is a safe, inclusive space for all students. We expect
            all users to treat each other with respect and dignity.
          </p>
          <ul>
            <li>Be respectful in all communications</li>
            <li>No harassment, bullying, or threatening behavior</li>
            <li>No hate speech or discriminatory language</li>
            <li>Respect others&apos; privacy and boundaries</li>
            <li>Engage constructively in debates and discussions</li>
            <li>Report violations through the in-app reporting system</li>
          </ul>

          <h2>6. Marketplace guidelines</h2>
          <h3>Platform role</h3>
          <p>
            UniLife provides a platform for students to list and discover
            items for sale. We are NOT a party to any transactions and do not
            guarantee the quality, safety, or legality of items listed.
          </p>

          <h3>Safety guidelines:</h3>
          <ul>
            <li>Always meet in well-lit, public campus areas</li>
            <li>Inspect items thoroughly before payment</li>
            <li>Use secure payment methods (avoid wire transfers)</li>
            <li>Report suspicious or fraudulent listings immediately</li>
            <li>Never share sensitive personal or financial information</li>
          </ul>

          <AlertBox variant="warn">
            <h3>Disclaimer</h3>
            <p>
              UniLife is not responsible for disputes, losses, or damages
              arising from marketplace transactions.
            </p>
          </AlertBox>

          <h2>7. Intellectual property</h2>
          <p>
            All content, features, and functionality of UniLife (including
            but not limited to software, text, graphics, logos, and images)
            are owned by UniLife and protected by copyright, trademark, and
            other intellectual property laws.
          </p>
          <ul>
            <li>
              You may not copy, modify, or distribute UniLife&apos;s
              proprietary content
            </li>
            <li>You retain ownership of content you upload</li>
            <li>
              By uploading, you grant UniLife a license to display and
              distribute your content
            </li>
            <li>Respect others&apos; intellectual property rights</li>
          </ul>

          <h2>8. User content</h2>
          <p>
            When you post, upload, or share content on UniLife, you grant us
            a non-exclusive, worldwide, royalty-free license to use, display,
            reproduce, and distribute that content within the platform.
          </p>

          <h2>9. Privacy and data use</h2>
          <p>
            Your privacy is important to us. Our collection and use of
            personal information is governed by our{" "}
            <a href="/policy">Privacy Policy</a>, which is incorporated into
            these Terms of Use by reference. By using UniLife, you consent to
            our Privacy Policy and the processing of your data as described
            therein.
          </p>

          <h2>10. Enforcement and consequences</h2>
          <p>
            UniLife reserves the right to enforce these Terms of Use at our
            sole discretion. Enforcement actions may include issuing
            warnings, temporary suspension (1–90 days), permanent account
            termination, removing specific content, or reporting violations
            to law enforcement or university administration.
          </p>

          <h2>11. Account termination</h2>
          <h3>Your right to terminate</h3>
          <p>
            You may delete your account at any time through the app
            settings. Upon deletion, your personal information will be
            removed, but shared content may remain anonymized.
          </p>

          <h3>Our right to terminate</h3>
          <p>
            We reserve the right to suspend or terminate your account at any
            time for violations of these Terms of Use, with or without
            notice. Terminated accounts cannot be recovered, and you are
            prohibited from creating new accounts without our explicit
            permission.
          </p>

          <h2>12. Disclaimer of warranties</h2>
          <p>
            UniLife is provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without warranties of any kind, either express or
            implied. We do not guarantee uninterrupted or error-free service,
            nor do we warrant the accuracy or reliability of user-generated
            content.
          </p>

          <h2>13. Limitation of liability</h2>
          <AlertBox variant="warn">
            <p style={{ fontWeight: "bold" }}>
              To the maximum extent permitted by law, UniLife shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your access to or use of the
              platform. In no event shall UniLife&apos;s total liability to
              you for all claims exceed the amount of one hundred naira (₦100)
              or the minimum amount allowed by applicable law.
            </p>
          </AlertBox>

          <h2>14. Dispute resolution</h2>
          <p>
            These Terms of Use shall be governed by and construed in
            accordance with the laws of Nigeria. Before pursuing formal
            dispute resolution, we strongly encourage you to contact us first
            at{" "}
            <a href="mailto:unilife.edu.org@gmail.com">
              unilife.edu.org@gmail.com
            </a>
            .
          </p>
          <p>
            <strong>Class action waiver:</strong> you and UniLife agree that
            each may bring claims against the other only in your or its
            individual capacity, and not as a plaintiff or class member in
            any purported class or representative proceeding.
          </p>

          <h2>15. Changes to terms</h2>
          <p>
            We reserve the right to modify or replace these Terms of Use at
            any time at our sole discretion. Your continued use of UniLife
            following the posting of any changes to these Terms constitutes
            acceptance of those changes.
          </p>

          <h2>16. Contact information</h2>
          <p>
            If you have any questions about these Terms of Use, please{" "}
            <a href="/contact">contact us</a>.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

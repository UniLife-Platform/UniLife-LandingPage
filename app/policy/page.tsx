import type { Metadata } from "next";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | UniLife",
  description:
    "How UniLife collects, uses, and protects your personal information.",
};

export default function PolicyPage() {
  return (
    <>
      <Ticker />
      <Nav />

      <main className="doc-wrapper">
        <div className="doc-header">
          <h1>Privacy Policy</h1>
          <div className="last-updated">
            Effective Date: January 7, 2026
            <br />
            Last Updated: January 7, 2026
          </div>
        </div>

        <div className="doc-intro">
          <h3>Welcome to UniLife</h3>
          <p style={{ marginBottom: 0 }}>
            At UniLife, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            data when you use our mobile application and services. By using
            UniLife, you agree to the collection and use of information in
            accordance with this policy. Please read this document carefully.
          </p>
        </div>

        <div className="doc-body">
          <h2>1. Information we collect</h2>
          <h3>1.1 Personal information</h3>
          <p>
            When you create an account or use UniLife, we may collect the
            following personal information:
          </p>
          <ul>
            <li>Full name and username</li>
            <li>Email address</li>
            <li>Phone number (for verification and contact syncing)</li>
            <li>University affiliation, faculty, and department</li>
            <li>Profile picture (optional)</li>
            <li>Academic year and course information</li>
          </ul>

          <h3>1.2 Usage information</h3>
          <p>
            We automatically collect information about how you interact with
            UniLife:
          </p>
          <ul>
            <li>
              Device information (model, operating system, unique
              identifiers)
            </li>
            <li>IP address and general location data</li>
            <li>App usage patterns and feature interactions</li>
            <li>Crash reports and performance data</li>
          </ul>

          <h3>1.3 Content you create</h3>
          <p>
            When you use UniLife features, we collect the content you create
            and share:
          </p>
          <ul>
            <li>Posts, comments, and messages</li>
            <li>Study materials (PDFs, documents, notes)</li>
            <li>Quiz responses and academic content</li>
            <li>Photos and media files you upload</li>
          </ul>

          <h2>2. How we use your information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>To provide, maintain, and improve UniLife services</li>
            <li>To create and manage your account</li>
            <li>
              To facilitate connections with other students at your
              university
            </li>
            <li>
              To personalize your campus experience based on your faculty and
              interests
            </li>
            <li>
              To enable sharing of academic resources and study materials
            </li>
            <li>
              To send important notifications about your account and app
              updates
            </li>
            <li>To analyze usage patterns and improve app functionality</li>
            <li>To ensure platform security and prevent fraud or abuse</li>
            <li>To respond to your support requests and communications</li>
            <li>
              To comply with legal obligations and enforce our Terms of
              Service
            </li>
          </ul>

          <h2>3. Information sharing and disclosure</h2>
          <h3>3.1 What we DON&apos;T do</h3>
          <p>
            UniLife does not sell, rent, or trade your personal information
            to third parties for marketing purposes.
          </p>

          <h3>3.2 Public content</h3>
          <p>
            Content you choose to share publicly on UniLife (posts, study
            materials, profile information) is visible to other users within
            your university community. This includes:
          </p>
          <ul>
            <li>Public profile information (name, faculty, department)</li>
            <li>Study materials you upload and mark as shareable</li>
            <li>Posts and comments on public forums</li>
            <li>Quiz contributions and academic resources</li>
          </ul>

          <h3>3.3 Service providers</h3>
          <p>
            We may share information with trusted third-party service
            providers who help us operate UniLife:
          </p>
          <ul>
            <li>Supabase (database and authentication services)</li>
            <li>Cloud storage providers for file hosting</li>
            <li>Analytics services to understand app usage</li>
            <li>Communication services for notifications</li>
          </ul>
          <p>
            These providers are contractually obligated to protect your data
            and use it only for the services they provide to us.
          </p>

          <h3>3.4 Legal requirements</h3>
          <p>
            We may disclose your information if required by law, court
            order, or government request, or if necessary to:
          </p>
          <ul>
            <li>Protect the rights and safety of UniLife users</li>
            <li>Investigate potential violations of our Terms of Service</li>
            <li>Prevent fraud or security threats</li>
          </ul>

          <h3>3.5 Account deletion</h3>
          <p>
            When you delete your account, your profile and personal
            information are permanently removed. However, content
            you&apos;ve shared (study materials, posts) may remain in an
            anonymized form to preserve the community knowledge base.
          </p>

          <h2>4. Data security</h2>
          <p>
            We take the security of your personal information seriously and
            implement industry-standard security measures:
          </p>
          <ul>
            <li>End-to-end encryption for sensitive data transmission</li>
            <li>
              Secure authentication via Supabase with encrypted password
              storage
            </li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Access controls limiting employee access to user data</li>
            <li>
              Encrypted storage for private messages and personal information
            </li>
            <li>Secure servers with firewalls and intrusion detection</li>
          </ul>
          <p>
            However, no method of transmission over the internet is 100%
            secure. While we strive to protect your information, we cannot
            guarantee absolute security. You are responsible for maintaining
            the confidentiality of your account credentials.
          </p>

          <h2>5. Data retention</h2>
          <p>
            We retain your personal information for as long as necessary to
            provide our services and fulfill the purposes outlined in this
            Privacy Policy:
          </p>
          <ul>
            <li>Active account data: retained while your account is active</li>
            <li>
              Deleted account data: personal information removed within 30
              days
            </li>
            <li>
              Shared content: may be retained in anonymized form after
              account deletion
            </li>
            <li>
              Legal compliance: data may be retained longer if required by
              law
            </li>
            <li>
              Backup systems: data in backups is deleted according to our
              backup retention schedule
            </li>
          </ul>
          <p>
            You can request deletion of your data at any time through the app
            settings or by contacting us directly.
          </p>

          <h2>6. Your rights and choices</h2>
          <p>
            You have the following rights regarding your personal
            information:
          </p>
          <ul>
            <li>
              <strong>Access and portability:</strong> you can access and
              download your personal data at any time through the app
              settings.
            </li>
            <li>
              <strong>Correction:</strong> you can update or correct your
              profile information directly in the app.
            </li>
            <li>
              <strong>Deletion:</strong> you can delete your account and
              personal information at any time. Go to Settings &gt; Account
              &gt; Delete Account.
            </li>
            <li>
              <strong>Opt-out:</strong> you can opt out of non-essential
              notifications and marketing communications in the app
              settings.
            </li>
            <li>
              <strong>Data restriction:</strong> you can request that we
              limit how we use your data by contacting us.
            </li>
            <li>
              <strong>Withdraw consent:</strong> where we rely on your
              consent, you can withdraw it at any time through app settings.
            </li>
          </ul>
          <p>
            To exercise these rights, contact us at{" "}
            <a href="mailto:unilife.edu.org@gmail.com">
              unilife.edu.org@gmail.com
            </a>{" "}
            or use the in-app settings.
          </p>

          <h2>7. Children&apos;s privacy</h2>
          <p>
            UniLife is designed for university students and is not intended
            for children under the age of 13. We do not knowingly collect
            personal information from children under 13.
          </p>
          <p>
            If we become aware that we have collected personal information
            from a child under 13 without parental consent, we will take
            steps to delete that information as quickly as possible. If you
            believe we may have collected information from a child under 13,
            please contact us immediately.
          </p>

          <h2>8. Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for legal, operational, or
            regulatory reasons. When we make significant changes, we will:
          </p>
          <ul>
            <li>Update the &lsquo;Last Updated&rsquo; date at the top of this policy</li>
            <li>Notify you through the app or via email</li>
            <li>Request your consent if required by law</li>
          </ul>
          <p>
            We encourage you to review this Privacy Policy periodically. Your
            continued use of UniLife after changes are posted constitutes
            acceptance of the updated policy.
          </p>

          <h2>9. Contact us</h2>
          <p>
            If you have questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please{" "}
            <a href="/contact">contact us</a>.
          </p>

          <h2>10. International users</h2>
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

          <h2>11. Cookies and tracking</h2>
          <p>
            UniLife uses cookies and similar tracking technologies to enhance
            your experience and analyze app usage:
          </p>
          <ul>
            <li>
              Essential cookies: required for basic app functionality and
              security
            </li>
            <li>
              Performance cookies: help us understand how users interact with
              the app
            </li>
            <li>Functional cookies: remember your preferences and settings</li>
            <li>Analytics: track usage patterns to improve our services</li>
          </ul>
          <p>
            You can manage cookie preferences through your device settings.
            Note that disabling certain cookies may limit some app features.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

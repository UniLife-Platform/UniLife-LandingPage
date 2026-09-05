import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Child Safety Standards | UniLife',
  description: 'Our commitment and standards against child sexual abuse and exploitation (CSAE).',
};

export default function ChildSafetyPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0E1116] text-slate-800 dark:text-slate-200 py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-8">
          <Link 
            href="/"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
          >
            ← Back to UniLife
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Child Safety Standards
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Last Updated: September 2026 | Effective immediately
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-base leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              1. Zero-Tolerance Policy (CSAE / CSAM)
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              UniLife maintains a strict, zero-tolerance stance against Child Sexual Abuse and Exploitation (CSAE) and Child Sexual Abuse Material (CSAM). Any form of child endangerment, sexualization, solicitation, grooming, or sharing of non-consensual exploitative media is strictly prohibited on our platform.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              2. Prohibited Activities
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-2">
              Users are strictly forbidden from engaging in:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
              <li>Publishing, sharing, or requesting explicit or exploitative imagery involving minors.</li>
              <li>Attempting to groom, manipulate, or sexually solicit individuals under the legal age of majority.</li>
              <li>Promoting or sharing links to third-party services that host or facilitate CSAE or CSAM content.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              3. In-App Reporting & Enforcement
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              UniLife provides built-in reporting mechanisms throughout the application. Users can report any feed post, comment, message, or profile directly through the action menu. 
            </p>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Upon receiving a safety report, our team takes immediate action:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-slate-600 dark:text-slate-300">
              <li>Immediate suspension and permanent termination of the offending account.</li>
              <li>Permanent removal of all associated media and content from our servers.</li>
              <li>Hardware and device-level bans to prevent re-registration.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              4. Cooperation with Law Enforcement & Global Authorities
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              UniLife complies with national and international child protection laws. Whenever CSAM or child exploitation is identified, we preserve digital records and proactively report incidents to relevant law enforcement agencies and international organizations, including the National Center for Missing & Exploited Children (NCMEC) and local police authorities.
            </p>
          </section>

          {/* Section 5 - Designated Contact */}
          <section className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">
              5. Designated Child Safety Point of Contact
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-300/80 mb-3">
              For urgent child safety concerns, law enforcement inquiries, or regulatory compliance questions, reach our designated child safety lead directly:
            </p>
            <div className="text-sm font-mono text-blue-950 dark:text-blue-200">
              Email: <a href="mailto:kingharrisonariwodo@gmail.com" className="underline font-semibold">kingharrisonariwodo@gmail.com</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
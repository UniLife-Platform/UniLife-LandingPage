"use client";

import Link from "next/link";
import LegalLayout, { Section, Sub, List } from "@/components/LegalLayout";

export default function GuidelinesContent() {
  return (
    <LegalLayout
      active="/guidelines"
      kicker="The house rules"
      title="Community Guidelines"
      intro="UniLife works because it's real students talking to real students. These guidelines exist to keep it that way — read them once, then just be decent."
      effectiveDate="January 7, 2026"
      lastUpdated="January 7, 2026"
      heroImage="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1600"
      heroImageAlt="Students talking together on campus"
      badge={{ label: "Enforced by", value: "Community moderators, not bots — real review, every time" }}
      ctaTitle="See something off?"
      ctaBody="Report it in-app, or reach us directly — we'd rather hear about a problem twice than not at all."
    >
      <div className="mb-10">
        <h3 className="font-bold text-[0.95rem] text-[#14151A] mb-2">Why this exists</h3>
        <p className="text-[#46473f] text-[0.98rem] leading-relaxed">
          UniLife is a verified space — every account belongs to a real,
          enrolled student. That's what makes it safe to buy from a
          classmate, share your notes, or post honestly. These Community
          Guidelines explain what we expect from every member so that trust
          holds up. They work alongside our{" "}
          <Link href="/terms" className="text-[#14151A] underline decoration-[#FFD23F] decoration-2 underline-offset-2 font-semibold">
            Terms of Service
          </Link>{" "}
          — if the two ever conflict, the Terms take precedence.
        </p>
      </div>

      <Section number="01" title="Be who you say you are">
        <p>Verification is the foundation of everything else here.</p>
        <List
          items={[
            "Use your real name and real student details when verifying your account.",
            "One account per person — no duplicates, no accounts made on someone else's behalf.",
            "Don't impersonate another student, a lecturer, a department, or any organisation.",
            "Keep your profile information (faculty, department, year) accurate — other students rely on it.",
          ]}
        />
      </Section>

      <Section number="02" title="Treat people the way you'd want to be treated">
        <p>This is a campus community, not an anonymous forum. That means:</p>
        <List
          items={[
            "No harassment, bullying, threats, or targeted insults — in posts, comments, or DMs.",
            "No hate speech or discrimination based on tribe, religion, gender, disability, or any other personal characteristic.",
            "Disagree with someone's opinion? Fine. Attack the person, and it comes down.",
            "Sexual harassment or unwanted advances toward another student will result in an immediate suspension pending review.",
          ]}
        />
      </Section>

      <Section number="03" title="Buy and sell honestly">
        <p>UniShop only works if people can trust it.</p>
        <Sub title="If you're selling">
          <List
            items={[
              "Describe items accurately — condition, price, and whether it's actually in stock.",
              "Honour the price and availability you list. Don't bait-and-switch.",
              "Respond to buyers in reasonable time, and follow through on agreed sales.",
            ]}
          />
        </Sub>
        <Sub title="If you're buying">
          <List
            items={[
              "Use in-app messaging so there's a record if something goes wrong.",
              "Report a seller immediately if they scam you, ghost you, or misrepresent an item — don't wait.",
            ]}
          />
        </Sub>
        <p>
          Confirmed scams result in an immediate UniShop ban. Repeated
          disputes, even unconfirmed ones, may lead to a review of your
          seller status.
        </p>
      </Section>

      <Section number="04" title="Keep the Study Hub honest">
        <p>
          Sharing notes and past questions is one of the best things about
          UniLife — but it only stays useful if it stays honest.
        </p>
        <List
          items={[
            "Only upload material you have the right to share, and credit the original source where you can.",
            "Don't upload live exam questions, answers, or anything that facilitates cheating during an active assessment.",
            "Don't use the AI tutor to generate work you'll submit as your own for graded assignments — use it to understand the material, not replace doing it.",
            "Mislabelling or spam-uploading low-quality material to farm SP will have those points removed.",
          ]}
        />
      </Section>

      <Section number="05" title="What you post reflects on you">
        <List
          items={[
            "No nudity, sexual content, or graphic violence.",
            "No spam, scams, phishing links, or repetitive self-promotion outside of UniShop.",
            "No content that promotes illegal activity, self-harm, or dangerous behaviour.",
            "No sharing another student's private information (phone number, address, photos) without their consent.",
          ]}
        />
      </Section>

      <Section number="06" title="Reporting & how enforcement works">
        <p>
          Every post, listing, and profile can be reported directly in the
          app. Reports go to a real community moderator — not an automated
          filter — who reviews context before acting.
        </p>
        <List
          items={[
            <span key="warn"><b>First issue:</b> usually a warning and content removal, so you know what went wrong.</span>,
            <span key="repeat"><b>Repeated or serious issues:</b> temporary suspension from posting, selling, or messaging.</span>,
            <span key="severe"><b>Severe violations</b> (harassment, scams, impersonation, explicit content): immediate account suspension pending review.</span>,
          ]}
        />
        <p>
          If you think a decision was made in error, you can appeal by
          contacting us directly — every suspension has a real person
          reviewing it, not just an algorithm.
        </p>
      </Section>

      <Section number="07" title="Changes to these guidelines">
        <p>
          We'll update these guidelines as the community grows and new
          situations come up. Material changes will be reflected in the
          &quot;Last Updated&quot; date above and announced in the app.
        </p>
      </Section>

      <Section number="08" title="Questions">
        <p>
          Not sure if something crosses a line? Ask us before you post it —
          we'd rather help you get it right than clean up after the fact.
          Reach us at{" "}
          <a
            className="text-[#14151A] underline decoration-[#FFD23F] decoration-2 underline-offset-2 font-semibold"
            href="mailto:unilife.edu.org@gmail.com"
          >
            unilife.edu.org@gmail.com
          </a>{" "}
          or via our{" "}
          <Link href="/contact" className="text-[#14151A] underline decoration-[#FFD23F] decoration-2 underline-offset-2 font-semibold">
            Contact page
          </Link>
          .
        </p>
      </Section>
    </LegalLayout>
  );
}
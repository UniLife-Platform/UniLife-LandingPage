import type { Metadata } from "next";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Btn, CtaRow, InfoCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact | UniLife",
  description:
    "Get in touch with the UniLife team — students, sellers, and school bodies all welcome.",
};

export default function ContactPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Ticker />
      <Nav active="/contact" />

      <main className="split-wrap">
        <div className="info-grid">
          <div className="intro-block">
            <div className="kicker">Let&apos;s talk</div>
            <h1>Say hello.</h1>
            <p>
              Whether you&apos;re a student with feedback, a seller ready to
              open a storefront, or a school body ready to partner — we read
              everything.
            </p>
            <CtaRow>
              <Btn href="https://wa.me/2348164670694">
                Message on WhatsApp →
              </Btn>
              <Btn href="mailto:unilife.edu.org@gmail.com" variant="ghost">
                Email us
              </Btn>
            </CtaRow>
          </div>

          <InfoCard title="Harrison Ariwodo" role="Founder, UniLife">
            <a className="info-line" href="https://wa.me/2348164670694">
              <span className="dot"></span> WhatsApp — +234 816 467 0694
            </a>
            <a className="info-line" href="mailto:unilife.edu.org@gmail.com">
              <span className="dot"></span> Email — unilife.edu.org@gmail.com
            </a>
            <a className="info-line" href="https://unilife.com.ng">
              <span className="dot"></span> Website — unilife.com.ng
            </a>
            <div className="chip-row">
              <a className="course-tag" href="/students">
                I&apos;m a student
              </a>
              <a className="course-tag" href="/sellers">
                I want to sell
              </a>
              <a className="course-tag" href="/partners">
                I&apos;m a school body
              </a>
            </div>
          </InfoCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}

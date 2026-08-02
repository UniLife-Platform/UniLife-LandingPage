export default function ReferralFooter({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <footer className="site-footer">
        <p>UNILIFE · REFERRAL CHALLENGE 2026 · OLABISI ONABANJO UNIVERSITY</p>
      </footer>
    );
  }

  return (
    <footer className="big-footer" id="contact">
      <div className="foot-grid">
        <div className="foot-cta">
          <div className="kicker">LET&apos;S BUILD CAMPUS LIFE TOGETHER</div>
          <h2 className="display">
            Ready to
            <br />
            join the pot?
          </h2>
          <p>
            Funds are held in a dedicated account, kept fully separate from
            personal spending, with a full public ledger shared after the
            campaign. A one-page sponsorship/seed agreement is ready for
            anyone who wants to move forward.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="https://wa.me/2348164670694">
              Message on WhatsApp →
            </a>
            <a className="btn btn-ghost" href="mailto:unilife.edu.org@gmail.com">
              Email the founder
            </a>
          </div>
        </div>
        <div className="contact-card">
          <div className="name">Harrison Ariwodo</div>
          <div className="role">Founder, UniLife</div>
          <div className="contact-line">
            <span className="ic"></span> WhatsApp — +234 816 467 0694
          </div>
          <div className="contact-line">
            <span className="ic"></span> Email — unilife.edu.org@gmail.com
          </div>
          <div className="contact-line">
            <span className="ic"></span> Website — unilife.com.ng
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>UNILIFE · REFERRAL CHALLENGE 2026</span>
        <span>OLABISI ONABANJO UNIVERSITY</span>
      </div>
    </footer>
  );
}

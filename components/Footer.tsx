import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="foot-grid">
        <div className="foot-brand">
          <Link className="brand" href="/">
            <Image
              className="brand__mark"
              src="/icon.png"
              alt="UniLife logo"
              width={36}
              height={36}
            />
            <span>
              UNI<b>LIFE</b>
            </span>
          </Link>
          <p>
            The digital campus ecosystem for university students, everywhere.
            Built by students, for students.
          </p>
        </div>

        <div className="foot-col">
          <h5>Platform</h5>
          <ul>
            <li><Link href="/students">For students</Link></li>
            <li><Link href="/sellers">For sellers</Link></li>
            <li><Link href="/partners">For partners</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>

        <div className="foot-col">
          <h5>Company</h5>
          <ul>
            <li><Link href="/about">About &amp; vision</Link></li>
            <li><Link href="/team">Join the team</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/policy">Policy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>

        <div className="foot-col">
          <h5>Get in touch</h5>
          <ul>
            <li><a href="https://wa.me/2348164670694">💬 WhatsApp</a></li>
            <li><a href="mailto:unilife.edu.org@gmail.com">✉️ Email</a></li>
            <li><a href="https://unilife.com.ng/app">📲 Open the app</a></li>
          </ul>
        </div>
      </div>

      <div className="foot-bottom">
        <span>© 2026 UNILIFE — BUILT BY STUDENTS, FOR STUDENTS</span>
        <span>OPEN TO STUDENTS AT ANY UNIVERSITY</span>
      </div>
    </footer>
  );
}

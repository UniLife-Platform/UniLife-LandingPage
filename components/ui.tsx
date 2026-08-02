import { ReactNode } from "react";
import Link from "next/link";

/* ---------- Layout ---------- */

export function Section({
  id,
  children,
  style,
}: {
  id?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <section id={id} className="section" style={style}>
      <div className="section-inner">{children}</div>
    </section>
  );
}

export function SectionHead({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title?: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="section-head">
      <div className="kicker">{kicker}</div>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
    </div>
  );
}

export function PageHead({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="page-head">
      <div className="kicker">{kicker}</div>
      <h1>{title}</h1>
      {(description || children) && <p>{description ?? children}</p>}
    </header>
  );
}

export function Grid({
  cols,
  children,
  style,
}: {
  cols: 2 | 3 | 4 | "list";
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  const cls = cols === "list" ? "grid grid-list" : `grid grid-${cols}`;
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}

/* ---------- Buttons ---------- */

export function Btn({
  href,
  variant = "primary",
  children,
  style,
}: {
  href: string;
  variant?: "primary" | "ghost" | "dark";
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  const cls = `btn btn-${variant}`;
  const isInternal = href.startsWith("/");
  if (isInternal) {
    return (
      <Link className={cls} href={href} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <a className={cls} href={href} style={style}>
      {children}
    </a>
  );
}

export function CtaRow({ children }: { children: ReactNode }) {
  return <div className="cta-row">{children}</div>;
}

/* ---------- Cards ---------- */

export function Stub({
  code,
  emoji,
  title,
  raw,
  children,
}: {
  code?: string;
  emoji?: string;
  title: string;
  raw?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="stub">
      {code && <span className="stub__code">{code}</span>}
      {emoji && <span className="emoji-mark">{emoji}</span>}
      <h3>{title}</h3>
      {raw ? children : <p>{children}</p>}
    </div>
  );
}

export function SideCard({
  variant,
  title,
  children,
}: {
  variant: "problem" | "solution";
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={`side-card ${variant}`}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function Flyer({
  href,
  emoji,
  title,
  children,
  cta,
}: {
  href: string;
  emoji: string;
  title: string;
  children: ReactNode;
  cta: string;
}) {
  return (
    <Link className="flyer" href={href}>
      <div className="flyer__pin" />
      <span className="emoji">{emoji}</span>
      <h3>{title}</h3>
      <p>{children}</p>
      <div className="go">{cta}</div>
    </Link>
  );
}

export function LoopCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="loop-card">
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
}

export function StepCard({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="step-card">
      <div className="step-card__n">{n}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function StatBox({ val, label }: { val: string; label: string }) {
  return (
    <div className="stat-box">
      <div className="val">{val}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}

export function StatBoxGrid({ children }: { children: ReactNode }) {
  return <div className="stat-box-grid">{children}</div>;
}

export function TickList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="tick-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function InfoNote({ children }: { children: ReactNode }) {
  return <div className="info-note">{children}</div>;
}

export function NoticeBand({ children }: { children: ReactNode }) {
  return <p className="notice-band">{children}</p>;
}

export function PullQuote({ children }: { children: ReactNode }) {
  return <p className="pull-quote">{children}</p>;
}

/* ---------- CTA band ("ticket") ---------- */

export function Ticket({
  title,
  children,
  cta,
}: {
  title: ReactNode;
  children: ReactNode;
  cta: ReactNode;
}) {
  return (
    <div className="ticket">
      <h2>{title}</h2>
      <p>{children}</p>
      {cta}
    </div>
  );
}

/* ---------- Old vs new comparison ---------- */

export function CompareScript({
  oldTitle = "The old way",
  newTitle = "The UniLife way",
  oldItems,
  newItems,
}: {
  oldTitle?: string;
  newTitle?: string;
  oldItems: string[];
  newItems: string[];
}) {
  return (
    <div className="script">
      <div className="col old">
        <h4>{oldTitle}</h4>
        <ul>
          {oldItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="col new">
        <h4>{newTitle}</h4>
        <ul>
          {newItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Org / role cards ---------- */

export function OrgRow({ children, two }: { children: ReactNode; two?: boolean }) {
  return <div className={`org-row${two ? " org-row--2" : ""}`}>{children}</div>;
}

export function OrgCard({
  badge,
  title,
  lead,
  children,
}: {
  badge: string;
  title: string;
  lead?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`org-card${lead ? " lead" : ""}`}>
      <span className="org-card__badge">{badge}</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function RoleCard({
  code,
  title,
  items,
}: {
  code: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="role-card">
      <div className="role-card__top">
        <span className="role-card__code">{code}</span>
      </div>
      <h3>{title}</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Tier / plan cards ---------- */

export function TierCard({
  tag,
  title,
  sub,
  items,
  featured,
}: {
  tag: string;
  title: string;
  sub: string;
  items: string[];
  featured?: boolean;
}) {
  return (
    <div className={`tier-card${featured ? " featured" : ""}`}>
      <div className="tag">{tag}</div>
      <h3>{title}</h3>
      <div className="sub">{sub}</div>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function PlanCard({
  title,
  price,
  unit,
  period,
  topup,
  desc,
  items,
  featured,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  price: string;
  unit?: string;
  period?: string;
  topup?: string;
  desc: string;
  items: string[];
  featured?: boolean;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className={`plan-card${featured ? " featured" : ""}`}>
      <h3>{title}</h3>
      <div className="price">
        {price}
        {unit && <span className="unit">{unit}</span>}
        {period && <span className="period"> {period}</span>}
      </div>
      {topup && <div className="topup">{topup}</div>}
      <p className="desc">{desc}</p>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <Btn href={ctaHref} variant={featured ? "primary" : "ghost"}>
        {ctaLabel}
      </Btn>
    </div>
  );
}

/* ---------- Info card (contact-style) ---------- */

export function InfoCard({
  title,
  role,
  children,
}: {
  title: string;
  role?: string;
  children: ReactNode;
}) {
  return (
    <div className="info-card">
      <h3>{title}</h3>
      {role && <div className="role">{role}</div>}
      {children}
    </div>
  );
}

/* ---------- Partner wall ---------- */

export function PartnerWall({ children }: { children: ReactNode }) {
  return <div className="partner-wall">{children}</div>;
}

export function PartnerChip({
  href,
  src,
  alt,
  placeholder,
}: {
  href?: string;
  src?: string;
  alt?: string;
  placeholder?: ReactNode;
}) {
  if (placeholder) {
    return <div className="partner-chip placeholder">{placeholder}</div>;
  }
  return (
    <a className="partner-chip" href={href} target="_blank" rel="noopener">
      {/* using plain img: partner logos are third-party, arbitrary aspect ratios */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
    </a>
  );
}

/* ---------- Alert box (legal pages) ---------- */

export function AlertBox({
  variant,
  children,
}: {
  variant?: "warn";
  children: ReactNode;
}) {
  return <div className={`alert-box${variant ? ` ${variant}` : ""}`}>{children}</div>;
}

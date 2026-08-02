import { ReactNode } from "react";
import Reveal from "./Reveal";

export function Section({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="section">
      {children}
    </section>
  );
}

export function SectionHead({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <Reveal>
      <div className="section-head">
        <div className="kicker">{kicker}</div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </Reveal>
  );
}

export function PageHead({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="page-head">
      <Reveal>
        <div className="kicker">{kicker}</div>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="display">{title}</h1>
      </Reveal>
      {children && <Reveal delay={0.1}><p>{children}</p></Reveal>}
    </header>
  );
}

export function Grid({ cols, children }: { cols: 2 | 3 | 4; children: ReactNode }) {
  return <div className={`grid grid-${cols}`}>{children}</div>;
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function Step({
  shape,
  tag,
  title,
  children,
}: {
  shape: "circle" | "tri" | "square";
  tag: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="step">
      <div className={`shape ${shape}`}></div>
      <span className="tag">{tag}</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function HelpCard({
  shape,
  shapeColor,
  title,
  children,
}: {
  shape: "circle" | "tri" | "square";
  shapeColor?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="help-card">
      <div className={`shape ${shape}`} style={shapeColor ? { borderColor: shapeColor } : undefined}></div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

export function Rung({
  funded,
  refs,
  milestone,
  amount,
}: {
  funded: boolean;
  refs: string;
  milestone: string;
  amount: string;
}) {
  return (
    <div className={`rung ${funded ? "funded" : "locked"}`}>
      <div className="marker"></div>
      <div>
        <div style={{ fontWeight: 600 }}>{refs}</div>
        <div className="refs">{milestone}</div>
      </div>
      <div className="amount">{amount}</div>
      <div className="status">{funded ? "✓ FOUNDER-FUNDED" : "🔒 OPENS WITH SPONSOR"}</div>
    </div>
  );
}

export function Phase({
  when,
  title,
  badge,
  children,
}: {
  when: string;
  title: string;
  badge?: "live" | "locked";
  children: ReactNode;
}) {
  return (
    <div className="phase">
      <div className="when">{when}</div>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
        {badge && (
          <span className={`badge ${badge === "live" ? "live-badge" : "locked-badge"}`}>
            {badge === "live" ? "RUNS REGARDLESS" : "SPONSOR-DEPENDENT"}
          </span>
        )}
      </div>
    </div>
  );
}

export function FairPlayBanner() {
  return (
    <div className="banner">
      <div className="shape square" style={{ borderColor: "var(--r-green)" }}></div>
      <div>
        <h3>Fair play, by design.</h3>
        <p>
          The UniLife founder and team are not eligible for cash prizes in
          this campaign. Only currently active students outside the team can
          win the top-10 cash pool — no conflict of interest, no exceptions.
        </p>
      </div>
    </div>
  );
}

export function StatChip({ children }: { children: ReactNode }) {
  return <span className="stat-chip">{children}</span>;
}

export function CtaRow({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return <div className="cta-row" style={style}>{children}</div>;
}

export function Btn({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "ghost";
  children: ReactNode;
}) {
  return (
    <a className={`btn btn-${variant}`} href={href}>
      {children}
    </a>
  );
}

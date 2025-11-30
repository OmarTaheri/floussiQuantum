"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const dateFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric" });
const timeFormatter = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

const links = [
  { href: "/macro", label: "Macro-Discovery" },
  { href: "/leads", label: "Lead Inbox" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/audit", label: "Audit Log" },
  { href: "/models", label: "Model Monitor" },
];

type SiteShellProps = {
  children: ReactNode;
  heading?: string;
  description?: string;
  tab?: string;
};

export function SiteShell({ children, heading, description, tab }: SiteShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateClock = () => setNow(new Date());
    updateClock();
    const intervalId = setInterval(updateClock, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const pathSegments = pathname.split("/").filter(Boolean);
  const showBackButton = pathSegments.length > 1;
  const dateLabel = now ? dateFormatter.format(now) : "";
  const timeLabel = now ? timeFormatter.format(now) : "";

  const handleBack = () => {
    // Merchant flows should always return to the home (macro) view.
    if (pathSegments[0] === "merchant") {
      router.push("/macro");
      return;
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/macro");
    }
  };

  return (
    <div className="app" data-tab={tab ?? undefined}>
      <aside className="app-sidebar">
        <div>
          <div className="logo">
            <div className="logo-icon">
              <Image src="/logo.png" alt="Floussi Quantum" width={170} height={85} priority />
            </div>
          </div>
          <nav className="navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={pathname === link.href ? "active" : undefined}>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer">
          <h1>
            Floussi<small>©</small>
          </h1>
        </div>
      </aside>

      <div className="app-main">
        <div className="app-header">
          <div className="header-lead">
            {showBackButton ? (
              <button className="back-button" type="button" onClick={handleBack}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                  <line x1="9" y1="12" x2="21" y2="12" />
                </svg>
                <span>Go back</span>
              </button>
            ) : (
              <div className="date-time">
                <span className="pill time-pill datetime-pill" suppressHydrationWarning>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span className="date-text">{dateLabel}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 15" />
                  </svg>
                  <span className="time-text">{timeLabel}</span>
                </span>
              </div>
            )}
          </div>
          <div />
          <div className="app-header-actions">
            <button className="user-profile">
              <span style={{ whiteSpace: "nowrap" }}>Matheo Peterson</span>
              <span>
                <span style={{ display: "inline-block", width: 34, height: 34, borderRadius: "50%", background: "#ccc" }} />
              </span>
            </button>
          </div>
        </div>

        {heading && (
          <div className="header-row" style={{ marginBottom: "1rem" }}>
            <div>
              <h1 style={{ margin: 0 }}>{heading}</h1>
              {description && <div className="muted">{description}</div>}
            </div>
          </div>
        )}
        {children}
      </div>

      <div className="app-aside">
        <div className="card-stack">
          <div className="row" style={{ width: "100%", background: "#0a0a0a", border: "1px solid #5c7de3", borderRadius: 10, padding: "6px 8px" }}>
            <input style={{ flex: 1, background: "transparent", border: 0, outline: "none" }} placeholder="Search name / alias / city" />
            <div className="row" style={{ gap: "0.35rem" }}>
              <button className="icon-button large" aria-label="Search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.65" y1="16.65" x2="21" y2="21" />
                </svg>
              </button>
              <button className="icon-button large" aria-label="Notifications">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 01-3.46 0" />
                </svg>
              </button>
            </div>
          </div>
          <div className="card">
            <div className="title-line">
              <span>AI guardrails</span>
              <span className="pill">Live</span>
            </div>
            <div className="muted">Entity resolution, SHAP explainers, DSCR limits.</div>
          </div>
          <div className="card">
            <div className="title-line">
              <span>Bankable threshold</span>
              <span className="pill">680</span>
            </div>
            <div className="muted">Score floor for macro stream.</div>
          </div>
          <div className="card">
            <div className="title-line">
              <span>Fraud alerts</span>
              <span className="pill">7</span>
            </div>
            <div className="muted">Sybil / device anomalies this week.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

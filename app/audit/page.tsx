"use client";

import { SiteShell } from "../components/SiteShell";

const logs = [
  { ts: "08:42", actor: "Analyst A", action: "Approved Bahia Bakery", note: "Score 768, PD 2.0%" },
  { ts: "08:20", actor: "Model (LTR)", action: "Ranked Ets Ibrahim #1", note: "High accept / score" },
  { ts: "07:55", actor: "Fraud monitor", action: "Flagged device cluster", note: "Sybil prob 0.18" },
  { ts: "07:30", actor: "Analyst B", action: "Rejected Oum Rabie", note: "Entity match < 80%" },
];

export default function AuditPage() {
  return (
    <SiteShell heading="Audit Log" description="Decisions, overrides, model vs analyst variance." tab="overview">
      <div className="section">
        <h2>Timeline</h2>
        <div className="card-stack">
          {logs.map((log, i) => (
            <div key={i} className="card">
              <div className="title-line">
                <span>{log.ts}</span>
                <span className="pill">{log.actor}</span>
              </div>
              <div className="muted">{log.action}</div>
              <div className="muted">{log.note}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h2>Model vs Analyst (placeholder)</h2>
        <div className="card">Variance report: 3 overrides, avg delta +12 score pts.</div>
      </div>
    </SiteShell>
  );
}

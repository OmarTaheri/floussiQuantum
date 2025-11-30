import { notFound } from "next/navigation";
import { SiteShell } from "../../../components/SiteShell";
import { leads } from "../../../data";

export default async function MerchantDecision({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lead = leads.find((l) => l.slug === slug);
  if (!lead) return notFound();
  const limit = lead.recommendedLimit.toLocaleString();

  return (
    <SiteShell heading={`${lead.name} - Decision`} description="Approve / Reject with rationale." tab="overview">
      <div className="section detail-grid">
        <SummaryCard title="Score" value={lead.bankableScore.toString()} hint={`PD ${(lead.pd * 100).toFixed(2)}%`} />
        <SummaryCard title="Recommended limit" value={`${limit} MAD`} hint="Model suggestion" />
        <SummaryCard title="Stage" value={lead.stage} hint={`Exposure ${lead.exposure.toLocaleString()} MAD`} />
        <SummaryCard title="Acceptance" value={`${(lead.acceptance * 100).toFixed(0)}%`} hint={`Creditworthiness ${lead.creditworthiness}`} />
      </div>

      <div className="section">
        <h2>Decision</h2>
        <div className="row" style={{ marginBottom: "0.75rem" }}>
          <button className="btn primary">Approve</button>
          <button className="btn">Reject</button>
          <div className="pill">Score {lead.bankableScore}</div>
          <div className="pill">PD {(lead.pd * 100).toFixed(2)}%</div>
        </div>
        <div className="card-stack">
          <div className="card">
            <div className="title-line">
              <span>Terms (placeholder)</span>
              <span className="pill">{limit} MAD</span>
            </div>
            <div className="muted">Term: 9m (example) - Installment guardrail 3,200 MAD.</div>
          </div>
          <div className="card">
            <div className="title-line">
              <span>Key risks</span>
              <span className="pill">Monitor</span>
            </div>
            <div className="muted">Volatility, entity match if under 80%, fraud anomalies (currently low).</div>
          </div>
          <div className="card">
            <div className="title-line">
              <span>Decision support</span>
              <span className="pill">AI context</span>
            </div>
            <div className="muted">Score implies low PD; geo saturation and fraud alerts are stable.</div>
          </div>
          <div className="card">
            <div className="title-line">
              <span>Analyst notes</span>
              <span className="pill">Editable</span>
            </div>
            <div className="muted">"Stable turnover; add post-disbursement call at 30 days."</div>
          </div>
          <div className="card">
            <div className="title-line">
              <span>Export summary</span>
              <span className="pill">PDF</span>
            </div>
            <div className="muted">Placeholder for export action.</div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function SummaryCard({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <div className="card">
      <div className="title-line">
        <span>{title}</span>
        <span className="pill">{value}</span>
      </div>
      <div className="muted">{hint}</div>
    </div>
  );
}

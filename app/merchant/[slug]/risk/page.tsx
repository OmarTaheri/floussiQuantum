import { notFound } from "next/navigation";
import { SiteShell } from "../../../components/SiteShell";
import { leads } from "../../../data";

export default async function MerchantRisk({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lead = leads.find((l) => l.slug === slug);
  if (!lead) return notFound();
  return (
    <SiteShell heading={`${lead.name} - Risk`} description="Score, PD, SHAP explainability, peer benchmark." tab="overview">
      <div className="hero-tiles">
        <Tile title="Floussi Score" value={lead.bankableScore.toString()} subtitle="Behavioral + financial" color="color-1" />
        <Tile title="PD" value={`${(lead.pd * 100).toFixed(2)}%`} subtitle="XGBoost PD" color="color-2" />
        <Tile title="Peer percentile" value="Top 10%" subtitle="Category + city" color="color-3" />
        <Tile title="Entity match" value={`${Math.round(lead.entityConfidence * 100)}%`} subtitle="Name + address" color="color-4" />
      </div>

      <div className="section">
        <h2>Score snapshot</h2>
        <div className="detail-grid">
          <KpiCard title="Score band" value={`${lead.bankableScore}`} hint="300-850 calibrated" />
          <KpiCard title="PD" value={`${(lead.pd * 100).toFixed(2)}%`} hint="1y default probability" />
          <KpiCard title="Peer rank" value="Top decile" hint="Category + city" />
          <KpiCard title="Volatility" value={lead.volatility} hint="Income stability" />
        </div>
      </div>

      <div className="section">
        <h2>Why (SHAP)</h2>
        <div className="card-stack">
          {lead.shap.map((item) => (
            <div key={item.label} className="card">
              <div className="title-line">
                <span>{item.label}</span>
                <span className="pill">
                  {item.impact > 0 ? "+" : ""}
                  {item.impact} pts
                </span>
              </div>
              <div className="muted">Feature contribution</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section detail-grid">
        <div className="card">
          <div className="title-line">
            <span>Score gauge (placeholder)</span>
            <span className="pill">{lead.bankableScore}</span>
          </div>
          <div className="muted">300-850 calibrated to informal sector.</div>
        </div>
        <div className="card">
          <div className="title-line">
            <span>Peer benchmarking</span>
            <span className="pill">Top 10%</span>
          </div>
          <div className="muted">Against same category and city.</div>
          <div className="muted" style={{ marginTop: 6 }}>
            Entity match {Math.round(lead.entityConfidence * 100)}%; velocity {lead.velocity}.
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function Tile({ title, value, subtitle, color }: { title: string; value: string; subtitle: string; color?: string }) {
  return (
    <div className={`tile ${color || ""}`}>
      <div className="muted">{title}</div>
      <h3 style={{ margin: "4px 0" }}>{value}</h3>
      <div className="muted">{subtitle}</div>
    </div>
  );
}

function KpiCard({ title, value, hint }: { title: string; value: string; hint: string }) {
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

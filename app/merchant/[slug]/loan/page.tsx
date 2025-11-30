import { notFound } from "next/navigation";
import { SiteShell } from "../../../components/SiteShell";
import { leads } from "../../../data";

export default async function MerchantLoan({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lead = leads.find((l) => l.slug === slug);
  if (!lead) return notFound();
  const stressedIncome = (lead.revenue / 12) * 0.8;
  const installment = 3200;
  const dscr = stressedIncome / installment;
  const recommended = Math.round(lead.recommendedLimit * 0.95);
  const maxInstallment = Math.round(stressedIncome * 0.35);
  const dscrWorstCase = (stressedIncome / maxInstallment).toFixed(2);

  return (
    <SiteShell heading={`${lead.name} - Loan Simulator`} description="Capacity, DSCR, repayment stress." tab="overview">
      <div className="hero-tiles">
        <Tile title="Recommended limit" value={`${recommended.toLocaleString()} MAD`} subtitle="Capacity optimized" color="color-1" />
        <Tile title="Suggested term" value="3m / 12m" subtitle="Working cap vs equipment" color="color-2" />
        <Tile title="DSCR (stressed)" value={dscr.toFixed(2)} subtitle="Installment <=35% worst-case" color="color-3" />
        <Tile title="Max installment" value={`${maxInstallment.toLocaleString()} MAD`} subtitle="35% of stressed income" color="color-4" />
      </div>

      <div className="section">
        <h2>Capacity snapshot</h2>
        <div className="detail-grid">
          <KpiCard title="Limit" value={`${recommended.toLocaleString()} MAD`} hint="95% of model suggestion" />
          <KpiCard title="Income (worst)" value={`${Math.round(stressedIncome).toLocaleString()} MAD`} hint="80% stress on revenue" />
          <KpiCard title="DSCR worst-case" value={dscrWorstCase} hint="Guardrail check" />
          <KpiCard title="Max installment" value={`${maxInstallment.toLocaleString()} MAD`} hint="35% income rule" />
        </div>
      </div>

      <div className="section">
        <h2>Repayment simulator</h2>
        <div className="card">
          <div className="title-line">
            <span>Revenue shock</span>
            <span className="pill">-20% example</span>
          </div>
          <div className="muted">Income (worst): {Math.round(stressedIncome).toLocaleString()} MAD</div>
          <div className="muted">Installment guardrail: {installment.toLocaleString()} MAD</div>
          <div className="muted">Max installment (35% rule): {maxInstallment.toLocaleString()} MAD</div>
          <div className="muted">DSCR worst-case: {dscrWorstCase}</div>
        </div>
      </div>

      <div className="section">
        <h2>Forecast (placeholder)</h2>
        <div className="card">
          <div className="title-line">
            <span>LSTM-like forecast</span>
            <span className="pill">6-12 months</span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 90, marginTop: 12 }}>
            {[82, 86, 90, 95, 97, 101, 105, 110, 108, 112].map((v, i) => (
              <div key={i} style={{ width: 14, height: `${v}%`, background: "#45ffbc", borderRadius: 4 }} />
            ))}
          </div>
          <div className="muted" style={{ marginTop: 8 }}>
            Capacity optimization output: maxInstallment {maxInstallment.toLocaleString()} MAD, dscrWorstCase {dscrWorstCase}.
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

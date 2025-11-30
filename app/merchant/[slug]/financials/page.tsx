import { notFound } from "next/navigation";
import { SiteShell } from "../../../components/SiteShell";
import { leads } from "../../../data";

export default async function MerchantFinancials({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lead = leads.find((l) => l.slug === slug);
  if (!lead) return notFound();

  const monthlyRevenue = Math.round(lead.revenue / 12);

  return (
    <SiteShell heading={`${lead.name} - Financials`} description="Synthetic P&L and transaction tagging." tab="overview">
      <div className="hero-tiles">
        <Tile title="Revenue curve" value="AI smoothed" subtitle="Holiday suppression markers" color="color-1" />
        <Tile title="Inflow (TTM)" value={lead.pnl.inflowTTM} subtitle={`Trend ${lead.pnl.momoTrend}`} color="color-2" />
        <Tile title="Volatility" value={lead.volatility} subtitle="Stability guardrail" color="color-3" />
        <Tile title="Monthly inflow" value={`${monthlyRevenue.toLocaleString()} MAD`} subtitle="Run-rate" color="color-4" />
      </div>

      <div className="section">
        <h2>Key figures</h2>
        <div className="detail-grid">
          <KpiCard title="TTM inflow" value={lead.pnl.inflowTTM} hint={`Momentum ${lead.pnl.momoTrend}`} />
          <KpiCard title="Bankable score" value={lead.bankableScore.toString()} hint="Cashflow + behavior" />
          <KpiCard title="Exposure" value={`${lead.exposure.toLocaleString()} MAD`} hint="Current outstanding" />
          <KpiCard title="Entity match" value={`${Math.round(lead.entityConfidence * 100)}%`} hint="Name + address match" />
        </div>
      </div>

      <div className="section">
        <h2>Expense breakdown</h2>
        <div className="card-stack">
          {lead.pnl.expenses.map((row) => (
            <div key={row.label} className="card">
              <div className="title-line">
                <span>{row.label}</span>
                <span className="pill">{row.value}%</span>
              </div>
              <div className="muted">AI categorization with confidence</div>
              <div style={{ background: "#313131", borderRadius: 6, marginTop: 8, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${row.value}%`, height: "100%", background: "#45ffbc" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Cashflow snapshot</h2>
        <div className="card">
          <div className="title-line">
            <span>Revenue curve (placeholder)</span>
            <span className="pill">AI smoothed</span>
          </div>
          <div className="muted">Daily inflows (raw vs smoothed)</div>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 90, marginTop: 12 }}>
            {[45, 62, 58, 71, 68, 82, 79].map((v, i) => (
              <div key={i} style={{ width: 14, height: `${v}%`, background: "#45ffbc", borderRadius: 4 }} />
            ))}
          </div>
          <div className="muted" style={{ marginTop: 8 }}>
            Run-rate {monthlyRevenue.toLocaleString()} MAD per month; momentum {lead.pnl.momoTrend}.
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

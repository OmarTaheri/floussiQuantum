import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/SiteShell";
import { leads } from "../../data";

export default async function MerchantOverview({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lead = leads.find((l) => l.slug === slug);
  if (!lead) return notFound();

  return (
    <SiteShell heading={`${lead.name} - Merchant 360`} description={`${lead.sector} - ${lead.location}`} tab="overview">
      <div className="hero-tiles">
        <Tile title="Floussi Score" value={lead.bankableScore.toString()} subtitle="Behavioral + financial" color="color-1" />
        <Tile title="PD" value={`${(lead.pd * 100).toFixed(2)}%`} subtitle="XGBoost PD" color="color-2" />
        <Tile title="Recommended Limit" value={`${lead.recommendedLimit.toLocaleString()} MAD`} subtitle="Capacity-aware" color="color-3" />
        <Tile title="Stability badge" value="Green" subtitle={`${lead.kyc.stabilityMonths.toFixed(1)} mo`} color="color-4" />
      </div>

      <div className="section">
        <h2>Header</h2>
        <div className="card">
          <div className="title-line">
            <strong>{lead.name}</strong>
            <span className="pill">{lead.creditworthiness}</span>
          </div>
          <div className="muted">
            {lead.sector} - {lead.location}
          </div>
          <div className="muted">
            Address: {lead.address} - Tenure {lead.kyc.stabilityMonths.toFixed(1)} mo
          </div>
        </div>
      </div>

      <div className="section detail-grid">
        <MiniCard title="Fraud flag" value="Low" />
        <MiniCard title="Why now?" value="Crossed threshold" />
        <MiniCard title="Score trio" value={`${lead.bankableScore} / ${(lead.pd * 100).toFixed(2)}% / ${lead.recommendedLimit.toLocaleString()} MAD`} />
      </div>

      <div className="section">
        <h2>Why now?</h2>
        <div className="card-stack">
          <div className="card">Triggered bankable threshold: stable revenue, strong entity match.</div>
          <div className="card">AI highlight: LTR rank #{lead.ltrRank} - Entity resolution {Math.round(lead.entityConfidence * 100)}%.</div>
        </div>
      </div>

      <div className="section">
        <h2>Deep dives</h2>
        <div className="detail-grid">
          <InfoCard
            title="KYC"
            body={[
              `Stability ${Math.round(lead.kyc.locationStability * 100)}% - Tenure ${lead.kyc.stabilityMonths.toFixed(1)} mo`,
              `Identity ${Math.round(lead.kyc.identityConfidence * 100)}% - Device ${Math.round(lead.kyc.deviceClean * 100)}%`,
            ]}
            href={`/merchant/${lead.slug}/kyc`}
          />
          <InfoCard
            title="Financials"
            body={[
              `Inflow (TTM) ${lead.pnl.inflowTTM} - Trend ${lead.pnl.momoTrend}`,
              `Top expense: ${lead.pnl.expenses[0].label} (${lead.pnl.expenses[0].value}%)`,
            ]}
            href={`/merchant/${lead.slug}/financials`}
          />
          <InfoCard
            title="Risk"
            body={[
              `Score ${lead.bankableScore} - PD ${(lead.pd * 100).toFixed(2)}%`,
              `Peer: Top 10% - Entity match ${Math.round(lead.entityConfidence * 100)}%`,
            ]}
            href={`/merchant/${lead.slug}/risk`}
          />
          <InfoCard
            title="Loan"
            body={[
              `Recommended limit ${lead.recommendedLimit.toLocaleString()} MAD`,
              "DSCR guardrail <=35% worst-case income",
            ]}
            href={`/merchant/${lead.slug}/loan`}
          />
          <InfoCard
            title="Decision"
            body={[
              `Stage ${lead.stage} - Creditworthiness ${lead.creditworthiness}`,
              `Acceptance ${(lead.acceptance * 100).toFixed(0)}% - Exposure ${lead.exposure.toLocaleString()} MAD`,
            ]}
            href={`/merchant/${lead.slug}/decision`}
          />
        </div>
      </div>

      <div className="section">
        <h2>Signals (charts)</h2>
        <div className="detail-grid">
          <ChartCard title="Score trend (placeholder)" values={[710, 720, 732, lead.bankableScore, lead.bankableScore + 5]} />
          <ChartCard title="PD trend (bps)" values={[320, 290, 270, Math.round(lead.pd * 10000), Math.round(lead.pd * 10000) - 15]} />
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

function MiniCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="card">
      <div className="muted">{title}</div>
      <h3 style={{ margin: "4px 0" }}>{value}</h3>
    </div>
  );
}

function ChartCard({ title, values }: { title: string; values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="card">
      <div className="title-line">
        <span>{title}</span>
        <span className="pill">AI highlight</span>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 90, marginTop: 10 }}>
        {values.map((v, i) => (
          <div key={i} style={{ width: 14, height: `${(v / max) * 90}px`, background: "#45ffbc", borderRadius: 4 }} />
        ))}
      </div>
    </div>
  );
}

function InfoCard({ title, body, href }: { title: string; body: string[]; href: string }) {
  return (
    <div className="card">
      <div className="title-line">
        <span>{title}</span>
        <Link className="btn small primary" href={href}>
          Show more
        </Link>
      </div>
      {body.map((line, idx) => (
        <div key={idx} className="muted" style={{ marginTop: idx === 0 ? 6 : 2 }}>
          {line}
        </div>
      ))}
    </div>
  );
}

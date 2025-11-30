"use client";

import { SiteShell } from "../components/SiteShell";
import { leads } from "../data";
import { useRouter } from "next/navigation";

const zones = [
  { zone: "Derb Omar", exposure: 42, delta: -6, risk: "High" },
  { zone: "Maarif", exposure: 35, delta: 3, risk: "Balanced" },
  { zone: "Sidi Bernoussi", exposure: 27, delta: 4, risk: "Moderate" },
  { zone: "Ain Sebaa", exposure: 31, delta: 1, risk: "Moderate" },
];

export default function MacroPage() {
  const router = useRouter();
  return (
    <SiteShell heading="Macro-Discovery" description="Opportunity stream, smart search, and spatial exposure." tab="overview">
      <div className="hero-tiles">
        <Tile title="Opportunity Stream" subtitle="Crossed bankable threshold" value={`${leads.length} in 24h`} color="color-1" />
        <Tile title="AI Lead Scoring (LTR)" subtitle="acceptLoanScore • creditworthiness" value="Active" color="color-2" />
        <Tile title="Entity Resolution" subtitle="Levenshtein / sanctions check" value="89% confidence" color="color-3" />
        <Tile title="Geo Exposure" subtitle="High in Derb Omar" value="Watch saturation" color="color-4" />
      </div>

      <div className="section">
        <h2>AI Charts</h2>
        <div className="detail-grid">
          <ChartCard title="LTR Scores" subtitle="acceptLoanScore distribution" values={[640, 690, 720, 770, 810]} />
          <ChartCard title="Entity Match" subtitle="Fuzzy match confidence" values={[72, 78, 81, 86, 89]} />
          <ChartCard title="Geo Exposure" subtitle="Zone exposure (M MAD)" values={zones.map((z) => z.exposure)} />
        </div>
      </div>

      <div className="section">
        <h2>Opportunity Stream</h2>
        <div className="row" style={{ marginBottom: "0.75rem" }}>
          <input style={{ minWidth: 240 }} placeholder="Smart Search: Hajj Brahim / برهيم" />
          <div className="pill">Fuzzy alias match</div>
          <div className="pill">LTR prioritized</div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Merchant</th>
              <th>Location</th>
              <th>Sector</th>
              <th>Score</th>
              <th>LTR Rank</th>
              <th>Entity Match</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.slug}
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/merchant/${lead.slug}`)}
              >
                <td>
                  <div className="title-line">
                    <strong>{lead.name}</strong>
                    <span className="pill">{lead.creditworthiness}</span>
                  </div>
                  <div className="muted">aka {lead.alias}</div>
                </td>
                <td>{lead.location}</td>
                <td>{lead.sector}</td>
                <td>{lead.bankableScore}</td>
                <td>#{lead.ltrRank}</td>
                <td>{Math.round(lead.entityConfidence * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Portfolio Health Map</h2>
        <div className="card-stack">
          {zones.map((z) => (
            <div key={z.zone} className="card">
              <div className="title-line">
                <span>{z.zone}</span>
                <span className="pill">{z.risk}</span>
              </div>
              <div className="muted">
                Exposure {z.exposure}M MAD • Δ {z.delta > 0 ? "+" : ""}
                {z.delta} pts w/w
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}

function Tile({ title, subtitle, value, color }: { title: string; subtitle: string; value: string; color?: string }) {
  return (
    <div className={`tile ${color || ""}`}>
      <div className="muted">{title}</div>
      <h3 style={{ margin: "4px 0" }}>{value}</h3>
      <div className="muted">{subtitle}</div>
    </div>
  );
}

function ChartCard({ title, subtitle, values }: { title: string; subtitle: string; values: number[] }) {
  const max = Math.max(...values);
  return (
    <div className="tile color-4">
      <div className="muted">{title}</div>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{subtitle}</div>
      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 90 }}>
        {values.map((v, i) => (
          <div key={i} style={{ width: 14, height: `${(v / max) * 90}px`, background: "#45ffbc", borderRadius: 4 }} />
        ))}
      </div>
    </div>
  );
}

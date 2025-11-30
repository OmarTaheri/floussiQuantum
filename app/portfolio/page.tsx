"use client";

import { SiteShell } from "../components/SiteShell";

const zones = [
  { zone: "Derb Omar", exposure: 42, alert: "High exposure" },
  { zone: "Maarif", exposure: 35, alert: "Balanced" },
  { zone: "Sidi Bernoussi", exposure: 27, alert: "Moderate" },
  { zone: "Ain Sebaa", exposure: 31, alert: "Moderate" },
];

export default function PortfolioPage() {
  return (
    <SiteShell heading="Portfolio Health" description="Heatmap, score bands, sector mix, and fraud alerts." tab="overview">
      <div className="hero-tiles">
        <Tile title="Exposure" subtitle="Total by zone" value="157M MAD" />
        <Tile title="Score mix" subtitle="Top band 720+" value="48%" />
        <Tile title="Fraud anomalies" subtitle="Device/Sybil flags" value="7 this week" />
        <Tile title="PD band (avg)" subtitle="Portfolio PD" value="2.7%" />
      </div>
      <div className="section">
        <h2>Heatmap by Zone</h2>
        <div className="card-stack">
          {zones.map((z) => (
            <div key={z.zone} className="card">
              <div className="title-line">
                <span>{z.zone}</span>
                <span className="pill">{z.alert}</span>
              </div>
              <div className="muted">Exposure {z.exposure}M MAD</div>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h2>Distribution (placeholders)</h2>
        <div className="detail-grid">
          <div className="card">Score bands: A 32% • B 41% • C 27%</div>
          <div className="card">PD bands: &lt;2% : 38% • 2-5% : 44% • 5%+ : 18%</div>
          <div className="card">Sector mix: FMCG 30% • Beauty 18% • Mobility 14% • Food 16% • Other 22%</div>
        </div>
      </div>
    </SiteShell>
  );
}

function Tile({ title, subtitle, value }: { title: string; subtitle: string; value: string }) {
  return (
    <div className="tile">
      <div className="muted">{title}</div>
      <h3 style={{ margin: "4px 0" }}>{value}</h3>
      <div className="muted">{subtitle}</div>
    </div>
  );
}

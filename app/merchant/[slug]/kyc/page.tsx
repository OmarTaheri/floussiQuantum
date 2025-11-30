import { notFound } from "next/navigation";
import { SiteShell } from "../../../components/SiteShell";
import { leads } from "../../../data";

export default async function MerchantKYC({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lead = leads.find((l) => l.slug === slug);
  if (!lead) return notFound();

  return (
    <SiteShell heading={`${lead.name} - KYC`} description="Location fingerprinting and device hygiene." tab="overview">
      <div className="hero-tiles">
        <Tile title="Stability badge" value={`${Math.round(lead.kyc.locationStability * 100)}%`} subtitle="DBSCAN geo stability" color="color-1" />
        <Tile title="Identity match" value={`${Math.round(lead.kyc.identityConfidence * 100)}%`} subtitle="Liveness + OCR" color="color-2" />
        <Tile title="Device hygiene" value={`${Math.round(lead.kyc.deviceClean * 100)}%`} subtitle="Isolation Forest" color="color-3" />
        <Tile title="Tenure" value={`${lead.kyc.stabilityMonths.toFixed(1)} mo`} subtitle="Declared vs observed" color="color-4" />
      </div>

      <div className="section">
        <h2>Identity and device checks</h2>
        <div className="detail-grid">
          <KpiCard title="Location stability" value={`${Math.round(lead.kyc.locationStability * 100)}%`} hint="DBSCAN geo stability" />
          <KpiCard title="Identity confidence" value={`${Math.round(lead.kyc.identityConfidence * 100)}%`} hint="Liveness + OCR" />
          <KpiCard title="Device clean score" value={`${Math.round(lead.kyc.deviceClean * 100)}%`} hint="Isolation Forest hygiene" />
          <KpiCard title="Tenure" value={`${lead.kyc.stabilityMonths.toFixed(1)} months`} hint="Stability badge" />
        </div>
      </div>

      <div className="section">
        <h2>Signals</h2>
        <div className="card-stack">
          <div className="card">
            <div className="title-line">
              <span>Location fingerprinting</span>
              <span className="pill">{Math.round(lead.kyc.locationStability * 100)}%</span>
            </div>
            <div className="muted">Cluster count 1 - Declared vs GPS drift under 50m (stable footprint).</div>
          </div>
          <div className="card">
            <div className="title-line">
              <span>Fraud and device</span>
              <span className="pill">Low anomaly</span>
            </div>
            <div className="muted">Isolation Forest clean score {Math.round(lead.kyc.deviceClean * 100)}%; shared device count 0 (placeholder).</div>
          </div>
          <div className="card">
            <div className="title-line">
              <span>Sanctions and alias</span>
              <span className="pill">Clear</span>
            </div>
            <div className="muted">Alias and address similarity cross-check passes; no watchlist hits (placeholder).</div>
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

"use client";

import { SiteShell } from "../components/SiteShell";

const models = [
  { name: "LTR Lead Scoring", status: "Healthy", threshold: "Score ≥ 680" },
  { name: "Entity Resolution", status: "Stable", threshold: "Match ≥ 80%" },
  { name: "DBSCAN Location", status: "Healthy", threshold: "Centroid drift < 50m" },
  { name: "Isolation Forest", status: "Attention", threshold: "Anomaly > 0.25" },
  { name: "Categorizer (BERT)", status: "Healthy", threshold: "Cat conf > 0.7" },
  { name: "XGBoost PD", status: "Healthy", threshold: "PD < 5%" },
  { name: "SHAP Explainability", status: "Active", threshold: "Top drivers logged" },
  { name: "Forecast (LSTM)", status: "Stable", threshold: "Drift < 2.5%" },
];

export default function ModelsPage() {
  return (
    <SiteShell heading="Model Monitor" description="Model cards and thresholds." tab="models">
      <div className="section">
        <div className="card-stack">
          {models.map((m) => (
            <div key={m.name} className="card">
              <div className="title-line">
                <strong>{m.name}</strong>
                <span className="pill">{m.status}</span>
              </div>
              <div className="muted">Threshold: {m.threshold}</div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}

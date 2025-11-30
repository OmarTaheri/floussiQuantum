"use client";

import Link from "next/link";
import { SiteShell } from "../components/SiteShell";
import { leads } from "../data";

export default function LeadsPage() {
  return (
    <SiteShell heading="Lead Inbox" description="Ranked leads with filters and bulk actions." tab="overview">
      <div className="section">
        <h2>Filters</h2>
        <div className="row" style={{ marginBottom: "0.75rem" }}>
          <input placeholder="City" />
          <input placeholder="Category" />
          <input placeholder="Score band" />
          <input placeholder="Sanctions risk" />
          <input placeholder="New today" />
          <button className="btn primary">Apply</button>
          <button className="btn">Reset</button>
        </div>
        <div className="row" style={{ marginBottom: "0.75rem" }}>
          <button className="btn">Open file</button>
          <button className="btn">Request KYC review</button>
          <button className="btn">Send to underwriting</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Merchant</th>
              <th>City</th>
              <th>Sector</th>
              <th>Score</th>
              <th>LTR rank</th>
              <th>Entity match</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.slug}>
                <td>
                  <div className="title-line">
                    <Link href={`/merchant/${lead.slug}`}>
                      <strong>{lead.name}</strong>
                    </Link>
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
    </SiteShell>
  );
}

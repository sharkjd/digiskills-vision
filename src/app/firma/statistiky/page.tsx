"use client";

import CompanyStatsDashboard from "@/components/firma/CompanyStatsDashboard";

export default function CompanyStatsPage() {
  return (
    <div style={{ background: "var(--color-breeze)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >
        <CompanyStatsDashboard />
      </div>
    </div>
  );
}

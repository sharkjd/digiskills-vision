"use client";

import ManagerDashboard from "@/components/dashboard/ManagerDashboard";

export default function ManagerPage() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "40px 24px",
        background: "var(--color-breeze)",
      }}
    >
      <ManagerDashboard />
    </div>
  );
}

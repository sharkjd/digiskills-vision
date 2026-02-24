"use client";

import ProfileDashboard from "@/components/dashboard/ProfileDashboard";

export default function ProfilPage() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "40px 24px",
        background: "var(--color-breeze)",
      }}
    >
      <ProfileDashboard />
    </div>
  );
}

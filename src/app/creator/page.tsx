"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import CreatorDashboard from "@/components/creator/CreatorDashboard";
import { useTranslation } from "@/hooks/useTranslation";

function SavedBanner() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const saved = searchParams.get("saved") === "1";

  if (!saved) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "16px 24px 0",
      }}
    >
      <div
        style={{
          background: "#77F9D9",
          borderRadius: 12,
          padding: "16px 24px",
          color: "#040E3C",
          fontSize: 15,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span>✓</span>
        {t("creator.savedMessage")}
      </div>
    </motion.div>
  );
}

function CreatorPageContent() {
  return (
    <div style={{ background: "var(--color-breeze)", minHeight: "100vh" }}>
      <Suspense fallback={null}>
        <SavedBanner />
      </Suspense>
      <CreatorDashboard />
    </div>
  );
}

export default function CreatorPage() {
  return (
    <Suspense
      fallback={
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: 40, background: "var(--color-breeze)" }}>
          Načítání…
        </div>
      }
    >
      <CreatorPageContent />
    </Suspense>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

type ProgressStripProps = {
  completed: number;
  total: number;
};

export default function ProgressStrip({ completed, total }: ProgressStripProps) {
  const { t } = useTranslation();
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "var(--color-background)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border)",
        padding: "24px 28px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        boxShadow: "0 2px 8px var(--color-card-shadow)",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: "linear-gradient(135deg, rgba(119, 249, 217, 0.2), rgba(37, 150, 255, 0.15))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="24" height="24" fill="none" stroke="var(--color-primary)" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>

      {/* Text + Progress */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--color-text-main)",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {t("dashboard.progressTitle")}
          </span>
          <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
            {t("dashboard.progressText", {
              completed: String(completed),
              total: String(total),
            })}
          </span>
        </div>

        <div
          style={{
            height: 10,
            background: "var(--color-border)",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            style={{
              height: "100%",
              borderRadius: 5,
              background: "linear-gradient(90deg, var(--color-accent-green), var(--color-primary))",
            }}
          />
        </div>
      </div>

      {/* Percentage */}
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "var(--color-primary)",
          fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          flexShrink: 0,
        }}
      >
        {percent} %
      </div>
    </motion.div>
  );
}

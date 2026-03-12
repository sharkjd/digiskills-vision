"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

type StatItem = {
  value: number;
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
};

type CourseHeroProps = {
  userName: string;
  digiskillsIndex: number;
  completedCount: number;
  toStudyCount: number;
};

const GAUGE_SIZE = 100;
const GAUGE_STROKE = 8;
const GAUGE_RADIUS = (GAUGE_SIZE - GAUGE_STROKE) / 2;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;

export default function CourseHero({
  userName,
  digiskillsIndex,
  completedCount,
  toStudyCount,
}: CourseHeroProps) {
  const { t } = useTranslation();
  const indexPercent = digiskillsIndex / 10;

  const stats: StatItem[] = [
    {
      value: completedCount,
      label: t("dashboard.completedCount"),
      color: "var(--color-accent-green)",
      bgColor: "rgba(119, 249, 217, 0.15)",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      value: toStudyCount,
      label: t("dashboard.toStudyCount"),
      color: "var(--color-primary)",
      bgColor: "rgba(37, 150, 255, 0.15)",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(135deg, var(--color-digi-sky) 0%, #0a1a5c 50%, #142470 100%)",
        borderRadius: "var(--radius-card)",
        padding: "40px 36px",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(37, 150, 255, 0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: "30%",
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "rgba(119, 249, 217, 0.05)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 40, position: "relative", zIndex: 1 }}>
        {/* Left side: text */}
        <div style={{ flex: 1 }}>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{
              fontSize: 32,
              fontWeight: 700,
              fontStyle: "italic",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              margin: 0,
              marginBottom: 8,
            }}
          >
            {t("dashboard.greeting", { name: userName })}
          </motion.h1>
          <p style={{ fontSize: 16, opacity: 0.8, margin: 0, marginBottom: 24 }}>
            {t("dashboard.digiskillsIndex")}
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(255, 255, 255, 0.08)",
                  borderRadius: 10,
                  padding: "12px 18px",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: stat.bgColor,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            href="/assessment/osobni"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "var(--color-primary)",
              background: "rgba(37, 150, 255, 0.15)",
              padding: "10px 20px",
              borderRadius: 8,
              textDecoration: "none",
              border: "1px solid rgba(37, 150, 255, 0.3)",
              transition: "background 0.2s",
            }}
          >
            {t("dashboard.viewAssessment")}
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Right side: gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <svg
            width={GAUGE_SIZE}
            height={GAUGE_SIZE}
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx={GAUGE_SIZE / 2}
              cy={GAUGE_SIZE / 2}
              r={GAUGE_RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={GAUGE_STROKE}
            />
            <motion.circle
              cx={GAUGE_SIZE / 2}
              cy={GAUGE_SIZE / 2}
              r={GAUGE_RADIUS}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={GAUGE_STROKE}
              strokeLinecap="round"
              strokeDasharray={GAUGE_CIRCUMFERENCE}
              initial={{ strokeDashoffset: GAUGE_CIRCUMFERENCE }}
              animate={{ strokeDashoffset: GAUGE_CIRCUMFERENCE * (1 - indexPercent) }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <div
            style={{
              marginTop: -68,
              textAlign: "center",
              position: "relative",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>
              {digiskillsIndex.toFixed(1)}
            </div>
            <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>/ 10</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

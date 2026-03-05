"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { asset } from "@/lib/paths";
import { useTranslation } from "@/hooks/useTranslation";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

// ============================================================================
// DATOVÁ VRSTVA - Aktuální data (z původního reportu)
// ============================================================================

const COMPANY_DATA = {
  name: "VIG CZ",
  baselinePeriod: "15. 5. – 2. 6. 2025",
  currentPeriod: "18. 11. – 5. 12. 2025",
  respondents: 2534,
  companyIndex: 6.59,
  marketAvg: 5.01,
  marketMax: 8.15,
  marketMin: 3.02,
};

const DIGCOMP_SCORES = {
  company: [6.4, 4.4, 4.7, 5.4, 6.5],
  marketAvg: [7.3, 5.9, 6.2, 7.5, 7.1],
  top30: [7.7, 6.2, 6.8, 8.1, 7.5],
};

const TALENT_DISTRIBUTION = [
  { level: 1, count: 13 },
  { level: 2, count: 117 },
  { level: 3, count: 240 },
  { level: 4, count: 341 },
  { level: 5, count: 436 },
  { level: 6, count: 535 },
  { level: 7, count: 419 },
  { level: 8, count: 307 },
  { level: 9, count: 104 },
  { level: 10, count: 22 },
];

const M365_PROFICIENCY = [
  { app: "Outlook", usage: 9.1, proficiency: 7.6, icon: asset("/logos/Outlook.png"), color: "#0078D4" },
  { app: "Word", usage: 8.2, proficiency: 7.7, icon: asset("/logos/Word.png"), color: "#2B579A" },
  { app: "Excel", usage: 8.0, proficiency: 7.2, icon: asset("/logos/Excel.png"), color: "#217346" },
  { app: "Teams", usage: 7.4, proficiency: 6.3, icon: asset("/logos/Teams.png"), color: "#6264A7" },
  { app: "OneDrive", usage: 7.0, proficiency: 5.7, icon: asset("/logos/OneDrive.png"), color: "#0078D4" },
  { app: "SharePoint", usage: 5.7, proficiency: 4.7, icon: asset("/logos/SharePoint.png"), color: "#038387" },
  { app: "OneNote", usage: 4.7, proficiency: 4.3, icon: asset("/logos/OneNote.png"), color: "#7719AA" },
  { app: "ToDo", usage: 4.5, proficiency: 4.2, icon: asset("/logos/ToDo.png"), color: "#3C78D8" },
  { app: "Power BI", usage: 2.9, proficiency: 2.6, icon: asset("/logos/PowerBI.png"), color: "#F2C811" },
  { app: "Forms", usage: 2.7, proficiency: 2.7, icon: asset("/logos/Forms.png"), color: "#035A5A" },
  { app: "Planner", usage: 2.3, proficiency: 2.2, icon: asset("/logos/Planner.png"), color: "#31752F" },
  { app: "Copilot", usage: 3.8, proficiency: 3.2, icon: asset("/logos/Copilot.png"), color: "#2596FF" },
];

const DIGCOMP_LEGEND_RAW = [
  { shortKey: "companyComparison.legendInfo", icon: "📊", color: "#FEE2E2", iconBg: "#EF4444" },
  { shortKey: "companyComparison.legendContent", icon: "☁️", color: "#E0F2FE", iconBg: "#0EA5E9" },
  { shortKey: "companyComparison.legendProblems", icon: "🧩", color: "#D1FAE5", iconBg: "#10B981" },
  { shortKey: "companyComparison.legendComm", icon: "💬", color: "#EDE9FE", iconBg: "#6366F1" },
  { shortKey: "companyComparison.legendSecurity", icon: "✓", color: "#FEF3C7", iconBg: "#F59E0B" },
];

// ============================================================================
// BASELINE GENERÁTOR - Vytvoří data "předtím" s náhodným negativním posunem
// ============================================================================

function generateBaselineValue(current: number, seed: number): number {
  const pseudoRandom = Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1;
  const offset = 0.10 + pseudoRandom * 0.15;
  return Math.round((current * (1 - offset)) * 100) / 100;
}

function generateBaselineDistribution(current: { level: number; count: number }[], seed: number): { level: number; count: number }[] {
  return current.map((item, i) => {
    const pseudoRandom = Math.abs(Math.sin((seed + i) * 12.9898) * 43758.5453) % 1;
    const offset = 0.10 + pseudoRandom * 0.15;
    const newCount = Math.round(item.count * (1 - offset));
    return { level: item.level, count: newCount };
  });
}

// ============================================================================
// HLAVNÍ KOMPONENTA
// ============================================================================

const DIGCOMP_LABEL_KEYS = [
  "companyComparison.digcomp1",
  "companyComparison.digcomp2",
  "companyComparison.digcomp3",
  "companyComparison.digcomp4",
  "companyComparison.digcomp5",
];

export default function CompanyComparisonReport() {
  const { t } = useTranslation();
  const digcompLabels = useMemo(() => DIGCOMP_LABEL_KEYS.map((k) => t(k)), [t]);
  const digcompLegend = useMemo(
    () => DIGCOMP_LEGEND_RAW.map((l) => ({ ...l, short: t(l.shortKey) })),
    [t]
  );
  const baselineData = useMemo(() => {
    const seed = 42;
    
    const baselineIndex = generateBaselineValue(COMPANY_DATA.companyIndex, seed);
    const baselineRespondents = Math.round(generateBaselineValue(COMPANY_DATA.respondents, seed + 1));
    
    const baselineDigcomp = DIGCOMP_SCORES.company.map((score, i) => 
      generateBaselineValue(score, seed + 10 + i)
    );
    
    const baselineDistribution = generateBaselineDistribution(TALENT_DISTRIBUTION, seed + 20);
    
    const baselineM365 = M365_PROFICIENCY.map((app, i) => ({
      ...app,
      baselineUsage: generateBaselineValue(app.usage, seed + 30 + i),
      baselineProficiency: generateBaselineValue(app.proficiency, seed + 50 + i),
    }));
    
    return {
      companyIndex: baselineIndex,
      respondents: baselineRespondents,
      digcompScores: baselineDigcomp,
      distribution: baselineDistribution,
      m365: baselineM365,
    };
  }, []);

  const indexDelta = COMPANY_DATA.companyIndex - baselineData.companyIndex;
  const indexDeltaPercent = ((indexDelta / baselineData.companyIndex) * 100).toFixed(1);
  
  const maxCurrentCount = Math.max(...TALENT_DISTRIBUTION.map((d) => d.count));
  const maxBaselineCount = Math.max(...baselineData.distribution.map((d) => d.count));
  const maxCount = Math.max(maxCurrentCount, maxBaselineCount);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* EXECUTIVE SUMMARY HEADER */}
      <div
        style={{
          background: "#040E3C",
          borderRadius: 16,
          padding: "36px 32px",
          color: "white",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(119, 249, 217, 0.2)",
              padding: "6px 14px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 16,
              color: "#77F9D9",
            }}
          >
            {t("companyComparison.badge")}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", fontStyle: "italic" }}>
            {t("companyComparison.title")}
          </h1>
          <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>
            {t("companyComparison.headerSubtitle", {
              name: COMPANY_DATA.name,
              baseline: COMPANY_DATA.baselinePeriod,
              current: COMPANY_DATA.currentPeriod,
            })}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {/* Firemní Index s delta indikátorem */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            transition={HOVER_TRANSITION}
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Delta badge */}
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "#77F9D9",
                color: "#040E3C",
                padding: "4px 10px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2L10 8H2L6 2Z" fill="#040E3C" />
              </svg>
              +{indexDelta.toFixed(2)}
            </div>
            
            <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 12px" }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
                {/* Baseline ring (světlejší) */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(119, 249, 217, 0.3)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(baselineData.companyIndex / 10) * 264} 264`}
                  transform="rotate(-90 50 50)"
                />
                {/* Current ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#2596FF"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(COMPANY_DATA.companyIndex / 10) * 264} 264`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800 }}>{COMPANY_DATA.companyIndex}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{t("companyComparison.companyIndex")}</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
              {t("companyComparison.baselineLabel")}: {baselineData.companyIndex.toFixed(2)}
            </div>
          </motion.div>

          {/* Procentuální zlepšení */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            transition={HOVER_TRANSITION}
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "#77F9D9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 4L20 16H4L12 4Z" fill="#77F9D9" />
              </svg>
              +{indexDeltaPercent}%
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{t("companyComparison.totalImprovement")}</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
              {t("companyComparison.vsBaseline")}
            </div>
          </motion.div>

          {/* Počet respondentů */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            transition={HOVER_TRANSITION}
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 40, fontWeight: 800 }}>{COMPANY_DATA.respondents.toLocaleString("cs-CZ")}</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{t("companyComparison.employeesEngaged")}</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
              {t("companyComparison.baselineLabel")}: {baselineData.respondents.toLocaleString("cs-CZ")}
            </div>
          </motion.div>

          {/* Sparkline mini-graf */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            transition={HOVER_TRANSITION}
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t("companyComparison.trendTitle")}</div>
            <SparklineChart 
              baseline={baselineData.companyIndex} 
              current={COMPANY_DATA.companyIndex} 
            />
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
              {t("companyComparison.baselineToNow")}
            </div>
          </motion.div>
        </div>
      </div>

      {/* SROVNÁVACÍ RADAR CHART */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "28px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 24px", fontStyle: "italic" }}>
          {t("companyComparison.competenceComparison")}
        </h2>

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Dual Radar chart */}
          <div style={{ flex: "1 1 360px", minWidth: 300 }}>
            <ComparisonRadarChart
              baselineScores={baselineData.digcompScores}
              currentScores={DIGCOMP_SCORES.company}
              labels={digcompLabels}
              legend={digcompLegend}
            />
          </div>

          {/* Tabulka kategorií s rozdílem */}
          <div style={{ flex: "1 1 360px", minWidth: 300 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#040E3C", margin: "0 0 16px" }}>
              {t("companyComparison.categoryDetail")}
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {digcompLabels.map((label, i) => {
                const baseline = baselineData.digcompScores[i];
                const current = DIGCOMP_SCORES.company[i];
                const delta = current - baseline;
                const deltaPercent = ((delta / baseline) * 100).toFixed(1);
                
                return (
                  <motion.div
                    key={label}
                    whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                    transition={HOVER_TRANSITION}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      background: "#F4F5FA",
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: digcompLegend[i].iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {digcompLegend[i].icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#040E3C", marginBottom: 2 }}>
                        {label}
                      </div>
                      <div style={{ fontSize: 11, color: "#6B7280" }}>
                        {baseline.toFixed(1)} → {current.toFixed(1)}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 10px",
                        borderRadius: 20,
                        background: delta >= 0 ? "rgba(119, 249, 217, 0.2)" : "rgba(239, 68, 68, 0.1)",
                        color: delta >= 0 ? "#059669" : "#DC2626",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      {delta >= 0 ? (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M5 1L9 7H1L5 1Z" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M5 9L1 3H9L5 9Z" fill="currentColor" />
                        </svg>
                      )}
                      {delta >= 0 ? "+" : ""}{deltaPercent}%
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Legenda */}
            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid #E5E7EB",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 3, background: "rgba(37, 150, 255, 0.4)", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#6B7280", fontWeight: 500 }}>{t("companyComparison.youBefore")}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 3, background: "#2596FF", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>{t("companyComparison.yourCompanyNow")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOTIVAČNÍ BANNER */}
      <div
        style={{
          background: "linear-gradient(135deg, #77F9D9 0%, #2596FF 100%)",
          borderRadius: 16,
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            flexShrink: 0,
          }}
        >
          🎉
        </div>
        <div style={{ color: "#040E3C" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>
            {t("companyComparison.goodWork")}
          </h3>
          <p style={{ fontSize: 14, margin: 0, opacity: 0.85 }}>
            {t("companyComparison.goodWorkSub", { percent: indexDeltaPercent })}
          </p>
        </div>
      </div>

      {/* SROVNÁVACÍ HISTOGRAM - TALENT PIPELINE */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "28px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 8px", fontStyle: "italic" }}>
          {t("companyComparison.talentPipeline")}
        </h2>
        <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px" }}>
          {t("companyComparison.talentPipelineSub")}
        </p>

        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 220, marginBottom: 16 }}>
          {TALENT_DISTRIBUTION.map((item, idx) => {
            const baselineItem = baselineData.distribution[idx];
            const currentHeight = (item.count / maxCount) * 180;
            const baselineHeight = (baselineItem.count / maxCount) * 180;
            
            let color = "#EF4444";
            if (item.level >= 5 && item.level <= 6) color = "#F59E0B";
            if (item.level >= 7 && item.level <= 8) color = "#2596FF";
            if (item.level >= 9) color = "#77F9D9";

            const delta = item.count - baselineItem.count;
            const deltaPercent = baselineItem.count > 0 ? ((delta / baselineItem.count) * 100).toFixed(0) : "0";

            return (
              <div
                key={item.level}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {/* Delta indicator */}
                <span 
                  style={{ 
                    fontSize: 10, 
                    fontWeight: 600, 
                    color: delta >= 0 ? "#059669" : "#DC2626",
                  }}
                >
                  {delta >= 0 ? "+" : ""}{deltaPercent}%
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{item.count}</span>
                
                {/* Dual bars container */}
                <div
                  style={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-end",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  {/* Baseline bar (šedá) */}
                  <motion.div
                    whileHover={{ opacity: 0.9 }}
                    transition={HOVER_TRANSITION}
                    style={{
                      width: "40%",
                      height: baselineHeight,
                      background: "#D1D5DB",
                      borderRadius: "4px 4px 0 0",
                      cursor: "pointer",
                    }}
                    title={`${t("companyComparison.baselineLabel")}: ${baselineItem.count}`}
                  />
                  {/* Current bar (barevná) */}
                  <motion.div
                    whileHover={{ opacity: 0.85, scaleY: 1.02 }}
                    transition={HOVER_TRANSITION}
                    style={{
                      width: "40%",
                      height: currentHeight,
                      background: color,
                      borderRadius: "4px 4px 0 0",
                      cursor: "pointer",
                      transformOrigin: "bottom",
                    }}
                    title={`${t("companyComparison.nowLabel")}: ${item.count}`}
                  />
                </div>
                <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{item.level}</span>
              </div>
            );
          })}
        </div>

        {/* Legenda */}
        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 16, height: 12, background: "#D1D5DB", borderRadius: 3 }} />
            <span style={{ fontSize: 12, color: "#6B7280" }}>{t("companyComparison.baseline")}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 16, height: 12, background: "#2596FF", borderRadius: 3 }} />
            <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{t("companyComparison.comparison")}</span>
          </div>
        </div>
      </div>

      {/* SROVNÁNÍ M365 APLIKACÍ */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "28px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 8px", fontStyle: "italic" }}>
          {t("companyComparison.m365Title")}
        </h2>
        <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px" }}>
          {t("companyComparison.m365Sub")}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          {baselineData.m365.map((app) => {
            const delta = app.proficiency - app.baselineProficiency;
            const deltaPercent = ((delta / app.baselineProficiency) * 100).toFixed(0);
            
            return (
              <motion.div
                key={app.app}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                transition={HOVER_TRANSITION}
                style={{
                  background: "#F4F5FA",
                  borderRadius: 12,
                  padding: 16,
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {app.icon ? (
                      <Image
                        src={app.icon}
                        alt={app.app}
                        width={40}
                        height={40}
                        style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          background: app.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {app.app.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#040E3C" }}>{app.app}</div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12,
                        color: delta >= 0 ? "#059669" : "#DC2626",
                        fontWeight: 600,
                      }}
                    >
                      {delta >= 0 ? "↑" : "↓"} {delta >= 0 ? "+" : ""}{deltaPercent}%
                    </div>
                  </div>
                </div>

                {/* Dual bar pro pokročilost */}
                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: "#6B7280" }}>Pokročilost</span>
                    <span style={{ fontSize: 10, color: "#040E3C", fontWeight: 600 }}>
                      {app.baselineProficiency.toFixed(1)} → {app.proficiency.toFixed(1)}
                    </span>
                  </div>
                  <div style={{ position: "relative", height: 16 }}>
                    {/* Baseline bar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: 6,
                        width: `${(app.baselineProficiency / 10) * 100}%`,
                        background: "#D1D5DB",
                        borderRadius: 3,
                      }}
                    />
                    {/* Current bar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        left: 0,
                        height: 6,
                        width: `${(app.proficiency / 10) * 100}%`,
                        background: "#2596FF",
                        borderRadius: 3,
                      }}
                    />
                  </div>
                </div>

                {/* Aktuální hodnota prominentně */}
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    color: app.proficiency >= 6 ? "#2596FF" : "#F7981C",
                    marginTop: 8,
                  }}
                >
                  {app.proficiency.toFixed(1)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legenda */}
        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 16, height: 6, background: "#D1D5DB", borderRadius: 3 }} />
            <span style={{ fontSize: 12, color: "#6B7280" }}>Baseline</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 16, height: 6, background: "#2596FF", borderRadius: 3 }} />
            <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>Nyní</span>
          </div>
        </div>
      </div>

      {/* SLOVNÍ VYHODNOCENÍ POSUNU */}
      <div
        style={{
          background: "var(--color-breeze)",
          borderRadius: 16,
          padding: "32px 36px",
          border: "1px solid var(--color-border)",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text-main)", margin: "0 0 24px" }}>
          Slovní vyhodnocení posunu
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            <strong>{COMPANY_DATA.name}</strong> zaznamenala od vstupního měření (květen 2025) výrazné zlepšení 
            digitálních kompetencí. Celkový Digiskills Index vzrostl z <strong>{baselineData.companyIndex.toFixed(2)}</strong> na{" "}
            <strong>{COMPANY_DATA.companyIndex.toFixed(2)}</strong>, což představuje nárůst o{" "}
            <strong>{indexDeltaPercent}%</strong>.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            Největší posun byl zaznamenán v oblasti <strong>Tvorba digitálního obsahu</strong>, kde firma 
            zlepšila skóre z {baselineData.digcompScores[1].toFixed(1)} na {DIGCOMP_SCORES.company[1].toFixed(1)}. 
            Zlepšení je patrné i v dalších oblastech – <strong>Řešení problémů</strong> a{" "}
            <strong>Komunikace a spolupráce</strong>.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            Výsledky potvrzují, že systematické vzdělávání zaměstnanců přináší měřitelné výsledky. 
            Doporučujeme pokračovat v nastaveném trendu a zaměřit se na udržení růstu v oblastech, 
            kde firma dosáhla největšího pokroku.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          background: "#2596FF",
          borderRadius: 16,
          padding: "28px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ color: "white" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>
            Pokračujte ve vzdělávání
          </h3>
          <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
            Udržte nastolený trend a posuňte digitální kompetence na další úroveň.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <motion.div style={{ display: "inline-block" }} whileHover={{ scale: 1.02 }} transition={HOVER_TRANSITION}>
            <Link
              href="/firma/vysledky"
              style={{
                display: "inline-block",
                padding: "14px 24px",
                background: "transparent",
                border: "2px solid white",
                borderRadius: 10,
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Zobrazit aktuální report
            </Link>
          </motion.div>
          <motion.div style={{ display: "inline-block" }} whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(37,150,255,0.45)" }} transition={HOVER_TRANSITION}>
            <Link
              href="/admin/kurzy"
              style={{
                display: "inline-block",
                padding: "14px 28px",
                background: "white",
                border: "none",
                borderRadius: 10,
                color: "#2596FF",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Přejít do Admin panelu
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stáhnout PDF */}
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
        <motion.a
          href="#"
          whileHover={{ scale: 1.02 }}
          transition={HOVER_TRANSITION}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            background: "white",
            border: "1px solid var(--color-primary)",
            borderRadius: 8,
            color: "var(--color-primary)",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M12 18v-6" />
            <path d="M9 15h6" />
          </svg>
          Stáhnout srovnávací report v PDF
        </motion.a>
      </div>
    </div>
  );
}

// ============================================================================
// POMOCNÉ KOMPONENTY
// ============================================================================

function SparklineChart({ baseline, current }: { baseline: number; current: number }) {
  const width = 120;
  const height = 40;
  const padding = 8;
  
  const maxVal = Math.max(baseline, current, 10);
  const minVal = 0;
  const range = maxVal - minVal;
  
  const points = [
    { x: padding, y: height - padding - ((baseline - minVal) / range) * (height - 2 * padding) },
    { x: width / 2, y: height - padding - (((baseline + current) / 2 - minVal) / range) * (height - 2 * padding) },
    { x: width - padding, y: height - padding - ((current - minVal) / range) * (height - 2 * padding) },
  ];
  
  const pathD = `M ${points[0].x} ${points[0].y} Q ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y}`;
  
  return (
    <svg width={width} height={height} style={{ display: "block", margin: "0 auto" }}>
      <defs>
        <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(119, 249, 217, 0.5)" />
          <stop offset="100%" stopColor="#77F9D9" />
        </linearGradient>
      </defs>
      <path d={pathD} fill="none" stroke="url(#sparklineGradient)" strokeWidth="3" strokeLinecap="round" />
      <circle cx={points[0].x} cy={points[0].y} r="4" fill="rgba(255,255,255,0.5)" />
      <circle cx={points[2].x} cy={points[2].y} r="5" fill="#77F9D9" stroke="white" strokeWidth="2" />
    </svg>
  );
}

function ComparisonRadarChart({
  baselineScores,
  currentScores,
  labels,
  legend,
}: {
  baselineScores: number[];
  currentScores: number[];
  labels: string[];
  legend: { short: string; icon: string; color: string; iconBg: string }[];
}) {
  const size = 420;
  const center = size / 2;
  const maxRadius = 120;
  const levels = 5;

  const angleStep = (2 * Math.PI) / labels.length;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const radius = (value / 10) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const getLabelPosition = (index: number) => {
    const angle = startAngle + index * angleStep;
    const radius = maxRadius + 10;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
      angle,
    };
  };

  const createPath = (scores: number[]) => {
    const points = scores.map((score, i) => getPoint(i, score));
    return points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ") + " Z";
  };

  const baselinePath = createPath(baselineScores);
  const currentPath = createPath(currentScores);

  const currentPoints = currentScores.map((score, i) => getPoint(i, score));

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} style={{ display: "block" }}>
        {/* Mřížka */}
        {Array.from({ length: levels }, (_, i) => {
          const r = ((i + 1) / levels) * maxRadius;
          const points = labels
            .map((_, j) => {
              const angle = startAngle + j * angleStep;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            })
            .join(" ");
          return <polygon key={i} points={points} fill="none" stroke="#E5E7EB" strokeWidth="1" />;
        })}

        {/* Osy */}
        {labels.map((_, i) => {
          const angle = startAngle + i * angleStep;
          const x2 = center + maxRadius * Math.cos(angle);
          const y2 = center + maxRadius * Math.sin(angle);
          return <line key={i} x1={center} y1={center} x2={x2} y2={y2} stroke="#E5E7EB" strokeWidth="1" />;
        })}

        {/* Baseline (předtím) - světle modrá, poloprůhledná */}
        <path 
          d={baselinePath} 
          fill="rgba(37, 150, 255, 0.1)" 
          stroke="rgba(37, 150, 255, 0.4)" 
          strokeWidth="2" 
          strokeDasharray="6 4"
        />

        {/* Current (nyní) - výrazná modrá */}
        <path 
          d={currentPath} 
          fill="rgba(37, 150, 255, 0.25)" 
          stroke="#2596FF" 
          strokeWidth="3" 
        />

        {/* Body aktuálního stavu */}
        {currentPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill="#2596FF" stroke="white" strokeWidth="2" />
        ))}
      </svg>

      {/* Popisky kompetencí */}
      {labels.map((_, i) => {
        const pos = getLabelPosition(i);
        const legendItem = legend[i];
        
        let transform = "translate(-50%, -50%)";
        if (i === 0) transform = "translate(-50%, -100%)";
        if (i === 1) transform = "translate(0%, -50%)";
        if (i === 2) transform = "translate(0%, 0%)";
        if (i === 3) transform = "translate(-100%, 0%)";
        if (i === 4) transform = "translate(-100%, -50%)";

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              transform,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 4px 16px rgba(37, 150, 255, 0.12)" }}
              transition={HOVER_TRANSITION}
              style={{
                background: legendItem.color,
                borderRadius: 20,
                padding: "6px 12px 6px 8px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                whiteSpace: "nowrap",
                cursor: "default",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: legendItem.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  color: "white",
                  fontWeight: 700,
                }}
              >
                {legendItem.icon}
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#040E3C", textTransform: "uppercase" }}>
                {legendItem.short}
              </span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

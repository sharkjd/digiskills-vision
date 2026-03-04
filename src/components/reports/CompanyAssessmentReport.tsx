"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { asset } from "@/lib/paths";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

const DIGCOMP_LABEL_KEYS = [
  "companyReport.digcompInfo",
  "companyReport.digcompContent",
  "companyReport.digcompProblems",
  "companyReport.digcompComm",
  "companyReport.digcompSecurity",
] as const;

const LEVEL_GROUP_KEYS = [
  "companyReport.beginners",
  "companyReport.intermediate",
  "companyReport.advanced",
  "companyReport.experts",
] as const;

const COMPANY_DATA = {
  name: "VIG CZ",
  period: "18. 11. – 5. 12. 2025",
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


const IMPROVEMENT_PRIORITIES = [
  { area: "Automatizace rutinní práce", count: 1288 },
  { area: "Zapojení AI do každodenní práce", count: 1281 },
  { area: "Zvládání složitých procesů", count: 962 },
  { area: "Sdílení informací a know-how", count: 843 },
  { area: "Přehled úkolů a práce na projektech", count: 533 },
];

const AMBASSADORS = [
  { name: "Marie Nováková", index: 9.2 },
  { name: "Petr Svoboda", index: 8.7 },
  { name: "Eva Horáková", index: 8.4 },
  { name: "Jan Procházka", index: 8.1 },
  { name: "Lucie Dvořáková", index: 7.9 },
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

const RECOMMENDED_COURSES_CONFIG = [
  { id: 2, titleKey: "companyReport.course1Title", descKey: "companyReport.course1Desc", image: asset("/courses/Automatizace.webp"), durationKey: "3", levelKey: "assessmentLevels.advanced", priorityKey: "companyReport.priorityHigh", priorityLevel: "high" as const },
  { id: 3, titleKey: "companyReport.course2Title", descKey: "companyReport.course2Desc", image: asset("/courses/AI.webp"), durationKey: "1.5", levelKey: "assessmentLevels.beginner", priorityKey: "companyReport.priorityHigh", priorityLevel: "high" as const },
  { id: 5, titleKey: "companyReport.course3Title", descKey: "companyReport.course3Desc", image: asset("/courses/security.png"), durationKey: "1.5", levelKey: "assessmentLevels.beginner", priorityKey: "companyReport.priorityMedium", priorityLevel: "medium" as const },
  { id: 4, titleKey: "companyReport.course4Title", descKey: "companyReport.course4Desc", image: asset("/courses/excel.webp"), durationKey: "2.5", levelKey: "assessmentLevels.intermediate", priorityKey: "companyReport.priorityMedium", priorityLevel: "medium" as const },
  { id: 1, titleKey: "companyReport.course5Title", descKey: "companyReport.course5Desc", image: asset("/courses/teams.webp"), durationKey: "2", levelKey: "assessmentLevels.intermediate", priorityKey: "companyReport.priorityMedium", priorityLevel: "medium" as const },
];

export default function CompanyAssessmentReport() {
  const { t } = useTranslation();
  const DIGCOMP_LABELS = DIGCOMP_LABEL_KEYS.map((k) => t(k));
  const DIGCOMP_LEGEND = [
    { short: t("companyReport.legendInfo"), icon: "📊", color: "#FEE2E2", iconBg: "#EF4444" },
    { short: t("companyReport.legendContent"), icon: "☁️", color: "#E0F2FE", iconBg: "#0EA5E9" },
    { short: t("companyReport.legendProblems"), icon: "🧩", color: "#D1FAE5", iconBg: "#10B981" },
    { short: t("companyReport.legendComm"), icon: "💬", color: "#EDE9FE", iconBg: "#6366F1" },
    { short: t("companyReport.legendSecurity"), icon: "✓", color: "#FEF3C7", iconBg: "#F59E0B" },
  ];
  const RECOMMENDED_COURSES = RECOMMENDED_COURSES_CONFIG.map((c) => ({
    id: c.id,
    title: t(c.titleKey),
    description: t(c.descKey),
    image: c.image,
    duration: c.durationKey,
    level: t(c.levelKey),
    priority: t(c.priorityKey),
    priorityLevel: c.priorityLevel,
  }));
  const LEVEL_GROUPS = LEVEL_GROUP_KEYS.map((key, i) => {
    const data = [
      { percent: 28, top30: 18, color: "#EF4444" },
      { percent: 38, top30: 23, color: "#F59E0B" },
      { percent: 29, top30: 39, color: "#2596FF" },
      { percent: 5, top30: 20, color: "#77F9D9" },
    ][i];
    return { name: t(key), ...data };
  });

  const maxCount = Math.max(...TALENT_DISTRIBUTION.map((d) => d.count));
  const maxPriority = Math.max(...IMPROVEMENT_PRIORITIES.map((p) => p.count));
  const indexDiff = COMPANY_DATA.companyIndex - COMPANY_DATA.marketAvg;
  const indexDiffPercent = ((indexDiff / COMPANY_DATA.marketAvg) * 100).toFixed(1);

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
              background: "rgba(255,255,255,0.15)",
              padding: "6px 14px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Executive Summary
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", fontStyle: "italic" }}>
            Firemní Assessment Report
          </h1>
          <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>
            {COMPANY_DATA.name} • {COMPANY_DATA.period}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {/* Firemní Index */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            transition={HOVER_TRANSITION}
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
            }}
          >
            <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 12px" }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
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
            <div style={{ fontSize: 14, fontWeight: 600 }}>Firemní Digiskills Index</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Max. trhu: {COMPANY_DATA.marketMax}</div>
          </motion.div>

          {/* Srovnání s benchmarkem */}
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
                fontSize: 40,
                fontWeight: 800,
                color: indexDiff >= 0 ? "#77F9D9" : "#F7981C",
              }}
            >
              {indexDiff >= 0 ? "+" : ""}
              {indexDiffPercent}%
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>vs. Průměr trhu</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
              Trh: {COMPANY_DATA.marketAvg} • Vy: {COMPANY_DATA.companyIndex}
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
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>Zapojených zaměstnanců</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Období: {COMPANY_DATA.period}</div>
          </motion.div>
        </div>
      </div>

      {/* RADAR CHART - POROVNÁNÍ KOMPETENCÍ */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "28px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 24px", fontStyle: "italic" }}>
          Porovnání kompetencí dle DigComp
        </h2>

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Radar chart (pavouk) */}
          <div style={{ flex: "1 1 360px", minWidth: 300 }}>
            <CompanyRadarChart
              companyScores={DIGCOMP_SCORES.company}
              marketAvg={DIGCOMP_SCORES.marketAvg}
              top30={DIGCOMP_SCORES.top30}
              labels={DIGCOMP_LABELS}
              legend={DIGCOMP_LEGEND}
            />
          </div>

          {/* Digiskills Index chart + legend */}
          <div style={{ flex: "1 1 360px", minWidth: 300 }}>
            <DigiskillsIndexChart
              companyIndex={COMPANY_DATA.companyIndex}
              marketAvg={COMPANY_DATA.marketAvg}
              marketMin={COMPANY_DATA.marketMin}
              marketMax={COMPANY_DATA.marketMax}
            />

            {/* Legenda kompetencí */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
              {DIGCOMP_LABELS.map((label, i) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                  transition={HOVER_TRANSITION}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background:
                        DIGCOMP_SCORES.company[i] >= DIGCOMP_SCORES.marketAvg[i] ? "#2596FF" : "#F7981C",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 13, color: "#374151", flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#040E3C", minWidth: 32 }}>
                    {DIGCOMP_SCORES.company[i].toFixed(1)}
                  </span>
                </motion.div>
              ))}
            </div>

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
                <div style={{ width: 16, height: 3, background: "#2596FF", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>Naše firma</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 3, background: "#040E3C", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#040E3C", fontWeight: 500 }}>Průměr trhu</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 3, background: "#0D9488", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#0D9488", fontWeight: 500 }}>Top 30 % trhu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SLOVNÍ VYHODNOCENÍ – separátní box */}
      <div
        style={{
          background: "var(--color-breeze)",
          borderRadius: 16,
          padding: "32px 36px",
          border: "1px solid var(--color-border)",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text-main)", margin: "0 0 24px" }}>
          Slovní vyhodnocení
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            <strong>{COMPANY_DATA.name}</strong> dosáhla v hodnoceném období celkového Digiskills Indexu{" "}
            <strong>{COMPANY_DATA.companyIndex.toFixed(2)}</strong>, což je mírně nad průměrem trhu{" "}
            ({COMPANY_DATA.marketAvg.toFixed(2)}). S více než {COMPANY_DATA.respondents.toLocaleString("cs-CZ")} zapojenými
            zaměstnanci jde o solidní základ pro cílené rozvíjení digitálních kompetencí.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            Nejsilnější oblastí firmy je <strong>Digitální bezpečnost</strong> (skóre {DIGCOMP_SCORES.company[4].toFixed(1)})
            a <strong>Zpracování informací a dat</strong> ({DIGCOMP_SCORES.company[0].toFixed(1)}). Naopak největší
            prostor pro růst představuje <strong>Tvorba digitálního obsahu</strong> ({DIGCOMP_SCORES.company[1].toFixed(1)})
            a <strong>Řešení problémů</strong> ({DIGCOMP_SCORES.company[2].toFixed(1)}), kde firma zaostává za průměrem trhu.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            Doporučujeme zaměřit vzdělávací investice na kurzy podporující tvorbu obsahu, automatizaci a využití AI v
            každodenní práci – v souladu s prioritami, které zaměstnanci sami uvedli v assessmentu. Níže najdete kurzy
            doporučené pro celou organizaci.
          </p>
        </div>
      </div>

      {/* FIREMNÍ SUPERSCHOPNOSTI vs PROSTOR PRO RŮST – pod slovní vyhodnocení */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {/* Superschopnosti firmy – Digi Skills #77F9D9 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={HOVER_TRANSITION}
          style={{
            background: "#77F9D9",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src={asset("/Screenshots/Symbol Dark.png")} alt="" width={28} height={28} style={{ objectFit: "contain" }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#040E3C", margin: 0 }}>
              Firemní superschopnosti
            </h3>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#040E3C", marginBottom: 8 }}>
            Digitální bezpečnost
          </div>
          <p style={{ fontSize: 14, color: "#040E3C", margin: 0, lineHeight: 1.5 }}>
            V této oblasti je firma nad průměrem trhu. Skóre <strong>6,5</strong> ukazuje, 
            že zaměstnanci mají solidní základ v ochraně dat a kybernetické bezpečnosti. 
            Interní bezpečnostní kultura je zdravá.
          </p>
        </motion.div>

        {/* Prostor pro růst firmy – Digi Salmon #FF7575 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={HOVER_TRANSITION}
          style={{
            background: "#FF7575",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(255,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src={asset("/Screenshots/Symbol Dark.png")} alt="" width={28} height={28} style={{ objectFit: "contain" }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#040E3C", margin: 0 }}>
              Firemní prostor pro růst
            </h3>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#040E3C", marginBottom: 8 }}>
            Tvorba digitálního obsahu
          </div>
          <p style={{ fontSize: 14, color: "#040E3C", margin: 0, lineHeight: 1.5 }}>
            Zde má firma největší potenciál se zlepšit. Aktuální skóre <strong>4,4</strong> výrazně 
            zaostává za průměrem trhu (5,9). Cílené kurzy v této oblasti přinesou nejvyšší ROI 
            vzdělávacích investic.
          </p>
        </motion.div>
      </div>

      {/* TALENT PIPELINE - HISTOGRAM */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "28px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 8px", fontStyle: "italic" }}>
          Talent Pipeline
        </h2>
        <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px" }}>
          Distribuce digitálních kompetencí zaměstnanců na škále 1–10
        </p>

        <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 200, marginBottom: 16 }}>
          {TALENT_DISTRIBUTION.map((item) => {
            const height = (item.count / maxCount) * 180;
            let color = "#EF4444";
            if (item.level >= 5 && item.level <= 6) color = "#F59E0B";
            if (item.level >= 7 && item.level <= 8) color = "#2596FF";
            if (item.level >= 9) color = "#77F9D9";

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
                <span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{item.count}</span>
                <motion.div
                  whileHover={{ opacity: 0.85, scaleY: 1.02 }}
                  transition={HOVER_TRANSITION}
                  style={{
                    width: "100%",
                    height,
                    background: color,
                    borderRadius: "6px 6px 0 0",
                    cursor: "pointer",
                    transformOrigin: "bottom",
                  }}
                />
                <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{item.level}</span>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginTop: 20 }}>
          {LEVEL_GROUPS.map((group) => (
            <motion.div
              key={group.name}
              whileHover={{ y: -2 }}
              transition={HOVER_TRANSITION}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                background: "#F4F5FA",
                borderRadius: 8,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 3, background: group.color }} />
              <span style={{ fontSize: 12, color: "#374151" }}>{group.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#040E3C" }}>{group.percent}%</span>
              <span style={{ fontSize: 11, color: "#6B7280" }}>(top 30%: {group.top30}%)</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* STRATEGICKÉ PRIORITY + AMBASADOŘI - DVA SLOUPCE */}
      <div style={{ display: "flex", gap: 24, alignItems: "stretch" }}>
        {/* STRATEGICKÉ PRIORITY - HEATMAPA */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: "#F4F5FA",
            borderRadius: 16,
            padding: "28px",
            border: "1px solid #E5E7EB",
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 8px", fontStyle: "italic" }}>
            Strategické priority
          </h2>
          <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px" }}>
            Co chtějí zaměstnanci ve firmě zlepšit – hlasování respondentů
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {IMPROVEMENT_PRIORITIES.map((item, index) => {
              const percentage = ((item.count / maxPriority) * 100).toFixed(0);
              const realPercentage = ((item.count / COMPANY_DATA.respondents) * 100).toFixed(0);
              return (
                <div key={item.area} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: index < 2 ? "#2596FF" : "#040E3C",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#040E3C" }}>{item.area}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#2596FF" }}>{realPercentage}%</span>
                    </div>
                    <div
                      style={{
                        height: 10,
                        background: "white",
                        borderRadius: 5,
                        overflow: "hidden",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${percentage}%`,
                          background: index < 2 ? "#2596FF" : "#9CA3AF",
                          borderRadius: 5,
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: "#6B7280", minWidth: 60, textAlign: "right" }}>
                    {item.count.toLocaleString("cs-CZ")} hlasů
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AMBASADOŘI */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: "white",
            borderRadius: 16,
            padding: "28px",
            border: "1px solid #E5E7EB",
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 24px", fontStyle: "italic" }}>
            Ambasadoři
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {AMBASSADORS.map((person, index) => {
              const initials = person.name
                .split(" ")
                .map((n) => n[0])
                .join("");
              return (
                <div
                  key={person.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "#2596FF",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#040E3C" }}>
                      {person.name}
                    </div>
                    <div style={{ fontSize: 14, color: "#6B7280" }}>
                      {person.index.toFixed(1)} Digiskills Index
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#2596FF",
                    }}
                  >
                    #{index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* APP PROFICIENCY GRID */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "28px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 8px", fontStyle: "italic" }}>
          Pokročilost v M365 aplikacích
        </h2>
        <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px" }}>
          Frekvence používání vs. míra pokročilosti (škála 1–10)
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
            width: "100%",
          }}
        >
          {M365_PROFICIENCY.map((app) => (
            <motion.div
              key={app.app}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              transition={HOVER_TRANSITION}
              style={{
                background: "#F4F5FA",
                borderRadius: 12,
                padding: 16,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  margin: "0 auto 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {app.icon ? (
                  <Image
                    src={app.icon}
                    alt={app.app}
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      background: app.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    {app.app.charAt(0)}
                  </div>
                )}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#040E3C", marginBottom: 8 }}>
                {app.app}
              </div>
              <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 2 }}>Používání</div>
                  <div
                    style={{
                      height: 6,
                      background: "#E5E7EB",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(app.usage / 10) * 100}%`,
                        background: "#2596FF",
                        borderRadius: 3,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 2 }}>Pokročilost</div>
                  <div
                    style={{
                      height: 6,
                      background: "#E5E7EB",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(app.proficiency / 10) * 100}%`,
                        background: "#77F9D9",
                        borderRadius: 3,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  fontWeight: 700,
                  color: app.proficiency >= 6 ? "#2596FF" : "#F7981C",
                }}
              >
                {app.proficiency.toFixed(1)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DOPORUČENÁ FIREMNÍ VZDĚLÁVACÍ CESTA */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#040E3C", margin: "0 0 6px", fontStyle: "italic" }}>
              Strategický výběr kurzů pro celou firmu
            </h2>
            <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
              Na základě assessmentu doporučujeme tyto vzdělávací priority
            </p>
          </div>
          <motion.div style={{ display: "inline-block" }} whileHover={{ scale: 1.02 }} transition={HOVER_TRANSITION}>
            <Link
              href="/admin/kurzy"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background: "transparent",
                border: "2px solid #2596FF",
                borderRadius: 8,
                color: "#2596FF",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2596FF";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#2596FF";
              }}
            >
              Upravit výběr (Admin)
            </Link>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {RECOMMENDED_COURSES.map((course, index) => (
            <CompanyCourseCard key={course.id} course={course} index={index} />
          ))}
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
            Připraveni spustit vzdělávání?
          </h3>
          <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
            Přiřaďte kurzy zaměstnancům a sledujte jejich pokrok v reálném čase.
          </p>
        </div>
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

      {/* Srovnávací report + Stáhnout PDF */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 24 }}>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={HOVER_TRANSITION}>
          <Link
            href="/firma/srovnani"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              background: "rgb(71, 149, 249)",
              border: "none",
              borderRadius: 8,
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M18 9l-5 5-4-4-3 3" />
            </svg>
            Zobrazit srovnávací report
          </Link>
        </motion.div>
        <motion.a
          href="https://digiskillscz.sharepoint.com/sites/Kooperativapojiovna-Intern/Sdilene%20dokumenty/Forms/AllItems.aspx?id=%2Fsites%2FKooperativapojiovna%2DIntern%2FSdilene%20dokumenty%2FIntern%C3%AD%2FAssessment%2FVyhodnoceni%20%2D%20Reporty%2FVIGCZ%5FUvodni%20assessment%20CZ%5F2025%2Epdf&parent=%2Fsites%2FKooperativapojiovna%2DIntern%2FSdilene%20dokumenty%2FIntern%C3%AD%2FAssessment%2FVyhodnoceni%20%2D%20Reporty"
          target="_blank"
          rel="noopener noreferrer"
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
          {/* ikona PDF */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M12 18v-6" />
            <path d="M9 15h6" />
          </svg>
          Stáhnout výsledky v PDF
        </motion.a>
      </div>
    </div>
  );
}

function DigiskillsIndexChart({
  companyIndex,
  marketAvg,
  marketMin,
  marketMax,
}: {
  companyIndex: number;
  marketAvg: number;
  marketMin: number;
  marketMax: number;
}) {
  const chartMin = Math.floor(marketMin);
  const chartMax = Math.ceil(marketMax + 1);
  const range = chartMax - chartMin;

  const companyPercent = ((companyIndex - chartMin) / range) * 100;
  const marketAvgPercent = ((marketAvg - chartMin) / range) * 100;
  const marketMinPercent = ((marketMin - chartMin) / range) * 100;
  const marketMaxPercent = ((marketMax - chartMin) / range) * 100;

  return (
    <div style={{ marginBottom: 16, fontFamily: "var(--font-montserrat), Montserrat, sans-serif", maxWidth: 440, margin: "0 auto 16px" }}>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          fontStyle: "italic",
          color: "#040E3C",
          margin: "0 0 28px",
          fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
        }}
      >
        Digiskills index
      </h3>

      {/* Hodnoty nad grafem */}
      <div style={{ position: "relative", height: 36, marginBottom: 8 }}>
        {/* Min trhu */}
        <div
          style={{
            position: "absolute",
            left: `${marketMinPercent}%`,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontStyle: "italic",
              color: "#6B7280",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {marketMin.toFixed(2).replace(".", ",")}
          </span>
        </div>
        {/* Průměr trhu */}
        <div
          style={{
            position: "absolute",
            left: `${marketAvgPercent}%`,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontStyle: "italic",
              color: "#040E3C",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {marketAvg.toFixed(2).replace(".", ",")}
          </span>
        </div>
        {/* Vaše firma – hlavní dominantní hodnota */}
        <div
          style={{
            position: "absolute",
            left: `${companyPercent}%`,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              fontStyle: "italic",
              color: "#F7981C",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {companyIndex.toFixed(2).replace(".", ",")}
          </span>
        </div>
        {/* Max trhu */}
        <div
          style={{
            position: "absolute",
            left: `${marketMaxPercent}%`,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontStyle: "italic",
              color: "#6B7280",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {marketMax.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>

      {/* Hlavní pruh grafu se zkosením 11,3° – charakteristický brand prvek */}
      <div
        style={{
          position: "relative",
          height: 44,
          transform: "skewX(-11.3deg)",
          transformOrigin: "center center",
        }}
      >
        {/* Vrstva 1: barevný pruh s gradientem Digi Azure → Digi Skills */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 8,
            overflow: "hidden",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, #2596FF 0%, #77F9D9 100%)",
              borderRadius: 8,
            }}
          />
        </div>

        {/* Vrstva 2: svislé čáry nad pruhem (de-skewed pro rovné čáry) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {/* Čárkovaná čára – Průměr trhu (Digi Sky #040E3C) */}
          <div
            style={{
              position: "absolute",
              left: `${marketAvgPercent}%`,
              top: -10,
              bottom: -10,
              width: 0,
              marginLeft: -1.5,
              borderLeft: "3px dashed #040E3C",
              transform: "skewX(11.3deg)",
            }}
          />
          {/* Čára – Vaše firma (Digi Orange #F7981C) */}
          <div
            style={{
              position: "absolute",
              left: `${companyPercent}%`,
              top: -10,
              bottom: -10,
              width: 3,
              marginLeft: -1.5,
              background: "#F7981C",
              borderRadius: 2,
              transform: "skewX(11.3deg)",
            }}
          />
          {/* Čára – Max trhu (Digi Skills #77F9D9) */}
          <div
            style={{
              position: "absolute",
              left: `${marketMaxPercent}%`,
              top: -10,
              bottom: -10,
              width: 2,
              marginLeft: -1,
              background: "#77F9D9",
              borderRadius: 1,
              transform: "skewX(11.3deg)",
            }}
          />
        </div>
      </div>

      {/* Popisky pod grafem – s dostatečným whitespace */}
      <div style={{ position: "relative", height: 28, marginTop: 14 }}>
        <div
          style={{
            position: "absolute",
            left: `${marketMinPercent}%`,
            transform: "translateX(-50%)",
            fontSize: 12,
            fontStyle: "italic",
            color: "#2596FF",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Min trhu
        </div>
        <div
          style={{
            position: "absolute",
            left: `${marketAvgPercent}%`,
            transform: "translateX(-50%)",
            fontSize: 12,
            fontStyle: "italic",
            color: "#040E3C",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Průměr trhu
        </div>
        <div
          style={{
            position: "absolute",
            left: `${companyPercent}%`,
            transform: "translateX(-50%)",
            fontSize: 13,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#F7981C",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Vaše firma
        </div>
        <div
          style={{
            position: "absolute",
            left: `${marketMaxPercent}%`,
            transform: "translateX(-50%)",
            fontSize: 12,
            fontStyle: "italic",
            color: "#77F9D9",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Max trhu
        </div>
      </div>
    </div>
  );
}

function CompanyRadarChart({
  companyScores,
  marketAvg,
  top30,
  labels,
  legend,
}: {
  companyScores: number[];
  marketAvg: number[];
  top30: number[];
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

  const companyPath = createPath(companyScores);
  const marketPath = createPath(marketAvg);
  const top30Path = createPath(top30);

  const companyPoints = companyScores.map((score, i) => getPoint(i, score));

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

        {/* Top 30 % */}
        <path d={top30Path} fill="rgba(13, 148, 136, 0.15)" stroke="#0D9488" strokeWidth="2" />

        {/* Průměr trhu */}
        <path d={marketPath} fill="rgba(4, 14, 60, 0.08)" stroke="#040E3C" strokeWidth="2" />

        {/* Naše firma */}
        <path d={companyPath} fill="rgba(37, 150, 255, 0.25)" stroke="#2596FF" strokeWidth="3" />

        {/* Body firmy */}
        {companyPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill="#2596FF" stroke="white" strokeWidth="2" />
        ))}
      </svg>

      {/* Popisky kompetencí jako HTML elementy kolem grafu */}
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

function CompanyCourseCard({
  course,
  index,
}: {
  course: {
    id: number;
    title: string;
    description: string;
    image: string;
    duration: string;
    level: string;
    priority: string;
    priorityLevel: "high" | "medium";
  };
  index: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
      transition={HOVER_TRANSITION}
      style={{
        background: "white",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Priority Badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: course.priorityLevel === "high" ? "#EF4444" : "#F59E0B",
          color: "white",
          padding: "4px 10px",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          zIndex: 10,
        }}
      >
        #{index + 1} • {course.priority}
      </div>

      <div
        style={{
          height: 140,
          flexShrink: 0,
          position: "relative",
          background: "#F1F5F9",
        }}
      >
        <Image
          src={course.image}
          alt={course.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>

      <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 8px",
                background: "#F3F4F6",
                borderRadius: 6,
                color: "#6B7280",
              }}
            >
              {course.duration}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 8px",
                background: "rgba(37, 150, 255, 0.15)",
                borderRadius: 6,
                color: "#1F80D9",
              }}
            >
              {course.level}
            </span>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#040E3C", margin: "0 0 8px", lineHeight: 1.3 }}>
            {course.title}
          </h3>
          <p style={{ fontSize: 13, color: "#6B7280", margin: 0, lineHeight: 1.5 }}>
            {course.description}
          </p>
        </div>

        <motion.button
          whileHover={{ boxShadow: "0 4px 12px rgba(4,14,60,0.25)" }}
          transition={HOVER_TRANSITION}
          style={{
            width: "100%",
            marginTop: 16,
            padding: "12px 20px",
            background: "#040E3C",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2596FF")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#040E3C")}
        >
          Přiřadit zaměstnancům
        </motion.button>
      </div>
    </motion.div>
  );
}

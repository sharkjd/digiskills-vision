"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useRecommendedCourses } from "@/context/RecommendedCoursesContext";
import { getCourseList, type Course } from "@/data/courses";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { asset } from "@/lib/paths";
import { CourseReplaceModal } from "@/components/shared/CourseReplaceModal";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

type SectionData = {
  q1: number;
  q2: number;
  tools: string[];
};

type FormData = {
  name: string;
  email: string;
  role: string;
  digitalRelationship: number;
  information: SectionData;
  communication: SectionData;
  content: SectionData;
  security: SectionData;
  problemsolving: SectionData;
  ai: { score: number; tools: string[] };
};

type AssessmentSummaryProps = {
  formData: FormData;
  SECTIONS: {
    key: string;
    icon: string;
    title: string;
    description: string;
  }[];
};

const DIGCOMP_LABEL_KEYS = [
  "assessmentSummary.digcompInfo",
  "assessmentSummary.digcompComm",
  "assessmentSummary.digcompContent",
  "assessmentSummary.digcompSecurity",
  "assessmentSummary.digcompProblems",
] as const;

const DIGCOMP_LEGEND_KEYS = [
  "assessmentSummary.legendInfo",
  "assessmentSummary.legendComm",
  "assessmentSummary.legendContent",
  "assessmentSummary.legendSecurity",
  "assessmentSummary.legendProblems",
] as const;

const COMPANY_AVG = [6.4, 5.4, 4.4, 6.5, 4.7];

const BENCHMARK_DATA = {
  myScore: 7.3,
  companyAvg: 5.52,
  bestEmployee: 9.2,
  avgEmployee: 6.1,
};

const RECOMMENDED_APPS = [
  { name: "Power Automate", icon: asset("/logos/Microsoft_Power_Automate.svg.png") },
  { name: "Power BI", icon: asset("/logos/PowerBI.png") },
  { name: "OneNote", icon: asset("/logos/OneNote.png") },
  { name: "Planner", icon: asset("/logos/Planner.png") },
  { name: "Forms", icon: asset("/logos/Forms.png") },
];


export default function AssessmentSummary({ formData, SECTIONS }: AssessmentSummaryProps) {
  const router = useRouter();
  const { setRecommendedCourses } = useRecommendedCourses();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const allCourses = getCourseList(language);

  const [selectedCourses, setSelectedCourses] = useState<Course[]>(() => allCourses.slice(0, 6));
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);

  useEffect(() => {
    setSelectedCourses(getCourseList(language).slice(0, 6));
  }, [language]);

  const getLevelLabel = (score: number): { label: string; description: string } => {
    if (score < 5) return { label: t("assessmentSummary.digitalNewbie"), description: t("assessmentSummary.digitalNewbieDesc") };
    if (score < 7) return { label: t("assessmentSummary.digitalPractitioner"), description: t("assessmentSummary.digitalPractitionerDesc") };
    if (score < 9) return { label: t("assessmentSummary.digitalExpert"), description: t("assessmentSummary.digitalExpertDesc") };
    return { label: t("assessmentSummary.digitalLeader"), description: t("assessmentSummary.digitalLeaderDesc") };
  };

  const getAIFeedback = (score: number): string => {
    if (score < 5) return t("assessmentSummary.aiFeedback1");
    if (score < 7) return t("assessmentSummary.aiFeedback2");
    if (score < 9) return t("assessmentSummary.aiFeedback3");
    return t("assessmentSummary.aiFeedback4");
  };

  const sectionKeys = ["information", "communication", "content", "security", "problemsolving"] as const;

  const userScores = sectionKeys.map((key) => {
    const data = formData[key];
    return (data.q1 + data.q2) / 2;
  });

  const overallScore = userScores.reduce((a, b) => a + b, 0) / userScores.length;
  const levelInfo = getLevelLabel(overallScore);
  const aiFeedback = getAIFeedback(overallScore);

  const DIGCOMP_LABELS = DIGCOMP_LABEL_KEYS.map((k) => t(k));
  const DIGCOMP_LEGEND = DIGCOMP_LEGEND_KEYS.map((short, i) => ({
    short: t(short),
    icon: ["📊", "💬", "☁️", "✓", "🧩"][i],
    color: ["#FEE2E2", "#EDE9FE", "#E0F2FE", "#FEF3C7", "#D1FAE5"][i],
    iconBg: ["#EF4444", "#6366F1", "#0EA5E9", "#F59E0B", "#10B981"][i],
  }));

  const handleContinue = () => {
    setRecommendedCourses(selectedCourses);
    router.push("/moje-kurzy");
  };

  const handleReplaceCourse = (index: number, newCourse: Course) => {
    setSelectedCourses((prev) => {
      const next = [...prev];
      next[index] = newCourse;
      return next;
    });
    setReplacingIndex(null);
  };

  const selectedCourseIds = useMemo(
    () => new Set(selectedCourses.map((c) => c.id)),
    [selectedCourses],
  );

  const strongestIndex = userScores.indexOf(Math.max(...userScores));
  const weakestIndex = userScores.indexOf(Math.min(...userScores));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* HERO SEKCE – Digi Sky #040E3C podle brand manuálu */}
      <div
        style={{
          background: "#040E3C",
          borderRadius: 16,
          padding: "32px 28px",
          color: "white",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 32,
          alignItems: "center",
        }}
      >
        <div>
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
            {levelInfo.label}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>
            {t("assessmentSummary.resultsTitle")}
          </h1>
          <p style={{ fontSize: 15, opacity: 0.85, margin: "0 0 20px", maxWidth: 480, lineHeight: 1.6 }}>
            {aiFeedback}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "#2596FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              {formData.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{formData.name}</div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>{formData.role || "—"}</div>
            </div>
          </div>
        </div>

        {/* Kruhový ukazatel Digiskills Index */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ position: "relative", width: 140, height: 140 }}>
            <svg width="140" height="140" viewBox="0 0 140 140" style={{ display: "block" }}>
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="12"
              />
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="#2596FF"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(overallScore / 10) * 377} 377`}
                transform="rotate(-90 70 70)"
                style={{ transition: "stroke-dasharray 0.6s ease" }}
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
              <div style={{ fontSize: 32, fontWeight: 800 }}>{overallScore.toFixed(1)}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>/ 10</div>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600 }}>{t("assessmentSummary.digiskillsIndex")}</div>
          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
            {t("assessmentSummary.companyRank", { rank: "3", total: "47" })}
          </div>
        </div>
      </div>

      {/* RADAR CHART SEKCE */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "28px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 24px", fontStyle: "italic" }}>
          {t("assessmentSummary.digcompComparison")}
        </h2>

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Radar chart (pavouk) */}
          <div style={{ flex: "1 1 420px", minWidth: 380, overflow: "visible" }}>
            <IndividualRadarChart
              userScores={userScores}
              companyAvg={COMPANY_AVG}
              labels={DIGCOMP_LABELS}
              legend={DIGCOMP_LEGEND}
            />
          </div>

          {/* Digiskills Index chart + legenda */}
          <div style={{ flex: "1 1 360px", minWidth: 300 }}>
            <IndividualDigiskillsIndexChart
              myScore={overallScore}
              companyAvg={BENCHMARK_DATA.companyAvg}
              bestEmployee={BENCHMARK_DATA.bestEmployee}
            />

            {/* Legenda kompetencí */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
              {DIGCOMP_LABELS.map((label, i) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                  transition={HOVER_TRANSITION}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: userScores[i] >= COMPANY_AVG[i] ? "#2596FF" : "#F7981C",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 13, color: "#374151", flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#040E3C", minWidth: 32 }}>
                    {userScores[i].toFixed(1)}
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
                <div style={{ width: 16, height: 3, background: "#F7981C", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>{t("assessmentSummary.myResult")}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 3, background: "#9CA3AF", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#6B7280", fontWeight: 500 }}>{t("assessmentSummary.companyAvg")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SLOVNÍ VYHODNOCENÍ */}
      <div
        style={{
          background: "var(--color-background)",
          borderRadius: 16,
          padding: "32px 36px",
          border: "1px solid var(--color-border)",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 24px" }}>
          {t("assessmentSummary.verbalEvaluation")}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            <strong>{t("assessmentSummary.congrats", { name: formData.name.split(" ")[0] || formData.name })}</strong>{" "}
            {t("assessmentSummary.congratsText1")} <strong>{levelInfo.label}</strong>.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            {t("assessmentSummary.congratsText2")} <strong>Digiskills Index {overallScore.toFixed(1).replace(".", ",")}</strong>{" "}
            {t("assessmentSummary.congratsText2Suffix")}
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            {t("assessmentSummary.congratsText3")} <strong>{DIGCOMP_LABELS[strongestIndex]}</strong>,{" "}
            {t("assessmentSummary.congratsText3Suffix")} <strong>({userScores[strongestIndex].toFixed(1).replace(".", ",")})</strong>{" "}
            {t("assessmentSummary.congratsText3End")}
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            {t("assessmentSummary.congratsText4")} <strong>{DIGCOMP_LABELS[weakestIndex]}</strong>.{" "}
            {t("assessmentSummary.congratsText4Suffix")}
          </p>
        </div>
      </div>

      {/* SILNÉ STRÁNKY vs PŘÍLEŽITOSTI – Digi Skills a Digi Orange */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {/* Superschopnosti – Digi Skills #77F9D9 */}
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
              {t("assessmentSummary.yourSuperpowers")}
            </h3>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#040E3C", marginBottom: 8 }}>
            {DIGCOMP_LABELS[strongestIndex]}
          </div>
          <p style={{ fontSize: 14, color: "#040E3C", margin: 0, lineHeight: 1.5 }}>
            {t("assessmentSummary.superpowersDesc")} <strong>{userScores[strongestIndex].toFixed(1)}</strong>{" "}
            {t("assessmentSummary.superpowersDescSuffix")}
          </p>
        </motion.div>

        {/* Prostor pro růst – Digi Salmon #FF7575 */}
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
              {t("assessmentSummary.growthSpace")}
            </h3>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#040E3C", marginBottom: 8 }}>
            {DIGCOMP_LABELS[weakestIndex]}
          </div>
          <p style={{ fontSize: 14, color: "#040E3C", margin: 0, lineHeight: 1.5 }}>
            {t("assessmentSummary.growthSpaceDesc")} <strong>{userScores[weakestIndex].toFixed(1)}</strong>{" "}
            {t("assessmentSummary.growthSpaceDescSuffix")}
          </p>
        </motion.div>
      </div>

      {/* APLIKACE K ROZVOJI – Digi Breeze pozadí */}
      <div
        style={{
          background: "#F4F5FA",
          borderRadius: 16,
          padding: 24,
          border: "1px solid #E5E7EB",
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#040E3C", margin: "0 0 16px" }}>
          {t("assessmentSummary.appsToDevelop")}
        </h3>
        <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 20px" }}>
          {t("assessmentSummary.appsToDevelopDesc")}
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          {RECOMMENDED_APPS.map((app) => (
            <motion.div
              key={app.name}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              transition={HOVER_TRANSITION}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "16px 20px",
                background: "white",
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                flex: 1,
                minWidth: 0,
                cursor: "pointer",
              }}
            >
              <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image
                  src={app.icon}
                  alt={app.name}
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", textAlign: "center" }}>
                {app.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DOPORUČENÉ KURZY */}
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#040E3C", margin: "0 0 20px" }}>
          {t("assessmentSummary.coursesForYou")}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {selectedCourses.map((course, index) => (
            <CourseCard
              key={`${course.id}-${index}`}
              course={course}
              onReplace={() => setReplacingIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* MODAL VÝBĚRU NÁHRADY – velké karty s náhledy (ze admin/kurzy) */}
      <AnimatePresence>
        {replacingIndex !== null && selectedCourses[replacingIndex] && (
          <CourseReplaceModal
            slotIndex={replacingIndex}
            currentCourse={selectedCourses[replacingIndex]}
            selectedCourseIds={selectedCourseIds}
            onSelect={(course) => handleReplaceCourse(replacingIndex, course)}
            onClose={() => setReplacingIndex(null)}
          />
        )}
      </AnimatePresence>

      {/* CTA – Digi Azure #2596FF */}
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
            {t("assessmentSummary.readyToMove")}
          </h3>
          <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
            {t("assessmentSummary.readyToMoveDesc")}
          </p>
        </div>
        <motion.button
          onClick={handleContinue}
          whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(37,150,255,0.45)" }}
          transition={HOVER_TRANSITION}
          style={{
            background: "white",
            color: "#2596FF",
            border: "none",
            borderRadius: 10,
            padding: "14px 32px",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F5FA")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
        >
          {t("assessmentSummary.continueToCourses")}
        </motion.button>
      </div>
    </div>
  );
}

function IndividualDigiskillsIndexChart({
  myScore,
  companyAvg,
  bestEmployee,
}: {
  myScore: number;
  companyAvg: number;
  bestEmployee: number;
}) {
  const { t } = useTranslation();
  const chartMin = Math.floor(companyAvg - 1);
  const chartMax = Math.ceil(bestEmployee + 1);
  const range = chartMax - chartMin;

  const myPercent = ((myScore - chartMin) / range) * 100;
  const companyAvgPercent = ((companyAvg - chartMin) / range) * 100;
  const bestEmployeePercent = ((bestEmployee - chartMin) / range) * 100;

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
        {t("assessmentSummary.digiskillsIndex")}
      </h3>

      {/* Hodnoty nad grafem */}
      <div style={{ position: "relative", height: 36, marginBottom: 8 }}>
        {/* Průměr firmy */}
        <div
          style={{
            position: "absolute",
            left: `${companyAvgPercent}%`,
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
            {companyAvg.toFixed(2).replace(".", ",")}
          </span>
        </div>
        {/* Já – hlavní dominantní hodnota */}
        <div
          style={{
            position: "absolute",
            left: `${myPercent}%`,
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
            {myScore.toFixed(2).replace(".", ",")}
          </span>
        </div>
        {/* Nejlepší zaměstnanec */}
        <div
          style={{
            position: "absolute",
            left: `${bestEmployeePercent}%`,
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
            {bestEmployee.toFixed(2).replace(".", ",")}
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
          {/* Čárkovaná čára – Průměr firmy (Digi Sky #040E3C) */}
          <div
            style={{
              position: "absolute",
              left: `${companyAvgPercent}%`,
              top: -10,
              bottom: -10,
              width: 0,
              marginLeft: -1.5,
              borderLeft: "3px dashed #040E3C",
              transform: "skewX(11.3deg)",
            }}
          />
          {/* Čára – Já (Digi Orange #F7981C) */}
          <div
            style={{
              position: "absolute",
              left: `${myPercent}%`,
              top: -10,
              bottom: -10,
              width: 3,
              marginLeft: -1.5,
              background: "#F7981C",
              borderRadius: 2,
              transform: "skewX(11.3deg)",
            }}
          />
          {/* Čára – Nejlepší zaměstnanec (Digi Skills #77F9D9) */}
          <div
            style={{
              position: "absolute",
              left: `${bestEmployeePercent}%`,
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
            left: `${companyAvgPercent}%`,
            transform: "translateX(-50%)",
            fontSize: 12,
            fontStyle: "italic",
            color: "#2596FF",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          {t("assessmentSummary.companyAvg")}
        </div>
        <div
          style={{
            position: "absolute",
            left: `${myPercent}%`,
            transform: "translateX(-50%)",
            fontSize: 13,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#F7981C",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          {t("assessmentSummary.me")}
        </div>
        <div
          style={{
            position: "absolute",
            left: `${bestEmployeePercent}%`,
            transform: "translateX(-50%)",
            fontSize: 12,
            fontStyle: "italic",
            color: "#77F9D9",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          {t("assessmentSummary.best")}
        </div>
      </div>
    </div>
  );
}

function IndividualRadarChart({
  userScores,
  companyAvg,
  labels,
  legend,
}: {
  userScores: number[];
  companyAvg: number[];
  labels: string[];
  legend: { short: string; icon: string; color: string; iconBg: string }[];
}) {
  const size = 320;
  const center = size / 2;
  const maxRadius = 90;
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

  const userPath = createPath(userScores);
  const companyPath = createPath(companyAvg);

  const userPoints = userScores.map((score, i) => getPoint(i, score));

  const containerSize = size + 140;
  const offset = 70;
  
  return (
    <div style={{ position: "relative", width: containerSize, height: containerSize, margin: "0 auto" }}>
      <svg 
        width={size} 
        height={size} 
        style={{ 
          display: "block", 
          overflow: "visible",
          position: "absolute",
          left: offset,
          top: offset,
        }}
      >
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

        {/* Průměr firmy */}
        <path d={companyPath} fill="rgba(156, 163, 175, 0.2)" stroke="#9CA3AF" strokeWidth="2" />

        {/* Uživatelské skóre – Digi Orange */}
        <path d={userPath} fill="rgba(247, 152, 28, 0.25)" stroke="#F7981C" strokeWidth="3" />

        {/* Body uživatele */}
        {userPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill="#F7981C" stroke="white" strokeWidth="2" />
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
              left: pos.x + offset,
              top: pos.y + offset,
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

function CourseCard({ course, onReplace }: { course: Course; onReplace?: () => void }) {
  const { t } = useTranslation();
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
      }}
    >
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
        {onReplace && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReplace();
            }}
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 10px",
              background: "rgba(255,255,255,0.95)",
              border: "1px solid var(--color-primary)",
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 600,
              color: "var(--color-primary)",
              cursor: "pointer",
            }}
          >
            {t("assessmentSummary.replaceCourse")}
          </button>
        )}
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
          whileHover={{ boxShadow: "0 4px 12px rgba(37,150,255,0.35)" }}
          transition={HOVER_TRANSITION}
          style={{
            width: "100%",
            marginTop: 16,
            padding: "12px 20px",
            background: "#2596FF",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1F80D9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#2596FF")}
        >
          {t("dashboard.startStudy")}
        </motion.button>
      </div>
    </motion.div>
  );
}

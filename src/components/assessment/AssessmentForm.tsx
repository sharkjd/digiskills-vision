"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScaleSlider from "./ScaleSlider";
import CheckboxGroup from "./CheckboxGroup";
import { getSections, getInitialData, type FormData, type SectionData, type SectionKey } from "./assessment-data";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import AssessmentSummary from "./AssessmentSummary";

const TOTAL_STEPS = 8;

const STEP_KEYS = [
  "assessment.steps.identification",
  "assessment.steps.information",
  "assessment.steps.communication",
  "assessment.steps.content",
  "assessment.steps.security",
  "assessment.steps.problemsolving",
  "assessment.steps.aiBonus",
  "assessment.steps.submit",
] as const;

const ROLE_KEYS = [
  "assessmentRoles.management",
  "assessmentRoles.hr",
  "assessmentRoles.admin",
  "assessmentRoles.marketing",
  "assessmentRoles.finance",
  "assessmentRoles.production",
  "assessmentRoles.it",
] as const;

const AI_TOOL_KEYS = [
  "assessment.aiTools.microsoftCopilot",
  "assessment.aiTools.designer",
  "assessment.aiTools.dictation",
] as const;

const SLANT_ANGLE = 11.3;
const SLANT_TAN = Math.tan((SLANT_ANGLE * Math.PI) / 180);
const SLIDE_DISTANCE = 100;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? SLIDE_DISTANCE : -SLIDE_DISTANCE,
    y: direction > 0 ? SLIDE_DISTANCE * SLANT_TAN : -SLIDE_DISTANCE * SLANT_TAN,
    opacity: 0,
  }),
  center: { x: 0, y: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? SLIDE_DISTANCE : -SLIDE_DISTANCE,
    y: direction < 0 ? SLIDE_DISTANCE * SLANT_TAN : -SLIDE_DISTANCE * SLANT_TAN,
    opacity: 0,
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function AssessmentForm() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const SECTIONS = getSections(language);
  const INITIAL_DATA = getInitialData(language);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [phase, setPhase] = useState<"form" | "loading" | "report">("form");
  const [direction, setDirection] = useState(1);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const ROLES = ROLE_KEYS.map((k) => t(k));
  const AI_TOOLS = AI_TOOL_KEYS.map((k) => t(k));
  const STEP_LABELS = STEP_KEYS.map((k) => t(k));

  const submitAssessment = () => {
    if (phase !== "form") return;
    setPhase("loading");

    window.setTimeout(() => {
      setPhase("report");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep, phase]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if (e.defaultPrevented) return;
      if (e.repeat) return;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (!containerRef.current) return;
      if (e.target && !containerRef.current.contains(e.target as Node)) return;

      e.preventDefault();

      if (phase !== "form") return;

      if (currentStep < TOTAL_STEPS - 1) {
        setDirection(1);
        setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
        return;
      }

      submitAssessment();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentStep, phase]);

  const progress = Math.round((currentStep / (TOTAL_STEPS - 1)) * 100);

  const updateSection = (key: SectionKey, field: keyof SectionData, value: number | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const goNext = () => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep((s) => s - 1);
  };

  const currentSection = currentStep >= 1 && currentStep <= 5 ? SECTIONS[currentStep - 1] : null;
  const isReport = phase === "report";
  const isLoading = phase === "loading";

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: isReport ? "transparent" : "#F4F5FA",
        padding: "24px 20px",
      }}
    >
      <div style={{ maxWidth: 1020, margin: "0 auto" }}>
        {/* Page header */}
        <div style={{ marginBottom: 20 }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              fontStyle: "italic",
              color: "#040E3C",
              marginBottom: 4,
            }}
          >
            {t("assessment.title")}
          </h1>
          <p style={{ color: "#6B7280", fontSize: 13 }}>
            {isReport
              ? t("assessment.evaluationReport")
              : t("assessment.formStepSubtitle", { current: currentStep + 1, total: TOTAL_STEPS })}
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            background: "#E5E7EB",
            borderRadius: 999,
            height: 6,
            marginBottom: 14,
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            style={{
              height: "100%",
              background: "#2596FF",
              borderRadius: 999,
            }}
          />
        </div>

        {/* Step indicator */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 18,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const isActive = !isReport && i === currentStep;
            const isDone = isReport || i < currentStep;
            return (
              <motion.div
                key={i}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isDone || isActive ? "#2596FF" : "white",
                  borderColor: isDone || isActive ? "#2596FF" : "#E5E7EB",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: "2px solid",
                  color: isDone || isActive ? "white" : "#6B7280",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {isDone ? (
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 7L5.5 10L11.5 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </motion.div>
            );
          })}
          <span
            style={{
              fontSize: 12,
              color: "#6B7280",
              marginLeft: 10,
              fontWeight: 600,
            }}
          >
            {isReport ? t("assessment.evaluation") : STEP_LABELS[currentStep]}
          </span>
        </div>

        {/* Step content card */}
        <div
          style={{
            background: isReport ? "transparent" : "white",
            borderRadius: isReport ? 0 : 20,
            border: "none",
            boxShadow: isReport ? "none" : "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
            padding: isReport ? 0 : "24px 32px",
            marginBottom: 18,
            overflow: "hidden",
          }}
        >
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ display: "grid", placeItems: "center", padding: "32px 0", gap: 10 }}
            >
              <div className="ds-spinner" aria-label={t("assessment.loading")} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, marginBottom: 4, color: "#040E3C", fontSize: 14 }}>{t("assessment.form.evaluating")}</div>
                <div style={{ color: "#6B7280", fontSize: 12 }}>
                  {t("assessment.form.justAMoment")}
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 0: Identifikace */}
            {!isLoading && !isReport && currentStep === 0 && (
              <motion.div
                key="step-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants}>
                    <SectionHeader icon="👤" title={t("assessment.introTitle")} description={t("assessment.introDesc")} />
                  </motion.div>

                  <motion.div variants={itemVariants} style={{ marginBottom: 14 }}>
                    <FieldLabel>{t("assessment.form.fullName")}</FieldLabel>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      style={inputStyle}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} style={{ marginBottom: 18 }}>
                    <FieldLabel>{t("assessment.form.workEmail")}</FieldLabel>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      style={inputStyle}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} style={{ marginBottom: 18 }}>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#040E3C",
                        marginBottom: 10,
                      }}
                    >
                      {t("assessment.form.workRole")}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {ROLES.map((role) => {
                        const isSelected = formData.role === role;
                        return (
                          <SelectableCard
                            key={role}
                            isSelected={isSelected}
                            onClick={() => setFormData((p) => ({ ...p, role }))}
                          >
                            <input
                              type="radio"
                              name="role"
                              value={role}
                              checked={isSelected}
                              onChange={() => setFormData((p) => ({ ...p, role }))}
                              style={{ display: "none" }}
                            />
                            <span style={{ fontSize: 13, color: "#040E3C" }}>{role}</span>
                          </SelectableCard>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <ScaleSlider
                      label={t("assessment.digitalRelationship")}
                      value={formData.digitalRelationship}
                      onChange={(v) => setFormData((p) => ({ ...p, digitalRelationship: v }))}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Steps 1–5: Kompetence */}
            {!isLoading && !isReport && currentStep >= 1 && currentStep <= 5 && currentSection && (
              <motion.div
                key={`step-${currentStep}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants}>
                    <SectionHeader
                      icon={currentSection.icon}
                      title={`${currentStep}. ${currentSection.title}`}
                      description={currentSection.description}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <ScaleSlider
                      label={currentSection.q1}
                      value={formData[currentSection.key].q1}
                      onChange={(v) => updateSection(currentSection.key, "q1", v)}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <ScaleSlider
                      label={currentSection.q2}
                      value={formData[currentSection.key].q2}
                      onChange={(v) => updateSection(currentSection.key, "q2", v)}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <CheckboxGroup
                      label={currentSection.toolsLabel}
                      options={currentSection.tools}
                      selected={formData[currentSection.key].tools}
                      onChange={(tools) => updateSection(currentSection.key, "tools", tools)}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 6: AI Bonus */}
            {!isLoading && !isReport && currentStep === 6 && (
              <motion.div
                key="step-6"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants}>
                    <SectionHeader
                      icon="🤖"
                      title={t("assessment.aiBonusTitle")}
                      description={t("assessment.aiBonusDesc")}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <ScaleSlider
                      label={t("assessment.aiKnowledge")}
                      value={formData.ai.score}
                      onChange={(v) => setFormData((p) => ({ ...p, ai: { ...p.ai, score: v } }))}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <CheckboxGroup
                      label={t("assessment.aiTools")}
                      options={AI_TOOLS}
                      selected={formData.ai.tools}
                      onChange={(tools) => setFormData((p) => ({ ...p, ai: { ...p.ai, tools } }))}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 7: Odeslání */}
            {!isLoading && !isReport && currentStep === 7 && (
              <motion.div
                key="step-7"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants}>
                    <SectionHeader
                      icon="✅"
                      title={t("assessment.beforeSubmitTitle")}
                      description={t("assessment.beforeSubmitDesc")}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <div
                      style={{
                        background: "#F4F5FA",
                        borderRadius: 12,
                        padding: 16,
                      }}
                    >
                      <div style={{ display: "grid", gap: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                          <span style={{ color: "#6B7280", fontSize: 12 }}>{t("assessment.form.name")}</span>
                          <span style={{ fontWeight: 700, color: "#040E3C" }}>{formData.name || "—"}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                          <span style={{ color: "#6B7280", fontSize: 12 }}>{t("assessment.form.email")}</span>
                          <span style={{ fontWeight: 700, color: "#040E3C" }}>{formData.email || "—"}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                          <span style={{ color: "#6B7280", fontSize: 12 }}>{t("assessment.form.role")}</span>
                          <span style={{ fontWeight: 700, color: "#040E3C" }}>{formData.role || "—"}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.p
                    variants={itemVariants}
                    style={{ marginTop: 12, color: "#6B7280", fontSize: 12 }}
                  >
                    {t("assessment.form.enterTip")}
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {isReport && <AssessmentSummary formData={formData} SECTIONS={SECTIONS} />}
        </div>

        {/* Navigation */}
        {!isLoading && !isReport && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <motion.button
              whileHover={{ scale: currentStep === 0 ? 1 : 1.02 }}
              whileTap={{ scale: currentStep === 0 ? 1 : 0.98 }}
              onClick={goBack}
              disabled={currentStep === 0}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                border: "none",
                background: "transparent",
                color: currentStep === 0 ? "#9CA3AF" : "#040E3C",
                fontSize: 14,
                fontWeight: 600,
                cursor: currentStep === 0 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("assessment.form.back")}
            </motion.button>

            {currentStep < TOTAL_STEPS - 1 ? (
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={goNext}
                style={{
                  padding: "10px 24px",
                  borderRadius: 10,
                  border: "none",
                  background: "#2596FF",
                  color: "white",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(37, 150, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {t("assessment.form.next")}
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7.5 5L12.5 10L7.5 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={submitAssessment}
                style={{
                  padding: "10px 24px",
                  borderRadius: 10,
                  border: "none",
                  background: "#2596FF",
                  color: "white",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(37, 150, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {t("assessment.form.submitAssessment")}
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10L8 14L16 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            )}
          </div>
        )}

        {isReport && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setPhase("form");
                setCurrentStep(TOTAL_STEPS - 1);
              }}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                border: "none",
                background: "transparent",
                color: "#040E3C",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("assessment.form.editAnswers")}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/")}
              style={{
                padding: "10px 24px",
                borderRadius: 10,
                border: "none",
                background: "#2596FF",
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(37, 150, 255, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {t("assessment.form.continue")}
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: {
  icon?: string;
  title: string;
  description: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 18 }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "rgba(37, 150, 255, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Image
          src="/Screenshots/Symbol Dark.png"
          alt=""
          width={26}
          height={26}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#040E3C",
            marginBottom: 4,
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.4 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 13,
        fontWeight: 600,
        color: "#040E3C",
        marginBottom: 6,
      }}
    >
      {children}
    </label>
  );
}

function SelectableCard({
  children,
  isSelected,
  onClick,
}: {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 4px 16px rgba(37, 150, 255, 0.12)" }}
      whileTap={{ scale: 0.98 }}
      animate={
        isSelected
          ? { boxShadow: "0 0 0 2px rgba(37, 150, 255, 0.3)" }
          : { boxShadow: "0 0 0 0 rgba(37, 150, 255, 0)" }
      }
      transition={{ duration: 0.2 }}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 10,
        border: isSelected ? "2px solid #2596FF" : "1px solid #E5E7EB",
        background: isSelected ? "rgba(37, 150, 255, 0.05)" : "white",
        cursor: "pointer",
        transition: "border-color 0.15s ease, background 0.15s ease",
      }}
    >
      {children}
    </motion.div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #E5E7EB",
  fontSize: 13,
  color: "#040E3C",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
};

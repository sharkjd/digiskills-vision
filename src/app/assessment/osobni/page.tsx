"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import AssessmentSummary from "@/components/assessment/AssessmentSummary";
import { getSections, getInitialData, type FormData } from "@/components/assessment/assessment-data";

const STORAGE_KEY = "assessment-result";

export default function AssessmentOsobniPage() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const SECTIONS = getSections(language);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FormData;
        setFormData(parsed);
      } else {
        setFormData(getInitialData(language));
      }
    } catch {
      setFormData(getInitialData(language));
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-breeze)",
        }}
      >
        <div className="ds-spinner" aria-label={t("assessment.loading")} />
      </div>
    );
  }

  if (!formData) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          background: "var(--color-breeze)",
          padding: 24,
        }}
      >
        <p style={{ color: "var(--color-text-secondary)", textAlign: "center" }}>
          {t("assessment.noResults")}
        </p>
        <Link href="/assessment" className="btn-primary">
          {t("assessment.startAssessment")}
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-breeze)",
        padding: "24px 20px",
      }}
    >
      <div style={{ maxWidth: 1020, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              fontStyle: "italic",
              color: "var(--color-text-main)",
              marginBottom: 4,
            }}
          >
            {t("assessment.title")}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
            {t("assessment.evaluationReport")}
          </p>
        </div>
        <AssessmentSummary formData={formData} SECTIONS={SECTIONS} />
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <h1
        style={{
          fontSize: "var(--font-size-page-title)",
          fontWeight: 700,
          color: "var(--color-text-main)",
          marginBottom: 8,
        }}
      >
        {t("home.title")}
      </h1>
      <p
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "var(--font-size-body)",
          marginBottom: 40,
        }}
      >
        {t("home.welcome")}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        <div
          style={{
            background: "var(--color-background)",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 2px 8px var(--color-card-shadow)",
            padding: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#e8f4fd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                flexShrink: 0,
              }}
            >
              📊
            </div>
            <div>
              <h2
                style={{
                  fontSize: "var(--font-size-section-title)",
                  fontWeight: 700,
                  color: "var(--color-text-main)",
                  marginBottom: 2,
                }}
              >
                {t("home.assessment.title")}
              </h2>
              <p style={{ fontSize: "var(--font-size-meta)", color: "var(--color-text-secondary)" }}>
                {t("home.assessment.subtitle")}
              </p>
            </div>
          </div>
          <p
            style={{
              fontSize: "var(--font-size-body)",
              color: "var(--color-text-secondary)",
              marginBottom: 24,
              lineHeight: 1.65,
            }}
          >
            {t("home.assessment.description")}
          </p>
          <Link
            href="/assessment"
            style={{
              display: "inline-block",
              padding: "10px 28px",
              background: "var(--color-primary)",
              color: "white",
              borderRadius: "var(--radius-btn)",
              fontWeight: 600,
              fontSize: "var(--font-size-body)",
              textDecoration: "none",
            }}
          >
            {t("home.assessment.cta")}
          </Link>
        </div>

        <div
          style={{
            background: "var(--color-background)",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 2px 8px var(--color-card-shadow)",
            padding: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#e8f4fd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                flexShrink: 0,
              }}
            >
              🏢
            </div>
            <div>
              <h2
                style={{
                  fontSize: "var(--font-size-section-title)",
                  fontWeight: 700,
                  color: "var(--color-text-main)",
                  marginBottom: 2,
                }}
              >
                {t("home.companyReport.title")}
              </h2>
              <p style={{ fontSize: "var(--font-size-meta)", color: "var(--color-text-secondary)" }}>
                {t("home.companyReport.subtitle")}
              </p>
            </div>
          </div>
          <p
            style={{
              fontSize: "var(--font-size-body)",
              color: "var(--color-text-secondary)",
              marginBottom: 24,
              lineHeight: 1.65,
            }}
          >
            {t("home.companyReport.description")}
          </p>
          <Link
            href="/firma"
            style={{
              display: "inline-block",
              padding: "10px 28px",
              background: "var(--color-primary)",
              color: "white",
              borderRadius: "var(--radius-btn)",
              fontWeight: 600,
              fontSize: "var(--font-size-body)",
              textDecoration: "none",
            }}
          >
            {t("home.companyReport.cta")}
          </Link>
        </div>
      </div>
    </div>
  );
}

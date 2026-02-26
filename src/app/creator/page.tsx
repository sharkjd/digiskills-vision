"use client";

import React, { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { getCreatorCourses } from "@/data/creator-courses";
import CreatorCourseCard from "@/components/creator/CreatorCourseCard";
import CommissionsModal from "@/components/creator/CommissionsModal";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

const COURSE_PRICE_CZK = 999;
const COMMISSION_RATE = 0.5;

const MOCK_STATS = {
  totalCourses: 3,
  totalSales: 47,
  totalRevenue: Math.round(47 * COURSE_PRICE_CZK * COMMISSION_RATE),
};

function CreatorContent() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const saved = searchParams.get("saved") === "1";

  const courses = getCreatorCourses(language);
  const coursesWithSales = useMemo(
    () =>
      courses.filter(
        (c) => typeof c.sales === "number" && typeof c.revenue === "number"
      ),
    [courses]
  );
  const [commissionsModalOpen, setCommissionsModalOpen] = useState(false);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "40px 24px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Saved banner */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
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
          </motion.div>
        )}

        {/* Hero header */}
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
              {t("creator.title")}
            </div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 800,
                margin: "0 0 8px",
                fontStyle: "italic",
              }}
            >
              {t("creator.title")}
            </h1>
            <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>
              {t("creator.subtitle")}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
            }}
          >
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
              <div style={{ fontSize: 40, fontWeight: 800 }}>{MOCK_STATS.totalCourses}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{t("creator.courseCount")}</div>
            </motion.div>
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
              <div style={{ fontSize: 40, fontWeight: 800 }}>{MOCK_STATS.totalSales}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{t("creator.totalSales")}</div>
            </motion.div>
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
              <div style={{ fontSize: 40, fontWeight: 800, color: "#77F9D9" }}>
                {MOCK_STATS.totalRevenue.toLocaleString("cs-CZ")} Kč
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{t("creator.earnings")}</div>
            </motion.div>
          </div>
        </div>

        {/* Moje kurzy */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 28,
            border: "1px solid #E5E7EB",
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#040E3C",
              margin: "0 0 24px",
              fontStyle: "italic",
            }}
          >
            {t("creator.myCourses")}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {courses.map((course) => (
              <CreatorCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Prodeje a provize */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 28,
            border: "1px solid #E5E7EB",
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#040E3C",
              margin: "0 0 8px",
              fontStyle: "italic",
            }}
          >
            {t("creator.salesAndCommissions")}
          </h2>
          <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px" }}>
            {t("creator.salesDesc")}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
            }}
          >
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              transition={HOVER_TRANSITION}
              style={{
                background: "#F4F5FA",
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 800, color: "#2596FF" }}>{MOCK_STATS.totalSales}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8, color: "#040E3C" }}>
                {t("creator.totalSales")}
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              transition={HOVER_TRANSITION}
              style={{
                background: "#F4F5FA",
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 800, color: "#77F9D9" }}>
                {MOCK_STATS.totalRevenue.toLocaleString("cs-CZ")} Kč
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8, color: "#040E3C" }}>
                {t("creator.earnings")}
              </div>
            </motion.div>
          </div>
          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <button
              type="button"
              onClick={() => setCommissionsModalOpen(true)}
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                fontSize: 16,
                fontWeight: 700,
                border: "none",
                borderRadius: "var(--radius-btn)",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(37, 150, 255, 0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 150, 255, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(37, 150, 255, 0.35)";
              }}
            >
              <BarChart3 size={20} aria-hidden />
              {t("creator.showCommissions")}
            </button>
          </div>
          <div
            style={{
              marginTop: 16,
              padding: 16,
              background: "#F4F5FA",
              borderRadius: 12,
              fontSize: 13,
              color: "#6B7280",
            }}
          >
            {t("creator.salesTableDesc")}
          </div>
        </div>

        {commissionsModalOpen && (
          <CommissionsModal
            open={commissionsModalOpen}
            onClose={() => setCommissionsModalOpen(false)}
            courses={coursesWithSales}
          />
        )}

        {/* CTA Vytvořit nový kurz */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link
            href="/admin/tvorba-kurzu"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              fontSize: 15,
              fontWeight: 600,
              color: "white",
              background: "var(--color-primary)",
              borderRadius: 999,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-primary-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-primary)";
            }}
          >
            {t("creator.createNew")} →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CreatorPage() {
  return (
    <Suspense fallback={<div style={{ maxWidth: 1200, margin: "0 auto", padding: 40 }}>Načítání…</div>}>
      <CreatorContent />
    </Suspense>
  );
}

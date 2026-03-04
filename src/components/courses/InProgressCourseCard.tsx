"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Course } from "@/data/courses";
import { useTranslation } from "@/hooks/useTranslation";

type InProgressCourseCardProps = {
  course: Course;
  progressPercent: number;
  completedActivities: number;
};

export default function InProgressCourseCard({
  course,
  progressPercent,
  completedActivities,
}: InProgressCourseCardProps) {
  const { t } = useTranslation();

  return (
    <Link href={`/kurz/${course.id}`} style={{ textDecoration: "none" }}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(37, 150, 255, 0.15)" }}
        style={{
          display: "flex",
          background: "var(--color-background)",
          borderRadius: "var(--radius-card)",
          border: "2px solid var(--color-primary)",
          overflow: "hidden",
          boxShadow: "0 2px 12px var(--color-card-shadow)",
          cursor: "pointer",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", width: 200, minHeight: 140, flexShrink: 0 }}>
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            sizes="200px"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, transparent 60%, rgba(255,255,255,0.4) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase" as const,
                letterSpacing: 0.5,
                color: "var(--color-primary)",
                background: "rgba(37, 150, 255, 0.1)",
                padding: "3px 10px",
                borderRadius: 6,
              }}
            >
              {t("dashboard.started")}
            </span>
            <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
              {completedActivities}/{course.activities} {t("courses.activities")}
            </span>
          </div>

          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--color-text-main)",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              margin: 0,
            }}
          >
            {course.title}
          </h3>

          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                flex: 1,
                height: 8,
                background: "var(--color-border)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, var(--color-primary), #4db1ff)",
                  borderRadius: 4,
                }}
              />
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--color-primary)",
                minWidth: 36,
                textAlign: "right",
              }}
            >
              {progressPercent} %
            </span>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: 24,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "var(--color-primary)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "var(--radius-btn)",
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap" as const,
            }}
          >
            {t("dashboard.continueBtn")}
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

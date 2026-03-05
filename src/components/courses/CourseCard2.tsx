"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Course } from "@/data/courses";
import { useTranslation } from "@/hooks/useTranslation";
import { asset } from "@/lib/paths";

type CourseStatus = "new" | "started" | "done";

type CourseCard2Props = {
  course: Course;
  index: number;
  status?: CourseStatus;
  isMandatory?: boolean;
  delay?: number;
};

const LEVEL_TO_KEY: Record<string, string> = {
  "Začátečník": "assessmentLevels.beginner",
  "Beginner": "assessmentLevels.beginner",
  "Středně pokročilý": "assessmentLevels.intermediate",
  "Intermediate": "assessmentLevels.intermediate",
  "Pokročilý": "assessmentLevels.advanced",
  "Advanced": "assessmentLevels.advanced",
};

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  "assessmentLevels.beginner": { bg: "rgba(119, 249, 217, 0.15)", text: "#0d8a6a" },
  "assessmentLevels.intermediate": { bg: "rgba(37, 150, 255, 0.12)", text: "#1a6dbf" },
  "assessmentLevels.advanced": { bg: "rgba(169, 127, 239, 0.15)", text: "#7040b0" },
};

const STATUS_CONFIG: Record<CourseStatus, { label: string; color: string; bg: string }> = {
  new: { label: "dashboard.new", color: "#2596FF", bg: "rgba(37, 150, 255, 0.1)" },
  started: { label: "dashboard.started", color: "#F7981C", bg: "rgba(247, 152, 28, 0.1)" },
  done: { label: "dashboard.done", color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" },
};

export default function CourseCard2({
  course,
  index,
  status = "new",
  isMandatory = false,
  delay = 0,
}: CourseCard2Props) {
  const { t } = useTranslation();
  const levelKey = LEVEL_TO_KEY[course.level] ?? "assessmentLevels.beginner";
  const levelStyle = LEVEL_COLORS[levelKey] ?? { bg: "#f0f0f0", text: "#666" };
  const statusCfg = STATUS_CONFIG[status];

  return (
    <Link href={`/kurz/${course.id}`} style={{ textDecoration: "none" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
        whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
        style={{
          background: "var(--color-background)",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-border)",
          overflow: "hidden",
          boxShadow: "0 2px 8px var(--color-card-shadow)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          cursor: "pointer",
          position: "relative",
          transition: "box-shadow 0.2s",
        }}
      >
        {/* Mandatory badge */}
        {isMandatory && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 2,
              background: "var(--color-accent-orange)",
              color: "white",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase" as const,
              letterSpacing: 0.5,
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            {t("dashboard.mandatory")}
          </div>
        )}

        {/* Image */}
        <div style={{ position: "relative", height: 160, flexShrink: 0, background: "#f0f2f5" }}>
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Logo badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              display: "flex",
              alignItems: "center",
              padding: "4px 8px",
              borderRadius: 6,
              background: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <Image
              src={asset("/Screenshots/Digiskills-logo.png")}
              alt="Digiskills"
              width={80}
              height={20}
              className="object-contain"
              style={{ height: 16, width: "auto" }}
            />
          </div>

          {/* Status + Level badges at bottom of image */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0 12px 10px",
              display: "flex",
              gap: 6,
              background: "linear-gradient(transparent, rgba(0,0,0,0.4))",
              paddingTop: 20,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 4,
                background: statusCfg.bg,
                color: statusCfg.color,
                backdropFilter: "blur(4px)",
              }}
            >
              {t(statusCfg.label)}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: 4,
                background: levelStyle.bg,
                color: levelStyle.text,
                backdropFilter: "blur(4px)",
              }}
            >
              {t(levelKey)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--color-text-main)",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              margin: 0,
              marginBottom: 8,
              lineHeight: 1.3,
            }}
          >
            {index + 1}. {course.title}
          </h3>

          <p
            style={{
              fontSize: 13,
              color: "var(--color-text-secondary)",
              lineHeight: 1.5,
              margin: 0,
              flex: 1,
              marginBottom: 14,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }}
          >
            {course.description}
          </p>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 12,
              borderTop: "1px solid var(--color-border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 12,
                  color: "var(--color-text-secondary)",
                }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 12,
                  color: "var(--color-text-secondary)",
                }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {course.activities} {t("courses.activities")}
              </span>
            </div>

            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: status === "new" ? "var(--color-primary)" : "var(--color-text-secondary)",
              }}
            >
              {status === "new" ? t("dashboard.startStudy") : t("dashboard.viewCourse")}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

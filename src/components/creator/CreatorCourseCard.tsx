"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CreatorCourse, CreatorCourseStatus } from "@/data/creator-courses";
import { useTranslation } from "@/hooks/useTranslation";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

const STATUS_COLORS: Record<CreatorCourseStatus, string> = {
  draft: "#6B7280",
  in_review: "#F7981C",
  published: "#77F9D9",
};

const STATUS_LABEL_KEYS: Record<CreatorCourseStatus, string> = {
  draft: "creator.statusDraft",
  in_review: "creator.statusInReview",
  published: "creator.statusPublished",
};

type CreatorCourseCardProps = {
  course: CreatorCourse;
};

export default function CreatorCourseCard({ course }: CreatorCourseCardProps) {
  const { t } = useTranslation();
  const statusColor = STATUS_COLORS[course.status];
  const statusLabel = t(STATUS_LABEL_KEYS[course.status]);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
      transition={HOVER_TRANSITION}
      style={{
        background: "white",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Status Badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: statusColor,
          color: course.status === "published" ? "#040E3C" : "white",
          padding: "4px 10px",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          zIndex: 10,
        }}
      >
        {statusLabel}
      </div>

      <div
        style={{
          height: 140,
          width: "100%",
          minWidth: 0,
          flexShrink: 0,
          position: "relative",
          background: "#F1F5F9",
          overflow: "hidden",
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

        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          <Link
            href={`/kurz/${course.id}`}
            className="btn-secondary"
            style={{
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              flex: 1,
              minWidth: 80,
              textAlign: "center",
            }}
          >
            {t("creator.preview")}
          </Link>
          <button
            type="button"
            className="btn-primary"
            style={{
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              flex: 1,
              minWidth: 80,
            }}
          >
            {t("creator.edit")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

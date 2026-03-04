"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRecommendedCourses } from "@/context/RecommendedCoursesContext";
import { useCompanyCourses } from "@/context/CompanyCoursesContext";
import { useLanguage } from "@/context/LanguageContext";
import { getCourseList, getCompletedCourses, type Course } from "@/data/courses";
import { useTranslation } from "@/hooks/useTranslation";

import CourseHero from "@/components/courses/CourseHero";
import InProgressCourseCard from "@/components/courses/InProgressCourseCard";
import CourseCard2 from "@/components/courses/CourseCard2";
import ProgressStrip from "@/components/courses/ProgressStrip";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const FAKE_USER_NAME = "Honzo";
const FAKE_DIGISKILLS_INDEX = 7.3;

export default function MojeKurzyPage() {
  const { recommendedCourses } = useRecommendedCourses();
  const { companyCourses } = useCompanyCourses();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [completedOpen, setCompletedOpen] = useState(true);

  const courseList = getCourseList(language);
  const completedList = getCompletedCourses(language);

  const myCourses =
    recommendedCourses.length > 0 ? recommendedCourses : courseList.slice(0, 5);

  const mandatoryCompanyCourses =
    companyCourses.length > 0 ? companyCourses : courseList.slice(5, 10);

  const inProgressCourse = myCourses[0];
  const remainingCourses = myCourses.slice(1);

  const totalCourses = myCourses.length + mandatoryCompanyCourses.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-breeze)",
        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}
      >
        {/* 1. Hero banner */}
        <motion.div variants={sectionVariants}>
          <CourseHero
            userName={FAKE_USER_NAME}
            digiskillsIndex={FAKE_DIGISKILLS_INDEX}
            completedCount={completedList.length}
            toStudyCount={myCourses.length}
            mandatoryCount={mandatoryCompanyCourses.length}
          />
        </motion.div>

        {/* 2. Continue studying */}
        {inProgressCourse && (
          <motion.section variants={sectionVariants} style={{ marginTop: 32 }}>
            <div style={{ marginBottom: 16 }}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "var(--color-text-main)",
                  margin: 0,
                  marginBottom: 4,
                }}
              >
                {t("dashboard.continueStudy")}
              </h2>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>
                {t("dashboard.continueStudyDesc")}
              </p>
            </div>
            <InProgressCourseCard
              course={inProgressCourse}
              progressPercent={35}
              completedActivities={Math.round(inProgressCourse.activities * 0.35)}
            />
          </motion.section>
        )}

        {/* 3. Progress strip */}
        <motion.div variants={sectionVariants} style={{ marginTop: 28 }}>
          <ProgressStrip
            completed={completedList.length}
            total={totalCourses + completedList.length}
          />
        </motion.div>

        {/* 4. Recommended courses */}
        <motion.section variants={sectionVariants} style={{ marginTop: 36 }}>
          <div style={{ marginBottom: 20 }}>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                fontStyle: "italic",
                color: "var(--color-text-main)",
                margin: 0,
                marginBottom: 4,
              }}
            >
              {t("dashboard.recommendedTitle")}
            </h2>
            <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>
              {t("dashboard.recommendedDesc")}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {remainingCourses.map((course, index) => (
              <CourseCard2
                key={course.id}
                course={course}
                index={index}
                status="new"
                delay={0.1 + index * 0.08}
              />
            ))}
          </div>
        </motion.section>

        {/* 5. Mandatory company courses */}
        <motion.section variants={sectionVariants} style={{ marginTop: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 4,
                height: 40,
                borderRadius: 2,
                background: "var(--color-accent-orange)",
              }}
            />
            <div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "var(--color-text-main)",
                  margin: 0,
                  marginBottom: 4,
                }}
              >
                {t("dashboard.mandatoryTitle")}
              </h2>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>
                {t("dashboard.mandatoryDesc")}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {mandatoryCompanyCourses.map((course, index) => (
              <CourseCard2
                key={course.id}
                course={course}
                index={index}
                status="new"
                isMandatory
                delay={0.1 + index * 0.08}
              />
            ))}
          </div>
        </motion.section>

        {/* 6. Completed courses */}
        <motion.section variants={sectionVariants} style={{ marginTop: 40, marginBottom: 32 }}>
          <button
            onClick={() => setCompletedOpen((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginBottom: completedOpen ? 16 : 0,
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                fontStyle: "italic",
                color: "var(--color-text-main)",
                margin: 0,
              }}
            >
              {t("dashboard.completedTitle")}
            </h2>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 24,
                height: 24,
                borderRadius: 6,
                background: "var(--color-border)",
                fontSize: 12,
                fontWeight: 700,
                color: "var(--color-text-secondary)",
              }}
            >
              {completedList.length}
            </span>
            <motion.svg
              animate={{ rotate: completedOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              width="20"
              height="20"
              fill="none"
              stroke="var(--color-text-secondary)"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>

          {completedOpen && (
            <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, marginBottom: 16 }}>
              {t("dashboard.completedSubtitle")}
            </p>
          )}

          <AnimatePresence>
            {completedOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 16,
                  }}
                >
                  {completedList.map((course, index) => (
                    <CompletedMiniCard key={course.id} course={course} delay={index * 0.1} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </motion.div>
    </div>
  );
}

function CompletedMiniCard({ course, delay }: { course: Course; delay: number }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      style={{
        background: "var(--color-background)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
        boxShadow: "0 1px 4px var(--color-card-shadow)",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 16px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 56,
          height: 56,
          borderRadius: 10,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          sizes="56px"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(16, 185, 129, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="20" height="20" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--color-text-main)",
            margin: 0,
            marginBottom: 2,
            whiteSpace: "nowrap" as const,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {course.title}
        </h4>
        <span style={{ fontSize: 12, color: "#10B981", fontWeight: 600 }}>
          {t("dashboard.completed")}
        </span>
      </div>
    </motion.div>
  );
}

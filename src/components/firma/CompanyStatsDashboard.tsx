"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatsApiSection from "./StatsApiSection";
import StatsChatbot from "./StatsChatbot";
import { useTranslation } from "@/hooks/useTranslation";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const ACTIVITY_DATA_RAW = [
  { weekNum: 1, lessons: 156 },
  { weekNum: 2, lessons: 189 },
  { weekNum: 3, lessons: 234 },
  { weekNum: 4, lessons: 198 },
  { weekNum: 5, lessons: 267 },
];

const TOP_STUDENTS = [
  { name: "Marie Nováková", points: 342, initials: "MN", department: "Marketing" },
  { name: "Petr Svoboda", points: 298, initials: "PS", department: "IT" },
  { name: "Eva Horáková", points: 276, initials: "EH", department: "HR" },
  { name: "Jan Procházka", points: 251, initials: "JP", department: "Finance" },
  { name: "Lucie Dvořáková", points: 234, initials: "LD", department: "Obchod" },
];

const INACTIVE_STUDENTS = [
  { name: "Tomáš Veselý", points: 22, initials: "TV", department: "Výroba", inactiveDays: 18 },
  { name: "Alena Bártová", points: 28, initials: "AB", department: "Podpora", inactiveDays: 14 },
  { name: "Karel Urban", points: 33, initials: "KU", department: "Logistika", inactiveDays: 12 },
  { name: "Iveta Blažková", points: 39, initials: "IB", department: "Administrativa", inactiveDays: 10 },
  { name: "Milan Kučera", points: 44, initials: "MK", department: "Obchod", inactiveDays: 9 },
];

const POPULAR_COURSES = [
  { name: "AI Promptování pro praxi", students: 84, category: "AI", trend: "+12 tento týden" },
  { name: "ChatGPT v kanceláři", students: 72, category: "AI", trend: "+8 tento týden" },
  { name: "Základy kyberbezpečnosti", students: 68, category: "Bezpečnost", trend: "+5 tento týden" },
  { name: "Excel pro pokročilé", students: 61, category: "M365", trend: "stabilní" },
  { name: "Power Automate – začátky", students: 54, category: "Automatizace", trend: "+6 tento týden" },
];

const POPULAR_VIDEOS = [
  { title: "Jak napsat efektivní AI prompt", views: 312, category: "AI", duration: "8 min" },
  { title: "Excel: Pivot tabulky za 5 minut", views: 289, category: "M365", duration: "5 min" },
  { title: "Kyberbezpečnost v praxi", views: 256, category: "Bezpečnost", duration: "12 min" },
  { title: "Teams – tipy pro efektivní meetingy", views: 234, category: "M365", duration: "6 min" },
  { title: "Power BI – první dashboard", views: 198, category: "Data", duration: "15 min" },
];

const COMPLETED_COURSES = [
  { name: "Základy kyberbezpečnosti", completedBy: 89, total: 124, category: "Bezpečnost" },
  { name: "Excel pro pokročilé", completedBy: 76, total: 124, category: "M365" },
  { name: "Efektivní komunikace online", completedBy: 68, total: 124, category: "Soft skills" },
  { name: "Teams & Spolupráce", completedBy: 94, total: 124, category: "M365" },
  { name: "Základy datové analýzy", completedBy: 52, total: 124, category: "Data" },
];

const COMPANY_INDEX = 6.8;
const MARKET_AVG = 5.2;
const TOP_10_PERCENT = 8.4;

export default function CompanyStatsDashboard() {
  const { t } = useTranslation();
  const activityData = ACTIVITY_DATA_RAW.map((d) => ({
    week: t("companyStats.weekN", { n: String(d.weekNum) }),
    lessons: d.lessons,
  }));
  const stats = [
    { value: "1 248", labelKey: "companyStats.totalHours", subKey: "companyStats.totalHoursSub" },
    { value: "98 / 124", labelKey: "companyStats.activeEmployees", subKey: "companyStats.activeEmployeesSub" },
    { value: "312", labelKey: "companyStats.completedCourses", subKey: "companyStats.completedCoursesSub" },
    { value: "6.8", labelKey: "companyStats.avgIndex", subKey: "companyStats.avgIndexSub" },
  ];
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      {/* Hero Banner - Salmon color */}
      <motion.div
        variants={itemVariants}
        style={{
          background: "var(--color-digi-salmon)",
          borderRadius: 16,
          padding: "36px 32px",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.2)",
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              {t("companyStats.badge")}
            </div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                margin: "0 0 12px",
                fontStyle: "italic",
              }}
            >
              {t("companyStats.title")}
            </h1>
            <p style={{ fontSize: 15, opacity: 0.95, margin: 0, lineHeight: 1.6 }}>
              {t("companyStats.subtitle")}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
            }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.labelKey}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                transition={HOVER_TRANSITION}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 12,
                  padding: 24,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 36, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.95 }}>
                  {t(stat.labelKey)}
                </div>
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>
                  {t(stat.subKey)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Digiskills Index srovnání s trhem */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
        transition={HOVER_TRANSITION}
        style={{
          background: "var(--color-background)",
          borderRadius: 16,
          padding: "28px 32px",
          border: "1px solid var(--color-border)",
          boxShadow: "0 2px 8px var(--color-card-shadow)",
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "var(--color-text-main)",
            margin: "0 0 24px",
            fontStyle: "italic",
          }}
        >
          {t("companyStats.marketComparison")}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { labelKey: "companyStats.yourCompany", value: COMPANY_INDEX, color: "var(--color-digi-salmon)", bold: true },
            { labelKey: "companyReport.marketAvg", value: MARKET_AVG, color: "var(--color-primary)", bold: false },
            { labelKey: "companyStats.top10Percent", value: TOP_10_PERCENT, color: "var(--color-accent-green)", bold: false },
          ].map((row) => (
            <div key={row.labelKey}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: row.bold ? 700 : 500,
                    color: "var(--color-text-main)",
                  }}
                >
                  {t(row.labelKey)}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-main)" }}>
                  {row.value.toFixed(1)} / 10
                </span>
              </div>
              <div
                style={{
                  height: row.bold ? 12 : 8,
                  background: "var(--color-breeze)",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(row.value / 10) * 100}%`,
                    background: row.color,
                    borderRadius: 6,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Slovní komentář k výsledkům */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
        transition={HOVER_TRANSITION}
        style={{
          background: "var(--color-background)",
          borderRadius: 16,
          padding: "28px 32px",
          border: "1px solid var(--color-border)",
          boxShadow: "0 2px 8px var(--color-card-shadow)",
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "var(--color-text-main)",
            margin: "0 0 18px",
            fontStyle: "italic",
          }}
        >
          {t("companyStats.commentTitle")}
        </h2>

        <div
          style={{
            background: "var(--color-breeze)",
            borderRadius: 12,
            border: "1px solid var(--color-border)",
            padding: "18px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            color: "var(--color-text-main)",
            lineHeight: 1.65,
            fontSize: 14,
          }}
        >
          <p style={{ margin: 0 }}>{t("companyStats.comment1")}</p>
          <p style={{ margin: 0 }}>{t("companyStats.comment2")}</p>
          <p style={{ margin: 0 }}>{t("companyStats.comment3")}</p>
          <p style={{ margin: 0 }}>{t("companyStats.comment4")}</p>
        </div>
      </motion.div>

      {/* Graf aktivity + žebříčky studentů */}
      <motion.div
        variants={itemVariants}
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(400px, 2fr) 1fr",
          gap: 24,
        }}
      >
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
          transition={HOVER_TRANSITION}
          style={{
            background: "var(--color-background)",
            borderRadius: 16,
            padding: "28px",
            border: "1px solid var(--color-border)",
            boxShadow: "0 2px 8px var(--color-card-shadow)",
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--color-text-main)",
              margin: "0 0 24px",
              fontStyle: "italic",
            }}
          >
            {t("companyStats.activityOverTime")}
          </h2>
          <div style={{ width: "100%", height: 260, minHeight: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorCompanyLessons" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-digi-salmon)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--color-digi-salmon)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
                  axisLine={{ stroke: "var(--color-border)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    boxShadow: "0 4px 12px var(--color-card-shadow)",
                  }}
                  labelStyle={{ fontWeight: 600, color: "var(--color-text-main)" }}
                  formatter={(value) => [`${value ?? 0} ${t("courseCreation.lessons")}`, t("companyStats.lessonsCompleted")]}
                />
                <Area
                  type="monotone"
                  dataKey="lessons"
                  stroke="var(--color-digi-salmon)"
                  strokeWidth={2.5}
                  fill="url(#colorCompanyLessons)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
            transition={HOVER_TRANSITION}
            style={{
              background: "var(--color-background)",
              borderRadius: 16,
              padding: "28px",
              border: "1px solid var(--color-border)",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--color-text-main)",
                margin: "0 0 20px",
                fontStyle: "italic",
              }}
            >
              {t("companyStats.topStudents")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {TOP_STUDENTS.map((student, index) => (
                <div
                  key={student.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: index === 0 ? "var(--color-digi-salmon)" : "var(--color-primary)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {student.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--color-text-main)",
                      }}
                    >
                      {student.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--color-text-secondary)",
                        marginTop: 2,
                      }}
                    >
                      {student.department} · {student.points} bodů
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: index === 0 ? "var(--color-digi-salmon)" : "var(--color-primary)",
                    }}
                  >
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
            transition={HOVER_TRANSITION}
            style={{
              background: "var(--color-background)",
              borderRadius: 16,
              padding: "28px",
              border: "1px solid var(--color-border)",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--color-text-main)",
                margin: "0 0 6px",
                fontStyle: "italic",
              }}
            >
              {t("companyStats.inactiveStudents")}
            </h2>
            <p style={{ margin: "0 0 20px", fontSize: 12, color: "var(--color-text-secondary)" }}>
              {t("companyStats.inactiveSubtitle")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {INACTIVE_STUDENTS.map((student, index) => (
                <div
                  key={student.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: index === 0 ? "var(--color-accent-orange)" : "var(--color-border)",
                      color: index === 0 ? "white" : "var(--color-text-main)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {student.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--color-text-main)",
                      }}
                    >
                      {student.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--color-text-secondary)",
                        marginTop: 2,
                      }}
                    >
                      {student.department} · {student.points} {t("companyStats.points")} · {student.inactiveDays} {t("companyStats.daysInactive")}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: index === 0 ? "var(--color-accent-orange)" : "var(--color-text-secondary)",
                    }}
                  >
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Nejoblíbenější kurzy + Nejoblíbenější videa */}
      <motion.div
        variants={itemVariants}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        {/* Nejoblíbenější kurzy */}
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
          transition={HOVER_TRANSITION}
          style={{
            background: "var(--color-background)",
            borderRadius: 16,
            padding: "28px",
            border: "1px solid var(--color-border)",
            boxShadow: "0 2px 8px var(--color-card-shadow)",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--color-text-main)",
                margin: "0 0 6px",
                fontStyle: "italic",
              }}
            >
              {t("companyStats.popularCourses")}
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>
              {t("companyStats.popularCoursesSub")}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {POPULAR_COURSES.map((course, idx) => (
              <div
                key={course.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 14px",
                  background: idx === 0 ? "rgba(255, 117, 117, 0.08)" : "var(--color-breeze)",
                  borderRadius: 10,
                  border: idx === 0 ? "1px solid rgba(255, 117, 117, 0.25)" : "1px solid transparent",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: idx === 0 ? "var(--color-digi-salmon)" : "var(--color-border)",
                    color: idx === 0 ? "white" : "var(--color-text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--color-text-main)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {course.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>
                    {course.trend}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "var(--color-digi-salmon)",
                    }}
                  >
                    {course.students}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--color-text-secondary)" }}>
                    {t("companyStats.students")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Nejoblíbenější videa */}
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
          transition={HOVER_TRANSITION}
          style={{
            background: "var(--color-background)",
            borderRadius: 16,
            padding: "28px",
            border: "1px solid var(--color-border)",
            boxShadow: "0 2px 8px var(--color-card-shadow)",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "var(--color-text-main)",
                margin: "0 0 6px",
                fontStyle: "italic",
              }}
            >
              {t("companyStats.popularVideos")}
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>
              {t("companyStats.popularVideosSub")}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {POPULAR_VIDEOS.map((video, idx) => (
              <div
                key={video.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 14px",
                  background: idx === 0 ? "rgba(37, 150, 255, 0.06)" : "var(--color-breeze)",
                  borderRadius: 10,
                  border: idx === 0 ? "1px solid rgba(37, 150, 255, 0.2)" : "1px solid transparent",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: idx === 0 ? "var(--color-primary)" : "var(--color-border)",
                    color: idx === 0 ? "white" : "var(--color-text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--color-text-main)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {video.title}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>
                    {video.category} · {video.duration}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "var(--color-primary)",
                    }}
                  >
                    {video.views}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--color-text-secondary)" }}>
                    {t("companyStats.views")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Přehled kurzů */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
        transition={HOVER_TRANSITION}
        style={{
          background: "var(--color-background)",
          borderRadius: 16,
          padding: "28px 32px",
          border: "1px solid var(--color-border)",
          boxShadow: "0 2px 8px var(--color-card-shadow)",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--color-text-main)",
              margin: "0 0 6px",
              fontStyle: "italic",
            }}
          >
            {t("companyStats.courseOverview")}
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)" }}>
            {t("companyStats.courseOverviewSub")}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {COMPLETED_COURSES.map((course) => {
            const pct = Math.round((course.completedBy / course.total) * 100);
            return (
              <div
                key={course.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 200px",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 16px",
                  background: "var(--color-breeze)",
                  borderRadius: 10,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-main)" }}>
                    {course.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 2 }}>
                    {course.category}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: pct >= 60 ? "#059669" : "var(--color-accent-orange)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {course.completedBy} / {course.total}
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                      fontSize: 11,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <span>{t("companyStats.lessonsCompleted")}</span>
                    <span style={{ fontWeight: 700, color: pct >= 60 ? "#059669" : "var(--color-accent-orange)" }}>
                      {pct} %
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: "var(--color-border)",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: pct >= 60 ? "#10b981" : "var(--color-accent-orange)",
                        borderRadius: 3,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* API sekce */}
      <StatsApiSection />

      {/* Chatbot */}
      <StatsChatbot />
    </motion.div>
  );
}

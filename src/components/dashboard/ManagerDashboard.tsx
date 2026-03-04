"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const ACTIVITY_DATA = [
  { weekKey: "manager.week", weekNum: 1, lessons: 32 },
  { weekKey: "manager.week", weekNum: 2, lessons: 29 },
  { weekKey: "manager.week", weekNum: 3, lessons: 25 },
  { weekKey: "manager.week", weekNum: 4, lessons: 22 },
  { weekKey: "manager.week", weekNum: 5, lessons: 19 },
];

const TOP_STUDENTS = [
  { name: "Marie Nováková", points: 58, initials: "MN" },
  { name: "Petr Svoboda", points: 51, initials: "PS" },
  { name: "Eva Horáková", points: 47, initials: "EH" },
  { name: "Jan Procházka", points: 42, initials: "JP" },
  { name: "Lucie Dvořáková", points: 39, initials: "LD" },
];

const INACTIVE_STUDENTS = [
  { name: "Tomáš Veselý", points: 2, initials: "TV", inactiveDays: 31 },
  { name: "Alena Bártová", points: 4, initials: "AB", inactiveDays: 27 },
  { name: "Karel Urban", points: 6, initials: "KU", inactiveDays: 24 },
  { name: "Iveta Blažková", points: 8, initials: "IB", inactiveDays: 21 },
  { name: "Milan Kučera", points: 10, initials: "MK", inactiveDays: 19 },
];

const STRENGTHS = [
  { topic: "Kyberbezpečnost", percent: 54 },
  { topic: "Excel", percent: 49 },
  { topic: "Komunikace", percent: 52 },
];

const GAPS = [
  { topic: "Power Automate", percent: 63 },
  { topic: "AI Promptování", percent: 71 },
  { topic: "Cloud", percent: 68 },
];

const MILESTONE_KEYS = [
  "manager.milestone1",
  "manager.milestone2",
  "manager.milestone3",
] as const;

const TEAM_DIGISKILLS_INDEX = 4.3;
const COMPANY_TEAM_MINIMUM = 5.8;

const TEAM_RANKING = { place: 10, totalTeams: 12 };

const COMPLETED_COURSES = [
  { name: "Základy kyberbezpečnosti", completedBy: 9, total: 24, category: "Bezpečnost" },
  { name: "Excel pro pokročilé", completedBy: 8, total: 24, category: "M365" },
  { name: "Efektivní komunikace online", completedBy: 7, total: 24, category: "Soft skills" },
  { name: "Teams & Spolupráce", completedBy: 10, total: 24, category: "M365" },
  { name: "Základy datové analýzy", completedBy: 6, total: 24, category: "Data" },
];

const POPULAR_COURSES = [
  { name: "AI Promptování pro praxi", students: 9, category: "AI", trend: "-1 tento týden" },
  { name: "ChatGPT v kanceláři", students: 8, category: "AI", trend: "-2 tento týden" },
  { name: "Power Automate – začátky", students: 7, category: "Automatizace", trend: "-1 tento týden" },
  { name: "Prezentace v PowerPoint", students: 6, category: "M365", trend: "stabilní" },
  { name: "Teams pro efektivní spolupráci", students: 5, category: "M365", trend: "-1 tento týden" },
];

const LOW_COMPLETION_COURSES = [
  { name: "Cloud Computing základy", completionRate: 12, enrolled: 17, category: "Cloud" },
  { name: "Power BI přehled", completionRate: 15, enrolled: 15, category: "Data" },
  { name: "Projektové řízení (MS Project)", completionRate: 18, enrolled: 13, category: "Management" },
];

export default function ManagerDashboard() {
  const { t } = useTranslation();
  const activityData = ACTIVITY_DATA.map((d) => ({
    week: `${t(d.weekKey)} ${d.weekNum}`,
    lessons: d.lessons,
  }));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      {/* A. Executive Hero Banner */}
      <motion.div
        variants={itemVariants}
        style={{
          background: "var(--color-digi-sky)",
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
                background: "rgba(255,255,255,0.15)",
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              AI Insights
            </div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                margin: "0 0 12px",
                fontStyle: "italic",
              }}
            >
              {t("manager.teamDoingGreat")}
            </h1>
            <p style={{ fontSize: 15, opacity: 0.9, margin: 0, lineHeight: 1.6 }}>
              {t("manager.halfwayText")}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
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
              <div style={{ fontSize: 36, fontWeight: 800 }}>148</div>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>
                {t("manager.totalStudied")}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                {t("manager.hours")}
              </div>
            </motion.div>
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
              <div style={{ fontSize: 36, fontWeight: 800 }}>11 / 24</div>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>
                {t("manager.activeMembers")}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                {t("manager.inTeam")}
              </div>
            </motion.div>
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
              <div style={{ fontSize: 36, fontWeight: 800 }}>286</div>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>
                {t("manager.remainingToGoal")}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                {t("manager.lessons")}
              </div>
            </motion.div>
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
              <div style={{ fontSize: 36, fontWeight: 800 }}>{TEAM_RANKING.place}</div>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>
                {t("manager.teamPlacement")}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                {t("manager.outOfTeams")}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* B. Varování pod firemním minimem */}
      {TEAM_DIGISKILLS_INDEX < COMPANY_TEAM_MINIMUM && (
        <motion.div
          variants={itemVariants}
          style={{
            background: "rgba(255,117,117,0.5)",
            border: "1px solid #FF7575",
            borderRadius: 12,
            padding: "20px 24px",
            boxShadow: "0 2px 8px var(--color-card-shadow)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--color-text-main)",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            Pozor, výsledky vašeho týmu jsou pod minimem firmy.
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--color-text-main)",
            }}
          >
            Aktuálně je tým na hodnotě {TEAM_DIGISKILLS_INDEX.toFixed(1)} z 10, zatímco firemní minimum je{" "}
            {COMPANY_TEAM_MINIMUM.toFixed(1)}. Doporučujeme během příštích 14 dnů dokončit alespoň 4 rozkoukané
            kurzy v týmu a přidat minimálně 2 kurzy zaměřené na Power Automate nebo AI promptování.
          </p>
        </motion.div>
      )}

      {/* B. Naše Cesta (Team Vision Path) */}
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
          {t("manager.teamPath")}
        </h2>

        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              height: 12,
              borderRadius: 6,
              overflow: "hidden",
              background: "var(--color-border)",
            }}
          >
            <div
              style={{
                flex: 1,
                background: "var(--color-accent-green)",
              }}
            />
            <div
              style={{
                flex: 1,
                background: "var(--color-primary)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "white",
                  boxShadow: "0 0 0 3px var(--color-primary)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                background: "var(--color-border)",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {MILESTONE_KEYS.map((key, idx) => {
            const status = idx === 0 ? "active" : "pending";
            const statusColor = status === "active" ? "var(--color-primary)" : "var(--color-text-secondary)";
            const statusLabel = status === "active" ? t("manager.inProgress") : t("manager.waiting");
            return (
            <div
              key={idx}
              style={{
                textAlign: "center",
                padding: "12px 8px",
                background: "var(--color-breeze)",
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--color-text-main)",
                }}
              >
                {t(key)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  marginTop: 4,
                  color: statusColor,
                }}
              >
                {statusLabel}
              </div>
            </div>
          );
          })}
        </div>
      </motion.div>

      {/* C. Aktivita Týmu (Graf + leaderboardy) */}
      <motion.div
        variants={itemVariants}
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
              margin: "0 0 24px",
              fontStyle: "italic",
            }}
          >
            {t("manager.activityOverTime")}
          </h2>
          <div style={{ width: "100%", height: 260, minHeight: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient
                    id="colorLessons"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />
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
                  formatter={(value) => [`${value ?? 0} ${t("manager.lessons")}`, t("manager.lessonsStudied")]}
                />
                <Area
                  type="monotone"
                  dataKey="lessons"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fill="url(#colorLessons)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
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
              {t("manager.topStudents")}
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
                      background: "var(--color-primary)",
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
                      {student.points} {t("manager.points")}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--color-primary)",
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
              {t("manager.inactiveStudents")}
            </h2>
            <p style={{ margin: "0 0 20px", fontSize: 12, color: "var(--color-text-secondary)" }}>
              {t("manager.inactiveStudentsDesc")}
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
                      {student.points} {t("manager.points")} · {student.inactiveDays} {t("manager.daysNoActivity")}
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
        </motion.div>
      </motion.div>

      {/* D. Zvládnutá vs. Chybějící témata */}
      <motion.div
        variants={itemVariants}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
          transition={HOVER_TRANSITION}
          style={{
            background: "rgba(119, 249, 217, 0.25)",
            borderRadius: 16,
            padding: 24,
            border: "1px solid rgba(119, 249, 217, 0.5)",
          }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--color-text-main)",
              margin: "0 0 20px",
              fontStyle: "italic",
            }}
          >
            {t("manager.strengths")}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {STRENGTHS.map((item) => (
              <div key={item.topic}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--color-text-main)",
                    }}
                  >
                    {item.topic}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--color-text-main)",
                    }}
                  >
                    {item.percent} %
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "rgba(255,255,255,0.6)",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${item.percent}%`,
                      background: "var(--color-accent-green)",
                      borderRadius: 4,
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
          transition={HOVER_TRANSITION}
          style={{
            background: "rgba(247, 152, 28, 0.15)",
            borderRadius: 16,
            padding: 24,
            border: "1px solid rgba(247, 152, 28, 0.4)",
          }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--color-text-main)",
              margin: "0 0 20px",
              fontStyle: "italic",
            }}
          >
            {t("manager.gaps")}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {GAPS.map((item) => (
              <div key={item.topic}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--color-text-main)",
                    }}
                  >
                    {item.topic}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--color-text-main)",
                    }}
                  >
                    {item.percent} %
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "rgba(255,255,255,0.6)",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${item.percent}%`,
                      background: "var(--color-accent-orange)",
                      borderRadius: 4,
                      transition: "width 0.4s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* E. Dokončené kurzy */}
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
            {t("manager.completedCourses")}
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)" }}>
            {t("manager.completedCoursesDesc")}
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
                    color: pct >= 80 ? "#059669" : "var(--color-accent-orange)",
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
                    <span>{t("manager.completionRate")}</span>
                    <span style={{ fontWeight: 700, color: pct >= 80 ? "#059669" : "var(--color-accent-orange)" }}>
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
                        background: pct >= 80 ? "#10b981" : "var(--color-accent-orange)",
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

      {/* F. Nejoblíbenější kurzy + Kurzy s nejnižším dokončením */}
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
              {t("manager.popularCourses")}
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>
              {t("manager.popularCoursesDesc")}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, justifyContent: "space-between" }}>
            {POPULAR_COURSES.map((course, idx) => (
              <div
                key={course.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 14px",
                  background: idx === 0 ? "rgba(37,150,255,0.06)" : "var(--color-breeze)",
                  borderRadius: 10,
                  border: idx === 0 ? "1px solid rgba(37,150,255,0.2)" : "1px solid transparent",
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
                      color: "var(--color-primary)",
                    }}
                  >
                    {course.students}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--color-text-secondary)" }}>
                    {t("manager.studentsCount")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Kurzy s nejnižším dokončením */}
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
              {t("manager.lowCompletionCourses")}
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>
              {t("manager.lowCompletionCoursesDesc")}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {LOW_COMPLETION_COURSES.map((course) => (
              <div
                key={course.name}
                style={{
                  padding: "14px 16px",
                  background: "rgba(247,152,28,0.08)",
                  borderRadius: 10,
                  border: "1px solid rgba(247,152,28,0.3)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-main)" }}>
                      {course.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>
                      {course.category} · {course.enrolled} {t("manager.activeStudents")}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(247,152,28,0.2)",
                      color: "#b45309",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 6,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("manager.actionNeeded")}
                  </div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      color: "var(--color-text-secondary)",
                      marginBottom: 4,
                    }}
                  >
                    <span>{t("manager.completionRate")}</span>
                    <span style={{ fontWeight: 700, color: "#b45309" }}>{course.completionRate} %</span>
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
                        width: `${course.completionRate}%`,
                        background: "var(--color-accent-orange)",
                        borderRadius: 3,
                      }}
                    />
                  </div>
                </div>
                <button
                  style={{
                    background: "transparent",
                    border: "1px solid var(--color-accent-orange)",
                    color: "#b45309",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  {t("manager.sendReminder")}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

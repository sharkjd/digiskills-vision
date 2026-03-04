"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { COURSE_LIST, COMPLETED_COURSES } from "@/data/courses";

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

const ACTIVITY_WEEKS = [1, 2, 3, 4, 5];
const ACTIVITY_LESSONS = [2, 3, 1, 4, 2];

const STRENGTHS = [
  { topic: "Kyberbezpečnost", percent: 58 },
  { topic: "Excel", percent: 44 },
  { topic: "Komunikace", percent: 51 },
];

const GAPS = [
  { topic: "Power Automate", percent: 11 },
  { topic: "AI Promptování", percent: 9 },
  { topic: "Cloud", percent: 14 },
];

const MILESTONE_KEYS = ["manager.milestone1", "manager.milestone2", "manager.milestone3"] as const;

const USER_NAME = "Honza Dolejš";
const DIGISKILLS_INDEX = 4.1;
const COMPANY_AVG = 5.8;
const BEST_EMPLOYEE = 9.2;
const COMPANY_MINIMUM = 5.5;

export default function ProfileDashboard() {
  const { t } = useTranslation();
  const [ctaHovered, setCtaHovered] = useState(false);
  const activityData = ACTIVITY_WEEKS.map((w, i) => ({
    week: `${t("profile.week")} ${w}`,
    lessons: ACTIVITY_LESSONS[i],
  }));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      {/* A. Hero Banner – gradient + dvousloupcový layout s avatarem */}
      <motion.div
        variants={itemVariants}
        style={{
          background: "var(--color-primary)",
          borderRadius: 16,
          padding: "36px 32px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: 32, alignItems: "flex-start" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
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
                {t("profile.yourProfile")}
              </div>
              <h1
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  margin: "0 0 12px",
                  fontStyle: "italic",
                }}
              >
                {t("profile.yourDigitalPath")}
              </h1>
              <p style={{ fontSize: 15, opacity: 0.9, margin: 0, lineHeight: 1.6 }}>
                {t("profile.continueText")}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { value: "9", label: t("profile.totalStudied"), sub: t("profile.hours") },
                { value: "2", label: "Aktivní série", sub: "dní v řadě" },
                { value: "23", label: "Zbývá k cíli", sub: "lekcí" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                  transition={HOVER_TRANSITION}
                  style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 12,
                  padding: "20px 16px",
                  textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 36, fontWeight: 800 }}>{stat.value}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                border: "3px solid rgba(119,249,217,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                fontWeight: 800,
                color: "white",
              }}
            >
              HD
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{USER_NAME}</div>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>Pořadí: 39. z 47</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* B. Varování pod firemním minimem */}
      {DIGISKILLS_INDEX < COMPANY_MINIMUM && (
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
            Pozor, vaše výsledky jsou pod minimem vaší firmy.
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--color-text-main)",
            }}
          >
            Aktuálně jste na hodnotě {DIGISKILLS_INDEX.toFixed(1)} z 10, zatímco firemní minimum je{" "}
            {COMPANY_MINIMUM.toFixed(1)}. Doporučujeme dokončit alespoň 2 rozkoukané kurzy a během příštích 14 dnů
            přidat 1 kurz zaměřený na Power Automate nebo AI promptování.
          </p>
        </motion.div>
      )}

      {/* B. Digiskills Index – přesunut výš, horizontální karta na celou šířku */}
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
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        {/* Gauge vlevo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative", width: 140, height: 140 }}>
            <svg width="140" height="140" viewBox="0 0 140 140" style={{ display: "block" }}>
              <circle cx="70" cy="70" r="60" fill="none" stroke="var(--color-border)" strokeWidth="12" />
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="#77F9D9"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(DIGISKILLS_INDEX / 10) * 377} 377`}
                transform="rotate(-90 70 70)"
                style={{ transition: "stroke-dasharray 0.6s ease" }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 800, color: "var(--color-text-main)" }}>
                {DIGISKILLS_INDEX.toFixed(1)}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>/ 10</div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--color-text-main)" }}>
              Digiskills Index
            </div>
            <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 2 }}>
              Pořadí: 39. z 47 zaměstnanců
            </div>
          </div>
        </div>

        {/* Porovnávací pruhy vpravo */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--color-text-main)",
              margin: "0 0 4px",
              fontStyle: "italic",
            }}
          >
            Jak si stojíte v porovnání s ostatními
          </h2>
          {[
            { label: USER_NAME, value: DIGISKILLS_INDEX, color: "#77F9D9", bold: true },
            { label: "Průměr firmy", value: COMPANY_AVG, color: "var(--color-primary)", bold: false },
            { label: "Firemní minimum", value: COMPANY_MINIMUM, color: "var(--color-accent-orange)", bold: false },
            { label: "Nejlepší zaměstnanec", value: BEST_EMPLOYEE, color: "var(--color-accent-orange)", bold: false },
          ].map((row) => (
            <div key={row.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: row.bold ? 700 : 500,
                    color: "var(--color-text-main)",
                  }}
                >
                  {row.label}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-main)" }}>
                  {row.value.toFixed(1)}
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

      {/* C. Cesta jednotlivce – step indikátory */}
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
            margin: "0 0 28px",
            fontStyle: "italic",
          }}
        >
          Vaše cesta: Kam směřujete
        </h2>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "calc(16.66% + 20px)",
              right: "calc(16.66% + 20px)",
              height: 3,
              background: "var(--color-border)",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "calc(16.66% + 20px)",
              width: "calc(33.33% - 40px)",
              height: 3,
              background: "var(--color-accent-green)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "50%",
              width: "calc(16.66% - 20px)",
              height: 3,
              background: "var(--color-primary)",
              zIndex: 1,
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              position: "relative",
              zIndex: 2,
            }}
          >
            {MILESTONE_KEYS.map((key, idx) => {
              const status = idx === 0 ? "active" : "pending";
              const circleColor =
                status === "done"
                  ? "var(--color-accent-green)"
                  : status === "active"
                    ? "var(--color-primary)"
                    : "var(--color-border)";
              const circleTextColor = status === "pending" ? "var(--color-text-secondary)" : "white";
              return (
                <div
                  key={key}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: circleColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: 800,
                      color: circleTextColor,
                      boxShadow: status === "active" ? "0 0 0 4px rgba(37,150,255,0.25)" : undefined,
                    }}
                  >
                    {status === "done" ? "✓" : idx + 1}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-main)" }}>
                      {t(key)}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        marginTop: 4,
                        color:
                          status === "done"
                            ? "var(--color-accent-green)"
                            : status === "active"
                              ? "var(--color-primary)"
                              : "var(--color-text-secondary)",
                      }}
                    >
                      {status === "done"
                        ? t("profile.done")
                        : status === "active"
                          ? t("profile.inProgress")
                          : t("profile.waiting")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* D. Graf aktivity – celá šířka (bez vedlejšího sloupce) */}
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
          {t("profile.activityOverTime")}
        </h2>
        <div style={{ width: "100%", height: 220, minHeight: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorLessonsProfile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#77F9D9" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#77F9D9" stopOpacity={0} />
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
                formatter={(value) => [`${value ?? 0}`, t("profile.lessonsStudied")]}
              />
              <Area
                type="monotone"
                dataKey="lessons"
                stroke="#77F9D9"
                strokeWidth={2.5}
                fill="url(#colorLessonsProfile)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* E. Silné stránky + Mezery – jedna karta, dvě sekce s pill tagy */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
        transition={HOVER_TRANSITION}
        style={{
          background: "var(--color-background)",
          borderRadius: 16,
          border: "1px solid var(--color-border)",
          boxShadow: "0 2px 8px var(--color-card-shadow)",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {/* Silné stránky */}
          <div
            style={{
              padding: "28px 28px",
              borderRight: "1px solid var(--color-border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--color-accent-green)",
                  flexShrink: 0,
                }}
              />
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--color-text-main)",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                Co už ovládáte
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {STRENGTHS.map((item) => (
                <div
                  key={item.topic}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(119,249,217,0.15)",
                    border: "1.5px solid rgba(119,249,217,0.6)",
                    borderRadius: 999,
                    padding: "8px 16px",
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-main)" }}>
                    {item.topic}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: "var(--color-digi-sky)",
                      background: "rgba(119,249,217,0.5)",
                      borderRadius: 999,
                      padding: "1px 8px",
                    }}
                  >
                    {item.percent} %
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mezery */}
          <div style={{ padding: "28px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--color-accent-orange)",
                  flexShrink: 0,
                }}
              />
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--color-text-main)",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                Příležitosti k růstu
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {GAPS.map((item) => (
                <div
                  key={item.topic}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(247,152,28,0.08)",
                    border: "1.5px solid rgba(247,152,28,0.5)",
                    borderRadius: 999,
                    padding: "8px 16px",
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-main)" }}>
                    {item.topic}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: "var(--color-digi-sky)",
                      background: "rgba(247,152,28,0.2)",
                      borderRadius: 999,
                      padding: "1px 8px",
                    }}
                  >
                    {item.percent} %
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* F. Přehled kurzů – dokončené / rozkoukané / zbývající */}
      <CourseProgressSection />

      {/* G. CTA – outline styl, běžná velikost, zarovnáno doprostřed */}
      <motion.div variants={itemVariants} style={{ display: "flex", justifyContent: "center" }}>
        <Link href="/moje-kurzy">
          <motion.div
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 8px 24px rgba(37,150,255,0.2)",
              background: "var(--color-primary)",
            }}
            transition={HOVER_TRANSITION}
            style={{
              background: "var(--color-background)",
              border: "2px solid var(--color-primary)",
              borderRadius: 12,
              padding: "12px 22px",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                color: ctaHovered ? "white" : "var(--color-primary)",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Přejít na moje kurzy
            </span>
            <span
              style={{
                color: ctaHovered ? "white" : "var(--color-primary)",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              →
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// Fake: kurzy 0–1 jsou rozkoukané (in-progress), 2–4 zbývají
const IN_PROGRESS_IDS = [COURSE_LIST[0], COURSE_LIST[1]];
const IN_PROGRESS_PERCENT = [65, 30];
const REMAINING = COURSE_LIST.slice(2, 5);

function CourseProgressSection() {
  return (
    <motion.div
      variants={itemVariants}
      style={{
        background: "var(--color-background)",
        borderRadius: 16,
        border: "1px solid var(--color-border)",
        boxShadow: "0 2px 8px var(--color-card-shadow)",
        overflow: "hidden",
      }}
    >
      {/* Hlavička */}
      <div
        style={{
          padding: "24px 28px 20px",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "var(--color-text-main)",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          Moje kurzy
        </h2>
        <div style={{ display: "flex", gap: 20, fontSize: 13, color: "var(--color-text-secondary)" }}>
          <span>
            <span style={{ fontWeight: 700, color: "var(--color-accent-green)" }}>
              {COMPLETED_COURSES.length}
            </span>{" "}
            dokončeno
          </span>
          <span>
            <span style={{ fontWeight: 700, color: "var(--color-primary)" }}>
              {IN_PROGRESS_IDS.length}
            </span>{" "}
            rozkoukáno
          </span>
          <span>
            <span style={{ fontWeight: 700, color: "var(--color-text-secondary)" }}>
              {REMAINING.length}
            </span>{" "}
            zbývá
          </span>
        </div>
      </div>

      {/* Dokončené */}
      <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--color-border)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--color-accent-green)",
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Dokončené
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {COMPLETED_COURSES.map((course) => (
            <CourseRow
              key={course.id}
              title={course.title}
              duration={course.duration}
              activities={course.activities}
              status="done"
              percent={100}
            />
          ))}
        </div>
      </div>

      {/* Rozkoukané */}
      <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--color-border)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--color-primary)",
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Rozkoukané – právě studuji
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {IN_PROGRESS_IDS.map((course, i) => (
            <CourseRow
              key={course.id}
              title={course.title}
              duration={course.duration}
              activities={course.activities}
              status="active"
              percent={IN_PROGRESS_PERCENT[i]}
            />
          ))}
        </div>
      </div>

      {/* Zbývající */}
      <div style={{ padding: "20px 28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--color-border)",
              border: "2px solid var(--color-text-secondary)",
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Zbývá ke studiu
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {REMAINING.map((course) => (
            <CourseRow
              key={course.id}
              title={course.title}
              duration={course.duration}
              activities={course.activities}
              status="pending"
              percent={0}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CourseRow({
  title,
  duration,
  activities,
  status,
  percent,
}: {
  title: string;
  duration: string;
  activities: number;
  status: "done" | "active" | "pending";
  percent: number;
}) {
  const accentColor =
    status === "done"
      ? "var(--color-accent-green)"
      : status === "active"
        ? "var(--color-primary)"
        : "var(--color-border)";

  const iconBg =
    status === "done"
      ? "rgba(119,249,217,0.2)"
      : status === "active"
        ? "rgba(37,150,255,0.1)"
        : "var(--color-breeze)";

  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={HOVER_TRANSITION}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "10px 12px",
        borderRadius: 10,
        background: status === "pending" ? "transparent" : iconBg,
        border: `1px solid ${status === "pending" ? "var(--color-border)" : "transparent"}`,
      }}
    >
      {/* Stavová ikona */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: iconBg,
          border: `2px solid ${accentColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 15,
        }}
      >
        {status === "done" ? "✓" : status === "active" ? "▶" : "○"}
      </div>

      {/* Název + meta */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: status === "pending" ? "var(--color-text-secondary)" : "var(--color-text-main)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </div>
        {status === "active" && (
          <div style={{ marginTop: 5 }}>
            <div
              style={{
                height: 4,
                background: "var(--color-border)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${percent}%`,
                  background: "var(--color-primary)",
                  borderRadius: 2,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Meta vpravo */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{duration}</span>
        <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{activities} lekcí</span>
        {status === "active" && (
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-primary)" }}>
            {percent} %
          </span>
        )}
      </div>
    </motion.div>
  );
}

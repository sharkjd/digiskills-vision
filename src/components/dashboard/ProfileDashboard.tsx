"use client";

import React from "react";
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
const ACTIVITY_LESSONS = [8, 12, 15, 11, 18];

const STRENGTHS = [
  { topic: "Kyberbezpečnost", percent: 92 },
  { topic: "Excel", percent: 85 },
  { topic: "Komunikace", percent: 88 },
];

const GAPS = [
  { topic: "Power Automate", percent: 22 },
  { topic: "AI Promptování", percent: 18 },
  { topic: "Cloud", percent: 25 },
];

const MILESTONE_KEYS = ["manager.milestone1", "manager.milestone2", "manager.milestone3"] as const;

const USER_NAME = "Honza Dolejš";
const DIGISKILLS_INDEX = 7.3;
const COMPANY_AVG = 5.52;
const BEST_EMPLOYEE = 9.2;

export default function ProfileDashboard() {
  const { t } = useTranslation();
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
      {/* A. Hero Banner */}
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
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
              <div style={{ fontSize: 36, fontWeight: 800 }}>24</div>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>
                {t("profile.totalStudied")}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                {t("profile.hours")}
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
              <div style={{ fontSize: 36, fontWeight: 800 }}>12</div>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>
                Aktivní série
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                dní v řadě
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
              <div style={{ fontSize: 36, fontWeight: 800 }}>8</div>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>
                Zbývá k cíli
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                lekcí
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* B. Cesta jednotlivce */}
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
          Vaše cesta: Kam směřujete
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
            const status = idx === 0 ? "done" : idx === 1 ? "active" : "pending";
            return (
            <div
              key={key}
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
          );
          })}
        </div>
      </motion.div>

      {/* C. Aktivita + Digiskills Index */}
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
            {t("profile.activityOverTime")}
          </h2>
          <div style={{ width: "100%", height: 260, minHeight: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient
                    id="colorLessonsProfile"
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
                  formatter={(value) => [`${value ?? 0}`, t("profile.lessonsStudied")]}
                />
                <Area
                  type="monotone"
                  dataKey="lessons"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fill="url(#colorLessonsProfile)"
                />
              </AreaChart>
            </ResponsiveContainer>
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
              margin: "0 0 20px",
              fontStyle: "italic",
            }}
          >
            Digiskills Index
          </h2>
          <DigiskillsIndexGauge
            myScore={DIGISKILLS_INDEX}
            companyAvg={COMPANY_AVG}
            bestEmployee={BEST_EMPLOYEE}
            userName={USER_NAME}
          />
        </motion.div>
      </motion.div>

      {/* D. Silné stránky vs. Prostor pro růst */}
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
            Co už ovládáte (Silné stránky)
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
            Kde máte mezery (Příležitosti k růstu)
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

      {/* E. CTA - Moje kurzy */}
      <motion.div variants={itemVariants}>
        <Link href="/moje-kurzy">
          <motion.div
            whileHover={{
              scale: 1.01,
              boxShadow: "0 8px 24px rgba(37, 150, 255, 0.3)",
            }}
            transition={HOVER_TRANSITION}
            style={{
              background: "var(--color-primary)",
              borderRadius: 16,
              padding: "28px 32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Přejít na moje kurzy
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

function DigiskillsIndexGauge({
  myScore,
  companyAvg,
  bestEmployee,
  userName,
}: {
  myScore: number;
  companyAvg: number;
  bestEmployee: number;
  userName: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "var(--color-primary)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {userName.charAt(0)}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--color-text-main)" }}>
            {userName}
          </div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
            Pořadí: 3. místo z 47 zaměstnanců
          </div>
        </div>
      </div>

      <div style={{ position: "relative", width: 140, height: 140 }}>
        <svg width="140" height="140" viewBox="0 0 140 140" style={{ display: "block" }}>
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="12"
          />
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(myScore / 10) * 377} 377`}
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
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "var(--color-text-main)",
            }}
          >
            {myScore.toFixed(1)}
          </div>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
            / 10
          </div>
        </div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-secondary)" }}>
        Průměr firmy: {companyAvg.toFixed(1)} · Nejlepší: {bestEmployee.toFixed(1)}
      </div>
    </div>
  );
}

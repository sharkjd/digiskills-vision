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
  { week: "Týden 1", lessons: 42 },
  { week: "Týden 2", lessons: 58 },
  { week: "Týden 3", lessons: 71 },
  { week: "Týden 4", lessons: 65 },
  { week: "Týden 5", lessons: 89 },
];

const TOP_STUDENTS = [
  { name: "Marie Nováková", points: 124, initials: "MN" },
  { name: "Petr Svoboda", points: 98, initials: "PS" },
  { name: "Eva Horáková", points: 87, initials: "EH" },
  { name: "Jan Procházka", points: 76, initials: "JP" },
  { name: "Lucie Dvořáková", points: 65, initials: "LD" },
];

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

const MILESTONES = [
  { id: "1", label: "Zvládnutí základů", status: "done" as const },
  { id: "2", label: "Zvýšení produktivity v M365", status: "active" as const },
  { id: "3", label: "AI Inovátoři", status: "pending" as const },
];

export default function ManagerDashboard() {
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
              Vašemu týmu se daří skvěle!
            </h1>
            <p style={{ fontSize: 15, opacity: 0.9, margin: 0, lineHeight: 1.6 }}>
              Jste za polovinou firemní cesty. Tento týden nejvíce rezonuje téma
              Umělé inteligence.
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
              <div style={{ fontSize: 36, fontWeight: 800 }}>345</div>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>
                Celkem odstudováno
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                hodin
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
              <div style={{ fontSize: 36, fontWeight: 800 }}>18 / 24</div>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>
                Aktivní členové
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                v týmu
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
              <div style={{ fontSize: 36, fontWeight: 800 }}>120</div>
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
          Cesta našeho týmu: Kam směřujeme
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
          {MILESTONES.map((milestone) => (
            <div
              key={milestone.id}
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
                {milestone.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  marginTop: 4,
                  color:
                    milestone.status === "done"
                      ? "var(--color-accent-green)"
                      : milestone.status === "active"
                        ? "var(--color-primary)"
                        : "var(--color-text-secondary)",
                }}
              >
                {milestone.status === "done"
                  ? "Hotovo"
                  : milestone.status === "active"
                    ? "Probíhá"
                    : "Čeká"}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* C. Aktivita Týmu (Graf & Leaderboard) */}
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
            Aktivita v čase (posledních 30 dní)
          </h2>
          <div style={{ width: "100%", height: 260, minHeight: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ACTIVITY_DATA}>
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
                  formatter={(value) => [`${value ?? 0} lekcí`, "Odstudováno"]}
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
            Top studenti
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
                    {student.points} bodů
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
            Co už ovládáme (Silné stránky)
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
            Kde máme mezery (Příležitosti k růstu)
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
    </motion.div>
  );
}

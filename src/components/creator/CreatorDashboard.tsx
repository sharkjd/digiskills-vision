"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
import {
  ArrowRight,
  Bot,
  BookOpen,
  Clock,
  Layers3,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { getCreatorCourses } from "@/data/creator-courses";
import type { CreatorCourse } from "@/data/creator-courses";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

const COURSE_PRICE_CZK = 999;
const COMMISSION_RATE = 0.5;

const CREATOR_NAME = "Honza Dolejš";
const CREATOR_INITIALS = "HD";

const SALES_COUNTS = [8, 12, 6, 10, 5, 6];
const MONTH_KEYS = ["creator.monthJan", "creator.monthFeb", "creator.monthMar", "creator.monthApr", "creator.monthMay", "creator.monthJun"];

const CREATOR_BENEFITS = [
  { icon: Clock, titleKey: "creator.benefit1Title", descKey: "creator.benefit1Desc", gradient: "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)", shadowColor: "rgba(37, 150, 255, 0.3)" },
  { icon: Layers3, titleKey: "creator.benefit2Title", descKey: "creator.benefit2Desc", gradient: "linear-gradient(135deg, #77F9D9 0%, #10B981 100%)", shadowColor: "rgba(119, 249, 217, 0.3)" },
  { icon: Target, titleKey: "creator.benefit3Title", descKey: "creator.benefit3Desc", gradient: "linear-gradient(135deg, #F7981C 0%, #EA580C 100%)", shadowColor: "rgba(247, 152, 28, 0.3)" },
  { icon: Sparkles, titleKey: "creator.benefit4Title", descKey: "creator.benefit4Desc", gradient: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)", shadowColor: "rgba(99, 102, 241, 0.3)" },
];

const TIPS = [
  { icon: Clock, titleKey: "creator.tip1Title", descKey: "creator.tip1Desc", color: "#2596FF" },
  { icon: Lightbulb, titleKey: "creator.tip2Title", descKey: "creator.tip2Desc", color: "#F7981C" },
  { icon: MessageSquare, titleKey: "creator.tip3Title", descKey: "creator.tip3Desc", color: "#10B981" },
];

export default function CreatorDashboard() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const courses = getCreatorCourses(language);

  const stats = useMemo(() => {
    const totalSales = courses.reduce((sum, c) => sum + (c.sales || 0), 0);
    const totalRevenue = courses.reduce((sum, c) => sum + (c.revenue || 0), 0);
    return {
      totalCourses: courses.length,
      totalSales,
      totalRevenue,
    };
  }, [courses]);

  const chartData = useMemo(
    () =>
      MONTH_KEYS.map((key, i) => ({
        month: t(key),
        sales: SALES_COUNTS[i],
      })),
    [t]
  );

  const sortedBySales = useMemo(
    () =>
      [...courses]
        .filter((c) => typeof c.sales === "number")
        .sort((a, b) => (b.sales || 0) - (a.sales || 0))
        .slice(0, 5),
    [courses]
  );

  const maxSales = sortedBySales[0]?.sales || 1;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "40px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      {/* 1. HERO SEKCE */}
      <motion.div
        variants={itemVariants}
        style={{
          background: "#059669",
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
                  background: "rgba(255,255,255,0.15)",
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                {t("creator.badge")}
              </div>
              <h1
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  margin: "0 0 8px",
                  fontStyle: "italic",
                }}
              >
                {t("creator.welcomeBack", { name: CREATOR_NAME.split(" ")[0] })}
              </h1>
              <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>
                {t("creator.heroSubtitle")}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                transition={HOVER_TRANSITION}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 40, fontWeight: 800 }}>{stats.totalCourses}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{t("creator.publishedCourses")}</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                transition={HOVER_TRANSITION}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 40, fontWeight: 800 }}>{stats.totalSales}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{t("creator.totalSalesLabel")}</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                transition={HOVER_TRANSITION}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: 20,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 40, fontWeight: 800, color: "#77F9D9" }}>
                  {stats.totalRevenue.toLocaleString("cs-CZ")} Kč
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{t("creator.totalEarnings")}</div>
              </motion.div>
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
              {CREATOR_INITIALS}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{CREATOR_NAME}</div>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>{t("creator.courseCreator")}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. SEKCE: PŘEHLED PRODEJŮ */}
      <motion.div variants={itemVariants}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--color-text-main)",
            margin: "0 0 20px",
            fontStyle: "italic",
          }}
        >
          {t("creator.salesOverview")}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Tabulka prodejů */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            transition={HOVER_TRANSITION}
            style={{
              background: "var(--color-background)",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
              padding: 24,
            }}
          >
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: 17,
                fontWeight: 700,
                color: "var(--color-text-main)",
                fontStyle: "italic",
              }}
            >
              {t("creator.salesByCourse")}
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px 12px",
                        borderBottom: "2px solid var(--color-border)",
                        color: "var(--color-text-main)",
                        fontWeight: 600,
                      }}
                    >
                      {t("creator.tableCourse")}
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "10px 12px",
                        borderBottom: "2px solid var(--color-border)",
                        color: "var(--color-text-main)",
                        fontWeight: 600,
                      }}
                    >
                      {t("creator.tableSales")}
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "10px 12px",
                        borderBottom: "2px solid var(--color-border)",
                        color: "var(--color-text-main)",
                        fontWeight: 600,
                      }}
                    >
                      {t("creator.tableCommission")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses
                    .filter((c) => typeof c.sales === "number")
                    .map((course) => (
                      <tr key={course.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                        <td
                          style={{
                            padding: "12px",
                            color: "var(--color-text-main)",
                            fontWeight: 500,
                          }}
                        >
                          {course.title}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            textAlign: "right",
                            color: "var(--color-text-main)",
                          }}
                        >
                          {course.sales}
                        </td>
                        <td
                          style={{
                            padding: "12px",
                            textAlign: "right",
                            color: "var(--color-primary)",
                            fontWeight: 600,
                          }}
                        >
                          {course.revenue?.toLocaleString("cs-CZ")} Kč
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: "var(--color-breeze)" }}>
                    <td
                      style={{
                        padding: "12px",
                        fontWeight: 700,
                        color: "var(--color-text-main)",
                      }}
                    >
                      {t("creator.tableTotal")}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: 700,
                        color: "var(--color-text-main)",
                      }}
                    >
                      {stats.totalSales}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: 700,
                        color: "var(--color-accent-green)",
                      }}
                    >
                      {stats.totalRevenue.toLocaleString("cs-CZ")} Kč
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>

          {/* Graf prodejů */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            transition={HOVER_TRANSITION}
            style={{
              background: "var(--color-background)",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
              padding: 24,
            }}
          >
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: 17,
                fontWeight: 700,
                color: "var(--color-text-main)",
                fontStyle: "italic",
              }}
            >
              {t("creator.salesOverTime")}
            </h3>
            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSalesCreator" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2596FF" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#2596FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-background)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      boxShadow: "0 4px 12px var(--color-card-shadow)",
                    }}
                    labelStyle={{ fontWeight: 600, color: "var(--color-text-main)" }}
                    formatter={(value: number | undefined) => [`${value ?? 0}`, "Prodeje"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#2596FF"
                    strokeWidth={2.5}
                    fill="url(#colorSalesCreator)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 3. SEKCE: NEJPRODÁVANĚJŠÍ KURZY */}
      <motion.div variants={itemVariants}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--color-text-main)",
            margin: "0 0 20px",
            fontStyle: "italic",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Trophy size={24} color="var(--color-accent-orange)" />
          Nejprodávanější kurzy
        </h2>

        <motion.div
          whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
          transition={HOVER_TRANSITION}
          style={{
            background: "var(--color-background)",
            borderRadius: 16,
            border: "1px solid var(--color-border)",
            boxShadow: "0 2px 8px var(--color-card-shadow)",
            overflow: "hidden",
          }}
        >
          {sortedBySales.map((course, index) => (
            <div
              key={course.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "20px 24px",
                borderBottom: index < sortedBySales.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              {/* Pořadí */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background:
                    index === 0
                      ? "linear-gradient(135deg, #F7981C 0%, #EA580C 100%)"
                      : index === 1
                        ? "linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)"
                        : index === 2
                          ? "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)"
                          : "var(--color-breeze)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 16,
                  color: index < 3 ? "white" : "var(--color-text-main)",
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </div>

              {/* Obrázek kurzu */}
              <div
                style={{
                  width: 64,
                  height: 48,
                  borderRadius: 8,
                  overflow: "hidden",
                  flexShrink: 0,
                  position: "relative",
                  background: "var(--color-breeze)",
                }}
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="64px"
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--color-text-main)",
                    marginBottom: 6,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {course.title}
                </div>
                {/* Progress bar */}
                <div
                  style={{
                    height: 6,
                    background: "var(--color-breeze)",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${((course.sales || 0) / maxSales) * 100}%`,
                      background:
                        index === 0
                          ? "var(--color-accent-orange)"
                          : index === 1
                            ? "var(--color-primary)"
                            : "var(--color-accent-green)",
                      borderRadius: 3,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text-main)" }}>
                  {course.sales} {t("creator.salesCount")}
                </div>
                <div style={{ fontSize: 13, color: "var(--color-accent-green)", fontWeight: 600 }}>
                  {course.revenue?.toLocaleString("cs-CZ")} Kč
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* 4. SEKCE: MOJE KURZY */}
      <motion.div variants={itemVariants}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--color-text-main)",
            margin: "0 0 20px",
            fontStyle: "italic",
          }}
        >
          Moje kurzy
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </motion.div>

      {/* 5. SEKCE: VYTVOŘTE KURZ POMOCÍ AI */}
      <motion.div variants={itemVariants}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--color-text-main)",
            margin: "0 0 20px",
            fontStyle: "italic",
          }}
        >
          Vytvořte nový kurz
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
          {/* AI Card */}
          <Link href="/admin/tvorba-kurzu" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
              transition={HOVER_TRANSITION}
              style={{
                background: "var(--color-background)",
                borderRadius: 16,
                border: "1px solid var(--color-border)",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                cursor: "pointer",
                boxShadow: "0 2px 8px var(--color-card-shadow)",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 16px rgba(37, 150, 255, 0.3)",
                  }}
                >
                  <Bot size={24} color="white" strokeWidth={2} />
                </div>
                <motion.div
                  whileHover={{ x: 4 }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "var(--color-breeze)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ArrowRight size={20} color="var(--color-primary)" />
                </motion.div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text-main)", margin: 0 }}>
                    Tvorba pomocí AI
                  </h3>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      padding: "3px 8px",
                      background: "rgba(37, 150, 255, 0.1)",
                      color: "var(--color-primary)",
                      borderRadius: 5,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Sparkles size={10} />
                    Doporučeno
                  </span>
                </div>
                <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5 }}>
                  Stačí popsat cíle, nahrát materiály a kurz AI navrhne za vás. Hotovo za 15 minut.
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Manual Card - Disabled */}
          <div
            style={{
              background: "var(--color-background)",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              cursor: "not-allowed",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
              opacity: 0.6,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <BookOpen size={24} color="white" strokeWidth={2} />
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--color-breeze)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ArrowRight size={20} color="var(--color-text-secondary)" />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text-main)", margin: 0 }}>
                  Ruční tvorba kurzu
                </h3>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "3px 8px",
                    background: "rgba(247, 152, 28, 0.12)",
                    color: "#EA580C",
                    borderRadius: 5,
                  }}
                >
                  Brzy
                </span>
              </div>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5 }}>
                Klasická ruční tvorba kurzu v editoru. Pro pokročilé tvůrce.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid 2x2 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {CREATOR_BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.titleKey}
                whileHover={{ y: -4, boxShadow: `0 12px 32px ${benefit.shadowColor}` }}
                transition={HOVER_TRANSITION}
                style={{
                  background: "var(--color-background)",
                  borderRadius: 16,
                  border: "1px solid var(--color-border)",
                  padding: 20,
                  boxShadow: "0 2px 8px var(--color-card-shadow)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: benefit.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 14,
                    boxShadow: `0 4px 12px ${benefit.shadowColor}`,
                  }}
                >
                  <Icon size={22} color="white" />
                </div>
                <h4 style={{ margin: "0 0 6px", color: "var(--color-text-main)", fontWeight: 700, fontSize: 14 }}>
                  {t(benefit.titleKey)}
                </h4>
                <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 12, lineHeight: 1.5 }}>
                  {t(benefit.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 6. SEKCE: TIPY PRO ÚSPĚŠNÝ KURZ */}
      <motion.div variants={itemVariants}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--color-text-main)",
            margin: "0 0 20px",
            fontStyle: "italic",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Zap size={24} color="var(--color-primary)" />
          Tipy pro úspěšný kurz
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {TIPS.map((tip) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={tip.titleKey}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
                transition={HOVER_TRANSITION}
                style={{
                  background: "var(--color-background)",
                  borderRadius: 16,
                  border: "1px solid var(--color-border)",
                  padding: 24,
                  boxShadow: "0 2px 8px var(--color-card-shadow)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${tip.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Icon size={24} color={tip.color} />
                </div>
                <h4 style={{ margin: "0 0 8px", color: "var(--color-text-main)", fontWeight: 700, fontSize: 16 }}>
                  {t(tip.titleKey)}
                </h4>
                <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
                  {t(tip.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 7. CTA BANNER */}
      <motion.div
        variants={itemVariants}
        style={{
          background: "var(--color-primary)",
          borderRadius: 16,
          padding: "28px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ color: "white" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>
            Připraveni vytvořit další kurz?
          </h3>
          <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
            S pomocí AI máte nový kurz hotový za 15 minut. Začněte hned.
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }} transition={HOVER_TRANSITION}>
          <Link
            href="/admin/tvorba-kurzu"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              background: "white",
              border: "none",
              borderRadius: 10,
              color: "var(--color-primary)",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Vytvořit nový kurz
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function CourseCard({ course }: { course: CreatorCourse }) {
  const statusConfig = {
    published: { label: "Publikováno", color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" },
    draft: { label: "Koncept", color: "#F7981C", bg: "rgba(247, 152, 28, 0.1)" },
    in_review: { label: "Ke schválení", color: "#6366F1", bg: "rgba(99, 102, 241, 0.1)" },
  };

  const status = statusConfig[course.status];

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}
      transition={HOVER_TRANSITION}
      style={{
        background: "var(--color-background)",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        boxShadow: "0 2px 8px var(--color-card-shadow)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Obrázek */}
      <div
        style={{
          height: 140,
          position: "relative",
          background: "var(--color-breeze)",
        }}
      >
        <Image
          src={course.image}
          alt={course.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 280px"
        />
        {/* Status badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            padding: "4px 10px",
            borderRadius: 6,
            background: status.bg,
            color: status.color,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {status.label}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 8px",
                background: "var(--color-breeze)",
                borderRadius: 6,
                color: "var(--color-text-secondary)",
              }}
            >
              {course.duration}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 8px",
                background: "rgba(37, 150, 255, 0.1)",
                borderRadius: 6,
                color: "var(--color-primary)",
              }}
            >
              {course.level}
            </span>
          </div>

          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-main)", margin: "0 0 8px" }}>
            {course.title}
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "var(--color-text-secondary)",
              margin: 0,
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {course.description}
          </p>
        </div>

        {/* Stats */}
        {typeof course.sales === "number" && (
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              <span style={{ fontWeight: 700, color: "var(--color-text-main)" }}>{course.sales}</span> prodejů
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-accent-green)" }}>
              {course.revenue?.toLocaleString("cs-CZ")} Kč
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import type { CreatorCourse } from "@/data/creator-courses";

const COURSE_PRICE_CZK = 999;
const COMMISSION_RATE = 0.5;

/** Fejková prodejní data za 6 měsíců (celkem 47 prodejů). */
const SALES_COUNTS = [8, 12, 6, 10, 5, 6];

const MONTH_LABELS_CS = ["Led", "Úno", "Bře", "Dub", "Kvě", "Čvn"];
const MONTH_LABELS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

type CommissionsModalProps = {
  open: boolean;
  onClose: () => void;
  courses: CreatorCourse[];
};

export default function CommissionsModal({
  open,
  onClose,
  courses,
}: CommissionsModalProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const chartData = useMemo(
    () =>
      (language === "en" ? MONTH_LABELS_EN : MONTH_LABELS_CS).map(
        (month, i) => ({
          month,
          sales: SALES_COUNTS[i],
        })
      ),
    [language]
  );

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="commissions-modal-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "rgba(4, 14, 60, 0.75)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        style={{
          width: "100%",
          maxWidth: 640,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "var(--color-background)",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hlavička */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid var(--color-border)",
            flexShrink: 0,
          }}
        >
          <h2
            id="commissions-modal-title"
            style={{
              margin: 0,
              fontSize: "var(--font-size-section-title)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "var(--color-text-main)",
            }}
          >
            {t("creator.commissionsModalTitle")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 8,
              border: "none",
              background: "transparent",
              borderRadius: "var(--radius-btn)",
              color: "var(--color-text-secondary)",
              cursor: "pointer",
            }}
            aria-label={t("creator.commissionsClose")}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-breeze)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Obsah – scroll */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: 20,
          }}
        >
          {/* Karta 1 – Prodeje po kurzech */}
          <section
            style={{
              marginBottom: 20,
              background: "var(--color-background)",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
              padding: 24,
            }}
          >
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--color-text-main)",
                fontStyle: "italic",
              }}
            >
              {t("creator.salesAndCommissions")}
            </h3>
            {courses.length === 0 ? (
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                }}
              >
                {t("creator.noSalesYet")}
              </p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    minWidth: 400,
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
                      <th
                        style={{
                          textAlign: "right",
                          padding: "10px 12px",
                          borderBottom: "2px solid var(--color-border)",
                          color: "var(--color-text-secondary)",
                          fontWeight: 600,
                        }}
                      >
                        {t("creator.tablePrice")}
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          padding: "10px 12px",
                          borderBottom: "2px solid var(--color-border)",
                          color: "var(--color-text-secondary)",
                          fontWeight: 600,
                        }}
                      >
                        {t("creator.tableRate")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr
                        key={course.id}
                        style={{
                          borderBottom: "1px solid var(--color-border)",
                        }}
                      >
                        <td
                          style={{
                            padding: "10px 12px",
                            color: "var(--color-text-main)",
                            fontWeight: 500,
                          }}
                        >
                          {course.title}
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            textAlign: "right",
                            color: "var(--color-text-main)",
                          }}
                        >
                          {course.sales}
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            textAlign: "right",
                            color: "var(--color-primary)",
                            fontWeight: 600,
                          }}
                        >
                          {course.revenue?.toLocaleString("cs-CZ")} Kč
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            textAlign: "right",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {COURSE_PRICE_CZK} Kč
                        </td>
                        <td
                          style={{
                            padding: "10px 12px",
                            textAlign: "right",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {Math.round(COMMISSION_RATE * 100)} %
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Karta 2 – Prodeje v čase */}
          <section
            style={{
              marginBottom: 24,
              background: "var(--color-background)",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
              padding: 24,
            }}
          >
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--color-text-main)",
                fontStyle: "italic",
              }}
            >
              {t("creator.salesOverTime")}
            </h3>
            <div style={{ width: "100%", height: 260, minHeight: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorSales"
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
                    labelStyle={{
                      fontWeight: 600,
                      color: "var(--color-text-main)",
                    }}
                    formatter={(value: number) => [
                      value ?? 0,
                      t("creator.tableSales"),
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Tlačítko Zavřít */}
          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="btn-primary"
              style={{
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                borderRadius: "var(--radius-btn)",
                cursor: "pointer",
              }}
            >
              {t("creator.commissionsClose")}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

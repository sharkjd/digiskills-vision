"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  FileText,
  CheckSquare,
  Image as ImageIcon,
  Clock,
  BarChart3,
  AlertTriangle,
  ChevronDown,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import courseData from "@/data/course-detail.json";
import { VideoActivityContent } from "@/components/courses/ActivityContent";
import { GoalChatbot } from "@/components/courses/GoalChatbot";
import { asset } from "@/lib/paths";

const EXPANDABLE_ACTIVITY_IDS = [1, 2, 3];

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

type ActivityItem = {
  id: number;
  type: string;
  title: string;
  desc: string;
  color: string;
};

type CurriculumSection = {
  section: string;
  items: ActivityItem[];
};

const getActivityIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "video":
      return Play;
    case "chatbot":
      return MessageCircle;
    case "článek":
      return FileText;
    case "úkol":
    case "výzva":
      return CheckSquare;
    case "infografika":
      return ImageIcon;
    default:
      return FileText;
  }
};

const getActivityBadgeStyle = (color: string) => {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    "#A97FEF": { bg: "#EDE9FE", text: "#7C3AED", border: "#A97FEF" },
    "#77F9D9": { bg: "#D1FAE5", text: "#059669", border: "#77F9D9" },
    "#F7981C": { bg: "#FEF3C7", text: "#D97706", border: "#F7981C" },
  };
  return colorMap[color] || { bg: `${color}20`, text: color, border: color };
};

export default function CourseDetailPageClient() {
  const { t } = useTranslation();
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>(
    courseData.curriculum.map((s) => s.section)
  );
  const [expandedActivities, setExpandedActivities] = useState<number[]>([]);

  const toggleActivityComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedActivities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const toggleActivityExpand = (id: number) => {
    if (!EXPANDABLE_ACTIVITY_IDS.includes(id)) return;
    setExpandedActivities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const isActivityExpandable = (id: number) => EXPANDABLE_ACTIVITY_IDS.includes(id);
  const isActivityExpanded = (id: number) => expandedActivities.includes(id);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const progress = completedActivities.length;
  const total = courseData.activitiesCount;
  const progressPercent = Math.round((progress / total) * 100);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-breeze)",
        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* HERO nadpis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 24 }}
        >
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              margin: "0 0 8px",
              fontStyle: "italic",
              color: "var(--color-text-main)",
            }}
          >
            {courseData.courseTitle}
          </h1>
          <p style={{ fontSize: 15, margin: 0, color: "var(--color-text-secondary)" }}>
            Vedoucí kurzu:{" "}
            <strong style={{ color: "var(--color-text-main)" }}>{courseData.instructor}</strong> •{" "}
            {courseData.duration}
          </p>
        </motion.div>

        {/* VIDEO PREVIEW + O KURZU */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6 items-start">
          {/* Video náhled */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}
              transition={HOVER_TRANSITION}
              className="relative overflow-hidden"
              style={{
                backgroundColor: "var(--color-digi-sky)",
                aspectRatio: "16/9",
                borderRadius: 16,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={asset("/courses/teams.webp")}
                  alt="Kurz preview"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: "0 8px 32px rgba(37, 150, 255, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute flex items-center justify-center w-20 h-20 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </motion.button>
              </div>
              {/* Badge Digiskills */}
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-lg flex items-center gap-2"
                style={{ backgroundColor: "var(--color-background)" }}
              >
                <span className="font-bold text-sm" style={{ color: "var(--color-text-main)" }}>
                  {"{ } Digiskills"}
                </span>
              </div>
            </motion.div>
          </div>

          {/* O kurzu + CTA */}
          <div className="lg:col-span-1">
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
              transition={HOVER_TRANSITION}
              style={{
                backgroundColor: "var(--color-background)",
                borderRadius: 16,
                border: "1px solid var(--color-border)",
                padding: 24,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: "rgba(37, 150, 255, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BookOpen style={{ width: 24, height: 24, color: "var(--color-primary)" }} />
                </div>
                <h3 className="text-lg font-bold" style={{ color: "var(--color-text-main)", margin: 0 }}>
                  O kurzu
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)", margin: "0 0 20px" }}
              >
                {courseData.introText}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  paddingTop: 16,
                  borderTop: "1px solid var(--color-border)",
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#F4F5FA",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Clock style={{ width: 18, height: 18, color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>
                      {t("courseDetail.courseLength")}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-main)" }}>
                      {courseData.duration}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#F4F5FA",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BarChart3 style={{ width: 18, height: 18, color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>
                      {t("courseDetail.activityCount")}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-main)" }}>
                      {courseData.activitiesCount}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA tlačítko */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(37, 150, 255, 0.35)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 font-bold text-white text-sm"
                style={{
                  borderRadius: 10,
                  backgroundColor: "var(--color-primary)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {t("courseDetail.startStudy")}
              </motion.button>
              <p
                style={{
                  fontSize: 11,
                  color: "var(--color-text-secondary)",
                  margin: "8px 0 0",
                  textAlign: "center",
                }}
              >
                Pokračujte tam, kde jste skončili
              </p>
            </motion.div>
          </div>
        </div>

        {/* VÁŠ POKROK + UŽITEČNÝ TIP - pod videem, přes celou šířku */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Váš pokrok */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
            transition={HOVER_TRANSITION}
            style={{
              backgroundColor: "var(--color-background)",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              padding: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(119, 249, 217, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BarChart3 style={{ width: 22, height: 22, color: "#059669" }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--color-text-main)", margin: 0 }}>
                {t("courseDetail.yourProgress")}
              </h3>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: "var(--color-text-main)" }}>
                {progress}
              </span>
              <span style={{ fontSize: 15, color: "var(--color-text-secondary)" }}>
                / {total} aktivit
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#059669",
                }}
              >
                {progressPercent} %
              </span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: "#E5E7EB", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ height: "100%", borderRadius: 999, background: "#77F9D9" }}
              />
            </div>
          </motion.div>

          {/* Užitečný tip */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
            transition={HOVER_TRANSITION}
            style={{
              backgroundColor: "#FEF3C7",
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: "#F59E0B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <AlertTriangle style={{ width: 22, height: 22, color: "white" }} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: "#92400E", margin: "0 0 8px" }}>
                  {t("courseDetail.usefulTip")}
                </h3>
                <p className="text-sm" style={{ color: "#92400E", margin: 0, lineHeight: 1.6 }}>
                  {t("courseDetail.tipText")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* OSNOVA KURZU */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            backgroundColor: "var(--color-background)",
            borderRadius: 16,
            border: "1px solid var(--color-border)",
            padding: 32,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                fontStyle: "italic",
                color: "var(--color-text-main)",
                margin: 0,
              }}
            >
              {t("courseDetail.curriculum")}
            </h2>
            <div style={{ display: "flex", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  background: "#F4F5FA",
                  borderRadius: 8,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#77F9D9" }} />
                <span style={{ fontSize: 12, color: "#374151" }}>Dokončeno: {progress}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  background: "#F4F5FA",
                  borderRadius: 8,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E5E7EB" }} />
                <span style={{ fontSize: 12, color: "#374151" }}>Zbývá: {total - progress}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {(courseData.curriculum as CurriculumSection[]).map((section, sectionIdx) => {
              const isExpanded = expandedSections.includes(section.section);
              const sectionCompleted = section.items.filter((i) => completedActivities.includes(i.id)).length;
              const sectionTotal = section.items.length;

              return (
                <motion.div
                  key={sectionIdx}
                  initial={false}
                  style={{
                    backgroundColor: "#F4F5FA",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  {/* Sekce header */}
                  <motion.button
                    onClick={() => toggleSection(section.section)}
                    className="w-full flex items-center justify-between p-4"
                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                    whileHover={{ backgroundColor: "rgba(37, 150, 255, 0.08)" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: sectionCompleted === sectionTotal ? "#77F9D9" : "#2596FF",
                          color: sectionCompleted === sectionTotal ? "#040E3C" : "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {sectionIdx + 1}
                      </div>
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "var(--color-text-main)",
                          margin: 0,
                          textAlign: "left",
                        }}
                      >
                        {section.section}
                      </h3>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                        {sectionCompleted}/{sectionTotal}
                      </span>
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-5 h-5" style={{ color: "var(--color-text-secondary)" }} />
                      </motion.div>
                    </div>
                  </motion.button>

                  {/* Aktivity v sekci */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          style={{
                            padding: "0 16px 16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                          }}
                        >
                          {section.items.map((item) => {
                            const Icon = getActivityIcon(item.type);
                            const isCompleted = completedActivities.includes(item.id);
                            const badgeStyle = getActivityBadgeStyle(item.color);
                            const isExpandable = isActivityExpandable(item.id);
                            const isExpanded = isActivityExpanded(item.id);

                            return (
                              <motion.div
                                key={item.id}
                                initial={false}
                                transition={HOVER_TRANSITION}
                                style={{
                                  borderRadius: 12,
                                  backgroundColor: isCompleted ? "rgba(119, 249, 217, 0.2)" : "white",
                                  border: isExpanded
                                    ? "2px solid var(--color-primary)"
                                    : isCompleted
                                      ? "2px solid #77F9D9"
                                      : "1px solid #E5E7EB",
                                  overflow: "hidden",
                                }}
                              >
                                {/* Activity header - klikací */}
                                <motion.div
                                  whileHover={{
                                    backgroundColor: isExpandable ? "rgba(37, 150, 255, 0.04)" : undefined,
                                  }}
                                  onClick={() => isExpandable && toggleActivityExpand(item.id)}
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 16,
                                    padding: 16,
                                    cursor: isExpandable ? "pointer" : "default",
                                  }}
                                >
                                  {/* Checkbox */}
                                  <div
                                    onClick={(e) => toggleActivityComplete(item.id, e)}
                                    style={{
                                      width: 24,
                                      height: 24,
                                      borderRadius: 6,
                                      border: `2px solid ${isCompleted ? "#77F9D9" : "#D1D5DB"}`,
                                      backgroundColor: isCompleted ? "#77F9D9" : "white",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexShrink: 0,
                                      marginTop: 2,
                                      transition: "all 0.2s",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {isCompleted && (
                                      <motion.svg
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-4 h-4"
                                        viewBox="0 0 20 20"
                                        fill="#040E3C"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </motion.svg>
                                    )}
                                  </div>

                                  {/* Badge typu */}
                                  <div
                                    style={{
                                      padding: "6px 12px",
                                      borderRadius: 20,
                                      fontSize: 12,
                                      fontWeight: 600,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6,
                                      flexShrink: 0,
                                      backgroundColor: badgeStyle.bg,
                                      color: badgeStyle.text,
                                    }}
                                  >
                                    <Icon style={{ width: 14, height: 14 }} />
                                    {item.type}
                                  </div>

                                  {/* Obsah */}
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <h4
                                      style={{
                                        fontSize: 15,
                                        fontWeight: 600,
                                        margin: "0 0 4px",
                                        color: isCompleted
                                          ? "var(--color-text-secondary)"
                                          : "var(--color-text-main)",
                                        textDecoration: isCompleted ? "line-through" : "none",
                                      }}
                                    >
                                      {item.title}
                                    </h4>
                                    <p
                                      style={{
                                        fontSize: 13,
                                        color: "var(--color-text-secondary)",
                                        margin: 0,
                                        lineHeight: 1.4,
                                      }}
                                    >
                                      {item.desc}
                                    </p>
                                  </div>

                                  {/* Expand ikona pro rozbalovací aktivity */}
                                  {isExpandable && (
                                    <motion.div
                                      animate={{ rotate: isExpanded ? 180 : 0 }}
                                      transition={{ duration: 0.2 }}
                                      style={{ flexShrink: 0, marginTop: 4 }}
                                    >
                                      <ChevronDown
                                        style={{
                                          width: 20,
                                          height: 20,
                                          color: "var(--color-text-secondary)",
                                        }}
                                      />
                                    </motion.div>
                                  )}
                                </motion.div>

                                {/* Rozbalitelný obsah */}
                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: "easeInOut" }}
                                      style={{ overflow: "hidden" }}
                                    >
                                      <div style={{ padding: "0 16px 16px" }}>
                                        {(item.id === 1 || item.id === 2) && (
                                          <VideoActivityContent activityId={item.id} title={item.title} />
                                        )}
                                        {item.id === 3 && <GoalChatbot />}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            background: "#2596FF",
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
              Připraveni pokračovat ve studiu?
            </h3>
            <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
              Máte dokončeno {progress} z {total} aktivit. Pokračujte tam, kde jste skončili.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.98 }}
            transition={HOVER_TRANSITION}
            style={{
              padding: "14px 28px",
              background: "white",
              border: "none",
              borderRadius: 10,
              color: "#2596FF",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {t("courseDetail.startStudy")}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

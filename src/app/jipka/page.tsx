"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  FileText,
  CheckSquare,
  Clock,
  BarChart3,
  ChevronDown,
  BookOpen,
  MessageCircle,
  Headphones,
  Target,
  Lightbulb,
  Star,
} from "lucide-react";
import courseData from "@/data/jipka-course.json";
import "@/styles/jipka-tokens.css";
import { JipkaVideoContent } from "@/components/courses/JipkaVideoContent";
import { AnglictinaReflexeChatbot } from "@/components/courses/AnglictinaReflexeChatbot";
import { AnglictinaTextContent } from "@/components/courses/AnglictinaTextContent";

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
    case "aktivita":
      return Target;
    case "reflexe":
      return MessageCircle;
    case "článek":
      return FileText;
    case "cvičení":
      return CheckSquare;
    case "poslech":
      return Headphones;
    default:
      return Lightbulb;
  }
};

const getActivityBadgeStyle = (color: string) => {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    "#0d2d5c": { bg: "#E3F2FD", text: "#1565C0", border: "#0d2d5c" },
    "#e61e53": { bg: "#FCE4EC", text: "#c91a47", border: "#e61e53" },
    "#4a90d9": { bg: "#E8EAF6", text: "#3949AB", border: "#4a90d9" },
  };
  return colorMap[color] || { bg: `${color}20`, text: color, border: color };
};

export default function JipkaCoursePage() {
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

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const toggleActivityExpand = (id: number) => {
    if (!EXPANDABLE_ACTIVITY_IDS.includes(id)) return;
    setExpandedActivities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const isActivityExpandable = (id: number) =>
    EXPANDABLE_ACTIVITY_IDS.includes(id);
  const isActivityExpanded = (id: number) =>
    expandedActivities.includes(id);

  const progress = completedActivities.length;
  const total = courseData.activitiesCount;
  const progressPercent = Math.round((progress / total) * 100);

  return (
    <div
      className="jipka-theme min-h-screen"
      style={{
        backgroundColor: "var(--jipka-background-light)",
        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div style={{ marginBottom: 16, fontSize: 13, color: "var(--jipka-text-secondary)" }}>
          <span>Úvod</span>
          <span style={{ margin: "0 8px" }}>›</span>
          <span>Angličtina</span>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "var(--jipka-text-main)" }}>Angličtina B2</span>
        </div>

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
              color: "var(--jipka-text-main)",
            }}
          >
            {courseData.courseTitle}
          </h1>
          <p
            style={{
              fontSize: 15,
              margin: 0,
              color: "var(--jipka-text-secondary)",
            }}
          >
            Vedoucí kurzu: <strong style={{ color: "var(--jipka-text-main)" }}>{courseData.instructor}</strong> • {courseData.duration}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6 items-stretch">
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}
              transition={HOVER_TRANSITION}
              className="relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0d2d5c 0%, #4a90d9 100%)",
                aspectRatio: "16/9",
                borderRadius: 16,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div style={{ textAlign: "center", color: "white", padding: 32 }}>
                  <BookOpen size={64} style={{ margin: "0 auto 16px", opacity: 0.9 }} />
                  <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
                    Angličtina B2
                  </h2>
                  <p style={{ fontSize: 16, opacity: 0.9 }}>
                    E-learning kurz s Lucií Kratochvílovou
                  </p>
                </div>
              </div>
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-lg flex items-center gap-2"
                style={{ backgroundColor: "white" }}
              >
                <span className="font-bold text-sm" style={{ color: "var(--jipka-text-main)" }}>
                  jipka
                </span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1 flex flex-col min-h-0">
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
              transition={HOVER_TRANSITION}
              style={{
                backgroundColor: "var(--jipka-background)",
                borderRadius: 16,
                border: "1px solid var(--jipka-border)",
                padding: 20,
                height: "100%",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: "rgba(74, 144, 217, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BookOpen style={{ width: 22, height: 22, color: "var(--jipka-accent)" }} />
                </div>
                <h3 className="text-base font-bold" style={{ color: "var(--jipka-text-main)", margin: 0 }}>
                  O kurzu
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--jipka-text-secondary)",
                  margin: "0 0 12px",
                  lineHeight: 1.6,
                }}
              >
                {courseData.introTextShort ?? courseData.introText}
              </p>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingTop: 12, borderTop: "1px solid var(--jipka-border)", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--jipka-background-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Clock style={{ width: 16, height: 16, color: "var(--jipka-accent)" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--jipka-text-secondary)" }}>Délka kurzu</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--jipka-text-main)" }}>{courseData.duration}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--jipka-background-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BarChart3 style={{ width: 16, height: 16, color: "var(--jipka-accent)" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--jipka-text-secondary)" }}>Počet aktivit</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--jipka-text-main)" }}>{courseData.activitiesCount}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "auto", paddingTop: 12 }}>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(74, 144, 217, 0.35)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 font-bold text-white text-sm"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "var(--jipka-accent)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Zahájit studium
                </motion.button>
                <p style={{ fontSize: 11, color: "var(--jipka-text-secondary)", margin: "6px 0 0", textAlign: "center" }}>
                  Pokračujte tam, kde jste skončili
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
            transition={HOVER_TRANSITION}
            style={{
              backgroundColor: "var(--jipka-background)",
              borderRadius: 16,
              border: "1px solid var(--jipka-border)",
              padding: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(74, 144, 217, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BarChart3 style={{ width: 22, height: 22, color: "#1565C0" }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--jipka-text-main)", margin: 0 }}>
                Váš pokrok
              </h3>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: "var(--jipka-text-main)" }}>
                {progress}
              </span>
              <span style={{ fontSize: 15, color: "var(--jipka-text-secondary)" }}>
                / {total} aktivit
              </span>
              <span style={{ marginLeft: "auto", fontSize: 15, fontWeight: 700, color: "var(--jipka-accent)" }}>
                {progressPercent} %
              </span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: "var(--jipka-progress-bg)", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ height: "100%", borderRadius: 999, background: "var(--jipka-progress-fill)" }}
              />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
            transition={HOVER_TRANSITION}
            style={{
              backgroundColor: "#FFF8E1",
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
                  backgroundColor: "#FFD54F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Lightbulb style={{ width: 22, height: 22, color: "#0d2d5c" }} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: "#E65100", margin: "0 0 8px" }}>
                  Užitečný tip
                </h3>
                <p className="text-sm" style={{ color: "#E65100", margin: 0, lineHeight: 1.6 }}>
                  {courseData.usefulTip}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            backgroundColor: "var(--jipka-background)",
            borderRadius: 16,
            border: "1px solid var(--jipka-border)",
            padding: 32,
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--jipka-text-main)", margin: 0 }}>
              Program kurzu
            </h2>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "var(--jipka-background-light)", borderRadius: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--jipka-accent)" }} />
                <span style={{ fontSize: 12, color: "#374151" }}>Dokončeno: {progress}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "var(--jipka-background-light)", borderRadius: 8 }}>
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
                    backgroundColor: "var(--jipka-background-light)",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <motion.button
                    onClick={() => toggleSection(section.section)}
                    className="w-full flex items-center justify-between p-4"
                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                    whileHover={{ backgroundColor: "rgba(74, 144, 217, 0.08)" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: sectionCompleted === sectionTotal ? "var(--jipka-accent)" : "var(--jipka-primary)",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {sectionIdx + 1}
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--jipka-text-main)", margin: 0, textAlign: "left" }}>
                        {section.section}
                      </h3>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 13, color: "var(--jipka-text-secondary)" }}>
                        {sectionCompleted}/{sectionTotal}
                      </span>
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-5 h-5" style={{ color: "var(--jipka-text-secondary)" }} />
                      </motion.div>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
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
                                  backgroundColor: isCompleted ? "var(--jipka-success-bg)" : "white",
                                  border: isExpanded
                                    ? "2px solid var(--jipka-accent)"
                                    : isCompleted
                                      ? "2px solid var(--jipka-success)"
                                      : "1px solid #E5E7EB",
                                  overflow: "hidden",
                                }}
                              >
                                <motion.div
                                  whileHover={{ backgroundColor: isExpandable ? "rgba(74, 144, 217, 0.04)" : undefined }}
                                  onClick={() => isExpandable && toggleActivityExpand(item.id)}
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 16,
                                    padding: 16,
                                    cursor: isExpandable ? "pointer" : "default",
                                  }}
                                >
                                  <div
                                    onClick={(e) => toggleActivityComplete(item.id, e)}
                                    style={{
                                      width: 24,
                                      height: 24,
                                      borderRadius: 6,
                                      border: `2px solid ${isCompleted ? "var(--jipka-success)" : "#D1D5DB"}`,
                                      backgroundColor: isCompleted ? "var(--jipka-success)" : "white",
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
                                        fill="white"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </motion.svg>
                                    )}
                                  </div>

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

                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <h4
                                      style={{
                                        fontSize: 15,
                                        fontWeight: 600,
                                        margin: "0 0 4px",
                                        color: isCompleted ? "var(--jipka-text-secondary)" : "var(--jipka-text-main)",
                                        textDecoration: isCompleted ? "line-through" : "none",
                                      }}
                                    >
                                      {item.title}
                                    </h4>
                                    <p style={{ fontSize: 13, color: "var(--jipka-text-secondary)", margin: 0, lineHeight: 1.4 }}>
                                      {item.desc}
                                    </p>
                                  </div>

                                  {isExpandable && (
                                    <motion.div
                                      animate={{ rotate: isExpanded ? 180 : 0 }}
                                      transition={{ duration: 0.2 }}
                                      style={{ flexShrink: 0, marginTop: 4 }}
                                    >
                                      <ChevronDown style={{ width: 20, height: 20, color: "var(--jipka-text-secondary)" }} />
                                    </motion.div>
                                  )}
                                </motion.div>

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
                                        {item.id === 1 && <JipkaVideoContent title={item.title} />}
                                        {item.id === 2 && <AnglictinaReflexeChatbot />}
                                        {item.id === 3 && <AnglictinaTextContent />}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            background: "linear-gradient(90deg, #0d2d5c 0%, #4a90d9 100%)",
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
              Připraveni zlepšit svou angličtinu?
            </h3>
            <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
              Máte dokončeno {progress} z {total} aktivit. Pokračujte ve studiu.
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
              color: "var(--jipka-primary)",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Zahájit studium
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          width: "100%",
          backgroundColor: "var(--jipka-background)",
          borderTop: "1px solid var(--jipka-border)",
          borderBottom: "1px solid var(--jipka-border)",
          padding: "48px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--jipka-text-main)", margin: "0 0 24px", textAlign: "center" }}>
            Co mi kurz přinese?
          </h3>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {courseData.whatYouLearn.map((item, idx) => (
              <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "var(--jipka-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <CheckSquare size={14} color="white" />
                </div>
                <span style={{ fontSize: 15, color: "var(--jipka-text-main)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          width: "100%",
          backgroundColor: "var(--jipka-background-light)",
          padding: "48px 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--jipka-text-main)", margin: "0 0 24px", textAlign: "center" }}>
            Jak hodnotí kurz účastníci?
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {courseData.reviews.map((review, idx) => (
              <div
                key={idx}
                style={{
                  padding: 24,
                  background: "var(--jipka-background)",
                  borderRadius: 16,
                  border: "1px solid var(--jipka-border)",
                  boxShadow: "0 2px 8px var(--jipka-card-shadow)",
                }}
              >
                <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} fill="#FFD54F" color="#FFD54F" />
                  ))}
                </div>
                <p style={{ fontSize: 15, color: "var(--jipka-text-main)", margin: "0 0 12px", fontStyle: "italic", lineHeight: 1.6 }}>
                  „{review.text}"
                </p>
                <p style={{ fontSize: 14, color: "var(--jipka-text-secondary)", margin: 0 }}>
                  — {review.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

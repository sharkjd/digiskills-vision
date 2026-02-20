"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  FileText,
  CheckSquare,
  Image as ImageIcon,
  Clock,
  BarChart3,
  Bot,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import courseData from "@/data/course-detail.json";

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

const getActivityBadgeStyle = (color: string) => ({
  backgroundColor: `${color}20`,
  color: color === "#77F9D9" ? "#059669" : color,
  borderColor: color,
});

export default function CourseDetailPage() {
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>(
    courseData.curriculum.map((s) => s.section)
  );

  const toggleActivity = (id: number) => {
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

  const progress = completedActivities.length;
  const total = courseData.activitiesCount;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-breeze)",
        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
          <span>Kurzy</span>
          <ChevronRight className="w-4 h-4" />
          <span style={{ color: "var(--color-text-main)", fontWeight: 500 }}>
            {courseData.courseTitle}
          </span>
        </div>

        {/* Header sekce */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Video preview + info */}
          <div className="lg:col-span-2">
            {/* Video náhled */}
            <div
              className="relative overflow-hidden mb-6"
              style={{
                backgroundColor: "var(--color-digi-sky)",
                aspectRatio: "16/9",
                borderRadius: "var(--radius-card)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/courses/teams.webp"
                  alt="Kurz preview"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
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
            </div>

            {/* Dvě karty pod videem: Váš pokrok + Užitečný tip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div
                style={{
                  backgroundColor: "var(--color-background)",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 2px 8px var(--color-card-shadow)",
                  padding: 20,
                }}
              >
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: "var(--color-text-main)" }}
                >
                  Váš pokrok
                </h3>
                <p
                  className="text-sm font-bold mb-3"
                  style={{ color: "var(--color-primary)" }}
                >
                  {progress}/{total} aktivit
                </p>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--color-border)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(progress / total) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "var(--color-background)",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 2px 8px var(--color-card-shadow)",
                  padding: 20,
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "var(--radius-card)",
                    backgroundColor: "rgba(37, 150, 255, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bot style={{ width: 28, height: 28, color: "var(--color-primary)" }} />
                </div>
                <div>
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: "var(--color-text-main)" }}
                  >
                    Užitečný tip
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex items-start gap-2"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <AlertTriangle
                      className="flex-shrink-0 mt-0.5"
                      style={{ width: 16, height: 16, color: "var(--color-accent-orange)" }}
                    />
                    <span>
                      Když se při studiu zaseknete, dejte si minutu pauzu. Krátké nadechnutí často otevře nové řešení. Potřebujete poradit? Použijte chat vpravo dole.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Název a popis */}
            <h1
              className="text-3xl font-bold italic mb-3"
              style={{ color: "var(--color-text-main)" }}
            >
              {courseData.courseTitle}
            </h1>
            <p className="text-sm mb-2" style={{ color: "var(--color-text-secondary)" }}>
              Kurzem provází:{" "}
              <span style={{ color: "var(--color-text-main)", fontWeight: 600 }}>
                {courseData.instructor}
              </span>
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {courseData.introText}
            </p>
          </div>

          {/* Pravý panel - statistiky */}
          <div className="lg:col-span-1">
            <div
              className="p-6 sticky top-24"
              style={{
                backgroundColor: "var(--color-background)",
                borderRadius: "var(--radius-card)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 2px 8px var(--color-card-shadow)",
              }}
            >
              {/* Statistiky */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-breeze)" }}
                  >
                    <Clock className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                      Délka kurzu
                    </p>
                    <p className="font-semibold" style={{ color: "var(--color-text-main)" }}>
                      {courseData.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-breeze)" }}
                  >
                    <BarChart3 className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                      Počet aktivit
                    </p>
                    <p className="font-semibold" style={{ color: "var(--color-text-main)" }}>
                      {courseData.activitiesCount}
                    </p>
                  </div>
              </div>
            </div>

              {/* CTA tlačítko */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full py-4 font-bold text-white text-base"
                style={{
                  borderRadius: "var(--radius-btn)",
                  backgroundColor: "var(--color-primary)",
                  boxShadow: "0 4px 12px rgba(37, 150, 255, 0.3)",
                }}
              >
                Zahájit studium
              </motion.button>
            </div>
          </div>
        </div>

        {/* Osnova kurzu */}
        <div
          className="p-8"
          style={{
            backgroundColor: "var(--color-background)",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 2px 8px var(--color-card-shadow)",
          }}
        >
          <h2
            className="text-2xl font-bold italic mb-6"
            style={{ color: "var(--color-text-main)" }}
          >
            Osnova kurzu
          </h2>

          <div className="space-y-6">
            {(courseData.curriculum as CurriculumSection[]).map((section, sectionIdx) => {
              const isExpanded = expandedSections.includes(section.section);
              return (
                <div key={sectionIdx}>
                  {/* Sekce header */}
                  <motion.button
                    onClick={() => toggleSection(section.section)}
                    className="w-full flex items-center justify-between py-3 border-b"
                    style={{ borderColor: "var(--color-border)" }}
                    whileHover={{ backgroundColor: "var(--color-breeze)" }}
                  >
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "var(--color-text-main)" }}
                    >
                      {section.section}
                    </h3>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5" style={{ color: "var(--color-text-secondary)" }} />
                    </motion.div>
                  </motion.button>

                  {/* Aktivity v sekci */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-3">
                          {section.items.map((item) => {
                            const Icon = getActivityIcon(item.type);
                            const isCompleted = completedActivities.includes(item.id);
                            const badgeStyle = getActivityBadgeStyle(item.color);

                            return (
                              <motion.div
                                key={item.id}
                                className="flex items-start gap-4 p-4 cursor-pointer transition-colors"
                                style={{
                                  borderRadius: "var(--radius-card)",
                                  backgroundColor: isCompleted ? "rgba(119, 249, 217, 0.15)" : "var(--color-breeze)",
                                  border: isCompleted ? "1px solid var(--color-accent-green)" : "1px solid transparent",
                                }}
                                whileHover={{
                                  backgroundColor: isCompleted ? "rgba(119, 249, 217, 0.25)" : "var(--color-border)",
                                }}
                                onClick={() => toggleActivity(item.id)}
                              >
                                {/* Checkbox */}
                                <div
                                  className="w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                                  style={{
                                    borderRadius: "var(--radius-input)",
                                    borderColor: isCompleted ? "var(--color-accent-green)" : "var(--color-border-input)",
                                    backgroundColor: isCompleted ? "var(--color-accent-green)" : "var(--color-background)",
                                  }}
                                >
                                  {isCompleted && (
                                    <motion.svg
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-4 h-4 text-white"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
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
                                  className="px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 flex-shrink-0"
                                  style={badgeStyle}
                                >
                                  <Icon className="w-3.5 h-3.5" />
                                  {item.type}
                                </div>

                                {/* Obsah */}
                                <div className="flex-1 min-w-0">
                                  <h4
                                    className="font-semibold mb-1 flex items-center gap-2"
                                    style={{
                                      color: isCompleted ? "var(--color-text-secondary)" : "var(--color-text-main)",
                                      textDecoration: isCompleted ? "line-through" : "none",
                                    }}
                                  >
                                    {item.title}
                                    <ExternalLink
                                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                      style={{ color: "var(--color-primary)" }}
                                    />
                                  </h4>
                                  <p
                                    className="text-sm"
                                    style={{ color: "var(--color-text-secondary)" }}
                                  >
                                    {item.desc}
                                  </p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

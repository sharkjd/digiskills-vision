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
  Lightbulb,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  MessageCircle,
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
        backgroundColor: "#F4F5FA",
        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "#6c757d" }}>
          <span>Kurzy</span>
          <ChevronRight className="w-4 h-4" />
          <span style={{ color: "#040E3C", fontWeight: 500 }}>
            {courseData.courseTitle}
          </span>
        </div>

        {/* Header sekce */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Video preview + info */}
          <div className="lg:col-span-2">
            {/* Video náhled */}
            <div
              className="relative rounded-2xl overflow-hidden mb-6"
              style={{
                backgroundColor: "#040E3C",
                aspectRatio: "16/9",
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
                  style={{ backgroundColor: "#2596FF" }}
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </motion.button>
              </div>
              {/* Badge Digiskills */}
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-lg flex items-center gap-2"
                style={{ backgroundColor: "white" }}
              >
                <span className="font-bold text-sm" style={{ color: "#040E3C" }}>
                  {"{ } Digiskills"}
                </span>
              </div>
            </div>

            {/* Název a popis */}
            <h1
              className="text-3xl font-bold italic mb-3"
              style={{ color: "#040E3C" }}
            >
              {courseData.courseTitle}
            </h1>
            <p className="text-sm mb-2" style={{ color: "#6c757d" }}>
              Kurzem provází:{" "}
              <span style={{ color: "#040E3C", fontWeight: 600 }}>
                {courseData.instructor}
              </span>
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "#4b5563" }}
            >
              {courseData.introText}
            </p>
          </div>

          {/* Pravý panel - statistiky */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl p-6 sticky top-24"
              style={{
                backgroundColor: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              {/* Statistiky */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#F4F5FA" }}
                  >
                    <Clock className="w-5 h-5" style={{ color: "#2596FF" }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#6c757d" }}>
                      Délka kurzu
                    </p>
                    <p className="font-semibold" style={{ color: "#040E3C" }}>
                      {courseData.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#F4F5FA" }}
                  >
                    <BarChart3 className="w-5 h-5" style={{ color: "#2596FF" }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#6c757d" }}>
                      Počet aktivit
                    </p>
                    <p className="font-semibold" style={{ color: "#040E3C" }}>
                      {courseData.activitiesCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pokrok */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium" style={{ color: "#040E3C" }}>
                    Váš pokrok
                  </span>
                  <span className="text-sm font-bold" style={{ color: "#2596FF" }}>
                    {progress}/{total} aktivit
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "#e5e7eb" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: "#2596FF" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(progress / total) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* CTA tlačítko */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-bold text-white text-base"
                style={{
                  backgroundColor: "#2596FF",
                  boxShadow: "0 4px 12px rgba(37, 150, 255, 0.3)",
                }}
              >
                Zahájit studium
              </motion.button>

              {/* Užitečný tip */}
              <div
                className="mt-6 p-4 rounded-xl flex gap-3"
                style={{ backgroundColor: "#F4F5FA" }}
              >
                <Lightbulb
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: "#F7981C" }}
                />
                <div>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: "#040E3C" }}
                  >
                    Užitečný tip
                  </p>
                  <p className="text-sm" style={{ color: "#6c757d" }}>
                    {courseData.usefulTip}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Osnova kurzu */}
        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: "white",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            className="text-2xl font-bold italic mb-6"
            style={{ color: "#040E3C" }}
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
                    style={{ borderColor: "#e5e7eb" }}
                    whileHover={{ backgroundColor: "#fafafa" }}
                  >
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "#040E3C" }}
                    >
                      {section.section}
                    </h3>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5" style={{ color: "#6c757d" }} />
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
                                className="flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-colors"
                                style={{
                                  backgroundColor: isCompleted ? "#f0fdf4" : "#fafafa",
                                  border: isCompleted ? "1px solid #86efac" : "1px solid transparent",
                                }}
                                whileHover={{
                                  backgroundColor: isCompleted ? "#dcfce7" : "#f3f4f6",
                                }}
                                onClick={() => toggleActivity(item.id)}
                              >
                                {/* Checkbox */}
                                <div
                                  className="w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                                  style={{
                                    borderColor: isCompleted ? "#22c55e" : "#d1d5db",
                                    backgroundColor: isCompleted ? "#22c55e" : "white",
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
                                      color: isCompleted ? "#166534" : "#040E3C",
                                      textDecoration: isCompleted ? "line-through" : "none",
                                    }}
                                  >
                                    {item.title}
                                    <ExternalLink
                                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                      style={{ color: "#2596FF" }}
                                    />
                                  </h4>
                                  <p
                                    className="text-sm"
                                    style={{ color: "#6c757d" }}
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

      {/* FAB Chat tlačítko */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          backgroundColor: "#F7981C",
          boxShadow: "0 4px 20px rgba(247, 152, 28, 0.4)",
        }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
}

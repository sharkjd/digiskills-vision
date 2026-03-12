"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { getCourseList, type Course } from "@/data/courses";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

function normalizeSearch(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function matchesSearch(course: Course, query: string) {
  if (!query) return true;
  const n = normalizeSearch(query);
  return (
    normalizeSearch(course.title).includes(n) ||
    normalizeSearch(course.description).includes(n) ||
    normalizeSearch(course.level).includes(n)
  );
}

export type CourseReplaceModalProps = {
  slotIndex: number;
  currentCourse: Course;
  selectedCourseIds: Set<number>;
  onSelect: (course: Course) => void;
  onClose: () => void;
};

export function CourseReplaceModal({
  slotIndex,
  currentCourse,
  selectedCourseIds,
  onSelect,
  onClose,
}: CourseReplaceModalProps) {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const { language } = useLanguage();
  const courseList = getCourseList(language);

  const candidates = useMemo(() => {
    return courseList.filter(
      (c) => c.id !== currentCourse.id && !selectedCourseIds.has(c.id),
    );
  }, [currentCourse.id, selectedCourseIds, courseList]);

  const filtered = useMemo(
    () => candidates.filter((c) => matchesSearch(c, search)),
    [candidates, search],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(4, 14, 60, 0.75)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border bg-white shadow-xl"
        style={{ borderColor: "var(--color-border)", boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: "var(--color-border)" }}>
          <h2 className="text-xl font-bold italic" style={{ color: "var(--color-digi-sky)" }}>
            {t("admin.replaceCourse", { index: slotIndex + 1 })}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label={t("admin.close")}
          >
            <X size={20} />
          </button>
        </div>

        <div className="border-b px-6 py-4" style={{ borderColor: "var(--color-border)" }}>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-secondary)" }}
            />
            <input
              type="text"
              placeholder={t("admin.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm"
              style={{
                borderColor: "var(--color-border-input)",
                color: "var(--color-text-main)",
              }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length === 0 ? (
            <p className="text-center text-sm" style={{ color: "var(--color-text-secondary)" }}>
              {candidates.length === 0
                ? t("admin.noCoursesToReplace")
                : t("admin.noCoursesMatchSearch")}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filtered.map((course) => (
                <motion.button
                  key={course.id}
                  type="button"
                  onClick={() => onSelect(course)}
                  whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                  transition={HOVER_TRANSITION}
                  className="flex overflow-hidden rounded-lg border bg-white text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="relative h-24 w-28 flex-shrink-0 bg-gray-100">
                    <Image
                      src={course.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center p-3">
                    <span className="truncate text-sm font-semibold" style={{ color: "var(--color-digi-sky)" }}>
                      {course.title}
                    </span>
                    <span className="mt-0.5 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                      {course.duration} · {course.level}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

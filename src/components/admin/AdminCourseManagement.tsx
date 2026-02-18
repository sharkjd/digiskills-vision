"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, RefreshCw, Search, X } from "lucide-react";
import { COURSE_LIST, Course } from "@/data/courses";
import { useRecommendedCourses } from "@/context/RecommendedCoursesContext";

const DEPLOY_DURATION_MS = 2000;
const INITIAL_COURSE_COUNT = 6;

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

type ReplaceCourseModalProps = {
  slotIndex: number;
  currentCourse: Course;
  selectedCourseIds: Set<number>;
  onSelect: (course: Course) => void;
  onClose: () => void;
};

function ReplaceCourseModal({ slotIndex, currentCourse, selectedCourseIds, onSelect, onClose }: ReplaceCourseModalProps) {
  const [search, setSearch] = useState("");

  const candidates = useMemo(() => {
    return COURSE_LIST.filter(
      (c) => c.id !== currentCourse.id && !selectedCourseIds.has(c.id),
    );
  }, [currentCourse.id, selectedCourseIds]);

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
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
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
            Vyměnit kurz (priorita {slotIndex + 1})
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label="Zavřít"
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
              placeholder="Hledat kurz (název, popis, úroveň)..."
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
                ? "Žádný další kurz k výběru."
                : "Žádný kurz nevyhovuje hledání."}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filtered.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => onSelect(course)}
                  className="flex overflow-hidden rounded-lg border bg-white text-left shadow-sm transition-all hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

type AdminCourseTileProps = {
  course: Course;
  index: number;
  onReplace: () => void;
};

function AdminCourseTile({ course, index, onReplace }: AdminCourseTileProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-md"
      style={{
        borderColor: "var(--color-border)",
        boxShadow: "0 2px 8px var(--color-card-shadow)",
      }}
    >
      {/* Náhledový obrázek */}
      <div className="relative h-44 flex-shrink-0 bg-gray-100">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <button
          type="button"
          onClick={onReplace}
          className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-lg border bg-white/95 px-2.5 py-1.5 text-xs font-semibold shadow-sm transition-colors hover:bg-gray-50"
          style={{
            borderColor: "var(--color-primary)",
            color: "var(--color-primary)",
          }}
        >
          <RefreshCw size={12} />
          Vyměnit
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-secondary)" }}>
          Priorita {index + 1}
        </p>
        <h3 className="mb-3 text-lg font-bold leading-tight" style={{ color: "var(--color-digi-sky)" }}>
          {course.title}
        </h3>

        <p className="mb-4 flex-1 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {course.description}
        </p>

        <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--color-border)" }}>
          <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
            {course.activities} aktivit
          </span>
          <span className="rounded-lg px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "var(--color-breeze)", color: "var(--color-digi-sky)" }}>
            {course.duration} • {course.level}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function AdminCourseManagement() {
  const router = useRouter();
  const { setRecommendedCourses } = useRecommendedCourses();
  const [selectedCourses, setSelectedCourses] = useState<Course[]>(() => COURSE_LIST.slice(0, INITIAL_COURSE_COUNT));
  const [isDeploying, setIsDeploying] = useState(false);
  const [replaceSlotIndex, setReplaceSlotIndex] = useState<number | null>(null);

  const employeeCount = 2534;
  const selectedCourseIds = useMemo(() => new Set(selectedCourses.map((c) => c.id)), [selectedCourses]);
  const replaceEnabled = useMemo(() => COURSE_LIST.length > selectedCourses.length, [selectedCourses.length]);

  const openReplaceModal = useCallback(
    (index: number) => {
      if (!replaceEnabled || isDeploying) return;
      setReplaceSlotIndex(index);
    },
    [replaceEnabled, isDeploying],
  );

  const handleReplaceSelect = useCallback((slotIndex: number, course: Course) => {
    setSelectedCourses((prev) => {
      const next = [...prev];
      next[slotIndex] = course;
      return next;
    });
    setReplaceSlotIndex(null);
  }, []);

  const closeReplaceModal = useCallback(() => setReplaceSlotIndex(null), []);

  const handleAssignCourses = () => {
    if (isDeploying) {
      return;
    }

    setIsDeploying(true);

    window.setTimeout(() => {
      setRecommendedCourses(selectedCourses);
      router.push("/moje-kurzy");
    }, DEPLOY_DURATION_MS);
  };

  return (
    <>
      <section
        className="min-h-screen px-6 py-10"
        style={{
          backgroundColor: "var(--color-breeze)",
          fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <header className="mb-10 rounded-lg border bg-white p-8 shadow-md" style={{ borderColor: "var(--color-border)" }}>
            <div
              className="mb-4 h-2 w-40 rounded-full"
              style={{
                backgroundColor: "var(--color-accent-green)",
                transform: "skewX(calc(var(--brand-slant-deg) * -1deg))",
                transformOrigin: "left center",
              }}
            />
            <h1 className="mb-3 text-4xl font-bold italic" style={{ color: "var(--color-digi-sky)" }}>
              Správa firemního vzdělávání
            </h1>
            <p className="max-w-4xl text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Na základě výsledků assessmentu (Index 5,49) jsme vybrali tyto klíčové kurzy pro rozvoj vaší organizace.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {selectedCourses.map((course, index) => (
              <AdminCourseTile key={`${course.id}-${index}`} course={course} index={index} onReplace={() => openReplaceModal(index)} />
            ))}
          </div>
        </div>
      </section>

      <section className="sticky bottom-0 z-20 border-t bg-white/95 px-6 py-5 backdrop-blur" style={{ borderColor: "var(--color-border)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-end">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAssignCourses}
            className="rounded-lg px-8 py-4 text-sm font-bold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-70"
            style={{
              backgroundColor: "var(--color-primary)",
              boxShadow: "0 8px 20px rgba(37, 150, 255, 0.35)",
            }}
            disabled={isDeploying}
          >
            Přiřadit všem zaměstnancům a začít studium
          </motion.button>
        </div>
      </section>

      <AnimatePresence>
        {replaceSlotIndex !== null && selectedCourses[replaceSlotIndex] && (
          <ReplaceCourseModal
            slotIndex={replaceSlotIndex}
            currentCourse={selectedCourses[replaceSlotIndex]}
            selectedCourseIds={selectedCourseIds}
            onSelect={(course) => handleReplaceSelect(replaceSlotIndex, course)}
            onClose={closeReplaceModal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeploying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 grid place-items-center px-6"
            style={{ backgroundColor: "rgba(4, 14, 60, 0.82)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl rounded-lg border p-8 shadow-md"
              style={{
                borderColor: "rgba(255, 255, 255, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              <div className="mb-5 inline-flex rounded-full p-3" style={{ backgroundColor: "rgba(119, 249, 217, 0.2)" }}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0.6 }}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2, ease: "easeInOut" }}
                >
                  <Check size={26} style={{ color: "var(--color-accent-green)" }} />
                </motion.div>
              </div>

              <h2 className="mb-3 text-2xl font-bold italic text-white">Nasazuji studijní plán pro {employeeCount} zaměstnanců...</h2>

              <div className="mb-2 h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: DEPLOY_DURATION_MS / 1000, ease: "easeInOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: "var(--color-accent-green)" }}
                />
              </div>
              <p className="text-sm text-white/85">Zpracovávám změny a připravuji personalizovaný katalog kurzů.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

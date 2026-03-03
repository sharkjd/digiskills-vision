"use client";

import { useMemo, useState, useCallback } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  RefreshCw,
  Search,
  X,
  Users,
  UserPlus,
  Trash2,
  Building2,
  Settings,
  Globe,
  Bell,
  Eye,
  Percent,
  Sparkles,
  Bot,
  ArrowRight,
} from "lucide-react";
import { getCourseList, type Course } from "@/data/courses";
import { useLanguage } from "@/context/LanguageContext";
import { useCompanyCourses } from "@/context/CompanyCoursesContext";

const DEPLOY_DURATION_MS = 2000;
const INITIAL_COURSE_COUNT = 6;
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

const FAKE_TEAMS = [
  { id: 1, name: "Marketing", members: 12 },
  { id: 2, name: "IT & Development", members: 28 },
  { id: 3, name: "HR & People", members: 8 },
  { id: 4, name: "Sales", members: 15 },
  { id: 5, name: "Finance", members: 6 },
];

const FAKE_EMPLOYEES = [
  { id: 1, name: "Jan Novák", email: "jan.novak@firma.cz", team: "Marketing", role: "Manager" },
  { id: 2, name: "Marie Svobodová", email: "marie.svobodova@firma.cz", team: "IT & Development", role: "Developer" },
  { id: 3, name: "Petr Dvořák", email: "petr.dvorak@firma.cz", team: "Sales", role: "Account Manager" },
  { id: 4, name: "Eva Černá", email: "eva.cerna@firma.cz", team: "HR & People", role: "HR Specialist" },
  { id: 5, name: "Tomáš Procházka", email: "tomas.prochazka@firma.cz", team: "IT & Development", role: "Team Lead" },
  { id: 6, name: "Lucie Králová", email: "lucie.kralova@firma.cz", team: "Finance", role: "Accountant" },
  { id: 7, name: "Martin Veselý", email: "martin.vesely@firma.cz", team: "Marketing", role: "Content Creator" },
  { id: 8, name: "Kateřina Němcová", email: "katerina.nemcova@firma.cz", team: "Sales", role: "Sales Rep" },
];

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
                ? "Žádný další kurz k výběru."
                : "Žádný kurz nevyhovuje hledání."}
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

type AdminCourseTileProps = {
  course: Course;
  index: number;
  onReplace: () => void;
};

function AdminCourseTile({ course, index, onReplace }: AdminCourseTileProps) {
  const { t } = useTranslation();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
      transition={HOVER_TRANSITION}
      style={{
        background: "var(--color-background)",
        borderRadius: 12,
        border: "1px solid var(--color-border)",
        boxShadow: "0 2px 8px var(--color-card-shadow)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", height: 100, background: "var(--color-breeze)" }}>
        <Image
          src={course.image}
          alt={course.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <button
          type="button"
          onClick={onReplace}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "6px 10px",
            background: "rgba(255,255,255,0.95)",
            border: "1px solid var(--color-primary)",
            borderRadius: 8,
            fontSize: 11,
            fontWeight: 600,
            color: "var(--color-primary)",
            cursor: "pointer",
          }}
        >
          <RefreshCw size={12} />
          {t("admin.replace")}
        </button>
      </div>

      <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "var(--color-text-secondary)",
            margin: "0 0 4px",
          }}
        >
          {t("admin.priority", { index: index + 1 })}
        </p>
        <h3
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--color-digi-sky)",
            margin: "0 0 8px",
            lineHeight: 1.3,
          }}
        >
          {course.title}
        </h3>

        <p
          style={{
            fontSize: 12,
            color: "var(--color-text-secondary)",
            margin: "0 0 12px",
            lineHeight: 1.5,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {course.description}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 12,
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>
            {course.activities} {t("courses.activities")}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: "4px 8px",
              background: "var(--color-breeze)",
              borderRadius: 6,
              color: "var(--color-digi-sky)",
            }}
          >
            {course.duration}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function AdminCourseManagement() {
  const router = useRouter();
  const { setCompanyCourses } = useCompanyCourses();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const courseList = getCourseList(language);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>(() => courseList.slice(0, INITIAL_COURSE_COUNT));
  const [isDeploying, setIsDeploying] = useState(false);
  const [replaceSlotIndex, setReplaceSlotIndex] = useState<number | null>(null);

  const [orgSettings, setOrgSettings] = useState({
    orgName: "Acme Corporation s.r.o.",
    language: "cs" as "cs" | "en",
    autoAssign: true,
    minCompletion: 80,
    notifications: true,
    publicProfile: false,
  });

  const employeeCount = 2534;
  const selectedCourseIds = useMemo(() => new Set(selectedCourses.map((c) => c.id)), [selectedCourses]);
  const replaceEnabled = useMemo(() => courseList.length > selectedCourses.length, [courseList.length, selectedCourses.length]);

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
      setCompanyCourses(selectedCourses);
      router.push("/moje-kurzy");
    }, DEPLOY_DURATION_MS);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "var(--color-breeze)",
          minHeight: "100vh",
          fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
        }}
      >
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
          {/* HERO BANNER */}
          <motion.div
            variants={itemVariants}
            style={{
              background: "#040E3C",
              borderRadius: 16,
              padding: "36px 32px",
              color: "white",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: 32, alignItems: "flex-start" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
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
                    Admin Panel
                  </div>
                  <h1
                    style={{
                      fontSize: 32,
                      fontWeight: 800,
                      margin: "0 0 8px",
                      fontStyle: "italic",
                    }}
                  >
                    Správa firemního vzdělávání
                  </h1>
                  <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>
                    Spravujte kurzy, týmy a nastavení vaší organizace na jednom místě.
                  </p>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <Link
                    href="/admin/tvorba-kurzu"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "12px 20px",
                      background: "var(--color-primary)",
                      border: "none",
                      borderRadius: 10,
                      color: "white",
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <Bot size={18} />
                    Vytvořit kurz pomocí AI
                  </Link>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: 16,
                    textAlign: "center",
                    minWidth: 100,
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 800 }}>{employeeCount}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.8, marginTop: 4 }}>Zaměstnanců</div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: 16,
                    textAlign: "center",
                    minWidth: 100,
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 800 }}>{FAKE_TEAMS.length}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.8, marginTop: 4 }}>Týmů</div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: 16,
                    textAlign: "center",
                    minWidth: 100,
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#77F9D9" }}>{selectedCourses.length}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.8, marginTop: 4 }}>Aktivních kurzů</div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: 16,
                    textAlign: "center",
                    minWidth: 100,
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#77F9D9" }}>5,49</div>
                  <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.8, marginTop: 4 }}>Index firmy</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SEKCE: AKTUÁLNÍ FIREMNÍ KURZY */}
          <motion.div variants={itemVariants}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--color-text-main)",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                Aktuální firemní kurzy
              </h2>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--color-text-secondary)",
                }}
              >
                {selectedCourses.length} kurzů přiřazeno
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
              }}
            >
              {selectedCourses.map((course, index) => (
                <AdminCourseTile
                  key={`${course.id}-${index}`}
                  course={course}
                  index={index}
                  onReplace={() => openReplaceModal(index)}
                />
              ))}
            </div>
          </motion.div>

          {/* SEKCE: SPRAVOVAT TÝM & LIDI */}
          <motion.div variants={itemVariants}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
              }}
            >
              {/* KARTA: SPRAVOVAT TÝM */}
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
                transition={HOVER_TRANSITION}
                style={{
                  background: "white",
                  border: "1px solid var(--color-border)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 20,
                    paddingBottom: 16,
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "rgba(37, 150, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Users size={24} color="#2596FF" />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "var(--color-text-main)",
                        margin: 0,
                      }}
                    >
                      Spravovat týmy
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--color-text-secondary)",
                        margin: "4px 0 0",
                      }}
                    >
                      {FAKE_TEAMS.length} týmů v organizaci
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    maxHeight: 240,
                    overflowY: "auto",
                    marginBottom: 16,
                  }}
                >
                  {FAKE_TEAMS.map((team) => (
                    <div
                      key={team.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--color-text-main)" }}>
                          {team.name}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
                          {team.members} členů
                        </div>
                      </div>
                      <button
                        type="button"
                        style={{
                          padding: "6px 10px",
                          background: "transparent",
                          border: "1px solid var(--color-border)",
                          borderRadius: 6,
                          cursor: "pointer",
                          color: "var(--color-text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 12,
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "var(--color-breeze)",
                    border: "1px dashed var(--color-border)",
                    borderRadius: 10,
                    cursor: "pointer",
                    color: "var(--color-primary)",
                    fontWeight: 600,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <UserPlus size={16} />
                  Přidat nový tým
                </button>
              </motion.div>

              {/* KARTA: SPRAVOVAT LIDI */}
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
                transition={HOVER_TRANSITION}
                style={{
                  background: "white",
                  border: "1px solid var(--color-border)",
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 20,
                    paddingBottom: 16,
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "rgba(119, 249, 217, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Building2 size={24} color="#059669" />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "var(--color-text-main)",
                        margin: 0,
                      }}
                    >
                      Spravovat lidi
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--color-text-secondary)",
                        margin: "4px 0 0",
                      }}
                    >
                      {FAKE_EMPLOYEES.length} zaměstnanců zobrazeno
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    maxHeight: 240,
                    overflowY: "auto",
                    marginBottom: 16,
                  }}
                >
                  {FAKE_EMPLOYEES.map((employee) => (
                    <div
                      key={employee.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "var(--color-breeze)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--color-digi-sky)",
                          }}
                        >
                          {employee.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13, color: "var(--color-text-main)" }}>
                            {employee.name}
                          </div>
                          <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>
                            {employee.team} · {employee.role}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        style={{
                          padding: "6px 10px",
                          background: "transparent",
                          border: "1px solid var(--color-border)",
                          borderRadius: 6,
                          cursor: "pointer",
                          color: "var(--color-text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 12,
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "var(--color-breeze)",
                    border: "1px dashed var(--color-border)",
                    borderRadius: 10,
                    cursor: "pointer",
                    color: "var(--color-primary)",
                    fontWeight: 600,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <UserPlus size={16} />
                  Přidat zaměstnance
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* SEKCE: NASTAVENÍ ORGANIZACE */}
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
              <Settings size={24} color="var(--color-primary)" />
              Nastavení organizace
            </h2>

            <motion.div
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
              transition={HOVER_TRANSITION}
              style={{
                background: "white",
                border: "1px solid var(--color-border)",
                borderRadius: 16,
                padding: 28,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 24,
                }}
              >
                {/* Název organizace */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      display: "block",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Název organizace
                  </label>
                  <input
                    type="text"
                    value={orgSettings.orgName}
                    onChange={(e) => setOrgSettings({ ...orgSettings, orgName: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1px solid var(--color-border-input)",
                      borderRadius: 10,
                      fontSize: 14,
                      color: "var(--color-text-main)",
                    }}
                  />
                </div>

                {/* Jazyk platformy */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    <Globe size={14} />
                    Jazyk platformy
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      background: "#F4F5FA",
                      padding: 4,
                      borderRadius: 10,
                    }}
                  >
                    {(["cs", "en"] as const).map((lang) => (
                      <motion.button
                        key={lang}
                        type="button"
                        onClick={() => setOrgSettings({ ...orgSettings, language: lang })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          flex: 1,
                          padding: "10px 16px",
                          background: orgSettings.language === lang ? "var(--color-primary)" : "transparent",
                          border: "none",
                          borderRadius: 8,
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: 600,
                          color: orgSettings.language === lang ? "white" : "#6B7280",
                        }}
                      >
                        {lang === "cs" ? "Čeština" : "English"}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Automatické přiřazování kurzů */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    <Sparkles size={14} />
                    Automatické přiřazování kurzů
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      background: "#F4F5FA",
                      padding: 4,
                      borderRadius: 10,
                    }}
                  >
                    {[true, false].map((val) => (
                      <motion.button
                        key={String(val)}
                        type="button"
                        onClick={() => setOrgSettings({ ...orgSettings, autoAssign: val })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          flex: 1,
                          padding: "10px 16px",
                          background: orgSettings.autoAssign === val
                            ? val ? "#77F9D9" : "#E5E7EB"
                            : "transparent",
                          border: "none",
                          borderRadius: 8,
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: 600,
                          color: orgSettings.autoAssign === val
                            ? val ? "#065F46" : "#374151"
                            : "#6B7280",
                        }}
                      >
                        {val ? "Ano" : "Ne"}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Minimální dokončení kurzu */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    <Percent size={14} />
                    Minimální dokončení kurzu
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      background: "#F4F5FA",
                      padding: 4,
                      borderRadius: 10,
                    }}
                  >
                    {[70, 80, 90, 100].map((val) => (
                      <motion.button
                        key={val}
                        type="button"
                        onClick={() => setOrgSettings({ ...orgSettings, minCompletion: val })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          flex: 1,
                          padding: "10px 12px",
                          background: orgSettings.minCompletion === val ? "var(--color-primary)" : "transparent",
                          border: "none",
                          borderRadius: 8,
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: 600,
                          color: orgSettings.minCompletion === val ? "white" : "#6B7280",
                        }}
                      >
                        {val}%
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Notifikace o nových kurzech */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    <Bell size={14} />
                    Notifikace o nových kurzech
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      background: "#F4F5FA",
                      padding: 4,
                      borderRadius: 10,
                    }}
                  >
                    {[true, false].map((val) => (
                      <motion.button
                        key={String(val)}
                        type="button"
                        onClick={() => setOrgSettings({ ...orgSettings, notifications: val })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          flex: 1,
                          padding: "10px 16px",
                          background: orgSettings.notifications === val
                            ? val ? "#77F9D9" : "#E5E7EB"
                            : "transparent",
                          border: "none",
                          borderRadius: 8,
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: 600,
                          color: orgSettings.notifications === val
                            ? val ? "#065F46" : "#374151"
                            : "#6B7280",
                        }}
                      >
                        {val ? "Zapnuto" : "Vypnuto"}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Veřejný profil firmy */}
                <div>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#374151",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    <Eye size={14} />
                    Veřejný profil firmy
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      background: "#F4F5FA",
                      padding: 4,
                      borderRadius: 10,
                    }}
                  >
                    {[true, false].map((val) => (
                      <motion.button
                        key={String(val)}
                        type="button"
                        onClick={() => setOrgSettings({ ...orgSettings, publicProfile: val })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          flex: 1,
                          padding: "10px 16px",
                          background: orgSettings.publicProfile === val
                            ? val ? "#77F9D9" : "#E5E7EB"
                            : "transparent",
                          border: "none",
                          borderRadius: 8,
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: 600,
                          color: orgSettings.publicProfile === val
                            ? val ? "#065F46" : "#374151"
                            : "#6B7280",
                        }}
                      >
                        {val ? "Veřejný" : "Soukromý"}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info box */}
              <div
                style={{
                  marginTop: 24,
                  padding: 16,
                  background: "#F0F9FF",
                  border: "1px solid #BAE6FD",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <Settings size={18} color="#0284C7" style={{ flexShrink: 0, marginTop: 2 }} />
                <p
                  style={{
                    fontSize: 13,
                    color: "#0369A1",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  Změny nastavení se projeví okamžitě pro všechny zaměstnance ve vaší organizaci.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* STICKY FOOTER */}
      <section
        className="sticky bottom-0 z-20 border-t bg-white/95 px-6 py-5 backdrop-blur"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-end" style={{ maxWidth: 1200 }}>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(37, 150, 255, 0.45)" }}
            whileTap={{ scale: 0.98 }}
            transition={HOVER_TRANSITION}
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

              <h2 className="mb-3 text-2xl font-bold italic text-white">
                Nasazuji studijní plán pro {employeeCount} zaměstnanců...
              </h2>

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

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ScaleSlider from "./ScaleSlider";
import CheckboxGroup from "./CheckboxGroup";

const ROLES = [
  "Management / Vedení",
  "HR / Právo / Vzdělávání",
  "Administrativa / Zákaznická péče",
  "Marketing / Obchod",
  "Finance / Audit",
  "Výroba / Logistika",
  "IT / Vývoj",
];

type SectionData = {
  q1: number;
  q2: number;
  tools: string[];
};

type SectionKey = "information" | "communication" | "content" | "security" | "problemsolving";

type FormData = {
  name: string;
  email: string;
  role: string;
  digitalRelationship: number;
  information: SectionData;
  communication: SectionData;
  content: SectionData;
  security: SectionData;
  problemsolving: SectionData;
  ai: { score: number; tools: string[] };
};

const INITIAL_DATA: FormData = {
  name: "Honza Dolejš",
  email: "honza.dolejs@digiskills.cz",
  role: "IT / Vývoj",
  digitalRelationship: 7,
  information: {
    q1: 7,
    q2: 8,
    tools: [
      "SharePoint (prohledávání firemního obsahu)",
      "OneDrive (organizace a správa vlastních souborů)",
    ],
  },
  communication: {
    q1: 8,
    q2: 7,
    tools: [
      "Microsoft Teams (komunikace, týmová spolupráce)",
      "Outlook (e-mail, správa času a kalendáře)",
    ],
  },
  content: {
    q1: 6,
    q2: 7,
    tools: ["PowerPoint (prezentace)", "Word (dokumenty)"],
  },
  security: {
    q1: 7,
    q2: 8,
    tools: [
      "Microsoft Authenticator (schvalování přihlášení)",
      "Microsoft Defender (ochrana zařízení)",
    ],
  },
  problemsolving: {
    q1: 8,
    q2: 7,
    tools: [
      "OneNote (digitální zápisník)",
      "Planner / To Do (správa úkolů)",
    ],
  },
  ai: {
    score: 6,
    tools: [
      "Microsoft Copilot (asistent v Office)",
      "Diktování (převod řeči na text)",
    ],
  },
};

const SECTIONS: {
  key: SectionKey;
  icon: string;
  title: string;
  description: string;
  q1: string;
  q2: string;
  toolsLabel: string;
  tools: string[];
}[] = [
  {
    key: "information",
    icon: "🔍",
    title: "Informační a datová gramotnost",
    description: "Schopnost vyhledat, vyhodnotit a spravovat data a informace.",
    q1: "Efektivita vyhledávání: Jak dobře dokážete využívat filtry a pokročilé nástroje k nalezení relevantních informací v záplavě dat?",
    q2: "Kritické posouzení: Jak moc si věříte v rozpoznání důvěryhodného zdroje od zavádějícího nebo lživého obsahu (fake news)?",
    toolsLabel: "Které z těchto M365 aplikací využíváte pro práci s informacemi?",
    tools: [
      "SharePoint (prohledávání firemního obsahu)",
      "OneDrive (organizace a správa vlastních souborů)",
      "Microsoft Lists (evidence a třídění dat)",
    ],
  },
  {
    key: "communication",
    icon: "🤝",
    title: "Komunikace a spolupráce",
    description: "Interakce, sdílení a spolupráce prostřednictvím digitálních technologií.",
    q1: "Pokročilé sdílení: Jak dobře ovládáte nastavování přístupových práv k dokumentům (např. odlišná práva pro čtení vs. úpravy pro různé lidi)?",
    q2: "Digitální etiketa a organizace: Jak si věříte v organizaci komplexních online schůzek (včetně správy kalendáře, nahrávání a moderování chatu)?",
    toolsLabel: "Které z těchto M365 aplikací využíváte pro spolupráci?",
    tools: [
      "Microsoft Teams (komunikace, týmová spolupráce)",
      "Outlook (e-mail, správa času a kalendáře)",
      "Whiteboard (společné vizuální plánování a brainstorming)",
    ],
  },
  {
    key: "content",
    icon: "✍️",
    title: "Tvorba digitálního obsahu",
    description: "Vytváření a úprava obsahu, programování a pochopení autorských práv.",
    q1: "Právní povědomí: Do jaké míry rozumíte licencím a autorským právům u digitálního obsahu (např. co můžete legálně použít z internetu)?",
    q2: "Zjednodušení práce: Jak dobře dokážete využívat pokročilé funkce aplikací k automatizaci (např. hromadná korespondence, makra, automatická pravidla)?",
    toolsLabel: "Které z těchto M365 aplikací využíváte k tvorbě a úpravám?",
    tools: [
      "PowerPoint (prezentace)",
      "Word (dokumenty)",
      "Power Automate (automatizace procesů)",
    ],
  },
  {
    key: "security",
    icon: "🛡️",
    title: "Bezpečnost",
    description: "Ochrana zařízení, osobních údajů, soukromí a zdraví.",
    q1: "Digitální stopa a soukromí: Jak dobře dokážete spravovat své soukromí (např. omezování přístupu aplikací k poloze nebo správné nastavení cookies)?",
    q2: "Kybernetická ostražitost: Nakolik jste si jistí v rozpoznání podezřelých e-mailů (phishing) a v bezpečném nakládání s hesly (např. MFA)?",
    toolsLabel: "Které z těchto M365 nástrojů využíváte pro bezpečnost?",
    tools: [
      "Microsoft Authenticator (schvalování přihlášení)",
      "Microsoft Defender (ochrana zařízení)",
      "Purview (zabezpečení citlivých dokumentů)",
    ],
  },
  {
    key: "problemsolving",
    icon: "🛠️",
    title: "Řešení problémů",
    description: "Identifikace potřeb a řešení technických potíží.",
    q1: "Technická soběstačnost: Jak dobře si dokážete sami vyhledat návod a vyřešit problém s nastavením softwaru, aniž byste volali IT podporu?",
    q2: "Inovativní přístup: Nakolik aktivně hledáte nové digitální způsoby, jak vylepšit stávající firemní procesy nebo si zjednodušit práci?",
    toolsLabel: "Které z těchto M365 aplikací využíváte k řešení úkolů?",
    tools: [
      "OneNote (digitální zápisník)",
      "Planner / To Do (správa úkolů)",
      "Forms (průzkumy a sběr dat)",
    ],
  },
];

const AI_TOOLS = [
  "Microsoft Copilot (asistent v Office)",
  "Designer (tvorba grafiky AI)",
  "Diktování (převod řeči na text)",
];

const TOTAL_STEPS = 8;

const STEP_LABELS = [
  "Identifikace",
  "Informace & Data",
  "Komunikace",
  "Tvorba obsahu",
  "Bezpečnost",
  "Řešení problémů",
  "AI Bonus",
  "Odeslání",
];

import AssessmentSummary from "./AssessmentSummary";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    y: direction > 0 ? 16 : -16,
    opacity: 0,
  }),
  center: { x: 0, y: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    y: direction < 0 ? 16 : -16,
    opacity: 0,
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [phase, setPhase] = useState<"form" | "loading" | "report">("form");
  const [direction, setDirection] = useState(1);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const submitAssessment = () => {
    if (phase !== "form") return;
    setPhase("loading");

    window.setTimeout(() => {
      setPhase("report");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep, phase]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if (e.defaultPrevented) return;
      if (e.repeat) return;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (!containerRef.current) return;
      if (e.target && !containerRef.current.contains(e.target as Node)) return;

      e.preventDefault();

      if (phase !== "form") return;

      if (currentStep < TOTAL_STEPS - 1) {
        setDirection(1);
        setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
        return;
      }

      submitAssessment();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentStep, phase]);

  const progress = Math.round((currentStep / (TOTAL_STEPS - 1)) * 100);

  const updateSection = (key: SectionKey, field: keyof SectionData, value: number | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const goNext = () => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep((s) => s - 1);
  };

  const currentSection = currentStep >= 1 && currentStep <= 5 ? SECTIONS[currentStep - 1] : null;
  const isReport = phase === "report";
  const isLoading = phase === "loading";

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: isReport ? "transparent" : "#F4F5FA",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: 1020, margin: "0 auto" }}>
        {/* Page header */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              fontStyle: "italic",
              color: "#040E3C",
              marginBottom: 8,
            }}
          >
            Digitální Assessment
          </h1>
          <p style={{ color: "#6B7280", fontSize: 15 }}>
            {isReport
              ? "Vyhodnocení výsledků · osobní report"
              : `Mapování digitálních kompetencí DigComp 2.1 · Krok ${currentStep + 1} z ${TOTAL_STEPS}`}
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            background: "#E5E7EB",
            borderRadius: 999,
            height: 8,
            marginBottom: 20,
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            style={{
              height: "100%",
              background: "#2596FF",
              borderRadius: 999,
            }}
          />
        </div>

        {/* Step indicator */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 32,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const isActive = !isReport && i === currentStep;
            const isDone = isReport || i < currentStep;
            return (
              <motion.div
                key={i}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isDone || isActive ? "#2596FF" : "white",
                  borderColor: isDone || isActive ? "#2596FF" : "#E5E7EB",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "2px solid",
                  color: isDone || isActive ? "white" : "#6B7280",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 7L5.5 10L11.5 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </motion.div>
            );
          })}
          <span
            style={{
              fontSize: 13,
              color: "#6B7280",
              marginLeft: 12,
              fontWeight: 600,
            }}
          >
            {isReport ? "Vyhodnocení" : STEP_LABELS[currentStep]}
          </span>
        </div>

        {/* Step content card */}
        <div
          style={{
            background: isReport ? "transparent" : "white",
            borderRadius: isReport ? 0 : 20,
            border: "none",
            boxShadow: isReport ? "none" : "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
            padding: isReport ? 0 : "40px 48px",
            marginBottom: 24,
            overflow: "hidden",
          }}
        >
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ display: "grid", placeItems: "center", padding: "48px 0", gap: 14 }}
            >
              <div className="ds-spinner" aria-label="Načítání" />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, marginBottom: 4, color: "#040E3C" }}>Vyhodnocujeme výsledky…</div>
                <div style={{ color: "#6B7280", fontSize: 13 }}>
                  Zabere to jen chvilku
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 0: Identifikace */}
            {!isLoading && !isReport && currentStep === 0 && (
              <motion.div
                key="step-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants}>
                    <SectionHeader icon="👤" title="Úvodní identifikace" description="Ověřte a doplňte své základní údaje." />
                  </motion.div>

                  <motion.div variants={itemVariants} style={{ marginBottom: 20 }}>
                    <FieldLabel>Celé jméno</FieldLabel>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      style={inputStyle}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
                    <FieldLabel>Pracovní e-mail</FieldLabel>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      style={inputStyle}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#040E3C",
                        marginBottom: 14,
                      }}
                    >
                      Vaše pracovní zařazení
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {ROLES.map((role) => {
                        const isSelected = formData.role === role;
                        return (
                          <SelectableCard
                            key={role}
                            isSelected={isSelected}
                            onClick={() => setFormData((p) => ({ ...p, role }))}
                          >
                            <input
                              type="radio"
                              name="role"
                              value={role}
                              checked={isSelected}
                              onChange={() => setFormData((p) => ({ ...p, role }))}
                              style={{ display: "none" }}
                            />
                            <span style={{ fontSize: 15, color: "#040E3C" }}>{role}</span>
                          </SelectableCard>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <ScaleSlider
                      label="Váš celkový vztah k digitálním technologiím (1 = vyhýbám se jim, 10 = jsem technologický nadšenec)"
                      value={formData.digitalRelationship}
                      onChange={(v) => setFormData((p) => ({ ...p, digitalRelationship: v }))}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Steps 1–5: Kompetence */}
            {!isLoading && !isReport && currentStep >= 1 && currentStep <= 5 && currentSection && (
              <motion.div
                key={`step-${currentStep}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants}>
                    <SectionHeader
                      icon={currentSection.icon}
                      title={`${currentStep}. ${currentSection.title}`}
                      description={currentSection.description}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <ScaleSlider
                      label={currentSection.q1}
                      value={formData[currentSection.key].q1}
                      onChange={(v) => updateSection(currentSection.key, "q1", v)}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <ScaleSlider
                      label={currentSection.q2}
                      value={formData[currentSection.key].q2}
                      onChange={(v) => updateSection(currentSection.key, "q2", v)}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <CheckboxGroup
                      label={currentSection.toolsLabel}
                      options={currentSection.tools}
                      selected={formData[currentSection.key].tools}
                      onChange={(tools) => updateSection(currentSection.key, "tools", tools)}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 6: AI Bonus */}
            {!isLoading && !isReport && currentStep === 6 && (
              <motion.div
                key="step-6"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants}>
                    <SectionHeader
                      icon="🤖"
                      title="Bonus: Umělá inteligence (AI)"
                      description="Nepovinná sekce zaměřená na znalost a používání AI nástrojů."
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <ScaleSlider
                      label="Znalost AI: Jak se považujete za pokročilé v používání generativní AI (např. psaní promptů, generování textů či obrázků)?"
                      value={formData.ai.score}
                      onChange={(v) => setFormData((p) => ({ ...p, ai: { ...p.ai, score: v } }))}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <CheckboxGroup
                      label="Které AI funkce v Microsoftu znáte nebo používáte?"
                      options={AI_TOOLS}
                      selected={formData.ai.tools}
                      onChange={(tools) => setFormData((p) => ({ ...p, ai: { ...p.ai, tools } }))}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 7: Odeslání */}
            {!isLoading && !isReport && currentStep === 7 && (
              <motion.div
                key="step-7"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants}>
                    <SectionHeader
                      icon="✅"
                      title="Před odesláním"
                      description="Po kliknutí na Odeslat se vygeneruje vyhodnocení a zobrazí se report."
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <div
                      style={{
                        background: "#F4F5FA",
                        borderRadius: 16,
                        padding: 24,
                      }}
                    >
                      <div style={{ display: "grid", gap: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                          <span style={{ color: "#6B7280", fontSize: 13 }}>Jméno</span>
                          <span style={{ fontWeight: 700, color: "#040E3C" }}>{formData.name || "—"}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                          <span style={{ color: "#6B7280", fontSize: 13 }}>E-mail</span>
                          <span style={{ fontWeight: 700, color: "#040E3C" }}>{formData.email || "—"}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                          <span style={{ color: "#6B7280", fontSize: 13 }}>Zařazení</span>
                          <span style={{ fontWeight: 700, color: "#040E3C" }}>{formData.role || "—"}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.p
                    variants={itemVariants}
                    style={{ marginTop: 16, color: "#6B7280", fontSize: 13 }}
                  >
                    Tip: pro rychlé pokračování můžeš použít klávesu Enter.
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {isReport && <AssessmentSummary formData={formData} SECTIONS={SECTIONS} />}
        </div>

        {/* Navigation */}
        {!isLoading && !isReport && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <motion.button
              whileHover={{ scale: currentStep === 0 ? 1 : 1.02 }}
              whileTap={{ scale: currentStep === 0 ? 1 : 0.98 }}
              onClick={goBack}
              disabled={currentStep === 0}
              style={{
                padding: "14px 24px",
                borderRadius: 12,
                border: "none",
                background: "transparent",
                color: currentStep === 0 ? "#9CA3AF" : "#040E3C",
                fontSize: 16,
                fontWeight: 600,
                cursor: currentStep === 0 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Zpět
            </motion.button>

            {currentStep < TOTAL_STEPS - 1 ? (
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={goNext}
                style={{
                  padding: "14px 32px",
                  borderRadius: 12,
                  border: "none",
                  background: "#2596FF",
                  color: "white",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(37, 150, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Dále
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7.5 5L12.5 10L7.5 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={submitAssessment}
                style={{
                  padding: "14px 32px",
                  borderRadius: 12,
                  border: "none",
                  background: "#2596FF",
                  color: "white",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(37, 150, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Odeslat assessment
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10L8 14L16 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            )}
          </div>
        )}

        {isReport && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setPhase("form");
                setCurrentStep(TOTAL_STEPS - 1);
              }}
              style={{
                padding: "14px 24px",
                borderRadius: 12,
                border: "none",
                background: "transparent",
                color: "#040E3C",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Upravit odpovědi
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/")}
              style={{
                padding: "14px 32px",
                borderRadius: 12,
                border: "none",
                background: "#2596FF",
                color: "white",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(37, 150, 255, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Pokračovat
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 32 }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "rgba(37, 150, 255, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#040E3C",
            marginBottom: 6,
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 15,
        fontWeight: 600,
        color: "#040E3C",
        marginBottom: 8,
      }}
    >
      {children}
    </label>
  );
}

function SelectableCard({
  children,
  isSelected,
  onClick,
}: {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 4px 16px rgba(37, 150, 255, 0.12)" }}
      whileTap={{ scale: 0.98 }}
      animate={
        isSelected
          ? { boxShadow: "0 0 0 2px rgba(37, 150, 255, 0.3)" }
          : { boxShadow: "0 0 0 0 rgba(37, 150, 255, 0)" }
      }
      transition={{ duration: 0.2 }}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 20px",
        borderRadius: 12,
        border: isSelected ? "2px solid #2596FF" : "1px solid #E5E7EB",
        background: isSelected ? "rgba(37, 150, 255, 0.05)" : "white",
        cursor: "pointer",
        transition: "border-color 0.15s ease, background 0.15s ease",
      }}
    >
      {children}
    </motion.div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid #E5E7EB",
  fontSize: 15,
  color: "#040E3C",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
};

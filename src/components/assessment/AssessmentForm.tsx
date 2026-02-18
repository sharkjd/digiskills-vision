"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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

/** Předvyplněná data pro náhled – realistický příklad vyplněného assessmentu */
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
  "Shrnutí",
];

import AssessmentSummary from "./AssessmentSummary";

export default function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if (e.defaultPrevented) return;
      if (e.repeat) return;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (!containerRef.current) return;
      if (e.target && !containerRef.current.contains(e.target as Node)) return;

      e.preventDefault();

      if (currentStep < TOTAL_STEPS - 1) {
        setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
        return;
      }

      router.push("/");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentStep, router]);

  const progress = Math.round((currentStep / (TOTAL_STEPS - 1)) * 100);

  const updateSection = (key: SectionKey, field: keyof SectionData, value: number | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const handleSubmit = () => {
    router.push("/");
  };

  const currentSection = currentStep >= 1 && currentStep <= 5 ? SECTIONS[currentStep - 1] : null;

  return (
    <div ref={containerRef} style={{ maxWidth: 1020, margin: "0 auto", padding: "40px 24px" }}>
      {/* Page header */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: "var(--font-size-page-title)",
            fontWeight: 700,
            color: "var(--color-text-main)",
            marginBottom: 6,
          }}
        >
          Digitální Assessment
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-body)" }}>
          Mapování digitálních kompetencí DigComp 2.1 · Krok {currentStep + 1} z {TOTAL_STEPS}
        </p>
      </div>

      {/* Progress bar */}
      <div
        style={{
          background: "var(--color-border)",
          borderRadius: 999,
          height: 8,
          marginBottom: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "var(--color-primary)",
            borderRadius: 999,
            transition: "width 0.35s ease",
          }}
        />
      </div>

      {/* Step indicator */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 32,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background:
                i < currentStep
                  ? "var(--color-primary)"
                  : i === currentStep
                  ? "var(--color-primary)"
                  : "var(--color-border)",
              color: i <= currentStep ? "white" : "var(--color-text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {i < currentStep ? "✓" : i + 1}
          </div>
        ))}
        <span
          style={{
            fontSize: "var(--font-size-meta)",
            color: "var(--color-text-secondary)",
            marginLeft: 8,
            fontWeight: 500,
          }}
        >
          {STEP_LABELS[currentStep]}
        </span>
      </div>

      {/* Step content card */}
      <div
        style={{
          background: currentStep === 7 ? "transparent" : "var(--color-background)",
          borderRadius: currentStep === 7 ? 0 : "var(--radius-card)",
          border: currentStep === 7 ? "none" : "1px solid var(--color-border)",
          boxShadow: currentStep === 7 ? "none" : "0 2px 8px var(--color-card-shadow)",
          padding: currentStep === 7 ? 0 : "32px",
          marginBottom: 24,
        }}
      >
        {/* Step 0: Identifikace */}
        {currentStep === 0 && (
          <div>
            <SectionHeader icon="👤" title="Úvodní identifikace" description="Ověřte a doplňte své základní údaje." />

            <div style={{ marginBottom: 20 }}>
              <FieldLabel>Celé jméno</FieldLabel>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <FieldLabel>Pracovní e-mail</FieldLabel>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <p
                style={{
                  fontSize: "var(--font-size-body)",
                  fontWeight: 600,
                  color: "var(--color-text-main)",
                  marginBottom: 14,
                }}
              >
                Vaše pracovní zařazení
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {ROLES.map((role) => {
                  const isSelected = formData.role === role;
                  return (
                    <label key={role} style={checkboxLabelStyle(isSelected)}>
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={isSelected}
                        onChange={() => setFormData((p) => ({ ...p, role }))}
                        style={checkboxInputStyle}
                      />
                      <span style={{ fontSize: "var(--font-size-body)", color: "var(--color-text-main)" }}>
                        {role}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <ScaleSlider
              label="Váš celkový vztah k digitálním technologiím (1 = vyhýbám se jim, 10 = jsem technologický nadšenec)"
              value={formData.digitalRelationship}
              onChange={(v) => setFormData((p) => ({ ...p, digitalRelationship: v }))}
            />
          </div>
        )}

        {/* Steps 1–5: Kompetence */}
        {currentStep >= 1 && currentStep <= 5 && currentSection && (
          <div>
            <SectionHeader
              icon={currentSection.icon}
              title={`${currentStep}. ${currentSection.title}`}
              description={currentSection.description}
            />
            <ScaleSlider
              label={currentSection.q1}
              value={formData[currentSection.key].q1}
              onChange={(v) => updateSection(currentSection.key, "q1", v)}
            />
            <ScaleSlider
              label={currentSection.q2}
              value={formData[currentSection.key].q2}
              onChange={(v) => updateSection(currentSection.key, "q2", v)}
            />
            <CheckboxGroup
              label={currentSection.toolsLabel}
              options={currentSection.tools}
              selected={formData[currentSection.key].tools}
              onChange={(tools) => updateSection(currentSection.key, "tools", tools)}
            />
          </div>
        )}

        {/* Step 6: AI Bonus */}
        {currentStep === 6 && (
          <div>
            <SectionHeader
              icon="🤖"
              title="Bonus: Umělá inteligence (AI)"
              description="Nepovinná sekce zaměřená na znalost a používání AI nástrojů."
            />
            <ScaleSlider
              label="Znalost AI: Jak se považujete za pokročilé v používání generativní AI (např. psaní promptů, generování textů či obrázků)?"
              value={formData.ai.score}
              onChange={(v) => setFormData((p) => ({ ...p, ai: { ...p.ai, score: v } }))}
            />
            <CheckboxGroup
              label="Které AI funkce v Microsoftu znáte nebo používáte?"
              options={AI_TOOLS}
              selected={formData.ai.tools}
              onChange={(tools) => setFormData((p) => ({ ...p, ai: { ...p.ai, tools } }))}
            />
          </div>
        )}

        {/* Step 7: Shrnutí */}
        {currentStep === 7 && <AssessmentSummary formData={formData} SECTIONS={SECTIONS} />}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 0}
          style={{
            padding: "10px 24px",
            borderRadius: "var(--radius-btn)",
            border: `1px solid ${currentStep === 0 ? "var(--color-border)" : "var(--color-primary)"}`,
            background: "var(--color-background)",
            color: currentStep === 0 ? "var(--color-text-secondary)" : "var(--color-primary)",
            fontSize: "var(--font-size-body)",
            fontWeight: 600,
            cursor: currentStep === 0 ? "not-allowed" : "pointer",
            transition: "all 0.15s ease",
          }}
        >
          ← Zpět
        </button>

        {currentStep < TOTAL_STEPS - 1 ? (
          <button
            onClick={() => setCurrentStep((s) => s + 1)}
            style={{
              padding: "10px 32px",
              borderRadius: "var(--radius-btn)",
              border: "none",
              background: "var(--color-primary)",
              color: "white",
              fontSize: "var(--font-size-body)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-primary-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-primary)")}
          >
            Dále →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 32px",
              borderRadius: "var(--radius-btn)",
              border: "none",
              background: "var(--color-primary)",
              color: "white",
              fontSize: "var(--font-size-body)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-primary-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-primary)")}
          >
            Odeslat assessment ✓
          </button>
        )}
      </div>
    </div>
  );
}

// --- Pomocné sub-komponenty ---

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
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 28 }}>
      <span style={{ fontSize: 34, lineHeight: 1 }}>{icon}</span>
      <div>
        <h2
          style={{
            fontSize: "var(--font-size-section-title)",
            fontWeight: 700,
            color: "var(--color-text-main)",
            marginBottom: 4,
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: "var(--font-size-meta)", color: "var(--color-text-secondary)" }}>
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
        fontSize: "var(--font-size-body)",
        fontWeight: 600,
        color: "var(--color-text-main)",
        marginBottom: 8,
      }}
    >
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "var(--radius-input)",
  border: "1px solid var(--color-border-input)",
  fontSize: "var(--font-size-body)",
  color: "var(--color-text-main)",
  outline: "none",
  boxSizing: "border-box",
};

const checkboxInputStyle: React.CSSProperties = {
  accentColor: "var(--color-primary)",
  width: 18,
  height: 18,
  cursor: "pointer",
  flexShrink: 0,
};

const checkboxLabelStyle = (isSelected: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 16px",
  borderRadius: "var(--radius-input)",
  border: `1px solid ${isSelected ? "var(--color-primary)" : "var(--color-border)"}`,
  background: isSelected ? "#f0f8ff" : "var(--color-background)",
  cursor: "pointer",
  transition: "border-color 0.15s ease, background 0.15s ease",
});

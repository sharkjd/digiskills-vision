"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecommendedCourses } from "@/context/RecommendedCoursesContext";
import { COURSE_LIST, Course } from "@/data/courses";

type SectionData = {
  q1: number;
  q2: number;
  tools: string[];
};

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

type AssessmentSummaryProps = {
  formData: FormData;
  SECTIONS: {
    key: string;
    icon: string;
    title: string;
    description: string;
  }[];
};

const DIGCOMP_LABELS = [
  "Zpracování informací a dat",
  "Komunikace a spolupráce",
  "Tvorba digitálního obsahu",
  "Digitální bezpečnost",
  "Řešení problémů",
];

const COMPANY_AVG = [6.4, 5.4, 4.4, 6.5, 4.7];

const DIGCOMP_LEGEND = [
  { short: "Informace a data", icon: "📊", color: "#FEE2E2", iconBg: "#EF4444" },
  { short: "Komunikace", icon: "💬", color: "#EDE9FE", iconBg: "#6366F1" },
  { short: "Digitální obsah", icon: "☁️", color: "#E0F2FE", iconBg: "#0EA5E9" },
  { short: "Bezpečnost", icon: "✓", color: "#FEF3C7", iconBg: "#F59E0B" },
  { short: "Řešení problémů", icon: "🧩", color: "#D1FAE5", iconBg: "#10B981" },
];

const BENCHMARK_DATA = {
  myScore: 7.3,
  companyAvg: 5.52,
  bestEmployee: 9.2,
  avgEmployee: 6.1,
};

const RECOMMENDED_APPS = [
  { name: "Power Automate", icon: "/logos/Microsoft_Power_Automate.svg.png" },
  { name: "Power BI", icon: "/logos/PowerBI.png" },
  { name: "OneNote", icon: "/logos/OneNote.png" },
  { name: "Planner", icon: "/logos/Planner.png" },
  { name: "Forms", icon: "/logos/Forms.png" },
];


function getLevelLabel(score: number): { label: string; description: string } {
  if (score < 5) return { label: "Digitální nováček", description: "Základní digitální dovednosti" };
  if (score < 7) return { label: "Digitální praktik", description: "Mírně pokročilá úroveň" };
  if (score < 9) return { label: "Digitální expert", description: "Pokročilá úroveň" };
  return { label: "Digitální lídr", description: "Expertní úroveň" };
}

function getAIFeedback(score: number): string {
  if (score < 5) {
    return "Máte solidní základ. Zaměřte se na prozkoumání nových nástrojů a nebojte se experimentovat – každý krok vpřed se počítá.";
  }
  if (score < 7) {
    return "Technologie ovládáte s jistotou. Pokud se zaměříte na automatizaci a AI nástroje, získáte hodiny času týdně navíc.";
  }
  if (score < 9) {
    return "Jste nad průměrem. Vaše znalosti vám umožňují být mentorem pro kolegy a aktivně přispívat k digitální transformaci.";
  }
  return "Gratulujeme! Patříte mezi digitální lídry. Vaše expertiza může formovat digitální strategii celé organizace.";
}

export default function AssessmentSummary({ formData, SECTIONS }: AssessmentSummaryProps) {
  const router = useRouter();
  const { setRecommendedCourses } = useRecommendedCourses();
  
  const sectionKeys = ["information", "communication", "content", "security", "problemsolving"] as const;

  const userScores = sectionKeys.map((key) => {
    const data = formData[key];
    return (data.q1 + data.q2) / 2;
  });

  const overallScore = userScores.reduce((a, b) => a + b, 0) / userScores.length;
  const levelInfo = getLevelLabel(overallScore);
  const aiFeedback = getAIFeedback(overallScore);
  
  const handleContinue = () => {
    setRecommendedCourses(COURSE_LIST.slice(0, 6));
    router.push("/moje-kurzy");
  };

  const strongestIndex = userScores.indexOf(Math.max(...userScores));
  const weakestIndex = userScores.indexOf(Math.min(...userScores));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* HERO SEKCE – Digi Sky #040E3C podle brand manuálu */}
      <div
        style={{
          background: "#040E3C",
          borderRadius: 16,
          padding: "32px 28px",
          color: "white",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 32,
          alignItems: "center",
        }}
      >
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
            {levelInfo.label}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>
            Výsledky vašeho assessmentu
          </h1>
          <p style={{ fontSize: 15, opacity: 0.85, margin: "0 0 20px", maxWidth: 480, lineHeight: 1.6 }}>
            {aiFeedback}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "#2596FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              {formData.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{formData.name}</div>
              <div style={{ fontSize: 13, opacity: 0.7 }}>{formData.role || "Neuvedeno"}</div>
            </div>
          </div>
        </div>

        {/* Kruhový ukazatel Digiskills Index */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ position: "relative", width: 140, height: 140 }}>
            <svg width="140" height="140" viewBox="0 0 140 140" style={{ display: "block" }}>
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="12"
              />
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="#2596FF"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(overallScore / 10) * 377} 377`}
                transform="rotate(-90 70 70)"
                style={{ transition: "stroke-dasharray 0.6s ease" }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 800 }}>{overallScore.toFixed(1)}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>/ 10</div>
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600 }}>Digiskills Index</div>
          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
            Pořadí ve firmě: 3. místo z 47 zaměstnanců
          </div>
        </div>
      </div>

      {/* RADAR CHART SEKCE */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "28px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 24px", fontStyle: "italic" }}>
          Porovnání kompetencí dle DigComp
        </h2>

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Radar chart (pavouk) */}
          <div style={{ flex: "1 1 420px", minWidth: 380, overflow: "visible" }}>
            <IndividualRadarChart
              userScores={userScores}
              companyAvg={COMPANY_AVG}
              labels={DIGCOMP_LABELS}
            />
          </div>

          {/* Digiskills Index chart + legenda */}
          <div style={{ flex: "1 1 360px", minWidth: 300 }}>
            <IndividualDigiskillsIndexChart
              myScore={overallScore}
              companyAvg={BENCHMARK_DATA.companyAvg}
              bestEmployee={BENCHMARK_DATA.bestEmployee}
            />

            {/* Legenda kompetencí */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
              {DIGCOMP_LABELS.map((label, i) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: userScores[i] >= COMPANY_AVG[i] ? "#2596FF" : "#F7981C",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 13, color: "#374151", flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#040E3C", minWidth: 32 }}>
                    {userScores[i].toFixed(1)}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid #E5E7EB",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 3, background: "#F7981C", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>Můj výsledek</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 3, background: "#9CA3AF", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#6B7280", fontWeight: 500 }}>Průměr firmy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SLOVNÍ VYHODNOCENÍ – Digi Breeze pozadí */}
      <div
        style={{
          background: "#F4F5FA",
          borderRadius: 16,
          padding: "32px 36px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 24px" }}>
          Slovní vyhodnocení
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            <strong>Gratulujeme, Honzo!</strong> Na základě tvých odpovědí jsi byl zařazen do úrovně{" "}
            <strong>Digitální expert</strong>.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            Tvůj celkový <strong>Digiskills Index 7,3</strong> ukazuje, že v digitálním prostředí se pohybuješ s
            vysokou mírou jistoty a efektivity.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            Tvou nejsilnější doménou je <strong>Zpracování informací a dat</strong>, kde tvé skóre{" "}
            <strong>(7,5)</strong> výrazně převyšuje průměr firmy i trhu, což z tebe dělá ideálního mentora pro
            tvůj tým.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            Pro tvůj další profesní růst vidíme největší potenciál v oblasti{" "}
            <strong>Tvorby digitálního obsahu</strong>. Zaměřením se na moderní formáty a pokročilé nástroje pro
            vizualizaci můžeš své stávající znalosti posunout na strategickou úroveň a ještě více zefektivnit
            svou každodenní agendu.
          </p>
        </div>
      </div>

      {/* SILNÉ STRÁNKY vs PŘÍLEŽITOSTI – Digi Skills a Digi Orange */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {/* Superschopnosti – Digi Skills #77F9D9 */}
        <div
          style={{
            background: "#77F9D9",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src="/Screenshots/Symbol Dark.png" alt="" width={28} height={28} style={{ objectFit: "contain" }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#040E3C", margin: 0 }}>
              Tvé superschopnosti
            </h3>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#040E3C", marginBottom: 8 }}>
            {DIGCOMP_LABELS[strongestIndex]}
          </div>
          <p style={{ fontSize: 14, color: "#040E3C", margin: 0, lineHeight: 1.5 }}>
            V této oblasti jsi nad průměrem firmy. Tvé skóre{" "}
            <strong>{userScores[strongestIndex].toFixed(1)}</strong> ukazuje, že máš solidní základ pro
            mentoring kolegů.
          </p>
        </div>

        {/* Prostor pro růst – Digi Salmon #FF7575 */}
        <div
          style={{
            background: "#FF7575",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(255,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src="/Screenshots/Symbol Dark.png" alt="" width={28} height={28} style={{ objectFit: "contain" }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#040E3C", margin: 0 }}>
              Prostor pro růst
            </h3>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#040E3C", marginBottom: 8 }}>
            {DIGCOMP_LABELS[weakestIndex]}
          </div>
          <p style={{ fontSize: 14, color: "#040E3C", margin: 0, lineHeight: 1.5 }}>
            Zde máš největší potenciál se zlepšit. Aktuální skóre{" "}
            <strong>{userScores[weakestIndex].toFixed(1)}</strong> – s cílenými kurzy se rychle posuneš dál.
          </p>
        </div>
      </div>

      {/* APLIKACE K ROZVOJI – Digi Breeze pozadí */}
      <div
        style={{
          background: "#F4F5FA",
          borderRadius: 16,
          padding: 24,
          border: "1px solid #E5E7EB",
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#040E3C", margin: "0 0 16px" }}>
          Aplikace k rozvoji
        </h3>
        <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 20px" }}>
          Podle tvých odpovědí jsme identifikovali nástroje, kde máš prostor pro zlepšení:
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          {RECOMMENDED_APPS.map((app) => (
            <div
              key={app.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "16px 20px",
                background: "white",
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                flex: 1,
                minWidth: 0,
                transition: "transform 0.15s, box-shadow 0.15s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image
                  src={app.icon}
                  alt={app.name}
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", textAlign: "center" }}>
                {app.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DOPORUČENÉ KURZY */}
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#040E3C", margin: "0 0 20px" }}>
          Kurzy vybrané přímo pro tebe
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {COURSE_LIST.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* CTA – Digi Azure #2596FF */}
      <div
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
            Připraven posunout se dál?
          </h3>
          <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
            Tvé výsledky byly uloženy. Kurzy na tebe čekají.
          </p>
        </div>
        <button
          onClick={handleContinue}
          style={{
            background: "white",
            color: "#2596FF",
            border: "none",
            borderRadius: 10,
            padding: "14px 32px",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F4F5FA";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Pokračovat ke kurzům
        </button>
      </div>
    </div>
  );
}

function IndividualDigiskillsIndexChart({
  myScore,
  companyAvg,
  bestEmployee,
}: {
  myScore: number;
  companyAvg: number;
  bestEmployee: number;
}) {
  const chartMin = Math.floor(companyAvg - 1);
  const chartMax = Math.ceil(bestEmployee + 1);
  const range = chartMax - chartMin;

  const myPercent = ((myScore - chartMin) / range) * 100;
  const companyAvgPercent = ((companyAvg - chartMin) / range) * 100;
  const bestEmployeePercent = ((bestEmployee - chartMin) / range) * 100;

  return (
    <div style={{ marginBottom: 16, fontFamily: "var(--font-montserrat), Montserrat, sans-serif", maxWidth: 440, margin: "0 auto 16px" }}>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          fontStyle: "italic",
          color: "#040E3C",
          margin: "0 0 28px",
          fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
        }}
      >
        Digiskills index
      </h3>

      {/* Hodnoty nad grafem */}
      <div style={{ position: "relative", height: 36, marginBottom: 8 }}>
        {/* Průměr firmy */}
        <div
          style={{
            position: "absolute",
            left: `${companyAvgPercent}%`,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontStyle: "italic",
              color: "#6B7280",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {companyAvg.toFixed(2).replace(".", ",")}
          </span>
        </div>
        {/* Já – hlavní dominantní hodnota */}
        <div
          style={{
            position: "absolute",
            left: `${myPercent}%`,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              fontStyle: "italic",
              color: "#F7981C",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {myScore.toFixed(2).replace(".", ",")}
          </span>
        </div>
        {/* Nejlepší zaměstnanec */}
        <div
          style={{
            position: "absolute",
            left: `${bestEmployeePercent}%`,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontStyle: "italic",
              color: "#6B7280",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {bestEmployee.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>

      {/* Hlavní pruh grafu se zkosením 11,3° – charakteristický brand prvek */}
      <div
        style={{
          position: "relative",
          height: 44,
          transform: "skewX(-11.3deg)",
          transformOrigin: "center center",
        }}
      >
        {/* Vrstva 1: barevný pruh s gradientem Digi Azure → Digi Skills */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 8,
            overflow: "hidden",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, #2596FF 0%, #77F9D9 100%)",
              borderRadius: 8,
            }}
          />
        </div>

        {/* Vrstva 2: svislé čáry nad pruhem (de-skewed pro rovné čáry) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {/* Čárkovaná čára – Průměr firmy (Digi Sky #040E3C) */}
          <div
            style={{
              position: "absolute",
              left: `${companyAvgPercent}%`,
              top: -10,
              bottom: -10,
              width: 0,
              marginLeft: -1.5,
              borderLeft: "3px dashed #040E3C",
              transform: "skewX(11.3deg)",
            }}
          />
          {/* Čára – Já (Digi Orange #F7981C) */}
          <div
            style={{
              position: "absolute",
              left: `${myPercent}%`,
              top: -10,
              bottom: -10,
              width: 3,
              marginLeft: -1.5,
              background: "#F7981C",
              borderRadius: 2,
              transform: "skewX(11.3deg)",
            }}
          />
          {/* Čára – Nejlepší zaměstnanec (Digi Skills #77F9D9) */}
          <div
            style={{
              position: "absolute",
              left: `${bestEmployeePercent}%`,
              top: -10,
              bottom: -10,
              width: 2,
              marginLeft: -1,
              background: "#77F9D9",
              borderRadius: 1,
              transform: "skewX(11.3deg)",
            }}
          />
        </div>
      </div>

      {/* Popisky pod grafem – s dostatečným whitespace */}
      <div style={{ position: "relative", height: 28, marginTop: 14 }}>
        <div
          style={{
            position: "absolute",
            left: `${companyAvgPercent}%`,
            transform: "translateX(-50%)",
            fontSize: 12,
            fontStyle: "italic",
            color: "#2596FF",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Průměr firmy
        </div>
        <div
          style={{
            position: "absolute",
            left: `${myPercent}%`,
            transform: "translateX(-50%)",
            fontSize: 13,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#F7981C",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Já
        </div>
        <div
          style={{
            position: "absolute",
            left: `${bestEmployeePercent}%`,
            transform: "translateX(-50%)",
            fontSize: 12,
            fontStyle: "italic",
            color: "#77F9D9",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Nejlepší
        </div>
      </div>
    </div>
  );
}

function IndividualRadarChart({
  userScores,
  companyAvg,
  labels,
}: {
  userScores: number[];
  companyAvg: number[];
  labels: string[];
}) {
  const size = 320;
  const center = size / 2;
  const maxRadius = 90;
  const levels = 5;

  const angleStep = (2 * Math.PI) / labels.length;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const radius = (value / 10) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const getLabelPosition = (index: number) => {
    const angle = startAngle + index * angleStep;
    const radius = maxRadius + 10;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
      angle,
    };
  };

  const createPath = (scores: number[]) => {
    const points = scores.map((score, i) => getPoint(i, score));
    return points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ") + " Z";
  };

  const userPath = createPath(userScores);
  const companyPath = createPath(companyAvg);

  const userPoints = userScores.map((score, i) => getPoint(i, score));

  const containerSize = size + 140;
  const offset = 70;
  
  return (
    <div style={{ position: "relative", width: containerSize, height: containerSize, margin: "0 auto" }}>
      <svg 
        width={size} 
        height={size} 
        style={{ 
          display: "block", 
          overflow: "visible",
          position: "absolute",
          left: offset,
          top: offset,
        }}
      >
        {/* Mřížka */}
        {Array.from({ length: levels }, (_, i) => {
          const r = ((i + 1) / levels) * maxRadius;
          const points = labels
            .map((_, j) => {
              const angle = startAngle + j * angleStep;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            })
            .join(" ");
          return <polygon key={i} points={points} fill="none" stroke="#E5E7EB" strokeWidth="1" />;
        })}

        {/* Osy */}
        {labels.map((_, i) => {
          const angle = startAngle + i * angleStep;
          const x2 = center + maxRadius * Math.cos(angle);
          const y2 = center + maxRadius * Math.sin(angle);
          return <line key={i} x1={center} y1={center} x2={x2} y2={y2} stroke="#E5E7EB" strokeWidth="1" />;
        })}

        {/* Průměr firmy */}
        <path d={companyPath} fill="rgba(156, 163, 175, 0.2)" stroke="#9CA3AF" strokeWidth="2" />

        {/* Uživatelské skóre – Digi Orange */}
        <path d={userPath} fill="rgba(247, 152, 28, 0.25)" stroke="#F7981C" strokeWidth="3" />

        {/* Body uživatele */}
        {userPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill="#F7981C" stroke="white" strokeWidth="2" />
        ))}
      </svg>

      {/* Popisky kompetencí jako HTML elementy kolem grafu */}
      {labels.map((_, i) => {
        const pos = getLabelPosition(i);
        const legend = DIGCOMP_LEGEND[i];
        
        let transform = "translate(-50%, -50%)";
        if (i === 0) transform = "translate(-50%, -100%)";
        if (i === 1) transform = "translate(0%, -50%)";
        if (i === 2) transform = "translate(0%, 0%)";
        if (i === 3) transform = "translate(-100%, 0%)";
        if (i === 4) transform = "translate(-100%, -50%)";

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.x + offset,
              top: pos.y + offset,
              transform,
              background: legend.color,
              borderRadius: 20,
              padding: "6px 12px 6px 8px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: legend.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                color: "white",
                fontWeight: 700,
              }}
            >
              {legend.icon}
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#040E3C", textTransform: "uppercase" }}>
              {legend.short}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          height: 140,
          flexShrink: 0,
          position: "relative",
          background: "#F1F5F9",
        }}
      >
        <Image
          src={course.image}
          alt={course.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>

      <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 8px",
                background: "#F3F4F6",
                borderRadius: 6,
                color: "#6B7280",
              }}
            >
              {course.duration}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 8px",
                background: "rgba(37, 150, 255, 0.15)",
                borderRadius: 6,
                color: "#1F80D9",
              }}
            >
              {course.level}
            </span>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#040E3C", margin: "0 0 8px", lineHeight: 1.3 }}>
            {course.title}
          </h3>
          <p style={{ fontSize: 13, color: "#6B7280", margin: 0, lineHeight: 1.5 }}>
            {course.description}
          </p>
        </div>

        <button
          style={{
            width: "100%",
            marginTop: 16,
            padding: "12px 20px",
            background: "#2596FF",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1F80D9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#2596FF")}
        >
          Začít studovat
        </button>
      </div>
    </div>
  );
}

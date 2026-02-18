"use client";

import React from "react";

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

const RECOMMENDED_APPS = [
  { name: "Power Automate", icon: "/icons/power-automate.svg", fallback: "⚡" },
  { name: "Power BI", icon: "/icons/power-bi.svg", fallback: "📊" },
  { name: "OneNote", icon: "/icons/onenote.svg", fallback: "📓" },
  { name: "Planner", icon: "/icons/planner.svg", fallback: "📋" },
  { name: "Forms", icon: "/icons/forms.svg", fallback: "📝" },
];

const COURSE_LIST = [
  {
    id: 1,
    title: "Efektivní spolupráce v Microsoft Teams",
    description: "Naučte se pokročilé techniky pro týmovou komunikaci a online schůzky.",
    image: "/courses/teams.jpg",
    duration: "2 hodiny",
    level: "Středně pokročilý",
  },
  {
    id: 2,
    title: "Automatizace s Power Automate",
    description: "Zjednodušte rutinní úkoly a ušetřete hodiny práce týdně.",
    image: "/courses/automate.jpg",
    duration: "3 hodiny",
    level: "Pokročilý",
  },
  {
    id: 3,
    title: "Základy práce s AI nástroji",
    description: "Objevte, jak vám Copilot a další AI nástroje pomohou být produktivnější.",
    image: "/courses/ai.jpg",
    duration: "1.5 hodiny",
    level: "Začátečník",
  },
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
  const sectionKeys = ["information", "communication", "content", "security", "problemsolving"] as const;

  const userScores = sectionKeys.map((key) => {
    const data = formData[key];
    return (data.q1 + data.q2) / 2;
  });

  const overallScore = userScores.reduce((a, b) => a + b, 0) / userScores.length;
  const levelInfo = getLevelLabel(overallScore);
  const aiFeedback = getAIFeedback(overallScore);

  const strongestIndex = userScores.indexOf(Math.max(...userScores));
  const weakestIndex = userScores.indexOf(Math.min(...userScores));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* HERO SEKCE */}
      <div
        style={{
          background: "linear-gradient(135deg, #002D5B 0%, #004080 100%)",
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
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>
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
                background: "#00AEEF",
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
        <div style={{ textAlign: "center" }}>
          <div style={{ position: "relative", width: 140, height: 140 }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
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
                stroke="#00AEEF"
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
        </div>
      </div>

      {/* RADAR CHART SEKCE */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 28,
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#002D5B", margin: "0 0 24px" }}>
          Porovnání kompetencí dle kategorií DigComp
        </h2>

        <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          {/* Radar Chart */}
          <div style={{ flex: "1 1 300px", minWidth: 280 }}>
            <RadarChart userScores={userScores} companyAvg={COMPANY_AVG} labels={DIGCOMP_LABELS} />
          </div>

          {/* Legenda */}
          <div style={{ flex: "1 1 200px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {DIGCOMP_LABELS.map((label, i) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: userScores[i] >= COMPANY_AVG[i] ? "#00AEEF" : "#F59E0B",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 14, color: "#374151", flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#002D5B" }}>
                    {userScores[i].toFixed(1)}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid #E5E7EB",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 3, background: "#00AEEF", borderRadius: 2 }} />
                <span style={{ fontSize: 12, color: "#6B7280" }}>Můj výsledek</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 3, background: "#9CA3AF", borderRadius: 2 }} />
                <span style={{ fontSize: 12, color: "#6B7280" }}>Průměr firmy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SILNÉ STRÁNKY vs PŘÍLEŽITOSTI */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {/* Superschopnosti */}
        <div
          style={{
            background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
            borderRadius: 16,
            padding: 24,
            border: "1px solid #A7F3D0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "#10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              💪
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#065F46", margin: 0 }}>
              Tvé superschopnosti
            </h3>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#047857", marginBottom: 8 }}>
            {DIGCOMP_LABELS[strongestIndex]}
          </div>
          <p style={{ fontSize: 14, color: "#065F46", margin: 0, lineHeight: 1.5 }}>
            V této oblasti jsi nad průměrem firmy. Tvé skóre{" "}
            <strong>{userScores[strongestIndex].toFixed(1)}</strong> ukazuje, že máš solidní základ pro
            mentoring kolegů.
          </p>
        </div>

        {/* Prostor pro růst */}
        <div
          style={{
            background: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
            borderRadius: 16,
            padding: 24,
            border: "1px solid #FCD34D",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "#F59E0B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              🚀
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#92400E", margin: 0 }}>
              Prostor pro růst
            </h3>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#B45309", marginBottom: 8 }}>
            {DIGCOMP_LABELS[weakestIndex]}
          </div>
          <p style={{ fontSize: 14, color: "#92400E", margin: 0, lineHeight: 1.5 }}>
            Zde máš největší potenciál se zlepšit. Aktuální skóre{" "}
            <strong>{userScores[weakestIndex].toFixed(1)}</strong> – s cílenými kurzy se rychle posunešdál.
          </p>
        </div>
      </div>

      {/* APLIKACE K ROZVOJI */}
      <div
        style={{
          background: "#F8FAFC",
          borderRadius: 16,
          padding: 24,
          border: "1px solid #E5E7EB",
        }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#002D5B", margin: "0 0 16px" }}>
          Aplikace k rozvoji
        </h3>
        <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 20px" }}>
          Podle tvých odpovědí jsme identifikovali nástroje, kde máš prostor pro zlepšení:
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {RECOMMENDED_APPS.map((app) => (
            <div
              key={app.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                padding: "16px 20px",
                background: "white",
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                minWidth: 90,
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
              <div style={{ fontSize: 28 }}>{app.fallback}</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", textAlign: "center" }}>
                {app.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DOPORUČENÉ KURZY */}
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#002D5B", margin: "0 0 20px" }}>
          Kurzy vybrané přímo pro tebe
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {COURSE_LIST.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          background: "linear-gradient(135deg, #00AEEF 0%, #0077B6 100%)",
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
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>
            Připraven posunout se dál?
          </h3>
          <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
            Tvé výsledky byly uloženy. Kurzy na tebe čekají.
          </p>
        </div>
      </div>
    </div>
  );
}

function RadarChart({
  userScores,
  companyAvg,
  labels,
}: {
  userScores: number[];
  companyAvg: number[];
  labels: string[];
}) {
  const size = 260;
  const center = size / 2;
  const maxRadius = 100;
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

  const userPoints = userScores.map((score, i) => getPoint(i, score));
  const companyPoints = companyAvg.map((score, i) => getPoint(i, score));

  const userPath = userPoints.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ") + " Z";
  const companyPath =
    companyPoints.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ") + " Z";

  return (
    <svg width={size} height={size} style={{ display: "block", margin: "0 auto" }}>
      {/* Pozadí – mřížka */}
      {Array.from({ length: levels }, (_, i) => {
        const r = ((i + 1) / levels) * maxRadius;
        const points = labels
          .map((_, j) => {
            const angle = startAngle + j * angleStep;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          })
          .join(" ");
        return (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        );
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

      {/* Uživatelské skóre */}
      <path d={userPath} fill="rgba(0, 174, 239, 0.25)" stroke="#00AEEF" strokeWidth="3" />

      {/* Body uživatele */}
      {userPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill="#00AEEF" stroke="white" strokeWidth="2" />
      ))}
    </svg>
  );
}

function CourseCard({ course }: { course: typeof COURSE_LIST[0] }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
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
      {/* Placeholder obrázek */}
      <div
        style={{
          height: 140,
          background: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            background: "rgba(0,174,239,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
          }}
        >
          {course.id === 1 ? "👥" : course.id === 2 ? "⚡" : "🤖"}
        </div>
      </div>

      <div style={{ padding: 20 }}>
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
              background: "#E0F2FE",
              borderRadius: 6,
              color: "#0369A1",
            }}
          >
            {course.level}
          </span>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#002D5B", margin: "0 0 8px", lineHeight: 1.3 }}>
          {course.title}
        </h3>
        <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 16px", lineHeight: 1.5 }}>
          {course.description}
        </p>

        <button
          style={{
            width: "100%",
            padding: "12px 20px",
            background: "#00AEEF",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#0095D0")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#00AEEF")}
        >
          Začít studovat
        </button>
      </div>
    </div>
  );
}

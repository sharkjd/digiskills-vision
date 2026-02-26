"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BookOpen,
  CheckCircle2,
  Clock,
  Edit3,
  FileText,
  Layers3,
  PenTool,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  Users,
  Zap,
} from "lucide-react";
import DigiskillsCreate from "@/components/digiskills-create/DigiskillsCreate";

type CreationMode = "ai" | null;

const CREATOR_BENEFITS = [
  {
    icon: Clock,
    title: "Rychle od nápadu k obsahu",
    description: "Místo dlouhého skládání osnovy začnete během chvíle. AI navrhne strukturu a vy jen doladíte detaily.",
    gradient: "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)",
    shadowColor: "rgba(37, 150, 255, 0.3)",
  },
  {
    icon: Layers3,
    title: "Obsah vhodný pro microlearning",
    description: "Kurz je členěný do kratších, srozumitelných bloků. Lidé se učí průběžně a zvládnou to i vedle práce.",
    gradient: "linear-gradient(135deg, #77F9D9 0%, #10B981 100%)",
    shadowColor: "rgba(119, 249, 217, 0.3)",
  },
  {
    icon: Target,
    title: "AI navrhne strukturu",
    description: "Stačí popsat téma a cíle. Umělá inteligence vytvoří logickou osnovu a rozdělí obsah do lekcí.",
    gradient: "linear-gradient(135deg, #F7981C 0%, #EA580C 100%)",
    shadowColor: "rgba(247, 152, 28, 0.3)",
  },
  {
    icon: Sparkles,
    title: "Profesionální vzhled bez námahy",
    description: "Výsledný kurz působí moderně a přehledně. Nemusíte řešit design ani formátování.",
    gradient: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
    shadowColor: "rgba(99, 102, 241, 0.3)",
  },
];

const STEPS = [
  {
    icon: "1",
    title: "Popište, co chcete učit",
    description: "Zadejte téma kurzu, cílovou skupinu a hlavní cíle. AI potřebuje vědět, kam směřujete.",
  },
  {
    icon: "2",
    title: "Nahrajte své materiály",
    description: "Přidejte PDF, Word nebo PowerPoint soubory. AI z nich vytáhne klíčové informace.",
  },
  {
    icon: "3",
    title: "AI vygeneruje kurz na míru",
    description: "Během pár minut máte hotovou strukturu kurzu s lekcemi, které můžete dále upravit.",
  },
];

const COURSE_EXAMPLES = [
  {
    title: "Onboarding nových zaměstnanců",
    description: "Kompletní průvodce pro nováčky – od firemní kultury po praktické postupy.",
    lessons: 8,
    duration: "45 min",
    color: "#2596FF",
  },
  {
    title: "BOZP školení",
    description: "Bezpečnost práce a požární ochrana v souladu s aktuální legislativou.",
    lessons: 5,
    duration: "30 min",
    color: "#10B981",
  },
  {
    title: "Produktové školení",
    description: "Detailní znalost produktů pro obchodní tým i zákaznickou podporu.",
    lessons: 12,
    duration: "60 min",
    color: "#F7981C",
  },
];

const FAQ_ITEMS = [
  {
    question: "Jak dlouho trvá vytvoření kurzu?",
    answer: "Obvykle 10–20 minut. Záleží na rozsahu materiálů a složitosti tématu. AI pracuje rychle, vy pak kurz jen doladíte.",
  },
  {
    question: "Mohu kurz později upravit?",
    answer: "Ano, kdykoli. Můžete přidávat lekce, měnit texty, vkládat obrázky nebo videa. Kurz je plně ve vašich rukou.",
  },
  {
    question: "Jaké formáty materiálů mohu nahrát?",
    answer: "PDF, Word (.docx), PowerPoint (.pptx) a textové soubory. AI z nich extrahuje obsah a vytvoří strukturu kurzu.",
  },
  {
    question: "Je obsah kurzu pouze můj?",
    answer: "Ano, veškerý obsah zůstává vaším majetkem. Nesdílíme ho s nikým jiným a nepoužíváme k trénování AI.",
  },
];

export default function CourseCreationHub() {
  const [mode, setMode] = useState<CreationMode>(null);

  if (mode === "ai") {
    return (
      <div style={{ background: "var(--color-breeze)" }}>
        <DigiskillsCreate />
      </div>
    );
  }

  return (
    <div style={{ background: "var(--color-breeze)", minHeight: "100vh", padding: "24px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              fontStyle: "italic",
              color: "var(--color-text-main)",
              margin: "0 0 4px",
            }}
          >
            Tvorba kurzů
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 13, margin: 0 }}>
            Vyberte způsob tvorby. Pro rychlý start doporučujeme AI asistovanou tvorbu.
          </p>
        </div>

        {/* Cards - 2 Column Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {/* AI Card */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setMode("ai")}
            style={{
              background: "var(--color-background)",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 16px rgba(37, 150, 255, 0.3)",
                }}
              >
                <Bot size={24} color="white" strokeWidth={2} />
              </div>
              <motion.div
                whileHover={{ x: 4 }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--color-breeze)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ArrowRight size={20} color="var(--color-primary)" />
              </motion.div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text-main)", margin: 0 }}>
                  Tvorba pomocí AI
                </h2>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "3px 8px",
                    background: "rgba(37, 150, 255, 0.1)",
                    color: "var(--color-primary)",
                    borderRadius: 5,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Sparkles size={10} />
                  Doporučeno
                </span>
              </div>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5 }}>
                Stačí popsat cíle, nahrát materiály a kurz AI navrhne za vás.
              </p>
            </div>
          </motion.div>

          {/* Manual Card - Disabled */}
          <div
            style={{
              background: "var(--color-background)",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              cursor: "not-allowed",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
              opacity: 0.7,
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #F7981C 0%, #EA580C 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 16px rgba(247, 152, 28, 0.3)",
                }}
              >
                <PenTool size={24} color="white" strokeWidth={2} />
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--color-breeze)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ArrowRight size={20} color="var(--color-text-secondary)" />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text-main)", margin: 0 }}>
                  Ruční tvorba kurzu
                </h2>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "3px 8px",
                    background: "rgba(247, 152, 28, 0.12)",
                    color: "#EA580C",
                    borderRadius: 5,
                  }}
                >
                  Brzy
                </span>
              </div>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5 }}>
                Standardní ruční tvorba kurzu v našem editoru.
              </p>
            </div>
          </div>
        </div>

        {/* What You Get Section - Moved up */}
        <div
          style={{
            marginTop: 24,
            background: "var(--color-background)",
            borderRadius: 16,
            border: "1px solid var(--color-border)",
            boxShadow: "0 2px 8px var(--color-card-shadow)",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 300 }}>
            {/* Left side */}
            <div style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: 22,
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "var(--color-text-main)",
                }}
              >
                Co získáte s AI tvorbou
              </h3>
              <p style={{ margin: "0 0 20px", color: "var(--color-text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
                Přestaňte trávit hodiny tvorbou obsahu. AI vám pomůže vytvořit profesionální kurz rychle a efektivně.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {[
                  { text: "Úspora času – kurz místo dnů za minuty", color: "var(--color-primary)" },
                  { text: "Konzistentní kvalita napříč všemi kurzy", color: "var(--color-accent-orange)" },
                  { text: "Snadná úprava a aktualizace obsahu", color: "var(--color-primary)" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: item.color === "var(--color-accent-orange)" ? "rgba(247, 152, 28, 0.15)" : "rgba(37, 150, 255, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: item.color,
                        }}
                      />
                    </div>
                    <span style={{ color: "var(--color-text-main)", fontSize: 13, fontWeight: 500 }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMode("ai")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 20px",
                  background: "var(--color-primary)",
                  borderRadius: 10,
                  border: "none",
                  color: "white",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(37, 150, 255, 0.3)",
                  width: "fit-content",
                }}
              >
                Začít tvořit
                <ArrowRight size={18} />
              </motion.button>
            </div>

            {/* Right side - Stats with subtle background */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(37, 150, 255, 0.03) 0%, rgba(119, 249, 217, 0.05) 100%)",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: "var(--color-primary)",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  15 min
                </div>
                <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 13 }}>
                  průměrná doba vytvoření kurzu
                </p>
              </div>

              <div style={{ display: "flex", gap: 32 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "var(--color-accent-green)", marginBottom: 4 }}>
                    85%
                  </div>
                  <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 11 }}>
                    spokojených uživatelů
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "var(--color-accent-orange)", marginBottom: 4 }}>
                    10×
                  </div>
                  <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 11 }}>
                    rychlejší než ručně
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dark Info Section */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              background: "var(--color-digi-sky)",
              borderRadius: 16,
              padding: "32px 28px",
              color: "white",
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.15)",
                  padding: "5px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 14,
                }}
              >
                <Sparkles size={13} />
                AI-powered tvorba
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 6px", fontStyle: "italic" }}>
                Vytvořte kurz za pár minut
              </h2>
              <p style={{ fontSize: 14, opacity: 0.85, margin: 0, maxWidth: 550 }}>
                Nahrajte své materiály, popište cíle a nechte AI vytvořit strukturovaný kurz. Ušetříte hodiny práce.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {STEPS.map((step) => (
                <motion.div
                  key={step.title}
                  whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: 18,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "var(--color-accent-orange)",
                      color: "var(--color-digi-sky)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 14,
                      marginBottom: 10,
                    }}
                  >
                    {step.icon}
                  </div>
                  <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 14 }}>{step.title}</p>
                  <p style={{ margin: 0, opacity: 0.8, fontSize: 12, lineHeight: 1.5 }}>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits Grid 2x2 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {CREATOR_BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  whileHover={{ y: -6, boxShadow: `0 16px 40px ${benefit.shadowColor}` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    background: "var(--color-background)",
                    borderRadius: 16,
                    border: "1px solid var(--color-border)",
                    padding: 22,
                    boxShadow: "0 2px 8px var(--color-card-shadow)",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: benefit.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 14,
                      boxShadow: `0 4px 12px ${benefit.shadowColor}`,
                    }}
                  >
                    <Icon size={22} color="white" />
                  </div>
                  <h4 style={{ margin: "0 0 6px", color: "var(--color-text-main)", fontWeight: 700, fontSize: 15 }}>
                    {benefit.title}
                  </h4>
                  <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 13, lineHeight: 1.6 }}>
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Course Examples Section */}
          <div>
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: 20,
                fontWeight: 700,
                fontStyle: "italic",
                color: "var(--color-text-main)",
              }}
            >
              Příklady kurzů vytvořených AI
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {COURSE_EXAMPLES.map((course) => (
                <motion.div
                  key={course.title}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    background: "var(--color-background)",
                    borderRadius: 16,
                    border: "1px solid var(--color-border)",
                    padding: 20,
                    boxShadow: "0 2px 8px var(--color-card-shadow)",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${course.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 14,
                    }}
                  >
                    <BookOpen size={20} color={course.color} />
                  </div>
                  <h4 style={{ margin: "0 0 8px", color: "var(--color-text-main)", fontWeight: 700, fontSize: 15 }}>
                    {course.title}
                  </h4>
                  <p style={{ margin: "0 0 14px", color: "var(--color-text-secondary)", fontSize: 13, lineHeight: 1.5 }}>
                    {course.description}
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "4px 8px",
                        background: "var(--color-breeze)",
                        color: "var(--color-text-secondary)",
                        borderRadius: 6,
                      }}
                    >
                      {course.lessons} lekcí
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "4px 8px",
                        background: "var(--color-breeze)",
                        color: "var(--color-text-secondary)",
                        borderRadius: 6,
                      }}
                    >
                      {course.duration}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: 20,
                fontWeight: 700,
                fontStyle: "italic",
                color: "var(--color-text-main)",
              }}
            >
              Časté otázky k AI tvorbě
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              {FAQ_ITEMS.map((item) => (
                <div
                  key={item.question}
                  style={{
                    background: "var(--color-background)",
                    borderRadius: 16,
                    border: "1px solid var(--color-border)",
                    padding: 20,
                    boxShadow: "0 2px 8px var(--color-card-shadow)",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 8px",
                      color: "var(--color-text-main)",
                      fontWeight: 700,
                      fontSize: 15,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "rgba(37, 150, 255, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <span style={{ color: "var(--color-primary)", fontSize: 12, fontWeight: 700 }}>?</span>
                    </span>
                    {item.question}
                  </h4>
                  <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 13, lineHeight: 1.6, paddingLeft: 30 }}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

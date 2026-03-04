"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  FileText,
  CheckSquare,
  Image as ImageIcon,
  ChevronDown,
  ChevronRight,
  Pencil,
  MessageCircle,
} from "lucide-react";
import DurationSlider, { DURATION_OPTIONS } from "./DurationSlider";
import DropZone from "./DropZone";
import { asset } from "@/lib/paths";
import mockData from "@/data/digiskills-create-mock.json";

type Phase = "wizard" | "generating" | "result";
type ChatMessage = { role: "bot" | "user"; content: string; step?: number };
type Audience = "beginner" | "intermediate" | "expert" | null;

type CreateFormData = {
  topic: string;
  audience: Audience;
  goals: string;
  duration: number;
  files: File[];
};

const BOT_QUESTIONS = [
  "Ahoj! Pojďme vytvořit kurz na míru. O čem bude váš nový kurz? (např. práce s počítačem, prohlížečem, telefonem…)",
  "Super! Pro koho je kurz určen?",
  "Co si mají účastníci odnést? Jaké dovednosti nebo znalosti?",
  "Jak dlouhý by měl kurz být?",
  "Nahrajte vaše know-how (PDF, dokumenty…) a já z nich vytvořím osnovu.",
];

const AUDIENCE_OPTIONS: { value: Audience; label: string }[] = [
  { value: "beginner", label: "Začátečníci – denně používám počítač/telefon, chci využít víc" },
  { value: "intermediate", label: "Mírně pokročilí" },
  { value: "expert", label: "Experti" },
];

const GENERATING_MESSAGES = [
  "Čtu nahrané materiály a hledám souvislosti…",
  "Aplikuji Digiskills microlearning metodiku…",
  "Rozsekávám obsah na videa, články a úkoly…",
  "Skládám osnovu – počítač, prohlížeč, telefon…",
];

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
    case "test":
      return FileText;
    default:
      return FileText;
  }
};

const getActivityBadgeStyle = (color: string) => ({
  backgroundColor: `${color}20`,
  color: color === "#77F9D9" ? "#059669" : color,
  borderColor: color,
});

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

export default function DigiskillsCreate() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("wizard");
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { role: "bot", content: BOT_QUESTIONS[0], step: 0 },
  ]);
  const [formData, setFormData] = useState<CreateFormData>({
    topic: "",
    audience: "beginner",
    goals: "",
    duration: 4,
    files: [],
  });
  const [topicInput, setTopicInput] = useState("Digitální inspirace – práce s počítačem, prohlížečem, telefonem a chytrými funkcemi");
  const [goalsInput, setGoalsInput] = useState("Objevit, co všechno umí počítač a telefon – klávesové zkratky, snímky obrazovky, diktování, skenování dokumentů. Digitální mindset.");
  const [generatingMessageIndex, setGeneratingMessageIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<string[]>(
    mockData.curriculum.map((s: { sectionTitle: string }) => s.sectionTitle)
  );
  const [expandedActivityId, setExpandedActivityId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentStep]);

  const addUserMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: "user", content }]);
  };

  const addBotMessage = (content: string, step: number) => {
    setMessages((prev) => [...prev, { role: "bot", content, step }]);
  };

  const advanceStep = (nextStep: number) => {
    setCurrentStep(nextStep);
    if (nextStep < BOT_QUESTIONS.length) {
      addBotMessage(BOT_QUESTIONS[nextStep], nextStep);
    }
  };

  const handleTopicSubmit = () => {
    const trimmed = topicInput.trim();
    if (!trimmed) return;
    setFormData((p) => ({ ...p, topic: trimmed }));
    addUserMessage(trimmed);
    setTopicInput("");
    advanceStep(1);
  };

  const handleAudienceSelect = (value: Audience) => {
    setFormData((p) => ({ ...p, audience: value }));
  };

  const handleAudienceContinue = () => {
    const label = AUDIENCE_OPTIONS.find((o) => o.value === formData.audience)?.label ?? "";
    addUserMessage(label);
    advanceStep(2);
  };

  const handleGoalsSubmit = () => {
    const trimmed = goalsInput.trim();
    if (!trimmed) return;
    setFormData((p) => ({ ...p, goals: trimmed }));
    addUserMessage(trimmed);
    setGoalsInput("");
    advanceStep(3);
  };

  const handleDurationContinue = () => {
    addUserMessage(DURATION_OPTIONS[formData.duration]);
    advanceStep(4);
  };

  const handleGenerate = () => {
    setPhase("generating");
  };

  useEffect(() => {
    if (phase !== "generating") return;
    const interval = setInterval(() => {
      setGeneratingMessageIndex((i) => {
        if (i < GENERATING_MESSAGES.length - 1) return i + 1;
        clearInterval(interval);
        return i;
      });
    }, 1500);
    const timeout = setTimeout(() => {
      router.push("/kurz/1");
    }, 6000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [phase, router]);

  const progressPercent = phase === "wizard" ? ((currentStep + 1) / 5) * 100 : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-breeze)",
        padding: phase === "wizard" ? "32px 20px" : "24px 20px",
      }}
    >
      <div style={{ maxWidth: phase === "result" ? 960 : 800, margin: "0 auto" }}>
        {/* Dark Hero Header (wizard + generating) */}
        {(phase === "wizard" || phase === "generating") && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "#040E3C",
              borderRadius: 16,
              padding: "28px 32px",
              marginBottom: 24,
              color: "white",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.15)",
                    padding: "5px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  Tvorba kurzu pomocí AI
                </div>
                <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 6px", fontStyle: "italic" }}>
                  {phase === "wizard" && "Digiskills.create"}
                  {phase === "generating" && "Generuji kurz…"}
                </h1>
                <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>
                  {phase === "wizard" && `Krok ${currentStep + 1} z 5`}
                  {phase === "generating" && "AI zpracovává vaše materiály"}
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={HOVER_TRANSITION}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={asset("/Screenshots/Symbol Dark.png")}
                  alt=""
                  width={36}
                  height={36}
                  style={{ objectFit: "contain" }}
                />
              </motion.div>
            </div>

            {phase === "wizard" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.9 }}>
                    Krok {currentStep + 1} z 5
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#77F9D9" }}>
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      background: "linear-gradient(90deg, #2596FF 0%, #77F9D9 100%)",
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Result phase header */}
        {phase === "result" && (
          <div style={{ marginBottom: 20 }}>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 700,
                fontStyle: "italic",
                color: "var(--color-text-main)",
                marginBottom: 4,
              }}
            >
              Váš kurz je připraven!
            </h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
              Osnova kurzu vygenerovaná podle vašich požadavků
            </p>
          </div>
        )}

        {/* Phase content */}
        <AnimatePresence mode="wait">
          {phase === "wizard" && (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              exit={{ opacity: 0 }}
              style={{
                background: "var(--color-background)",
                borderRadius: 16,
                border: "1px solid var(--color-border)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              {/* Chat messages */}
              <div
                style={{
                  maxHeight: 420,
                  overflowY: "auto",
                  padding: "24px 24px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    style={{
                      display: "flex",
                      justifyContent: msg.role === "bot" ? "flex-start" : "flex-end",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    {msg.role === "bot" && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={HOVER_TRANSITION}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "linear-gradient(135deg, #2596FF 0%, #77F9D9 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 12px rgba(37, 150, 255, 0.25)",
                        }}
                      >
                        <Image
                          src={asset("/Screenshots/Symbol Dark.png")}
                          alt=""
                          width={26}
                          height={26}
                          style={{ objectFit: "contain" }}
                        />
                      </motion.div>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={HOVER_TRANSITION}
                      style={{
                        maxWidth: "75%",
                        padding: "14px 18px",
                        borderRadius: msg.role === "bot" ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
                        background: msg.role === "bot"
                          ? "linear-gradient(135deg, rgba(37, 150, 255, 0.08) 0%, rgba(119, 249, 217, 0.05) 100%)"
                          : "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)",
                        color: msg.role === "bot" ? "var(--color-text-main)" : "white",
                        fontSize: 15,
                        lineHeight: 1.6,
                        boxShadow: msg.role === "bot"
                          ? "0 2px 8px rgba(0,0,0,0.04)"
                          : "0 4px 16px rgba(37, 150, 255, 0.3)",
                        border: msg.role === "bot" ? "1px solid rgba(37, 150, 255, 0.12)" : "none",
                      }}
                    >
                      {msg.content}
                    </motion.div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div
                style={{
                  borderTop: "1px solid var(--color-border)",
                  padding: "20px 24px",
                  background: "var(--color-breeze)",
                }}
              >
                {currentStep === 0 && (
                  <div>
                    <textarea
                      value={topicInput}
                      onChange={(e) => setTopicInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleTopicSubmit()}
                      placeholder="Napište téma kurzu..."
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: "1px solid var(--color-border)",
                        fontSize: 15,
                        color: "var(--color-text-main)",
                        resize: "vertical",
                        marginBottom: 12,
                        boxSizing: "border-box",
                        background: "var(--color-background)",
                        fontFamily: "inherit",
                      }}
                    />
                    <motion.button
                      whileHover={topicInput.trim() ? { scale: 1.03, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.35)" } : {}}
                      whileTap={topicInput.trim() ? { scale: 0.98 } : {}}
                      onClick={handleTopicSubmit}
                      disabled={!topicInput.trim()}
                      style={{
                        padding: "14px 24px",
                        borderRadius: 12,
                        border: "none",
                        background: topicInput.trim()
                          ? "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)"
                          : "var(--color-border)",
                        color: topicInput.trim() ? "white" : "var(--color-text-secondary)",
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: topicInput.trim() ? "pointer" : "not-allowed",
                        boxShadow: topicInput.trim() ? "0 4px 16px rgba(37, 150, 255, 0.3)" : "none",
                      }}
                    >
                      Odeslat
                    </motion.button>
                  </div>
                )}

                {currentStep === 1 && (
                  <div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
                      {AUDIENCE_OPTIONS.map((opt) => {
                        const isSelected = formData.audience === opt.value;
                        return (
                          <motion.div
                            key={opt.value}
                            whileHover={{ scale: 1.01, boxShadow: "0 4px 16px rgba(37, 150, 255, 0.12)" }}
                            whileTap={{ scale: 0.98 }}
                            transition={HOVER_TRANSITION}
                            onClick={() => handleAudienceSelect(opt.value)}
                            style={{
                              padding: "14px 18px",
                              borderRadius: 12,
                              border: isSelected ? "2px solid var(--color-primary)" : "2px solid var(--color-border)",
                              background: isSelected
                                ? "linear-gradient(135deg, rgba(37, 150, 255, 0.08) 0%, rgba(119, 249, 217, 0.05) 100%)"
                                : "var(--color-background)",
                              cursor: "pointer",
                              fontSize: 15,
                              fontWeight: 600,
                              color: "var(--color-text-main)",
                            }}
                          >
                            {opt.label}
                          </motion.div>
                        );
                      })}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.35)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAudienceContinue}
                      style={{
                        padding: "14px 24px",
                        borderRadius: 12,
                        border: "none",
                        background: "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)",
                        color: "white",
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 4px 16px rgba(37, 150, 255, 0.3)",
                      }}
                    >
                      Odeslat
                    </motion.button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <textarea
                      value={goalsInput}
                      onChange={(e) => setGoalsInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleGoalsSubmit()}
                      placeholder="Sepište cíle kurzu..."
                      rows={4}
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: "1px solid var(--color-border)",
                        fontSize: 15,
                        color: "var(--color-text-main)",
                        resize: "vertical",
                        marginBottom: 12,
                        boxSizing: "border-box",
                        background: "var(--color-background)",
                        fontFamily: "inherit",
                      }}
                    />
                    <motion.button
                      whileHover={goalsInput.trim() ? { scale: 1.03, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.35)" } : {}}
                      whileTap={goalsInput.trim() ? { scale: 0.98 } : {}}
                      onClick={handleGoalsSubmit}
                      disabled={!goalsInput.trim()}
                      style={{
                        padding: "14px 24px",
                        borderRadius: 12,
                        border: "none",
                        background: goalsInput.trim()
                          ? "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)"
                          : "var(--color-border)",
                        color: goalsInput.trim() ? "white" : "var(--color-text-secondary)",
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: goalsInput.trim() ? "pointer" : "not-allowed",
                        boxShadow: goalsInput.trim() ? "0 4px 16px rgba(37, 150, 255, 0.3)" : "none",
                      }}
                    >
                      Odeslat
                    </motion.button>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <DurationSlider
                      value={formData.duration}
                      onChange={(v) => setFormData((p) => ({ ...p, duration: v }))}
                    />
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.35)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDurationContinue}
                      style={{
                        marginTop: 12,
                        padding: "14px 24px",
                        borderRadius: 12,
                        border: "none",
                        background: "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)",
                        color: "white",
                        fontSize: 15,
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 4px 16px rgba(37, 150, 255, 0.3)",
                      }}
                    >
                      Pokračovat
                    </motion.button>
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <DropZone
                      files={formData.files}
                      onChange={(files) => setFormData((p) => ({ ...p, files }))}
                    />
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.35)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGenerate}
                      style={{
                        marginTop: 16,
                        padding: "14px 24px",
                        borderRadius: 12,
                        border: "none",
                        background: "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)",
                        color: "white",
                        fontSize: 16,
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 4px 16px rgba(37, 150, 255, 0.3)",
                        width: "100%",
                      }}
                    >
                      Vygenerovat kurz pomocí AI
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {phase === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              exit={{ opacity: 0 }}
              style={{
                background: "var(--color-background)",
                borderRadius: 16,
                border: "1px solid var(--color-border)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: "grid",
                  placeItems: "center",
                  padding: "80px 0",
                  gap: 16,
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "3px solid var(--color-border)",
                    borderTopColor: "var(--color-primary)",
                  }}
                />
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontWeight: 700,
                      marginBottom: 6,
                      color: "var(--color-text-main)",
                      fontSize: 16,
                    }}
                  >
                    {GENERATING_MESSAGES[generatingMessageIndex]}
                  </div>
                  <div style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
                    AI zpracovává vaše materiály
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", flexDirection: "column", gap: 32 }}
            >
              {/* Hero banner */}
              <div
                style={{
                  position: "relative",
                  background: "rgba(37, 150, 255, 0.08)",
                  borderRadius: "var(--radius-card)",
                  padding: "32px 40px",
                  overflow: "hidden",
                }}
              >
                {/* Dekorativní SVG prvky */}
                <svg
                  style={{ position: "absolute", top: 20, left: 40, opacity: 0.3 }}
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <circle cx="40" cy="40" r="30" stroke="var(--color-primary)" strokeWidth="2" />
                  <circle cx="40" cy="40" r="20" stroke="var(--color-primary)" strokeWidth="1" />
                </svg>
                <svg
                  style={{ position: "absolute", bottom: 20, left: "30%", opacity: 0.2 }}
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <path d="M10 30 L30 10 L50 30 L30 50 Z" stroke="var(--color-primary)" strokeWidth="2" fill="none" />
                </svg>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <h2
                      style={{
                        fontSize: 32,
                        fontWeight: 700,
                        fontStyle: "italic",
                        color: "var(--color-text-main)",
                        marginBottom: 8,
                      }}
                    >
                      {mockData.courseTitle}
                    </h2>
                    <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 16 }}>
                      {(mockData as { publishedDate?: string }).publishedDate ?? "23. listopadu"} · Verze {(mockData as { version?: string }).version ?? "1.0.0"}
                    </p>
                    <p style={{ fontSize: 15, color: "var(--color-text-main)", lineHeight: 1.6 }}>
                      {(mockData as { introParagraph?: string }).introParagraph ?? "Kurz vás provede od základů až po pokročilé techniky."}
                    </p>
                  </div>
                  <div
                    style={{
                      background: "var(--color-background)",
                      borderRadius: "var(--radius-card)",
                      border: "1px solid var(--color-border)",
                      boxShadow: "0 2px 8px var(--color-card-shadow)",
                      padding: 24,
                      minWidth: 220,
                    }}
                  >
                    <p style={{ fontSize: 14, color: "var(--color-text-main)", marginBottom: 8 }}>
                      Čas na studium: {(mockData as { studyTime?: string }).studyTime ?? mockData.generatedDuration}
                    </p>
                    <p style={{ fontSize: 14, color: "var(--color-text-main)", marginBottom: 20 }}>
                      Certifikace: {(mockData as { certification?: string }).certification ?? "Ano"}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary"
                      style={{
                        width: "100%",
                        padding: "12px 24px",
                        borderRadius: "var(--radius-btn)",
                        border: "none",
                        background: "var(--color-primary)",
                        color: "white",
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Začít studovat
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Dvě informační karty */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div
                  style={{
                    background: "var(--color-background)",
                    borderRadius: "var(--radius-card)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 2px 8px var(--color-card-shadow)",
                    padding: 24,
                  }}
                >
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 8 }}>Cílovka</h4>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-main)" }}>
                    {(mockData as { targetAudience?: string }).targetAudience ?? "Manažeři a vedoucí pracovníci"}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 8 }}>20.12.2023</p>
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>20.1.2024</p>
                </div>
                <div
                  style={{
                    background: "var(--color-background)",
                    borderRadius: "var(--radius-card)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 2px 8px var(--color-card-shadow)",
                    padding: 24,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-card)",
                      background: "rgba(37, 150, 255, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MessageCircle style={{ width: 24, height: 24, color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-main)", marginBottom: 4 }}>AI chatbot</h4>
                    <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Chatujte s AI chatbotem</p>
                  </div>
                </div>
              </div>

              {/* Osnova kurzu */}
              <div
                style={{
                  background: "var(--color-background)",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 2px 8px var(--color-card-shadow)",
                  padding: 24,
                }}
              >
                <h2
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    color: "var(--color-text-main)",
                    marginBottom: 20,
                  }}
                >
                  Osnova kurzu
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {(mockData.curriculum as { sectionTitle: string; items: { id: number; type: string; title: string; desc: string; color: string }[] }[]).map(
                    (section, sectionIdx) => {
                      const isExpanded = expandedSections.includes(section.sectionTitle);
                      return (
                        <div key={sectionIdx}>
                          <motion.button
                            onClick={() =>
                              setExpandedSections((prev) =>
                                prev.includes(section.sectionTitle)
                                  ? prev.filter((s) => s !== section.sectionTitle)
                                  : [...prev, section.sectionTitle]
                              )
                            }
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "16px 0",
                              borderBottom: "1px solid var(--color-border)",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                          >
                            <h3
                                style={{
                                  fontSize: 16,
                                  fontWeight: 600,
                                  color: "var(--color-text-main)",
                                }}
                              >
                                {section.sectionTitle}
                              </h3>
                            <motion.div
                              animate={{ rotate: isExpanded ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight style={{ width: 20, height: 20, color: "var(--color-text-secondary)" }} />
                            </motion.div>
                          </motion.button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ overflow: "hidden" }}
                              >
                                <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                                  {section.items.map((item) => {
                                    const Icon = getActivityIcon(item.type);
                                    const badgeStyle = getActivityBadgeStyle(item.color);
                                    const isActivityExpanded = expandedActivityId === item.id;
                                    const fullContent = "fullContent" in item ? (item as { fullContent?: string }).fullContent : undefined;
                                    const detailContent = fullContent || item.desc;
                                    const isVideo = item.type.toLowerCase() === "video";
                                    return (
                                      <div
                                        key={item.id}
                                        style={{
                                          borderRadius: "var(--radius-card)",
                                          background: isActivityExpanded ? "var(--color-breeze)" : "transparent",
                                          border: isActivityExpanded ? "1px solid var(--color-border)" : "1px solid transparent",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <motion.div
                                          onClick={() => setExpandedActivityId((id) => (id === item.id ? null : item.id))}
                                          style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 12,
                                            padding: 16,
                                            cursor: "pointer",
                                          }}
                                          whileHover={{ backgroundColor: "var(--color-breeze)" }}
                                        >
                                          <motion.div
                                            animate={{ rotate: isActivityExpanded ? 90 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            style={{ flexShrink: 0, marginTop: 2 }}
                                          >
                                            <ChevronRight style={{ width: 20, height: 20, color: "var(--color-text-secondary)" }} />
                                          </motion.div>
                                          <div
                                            style={{
                                              padding: "6px 10px",
                                              borderRadius: 8,
                                              fontSize: 12,
                                              fontWeight: 600,
                                              display: "flex",
                                              alignItems: "center",
                                              gap: 6,
                                              flexShrink: 0,
                                              ...badgeStyle,
                                            }}
                                          >
                                            <Icon style={{ width: 14, height: 14 }} />
                                            {item.type}
                                          </div>
                                          <div style={{ flex: 1, minWidth: 0 }}>
                                            <h4
                                              style={{
                                                fontSize: 15,
                                                fontWeight: 600,
                                                color: "var(--color-text-main)",
                                                marginBottom: 4,
                                              }}
                                            >
                                              {item.title}
                                            </h4>
                                            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
                                              {item.desc}
                                            </p>
                                          </div>
                                        </motion.div>

                                        <AnimatePresence>
                                          {isActivityExpanded && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.3 }}
                                              style={{ overflow: "hidden" }}
                                            >
                                              <div
                                                style={{
                                                  padding: "0 16px 16px 48px",
                                                  borderTop: "1px solid var(--color-border)",
                                                }}
                                              >
                                                {isVideo && (
                                                  <div
                                                    style={{
                                                      aspectRatio: "16/9",
                                                      background: "var(--color-digi-sky)",
                                                      borderRadius: "var(--radius-card)",
                                                      marginBottom: 16,
                                                      display: "flex",
                                                      alignItems: "center",
                                                      justifyContent: "center",
                                                    }}
                                                  >
                                                    <motion.div
                                                      whileHover={{ scale: 1.1 }}
                                                      whileTap={{ scale: 0.95 }}
                                                      style={{
                                                        width: 64,
                                                        height: 64,
                                                        borderRadius: "50%",
                                                        background: "var(--color-primary)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                      }}
                                                    >
                                                      <Play style={{ width: 28, height: 28, color: "white", marginLeft: 4 }} fill="white" />
                                                    </motion.div>
                                                  </div>
                                                )}
                                                <p
                                                  style={{
                                                    fontSize: 14,
                                                    color: "var(--color-text-secondary)",
                                                    lineHeight: 1.6,
                                                    marginBottom: 16,
                                                  }}
                                                >
                                                  {detailContent}
                                                </p>
                                                <motion.button
                                                  whileHover={{ scale: 1.02 }}
                                                  whileTap={{ scale: 0.98 }}
                                                  className="btn-primary"
                                                  style={{
                                                    padding: "10px 20px",
                                                    borderRadius: "var(--radius-btn)",
                                                    border: "none",
                                                    background: "var(--color-primary)",
                                                    color: "white",
                                                    fontSize: 14,
                                                    fontWeight: 600,
                                                    cursor: "pointer",
                                                  }}
                                                >
                                                  Zobrazit podklady
                                                </motion.button>
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Diskuze */}
              <div
                style={{
                  background: "var(--color-background)",
                  borderRadius: "var(--radius-card)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 2px 8px var(--color-card-shadow)",
                  padding: 24,
                }}
              >
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--color-text-main)",
                    marginBottom: 20,
                  }}
                >
                  Diskuze k tomuto kurzu
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {((mockData as { discussionComments?: { id: number; author: string; time: string; text: string; repliesCount?: number; canEdit?: boolean }[] }).discussionComments ?? []).map((comment, commentIdx, arr) => (
                    <div
                      key={comment.id}
                      style={{
                        paddingBottom: 16,
                        borderBottom: commentIdx < arr.length - 1 ? "1px solid var(--color-border)" : "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-main)" }}>{comment.author}</span>
                            <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{comment.time}</span>
                          </div>
                          <p style={{ fontSize: 14, color: "var(--color-text-main)", lineHeight: 1.5 }}>{comment.text}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {comment.canEdit && <Pencil style={{ width: 16, height: 16, color: "var(--color-text-secondary)", cursor: "pointer" }} />}
                          {comment.repliesCount !== undefined && comment.repliesCount > 0 && (
                            <span style={{ fontSize: 12, color: "var(--color-primary)", display: "flex", alignItems: "center", gap: 4 }}>
                              <MessageCircle style={{ width: 14, height: 14 }} />
                              {comment.repliesCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary"
                onClick={() => router.push("/kurz/1")}
                style={{
                  padding: "12px 24px",
                  borderRadius: "var(--radius-btn)",
                  border: "none",
                  background: "var(--color-primary)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(37, 150, 255, 0.3)",
                }}
              >
                Uložit do portálu
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

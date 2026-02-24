"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import {
  getInitialData,
  getSections,
  type FormData,
  type SectionKey,
} from "./assessment-data";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import AssessmentSummary from "./AssessmentSummary";

type Phase = "chat" | "loading" | "report";
type ChatMessage = { role: "bot" | "user"; content: string };

const SECTION_KEYS: SectionKey[] = [
  "information",
  "communication",
  "content",
  "security",
  "problemsolving",
];

const QUESTION_KEYS = [
  "assessmentChatbot.question1",
  "assessmentChatbot.question2",
  "assessmentChatbot.question3",
  "assessmentChatbot.question4",
  "assessmentChatbot.question5",
  "assessmentChatbot.question6",
] as const;

const DEFAULT_ANSWER_KEYS = [
  "assessmentChatbot.defaultAnswer1",
  "assessmentChatbot.defaultAnswer2",
  "assessmentChatbot.defaultAnswer3",
  "assessmentChatbot.defaultAnswer4",
  "assessmentChatbot.defaultAnswer5",
  "assessmentChatbot.defaultAnswer6",
] as const;

function extractScore(text: string): number {
  const match = text.match(/\b([1-9]|10)\b/);
  if (match) {
    return Math.min(10, Math.max(1, parseInt(match[1], 10)));
  }
  return 6;
}

export default function AssessmentChatbot() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const SECTIONS = getSections(language);
  const INITIAL_DATA = getInitialData(language);

  const buildFormDataFromAnswers = (answers: number[]): FormData => {
    const data = { ...INITIAL_DATA };
    const sectionScores = answers.slice(0, 5);
    const aiScore = answers[5] ?? 6;

    SECTION_KEYS.forEach((key, i) => {
      const score = sectionScores[i] ?? 6;
      data[key] = {
        ...data[key],
        q1: score,
        q2: score,
      };
    });
    data.ai = { ...data.ai, score: aiScore };
    return data;
  };

  const [phase, setPhase] = useState<Phase>("chat");
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { role: "bot", content: t("assessmentChatbot.intro") },
    { role: "bot", content: t(QUESTION_KEYS[0]) },
  ]);
  const [inputValue, setInputValue] = useState(() => t(DEFAULT_ANSWER_KEYS[0]));
  const [answers, setAnswers] = useState<number[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInputValue("");

    const score = extractScore(trimmed);
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentStep < QUESTION_KEYS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: t(QUESTION_KEYS[nextStep]) },
      ]);
      setInputValue(t(DEFAULT_ANSWER_KEYS[nextStep]));
    } else {
      setPhase("loading");
      const derivedData = buildFormDataFromAnswers(newAnswers);
      setFormData(derivedData);
      window.setTimeout(() => {
        setPhase("report");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 800);
    }
  };

  const handleMicClick = () => {
    if (isRecording) return;
    setIsRecording(true);
    setTimeout(() => {
      setInputValue(t("assessmentChatbot.fakeTranscript"));
      setIsRecording(false);
    }, 1500);
  };

  const currentQuestion = currentStep < QUESTION_KEYS.length ? t(QUESTION_KEYS[currentStep]) : null;
  const isReport = phase === "report";
  const isLoading = phase === "loading";

  if (isReport && formData) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--color-breeze)",
          padding: "24px 20px",
        }}
      >
        <div style={{ maxWidth: 1020, margin: "0 auto" }}>
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
              {t("assessment.title")}
            </h1>
            <p style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
              {t("assessment.evaluationReport")}
            </p>
          </div>
          <AssessmentSummary formData={formData} SECTIONS={SECTIONS} />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-breeze)",
        padding: "24px 20px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
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
            {t("assessment.title")}
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
            {t("assessmentChatbot.chatbotSubtitle")}
          </p>
        </div>

        <div
          style={{
            background: "var(--color-background)",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 2px 8px var(--color-card-shadow)",
            padding: "24px 20px",
            overflow: "hidden",
          }}
        >
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: "grid",
                placeItems: "center",
                padding: "48px 0",
                gap: 10,
              }}
            >
              <div className="ds-spinner" aria-label={t("assessment.loading")} />
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontWeight: 700,
                    marginBottom: 4,
                    color: "var(--color-text-main)",
                    fontSize: 14,
                  }}
                >
                  {t("assessment.form.evaluating")}
                </div>
                <div style={{ color: "var(--color-text-secondary)", fontSize: 12 }}>
                  {t("assessment.form.justAMoment")}
                </div>
              </div>
            </motion.div>
          )}

          {!isLoading && (
            <>
              <div
                style={{
                  maxHeight: 400,
                  overflowY: "auto",
                  marginBottom: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: "flex",
                      justifyContent: msg.role === "bot" ? "flex-start" : "flex-end",
                      alignItems: "flex-end",
                      gap: 8,
                    }}
                  >
                    {msg.role === "bot" && (
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "var(--radius-btn)",
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "rgba(37, 150, 255, 0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          src="/Screenshots/Symbol Dark.png"
                          alt=""
                          width={22}
                          height={22}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    )}
                    <div
                      style={{
                        maxWidth: "85%",
                        padding: "12px 16px",
                        borderRadius:
                          msg.role === "bot"
                            ? "4px 16px 16px 16px"
                            : "16px 4px 16px 16px",
                        background:
                          msg.role === "bot"
                            ? "rgba(37, 150, 255, 0.08)"
                            : "var(--color-primary)",
                        color:
                          msg.role === "bot"
                            ? "var(--color-text-main)"
                            : "white",
                        fontSize: 14,
                        lineHeight: 1.5,
                      }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {currentQuestion && (
                <div
                  style={{
                    borderTop: "1px solid var(--color-border)",
                    paddingTop: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-end",
                    }}
                  >
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend(inputValue);
                        }
                      }}
                      placeholder={t("assessmentChatbot.placeholder")}
                      rows={2}
                      style={{
                        flex: 1,
                        padding: "12px 14px",
                        borderRadius: "var(--radius-input)",
                        border: "1px solid var(--color-border)",
                        fontSize: 14,
                        color: "var(--color-text-main)",
                        resize: "none",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleMicClick}
                      disabled={isRecording}
                      style={{
                        width: 44,
                        height: 44,
                        flexShrink: 0,
                        borderRadius: "var(--radius-btn)",
                        border: "none",
                        background: isRecording
                          ? "var(--color-accent-orange)"
                          : "rgba(37, 150, 255, 0.12)",
                        color: isRecording
                          ? "white"
                          : "var(--color-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: isRecording ? "not-allowed" : "pointer",
                      }}
                      aria-label={isRecording ? t("assessmentChatbot.recording") : t("assessmentChatbot.recordVoice")}
                    >
                      <Mic size={20} strokeWidth={2} />
                    </motion.button>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSend(inputValue)}
                    disabled={!inputValue.trim()}
                    style={{
                      marginTop: 12,
                      padding: "10px 20px",
                      borderRadius: "var(--radius-btn)",
                      border: "none",
                      background: inputValue.trim()
                        ? "var(--color-primary)"
                        : "var(--color-border)",
                      color: inputValue.trim()
                        ? "white"
                        : "var(--color-text-secondary)",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: inputValue.trim() ? "pointer" : "not-allowed",
                    }}
                  >
                    {t("assessmentChatbot.send")}
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

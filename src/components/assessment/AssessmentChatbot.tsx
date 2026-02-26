"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Upload, Send, ImageIcon } from "lucide-react";
import {
  ASSESSMENT_STEPS,
  isVisualTaskStep,
  type AssessmentStepVisualTask,
} from "./assessment-flow";
import {
  getInitialData,
  getSections,
  type FormData,
  type SectionKey,
} from "./assessment-data";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import AssessmentSummary from "./AssessmentSummary";
import { MarkdownFeedback } from "./MarkdownFeedback";

type Phase = "chat" | "loading" | "report";
type ChatMessage = {
  role: "bot" | "user";
  content: string;
  imageUrl?: string;
  taskFeedback?: string;
};

const SECTION_KEYS: SectionKey[] = [
  "information",
  "communication",
  "content",
  "security",
  "problemsolving",
];

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

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
    const sectionScores: Record<SectionKey, number> = {
      information: 6,
      communication: 6,
      content: 6,
      security: 6,
      problemsolving: 6,
    };
    let aiScore = 6;

    const stepToSection: (SectionKey | "ai")[] = [
      "information",
      "communication",
      "communication",
      "content",
      "security",
      "problemsolving",
      "ai",
    ];

    ASSESSMENT_STEPS.forEach((step, i) => {
      const score = answers[i] ?? 6;
      const section = step.type === "visual_task" ? step.sectionKey : stepToSection[i];
      if (section === "ai") {
        aiScore = score;
      } else {
        sectionScores[section] = score;
      }
    });

    SECTION_KEYS.forEach((key) => {
      const s = sectionScores[key];
      data[key] = { ...data[key], q1: s, q2: s };
    });
    data.ai = { ...data.ai, score: aiScore };
    return data;
  };

  const [phase, setPhase] = useState<Phase>("chat");
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const firstStep = ASSESSMENT_STEPS[0];
    const firstContent =
      firstStep?.type === "question"
        ? t(firstStep.questionKey)
        : t((firstStep as AssessmentStepVisualTask).instructionKey);
    return [
      { role: "bot", content: t("assessmentChatbot.intro") },
      { role: "bot", content: firstContent },
    ];
  });
  const [inputValue, setInputValue] = useState(() => {
    const first = ASSESSMENT_STEPS[0];
    return first?.type === "question" ? t(first.defaultAnswerKey) : "";
  });
  const [answers, setAnswers] = useState<number[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzingVisual, setIsAnalyzingVisual] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentStepData = ASSESSMENT_STEPS[currentStep];
  const isVisualTask = currentStepData && isVisualTaskStep(currentStepData);

  const advanceToNextStep = (newAnswers: number[]) => {
    if (currentStep >= ASSESSMENT_STEPS.length - 1) {
      setPhase("loading");
      setFormData(buildFormDataFromAnswers(newAnswers));
      window.setTimeout(() => {
        setPhase("report");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 800);
      return;
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    const nextStepData = ASSESSMENT_STEPS[nextStep];
    const nextContent =
      nextStepData?.type === "question"
        ? t(nextStepData.questionKey)
        : t((nextStepData as AssessmentStepVisualTask).instructionKey);

    setMessages((prev) => [...prev, { role: "bot", content: nextContent }]);
    setInputValue(
      nextStepData?.type === "question" ? t(nextStepData.defaultAnswerKey) : ""
    );
    setSelectedImage(null);
  };

  const handleSend = (text: string) => {
    if (isVisualTask) return;
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInputValue("");

    const score = extractScore(trimmed);
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    advanceToNextStep(newAnswers);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleImageSubmit = () => {
    if (!selectedImage || !isVisualTask || !currentStepData) return;

    const DEMO_SCORE = 7;

    setIsAnalyzingVisual(true);
    setMessages((prev) => [...prev, { role: "user", content: "", imageUrl: selectedImage }]);

    window.setTimeout(() => {
      const newAnswers = [...answers, DEMO_SCORE];
      setAnswers(newAnswers);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "",
          taskFeedback: t("assessmentChatbot.visualTask.demoFeedback"),
        },
      ]);
      setSelectedImage(null);
      setIsAnalyzingVisual(false);
      advanceToNextStep(newAnswers);
    }, 2500);
  };

  const handleMicClick = () => {
    if (isRecording || isVisualTask) return;
    setIsRecording(true);
    setTimeout(() => {
      setInputValue(t("assessmentChatbot.fakeTranscript"));
      setIsRecording(false);
    }, 1500);
  };

  const isReport = phase === "report";
  const isLoading = phase === "loading";
  const showInput = !isLoading && currentStepData;

  const progressPercent = ((currentStep + 1) / ASSESSMENT_STEPS.length) * 100;

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
        padding: "32px 20px",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Dark Hero Header */}
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
                DigComp 2.1 Assessment
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 6px", fontStyle: "italic" }}>
                {t("assessment.title")}
              </h1>
              <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>
                {t("assessmentChatbot.chatbotSubtitle")}
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
                src="/Screenshots/Symbol Dark.png"
                alt=""
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.9 }}>
                {t("assessmentChatbot.questionProgress", { current: currentStep + 1, total: ASSESSMENT_STEPS.length })}
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
        </motion.div>

        {/* Main Chat Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: "var(--color-background)",
            borderRadius: 16,
            border: "1px solid var(--color-border)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
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
                  {t("assessment.form.evaluating")}
                </div>
                <div style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
                  {t("assessment.form.justAMoment")}
                </div>
              </div>
            </motion.div>
          )}

          {!isLoading && (
            <>
              {/* Chat Messages Area */}
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
                <AnimatePresence>
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
                            src="/Screenshots/Symbol Dark.png"
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
                        {msg.taskFeedback ? (
                          <MarkdownFeedback text={msg.taskFeedback} />
                        ) : (
                          <MarkdownFeedback text={msg.content} />
                        )}
                      </motion.div>
                      {msg.role === "user" && msg.imageUrl && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={HOVER_TRANSITION}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 12,
                            overflow: "hidden",
                            flexShrink: 0,
                            border: "2px solid var(--color-primary)",
                            boxShadow: "0 4px 12px rgba(37, 150, 255, 0.2)",
                          }}
                        >
                          <img
                            src={msg.imageUrl}
                            alt="Screenshot"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isAnalyzingVisual && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 18px",
                      background: "linear-gradient(135deg, rgba(37, 150, 255, 0.08) 0%, rgba(119, 249, 217, 0.05) 100%)",
                      borderRadius: "4px 18px 18px 18px",
                      maxWidth: "75%",
                      border: "1px solid rgba(37, 150, 255, 0.12)",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: "2px solid var(--color-border)",
                        borderTopColor: "var(--color-primary)",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>
                      {t("assessmentChatbot.visualTask.analyzing")}
                    </span>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              {showInput && (
                <div
                  style={{
                    borderTop: "1px solid var(--color-border)",
                    padding: "20px 24px",
                    background: "var(--color-breeze)",
                  }}
                >
                  {isVisualTask ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        style={{ display: "none" }}
                      />
                      
                      {!selectedImage ? (
                        <motion.div
                          whileHover={{ scale: 1.01, borderColor: "var(--color-primary)" }}
                          whileTap={{ scale: 0.99 }}
                          transition={HOVER_TRANSITION}
                          onClick={() => fileInputRef.current?.click()}
                          style={{
                            padding: "32px 24px",
                            borderRadius: 12,
                            border: "2px dashed var(--color-border)",
                            background: "var(--color-background)",
                            cursor: "pointer",
                            textAlign: "center",
                          }}
                        >
                          <motion.div
                            whileHover={{ y: -4 }}
                            transition={HOVER_TRANSITION}
                            style={{
                              width: 56,
                              height: 56,
                              borderRadius: 14,
                              background: "linear-gradient(135deg, rgba(37, 150, 255, 0.15) 0%, rgba(119, 249, 217, 0.1) 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "0 auto 12px",
                            }}
                          >
                            <Upload size={24} color="var(--color-primary)" strokeWidth={2} />
                          </motion.div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-main)", marginBottom: 4 }}>
                            {t("assessmentChatbot.visualTask.uploadHint")}
                          </div>
                          <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                            PNG, JPG nebo GIF
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          style={{
                            display: "flex",
                            gap: 16,
                            alignItems: "center",
                            padding: 16,
                            borderRadius: 12,
                            background: "var(--color-background)",
                            border: "1px solid var(--color-border)",
                          }}
                        >
                          <div
                            style={{
                              width: 100,
                              height: 75,
                              borderRadius: 8,
                              overflow: "hidden",
                              border: "2px solid var(--color-primary)",
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="Preview"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-main)", marginBottom: 4 }}>
                              {t("assessmentChatbot.visualTask.imageReady")}
                            </div>
                            <motion.button
                              type="button"
                              whileHover={{ color: "var(--color-primary-hover)" }}
                              onClick={() => fileInputRef.current?.click()}
                              style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                fontSize: 13,
                                color: "var(--color-primary)",
                                cursor: "pointer",
                                fontWeight: 500,
                              }}
                            >
                              {t("assessmentChatbot.visualTask.changeImage")}
                            </motion.button>
                          </div>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.35)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleImageSubmit}
                            disabled={isAnalyzingVisual}
                            style={{
                              padding: "12px 24px",
                              borderRadius: 10,
                              border: "none",
                              background: "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)",
                              color: "white",
                              fontSize: 14,
                              fontWeight: 700,
                              cursor: isAnalyzingVisual ? "not-allowed" : "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              boxShadow: "0 4px 16px rgba(37, 150, 255, 0.3)",
                              opacity: isAnalyzingVisual ? 0.7 : 1,
                            }}
                          >
                            <Send size={16} strokeWidth={2.5} />
                            {t("assessmentChatbot.send")}
                          </motion.button>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                      <div
                        style={{
                          flex: 1,
                          position: "relative",
                          background: "var(--color-background)",
                          borderRadius: 12,
                          border: "1px solid var(--color-border)",
                          overflow: "hidden",
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
                            width: "100%",
                            padding: "14px 16px",
                            paddingRight: 56,
                            border: "none",
                            fontSize: 15,
                            color: "var(--color-text-main)",
                            resize: "none",
                            boxSizing: "border-box",
                            fontFamily: "inherit",
                            background: "transparent",
                            outline: "none",
                          }}
                        />
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1, background: isRecording ? "var(--color-accent-orange)" : "rgba(37, 150, 255, 0.2)" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleMicClick}
                          disabled={isRecording}
                          style={{
                            position: "absolute",
                            right: 10,
                            bottom: 10,
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            border: "none",
                            background: isRecording ? "var(--color-accent-orange)" : "rgba(37, 150, 255, 0.12)",
                            color: isRecording ? "white" : "var(--color-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: isRecording ? "not-allowed" : "pointer",
                          }}
                          aria-label={
                            isRecording
                              ? t("assessmentChatbot.recording")
                              : t("assessmentChatbot.recordVoice")
                          }
                        >
                          <Mic size={18} strokeWidth={2} />
                        </motion.button>
                      </div>
                      <motion.button
                        type="button"
                        whileHover={inputValue.trim() ? { scale: 1.03, boxShadow: "0 6px 20px rgba(37, 150, 255, 0.35)" } : {}}
                        whileTap={inputValue.trim() ? { scale: 0.98 } : {}}
                        onClick={() => handleSend(inputValue)}
                        disabled={!inputValue.trim()}
                        style={{
                          padding: "14px 24px",
                          borderRadius: 12,
                          border: "none",
                          background: inputValue.trim()
                            ? "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)"
                            : "var(--color-border)",
                          color: inputValue.trim() ? "white" : "var(--color-text-secondary)",
                          fontSize: 15,
                          fontWeight: 700,
                          cursor: inputValue.trim() ? "pointer" : "not-allowed",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          boxShadow: inputValue.trim() ? "0 4px 16px rgba(37, 150, 255, 0.3)" : "none",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Send size={18} strokeWidth={2.5} />
                        {t("assessmentChatbot.send")}
                      </motion.button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

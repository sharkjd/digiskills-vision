"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageCircle,
  Heart,
  Briefcase,
  Target,
  RotateCcw,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

type ChatMessage = {
  role: "bot" | "user";
  content: string;
};

type ReflexeStep = {
  questionKey: string;
  defaultAnswerKey: string;
  icon: React.ReactNode;
};

const REFLEXE_STEPS: ReflexeStep[] = [
  {
    questionKey: "reflexeChatbot.q1",
    defaultAnswerKey: "reflexeChatbot.a1",
    icon: <Briefcase size={16} />,
  },
  {
    questionKey: "reflexeChatbot.q2",
    defaultAnswerKey: "reflexeChatbot.a2",
    icon: <Heart size={16} />,
  },
  {
    questionKey: "reflexeChatbot.q3",
    defaultAnswerKey: "reflexeChatbot.a3",
    icon: <MessageCircle size={16} />,
  },
  {
    questionKey: "reflexeChatbot.q4",
    defaultAnswerKey: "reflexeChatbot.a4",
    icon: <Target size={16} />,
  },
];

type UserAnswers = {
  style: string;
  empathy: string;
  situation: string;
  improve: string;
};

export function ReflexeChatbot() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { role: "bot", content: t("reflexeChatbot.intro") },
    { role: "bot", content: t(REFLEXE_STEPS[0].questionKey) },
  ]);
  const [inputValue, setInputValue] = useState(() =>
    t(REFLEXE_STEPS[0].defaultAnswerKey)
  );
  const [answers, setAnswers] = useState<Partial<UserAnswers>>({});
  const [isComplete, setIsComplete] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isComplete) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInputValue("");

    const answerKeys: (keyof UserAnswers)[] = [
      "style",
      "empathy",
      "situation",
      "improve",
    ];
    const newAnswers = { ...answers, [answerKeys[currentStep]]: trimmed };
    setAnswers(newAnswers);

    if (currentStep >= REFLEXE_STEPS.length - 1) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: t("reflexeChatbot.complete") },
        ]);
        setIsComplete(true);
      }, 500);
      return;
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: t(REFLEXE_STEPS[nextStep].questionKey) },
      ]);
      setInputValue(t(REFLEXE_STEPS[nextStep].defaultAnswerKey));
    }, 400);
  };

  const progressPercent =
    ((currentStep + (isComplete ? 1 : 0)) / REFLEXE_STEPS.length) * 100;

  const handleReset = () => {
    setMessages([
      { role: "bot", content: t("reflexeChatbot.intro") },
      { role: "bot", content: t(REFLEXE_STEPS[0].questionKey) },
    ]);
    setCurrentStep(0);
    setInputValue(t(REFLEXE_STEPS[0].defaultAnswerKey));
    setAnswers({});
    setIsComplete(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--tv-border)",
        marginTop: 16,
      }}
    >
      <div style={{ padding: "20px 0 0" }}>
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: 12,
                border: "1px solid var(--tv-border)",
                overflow: "hidden",
                backgroundColor: "var(--tv-background)",
                padding: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "var(--tv-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <Heart size={22} />
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--tv-text-main)",
                      margin: 0,
                    }}
                  >
                    {t("reflexeChatbot.yourReflexe")}
                  </h4>
                  <span
                    style={{
                      fontSize: 13,
                      color: "var(--tv-text-secondary)",
                    }}
                  >
                    {t("reflexeChatbot.summarySubtitle")}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <ReflexeSummaryItem
                  icon={<Briefcase size={14} />}
                  label={t("reflexeChatbot.summaryStyle")}
                  value={answers.style || ""}
                />
                <ReflexeSummaryItem
                  icon={<Heart size={14} />}
                  label={t("reflexeChatbot.summaryEmpathy")}
                  value={answers.empathy || ""}
                />
                <ReflexeSummaryItem
                  icon={<MessageCircle size={14} />}
                  label={t("reflexeChatbot.summarySituation")}
                  value={answers.situation || ""}
                />
                <ReflexeSummaryItem
                  icon={<Target size={14} />}
                  label={t("reflexeChatbot.summaryImprove")}
                  value={answers.improve || ""}
                />
              </div>

              <motion.button
                type="button"
                onClick={handleReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: 24,
                  padding: "12px 20px",
                  borderRadius: 10,
                  border: "1px solid var(--tv-primary)",
                  background: "transparent",
                  color: "var(--tv-primary)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <RotateCcw size={16} />
                {t("reflexeChatbot.reflexeAgain")}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="chatbot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: 12,
                border: "1px solid var(--tv-border)",
                overflow: "hidden",
                backgroundColor: "var(--tv-background)",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  background:
                    "linear-gradient(90deg, var(--tv-primary) 0%, var(--tv-secondary) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <MessageCircle size={18} />
                  </div>
                  <span
                    style={{
                      color: "white",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {t("reflexeChatbot.title")}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: 12,
                    }}
                  >
                    {currentStep + 1}/{REFLEXE_STEPS.length}
                  </span>
                  <div
                    style={{
                      width: 60,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.3)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.3 }}
                      style={{
                        height: "100%",
                        background: "white",
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                ref={messagesContainerRef}
                style={{
                  maxHeight: 280,
                  overflowY: "auto",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  backgroundColor: "var(--tv-background-light)",
                }}
              >
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      style={{
                        display: "flex",
                        justifyContent:
                          msg.role === "bot" ? "flex-start" : "flex-end",
                        alignItems: "flex-start",
                        gap: 8,
                      }}
                    >
                      {msg.role === "bot" && (
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background:
                              "linear-gradient(90deg, var(--tv-primary) 0%, var(--tv-secondary) 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            color: "white",
                          }}
                        >
                          <MessageCircle size={14} />
                        </div>
                      )}
                      <div
                        style={{
                          maxWidth: "80%",
                          padding: "10px 14px",
                          borderRadius:
                            msg.role === "bot"
                              ? "4px 14px 14px 14px"
                              : "14px 4px 14px 14px",
                          background:
                            msg.role === "bot"
                              ? "var(--tv-background)"
                              : "linear-gradient(90deg, var(--tv-primary) 0%, var(--tv-secondary) 100%)",
                          color:
                            msg.role === "bot"
                              ? "var(--tv-text-main)"
                              : "white",
                          fontSize: 14,
                          lineHeight: 1.5,
                          border:
                            msg.role === "bot"
                              ? "1px solid var(--tv-border)"
                              : "none",
                          boxShadow:
                            msg.role === "bot"
                              ? "0 1px 3px var(--tv-card-shadow)"
                              : "0 2px 8px rgba(122, 193, 67, 0.25)",
                        }}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--tv-border)",
                  padding: 12,
                  backgroundColor: "var(--tv-background)",
                }}
              >
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSend(inputValue);
                      }
                    }}
                    placeholder={t("reflexeChatbot.placeholder")}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid var(--tv-border)",
                      fontSize: 14,
                      color: "var(--tv-text-main)",
                      backgroundColor: "var(--tv-background-light)",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                  <motion.button
                    type="button"
                    whileHover={inputValue.trim() ? { scale: 1.05 } : {}}
                    whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                    onClick={() => handleSend(inputValue)}
                    disabled={!inputValue.trim()}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 10,
                      border: "none",
                      background: inputValue.trim()
                        ? "linear-gradient(90deg, var(--tv-primary) 0%, var(--tv-secondary) 100%)"
                        : "var(--tv-border)",
                      color: inputValue.trim()
                        ? "white"
                        : "var(--tv-text-secondary)",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: inputValue.trim() ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      boxShadow: inputValue.trim()
                        ? "0 2px 8px rgba(122, 193, 67, 0.25)"
                        : "none",
                    }}
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--tv-text-secondary)",
                    margin: "8px 0 0",
                    textAlign: "center",
                  }}
                >
                  {t("reflexeChatbot.hint")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ReflexeSummaryItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          backgroundColor: "rgba(122, 193, 67, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--tv-primary)",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <span
          style={{
            fontSize: 11,
            color: "var(--tv-text-secondary)",
            display: "block",
            marginBottom: 2,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--tv-text-main)",
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Target, Clock, BookOpen, Zap, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import { asset } from "@/lib/paths";

type ChatMessage = {
  role: "bot" | "user";
  content: string;
};

type GoalStep = {
  questionKey: string;
  defaultAnswerKey: string;
  icon: React.ReactNode;
};

const GOAL_STEPS: GoalStep[] = [
  {
    questionKey: "goalChatbot.q1",
    defaultAnswerKey: "goalChatbot.a1",
    icon: <Target size={16} />,
  },
  {
    questionKey: "goalChatbot.q2",
    defaultAnswerKey: "goalChatbot.a2",
    icon: <Clock size={16} />,
  },
  {
    questionKey: "goalChatbot.q3",
    defaultAnswerKey: "goalChatbot.a3",
    icon: <Zap size={16} />,
  },
  {
    questionKey: "goalChatbot.q4",
    defaultAnswerKey: "goalChatbot.a4",
    icon: <BookOpen size={16} />,
  },
  {
    questionKey: "goalChatbot.q5",
    defaultAnswerKey: "goalChatbot.a5",
    icon: <Sparkles size={16} />,
  },
];

type UserAnswers = {
  area: string;
  time: string;
  challenge: string;
  style: string;
  goal: string;
};

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

export function GoalChatbot() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { role: "bot", content: t("goalChatbot.intro") },
    { role: "bot", content: t(GOAL_STEPS[0].questionKey) },
  ]);
  const [inputValue, setInputValue] = useState(() => t(GOAL_STEPS[0].defaultAnswerKey));
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

    const answerKeys: (keyof UserAnswers)[] = ["area", "time", "challenge", "style", "goal"];
    const newAnswers = { ...answers, [answerKeys[currentStep]]: trimmed };
    setAnswers(newAnswers);

    if (currentStep >= GOAL_STEPS.length - 1) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: t("goalChatbot.complete") },
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
        { role: "bot", content: t(GOAL_STEPS[nextStep].questionKey) },
      ]);
      setInputValue(t(GOAL_STEPS[nextStep].defaultAnswerKey));
    }, 400);
  };

  const progressPercent = ((currentStep + (isComplete ? 1 : 0)) / GOAL_STEPS.length) * 100;

  const handleReset = () => {
    setMessages([
      { role: "bot", content: t("goalChatbot.intro") },
      { role: "bot", content: t(GOAL_STEPS[0].questionKey) },
    ]);
    setCurrentStep(0);
    setInputValue(t(GOAL_STEPS[0].defaultAnswerKey));
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
        borderTop: "1px solid var(--color-border)",
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
                border: "1px solid var(--color-border)",
                overflow: "hidden",
                backgroundColor: "var(--color-background)",
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
                    background: "#77F9D9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Target size={22} color="#040E3C" />
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--color-text-main)",
                      margin: 0,
                    }}
                  >
                    {t("goalChatbot.yourGoal")}
                  </h4>
                  <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                    {t("goalChatbot.next30days")}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <GoalSummaryItem
                  icon={<Target size={14} />}
                  label={t("goalChatbot.summaryArea")}
                  value={answers.area || ""}
                />
                <GoalSummaryItem
                  icon={<Clock size={14} />}
                  label={t("goalChatbot.summaryTime")}
                  value={answers.time || ""}
                />
                <GoalSummaryItem
                  icon={<Zap size={14} />}
                  label={t("goalChatbot.summaryChallenge")}
                  value={answers.challenge || ""}
                />
                <GoalSummaryItem
                  icon={<BookOpen size={14} />}
                  label={t("goalChatbot.summaryStyle")}
                  value={answers.style || ""}
                />

                <div
                  style={{
                    marginTop: 4,
                    padding: 20,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, rgba(119, 249, 217, 0.15) 0%, rgba(37, 150, 255, 0.08) 100%)",
                    border: "2px solid #77F9D9",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <Sparkles size={18} color="var(--color-primary)" />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--color-primary)",
                      }}
                    >
                      {t("goalChatbot.summaryGoal")}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--color-text-main)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    "{answers.goal}"
                  </p>
                </div>
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
                  border: "1px solid var(--color-primary)",
                  background: "transparent",
                  color: "var(--color-primary)",
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
                {t("goalChatbot.defineAgain")}
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
                border: "1px solid var(--color-border)",
                overflow: "hidden",
                backgroundColor: "var(--color-background)",
              }}
            >
              {/* Mini header s progress */}
              <div
                style={{
                  padding: "12px 16px",
                  background: "linear-gradient(135deg, #040E3C 0%, #0a1854 100%)",
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
                      background: "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={asset("/Screenshots/Symbol Dark.png")}
                      alt=""
                      width={20}
                      height={20}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <span style={{ color: "white", fontSize: 14, fontWeight: 600 }}>
                    {t("goalChatbot.title")}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
                    {currentStep + 1}/{GOAL_STEPS.length}
                  </span>
                  <div
                    style={{
                      width: 60,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.3 }}
                      style={{
                        height: "100%",
                        background: "linear-gradient(90deg, #2596FF, #77F9D9)",
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Chat zprávy */}
              <div
                ref={messagesContainerRef}
                style={{
                  maxHeight: 280,
                  overflowY: "auto",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  backgroundColor: "var(--color-breeze)",
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
                        justifyContent: msg.role === "bot" ? "flex-start" : "flex-end",
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
                            background: "linear-gradient(135deg, #2596FF 0%, #77F9D9 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={asset("/Screenshots/Symbol Dark.png")}
                            alt=""
                            width={18}
                            height={18}
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                      )}
                      <div
                        style={{
                          maxWidth: "80%",
                          padding: "10px 14px",
                          borderRadius: msg.role === "bot" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                          background:
                            msg.role === "bot"
                              ? "var(--color-background)"
                              : "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)",
                          color: msg.role === "bot" ? "var(--color-text-main)" : "white",
                          fontSize: 14,
                          lineHeight: 1.5,
                          border: msg.role === "bot" ? "1px solid var(--color-border)" : "none",
                          boxShadow:
                            msg.role === "bot"
                              ? "0 1px 3px rgba(0,0,0,0.05)"
                              : "0 2px 8px rgba(37, 150, 255, 0.25)",
                        }}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Input area */}
              <div
                style={{
                  borderTop: "1px solid var(--color-border)",
                  padding: 12,
                  backgroundColor: "var(--color-background)",
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
                    placeholder={t("goalChatbot.placeholder")}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1px solid var(--color-border)",
                      fontSize: 14,
                      color: "var(--color-text-main)",
                      backgroundColor: "var(--color-breeze)",
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
                        ? "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)"
                        : "var(--color-border)",
                      color: inputValue.trim() ? "white" : "var(--color-text-secondary)",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: inputValue.trim() ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      boxShadow: inputValue.trim() ? "0 2px 8px rgba(37, 150, 255, 0.25)" : "none",
                    }}
                  >
                    <Send size={16} />
                  </motion.button>
                </div>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--color-text-secondary)",
                    margin: "8px 0 0",
                    textAlign: "center",
                  }}
                >
                  {t("goalChatbot.hint")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function GoalSummaryItem({
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
          backgroundColor: "rgba(37, 150, 255, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-primary)",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <span
          style={{
            fontSize: 11,
            color: "var(--color-text-secondary)",
            display: "block",
            marginBottom: 2,
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-main)" }}>
          {value}
        </span>
      </div>
    </div>
  );
}

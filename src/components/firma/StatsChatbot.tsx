"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

type ChatMessage = {
  role: "bot" | "user";
  content: string;
};

const SUGGESTED_QUESTION_KEYS = [
  "statsChatbot.suggestedQ1",
  "statsChatbot.suggestedQ2",
  "statsChatbot.suggestedQ3",
  "statsChatbot.suggestedQ4",
] as const;

const PREDEFINED_ANSWER_KEYS = [
  "statsChatbot.predefinedAnswer1",
  "statsChatbot.predefinedAnswer2",
  "statsChatbot.predefinedAnswer3",
  "statsChatbot.predefinedAnswer4",
] as const;

export default function StatsChatbot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      content: t("statsChatbot.intro"),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let answer = t("statsChatbot.defaultAnswer");
      const idx = SUGGESTED_QUESTION_KEYS.findIndex((key) => t(key) === trimmed);
      if (idx >= 0) {
        answer = t(PREDEFINED_ANSWER_KEYS[idx]);
      }
      setMessages((prev) => [...prev, { role: "bot", content: answer }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      {/* FAB tlačítko */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, boxShadow: "0 8px 30px rgba(255, 117, 117, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--color-digi-salmon) 0%, #e85555 100%)",
              border: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(255, 117, 117, 0.3)",
              zIndex: 1000,
            }}
          >
            <MessageCircle size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat okno */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              width: 420,
              height: 580,
              background: "var(--color-background)",
              borderRadius: 16,
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 1000,
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg, var(--color-digi-salmon) 0%, #e85555 100%)",
                padding: "20px 20px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MessageCircle size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{t("statsChatbot.headerTitle")}</div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>{t("statsChatbot.headerSubtitle")}</div>
                </div>
              </div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                background: "var(--color-breeze)",
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "bot" ? "flex-start" : "flex-end",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: "14px 16px",
                      borderRadius:
                        msg.role === "bot" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                      background:
                        msg.role === "bot"
                          ? "var(--color-background)"
                          : "linear-gradient(135deg, var(--color-digi-salmon) 0%, #e85555 100%)",
                      color: msg.role === "bot" ? "var(--color-text-main)" : "white",
                      fontSize: 14,
                      lineHeight: 1.6,
                      boxShadow:
                        msg.role === "bot"
                          ? "0 2px 8px rgba(0,0,0,0.06)"
                          : "0 4px 12px rgba(255, 117, 117, 0.25)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.content.split("**").map((part, idx) =>
                      idx % 2 === 1 ? (
                        <strong key={idx}>{part}</strong>
                      ) : (
                        <span key={idx}>{part}</span>
                      )
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      padding: "14px 18px",
                      borderRadius: "4px 16px 16px 16px",
                      background: "var(--color-background)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--color-digi-salmon)",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions */}
            {messages.length <= 2 && !isTyping && (
              <div
                style={{
                  padding: "12px 16px",
                  borderTop: "1px solid var(--color-border)",
                  background: "var(--color-background)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--color-text-secondary)",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t("statsChatbot.suggestedQuestions")}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {SUGGESTED_QUESTION_KEYS.map((key) => (
                    <motion.button
                      key={key}
                      type="button"
                      whileHover={{
                        x: 4,
                        background: "rgba(255, 117, 117, 0.08)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestedQuestion(t(key))}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 12px",
                        borderRadius: 8,
                        border: "1px solid var(--color-border)",
                        background: "var(--color-breeze)",
                        cursor: "pointer",
                        textAlign: "left",
                        fontSize: 13,
                        color: "var(--color-text-main)",
                        fontWeight: 500,
                      }}
                    >
                      <span>{t(key)}</span>
                      <ChevronRight size={16} color="var(--color-text-secondary)" />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div
              style={{
                padding: "16px",
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-background)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(inputValue);
                    }
                  }}
                  placeholder={t("statsChatbot.placeholder")}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: "1px solid var(--color-border)",
                    fontSize: 14,
                    color: "var(--color-text-main)",
                    background: "var(--color-breeze)",
                    outline: "none",
                  }}
                />
                <motion.button
                  type="button"
                  whileHover={
                    inputValue.trim()
                      ? { scale: 1.05, boxShadow: "0 4px 16px rgba(255, 117, 117, 0.3)" }
                      : {}
                  }
                  whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    border: "none",
                    background:
                      inputValue.trim() && !isTyping
                        ? "linear-gradient(135deg, var(--color-digi-salmon) 0%, #e85555 100%)"
                        : "var(--color-border)",
                    color: inputValue.trim() && !isTyping ? "white" : "var(--color-text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: inputValue.trim() && !isTyping ? "pointer" : "not-allowed",
                    flexShrink: 0,
                  }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

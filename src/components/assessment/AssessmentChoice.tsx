"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, MessageCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import AssessmentForm from "./AssessmentForm";
import AssessmentChatbot from "./AssessmentChatbot";

type Mode = null | "form" | "chatbot";

export default function AssessmentChoice() {
  const [mode, setMode] = useState<Mode>(null);
  const { t } = useTranslation();

  if (mode === "form") {
    return <AssessmentForm />;
  }

  if (mode === "chatbot") {
    return <AssessmentChatbot />;
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
            {t("assessment.subtitle")}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.02, boxShadow: "0 8px 24px var(--color-card-shadow)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMode("form")}
            style={{
              width: "100%",
              padding: "28px 24px",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--color-border)",
              background: "var(--color-background)",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "var(--radius-btn)",
                background: "rgba(37, 150, 255, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileText size={24} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--color-text-main)",
                margin: 0,
              }}
            >
              {t("assessment.formOption")}
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "var(--color-text-secondary)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {t("assessment.formOptionDesc")}
            </p>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02, boxShadow: "0 8px 24px var(--color-card-shadow)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMode("chatbot")}
            style={{
              width: "100%",
              padding: "28px 24px",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--color-border)",
              background: "var(--color-background)",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "var(--radius-btn)",
                background: "rgba(37, 150, 255, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageCircle size={24} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--color-text-main)",
                margin: 0,
              }}
            >
              {t("assessment.chatbotOption")}
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "var(--color-text-secondary)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {t("assessment.chatbotOptionDesc")}
            </p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

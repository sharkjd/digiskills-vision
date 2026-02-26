"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, FileText, MessageCircle, Phone, Sparkles, Target, TrendingUp } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import AssessmentForm from "./AssessmentForm";
import AssessmentChatbot from "./AssessmentChatbot";
import CompetenceRadarChart from "@/components/charts/CompetenceRadarChart";

type Mode = null | "form" | "chatbot";

type VoiceCallStatus = "idle" | "calling" | "success" | "error";

export default function AssessmentChoice() {
  const [mode, setMode] = useState<Mode>(null);
  const [voiceCallStatus, setVoiceCallStatus] = useState<VoiceCallStatus>("idle");
  const { t } = useTranslation();

  async function handleVoiceCall() {
    setVoiceCallStatus("calling");

    // Efekt vytáčení běží 15 sekund, pak teprve přepneme na „Hovor probíhá“
    await new Promise((r) => setTimeout(r, 15_000));
    setVoiceCallStatus("success");

    // API volání v pozadí (pro budoucí integraci)
    fetch("/api/voice-call", { method: "POST" }).catch(() => {});
  }

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
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
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
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Karta 1: Formulář */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setMode("form")}
            style={{
              background: "var(--color-background)",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              padding: "28px 32px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              cursor: "pointer",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 16px rgba(37, 150, 255, 0.3)",
              }}
            >
              <FileText size={28} color="white" strokeWidth={2} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--color-text-main)",
                    margin: 0,
                  }}
                >
                  {t("assessment.formOption")}
                </h2>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 10px",
                    background: "rgba(37, 150, 255, 0.1)",
                    color: "var(--color-primary)",
                    borderRadius: 6,
                  }}
                >
                  ~15 min
                </span>
              </div>
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
            </div>
            <motion.div
              whileHover={{ x: 4 }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "var(--color-breeze)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ArrowRight size={22} color="var(--color-primary)" />
            </motion.div>
          </motion.div>

          {/* Karta 2: Chatbot */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setMode("chatbot")}
            style={{
              background: "var(--color-background)",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              padding: "28px 32px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              cursor: "pointer",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg, #77F9D9 0%, #10B981 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 16px rgba(119, 249, 217, 0.4)",
              }}
            >
              <MessageCircle size={28} color="white" strokeWidth={2} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--color-text-main)",
                    margin: 0,
                  }}
                >
                  {t("assessment.chatbotOption")}
                </h2>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 10px",
                    background: "rgba(119, 249, 217, 0.2)",
                    color: "#059669",
                    borderRadius: 6,
                  }}
                >
                  AI asistent
                </span>
              </div>
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
            </div>
            <motion.div
              whileHover={{ x: 4 }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "var(--color-breeze)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ArrowRight size={22} color="var(--color-primary)" />
            </motion.div>
          </motion.div>

          {/* Karta 3: Hlasový hovor */}
          <motion.div
            whileHover={voiceCallStatus === "idle" || voiceCallStatus === "error" ? { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" } : {}}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              background: voiceCallStatus === "calling" || voiceCallStatus === "success"
                ? "linear-gradient(135deg, rgba(37, 150, 255, 0.06) 0%, rgba(119, 249, 217, 0.06) 100%)"
                : "var(--color-background)",
              borderRadius: 16,
              border: voiceCallStatus === "calling"
                ? "1px solid var(--color-primary)"
                : voiceCallStatus === "success"
                ? "1px solid var(--color-accent-green)"
                : "1px solid var(--color-border)",
              padding: "28px 32px",
              display: "flex",
              alignItems: "center",
              gap: 24,
              cursor: voiceCallStatus === "idle" || voiceCallStatus === "error" ? "pointer" : "default",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
              position: "relative",
              overflow: "hidden",
            }}
            onClick={() => {
              if (voiceCallStatus === "idle" || voiceCallStatus === "error") {
                handleVoiceCall();
              }
            }}
          >
            {(voiceCallStatus === "calling" || voiceCallStatus === "success") ? (
              <>
                <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
                  {voiceCallStatus === "calling" && (
                    <>
                      <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 64,
                          height: 64,
                          borderRadius: 16,
                          background: "var(--color-accent-orange)",
                        }}
                      />
                      <motion.div
                        initial={{ scale: 1, opacity: 0.3 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: 64,
                          height: 64,
                          borderRadius: 16,
                          background: "var(--color-accent-orange)",
                        }}
                      />
                    </>
                  )}
                  <motion.div
                    animate={voiceCallStatus === "calling" ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "relative",
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      background: voiceCallStatus === "success"
                        ? "linear-gradient(135deg, #77F9D9 0%, #10B981 100%)"
                        : "linear-gradient(135deg, #F7981C 0%, #EA580C 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: voiceCallStatus === "success"
                        ? "0 4px 16px rgba(119, 249, 217, 0.4)"
                        : "0 4px 16px rgba(247, 152, 28, 0.4)",
                    }}
                  >
                    <Phone
                      size={28}
                      color="white"
                      strokeWidth={2}
                      style={{
                        transform: voiceCallStatus === "success" ? "none" : "rotate(-30deg)",
                      }}
                    />
                  </motion.div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <h2
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "var(--color-text-main)",
                        margin: 0,
                      }}
                    >
                      {voiceCallStatus === "calling"
                        ? t("assessment.voiceCallingTitle")
                        : t("assessment.voiceSuccessTitle")}
                    </h2>
                    {voiceCallStatus === "calling" && (
                      <motion.div style={{ display: "flex", gap: 4 }}>
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut",
                            }}
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "var(--color-accent-orange)",
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--color-text-secondary)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {voiceCallStatus === "calling"
                      ? t("assessment.voiceCalling")
                      : t("assessment.voiceSuccess")}
                  </p>
                </div>
                {voiceCallStatus === "success" && (
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "var(--color-accent-green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </>
            ) : (
              <>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #F7981C 0%, #EA580C 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 16px rgba(247, 152, 28, 0.3)",
                  }}
                >
                  <Phone size={28} color="white" strokeWidth={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <h2
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "var(--color-text-main)",
                        margin: 0,
                      }}
                    >
                      {t("assessment.voiceOption")}
                    </h2>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "4px 10px",
                        background: "rgba(247, 152, 28, 0.12)",
                        color: "#EA580C",
                        borderRadius: 6,
                      }}
                    >
                      AI voicebot
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: voiceCallStatus === "error" ? "var(--color-accent-orange)" : "var(--color-text-secondary)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {voiceCallStatus === "error" ? t("assessment.voiceError") : t("assessment.voiceOptionDesc")}
                  </p>
                </div>
                <motion.div
                  whileHover={{ x: 4 }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "var(--color-breeze)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ArrowRight size={22} color="var(--color-primary)" />
                </motion.div>
              </>
            )}
          </motion.div>
        </div>

        <div
          style={{
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              borderRadius: 20,
              background: "var(--color-digi-sky)",
              color: "white",
              padding: "40px 36px 44px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 20,
                background: "rgba(255,255,255,0.12)",
                letterSpacing: "0.02em",
              }}
            >
              <Sparkles size={15} />
              {t("assessment.info.badge")}
            </div>

            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                margin: "0 0 16px",
                fontStyle: "italic",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}
            >
              {t("assessment.info.title")}
            </h2>
            <p style={{ margin: 0, opacity: 0.88, fontSize: 16, lineHeight: 1.7, maxWidth: 640 }}>
              {t("assessment.info.lead")}
            </p>

            <div
              style={{
                marginTop: 32,
                paddingTop: 28,
                borderTop: "1px solid rgba(255,255,255,0.12)",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              {[
                { title: t("assessment.info.step1Title"), desc: t("assessment.info.step1Desc") },
                { title: t("assessment.info.step2Title"), desc: t("assessment.info.step2Desc") },
                { title: t("assessment.info.step3Title"), desc: t("assessment.info.step3Desc") },
              ].map((step, idx) => (
                <div key={step.title} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "var(--color-accent-orange)",
                      color: "var(--color-text-main)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 15 }}>{step.title}</p>
                    <p style={{ margin: 0, opacity: 0.8, fontSize: 14, lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              borderRadius: 20,
              border: "1px solid var(--color-border)",
              background: "var(--color-background)",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
              padding: "36px 40px 40px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 20,
                alignItems: "flex-start",
                marginBottom: 32,
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: 26,
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: "var(--color-text-main)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t("assessment.info.benefitsTitle")}
                </h3>
                <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 15, lineHeight: 1.6 }}>
                  {t("assessment.info.benefitsSubtitle")}
                </p>
              </div>

              <Link
                href="/firma/vysledky"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 18px",
                  border: "1px solid var(--color-primary)",
                  borderRadius: "var(--radius-btn)",
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                {t("assessment.info.reportCta")}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
                alignItems: "start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {[
                  {
                    icon: <Target size={20} color="var(--color-primary)" />,
                    title: t("assessment.info.benefit1Title"),
                    desc: t("assessment.info.benefit1Desc"),
                  },
                  {
                    icon: <BarChart3 size={20} color="var(--color-primary)" />,
                    title: t("assessment.info.benefit2Title"),
                    desc: t("assessment.info.benefit2Desc"),
                  },
                  {
                    icon: <TrendingUp size={20} color="var(--color-primary)" />,
                    title: t("assessment.info.benefit3Title"),
                    desc: t("assessment.info.benefit3Desc"),
                  },
                  {
                    icon: <Sparkles size={20} color="var(--color-primary)" />,
                    title: t("assessment.info.benefit4Title"),
                    desc: t("assessment.info.benefit4Desc"),
                  },
                ].map((benefit) => (
                  <div
                    key={benefit.title}
                    style={{
                      border: "1px solid var(--color-border)",
                      borderRadius: 14,
                      padding: "18px 20px",
                      background: "var(--color-background)",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "rgba(37, 150, 255, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 14,
                      }}
                    >
                      {benefit.icon}
                    </div>
                    <p style={{ margin: "0 0 6px", color: "var(--color-text-main)", fontWeight: 700, fontSize: 15 }}>
                      {benefit.title}
                    </p>
                    <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 14, lineHeight: 1.55 }}>
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderRadius: 16,
                  background: "var(--color-breeze)",
                  border: "1px solid var(--color-border)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={{ margin: "0 0 8px", color: "var(--color-text-main)", fontSize: 16, fontWeight: 700, textAlign: "center" }}>
                  {t("assessment.info.benchmarkTitle")}
                </p>
                <p
                  style={{
                    margin: "0 0 20px",
                    color: "var(--color-text-secondary)",
                    fontSize: 14,
                    lineHeight: 1.55,
                    textAlign: "center",
                    maxWidth: 320,
                  }}
                >
                  {t("assessment.info.benchmarkDesc")}
                </p>
                
                <CompetenceRadarChart
                  size={320}
                  data={{
                    companyScores: [6.4, 4.4, 4.7, 5.4, 6.5],
                    marketAvg: [7.3, 5.9, 6.2, 7.5, 7.1],
                    top30: [7.7, 6.2, 6.8, 8.1, 7.5],
                    labels: [
                      t("companyReport.digcompInfo"),
                      t("companyReport.digcompContent"),
                      t("companyReport.digcompProblems"),
                      t("companyReport.digcompComm"),
                      t("companyReport.digcompSecurity"),
                    ],
                    legend: [
                      { short: t("companyReport.legendInfo"), icon: "📊", color: "#FEE2E2", iconBg: "#EF4444" },
                      { short: t("companyReport.legendContent"), icon: "☁️", color: "#E0F2FE", iconBg: "#0EA5E9" },
                      { short: t("companyReport.legendProblems"), icon: "🧩", color: "#D1FAE5", iconBg: "#10B981" },
                      { short: t("companyReport.legendComm"), icon: "💬", color: "#EDE9FE", iconBg: "#6366F1" },
                      { short: t("companyReport.legendSecurity"), icon: "✓", color: "#FEF3C7", iconBg: "#F59E0B" },
                    ],
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20, width: "100%" }}>
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        color: "var(--color-text-main)",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: item === 2 ? "var(--color-accent-orange)" : "var(--color-primary)",
                          flexShrink: 0,
                        }}
                      />
                      {t(`assessment.info.benchmarkPoint${item}`)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

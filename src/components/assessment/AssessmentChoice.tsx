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

        {/* EXECUTIVE SUMMARY STYLE HEADER */}
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
              background: "var(--color-digi-sky)",
              borderRadius: 16,
              padding: "36px 32px",
              color: "white",
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.15)",
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                <Sparkles size={14} />
                {t("assessment.info.badge")}
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", fontStyle: "italic" }}>
                {t("assessment.info.title")}
              </h2>
              <p style={{ fontSize: 15, opacity: 0.85, margin: 0, maxWidth: 600 }}>
                {t("assessment.info.lead")}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { title: t("assessment.info.step1Title"), desc: t("assessment.info.step1Desc"), icon: "1" },
                { title: t("assessment.info.step2Title"), desc: t("assessment.info.step2Desc"), icon: "2" },
                { title: t("assessment.info.step3Title"), desc: t("assessment.info.step3Desc"), icon: "3" },
              ].map((step) => (
                <motion.div
                  key={step.title}
                  whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "var(--color-accent-orange)",
                      color: "var(--color-digi-sky)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 16,
                      marginBottom: 12,
                    }}
                  >
                    {step.icon}
                  </div>
                  <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 15 }}>{step.title}</p>
                  <p style={{ margin: 0, opacity: 0.8, fontSize: 13, lineHeight: 1.5 }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* BENEFITS CARDS - GRID LAYOUT */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {[
              {
                icon: <Target size={24} color="white" />,
                title: t("assessment.info.benefit1Title"),
                desc: t("assessment.info.benefit1Desc"),
                gradient: "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)",
                shadowColor: "rgba(37, 150, 255, 0.3)",
              },
              {
                icon: <BarChart3 size={24} color="white" />,
                title: t("assessment.info.benefit2Title"),
                desc: t("assessment.info.benefit2Desc"),
                gradient: "linear-gradient(135deg, #77F9D9 0%, #10B981 100%)",
                shadowColor: "rgba(119, 249, 217, 0.3)",
              },
              {
                icon: <TrendingUp size={24} color="white" />,
                title: t("assessment.info.benefit3Title"),
                desc: t("assessment.info.benefit3Desc"),
                gradient: "linear-gradient(135deg, #F7981C 0%, #EA580C 100%)",
                shadowColor: "rgba(247, 152, 28, 0.3)",
              },
              {
                icon: <Sparkles size={24} color="white" />,
                title: t("assessment.info.benefit4Title"),
                desc: t("assessment.info.benefit4Desc"),
                gradient: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
                shadowColor: "rgba(99, 102, 241, 0.3)",
              },
            ].map((benefit) => (
              <motion.div
                key={benefit.title}
                whileHover={{ y: -6, boxShadow: `0 16px 40px ${benefit.shadowColor}` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  background: "var(--color-background)",
                  borderRadius: 16,
                  border: "1px solid var(--color-border)",
                  padding: "24px",
                  boxShadow: "0 2px 8px var(--color-card-shadow)",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: benefit.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    boxShadow: `0 4px 12px ${benefit.shadowColor}`,
                  }}
                >
                  {benefit.icon}
                </div>
                <h4 style={{ margin: "0 0 8px", color: "var(--color-text-main)", fontWeight: 700, fontSize: 16 }}>
                  {benefit.title}
                </h4>
                <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* BENCHMARK PREVIEW SECTION */}
          <div
            style={{
              background: "var(--color-background)",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
              overflow: "visible",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                minHeight: 380,
                overflow: "visible",
              }}
            >
              {/* Left side - Text content */}
              <div
                style={{
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: 24,
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: "var(--color-text-main)",
                  }}
                >
                  {t("assessment.info.benefitsTitle")}
                </h3>
                <p
                  style={{
                    margin: "0 0 24px",
                    color: "var(--color-text-secondary)",
                    fontSize: 15,
                    lineHeight: 1.6,
                  }}
                >
                  {t("assessment.info.benefitsSubtitle")}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: item === 2 ? "rgba(247, 152, 28, 0.15)" : "rgba(37, 150, 255, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: item === 2 ? "var(--color-accent-orange)" : "var(--color-primary)",
                          }}
                        />
                      </div>
                      <span style={{ color: "var(--color-text-main)", fontSize: 14, fontWeight: 500 }}>
                        {t(`assessment.info.benchmarkPoint${item}`)}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="/firma/vysledky"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "14px 24px",
                      background: "var(--color-primary)",
                      borderRadius: 10,
                      color: "white",
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 600,
                      boxShadow: "0 4px 12px rgba(37, 150, 255, 0.3)",
                    }}
                  >
                    {t("assessment.info.reportCta")}
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
              </div>

              {/* Right side - Radar chart */}
              <div
                style={{
                  background: "var(--color-background)",
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderLeft: "1px solid var(--color-border)",
                  overflow: "visible",
                }}
              >
                <p
                  style={{
                    margin: "0 0 8px",
                    color: "var(--color-text-main)",
                    fontSize: 15,
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {t("assessment.info.benchmarkTitle")}
                </p>
                <p
                  style={{
                    margin: "0 0 16px",
                    color: "var(--color-text-secondary)",
                    fontSize: 13,
                    textAlign: "center",
                    maxWidth: 280,
                  }}
                >
                  {t("assessment.info.benchmarkDesc")}
                </p>

                <CompetenceRadarChart
                  size={280}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

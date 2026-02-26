"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const INITIAL_COMPLETED = 55;
const INITIAL_TOTAL = 100;
const SEND_DELAY_MS = 2200;

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

export default function AssessmentOverview() {
  const router = useRouter();
  const { t } = useTranslation();
  const [completedCount, setCompletedCount] = useState(INITIAL_COMPLETED);
  const [totalCount] = useState(INITIAL_TOTAL);
  const [emailBody, setEmailBody] = useState(() => t("firma.initialEmailBody"));
  const [isSending, setIsSending] = useState(false);
  const [sendFeedback, setSendFeedback] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [evaluationLoading, setEvaluationLoading] = useState(false);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [sendDialogPhase, setSendDialogPhase] = useState<"confirm" | "sending" | "sent">(
    "confirm"
  );
  const [sendCountAtConfirm, setSendCountAtConfirm] = useState(0);

  const notCompletedCount = totalCount - completedCount;

  const completionPercent = useMemo(() => {
    if (totalCount === 0) {
      return 0;
    }
    return Math.round((completedCount / totalCount) * 100);
  }, [completedCount, totalCount]);

  const openSendDialog = () => {
    if (isSending) return;
    setSendDialogPhase("confirm");
    setSendDialogOpen(true);
  };

  const handleConfirmSend = () => {
    if (isSending) return;

    setSendCountAtConfirm(notCompletedCount);
    setSendDialogPhase("sending");
    setIsSending(true);
    setSendFeedback(t("firma.sending"));

    window.setTimeout(() => {
      setCompletedCount((currentValue) => {
        const increment = Math.ceil(currentValue * 0.1);
        return Math.min(totalCount, currentValue + increment);
      });
      setSendFeedback(t("firma.sent"));
      setSendDialogPhase("sent");
      setIsSending(false);
    }, SEND_DELAY_MS);
  };

  const closeSendDialog = () => {
    setSendDialogOpen(false);
    setSendDialogPhase("confirm");
  };

  const openEvaluationDialog = () => {
    setDialogOpen(true);
  };

  const handleConfirmEvaluation = () => {
    setEvaluationLoading(true);
    setTimeout(() => {
      setDialogOpen(false);
      router.push("/firma/vysledky");
    }, 4000);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* HERO SECTION - Dark header */}
        <div
          style={{
            background: "#040E3C",
            borderRadius: 16,
            padding: "36px 32px",
            color: "white",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.15)",
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              Assessment Progress
            </div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 800,
                margin: "0 0 8px",
                fontStyle: "italic",
              }}
            >
              {t("firma.overviewTitle")}
            </h1>
            <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>
              Sledujte průběh vyplňování assessmentu ve vaší organizaci
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
            }}
          >
            {/* Progress kruh */}
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
              transition={HOVER_TRANSITION}
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 100,
                  height: 100,
                  margin: "0 auto 12px",
                }}
              >
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#77F9D9"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(completionPercent / 100) * 264} 264`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 800 }}>
                    {completionPercent}%
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                {t("firma.completionRate")}
              </div>
            </motion.div>

            {/* Dokončeno */}
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
              transition={HOVER_TRANSITION}
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: "#77F9D9",
                }}
              >
                {completedCount}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>
                {t("firma.completedAssessment")}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                z {totalCount} zaměstnanců
              </div>
            </motion.div>

            {/* Čeká na vyplnění */}
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
              transition={HOVER_TRANSITION}
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: "#F7981C",
                }}
              >
                {notCompletedCount}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>
                Čeká na vyplnění
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                {((notCompletedCount / totalCount) * 100).toFixed(0)}% zaměstnanců
              </div>
            </motion.div>
          </div>
        </div>

        {/* HROMADNÁ PŘIPOMÍNKA */}
        <motion.div
          whileHover={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
          transition={HOVER_TRANSITION}
          style={{
            background: "white",
            borderRadius: 16,
            padding: 28,
            border: "1px solid #E5E7EB",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(37, 150, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2596FF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#040E3C",
                  margin: 0,
                }}
              >
                {t("firma.bulkReminderTitle")}
              </h2>
              <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>
                Pošlete připomínku {notCompletedCount} zaměstnancům, kteří ještě nevyplnili assessment
              </p>
            </div>
          </div>

          <textarea
            value={emailBody}
            onChange={(event) => setEmailBody(event.target.value)}
            style={{
              width: "100%",
              minHeight: 320,
              border: "1px solid #E5E7EB",
              borderRadius: 12,
              padding: "16px 18px",
              color: "#040E3C",
              resize: "vertical",
              lineHeight: 1.6,
              fontSize: 14,
              background: "#F9FAFB",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#2596FF";
              e.target.style.boxShadow = "0 0 0 3px rgba(37, 150, 255, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#E5E7EB";
              e.target.style.boxShadow = "none";
            }}
          />

          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 16 }}>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(37,150,255,0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={HOVER_TRANSITION}
              type="button"
              onClick={openSendDialog}
              disabled={isSending}
              style={{
                padding: "12px 28px",
                borderRadius: 10,
                border: "none",
                cursor: isSending ? "not-allowed" : "pointer",
                background: isSending ? "#E5E7EB" : "#2596FF",
                color: "white",
                fontWeight: 700,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              {t("firma.send")}
            </motion.button>
            {sendFeedback ? (
              <span
                style={{
                  color: sendFeedback === t("firma.sent") ? "#10B981" : "#6B7280",
                  fontWeight: 600,
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {sendFeedback === t("firma.sent") && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {sendFeedback}
              </span>
            ) : null}
          </div>
        </motion.div>

        {/* CTA BANNER - VYHODNOTIT */}
        <div
          style={{
            background: "linear-gradient(135deg, #2596FF 0%, #1F80D9 100%)",
            borderRadius: 16,
            padding: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div style={{ color: "white", flex: 1, minWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                {t("firma.evaluateTitle")}
              </h2>
            </div>
            <p style={{ fontSize: 15, margin: 0, opacity: 0.95, lineHeight: 1.6 }}>
              {t("firma.evaluateDesc")}
            </p>
          </div>

          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={HOVER_TRANSITION}
            type="button"
            onClick={openEvaluationDialog}
            style={{
              padding: "16px 32px",
              borderRadius: 12,
              border: "none",
              background: "white",
              color: "#2596FF",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            {t("firma.evaluateAssessment")}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* DIALOG - VYHODNOCENÍ */}
      {dialogOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="evaluation-dialog-title"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(4, 14, 60, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 200,
          }}
          onClick={() => !evaluationLoading && setDialogOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 480,
              background: "white",
              borderRadius: 16,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              overflow: "hidden",
            }}
          >
            {evaluationLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "64px 32px",
                  gap: 16,
                }}
              >
                <div className="ds-spinner" aria-label={t("firma.evaluatingCompany")} />
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontWeight: 700,
                      marginBottom: 6,
                      color: "#040E3C",
                      fontSize: 16,
                    }}
                  >
                    {t("firma.evaluatingCompany")}
                  </div>
                  <div style={{ color: "#6B7280", fontSize: 13 }}>
                    {t("firma.analyzingData")}
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                <div
                  style={{
                    background: "#040E3C",
                    padding: "24px 28px",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "rgba(119, 249, 217, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#77F9D9"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3
                    id="evaluation-dialog-title"
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      fontStyle: "italic",
                      margin: "0 0 8px",
                    }}
                  >
                    {t("firma.evaluationDialogTitle")}
                  </h3>
                  <p style={{ fontSize: 14, opacity: 0.85, margin: 0 }}>
                    {t("firma.peopleCompleted", { percent: completionPercent })}
                  </p>
                </div>

                <div style={{ padding: "24px 28px" }}>
                  <p
                    style={{
                      color: "#374151",
                      lineHeight: 1.7,
                      margin: "0 0 24px",
                      fontSize: 15,
                    }}
                  >
                    {t("firma.evaluationDialogText")}
                  </p>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                    <motion.button
                      whileHover={{ background: "#F3F4F6" }}
                      whileTap={{ scale: 0.98 }}
                      transition={HOVER_TRANSITION}
                      type="button"
                      onClick={() => setDialogOpen(false)}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 10,
                        border: "1px solid #E5E7EB",
                        background: "white",
                        color: "#374151",
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      {t("firma.no")}
                    </motion.button>
                    <motion.button
                      whileHover={{
                        boxShadow: "0 4px 12px rgba(37,150,255,0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={HOVER_TRANSITION}
                      type="button"
                      onClick={handleConfirmEvaluation}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 10,
                        border: "none",
                        background: "#2596FF",
                        color: "white",
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      {t("firma.yes")}
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      ) : null}

      {/* DIALOG - ODESLÁNÍ PŘIPOMÍNKY */}
      {sendDialogOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="send-dialog-title"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(4, 14, 60, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 200,
          }}
          onClick={closeSendDialog}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 480,
              background: "white",
              borderRadius: 16,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              overflow: "hidden",
            }}
          >
            {sendDialogPhase === "confirm" ? (
              <>
                <div
                  style={{
                    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    padding: "24px 28px",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "rgba(255, 255, 255, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <h3
                    id="send-dialog-title"
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      fontStyle: "italic",
                      margin: "0 0 8px",
                    }}
                  >
                    {t("firma.sendDialogTitle", { count: notCompletedCount })}
                  </h3>
                </div>

                <div style={{ padding: "24px 28px" }}>
                  <p
                    style={{
                      color: "#374151",
                      lineHeight: 1.7,
                      margin: "0 0 24px",
                      fontSize: 15,
                    }}
                  >
                    {t("firma.sendDialogConfirm")}
                  </p>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                    <motion.button
                      whileHover={{ background: "#F3F4F6" }}
                      whileTap={{ scale: 0.98 }}
                      transition={HOVER_TRANSITION}
                      type="button"
                      onClick={closeSendDialog}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 10,
                        border: "1px solid #E5E7EB",
                        background: "white",
                        color: "#374151",
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      {t("firma.no")}
                    </motion.button>
                    <motion.button
                      whileHover={{
                        boxShadow: "0 4px 12px rgba(37,150,255,0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={HOVER_TRANSITION}
                      type="button"
                      onClick={handleConfirmSend}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 10,
                        border: "none",
                        background: "#2596FF",
                        color: "white",
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      {t("firma.yes")}
                    </motion.button>
                  </div>
                </div>
              </>
            ) : sendDialogPhase === "sending" ? (
              <div style={{ padding: "48px 28px", textAlign: "center" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: "rgba(37, 150, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2596FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
                <p
                  style={{
                    color: "#040E3C",
                    fontSize: 18,
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {t("firma.sending")}
                </p>
              </div>
            ) : (
              <>
                <div
                  style={{
                    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    padding: "24px 28px",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: "rgba(255, 255, 255, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    id="send-dialog-title"
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      fontStyle: "italic",
                      margin: "0 0 8px",
                    }}
                  >
                    {t("firma.sent")}
                  </h3>
                  <p style={{ fontSize: 14, opacity: 0.9, margin: 0 }}>
                    Připomínka byla odeslána {sendCountAtConfirm} zaměstnancům
                  </p>
                </div>

                <div style={{ padding: "24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <motion.button
                      whileHover={{
                        boxShadow: "0 4px 12px rgba(37,150,255,0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={HOVER_TRANSITION}
                      type="button"
                      onClick={closeSendDialog}
                      style={{
                        padding: "12px 24px",
                        borderRadius: 10,
                        border: "none",
                        background: "#2596FF",
                        color: "white",
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      {t("firma.close")}
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      ) : null}

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </>
  );
}

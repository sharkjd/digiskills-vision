"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

const INITIAL_COMPLETED = 55;
const INITIAL_TOTAL = 100;
const SEND_DELAY_MS = 2200;

export default function AssessmentOverview() {
  const router = useRouter();
  const { t } = useTranslation();
  const [completedCount, setCompletedCount] = useState(INITIAL_COMPLETED);
  const [totalCount] = useState(INITIAL_TOTAL);
  const [emailBody, setEmailBody] = useState(() => t("firma.initialEmailBody"));
  const [isSending, setIsSending] = useState(false);
  const [sendFeedback, setSendFeedback] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
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
    setDialogOpen(false);
    router.push("/firma/vysledky");
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gap: 24,
        }}
      >
        <section>
          <h1
            style={{
              color: "var(--color-text-main)",
              fontSize: "var(--font-size-page-title)",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            {t("firma.overviewTitle")}
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            <div
              style={{
                background: "var(--color-digi-blue)",
                borderRadius: "var(--radius-card)",
                padding: "22px 20px",
                color: "white",
                boxShadow: "0 2px 8px var(--color-card-shadow)",
              }}
            >
              <p style={{ fontSize: 40, fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>
                {completionPercent} %
              </p>
              <p style={{ fontWeight: 600, opacity: 0.95 }}>{t("firma.completionRate")}</p>
            </div>
            <div
              style={{
                background: "var(--color-digi-violet)",
                borderRadius: "var(--radius-card)",
                padding: "22px 20px",
                color: "white",
                boxShadow: "0 2px 8px var(--color-card-shadow)",
              }}
            >
              <p style={{ fontSize: 40, fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>
                {completedCount}
              </p>
              <p style={{ fontWeight: 600, opacity: 0.95 }}>{t("firma.completedAssessment")}</p>
            </div>
            <div
              style={{
                background: "var(--color-digi-salmon)",
                borderRadius: "var(--radius-card)",
                padding: "22px 20px",
                color: "white",
                boxShadow: "0 2px 8px var(--color-card-shadow)",
              }}
            >
              <p style={{ fontSize: 40, fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>
                {totalCount}
              </p>
              <p style={{ fontWeight: 600, opacity: 0.95 }}>{t("firma.totalEmployees")}</p>
            </div>
          </div>
        </section>

        <section
          style={{
            background: "var(--color-background)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-card)",
            boxShadow: "0 2px 8px var(--color-card-shadow)",
            padding: 24,
          }}
        >
          <h2
            style={{
              color: "var(--color-text-main)",
              fontSize: "var(--font-size-section-title)",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            {t("firma.bulkReminderTitle")}
          </h2>
          <textarea
            value={emailBody}
            onChange={(event) => setEmailBody(event.target.value)}
            style={{
              width: "100%",
              minHeight: 280,
              border: "1px solid var(--color-border-input)",
              borderRadius: "var(--radius-input)",
              padding: "12px 14px",
              color: "var(--color-text-main)",
              resize: "vertical",
              lineHeight: 1.5,
            }}
          />
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <button
              type="button"
              onClick={openSendDialog}
              disabled={isSending}
              style={{
                padding: "10px 22px",
                borderRadius: "var(--radius-btn)",
                border: "none",
                cursor: isSending ? "not-allowed" : "pointer",
                background: isSending ? "var(--color-border)" : "var(--color-primary)",
                color: "white",
                fontWeight: 600,
              }}
            >
              {t("firma.send")}
            </button>
            {sendFeedback ? (
              <span style={{ color: "var(--color-text-secondary)", fontWeight: 600 }}>
                {sendFeedback}
              </span>
            ) : null}
          </div>
        </section>

        <section
          style={{
            background: "var(--color-background)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-card)",
            boxShadow: "0 2px 8px var(--color-card-shadow)",
            padding: 24,
          }}
        >
          <h2
            style={{
              color: "var(--color-text-main)",
              fontSize: "var(--font-size-section-title)",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            {t("firma.evaluateTitle")}
          </h2>
          <p
            style={{
              color: "var(--color-text-secondary)",
              marginBottom: 16,
            }}
          >
            {t("firma.evaluateDesc")}
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={openEvaluationDialog}
            style={{
              padding: "10px 24px",
              borderRadius: "var(--radius-btn)",
              border: "none",
              background: "var(--color-primary)",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {t("firma.evaluateAssessment")}
          </button>
        </section>
      </div>

      {dialogOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="evaluation-dialog-title"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(4, 14, 60, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 200,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 560,
              background: "var(--color-background)",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 8px 24px var(--color-card-shadow)",
              padding: 24,
            }}
          >
            <h3
              id="evaluation-dialog-title"
              style={{
                color: "var(--color-text-main)",
                fontSize: "var(--font-size-section-title)",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              {t("firma.evaluationDialogTitle")}
            </h3>
            <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
              {t("firma.peopleCompleted", { percent: completionPercent })} {t("firma.evaluationDialogText")}
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                style={{
                  padding: "9px 18px",
                  borderRadius: "var(--radius-btn)",
                  border: "1px solid var(--color-primary)",
                  background: "var(--color-background)",
                  color: "var(--color-primary)",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {t("firma.no")}
              </button>
              <button
                type="button"
                onClick={handleConfirmEvaluation}
                className="btn-primary"
                style={{
                  padding: "9px 18px",
                  borderRadius: "var(--radius-btn)",
                  border: "none",
                  background: "var(--color-primary)",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                    {t("firma.yes")}
                  </button>
            </div>
          </div>
        </div>
      ) : null}

      {sendDialogOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="send-dialog-title"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(4, 14, 60, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 200,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 560,
              background: "var(--color-background)",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 8px 24px var(--color-card-shadow)",
              padding: 24,
            }}
          >
            {sendDialogPhase === "confirm" ? (
              <>
                <h3
                  id="send-dialog-title"
                  style={{
                    color: "var(--color-text-main)",
                    fontSize: "var(--font-size-section-title)",
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  {t("firma.sendDialogTitle", { count: notCompletedCount })}
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  {t("firma.sendDialogConfirm")}
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                  <button
                    type="button"
                    onClick={closeSendDialog}
                    style={{
                      padding: "9px 18px",
                      borderRadius: "var(--radius-btn)",
                      border: "1px solid var(--color-primary)",
                      background: "var(--color-background)",
                      color: "var(--color-primary)",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {t("firma.no")}
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmSend}
                    className="btn-primary"
                    style={{
                      padding: "9px 18px",
                      borderRadius: "var(--radius-btn)",
                      border: "none",
                      background: "var(--color-primary)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                {t("firma.yes")}
              </button>
            </div>
          </>
        ) : sendDialogPhase === "sending" ? (
              <p
                style={{
                  color: "var(--color-text-main)",
                  fontSize: "var(--font-size-section-title)",
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                {t("firma.sending")}
              </p>
            ) : (
              <>
                <h3
                  id="send-dialog-title"
                  style={{
                    color: "var(--color-text-main)",
                    fontSize: "var(--font-size-section-title)",
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  {t("firma.sendDialogTitle", { count: sendCountAtConfirm })}
                </h3>
                <p
                  style={{
                    color: "var(--color-accent-green)",
                    fontSize: "var(--font-size-section-title)",
                    fontWeight: 700,
                    marginBottom: 20,
                  }}
                >
                  {t("firma.sent")}
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={closeSendDialog}
                    className="btn-primary"
                    style={{
                      padding: "9px 18px",
                      borderRadius: "var(--radius-btn)",
                      border: "none",
                      background: "var(--color-primary)",
                      color: "white",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {t("firma.close")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

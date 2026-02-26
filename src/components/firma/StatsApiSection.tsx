"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Key, Copy, Check, Code, Database, BarChart3 } from "lucide-react";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const API_ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/stats/overview",
    description: "Souhrnné statistiky firmy",
  },
  {
    method: "GET",
    path: "/api/v1/stats/activity",
    description: "Aktivita zaměstnanců v čase",
  },
  {
    method: "GET",
    path: "/api/v1/courses",
    description: "Seznam kurzů a míra dokončení",
  },
  {
    method: "GET",
    path: "/api/v1/employees",
    description: "Statistiky jednotlivých zaměstnanců",
  },
];

export default function StatsApiSection() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleGenerateKey = () => {
    const newKey = `dsk_${generateUUID()}`;
    setApiKey(newKey);
    setCopied(false);
  };

  const handleCopyKey = async () => {
    if (!apiKey) return;
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Nepodařilo se zkopírovat klíč");
    }
  };

  const handleDownloadTemplate = () => {
    setDownloading(true);
    setTimeout(() => {
      const blob = new Blob(
        [
          JSON.stringify(
            {
              name: "Digiskills Statistics Template",
              version: "1.0",
              description:
                "Power BI template pro napojení na Digiskills API. Importujte tento soubor do Power BI Desktop a zadejte svůj API klíč.",
              endpoints: API_ENDPOINTS.map((e) => ({
                url: `https://api.digiskills.cz${e.path}`,
                description: e.description,
              })),
            },
            null,
            2
          ),
        ],
        { type: "application/json" }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "digiskills-powerbi-template.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloading(false);
    }, 500);
  };

  return (
    <motion.div
      variants={itemVariants}
      style={{
        background: "var(--color-background)",
        borderRadius: 16,
        border: "1px solid var(--color-border)",
        boxShadow: "0 2px 8px var(--color-card-shadow)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-digi-sky) 0%, #1a2a6c 100%)",
          padding: "28px 32px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Database size={24} />
          </div>
          <div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              API napojení & Export dat
            </h2>
            <p style={{ fontSize: 14, opacity: 0.85, margin: "4px 0 0" }}>
              Exportujte statistiky do vlastních systémů
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "28px 32px" }}>
        {/* Popis */}
        <div style={{ marginBottom: 28 }}>
          <p
            style={{
              fontSize: 14,
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Propojte Digiskills statistiky s vašimi interními systémy. Pomocí REST API můžete
            získávat data o studiu zaměstnanců v reálném čase a vizualizovat je v Power BI,
            Tableau nebo vlastních dashboardech.
          </p>
        </div>

        {/* Akční tlačítka */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 32,
          }}
        >
          {/* Power BI šablona */}
          <motion.div
            whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}
            transition={HOVER_TRANSITION}
            style={{
              padding: 24,
              background: "var(--color-breeze)",
              borderRadius: 12,
              border: "1px solid var(--color-border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #F2C811 0%, #E8A200 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <BarChart3 size={20} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-main)" }}>
                  Power BI šablona
                </div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
                  Předpřipravený dashboard
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--color-text-secondary)",
                margin: "0 0 16px",
                lineHeight: 1.6,
              }}
            >
              Stáhněte si šablonu s předpřipravenými vizualizacemi pro rychlé nasazení.
            </p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadTemplate}
              disabled={downloading}
              style={{
                width: "100%",
                padding: "12px 20px",
                borderRadius: 8,
                border: "none",
                background: "linear-gradient(135deg, #F2C811 0%, #E8A200 100%)",
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                cursor: downloading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                opacity: downloading ? 0.7 : 1,
              }}
            >
              <Download size={18} />
              {downloading ? "Stahuji..." : "Stáhnout šablonu"}
            </motion.button>
          </motion.div>

          {/* API klíč */}
          <motion.div
            whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}
            transition={HOVER_TRANSITION}
            style={{
              padding: 24,
              background: "var(--color-breeze)",
              borderRadius: 12,
              border: "1px solid var(--color-border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, var(--color-primary) 0%, #1F80D9 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Key size={20} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-main)" }}>
                  API klíč
                </div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
                  Pro autentizaci požadavků
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--color-text-secondary)",
                margin: "0 0 16px",
                lineHeight: 1.6,
              }}
            >
              Vygenerujte si API klíč pro přístup k vašim statistikám.
            </p>

            <AnimatePresence mode="wait">
              {!apiKey ? (
                <motion.button
                  key="generate"
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateKey}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    borderRadius: 8,
                    border: "none",
                    background: "linear-gradient(135deg, var(--color-primary) 0%, #1F80D9 100%)",
                    color: "white",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <Key size={18} />
                  Vygenerovat API klíč
                </motion.button>
              ) : (
                <motion.div
                  key="key-display"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "var(--color-background)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      padding: "10px 12px",
                    }}
                  >
                    <code
                      style={{
                        flex: 1,
                        fontSize: 12,
                        color: "var(--color-text-main)",
                        fontFamily: "monospace",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {apiKey}
                    </code>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopyKey}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 6,
                        cursor: "pointer",
                        color: copied ? "#10b981" : "var(--color-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </motion.button>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerateKey}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: "1px solid var(--color-primary)",
                      background: "transparent",
                      color: "var(--color-primary)",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Vygenerovat nový klíč
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* API Endpointy */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Code size={20} color="var(--color-text-secondary)" />
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "var(--color-text-main)",
                margin: 0,
              }}
            >
              Dostupné API endpointy
            </h3>
          </div>
          <div
            style={{
              background: "#1e1e1e",
              borderRadius: 10,
              padding: "20px 24px",
              fontFamily: "monospace",
            }}
          >
            {API_ENDPOINTS.map((endpoint, idx) => (
              <div
                key={endpoint.path}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom:
                    idx < API_ENDPOINTS.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}
              >
                <span
                  style={{
                    background: "#4ade80",
                    color: "#1e1e1e",
                    padding: "2px 8px",
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {endpoint.method}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#f8f8f2", fontSize: 13 }}>{endpoint.path}</div>
                  <div style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>
                    {endpoint.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: 12,
              color: "var(--color-text-secondary)",
              marginTop: 12,
              margin: "12px 0 0",
            }}
          >
            Všechny požadavky vyžadují hlavičku{" "}
            <code
              style={{
                background: "var(--color-breeze)",
                padding: "2px 6px",
                borderRadius: 4,
                fontSize: 11,
              }}
            >
              Authorization: Bearer YOUR_API_KEY
            </code>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

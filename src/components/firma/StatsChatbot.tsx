"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ChevronRight } from "lucide-react";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

type ChatMessage = {
  role: "bot" | "user";
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "Jak si vedeme oproti ostatním firmám?",
  "Kde bychom měli zabrat a co doporučuješ?",
  "Jaký je trend studia za poslední měsíc?",
  "Kteří zaměstnanci potřebují podporu?",
];

const PREDEFINED_ANSWERS: Record<string, string> = {
  "Jak si vedeme oproti ostatním firmám?": `Skvělá otázka! Na základě dat vidím, že vaše firma je **nad průměrem trhu**.

**Klíčové ukazatele:**
- Váš Digiskills Index: **6.8 / 10** (průměr trhu je 5.2)
- Patříte mezi **top 30 %** firem v České republice
- Aktivita zaměstnanců je o **31 % vyšší** než průměr

**Silné stránky oproti konkurenci:**
- Kyberbezpečnost (+23 % nad průměrem)
- MS Teams & Spolupráce (+18 % nad průměrem)

Gratuluju! Jste na dobré cestě. 🎯`,

  "Kde bychom měli zabrat a co doporučuješ?": `Na základě analýzy vašich dat doporučuji zaměřit se na tyto oblasti:

**Největší mezery:**
1. **AI & Automatizace** (31 % znalostí) - Toto je kritická oblast pro budoucí konkurenceschopnost
2. **Power BI & Vizualizace** (28 %) - Data-driven rozhodování je klíčové
3. **Cloud Computing** (24 %) - Základy pro moderní IT infrastrukturu

**Konkrétní doporučení:**
- Přiřaďte kurz "AI pro každého" všem zaměstnancům
- Naplánujte workshop Power BI pro manažery
- Zvažte motivační program pro dokončení kurzů

**Akční plán:**
Vytvořil bych learning path začínající AI kurzy (nejvyšší priorita) a postupně přidával Power BI. Očekávaný nárůst Digiskills Indexu: +1.2 bodů za 3 měsíce.`,

  "Jaký je trend studia za poslední měsíc?": `Analyzoval jsem aktivitu za posledních 30 dní:

**Celkový trend: 📈 Rostoucí (+24 %)**

**Týdenní přehled:**
- Týden 1: 156 lekcí
- Týden 2: 189 lekcí (+21 %)
- Týden 3: 234 lekcí (+24 %)
- Týden 4: 198 lekcí (-15 %, pokles o víkendu)
- Týden 5: 267 lekcí (+35 %) ⭐ Rekord!

**Co funguje:**
- Nejvíce se studuje v úterý a středu (9:00-11:00)
- Kurzy AI mají nejvyšší engagement
- Gamifikace (body a žebříčky) motivuje

**Varování:**
- 26 zaměstnanců nebylo aktivních více než 2 týdny
- Doporučuji zaslat jim připomínku`,

  "Kteří zaměstnanci potřebují podporu?": `Identifikoval jsem zaměstnance, kteří by mohli potřebovat podporu:

**Neaktivní více než 14 dní (26 osob):**
- Většina z oddělení: Výroba (12), Logistika (8)
- Doporučení: Osobní kontakt + nabídka offline školení

**Nízké dokončení kurzů (18 osob):**
- Začali více než 3 kurzy, dokončili méně než 30 %
- Možné příčiny: Nedostatek času, nevhodná náročnost
- Doporučení: Kratší microlearning formáty

**Potenciální lídři (5 osob):**
- Marie Nováková, Petr Svoboda, Eva Horáková...
- Vysoká aktivita, pomohou motivovat ostatní
- Doporučení: Zapojit jako mentory

Chcete, abych připravil konkrétní akční plán?`,
};

export default function StatsChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      content:
        "Ahoj! 👋 Jsem váš AI asistent pro firemní statistiky. Mohu vám pomoci analyzovat data, identifikovat trendy a navrhnout zlepšení. Na co se chcete zeptat?",
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
      const answer =
        PREDEFINED_ANSWERS[trimmed] ||
        `Díky za dotaz! Analyzuji data...

Na základě vašich firemních statistik vidím, že:
- Celkově máte **98 aktivních zaměstnanců** z 124
- Průměrný Digiskills Index je **6.8 / 10**
- Za poslední měsíc jste dokončili **47 kurzů**

Můžete se mě zeptat konkrétněji, například:
- "Jak si vedeme oproti ostatním firmám?"
- "Kde bychom měli zabrat?"
- "Jaký je trend studia?"`;

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
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Statistiky AI</div>
                  <div style={{ fontSize: 12, opacity: 0.85 }}>Váš datový asistent</div>
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
                  Navrhované otázky
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <motion.button
                      key={q}
                      type="button"
                      whileHover={{
                        x: 4,
                        background: "rgba(255, 117, 117, 0.08)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestedQuestion(q)}
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
                      <span>{q}</span>
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
                  placeholder="Zeptejte se na statistiky..."
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

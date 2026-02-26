"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  HelpCircle,
  MessageSquare,
  Lock,
  Info,
  AlertTriangle,
  Mail,
  Building2,
  User,
  Check,
} from "lucide-react";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

type DeliveryChannel = "teams" | "whatsapp" | "email";
type MentorStyle = "quick" | "quiz" | "deep";
type Frequency = "weekly" | "biweekly" | "off";

interface SettingsState {
  deliveryChannels: DeliveryChannel[];
  mentorStyle: MentorStyle;
  frequency: Frequency;
  mandatoryDelivery: boolean;
  minFrequency: "weekly" | "biweekly";
}

const CHANNEL_OPTIONS = [
  {
    id: "teams" as const,
    name: "Microsoft Teams",
    icon: "/logos/Teams.png",
  },
  {
    id: "whatsapp" as const,
    name: "WhatsApp",
    icon: "/logos/whatsapp.png",
  },
  {
    id: "email" as const,
    name: "E-mail",
    iconComponent: Mail,
  },
];

const MENTOR_STYLES = [
  {
    id: "quick" as const,
    name: "Rychlé tipy",
    description: "Krátké zprávy pro okamžité použití.",
    Icon: Sparkles,
  },
  {
    id: "quiz" as const,
    name: "Zkoušení",
    description: "AI posílá kvízy a testuje tě.",
    Icon: HelpCircle,
  },
  {
    id: "deep" as const,
    name: "Delší povídání",
    description: "Hlubší vhled do témat.",
    Icon: MessageSquare,
  },
];

const FREQUENCY_OPTIONS = [
  { id: "weekly" as const, label: "1x týdně" },
  { id: "biweekly" as const, label: "1x za 14 dní" },
  { id: "off" as const, label: "Vypnout" },
];

export default function CommunicationSettings() {
  const [settings, setSettings] = useState<SettingsState>({
    deliveryChannels: ["teams"],
    mentorStyle: "quick",
    frequency: "weekly",
    mandatoryDelivery: true,
    minFrequency: "weekly",
  });
  const isFrequencyDisabled = (freq: Frequency) => {
    if (!settings.mandatoryDelivery) return false;
    if (freq === "off") return true;
    if (settings.minFrequency === "weekly" && freq === "biweekly") return true;
    return false;
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "40px 24px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {/* HEADER - tmavý jako na ostatních stránkách */}
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
              Nastavení
            </div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 800,
                margin: "0 0 8px",
                fontStyle: "italic",
              }}
            >
              Komunikace a notifikace
            </h1>
            <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>
              Nastavte si, jak a kdy vás bude AI Mentor kontaktovat
            </p>
          </div>
        </div>

        {/* KARTY VEDLE SEBE */}
        <div
          className="settings-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
            gap: 24,
          }}
        >
          {/* OSOBNÍ NASTAVENÍ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: "white",
              border: "1px solid #E5E7EB",
              borderRadius: 16,
              padding: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 28,
                paddingBottom: 20,
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(37, 150, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User size={24} color="#2596FF" />
              </div>
              <div>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#040E3C",
                    margin: 0,
                  }}
                >
                  Osobní nastavení
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "#6B7280",
                    margin: "4px 0 0",
                  }}
                >
                  Vaše preference pro AI Mentora
                </p>
              </div>
            </div>

            {/* KANÁL DORUČENÍ */}
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                <h3
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#374151",
                    margin: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Kanál doručení
                </h3>
                {settings.mandatoryDelivery && (
                  <Lock size={14} color="#9CA3AF" />
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {CHANNEL_OPTIONS.map((channel) => {
                  const isSelected = settings.deliveryChannels.includes(channel.id);
                  const toggleChannel = () => {
                    setSettings((s) => {
                      const hasChannel = s.deliveryChannels.includes(channel.id);
                      const newChannels = hasChannel
                        ? s.deliveryChannels.filter((c) => c !== channel.id)
                        : [...s.deliveryChannels, channel.id];
                      if (s.mandatoryDelivery && newChannels.length === 0) return s;
                      return { ...s, deliveryChannels: newChannels };
                    });
                  };
                  return (
                    <motion.button
                      key={channel.id}
                      onClick={toggleChannel}
                      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={HOVER_TRANSITION}
                      style={{
                        position: "relative",
                        padding: "18px 14px",
                        background: isSelected
                          ? "rgba(37, 150, 255, 0.08)"
                          : "#F9FAFB",
                        border: isSelected
                          ? "2px solid #2596FF"
                          : "1px solid #E5E7EB",
                        borderRadius: 12,
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {channel.icon ? (
                          <Image
                            src={channel.icon}
                            alt={channel.name}
                            width={36}
                            height={36}
                            style={{ objectFit: "contain" }}
                          />
                        ) : channel.iconComponent ? (
                          <channel.iconComponent
                            size={32}
                            color={isSelected ? "#2596FF" : "#6B7280"}
                          />
                        ) : null}
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: isSelected ? "#2596FF" : "#374151",
                        }}
                      >
                        {channel.name}
                      </span>
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: "#2596FF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Check size={12} color="white" strokeWidth={3} />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* STYL AI MENTORA */}
            <div style={{ marginBottom: 32 }}>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  margin: "0 0 14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Styl AI Mentora
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {MENTOR_STYLES.map((style) => {
                  const isSelected = settings.mentorStyle === style.id;
                  return (
                    <motion.button
                      key={style.id}
                      onClick={() =>
                        setSettings((s) => ({ ...s, mentorStyle: style.id }))
                      }
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                      whileTap={{ scale: 0.99 }}
                      transition={HOVER_TRANSITION}
                      style={{
                        padding: "14px 16px",
                        background: isSelected
                          ? "rgba(37, 150, 255, 0.08)"
                          : "#F9FAFB",
                        border: isSelected
                          ? "2px solid #2596FF"
                          : "1px solid #E5E7EB",
                        borderRadius: 12,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        textAlign: "left",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 10,
                          background: isSelected
                            ? "rgba(37, 150, 255, 0.15)"
                            : "#E5E7EB",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <style.Icon
                          size={20}
                          color={isSelected ? "#2596FF" : "#6B7280"}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: isSelected ? "#040E3C" : "#374151",
                            marginBottom: 2,
                          }}
                        >
                          {style.name}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "#6B7280",
                          }}
                        >
                          {style.description}
                        </div>
                      </div>
                      {isSelected && (
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#2596FF",
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* FREKVENCE ZPRÁV */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                <h3
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#374151",
                    margin: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Frekvence zpráv
                </h3>
                {settings.mandatoryDelivery && (
                  <Lock size={14} color="#9CA3AF" />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  background: "#F4F5FA",
                  padding: 4,
                  borderRadius: 12,
                }}
              >
                {FREQUENCY_OPTIONS.map((option) => {
                  const isSelected = settings.frequency === option.id;
                  const isDisabled = isFrequencyDisabled(option.id);
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => {
                        if (!isDisabled) {
                          setSettings((s) => ({ ...s, frequency: option.id }));
                        }
                      }}
                      whileHover={!isDisabled ? { scale: 1.02 } : {}}
                      whileTap={!isDisabled ? { scale: 0.98 } : {}}
                      transition={HOVER_TRANSITION}
                      style={{
                        flex: 1,
                        padding: "12px 16px",
                        background: isSelected
                          ? option.id === "off"
                            ? "#FEE2E2"
                            : "#2596FF"
                          : "transparent",
                        border: "none",
                        borderRadius: 8,
                        cursor: isDisabled ? "not-allowed" : "pointer",
                        fontSize: 13,
                        fontWeight: 600,
                        color: isDisabled
                          ? "#9CA3AF"
                          : isSelected
                          ? option.id === "off"
                            ? "#DC2626"
                            : "white"
                          : "#6B7280",
                        opacity: isDisabled ? 0.5 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {isDisabled && <Lock size={12} />}
                      {option.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* INFO TOOLBOX */}
              <AnimatePresence>
                {settings.frequency === "biweekly" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: "#FEF3C7",
                      border: "1px solid #FCD34D",
                      borderRadius: 12,
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      overflow: "hidden",
                    }}
                  >
                    <Info
                      size={18}
                      color="#D97706"
                      style={{ flexShrink: 0, marginTop: 2 }}
                    />
                    <p
                      style={{
                        fontSize: 13,
                        color: "#92400E",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      Víme, že toto snižuje dosah studia o 10 %.
                    </p>
                  </motion.div>
                )}

                {settings.frequency === "off" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: "#FEE2E2",
                      border: "1px solid #FECACA",
                      borderRadius: 12,
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      overflow: "hidden",
                    }}
                  >
                    <AlertTriangle
                      size={18}
                      color="#DC2626"
                      style={{ flexShrink: 0, marginTop: 2 }}
                    />
                    <p
                      style={{
                        fontSize: 13,
                        color: "#991B1B",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      Nedoporučujeme vypínat notifikace. Váš manažer tuto informaci
                      uvidí.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* FIREMNÍ NASTAVENÍ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              background: "white",
              border: "1px solid #E5E7EB",
              borderRadius: 16,
              padding: 28,
              alignSelf: "start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 28,
                paddingBottom: 20,
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(119, 249, 217, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Building2 size={24} color="#059669" />
              </div>
              <div>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#040E3C",
                    margin: 0,
                  }}
                >
                  Firemní nastavení
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "#6B7280",
                    margin: "4px 0 0",
                  }}
                >
                  Globální pravidla pro celou organizaci
                </p>
              </div>
            </div>

            {/* POVINNÉ ZASÍLÁNÍ */}
            <div style={{ marginBottom: 32 }}>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  margin: "0 0 14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Povinné zasílání
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  background: "#F4F5FA",
                  padding: 4,
                  borderRadius: 12,
                }}
              >
                {[
                  { id: true, label: "Ano" },
                  { id: false, label: "Ne" },
                ].map((option) => {
                  const isSelected = settings.mandatoryDelivery === option.id;
                  return (
                    <motion.button
                      key={String(option.id)}
                      onClick={() =>
                        setSettings((s) => ({
                          ...s,
                          mandatoryDelivery: option.id,
                          frequency:
                            option.id && s.frequency === "off"
                              ? "weekly"
                              : s.frequency,
                        }))
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={HOVER_TRANSITION}
                      style={{
                        flex: 1,
                        padding: "12px 16px",
                        background: isSelected
                          ? option.id
                            ? "#77F9D9"
                            : "#E5E7EB"
                          : "transparent",
                        border: "none",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 600,
                        color: isSelected
                          ? option.id
                            ? "#065F46"
                            : "#374151"
                          : "#6B7280",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {option.label}
                    </motion.button>
                  );
                })}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "#6B7280",
                  margin: "12px 0 0",
                  lineHeight: 1.5,
                }}
              >
                {settings.mandatoryDelivery
                  ? "Zaměstnanci nemohou vypnout notifikace od AI Mentora."
                  : "Zaměstnanci si mohou notifikace vypnout."}
              </p>
            </div>

            {/* MINIMÁLNÍ FREKVENCE */}
            <div>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  margin: "0 0 14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Minimální frekvence
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  background: "#F4F5FA",
                  padding: 4,
                  borderRadius: 12,
                }}
              >
                {[
                  { id: "weekly" as const, label: "Týden" },
                  { id: "biweekly" as const, label: "14 dní" },
                ].map((option) => {
                  const isSelected = settings.minFrequency === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() =>
                        setSettings((s) => ({
                          ...s,
                          minFrequency: option.id,
                          frequency:
                            option.id === "weekly" && s.frequency === "biweekly"
                              ? "weekly"
                              : s.frequency,
                        }))
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={HOVER_TRANSITION}
                      style={{
                        flex: 1,
                        padding: "12px 16px",
                        background: isSelected ? "#2596FF" : "transparent",
                        border: "none",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 600,
                        color: isSelected ? "white" : "#6B7280",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {option.label}
                    </motion.button>
                  );
                })}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "#6B7280",
                  margin: "12px 0 0",
                  lineHeight: 1.5,
                }}
              >
                {settings.minFrequency === "weekly"
                  ? "Zaměstnanci musí dostávat zprávy minimálně 1x týdně."
                  : "Zaměstnanci si mohou nastavit frekvenci až 1x za 14 dní."}
              </p>
            </div>

            {/* INFO BOX */}
            <div
              style={{
                marginTop: 28,
                padding: "16px",
                background: "#F0F9FF",
                border: "1px solid #BAE6FD",
                borderRadius: 12,
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <Info
                size={18}
                color="#0284C7"
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <p
                style={{
                  fontSize: 12,
                  color: "#0369A1",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Tato nastavení ovlivňují všechny zaměstnance ve vaší organizaci.
                Změny se projeví okamžitě.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

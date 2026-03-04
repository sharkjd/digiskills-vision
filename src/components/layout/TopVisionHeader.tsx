"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import type { Language } from "@/context/LanguageContext";
import { asset } from "@/lib/paths";
import "@/styles/topvision-tokens.css";

const MOCK_USER = {
  name: "Honza Dolejš",
  organization: "Top Vision",
  avatar: asset("/images/avatar-honza-v2.png"),
};

export default function TopVisionHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();

  return (
    <header
      className="topvision-theme"
      style={{
        background: "var(--tv-background)",
        borderBottom: "1px solid var(--tv-border)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* Logo TopVision */}
        <Link
          href="/topvision"
          style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
        >
          <Image
            src={asset("/images/topvision-logo.png")}
            alt="Top Vision"
            width={160}
            height={40}
            priority
            style={{ objectFit: "contain", height: "auto" }}
          />
        </Link>

        {/* Přepínač jazyka CZ/EN – TopVision zelená */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            flexShrink: 0,
          }}
        >
          {(["cs", "en"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang as Language)}
              style={{
                padding: "6px 12px",
                fontSize: 14,
                fontWeight: 600,
                border: "1px solid var(--tv-border)",
                background:
                  language === lang ? "#7AC143" : "var(--tv-background)",
                color: language === lang ? "white" : "var(--tv-text-secondary)",
                cursor: "pointer",
                borderRadius: lang === "cs" ? "8px 0 0 8px" : "0 8px 8px 0",
                transition: "all 0.15s",
              }}
              aria-pressed={language === lang}
              aria-label={lang === "cs" ? "Čeština" : "English"}
            >
              {lang === "cs" ? "CZ" : "EN"}
            </button>
          ))}
        </div>

        {/* Uživatel */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 0",
            }}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: "var(--tv-text-main)",
                  lineHeight: 1.2,
                }}
              >
                {MOCK_USER.name}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--tv-text-secondary)",
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                {MOCK_USER.organization}
              </div>
            </div>

            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                overflow: "hidden",
                background: "var(--tv-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {MOCK_USER.avatar ? (
                <Image
                  src={MOCK_USER.avatar}
                  alt={MOCK_USER.name}
                  width={38}
                  height={38}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ color: "var(--tv-text-secondary)", opacity: 0.6 }}
                >
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M4 20c0-4 4-6 8-6s8 2 8 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>

            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                color: "var(--tv-text-secondary)",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                background: "var(--tv-background)",
                border: "1px solid var(--tv-border)",
                borderRadius: "var(--tv-radius-card)",
                boxShadow: "0 4px 16px var(--tv-card-shadow)",
                minWidth: 180,
                zIndex: 100,
                overflow: "hidden",
              }}
            >
              <Link
                href="/topvision"
                onClick={() => setDropdownOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 16px",
                  fontSize: 14,
                  color: "var(--tv-text-main)",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
              >
                Kurz Empatický leadership
              </Link>
              <Link
                href="/"
                onClick={() => setDropdownOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 16px",
                  fontSize: 14,
                  color: "var(--tv-text-main)",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
              >
                {t("header.dropdown.logout")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

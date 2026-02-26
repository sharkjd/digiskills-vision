"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import type { Language } from "@/context/LanguageContext";

const NAV_LINKS = [
  { labelKey: "header.nav.onlineCourses", href: "/moje-kurzy" },
  { labelKey: "header.nav.microlearning", href: "/microlearning" },
  { labelKey: "header.nav.assessment", href: "/assessment" },
];

type DropdownLink = { type: "link"; labelKey: string; href: string };
type DropdownGroup = {
  type: "group";
  labelKey: string;
  children: { labelKey: string; href: string }[];
};
type DropdownItem = DropdownLink | DropdownGroup;

const DROPDOWN_ITEMS: DropdownItem[] = [
  {
    type: "group",
    labelKey: "header.dropdown.statistics",
    children: [
      { labelKey: "header.dropdown.statisticsPersonal", href: "/profil" },
      { labelKey: "header.dropdown.statisticsTeam", href: "/manager" },
      { labelKey: "header.dropdown.statisticsCompany", href: "/firma/statistiky" },
    ],
  },
  {
    type: "group",
    labelKey: "header.dropdown.assessment",
    children: [
      { labelKey: "header.dropdown.assessmentIndividual", href: "/assessment/osobni" },
      { labelKey: "header.dropdown.assessmentCompany", href: "/firma" },
    ],
  },
  { type: "link", labelKey: "header.dropdown.notificationSettings", href: "/firma/nastaveni" },
  { type: "link", labelKey: "header.dropdown.adminModule", href: "/admin/kurzy" },
  { type: "link", labelKey: "header.dropdown.digiskillsCreator", href: "/creator" },
  { type: "link", labelKey: "header.dropdown.logout", href: "/odhlasit" },
];

const MOCK_USER = {
  name: "Honza Dolejš",
  organization: "Digiskills",
  avatar: "/images/avatar-honza-v2.png" as string | null,
  licenseExpiry: "31. 12. 2030",
};

export default function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();

  return (
    <header
      style={{
        background: "var(--color-background)",
        borderBottom: "1px solid var(--color-border)",
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
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            src="/images/digiskills-logo.png"
            alt="Digiskills"
            width={160}
            height={40}
            priority
            style={{ objectFit: "contain", height: "auto" }}
          />
        </Link>

        {/* Navigace + verze */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flex: 1,
            justifyContent: "center",
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  fontSize: 15,
                  fontWeight: isActive ? 800 : 500,
                  color: isActive
                    ? "var(--color-primary)"
                    : "var(--color-text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
          <span
            style={{
              marginLeft: 24,
              fontSize: "var(--font-size-meta)",
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              whiteSpace: "nowrap",
            }}
          >
            {t("header.licenseUntil")} {MOCK_USER.licenseExpiry}
          </span>
        </nav>

        {/* Přepínač jazyka CZ/EN */}
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
                border: "1px solid var(--color-border)",
                background: language === lang ? "var(--color-primary)" : "var(--color-background)",
                color: language === lang ? "white" : "var(--color-text-secondary)",
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
                  color: "var(--color-text-main)",
                  lineHeight: 1.2,
                }}
              >
                {MOCK_USER.name}
              </div>
              <div
                style={{
                  fontSize: "var(--font-size-meta)",
                  color: "var(--color-text-secondary)",
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
                background: "var(--color-border)",
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
                  style={{ color: "var(--color-text-secondary)", opacity: 0.6 }}
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
                color: "var(--color-text-secondary)",
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
                background: "var(--color-background)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-card)",
                boxShadow: "0 4px 16px var(--color-card-shadow)",
                minWidth: 180,
                zIndex: 100,
                overflow: "hidden",
              }}
            >
              {DROPDOWN_ITEMS.map((item, idx) => {
                if (item.type === "link") {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        display: "block",
                        padding: "10px 16px",
                        fontSize: 14,
                        color: "var(--color-text-main)",
                        textDecoration: "none",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--color-border)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {t(item.labelKey)}
                    </Link>
                  );
                }
                return (
                  <div key={`group-${idx}`}>
                    <div
                      style={{
                        padding: "8px 16px 4px",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "var(--color-text-secondary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {t(item.labelKey)}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setDropdownOpen(false)}
                        style={{
                          display: "block",
                          padding: "6px 16px 10px 24px",
                          fontSize: 14,
                          color: "var(--color-text-main)",
                          textDecoration: "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "var(--color-border)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {t(child.labelKey)}
                      </Link>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Online kurzy", href: "/kurzy" },
  { label: "Microlearning", href: "/microlearning" },
  { label: "Domů", href: "/" },
];

const MOCK_USER = {
  name: "Honza Dolejš",
  organization: "Digiskills",
  avatar: null as string | null,
  licenseExpiry: "31. 12. 2030",
};

export default function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
            width={140}
            height={36}
            priority
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Navigace + verze */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
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
                  fontWeight: isActive ? 700 : 400,
                  color: isActive
                    ? "var(--color-text-main)"
                    : "var(--color-text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <span
            style={{
              marginLeft: 16,
              fontSize: "var(--font-size-meta)",
              color: "var(--color-text-secondary)",
              whiteSpace: "nowrap",
            }}
          >
            Plná verze do {MOCK_USER.licenseExpiry}
          </span>
        </nav>

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
            {/* Avatar */}
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
                <Image
                  src="/images/digiskills-symbol.png"
                  alt="Uživatel"
                  width={24}
                  height={24}
                  style={{ objectFit: "contain", opacity: 0.5 }}
                />
              )}
            </div>

            {/* Jméno + org */}
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
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
                  lineHeight: 1.2,
                }}
              >
                {MOCK_USER.organization}
              </div>
            </div>

            {/* Šipka dolů */}
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

          {/* Dropdown menu */}
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
              {[
                { label: "Váš profil", href: "/profil" },
                { label: "Odhlásit se", href: "/odhlasit" },
              ].map((item) => (
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
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import "@/styles/topvision-tokens.css";

const FOOTER_LINKS = [
  { labelKey: "footer.digiskills", href: "/" },
  { labelKey: "footer.events", href: "/akce" },
  { labelKey: "footer.blog", href: "/blog" },
  { labelKey: "footer.contact", href: "/kontakt" },
  { labelKey: "footer.gdpr", href: "/gdpr" },
  { labelKey: "footer.topVision", href: "/topvision" },
  { labelKey: "footer.jipka", href: "/jipka" },
];

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function TopVisionFooter() {
  const { t } = useTranslation();

  return (
    <footer
      className="topvision-theme"
      style={{
        background: "var(--tv-background)",
        borderTop: "1px solid var(--tv-border)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <Link href="/topvision" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            src="/images/topvision-logo.png"
            alt="Top Vision"
            width={120}
            height={30}
            style={{ objectFit: "contain", height: "auto" }}
          />
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "4px 10px",
                fontSize: 14,
                color: "var(--tv-text-secondary)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--tv-text-main)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--tv-text-secondary)")
              }
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            style={{ color: "var(--tv-text-secondary)", transition: "color 0.15s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--tv-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--tv-text-secondary)")
            }
          >
            <FacebookIcon />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: "var(--tv-text-secondary)", transition: "color 0.15s" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--tv-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--tv-text-secondary)")
            }
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import "@/styles/jipka-tokens.css";

export default function JipkaFooter() {
  return (
    <footer
      className="jipka-theme"
      style={{
        background: "var(--jipka-background)",
        borderTop: "1px solid var(--jipka-border)",
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
        <Link href="/jipka" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img
            src="/images/logo-jipka.svg"
            alt="Jipka moje jazykovka"
            width={120}
            height={44}
            style={{ objectFit: "contain", height: "auto" }}
          />
        </Link>

        <span style={{ fontSize: 12, color: "var(--jipka-text-secondary)" }}>
          © 2015-26 EDUA Group s.r.o. Všechna práva vyhrazena.
        </span>
      </div>
    </footer>
  );
}

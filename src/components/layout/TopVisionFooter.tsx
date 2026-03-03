"use client";

import Image from "next/image";
import Link from "next/link";
import "@/styles/topvision-tokens.css";

export default function TopVisionFooter() {
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

        <span style={{ fontSize: 12, color: "var(--tv-text-secondary)" }}>
          © 2015-26 EDUA Group s.r.o. Všechna práva vyhrazena.
        </span>
      </div>
    </footer>
  );
}

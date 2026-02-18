import Link from "next/link";

export default function Home() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <h1
        style={{
          fontSize: "var(--font-size-page-title)",
          fontWeight: 700,
          color: "var(--color-text-main)",
          marginBottom: 8,
        }}
      >
        Digiskills portál
      </h1>
      <p
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "var(--font-size-body)",
          marginBottom: 40,
        }}
      >
        Vítejte v aplikaci Digiskills. Zjistěte úroveň svých digitálních dovedností a získejte doporučené kurzy.
      </p>

      <div
        style={{
          background: "var(--color-background)",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 2px 8px var(--color-card-shadow)",
          padding: "32px",
          maxWidth: 520,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#e8f4fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              flexShrink: 0,
            }}
          >
            📊
          </div>
          <div>
            <h2
              style={{
                fontSize: "var(--font-size-section-title)",
                fontWeight: 700,
                color: "var(--color-text-main)",
                marginBottom: 2,
              }}
            >
              Digitální Assessment
            </h2>
            <p style={{ fontSize: "var(--font-size-meta)", color: "var(--color-text-secondary)" }}>
              DigComp 2.1 · 8 kroků · ~5 minut
            </p>
          </div>
        </div>
        <p
          style={{
            fontSize: "var(--font-size-body)",
            color: "var(--color-text-secondary)",
            marginBottom: 24,
            lineHeight: 1.65,
          }}
        >
          Otestujte své digitální kompetence v 5 oblastech: informační gramotnost, komunikace,
          tvorba obsahu, bezpečnost a řešení problémů. Na základě výsledků získáte doporučené kurzy.
        </p>
        <Link
          href="/assessment"
          style={{
            display: "inline-block",
            padding: "10px 28px",
            background: "var(--color-primary)",
            color: "white",
            borderRadius: "var(--radius-btn)",
            fontWeight: 600,
            fontSize: "var(--font-size-body)",
            textDecoration: "none",
          }}
        >
          Spustit assessment →
        </Link>
      </div>
    </div>
  );
}

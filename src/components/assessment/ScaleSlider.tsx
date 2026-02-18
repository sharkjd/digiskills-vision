"use client";

interface ScaleSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export default function ScaleSlider({ value, onChange, label }: ScaleSliderProps) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p
        style={{
          fontSize: "var(--font-size-body)",
          color: "var(--color-text-main)",
          fontWeight: 500,
          marginBottom: 16,
          lineHeight: 1.6,
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontSize: "var(--font-size-meta)",
            color: "var(--color-text-secondary)",
            minWidth: 44,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          1<br />
          <span style={{ fontSize: 10 }}>Méně</span>
        </span>
        <input
          type="range"
          min={1}
          max={10}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            flex: 1,
            accentColor: "var(--color-primary)",
            cursor: "pointer",
            height: 6,
          }}
        />
        <span
          style={{
            fontSize: "var(--font-size-meta)",
            color: "var(--color-text-secondary)",
            minWidth: 44,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          10<br />
          <span style={{ fontSize: 10 }}>Více</span>
        </span>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "var(--color-primary)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 20,
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(26, 155, 230, 0.3)",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

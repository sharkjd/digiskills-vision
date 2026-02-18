"use client";

interface CheckboxGroupProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function CheckboxGroup({ label, options, selected, onChange }: CheckboxGroupProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div
      style={{
        marginTop: 32,
        paddingTop: 28,
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <p
        style={{
          fontSize: "var(--font-size-body)",
          color: "var(--color-text-main)",
          fontWeight: 600,
          marginBottom: 14,
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((option) => {
          const isChecked = selected.includes(option);
          return (
            <label
              key={option}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: "var(--radius-input)",
                border: `1px solid ${isChecked ? "var(--color-primary)" : "var(--color-border)"}`,
                background: isChecked ? "#f0f8ff" : "var(--color-background)",
                cursor: "pointer",
                transition: "border-color 0.15s ease, background 0.15s ease",
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(option)}
                style={{
                  accentColor: "var(--color-primary)",
                  width: 18,
                  height: 18,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "var(--font-size-body)",
                  color: "var(--color-text-main)",
                }}
              >
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

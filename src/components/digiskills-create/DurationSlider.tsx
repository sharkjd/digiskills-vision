"use client";

import { motion } from "framer-motion";

export const DURATION_OPTIONS = [
  "Rychlovka (15 min)",
  "Krátký (30 min)",
  "Střední (1 h)",
  "Rozsáhlý (1,5 h)",
  "Hloubkový ponor (2 h+)",
] as const;

interface DurationSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function DurationSlider({ value, onChange }: DurationSliderProps) {
  const percentage = (value / (DURATION_OPTIONS.length - 1)) * 100;

  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontSize: 11,
            color: "var(--color-text-secondary)",
            minWidth: 40,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Krátký
        </span>

        <div
          style={{
            flex: 1,
            height: 8,
            background: "var(--color-border)",
            borderRadius: 999,
            position: "relative",
            cursor: "pointer",
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const pct = x / rect.width;
            const idx = Math.round(pct * (DURATION_OPTIONS.length - 1));
            onChange(Math.max(0, Math.min(DURATION_OPTIONS.length - 1, idx)));
          }}
        >
          <motion.div
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              background: "var(--color-primary)",
              borderRadius: 999,
            }}
          />

          <motion.div
            animate={{ left: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 22,
              height: 22,
              background: "var(--color-background)",
              borderRadius: "50%",
              boxShadow: "0 2px 8px var(--color-card-shadow)",
              cursor: "grab",
              zIndex: 10,
            }}
          />
        </div>

        <span
          style={{
            fontSize: 11,
            color: "var(--color-text-secondary)",
            minWidth: 40,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Dlouhý
        </span>

        <motion.div
          key={value}
          initial={{ scale: 1.2, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
          style={{
            padding: "6px 12px",
            borderRadius: "var(--radius-btn)",
            background: "var(--color-primary)",
            color: "white",
            fontSize: 12,
            fontWeight: 700,
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(37, 150, 255, 0.35)",
          }}
        >
          {DURATION_OPTIONS[value]}
        </motion.div>
      </div>
    </div>
  );
}

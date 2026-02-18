"use client";

import { motion } from "framer-motion";

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
        borderTop: "1px solid #E5E7EB",
      }}
    >
      <p
        style={{
          fontSize: 15,
          color: "#040E3C",
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {options.map((option) => {
          const isChecked = selected.includes(option);
          return (
            <motion.label
              key={option}
              whileHover={{ scale: 1.02, boxShadow: "0 4px 16px rgba(37, 150, 255, 0.12)" }}
              whileTap={{ scale: 0.98 }}
              animate={
                isChecked
                  ? { boxShadow: "0 0 0 2px rgba(37, 150, 255, 0.3)" }
                  : { boxShadow: "0 0 0 0 rgba(37, 150, 255, 0)" }
              }
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                borderRadius: 12,
                border: isChecked ? "2px solid #2596FF" : "1px solid #E5E7EB",
                background: isChecked ? "rgba(37, 150, 255, 0.05)" : "white",
                cursor: "pointer",
                transition: "border-color 0.15s ease, background 0.15s ease",
              }}
            >
              {/* Custom checkbox */}
              <motion.div
                animate={{
                  backgroundColor: isChecked ? "#2596FF" : "white",
                  borderColor: isChecked ? "#2596FF" : "#D1D5DB",
                }}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  border: "2px solid",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background-color 0.15s ease, border-color 0.15s ease",
                }}
              >
                <motion.svg
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isChecked ? 1 : 0,
                    opacity: isChecked ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M2.5 7L5.5 10L11.5 4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.div>

              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(option)}
                style={{ display: "none" }}
              />

              <span
                style={{
                  fontSize: 15,
                  color: "#040E3C",
                  flex: 1,
                }}
              >
                {option}
              </span>

              {/* Selection indicator */}
              {isChecked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#2596FF",
                    flexShrink: 0,
                  }}
                />
              )}
            </motion.label>
          );
        })}
      </div>
    </div>
  );
}

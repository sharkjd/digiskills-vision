"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScaleSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export default function ScaleSlider({ value, onChange, label }: ScaleSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  }, []);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newValue = Math.round(percentage * 9) + 1;
    onChange(Math.max(1, Math.min(10, newValue)));
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!trackRef.current || !isDragging) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = x / rect.width;
    const newValue = Math.round(percentage * 9) + 1;
    onChange(Math.max(1, Math.min(10, newValue)));
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleDrag(e);
      const handleTouchMove = (e: TouchEvent) => handleDrag(e);
      const handleEnd = () => setIsDragging(false);

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchend", handleEnd);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("mouseup", handleEnd);
        window.removeEventListener("touchend", handleEnd);
      };
    }
  }, [isDragging]);

  const percentage = ((value - 1) / 9) * 100;

  return (
    <div style={{ marginBottom: 18 }}>
      <p
        style={{
          fontSize: 13,
          color: "#040E3C",
          fontWeight: 500,
          marginBottom: 10,
          lineHeight: 1.45,
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontSize: 11,
            color: "#6B7280",
            minWidth: 28,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          1<br />
          <span style={{ fontSize: 9, opacity: 0.7 }}>Méně</span>
        </span>

        {/* Custom slider track */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          style={{
            flex: 1,
            height: 6,
            background: "#E5E7EB",
            borderRadius: 999,
            position: "relative",
            cursor: "pointer",
          }}
        >
          {/* Active fill */}
          <motion.div
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              background: "#2596FF",
              borderRadius: 999,
            }}
          />

          {/* Thumb with tooltip */}
          <motion.div
            animate={{ left: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 20,
              height: 20,
              background: "white",
              borderRadius: "50%",
              boxShadow: isDragging
                ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                : "0 2px 8px rgba(0, 0, 0, 0.15)",
              cursor: isDragging ? "grabbing" : "grab",
              zIndex: 10,
              transition: "box-shadow 0.15s ease",
            }}
          >
            {/* Tooltip above thumb */}
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.8 }}
              animate={{
                opacity: isDragging ? 1 : 0,
                y: isDragging ? 0 : 5,
                scale: isDragging ? 1 : 0.8,
              }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 8px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#2596FF",
                color: "white",
                padding: "3px 8px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                whiteSpace: "nowrap",
                boxShadow: "0 2px 8px rgba(37, 150, 255, 0.3)",
              }}
            >
              {value}
              <div
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid #2596FF",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Step markers */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              transform: "translateY(-50%)",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 2px",
              pointerEvents: "none",
            }}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: i + 1 <= value ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.1)",
                }}
              />
            ))}
          </div>
        </div>

        <span
          style={{
            fontSize: 11,
            color: "#6B7280",
            minWidth: 28,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          10<br />
          <span style={{ fontSize: 9, opacity: 0.7 }}>Více</span>
        </span>

        {/* Value badge with pulse animation */}
        <motion.div
          key={value}
          initial={{ scale: 1.3, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#2596FF",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 17,
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(37, 150, 255, 0.35)",
          }}
        >
          {value}
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

interface DropZoneProps {
  files: File[];
  onChange: (files: File[]) => void;
}

export default function DropZone({ files, onChange }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const dropped = Array.from(e.dataTransfer.files);
      onChange([...files, ...dropped]);
    },
    [files, onChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files ? Array.from(e.target.files) : [];
      onChange([...files, ...selected]);
      e.target.value = "";
    },
    [files, onChange]
  );

  const removeFile = useCallback(
    (index: number) => {
      onChange(files.filter((_, i) => i !== index));
    },
    [files, onChange]
  );

  return (
    <div style={{ width: "100%" }}>
      <motion.div
        whileHover={{ borderColor: "var(--color-primary)", backgroundColor: "rgba(37, 150, 255, 0.03)" }}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed var(--color-border-input)",
          borderRadius: "var(--radius-card)",
          padding: "32px 24px",
          textAlign: "center",
          cursor: "pointer",
          transition: "border-color 0.2s, background 0.2s",
          backgroundColor: "var(--color-breeze)",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Upload
          style={{
            width: 48,
            height: 48,
            color: "var(--color-text-secondary)",
            marginBottom: 12,
            display: "block",
            margin: "0 auto 12px",
          }}
        />
        <p
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "var(--color-text-main)",
            marginBottom: 4,
          }}
        >
          Přetáhněte soubory sem nebo klikněte pro výběr
        </p>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
          PDF, Word, PowerPoint – vaše materiály a know-how
        </p>
      </motion.div>

      {files.length > 0 && (
        <div style={{ marginTop: 12 }}>
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                background: "var(--color-breeze)",
                borderRadius: "var(--radius-btn)",
                marginBottom: 6,
                fontSize: 13,
                color: "var(--color-text-main)",
              }}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {file.name}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  fontSize: 12,
                  padding: "2px 6px",
                }}
              >
                Odebrat
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

type JipkaVideoContentProps = {
  title: string;
};

const VIDEO_CONTENT = {
  youtubeEmbedId: "mTpqbxNfLMA",
  description:
    "V tomto videu se dozvíte, co přesně znamená úroveň B2 podle Společného evropského referenčního rámce (CEFR) a jaké dovednosti byste měli ovládat. Zjistíte také praktické tipy, jak na této úrovni efektivně pokračovat ve studiu angličtiny.",
};

export function JipkaVideoContent({ title }: JipkaVideoContentProps) {
  const content = VIDEO_CONTENT;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--jipka-border)",
        marginTop: 16,
      }}
    >
      <div style={{ padding: "20px 0 0" }}>
        <div
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            aspectRatio: "16/9",
            marginBottom: 20,
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${content.youtubeEmbedId}?rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--jipka-text-secondary)",
            margin: 0,
          }}
        >
          {content.description}
        </p>
      </div>
    </motion.div>
  );
}

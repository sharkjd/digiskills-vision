"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import Image from "next/image";

type VideoActivityProps = {
  activityId: number;
  title: string;
};

type RecommendedItem = {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
};

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

const ACTIVITY_CONTENT: Record<
  number,
  {
    videoThumbnail: string;
    videoDuration: string;
    description: string;
    instructorImage?: string;
    instructorName?: string;
    sectionTitle: string;
    recommended: RecommendedItem[];
    youtubeEmbedId?: string;
  }
> = {
  1: {
    videoThumbnail: "/courses/teams.webp",
    videoDuration: "8:32",
    youtubeEmbedId: "FBmWaxir8Dg",
    instructorImage: "/avatars/honza.jpg",
    instructorName: "Honza Dolejš",
    description:
      "Vývoj je neustále vpředu a s novými nástroji můžete pracovat rychleji i chytřeji. V tomto videu se podíváme na to, jak se technologie mění a jak s tím držet krok. Zjistíte, že adaptace na nové nástroje není tak složitá, jak se může zdát.",
    sectionTitle: "Doporučené kurzy",
    recommended: [],
  },
  2: {
    videoThumbnail: "/courses/digital-mindset.png",
    videoDuration: "6:15",
    description:
      "Technologie jako dobrý sluha, ale zlý pán. Naučte se, jak si udržet zdravý vztah s digitálními nástroji a jak je využívat efektivně, aniž byste se stali jejich otroky. Digitální mindset je o rovnováze mezi využíváním technologií a zachováním lidského přístupu.",
    sectionTitle: "Pro více informací",
    recommended: [
      {
        id: 4,
        title: "Digitální wellbeing",
        thumbnail: "/courses/AI.webp",
        duration: "1h 30m",
      },
      {
        id: 5,
        title: "Focus a produktivita",
        thumbnail: "/courses/excel.webp",
        duration: "2h 00m",
      },
    ],
  },
};

export function VideoActivityContent({ activityId, title }: VideoActivityProps) {
  const content = ACTIVITY_CONTENT[activityId];

  if (!content) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--color-border)",
        marginTop: 16,
      }}
    >
      <div style={{ padding: "20px 0 0" }}>
        {/* Video přehrávač */}
        {content.youtubeEmbedId ? (
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
        ) : (
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={HOVER_TRANSITION}
            style={{
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              aspectRatio: "16/9",
              backgroundColor: "#1a1a2e",
              cursor: "pointer",
              marginBottom: 20,
            }}
          >
            <Image
              src={content.videoThumbnail}
              alt={title}
              fill
              style={{ objectFit: "cover", opacity: 0.85 }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
              }}
            />

            {/* Play tlačítko */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 72,
                height: 72,
                borderRadius: "50%",
                backgroundColor: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 32px rgba(37, 150, 255, 0.4)",
              }}
            >
              <Play size={32} fill="white" color="white" style={{ marginLeft: 4 }} />
            </motion.div>

            {/* Doba trvání */}
            <div
              style={{
                position: "absolute",
                bottom: 12,
                right: 12,
                padding: "6px 12px",
                borderRadius: 6,
                backgroundColor: "rgba(0,0,0,0.75)",
                color: "white",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {content.videoDuration}
            </div>

            {/* Instructor badge */}
            {content.instructorImage && (
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 14px 8px 8px",
                  borderRadius: 999,
                  backgroundColor: "rgba(255,255,255,0.95)",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "var(--color-breeze)",
                  }}
                >
                  <Image
                    src={content.instructorImage}
                    alt={content.instructorName || ""}
                    width={32}
                    height={32}
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--color-text-main)",
                  }}
                >
                  {content.instructorName}
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* Popis videa */}
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--color-text-secondary)",
            margin: "0 0 24px",
          }}
        >
          {content.description}
        </p>

        {/* Doporučené kurzy */}
        {content.recommended.length > 0 && (
        <div>
          <h4
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--color-text-main)",
              margin: "0 0 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {content.sectionTitle}
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 16,
            }}
          >
            {content.recommended.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                transition={HOVER_TRANSITION}
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  backgroundColor: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16/9",
                    backgroundColor: "var(--color-breeze)",
                  }}
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 6,
                      right: 6,
                      padding: "3px 8px",
                      borderRadius: 4,
                      backgroundColor: "rgba(0,0,0,0.7)",
                      color: "white",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {item.duration}
                  </div>
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--color-text-main)",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {item.title}
                    <ExternalLink size={12} color="var(--color-text-secondary)" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        )}
      </div>
    </motion.div>
  );
}

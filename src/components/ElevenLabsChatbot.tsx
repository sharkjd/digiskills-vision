"use client";

import Script from "next/script";
import { createElement } from "react";

const AGENT_ID = "agent_3201khwyws28fcb8v129dstv35mf";

export default function ElevenLabsChatbot() {
  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
      />
      {createElement("elevenlabs-convai", { "agent-id": AGENT_ID })}
    </>
  );
}

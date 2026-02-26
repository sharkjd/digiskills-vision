import { NextResponse } from "next/server";

const ELEVENLABS_URL = "https://api.elevenlabs.io/v1/convai/twilio/outbound-call";

const VOICE_CALL_BODY = {
  agent_id: "agent_7801kbdbv0ktexbs9y7pjhktb477",
  agent_phone_number_id: "phnum_4401khxajv70f9dtmrjb5snvt054",
  to_number: "+420777015994",
  conversation_initiation_client_data: {
    dynamic_variables: {
      jmeno_klienta: "Honzo",
      pohlavi: "muž",
      webinar: "nic",
    },
  },
};

export async function POST() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ELEVENLABS_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(ELEVENLABS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify(VOICE_CALL_BODY),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: text || `ElevenLabs API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

"use client";

import { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/context/LanguageContext";

import csMessages from "@/messages/cs.json";
import enMessages from "@/messages/en.json";

const messages: Record<Language, Record<string, unknown>> = {
  cs: csMessages as Record<string, unknown>,
  en: enMessages as Record<string, unknown>,
};

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

function interpolate(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    return String(params[key] ?? `{${key}}`);
  });
}

export function useTranslation() {
  const { language, setLanguage } = useLanguage();
  const t = useMemo(() => {
    const dict = messages[language] ?? messages.cs;
    return (key: string, params?: Record<string, string | number>): string => {
      const value = getNested(dict, key);
      const str = value ?? key;
      return params ? interpolate(str, params) : str;
    };
  }, [language]);

  return { t, language, setLanguage };
}

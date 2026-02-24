"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function LangSync() {
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  return null;
}

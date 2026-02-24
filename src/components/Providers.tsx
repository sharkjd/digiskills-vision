"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { RecommendedCoursesProvider } from "@/context/RecommendedCoursesContext";
import { CompanyCoursesProvider } from "@/context/CompanyCoursesContext";
import LangSync from "@/components/LangSync";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LangSync />
      <RecommendedCoursesProvider>
        <CompanyCoursesProvider>
          {children}
        </CompanyCoursesProvider>
      </RecommendedCoursesProvider>
    </LanguageProvider>
  );
}

"use client";

import { ReactNode } from "react";
import { RecommendedCoursesProvider } from "@/context/RecommendedCoursesContext";
import { CompanyCoursesProvider } from "@/context/CompanyCoursesContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <RecommendedCoursesProvider>
      <CompanyCoursesProvider>
        {children}
      </CompanyCoursesProvider>
    </RecommendedCoursesProvider>
  );
}

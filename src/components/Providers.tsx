"use client";

import { ReactNode } from "react";
import { RecommendedCoursesProvider } from "@/context/RecommendedCoursesContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <RecommendedCoursesProvider>
      {children}
    </RecommendedCoursesProvider>
  );
}

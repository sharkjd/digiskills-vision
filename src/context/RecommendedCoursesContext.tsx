"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Course } from "@/data/courses";

type RecommendedCoursesContextType = {
  recommendedCourses: Course[];
  setRecommendedCourses: (courses: Course[]) => void;
};

const RecommendedCoursesContext = createContext<RecommendedCoursesContextType | undefined>(undefined);

export function RecommendedCoursesProvider({ children }: { children: ReactNode }) {
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);

  return (
    <RecommendedCoursesContext.Provider value={{ recommendedCourses, setRecommendedCourses }}>
      {children}
    </RecommendedCoursesContext.Provider>
  );
}

export function useRecommendedCourses() {
  const context = useContext(RecommendedCoursesContext);
  if (context === undefined) {
    throw new Error("useRecommendedCourses must be used within a RecommendedCoursesProvider");
  }
  return context;
}

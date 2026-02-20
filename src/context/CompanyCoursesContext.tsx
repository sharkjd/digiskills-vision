"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Course } from "@/data/courses";

type CompanyCoursesContextType = {
  companyCourses: Course[];
  setCompanyCourses: (courses: Course[]) => void;
};

const CompanyCoursesContext = createContext<CompanyCoursesContextType | undefined>(undefined);

export function CompanyCoursesProvider({ children }: { children: ReactNode }) {
  const [companyCourses, setCompanyCourses] = useState<Course[]>([]);

  return (
    <CompanyCoursesContext.Provider value={{ companyCourses, setCompanyCourses }}>
      {children}
    </CompanyCoursesContext.Provider>
  );
}

export function useCompanyCourses() {
  const context = useContext(CompanyCoursesContext);
  if (context === undefined) {
    throw new Error("useCompanyCourses must be used within a CompanyCoursesProvider");
  }
  return context;
}

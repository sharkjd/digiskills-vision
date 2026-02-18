"use client";

import React from "react";
import { useRecommendedCourses } from "@/context/RecommendedCoursesContext";
import { COURSE_LIST, COMPLETED_COURSES } from "@/data/courses";
import CatalogCourseCard from "@/components/courses/CatalogCourseCard";
import CompletedCourseCard from "@/components/courses/CompletedCourseCard";

export default function MojeKurzyPage() {
  const { recommendedCourses } = useRecommendedCourses();

  const coursesToShow = recommendedCourses.length > 0 
    ? recommendedCourses 
    : COURSE_LIST.slice(0, 6);

  return (
    <div
      className="min-h-screen"
      style={{ 
        backgroundColor: "#F4F5FA",
        fontFamily: "var(--font-montserrat), Montserrat, sans-serif"
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hlavní nadpis */}
        <h1
          className="text-4xl font-bold italic mb-8"
          style={{ color: "#040E3C" }}
        >
          Moje doporučené studium
        </h1>

        {/* Filtrační lišta */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Dropdown Řazení */}
          <div className="flex flex-col gap-1">
            <label 
              className="text-xs font-medium"
              style={{ color: "#6c757d" }}
            >
              Řazení
            </label>
            <select
              className="px-4 py-2.5 rounded-lg border text-sm min-w-40"
              style={{ 
                backgroundColor: "#fff",
                borderColor: "#e9ecef",
                color: "#040E3C"
              }}
              defaultValue="default"
            >
              <option value="default">Výchozí</option>
              <option value="name">Podle názvu</option>
              <option value="duration">Podle délky</option>
            </select>
          </div>

          {/* Dropdown Role */}
          <div className="flex flex-col gap-1">
            <label 
              className="text-xs font-medium"
              style={{ color: "#6c757d" }}
            >
              Role
            </label>
            <select
              className="px-4 py-2.5 rounded-lg border text-sm min-w-40"
              style={{ 
                backgroundColor: "#fff",
                borderColor: "#e9ecef",
                color: "#040E3C"
              }}
              defaultValue="default"
            >
              <option value="default">Výchozí</option>
              <option value="manager">Manažer</option>
              <option value="specialist">Specialista</option>
              <option value="assistant">Asistent</option>
            </select>
          </div>

          {/* Vyhledávací pole */}
          <div className="flex flex-col gap-1 flex-1 max-w-md">
            <label 
              className="text-xs font-medium"
              style={{ color: "#6c757d" }}
            >
              Vyhledat kurz
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Hledat..."
                className="w-full px-4 py-2.5 pl-10 rounded-lg border text-sm"
                style={{ 
                  backgroundColor: "#fff",
                  borderColor: "#e9ecef",
                  color: "#040E3C"
                }}
              />
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#6c757d" }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Grid doporučených kurzů - 3 sloupce */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {coursesToShow.map((course, index) => (
            <CatalogCourseCard 
              key={course.id} 
              course={course} 
              index={index} 
            />
          ))}
        </div>

        {/* Oddělovač */}
        <div 
          className="h-px mb-10"
          style={{ backgroundColor: "#e9ecef" }}
        />

        {/* Sekce absolvovaných kurzů */}
        <div>
          <h2
            className="text-2xl font-bold italic mb-6"
            style={{ color: "#040E3C" }}
          >
            Již absolvované kurzy
          </h2>

          {/* Grid absolvovaných kurzů - 2 karty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {COMPLETED_COURSES.map((course) => (
              <CompletedCourseCard 
                key={course.id} 
                course={course} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

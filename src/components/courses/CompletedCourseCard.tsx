"use client";

import React from "react";
import Image from "next/image";
import { Course } from "@/data/courses";

type CompletedCourseCardProps = {
  course: Course;
};

export default function CompletedCourseCard({ course }: CompletedCourseCardProps) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col h-full opacity-75"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
    >
      {/* Obrázek s overlay a checkmarkem */}
      <div className="relative h-44 flex-shrink-0 bg-gray-100">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Zelený overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(16, 185, 129, 0.85)" }}
        >
          {/* Checkmark ikona */}
          <div className="flex flex-col items-center gap-2">
            <div 
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            >
              <svg 
                className="w-8 h-8" 
                style={{ color: "#10B981" }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <span className="text-white font-bold text-lg">Hotovo</span>
          </div>
        </div>
        {/* Digiskills badge – logo (bílá poloprůhledná) */}
        <div
          className="absolute top-3 right-3 flex items-center px-2 py-1.5 rounded-md"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
        >
          <Image
            src="/Screenshots/Digiskills-logo.png"
            alt="Digiskills"
            width={100}
            height={24}
            className="object-contain h-5 w-auto"
          />
        </div>
      </div>

      {/* Obsah karty */}
      <div className="p-5 flex flex-col flex-1">
        {/* Nadpis */}
        <h3
          className="text-lg font-bold mb-2 leading-tight"
          style={{ 
            color: "#040E3C",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif"
          }}
        >
          {course.title}
        </h3>

        {/* Popis */}
        <p
          className="text-sm leading-relaxed flex-1 mb-4"
          style={{ color: "#6c757d" }}
        >
          {course.description}
        </p>

        {/* Spodní lišta - metadata a tlačítko */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span
            className="text-xs"
            style={{ color: "#6c757d" }}
          >
            {course.activities} aktivit, cca {course.duration}
          </span>
          <button
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: "#10B981" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#059669")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#10B981")}
          >
            Zobrazit
          </button>
        </div>
      </div>
    </div>
  );
}

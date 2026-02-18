"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/data/courses";

type CatalogCourseCardProps = {
  course: Course;
  index: number;
};

export default function CatalogCourseCard({ course, index }: CatalogCourseCardProps) {
  return (
    <Link
      href={`/kurz/${course.id}`}
      className="bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
    >
      {/* Obrázek s badge */}
      <div className="relative h-44 flex-shrink-0 bg-gray-100">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
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
        {/* Nadpis s číslem */}
        <h3
          className="text-lg font-bold mb-2 leading-tight"
          style={{ 
            color: "#040E3C",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif"
          }}
        >
          {index + 1}. {course.title}
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
          <span
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: "#2596FF" }}
          >
            Zobrazit
          </span>
        </div>
      </div>
    </Link>
  );
}

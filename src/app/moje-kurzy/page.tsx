"use client";

import React from "react";
import { useRecommendedCourses } from "@/context/RecommendedCoursesContext";
import { useCompanyCourses } from "@/context/CompanyCoursesContext";
import { useLanguage } from "@/context/LanguageContext";
import { getCourseList, getCompletedCourses } from "@/data/courses";
import { useTranslation } from "@/hooks/useTranslation";
import CatalogCourseCard from "@/components/courses/CatalogCourseCard";
import CompletedCourseCard from "@/components/courses/CompletedCourseCard";

export default function MojeKurzyPage() {
  const { recommendedCourses } = useRecommendedCourses();
  const { companyCourses } = useCompanyCourses();
  const { language } = useLanguage();
  const { t } = useTranslation();

  const courseList = getCourseList(language);
  const completedList = getCompletedCourses(language);

  const myCourses =
    recommendedCourses.length > 0 ? recommendedCourses : courseList.slice(0, 5);

  const mandatoryCompanyCourses =
    companyCourses.length > 0 ? companyCourses : courseList.slice(5, 10);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F4F5FA",
        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <section className="mb-12">
          <h1
            className="text-4xl font-bold italic mb-8"
            style={{ color: "#040E3C" }}
          >
            {t("courses.myCourses")}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <label
                className="text-xs font-medium"
                style={{ color: "#6c757d" }}
              >
                {t("courses.sortBy")}
              </label>
              <select
                className="px-4 py-2.5 rounded-lg border text-sm min-w-40"
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#e9ecef",
                  color: "#040E3C",
                }}
                defaultValue="default"
              >
                <option value="default">{t("courses.sortDefault")}</option>
                <option value="name">{t("courses.sortByName")}</option>
                <option value="duration">{t("courses.sortByDuration")}</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="text-xs font-medium"
                style={{ color: "#6c757d" }}
              >
                {t("courses.role")}
              </label>
              <select
                className="px-4 py-2.5 rounded-lg border text-sm min-w-40"
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#e9ecef",
                  color: "#040E3C",
                }}
                defaultValue="default"
              >
                <option value="default">{t("courses.sortDefault")}</option>
                <option value="manager">{t("courses.roleManager")}</option>
                <option value="specialist">{t("courses.roleSpecialist")}</option>
                <option value="assistant">{t("courses.roleAssistant")}</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 flex-1 max-w-md">
              <label
                className="text-xs font-medium"
                style={{ color: "#6c757d" }}
              >
                {t("courses.searchCourse")}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("courses.searchPlaceholder")}
                  className="w-full px-4 py-2.5 pl-10 rounded-lg border text-sm"
                  style={{
                    backgroundColor: "#fff",
                    borderColor: "#e9ecef",
                    color: "#040E3C",
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((course, index) => (
              <CatalogCourseCard
                key={course.id}
                course={course}
                index={index}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2
            className="text-2xl font-bold italic mb-6"
            style={{ color: "#040E3C" }}
          >
            {t("courses.mandatoryCompany")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mandatoryCompanyCourses.map((course, index) => (
              <CatalogCourseCard
                key={course.id}
                course={course}
                index={index}
              />
            ))}
          </div>
        </section>

        <div
          className="h-px mb-10"
          style={{ backgroundColor: "#e9ecef" }}
        />

        <div>
          <h2
            className="text-2xl font-bold italic mb-6"
            style={{ color: "#040E3C" }}
          >
            {t("courses.completed")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {completedList.map((course) => (
              <CompletedCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { asset } from "@/lib/paths";

const HOVER_TRANSITION = { duration: 0.3, ease: "easeOut" as const };

const DIGCOMP_LABEL_KEYS = [
  "companyReport.digcompInfo",
  "companyReport.digcompContent",
  "companyReport.digcompProblems",
  "companyReport.digcompComm",
  "companyReport.digcompSecurity",
] as const;

const LEVEL_GROUP_KEYS = [
  "companyReport.beginners",
  "companyReport.intermediate",
  "companyReport.advanced",
  "companyReport.experts",
] as const;

type DepartmentKey = "all" | "it" | "marketing" | "finance" | "sales" | "hr";

interface DepartmentData {
  name: string;
  label: string;
  respondents: number;
  companyIndex: number;
  digcompScores: number[];
  talentDistribution: { level: number; count: number }[];
  levelGroups: { percent: number; top30: number }[];
  improvementPriorities: { area: string; count: number }[];
  ambassadors: { name: string; index: number }[];
  m365Proficiency: { app: string; usage: number; proficiency: number }[];
  superpower: { title: string; score: number; description: string };
  growthArea: { title: string; score: number; marketAvg: number; description: string };
}

const DEPARTMENTS_DATA: Record<DepartmentKey, DepartmentData> = {
  all: {
    name: "VIG CZ",
    label: "Celá firma",
    respondents: 2534,
    companyIndex: 6.59,
    digcompScores: [6.4, 4.4, 4.7, 5.4, 6.5],
    talentDistribution: [
      { level: 1, count: 13 },
      { level: 2, count: 117 },
      { level: 3, count: 240 },
      { level: 4, count: 341 },
      { level: 5, count: 436 },
      { level: 6, count: 535 },
      { level: 7, count: 419 },
      { level: 8, count: 307 },
      { level: 9, count: 104 },
      { level: 10, count: 22 },
    ],
    levelGroups: [
      { percent: 28, top30: 18 },
      { percent: 38, top30: 23 },
      { percent: 29, top30: 39 },
      { percent: 5, top30: 20 },
    ],
    improvementPriorities: [
      { area: "Automatizace rutinní práce", count: 1288 },
      { area: "Zapojení AI do každodenní práce", count: 1281 },
      { area: "Zvládání složitých procesů", count: 962 },
      { area: "Sdílení informací a know-how", count: 843 },
      { area: "Přehled úkolů a práce na projektech", count: 533 },
    ],
    ambassadors: [
      { name: "Marie Nováková", index: 9.2 },
      { name: "Petr Svoboda", index: 8.7 },
      { name: "Eva Horáková", index: 8.4 },
      { name: "Jan Procházka", index: 8.1 },
      { name: "Lucie Dvořáková", index: 7.9 },
    ],
    m365Proficiency: [
      { app: "Outlook", usage: 9.1, proficiency: 7.6 },
      { app: "Word", usage: 8.2, proficiency: 7.7 },
      { app: "Excel", usage: 8.0, proficiency: 7.2 },
      { app: "Teams", usage: 7.4, proficiency: 6.3 },
      { app: "OneDrive", usage: 7.0, proficiency: 5.7 },
      { app: "SharePoint", usage: 5.7, proficiency: 4.7 },
      { app: "OneNote", usage: 4.7, proficiency: 4.3 },
      { app: "ToDo", usage: 4.5, proficiency: 4.2 },
      { app: "Power BI", usage: 2.9, proficiency: 2.6 },
      { app: "Forms", usage: 2.7, proficiency: 2.7 },
      { app: "Planner", usage: 2.3, proficiency: 2.2 },
      { app: "Copilot", usage: 3.8, proficiency: 3.2 },
    ],
    superpower: {
      title: "Digitální bezpečnost",
      score: 6.5,
      description: "V této oblasti je firma nad průměrem trhu. Skóre 6,5 ukazuje, že zaměstnanci mají solidní základ v ochraně dat a kybernetické bezpečnosti. Interní bezpečnostní kultura je zdravá.",
    },
    growthArea: {
      title: "Tvorba digitálního obsahu",
      score: 4.4,
      marketAvg: 5.9,
      description: "Zde má firma největší potenciál se zlepšit. Aktuální skóre 4,4 výrazně zaostává za průměrem trhu (5,9). Cílené kurzy v této oblasti přinesou nejvyšší ROI vzdělávacích investic.",
    },
  },
  it: {
    name: "IT & Vývoj",
    label: "IT & Vývoj",
    respondents: 312,
    companyIndex: 7.84,
    digcompScores: [7.8, 6.2, 7.5, 6.1, 8.2],
    talentDistribution: [
      { level: 1, count: 0 },
      { level: 2, count: 5 },
      { level: 3, count: 12 },
      { level: 4, count: 28 },
      { level: 5, count: 35 },
      { level: 6, count: 48 },
      { level: 7, count: 72 },
      { level: 8, count: 68 },
      { level: 9, count: 32 },
      { level: 10, count: 12 },
    ],
    levelGroups: [
      { percent: 14, top30: 18 },
      { percent: 27, top30: 23 },
      { percent: 45, top30: 39 },
      { percent: 14, top30: 20 },
    ],
    improvementPriorities: [
      { area: "Zapojení AI do každodenní práce", count: 187 },
      { area: "Automatizace rutinní práce", count: 156 },
      { area: "Sdílení informací a know-how", count: 134 },
      { area: "Zvládání složitých procesů", count: 98 },
      { area: "Přehled úkolů a práce na projektech", count: 67 },
    ],
    ambassadors: [
      { name: "Tomáš Černý", index: 9.6 },
      { name: "Pavel Kovář", index: 9.3 },
      { name: "Martin Jelínek", index: 9.1 },
      { name: "Jakub Novotný", index: 8.9 },
      { name: "Ondřej Marek", index: 8.7 },
    ],
    m365Proficiency: [
      { app: "Outlook", usage: 8.5, proficiency: 7.9 },
      { app: "Word", usage: 6.8, proficiency: 7.2 },
      { app: "Excel", usage: 7.2, proficiency: 7.8 },
      { app: "Teams", usage: 9.2, proficiency: 8.5 },
      { app: "OneDrive", usage: 8.4, proficiency: 7.8 },
      { app: "SharePoint", usage: 7.8, proficiency: 7.2 },
      { app: "OneNote", usage: 5.2, proficiency: 5.1 },
      { app: "ToDo", usage: 6.1, proficiency: 5.8 },
      { app: "Power BI", usage: 5.8, proficiency: 5.4 },
      { app: "Forms", usage: 4.2, proficiency: 4.5 },
      { app: "Planner", usage: 5.4, proficiency: 5.1 },
      { app: "Copilot", usage: 7.2, proficiency: 6.8 },
    ],
    superpower: {
      title: "Digitální bezpečnost",
      score: 8.2,
      description: "IT oddělení exceluje v oblasti bezpečnosti. Skóre 8,2 je výrazně nad průměrem firmy i trhu. Tým aktivně implementuje bezpečnostní standardy a slouží jako vzor pro ostatní.",
    },
    growthArea: {
      title: "Komunikace a spolupráce",
      score: 6.1,
      marketAvg: 7.5,
      description: "I přes technickou zdatnost má oddělení prostor pro zlepšení v měkkých dovednostech. Doporučujeme kurzy zaměřené na efektivní komunikaci s netechnickými kolegy.",
    },
  },
  marketing: {
    name: "Marketing",
    label: "Marketing",
    respondents: 156,
    companyIndex: 5.92,
    digcompScores: [5.8, 7.2, 4.8, 6.8, 5.1],
    talentDistribution: [
      { level: 1, count: 2 },
      { level: 2, count: 8 },
      { level: 3, count: 18 },
      { level: 4, count: 28 },
      { level: 5, count: 32 },
      { level: 6, count: 35 },
      { level: 7, count: 22 },
      { level: 8, count: 8 },
      { level: 9, count: 2 },
      { level: 10, count: 1 },
    ],
    levelGroups: [
      { percent: 36, top30: 18 },
      { percent: 43, top30: 23 },
      { percent: 19, top30: 39 },
      { percent: 2, top30: 20 },
    ],
    improvementPriorities: [
      { area: "Zapojení AI do každodenní práce", count: 112 },
      { area: "Automatizace rutinní práce", count: 89 },
      { area: "Analýza dat a reporting", count: 78 },
      { area: "Sdílení informací a know-how", count: 56 },
      { area: "Zvládání složitých procesů", count: 42 },
    ],
    ambassadors: [
      { name: "Tereza Králová", index: 8.4 },
      { name: "Barbora Veselá", index: 7.9 },
      { name: "Kristýna Pokorná", index: 7.6 },
      { name: "Simona Němcová", index: 7.4 },
      { name: "Veronika Marková", index: 7.2 },
    ],
    m365Proficiency: [
      { app: "Outlook", usage: 9.2, proficiency: 7.8 },
      { app: "Word", usage: 8.8, proficiency: 8.2 },
      { app: "Excel", usage: 6.5, proficiency: 5.4 },
      { app: "Teams", usage: 8.1, proficiency: 7.2 },
      { app: "OneDrive", usage: 7.8, proficiency: 6.5 },
      { app: "SharePoint", usage: 6.2, proficiency: 5.1 },
      { app: "OneNote", usage: 5.8, proficiency: 5.2 },
      { app: "ToDo", usage: 4.2, proficiency: 3.8 },
      { app: "Power BI", usage: 3.2, proficiency: 2.4 },
      { app: "Forms", usage: 5.4, proficiency: 5.1 },
      { app: "Planner", usage: 4.8, proficiency: 4.2 },
      { app: "Copilot", usage: 5.2, proficiency: 4.1 },
    ],
    superpower: {
      title: "Tvorba digitálního obsahu",
      score: 7.2,
      description: "Marketing vyniká v tvorbě obsahu. Skóre 7,2 je výrazně nad firemním průměrem. Tým efektivně využívá nástroje pro tvorbu a správu digitálního obsahu.",
    },
    growthArea: {
      title: "Řešení problémů",
      score: 4.8,
      marketAvg: 6.2,
      description: "Oddělení by mohlo těžit z kurzů zaměřených na analytické myšlení a technické řešení problémů. Doporučujeme školení v oblasti datové analýzy.",
    },
  },
  finance: {
    name: "Finance & Účetnictví",
    label: "Finance & Účetnictví",
    respondents: 428,
    companyIndex: 6.21,
    digcompScores: [7.1, 3.8, 5.2, 4.9, 6.8],
    talentDistribution: [
      { level: 1, count: 4 },
      { level: 2, count: 22 },
      { level: 3, count: 48 },
      { level: 4, count: 72 },
      { level: 5, count: 98 },
      { level: 6, count: 92 },
      { level: 7, count: 58 },
      { level: 8, count: 26 },
      { level: 9, count: 6 },
      { level: 10, count: 2 },
    ],
    levelGroups: [
      { percent: 34, top30: 18 },
      { percent: 44, top30: 23 },
      { percent: 20, top30: 39 },
      { percent: 2, top30: 20 },
    ],
    improvementPriorities: [
      { area: "Automatizace rutinní práce", count: 298 },
      { area: "Zvládání složitých procesů", count: 245 },
      { area: "Zapojení AI do každodenní práce", count: 187 },
      { area: "Přehled úkolů a práce na projektech", count: 134 },
      { area: "Sdílení informací a know-how", count: 98 },
    ],
    ambassadors: [
      { name: "Jana Benešová", index: 8.8 },
      { name: "Hana Pospíšilová", index: 8.3 },
      { name: "Monika Urbánková", index: 8.1 },
      { name: "Lenka Šťastná", index: 7.8 },
      { name: "Ivana Kopecká", index: 7.6 },
    ],
    m365Proficiency: [
      { app: "Outlook", usage: 9.4, proficiency: 8.1 },
      { app: "Word", usage: 7.8, proficiency: 7.2 },
      { app: "Excel", usage: 9.5, proficiency: 8.8 },
      { app: "Teams", usage: 6.8, proficiency: 5.4 },
      { app: "OneDrive", usage: 6.2, proficiency: 5.1 },
      { app: "SharePoint", usage: 4.8, proficiency: 3.9 },
      { app: "OneNote", usage: 3.8, proficiency: 3.2 },
      { app: "ToDo", usage: 4.1, proficiency: 3.8 },
      { app: "Power BI", usage: 4.2, proficiency: 3.8 },
      { app: "Forms", usage: 2.1, proficiency: 1.9 },
      { app: "Planner", usage: 2.4, proficiency: 2.1 },
      { app: "Copilot", usage: 2.8, proficiency: 2.1 },
    ],
    superpower: {
      title: "Zpracování informací a dat",
      score: 7.1,
      description: "Finance excelují v práci s daty. Skóre 7,1 odráží silné analytické dovednosti a pokročilou znalost Excelu. Oddělení efektivně zpracovává velké objemy dat.",
    },
    growthArea: {
      title: "Tvorba digitálního obsahu",
      score: 3.8,
      marketAvg: 5.9,
      description: "Oddělení má značný prostor pro zlepšení v oblasti digitální prezentace a vizualizace. Doporučujeme kurzy Power BI a pokročilé vizualizace dat.",
    },
  },
  sales: {
    name: "Obchod",
    label: "Obchod",
    respondents: 687,
    companyIndex: 6.08,
    digcompScores: [5.9, 4.2, 4.5, 7.4, 6.2],
    talentDistribution: [
      { level: 1, count: 5 },
      { level: 2, count: 38 },
      { level: 3, count: 82 },
      { level: 4, count: 118 },
      { level: 5, count: 145 },
      { level: 6, count: 152 },
      { level: 7, count: 98 },
      { level: 8, count: 38 },
      { level: 9, count: 9 },
      { level: 10, count: 2 },
    ],
    levelGroups: [
      { percent: 35, top30: 18 },
      { percent: 43, top30: 23 },
      { percent: 20, top30: 39 },
      { percent: 2, top30: 20 },
    ],
    improvementPriorities: [
      { area: "Zapojení AI do každodenní práce", count: 412 },
      { area: "Automatizace rutinní práce", count: 378 },
      { area: "Přehled úkolů a práce na projektech", count: 298 },
      { area: "Sdílení informací a know-how", count: 267 },
      { area: "Zvládání složitých procesů", count: 189 },
    ],
    ambassadors: [
      { name: "David Horák", index: 8.6 },
      { name: "Filip Kučera", index: 8.2 },
      { name: "Lukáš Maršálek", index: 8.0 },
      { name: "Michal Zeman", index: 7.8 },
      { name: "Adam Kratochvíl", index: 7.5 },
    ],
    m365Proficiency: [
      { app: "Outlook", usage: 9.6, proficiency: 8.2 },
      { app: "Word", usage: 8.4, proficiency: 7.8 },
      { app: "Excel", usage: 7.8, proficiency: 6.5 },
      { app: "Teams", usage: 8.8, proficiency: 7.4 },
      { app: "OneDrive", usage: 7.2, proficiency: 5.8 },
      { app: "SharePoint", usage: 5.4, proficiency: 4.2 },
      { app: "OneNote", usage: 4.8, proficiency: 4.1 },
      { app: "ToDo", usage: 5.2, proficiency: 4.8 },
      { app: "Power BI", usage: 2.4, proficiency: 1.9 },
      { app: "Forms", usage: 3.1, proficiency: 2.8 },
      { app: "Planner", usage: 2.8, proficiency: 2.4 },
      { app: "Copilot", usage: 4.2, proficiency: 3.5 },
    ],
    superpower: {
      title: "Komunikace a spolupráce",
      score: 7.4,
      description: "Obchodní tým vyniká v komunikaci. Skóre 7,4 odráží silné prezentační dovednosti a schopnost efektivně spolupracovat s klienty i interními týmy.",
    },
    growthArea: {
      title: "Tvorba digitálního obsahu",
      score: 4.2,
      marketAvg: 5.9,
      description: "Oddělení by mohlo těžit z kurzů zaměřených na tvorbu profesionálních prezentací a nabídek. Doporučujeme školení v designových nástrojích.",
    },
  },
  hr: {
    name: "HR & Administrativa",
    label: "HR & Administrativa",
    respondents: 198,
    companyIndex: 5.47,
    digcompScores: [5.2, 4.8, 4.1, 6.2, 5.8],
    talentDistribution: [
      { level: 1, count: 3 },
      { level: 2, count: 14 },
      { level: 3, count: 28 },
      { level: 4, count: 42 },
      { level: 5, count: 48 },
      { level: 6, count: 35 },
      { level: 7, count: 18 },
      { level: 8, count: 7 },
      { level: 9, count: 2 },
      { level: 10, count: 1 },
    ],
    levelGroups: [
      { percent: 44, top30: 18 },
      { percent: 42, top30: 23 },
      { percent: 13, top30: 39 },
      { percent: 1, top30: 20 },
    ],
    improvementPriorities: [
      { area: "Automatizace rutinní práce", count: 142 },
      { area: "Zapojení AI do každodenní práce", count: 128 },
      { area: "Sdílení informací a know-how", count: 98 },
      { area: "Přehled úkolů a práce na projektech", count: 87 },
      { area: "Zvládání složitých procesů", count: 54 },
    ],
    ambassadors: [
      { name: "Petra Havlíčková", index: 7.8 },
      { name: "Alena Fialová", index: 7.4 },
      { name: "Markéta Růžičková", index: 7.1 },
      { name: "Kateřina Šimková", index: 6.9 },
      { name: "Dagmar Holubová", index: 6.7 },
    ],
    m365Proficiency: [
      { app: "Outlook", usage: 9.2, proficiency: 7.4 },
      { app: "Word", usage: 8.8, proficiency: 7.8 },
      { app: "Excel", usage: 6.8, proficiency: 5.2 },
      { app: "Teams", usage: 7.2, proficiency: 5.8 },
      { app: "OneDrive", usage: 6.4, proficiency: 4.8 },
      { app: "SharePoint", usage: 5.2, proficiency: 3.8 },
      { app: "OneNote", usage: 4.2, proficiency: 3.5 },
      { app: "ToDo", usage: 3.8, proficiency: 3.2 },
      { app: "Power BI", usage: 1.8, proficiency: 1.4 },
      { app: "Forms", usage: 4.8, proficiency: 4.2 },
      { app: "Planner", usage: 2.1, proficiency: 1.8 },
      { app: "Copilot", usage: 2.4, proficiency: 1.8 },
    ],
    superpower: {
      title: "Komunikace a spolupráce",
      score: 6.2,
      description: "HR oddělení má dobré komunikační dovednosti. Skóre 6,2 odráží schopnost efektivně komunikovat napříč firmou a koordinovat HR procesy.",
    },
    growthArea: {
      title: "Řešení problémů",
      score: 4.1,
      marketAvg: 6.2,
      description: "Oddělení by mohlo těžit z kurzů zaměřených na analytické myšlení a využití dat pro HR rozhodování. Doporučujeme školení v HR analytics.",
    },
  },
};

const MARKET_DATA = {
  period: "18. 11. – 5. 12. 2025",
  marketAvg: 5.01,
  marketMax: 8.15,
  marketMin: 3.02,
  digcompMarketAvg: [7.3, 5.9, 6.2, 7.5, 7.1],
  digcompTop30: [7.7, 6.2, 6.8, 8.1, 7.5],
};

const M365_ICONS: Record<string, { icon: string; color: string }> = {
  Outlook: { icon: asset("/logos/Outlook.png"), color: "#0078D4" },
  Word: { icon: asset("/logos/Word.png"), color: "#2B579A" },
  Excel: { icon: asset("/logos/Excel.png"), color: "#217346" },
  Teams: { icon: asset("/logos/Teams.png"), color: "#6264A7" },
  OneDrive: { icon: asset("/logos/OneDrive.png"), color: "#0078D4" },
  SharePoint: { icon: asset("/logos/SharePoint.png"), color: "#038387" },
  OneNote: { icon: asset("/logos/OneNote.png"), color: "#7719AA" },
  ToDo: { icon: asset("/logos/ToDo.png"), color: "#3C78D8" },
  "Power BI": { icon: asset("/logos/PowerBI.png"), color: "#F2C811" },
  Forms: { icon: asset("/logos/Forms.png"), color: "#035A5A" },
  Planner: { icon: asset("/logos/Planner.png"), color: "#31752F" },
  Copilot: { icon: asset("/logos/Copilot.png"), color: "#2596FF" },
};

const RECOMMENDED_COURSES_CONFIG = [
  { id: 2, titleKey: "companyReport.course1Title", descKey: "companyReport.course1Desc", image: asset("/courses/Automatizace.webp"), durationKey: "3", levelKey: "assessmentLevels.advanced", priorityKey: "companyReport.priorityHigh", priorityLevel: "high" as const },
  { id: 3, titleKey: "companyReport.course2Title", descKey: "companyReport.course2Desc", image: asset("/courses/AI.webp"), durationKey: "1.5", levelKey: "assessmentLevels.beginner", priorityKey: "companyReport.priorityHigh", priorityLevel: "high" as const },
  { id: 5, titleKey: "companyReport.course3Title", descKey: "companyReport.course3Desc", image: asset("/courses/security.png"), durationKey: "1.5", levelKey: "assessmentLevels.beginner", priorityKey: "companyReport.priorityMedium", priorityLevel: "medium" as const },
  { id: 4, titleKey: "companyReport.course4Title", descKey: "companyReport.course4Desc", image: asset("/courses/excel.webp"), durationKey: "2.5", levelKey: "assessmentLevels.intermediate", priorityKey: "companyReport.priorityMedium", priorityLevel: "medium" as const },
  { id: 1, titleKey: "companyReport.course5Title", descKey: "companyReport.course5Desc", image: asset("/courses/teams.webp"), durationKey: "2", levelKey: "assessmentLevels.intermediate", priorityKey: "companyReport.priorityMedium", priorityLevel: "medium" as const },
];

export default function CompanyAssessmentReport() {
  const { t } = useTranslation();
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentKey>("all");
  const [showDepartments, setShowDepartments] = useState(false);
  
  const currentData = DEPARTMENTS_DATA[selectedDepartment];
  
  const DIGCOMP_LABELS = DIGCOMP_LABEL_KEYS.map((k) => t(k));
  const DIGCOMP_LEGEND = [
    { short: t("companyReport.legendInfo"), icon: "📊", color: "#FEE2E2", iconBg: "#EF4444" },
    { short: t("companyReport.legendContent"), icon: "☁️", color: "#E0F2FE", iconBg: "#0EA5E9" },
    { short: t("companyReport.legendProblems"), icon: "🧩", color: "#D1FAE5", iconBg: "#10B981" },
    { short: t("companyReport.legendComm"), icon: "💬", color: "#EDE9FE", iconBg: "#6366F1" },
    { short: t("companyReport.legendSecurity"), icon: "✓", color: "#FEF3C7", iconBg: "#F59E0B" },
  ];
  const RECOMMENDED_COURSES = RECOMMENDED_COURSES_CONFIG.map((c) => ({
    id: c.id,
    title: t(c.titleKey),
    description: t(c.descKey),
    image: c.image,
    duration: c.durationKey,
    level: t(c.levelKey),
    priority: t(c.priorityKey),
    priorityLevel: c.priorityLevel,
  }));
  
  const LEVEL_GROUPS_COLORS = ["#EF4444", "#F59E0B", "#2596FF", "#77F9D9"];
  const LEVEL_GROUPS = LEVEL_GROUP_KEYS.map((key, i) => ({
    name: t(key),
    percent: currentData.levelGroups[i].percent,
    top30: currentData.levelGroups[i].top30,
    color: LEVEL_GROUPS_COLORS[i],
  }));

  const maxCount = Math.max(...currentData.talentDistribution.map((d) => d.count));
  const maxPriority = Math.max(...currentData.improvementPriorities.map((p) => p.count));
  const indexDiff = currentData.companyIndex - MARKET_DATA.marketAvg;
  const indexDiffPercent = ((indexDiff / MARKET_DATA.marketAvg) * 100).toFixed(1);
  
  const m365WithIcons = currentData.m365Proficiency.map((app) => ({
    ...app,
    icon: M365_ICONS[app.app]?.icon || "",
    color: M365_ICONS[app.app]?.color || "#6B7280",
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* DEPARTMENT SELECTOR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 24px",
          background: "white",
          borderRadius: 12,
          border: "1px solid var(--color-border)",
        }}
      >
        <label
          htmlFor="department-select"
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--color-text-main)",
          }}
        >
          Oddělení:
        </label>
        <select
          id="department-select"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value as DepartmentKey)}
          style={{
            padding: "10px 16px",
            paddingRight: 40,
            fontSize: 14,
            fontWeight: 500,
            color: "var(--color-text-main)",
            background: "var(--color-breeze)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            cursor: "pointer",
            minWidth: 200,
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23040E3C' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
          }}
        >
          {(Object.keys(DEPARTMENTS_DATA) as DepartmentKey[]).map((key) => (
            <option key={key} value={key}>
              {DEPARTMENTS_DATA[key].label}
            </option>
          ))}
        </select>
        <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
          {currentData.respondents.toLocaleString("cs-CZ")} respondentů
        </span>
      </div>

      {/* EXECUTIVE SUMMARY HEADER */}
      <div
        style={{
          background: "#040E3C",
          borderRadius: 16,
          padding: "36px 32px",
          color: "white",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.15)",
              padding: "6px 14px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Executive Summary
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", fontStyle: "italic" }}>
            {selectedDepartment === "all" ? "Firemní Assessment Report" : `Assessment Report – ${currentData.name}`}
          </h1>
          <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>
            {selectedDepartment === "all" ? "VIG CZ" : currentData.name} • {MARKET_DATA.period}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {/* Firemní Index */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            transition={HOVER_TRANSITION}
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
            }}
          >
            <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 12px" }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#2596FF"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(currentData.companyIndex / 10) * 264} 264`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800 }}>{currentData.companyIndex}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedDepartment === "all" ? "Firemní" : "Oddělení"} Digiskills Index</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Max. trhu: {MARKET_DATA.marketMax}</div>
          </motion.div>

          {/* Srovnání s benchmarkem */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            transition={HOVER_TRANSITION}
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: indexDiff >= 0 ? "#77F9D9" : "#F7981C",
              }}
            >
              {indexDiff >= 0 ? "+" : ""}
              {indexDiffPercent}%
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>vs. Průměr trhu</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
              Trh: {MARKET_DATA.marketAvg} • Vy: {currentData.companyIndex}
            </div>
          </motion.div>

          {/* Počet respondentů */}
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            transition={HOVER_TRANSITION}
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: 24,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 40, fontWeight: 800 }}>{currentData.respondents.toLocaleString("cs-CZ")}</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>{selectedDepartment === "all" ? "Zapojených zaměstnanců" : "Respondentů"}</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>Období: {MARKET_DATA.period}</div>
          </motion.div>
        </div>
      </div>

      {/* RADAR CHART - POROVNÁNÍ KOMPETENCÍ */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "28px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 24px", fontStyle: "italic" }}>
          Porovnání kompetencí dle DigComp
        </h2>

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Radar chart (pavouk) */}
          <div style={{ flex: "1 1 360px", minWidth: 300 }}>
            <CompanyRadarChart
              companyScores={currentData.digcompScores}
              marketAvg={MARKET_DATA.digcompMarketAvg}
              top30={MARKET_DATA.digcompTop30}
              labels={DIGCOMP_LABELS}
              legend={DIGCOMP_LEGEND}
            />
          </div>

          {/* Digiskills Index chart + legend */}
          <div style={{ flex: "1 1 360px", minWidth: 300 }}>
            <DigiskillsIndexChart
              companyIndex={currentData.companyIndex}
              marketAvg={MARKET_DATA.marketAvg}
              marketMin={MARKET_DATA.marketMin}
              marketMax={MARKET_DATA.marketMax}
              showDepartments={showDepartments}
              onToggleDepartments={() => setShowDepartments(!showDepartments)}
              selectedDepartment={selectedDepartment}
            />

            {/* Legenda kompetencí */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
              {DIGCOMP_LABELS.map((label, i) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                  transition={HOVER_TRANSITION}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background:
                        currentData.digcompScores[i] >= MARKET_DATA.digcompMarketAvg[i] ? "#2596FF" : "#F7981C",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 13, color: "#374151", flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#040E3C", minWidth: 32 }}>
                    {currentData.digcompScores[i].toFixed(1)}
                  </span>
                </motion.div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid #E5E7EB",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 3, background: "#2596FF", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>Naše firma</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 3, background: "#040E3C", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#040E3C", fontWeight: 500 }}>Průměr trhu</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 3, background: "#0D9488", borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: "#0D9488", fontWeight: 500 }}>Top 30 % trhu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SLOVNÍ VYHODNOCENÍ – separátní box */}
      <div
        style={{
          background: "var(--color-breeze)",
          borderRadius: 16,
          padding: "32px 36px",
          border: "1px solid var(--color-border)",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text-main)", margin: "0 0 24px" }}>
          Slovní vyhodnocení
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            <strong>{currentData.name}</strong> {selectedDepartment === "all" ? "dosáhla" : "dosáhlo"} v hodnoceném období celkového Digiskills Indexu{" "}
            <strong>{currentData.companyIndex.toFixed(2)}</strong>, což je {indexDiff >= 0 ? "nad" : "pod"} průměrem trhu{" "}
            ({MARKET_DATA.marketAvg.toFixed(2)}). S {currentData.respondents.toLocaleString("cs-CZ")} {selectedDepartment === "all" ? "zapojenými zaměstnanci" : "respondenty"} jde o solidní základ pro cílené rozvíjení digitálních kompetencí.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            Nejsilnější oblastí je <strong>{currentData.superpower.title}</strong> (skóre {currentData.superpower.score.toFixed(1)}).
            Naopak největší prostor pro růst představuje <strong>{currentData.growthArea.title}</strong> ({currentData.growthArea.score.toFixed(1)}),
            kde {selectedDepartment === "all" ? "firma" : "oddělení"} zaostává za průměrem trhu ({currentData.growthArea.marketAvg.toFixed(1)}).
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.9, color: "#1F2937" }}>
            Doporučujeme zaměřit vzdělávací investice na kurzy podporující oblasti s největším potenciálem růstu – 
            v souladu s prioritami, které zaměstnanci sami uvedli v assessmentu. Níže najdete kurzy
            doporučené pro {selectedDepartment === "all" ? "celou organizaci" : "toto oddělení"}.
          </p>
        </div>
      </div>

      {/* SUPERSCHOPNOSTI vs PROSTOR PRO RŮST */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {/* Superschopnosti */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={HOVER_TRANSITION}
          style={{
            background: "#77F9D9",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src={asset("/Screenshots/Symbol Dark.png")} alt="" width={28} height={28} style={{ objectFit: "contain" }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#040E3C", margin: 0 }}>
              {selectedDepartment === "all" ? "Firemní superschopnosti" : "Superschopnosti oddělení"}
            </h3>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#040E3C", marginBottom: 8 }}>
            {currentData.superpower.title}
          </div>
          <p style={{ fontSize: 14, color: "#040E3C", margin: 0, lineHeight: 1.5 }}>
            {currentData.superpower.description}
          </p>
        </motion.div>

        {/* Prostor pro růst */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={HOVER_TRANSITION}
          style={{
            background: "#FF7575",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(255,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src={asset("/Screenshots/Symbol Dark.png")} alt="" width={28} height={28} style={{ objectFit: "contain" }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#040E3C", margin: 0 }}>
              {selectedDepartment === "all" ? "Firemní prostor pro růst" : "Prostor pro růst"}
            </h3>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#040E3C", marginBottom: 8 }}>
            {currentData.growthArea.title}
          </div>
          <p style={{ fontSize: 14, color: "#040E3C", margin: 0, lineHeight: 1.5 }}>
            {currentData.growthArea.description}
          </p>
        </motion.div>
      </div>

      {/* TALENT PIPELINE - HISTOGRAM */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "28px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 8px", fontStyle: "italic" }}>
          Talent Pipeline
        </h2>
        <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px" }}>
          Distribuce digitálních kompetencí zaměstnanců na škále 1–10
        </p>

        <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 200, marginBottom: 16 }}>
          {currentData.talentDistribution.map((item) => {
            const height = (item.count / maxCount) * 180;
            let color = "#EF4444";
            if (item.level >= 5 && item.level <= 6) color = "#F59E0B";
            if (item.level >= 7 && item.level <= 8) color = "#2596FF";
            if (item.level >= 9) color = "#77F9D9";

            return (
              <div
                key={item.level}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{item.count}</span>
                <motion.div
                  whileHover={{ opacity: 0.85, scaleY: 1.02 }}
                  transition={HOVER_TRANSITION}
                  style={{
                    width: "100%",
                    height,
                    background: color,
                    borderRadius: "6px 6px 0 0",
                    cursor: "pointer",
                    transformOrigin: "bottom",
                  }}
                />
                <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{item.level}</span>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginTop: 20 }}>
          {LEVEL_GROUPS.map((group) => (
            <motion.div
              key={group.name}
              whileHover={{ y: -2 }}
              transition={HOVER_TRANSITION}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                background: "#F4F5FA",
                borderRadius: 8,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 3, background: group.color }} />
              <span style={{ fontSize: 12, color: "#374151" }}>{group.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#040E3C" }}>{group.percent}%</span>
              <span style={{ fontSize: 11, color: "#6B7280" }}>(top 30%: {group.top30}%)</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* STRATEGICKÉ PRIORITY + AMBASADOŘI - DVA SLOUPCE */}
      <div style={{ display: "flex", gap: 24, alignItems: "stretch" }}>
        {/* STRATEGICKÉ PRIORITY - HEATMAPA */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: "#F4F5FA",
            borderRadius: 16,
            padding: "28px",
            border: "1px solid #E5E7EB",
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 8px", fontStyle: "italic" }}>
            Strategické priority
          </h2>
          <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px" }}>
            Co chtějí zaměstnanci ve firmě zlepšit – hlasování respondentů
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {currentData.improvementPriorities.map((item, index) => {
              const percentage = ((item.count / maxPriority) * 100).toFixed(0);
              const realPercentage = ((item.count / currentData.respondents) * 100).toFixed(0);
              return (
                <div key={item.area} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: index < 2 ? "#2596FF" : "#040E3C",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#040E3C" }}>{item.area}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#2596FF" }}>{realPercentage}%</span>
                    </div>
                    <div
                      style={{
                        height: 10,
                        background: "white",
                        borderRadius: 5,
                        overflow: "hidden",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${percentage}%`,
                          background: index < 2 ? "#2596FF" : "#9CA3AF",
                          borderRadius: 5,
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: "#6B7280", minWidth: 60, textAlign: "right" }}>
                    {item.count.toLocaleString("cs-CZ")} hlasů
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AMBASADOŘI */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: "white",
            borderRadius: 16,
            padding: "28px",
            border: "1px solid #E5E7EB",
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 24px", fontStyle: "italic" }}>
            Ambasadoři
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {currentData.ambassadors.map((person, index) => {
              const initials = person.name
                .split(" ")
                .map((n) => n[0])
                .join("");
              return (
                <div
                  key={person.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "#2596FF",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#040E3C" }}>
                      {person.name}
                    </div>
                    <div style={{ fontSize: 14, color: "#6B7280" }}>
                      {person.index.toFixed(1)} Digiskills Index
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#2596FF",
                    }}
                  >
                    #{index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* APP PROFICIENCY GRID */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "28px",
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#040E3C", margin: "0 0 8px", fontStyle: "italic" }}>
          Pokročilost v M365 aplikacích
        </h2>
        <p style={{ fontSize: 14, color: "#6B7280", margin: "0 0 24px" }}>
          Frekvence používání vs. míra pokročilosti (škála 1–10)
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
            width: "100%",
          }}
        >
          {m365WithIcons.map((app) => (
            <motion.div
              key={app.app}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              transition={HOVER_TRANSITION}
              style={{
                background: "#F4F5FA",
                borderRadius: 12,
                padding: 16,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  margin: "0 auto 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {app.icon ? (
                  <Image
                    src={app.icon}
                    alt={app.app}
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      background: app.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    {app.app.charAt(0)}
                  </div>
                )}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#040E3C", marginBottom: 8 }}>
                {app.app}
              </div>
              <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 2 }}>Používání</div>
                  <div
                    style={{
                      height: 6,
                      background: "#E5E7EB",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(app.usage / 10) * 100}%`,
                        background: "#2596FF",
                        borderRadius: 3,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 2 }}>Pokročilost</div>
                  <div
                    style={{
                      height: 6,
                      background: "#E5E7EB",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(app.proficiency / 10) * 100}%`,
                        background: "#77F9D9",
                        borderRadius: 3,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  fontWeight: 700,
                  color: app.proficiency >= 6 ? "#2596FF" : "#F7981C",
                }}
              >
                {app.proficiency.toFixed(1)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DOPORUČENÁ FIREMNÍ VZDĚLÁVACÍ CESTA */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#040E3C", margin: "0 0 6px", fontStyle: "italic" }}>
              Strategický výběr kurzů pro celou firmu
            </h2>
            <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
              Na základě assessmentu doporučujeme tyto vzdělávací priority
            </p>
          </div>
          <motion.div style={{ display: "inline-block" }} whileHover={{ scale: 1.02 }} transition={HOVER_TRANSITION}>
            <Link
              href="/admin/kurzy"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background: "transparent",
                border: "2px solid #2596FF",
                borderRadius: 8,
                color: "#2596FF",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2596FF";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#2596FF";
              }}
            >
              Upravit výběr (Admin)
            </Link>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {RECOMMENDED_COURSES.map((course, index) => (
            <CompanyCourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          background: "#2596FF",
          borderRadius: 16,
          padding: "28px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ color: "white" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>
            Připraveni spustit vzdělávání?
          </h3>
          <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
            Přiřaďte kurzy zaměstnancům a sledujte jejich pokrok v reálném čase.
          </p>
        </div>
        <motion.div style={{ display: "inline-block" }} whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(37,150,255,0.45)" }} transition={HOVER_TRANSITION}>
          <Link
            href="/admin/kurzy"
            style={{
              display: "inline-block",
              padding: "14px 28px",
              background: "white",
              border: "none",
              borderRadius: 10,
              color: "#2596FF",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Přejít do Admin panelu
          </Link>
        </motion.div>
      </div>

      {/* Srovnávací report + Stáhnout PDF */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 24 }}>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={HOVER_TRANSITION}>
          <Link
            href="/firma/srovnani"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              background: "rgb(71, 149, 249)",
              border: "none",
              borderRadius: 8,
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M18 9l-5 5-4-4-3 3" />
            </svg>
            Zobrazit srovnávací report
          </Link>
        </motion.div>
        <motion.a
          href="https://digiskillscz.sharepoint.com/sites/Kooperativapojiovna-Intern/Sdilene%20dokumenty/Forms/AllItems.aspx?id=%2Fsites%2FKooperativapojiovna%2DIntern%2FSdilene%20dokumenty%2FIntern%C3%AD%2FAssessment%2FVyhodnoceni%20%2D%20Reporty%2FVIGCZ%5FUvodni%20assessment%20CZ%5F2025%2Epdf&parent=%2Fsites%2FKooperativapojiovna%2DIntern%2FSdilene%20dokumenty%2FIntern%C3%AD%2FAssessment%2FVyhodnoceni%20%2D%20Reporty"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          transition={HOVER_TRANSITION}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            background: "white",
            border: "1px solid var(--color-primary)",
            borderRadius: 8,
            color: "var(--color-primary)",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          {/* ikona PDF */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M12 18v-6" />
            <path d="M9 15h6" />
          </svg>
          Stáhnout výsledky v PDF
        </motion.a>
      </div>
    </div>
  );
}

const DEPARTMENT_COLORS: Record<DepartmentKey, string> = {
  all: "#F7981C",
  it: "#10B981",
  marketing: "#8B5CF6",
  finance: "#3B82F6",
  sales: "#EC4899",
  hr: "#F59E0B",
};

function DigiskillsIndexChart({
  companyIndex,
  marketAvg,
  marketMin,
  marketMax,
  showDepartments,
  onToggleDepartments,
  selectedDepartment,
}: {
  companyIndex: number;
  marketAvg: number;
  marketMin: number;
  marketMax: number;
  showDepartments: boolean;
  onToggleDepartments: () => void;
  selectedDepartment: DepartmentKey;
}) {
  const chartMin = Math.floor(marketMin);
  const chartMax = Math.ceil(marketMax + 1);
  const range = chartMax - chartMin;

  const companyPercent = ((companyIndex - chartMin) / range) * 100;
  const marketAvgPercent = ((marketAvg - chartMin) / range) * 100;
  const marketMinPercent = ((marketMin - chartMin) / range) * 100;
  const marketMaxPercent = ((marketMax - chartMin) / range) * 100;

  const departmentLines = (Object.keys(DEPARTMENTS_DATA) as DepartmentKey[])
    .filter((key) => key !== "all")
    .map((key) => ({
      key,
      label: DEPARTMENTS_DATA[key].label,
      index: DEPARTMENTS_DATA[key].companyIndex,
      percent: ((DEPARTMENTS_DATA[key].companyIndex - chartMin) / range) * 100,
      color: DEPARTMENT_COLORS[key],
    }));

  return (
    <div style={{ marginBottom: 16, fontFamily: "var(--font-montserrat), Montserrat, sans-serif", maxWidth: 440, margin: "0 auto 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#040E3C",
            margin: 0,
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Digiskills index
        </h3>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontSize: 12,
            color: "#6B7280",
            userSelect: "none",
          }}
        >
          <span>Zobrazit oddělení</span>
          <div
            onClick={onToggleDepartments}
            style={{
              width: 36,
              height: 20,
              borderRadius: 10,
              background: showDepartments ? "#2596FF" : "#D1D5DB",
              position: "relative",
              transition: "background 0.2s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 2,
                left: showDepartments ? 18 : 2,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                transition: "left 0.2s",
              }}
            />
          </div>
        </label>
      </div>

      {/* Hodnoty nad grafem */}
      <div style={{ position: "relative", height: 36, marginBottom: 8 }}>
        {/* Min trhu */}
        <div
          style={{
            position: "absolute",
            left: `${marketMinPercent}%`,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontStyle: "italic",
              color: "#6B7280",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {marketMin.toFixed(2).replace(".", ",")}
          </span>
        </div>
        {/* Průměr trhu */}
        <div
          style={{
            position: "absolute",
            left: `${marketAvgPercent}%`,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontStyle: "italic",
              color: "#040E3C",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {marketAvg.toFixed(2).replace(".", ",")}
          </span>
        </div>
        {/* Vaše firma – hlavní dominantní hodnota */}
        <div
          style={{
            position: "absolute",
            left: `${companyPercent}%`,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              fontStyle: "italic",
              color: "#F7981C",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {companyIndex.toFixed(2).replace(".", ",")}
          </span>
        </div>
        {/* Max trhu */}
        <div
          style={{
            position: "absolute",
            left: `${marketMaxPercent}%`,
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontStyle: "italic",
              color: "#6B7280",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {marketMax.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>

      {/* Hlavní pruh grafu se zkosením 11,3° – charakteristický brand prvek */}
      <div
        style={{
          position: "relative",
          height: 44,
          transform: "skewX(-11.3deg)",
          transformOrigin: "center center",
        }}
      >
        {/* Vrstva 1: barevný pruh s gradientem Digi Azure → Digi Skills */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 8,
            overflow: "hidden",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, #2596FF 0%, #77F9D9 100%)",
              borderRadius: 8,
            }}
          />
        </div>

        {/* Vrstva 2: svislé čáry nad pruhem (de-skewed pro rovné čáry) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {/* Čárkovaná čára – Průměr trhu (Digi Sky #040E3C) */}
          <div
            style={{
              position: "absolute",
              left: `${marketAvgPercent}%`,
              top: -10,
              bottom: -10,
              width: 0,
              marginLeft: -1.5,
              borderLeft: "3px dashed #040E3C",
              transform: "skewX(11.3deg)",
            }}
          />
          
          {/* Čáry oddělení */}
          {showDepartments && departmentLines.map((dept) => (
            <div
              key={dept.key}
              style={{
                position: "absolute",
                left: `${dept.percent}%`,
                top: -10,
                bottom: -10,
                width: 2,
                marginLeft: -1,
                background: dept.color,
                borderRadius: 1,
                transform: "skewX(11.3deg)",
                opacity: selectedDepartment === "all" || selectedDepartment === dept.key ? 1 : 0.4,
              }}
            />
          ))}
          
          {/* Čára – Vaše firma / vybrané oddělení (zvýrazněná) */}
          <div
            style={{
              position: "absolute",
              left: `${companyPercent}%`,
              top: -10,
              bottom: -10,
              width: 3,
              marginLeft: -1.5,
              background: selectedDepartment === "all" ? "#F7981C" : DEPARTMENT_COLORS[selectedDepartment],
              borderRadius: 2,
              transform: "skewX(11.3deg)",
              zIndex: 5,
            }}
          />
          {/* Čára – Max trhu (Digi Skills #77F9D9) */}
          <div
            style={{
              position: "absolute",
              left: `${marketMaxPercent}%`,
              top: -10,
              bottom: -10,
              width: 2,
              marginLeft: -1,
              background: "#77F9D9",
              borderRadius: 1,
              transform: "skewX(11.3deg)",
            }}
          />
        </div>
      </div>

      {/* Popisky pod grafem – s dostatečným whitespace */}
      <div style={{ position: "relative", height: 28, marginTop: 14 }}>
        <div
          style={{
            position: "absolute",
            left: `${marketMinPercent}%`,
            transform: "translateX(-50%)",
            fontSize: 12,
            fontStyle: "italic",
            color: "#2596FF",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Min trhu
        </div>
        <div
          style={{
            position: "absolute",
            left: `${marketAvgPercent}%`,
            transform: "translateX(-50%)",
            fontSize: 12,
            fontStyle: "italic",
            color: "#040E3C",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Průměr trhu
        </div>
        <div
          style={{
            position: "absolute",
            left: `${companyPercent}%`,
            transform: "translateX(-50%)",
            fontSize: 13,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#F7981C",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Vaše firma
        </div>
        <div
          style={{
            position: "absolute",
            left: `${marketMaxPercent}%`,
            transform: "translateX(-50%)",
            fontSize: 12,
            fontStyle: "italic",
            color: "#77F9D9",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Max trhu
        </div>
      </div>

      {/* Legenda oddělení */}
      {showDepartments && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 16,
            padding: "12px 16px",
            background: "#F4F5FA",
            borderRadius: 8,
          }}
        >
          {departmentLines.map((dept) => (
            <div
              key={dept.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                opacity: selectedDepartment === "all" || selectedDepartment === dept.key ? 1 : 0.5,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 3,
                  background: dept.color,
                  borderRadius: 2,
                }}
              />
              <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>
                {dept.label}
              </span>
              <span style={{ fontSize: 11, color: "#6B7280" }}>
                ({dept.index.toFixed(2).replace(".", ",")})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CompanyRadarChart({
  companyScores,
  marketAvg,
  top30,
  labels,
  legend,
}: {
  companyScores: number[];
  marketAvg: number[];
  top30: number[];
  labels: string[];
  legend: { short: string; icon: string; color: string; iconBg: string }[];
}) {
  const size = 420;
  const center = size / 2;
  const maxRadius = 120;
  const levels = 5;

  const angleStep = (2 * Math.PI) / labels.length;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const radius = (value / 10) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const getLabelPosition = (index: number) => {
    const angle = startAngle + index * angleStep;
    const radius = maxRadius + 10;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
      angle,
    };
  };

  const createPath = (scores: number[]) => {
    const points = scores.map((score, i) => getPoint(i, score));
    return points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ") + " Z";
  };

  const companyPath = createPath(companyScores);
  const marketPath = createPath(marketAvg);
  const top30Path = createPath(top30);

  const companyPoints = companyScores.map((score, i) => getPoint(i, score));

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} style={{ display: "block" }}>
        {/* Mřížka */}
        {Array.from({ length: levels }, (_, i) => {
          const r = ((i + 1) / levels) * maxRadius;
          const points = labels
            .map((_, j) => {
              const angle = startAngle + j * angleStep;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            })
            .join(" ");
          return <polygon key={i} points={points} fill="none" stroke="#E5E7EB" strokeWidth="1" />;
        })}

        {/* Osy */}
        {labels.map((_, i) => {
          const angle = startAngle + i * angleStep;
          const x2 = center + maxRadius * Math.cos(angle);
          const y2 = center + maxRadius * Math.sin(angle);
          return <line key={i} x1={center} y1={center} x2={x2} y2={y2} stroke="#E5E7EB" strokeWidth="1" />;
        })}

        {/* Top 30 % */}
        <path d={top30Path} fill="rgba(13, 148, 136, 0.15)" stroke="#0D9488" strokeWidth="2" />

        {/* Průměr trhu */}
        <path d={marketPath} fill="rgba(4, 14, 60, 0.08)" stroke="#040E3C" strokeWidth="2" />

        {/* Naše firma */}
        <path d={companyPath} fill="rgba(37, 150, 255, 0.25)" stroke="#2596FF" strokeWidth="3" />

        {/* Body firmy */}
        {companyPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill="#2596FF" stroke="white" strokeWidth="2" />
        ))}
      </svg>

      {/* Popisky kompetencí jako HTML elementy kolem grafu */}
      {labels.map((_, i) => {
        const pos = getLabelPosition(i);
        const legendItem = legend[i];
        
        let transform = "translate(-50%, -50%)";
        if (i === 0) transform = "translate(-50%, -100%)";
        if (i === 1) transform = "translate(0%, -50%)";
        if (i === 2) transform = "translate(0%, 0%)";
        if (i === 3) transform = "translate(-100%, 0%)";
        if (i === 4) transform = "translate(-100%, -50%)";

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              transform,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 4px 16px rgba(37, 150, 255, 0.12)" }}
              transition={HOVER_TRANSITION}
              style={{
                background: legendItem.color,
                borderRadius: 20,
                padding: "6px 12px 6px 8px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                whiteSpace: "nowrap",
                cursor: "default",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: legendItem.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  color: "white",
                  fontWeight: 700,
                }}
              >
                {legendItem.icon}
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#040E3C", textTransform: "uppercase" }}>
                {legendItem.short}
              </span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

function CompanyCourseCard({
  course,
  index,
}: {
  course: {
    id: number;
    title: string;
    description: string;
    image: string;
    duration: string;
    level: string;
    priority: string;
    priorityLevel: "high" | "medium";
  };
  index: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
      transition={HOVER_TRANSITION}
      style={{
        background: "white",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Priority Badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: course.priorityLevel === "high" ? "#EF4444" : "#F59E0B",
          color: "white",
          padding: "4px 10px",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          zIndex: 10,
        }}
      >
        #{index + 1} • {course.priority}
      </div>

      <div
        style={{
          height: 140,
          flexShrink: 0,
          position: "relative",
          background: "#F1F5F9",
        }}
      >
        <Image
          src={course.image}
          alt={course.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>

      <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 8px",
                background: "#F3F4F6",
                borderRadius: 6,
                color: "#6B7280",
              }}
            >
              {course.duration}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 8px",
                background: "rgba(37, 150, 255, 0.15)",
                borderRadius: 6,
                color: "#1F80D9",
              }}
            >
              {course.level}
            </span>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#040E3C", margin: "0 0 8px", lineHeight: 1.3 }}>
            {course.title}
          </h3>
          <p style={{ fontSize: 13, color: "#6B7280", margin: 0, lineHeight: 1.5 }}>
            {course.description}
          </p>
        </div>

        <motion.button
          whileHover={{ boxShadow: "0 4px 12px rgba(4,14,60,0.25)" }}
          transition={HOVER_TRANSITION}
          style={{
            width: "100%",
            marginTop: 16,
            padding: "12px 20px",
            background: "#040E3C",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2596FF")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#040E3C")}
        >
          Přiřadit zaměstnancům
        </motion.button>
      </div>
    </motion.div>
  );
}

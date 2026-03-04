import type { Course } from "@/data/courses";
import type { Language } from "@/context/LanguageContext";
import { asset } from "@/lib/paths";

export type CreatorCourseStatus = "draft" | "in_review" | "published";

const COURSE_PRICE_CZK = 999;
const COMMISSION_RATE = 0.5;

export type CreatorCourse = Course & {
  status: CreatorCourseStatus;
  createdAt: string;
  sales?: number;
  revenue?: number;
};

const CREATOR_COURSES_CS: CreatorCourse[] = [
  {
    id: 101,
    title: "Úvod do AI pro manažery",
    description: "Praktický kurz o využití umělé inteligence v každodenní manažerské práci.",
    image: asset("/courses/AI.webp"),
    duration: "2 h",
    level: "Začátečník",
    activities: 8,
    status: "published",
    createdAt: "2025-01-15",
    sales: 47,
    revenue: Math.round(47 * COURSE_PRICE_CZK * COMMISSION_RATE),
  },
  {
    id: 102,
    title: "Automatizace v Excelu",
    description: "Makro, Power Query a další nástroje pro zrychlení práce s tabulkami.",
    image: asset("/courses/excel.webp"),
    duration: "3 h",
    level: "Středně pokročilý",
    activities: 12,
    status: "published",
    createdAt: "2025-02-10",
    sales: 23,
    revenue: Math.round(23 * COURSE_PRICE_CZK * COMMISSION_RATE),
  },
  {
    id: 103,
    title: "Bezpečnost na internetu",
    description: "Jak se chránit před phishingem, malwarem a dalšími hrozbami.",
    image: asset("/courses/security.png"),
    duration: "1.5 h",
    level: "Začátečník",
    activities: 6,
    status: "published",
    createdAt: "2025-02-20",
    sales: 11,
    revenue: Math.round(11 * COURSE_PRICE_CZK * COMMISSION_RATE),
  },
  {
    id: 104,
    title: "Komunikace v Microsoft Teams",
    description: "Efektivní spolupráce, schůzky a kanály v Teams.",
    image: asset("/courses/AI.webp"),
    duration: "2 h",
    level: "Začátečník",
    activities: 7,
    status: "published",
    createdAt: "2025-01-20",
    sales: 31,
    revenue: Math.round(31 * COURSE_PRICE_CZK * COMMISSION_RATE),
  },
  {
    id: 105,
    title: "Základy Power BI",
    description: "Tvorba reportů a vizualizací dat v Power BI.",
    image: asset("/courses/excel.webp"),
    duration: "4 h",
    level: "Středně pokročilý",
    activities: 10,
    status: "published",
    createdAt: "2025-02-01",
    sales: 18,
    revenue: Math.round(18 * COURSE_PRICE_CZK * COMMISSION_RATE),
  },
];

const CREATOR_COURSES_EN: CreatorCourse[] = [
  {
    id: 101,
    title: "Introduction to AI for managers",
    description: "Practical course on using artificial intelligence in everyday managerial work.",
    image: asset("/courses/AI.webp"),
    duration: "2 h",
    level: "Beginner",
    activities: 8,
    status: "published",
    createdAt: "2025-01-15",
    sales: 47,
    revenue: Math.round(47 * COURSE_PRICE_CZK * COMMISSION_RATE),
  },
  {
    id: 102,
    title: "Excel automation",
    description: "Macros, Power Query and other tools to speed up work with spreadsheets.",
    image: asset("/courses/excel.webp"),
    duration: "3 h",
    level: "Intermediate",
    activities: 12,
    status: "published",
    createdAt: "2025-02-10",
    sales: 23,
    revenue: Math.round(23 * COURSE_PRICE_CZK * COMMISSION_RATE),
  },
  {
    id: 103,
    title: "Internet security",
    description: "How to protect yourself from phishing, malware and other threats.",
    image: asset("/courses/security.png"),
    duration: "1.5 h",
    level: "Beginner",
    activities: 6,
    status: "published",
    createdAt: "2025-02-20",
    sales: 11,
    revenue: Math.round(11 * COURSE_PRICE_CZK * COMMISSION_RATE),
  },
  {
    id: 104,
    title: "Communication in Microsoft Teams",
    description: "Effective collaboration, meetings and channels in Teams.",
    image: asset("/courses/AI.webp"),
    duration: "2 h",
    level: "Beginner",
    activities: 7,
    status: "published",
    createdAt: "2025-01-20",
    sales: 31,
    revenue: Math.round(31 * COURSE_PRICE_CZK * COMMISSION_RATE),
  },
  {
    id: 105,
    title: "Power BI basics",
    description: "Creating reports and data visualizations in Power BI.",
    image: asset("/courses/excel.webp"),
    duration: "4 h",
    level: "Intermediate",
    activities: 10,
    status: "published",
    createdAt: "2025-02-01",
    sales: 18,
    revenue: Math.round(18 * COURSE_PRICE_CZK * COMMISSION_RATE),
  },
];

export function getCreatorCourses(lang: Language): CreatorCourse[] {
  return lang === "en" ? CREATOR_COURSES_EN : CREATOR_COURSES_CS;
}

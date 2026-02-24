import type { Language } from "@/context/LanguageContext";

export type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  activities: number;
};

const COURSES_CS: Course[] = [
  {
    id: 1,
    title: "Digitální inspirace",
    description: "Myslíte si, že své nástroje ovládáte? Pojďte zjistit, co z nich můžete ještě vymáčknout!",
    image: "/courses/teams.webp",
    duration: "3 h",
    level: "Začátečník",
    activities: 13,
  },
  {
    id: 2,
    title: "Soubory v cloudu",
    description: "Chcete konečně rozkliknout, co je to ten cloud, jak funguje a proč byste ho měli používat?",
    image: "/courses/Automatizace.webp",
    duration: "4 h",
    level: "Začátečník",
    activities: 16,
  },
  {
    id: 3,
    title: "Outlook pod kontrolou",
    description: "Ukážeme vám, jak si v Outlooku nastavit e-mailovou komunikaci a organizovat složky a filtry.",
    image: "/courses/excel.webp",
    duration: "2 h",
    level: "Středně pokročilý",
    activities: 14,
  },
  {
    id: 4,
    title: "Komunikace a spolupráce v Microsoft Teams",
    description: "Prozkoumejte všechny zásadní aplikace Microsoft Teams a připravte se na nový způsob týmové spolupráce.",
    image: "/courses/teams.webp",
    duration: "3 h",
    level: "Středně pokročilý",
    activities: 23,
  },
  {
    id: 5,
    title: "Řízení úkolů a času",
    description: "Naučte se řídit a třídit osobní i týmové úkoly v Microsoft 365 rychle a přehledně.",
    image: "/courses/Vizualizace.webp",
    duration: "3 h",
    level: "Středně pokročilý",
    activities: 8,
  },
  {
    id: 6,
    title: "Digitální poznámky",
    description: "Ukážeme vám, že OneNote je víc než digitální zápisníček, ale i nepostradatelný zápis z porady.",
    image: "/courses/AI.webp",
    duration: "3 h",
    level: "Začátečník",
    activities: 9,
  },
  {
    id: 7,
    title: "Další aplikace Microsoft 365",
    description: "Pojďte společně prozkoumat další aplikace, které by vám mohly usnadnit práci.",
    image: "/courses/bezpečnost.png",
    duration: "4 h",
    level: "Začátečník",
    activities: 6,
  },
  {
    id: 8,
    title: "365 Copilot",
    description: "Chcete rychleji psát e-maily, stavět prezentace a vytvářet celé texty? Microsoft 365 Copilot to zvládne.",
    image: "/courses/AI.webp",
    duration: "6 h",
    level: "Pokročilý",
    activities: 18,
  },
  {
    id: 9,
    title: "Copilot Chat",
    description: "Chcete rychleji psát e-maily, stavět prezentace a vytvářet dlouhé texty? Microsoft Copilot to zvládne.",
    image: "/courses/Vizualizace.webp",
    duration: "5 h",
    level: "Pokročilý",
    activities: 39,
  },
];

const COURSES_EN: Course[] = [
  {
    id: 1,
    title: "Digital inspiration",
    description: "Think you've mastered your tools? Find out what else you can get out of them!",
    image: "/courses/teams.webp",
    duration: "3 h",
    level: "Beginner",
    activities: 13,
  },
  {
    id: 2,
    title: "Files in the cloud",
    description: "Want to finally understand what the cloud is, how it works and why you should use it?",
    image: "/courses/Automatizace.webp",
    duration: "4 h",
    level: "Beginner",
    activities: 16,
  },
  {
    id: 3,
    title: "Outlook under control",
    description: "We'll show you how to set up email communication in Outlook and organize folders and filters.",
    image: "/courses/excel.webp",
    duration: "2 h",
    level: "Intermediate",
    activities: 14,
  },
  {
    id: 4,
    title: "Communication and collaboration in Microsoft Teams",
    description: "Explore all essential Microsoft Teams apps and prepare for a new way of team collaboration.",
    image: "/courses/teams.webp",
    duration: "3 h",
    level: "Intermediate",
    activities: 23,
  },
  {
    id: 5,
    title: "Task and time management",
    description: "Learn to manage and organize personal and team tasks in Microsoft 365 quickly and clearly.",
    image: "/courses/Vizualizace.webp",
    duration: "3 h",
    level: "Intermediate",
    activities: 8,
  },
  {
    id: 6,
    title: "Digital notes",
    description: "We'll show you that OneNote is more than a digital notebook – it's also an essential meeting record.",
    image: "/courses/AI.webp",
    duration: "3 h",
    level: "Beginner",
    activities: 9,
  },
  {
    id: 7,
    title: "More Microsoft 365 apps",
    description: "Let's explore together more apps that could make your work easier.",
    image: "/courses/bezpečnost.png",
    duration: "4 h",
    level: "Beginner",
    activities: 6,
  },
  {
    id: 8,
    title: "365 Copilot",
    description: "Want to write emails faster, build presentations and create full texts? Microsoft 365 Copilot can do it.",
    image: "/courses/AI.webp",
    duration: "6 h",
    level: "Advanced",
    activities: 18,
  },
  {
    id: 9,
    title: "Copilot Chat",
    description: "Want to write emails faster, build presentations and create long texts? Microsoft Copilot can do it.",
    image: "/courses/Vizualizace.webp",
    duration: "5 h",
    level: "Advanced",
    activities: 39,
  },
];

const COMPLETED_CS: Course[] = [
  {
    id: 101,
    title: "Základy Microsoft 365",
    description: "Kompletní úvod do ekosystému Microsoft 365 pro každodenní produktivitu.",
    image: "/courses/excel.webp",
    duration: "2 h",
    level: "Začátečník",
    activities: 12,
  },
  {
    id: 102,
    title: "Efektivní e-mailová komunikace",
    description: "Profesionální komunikace a správa e-mailů v Outlooku.",
    image: "/courses/security.png",
    duration: "1.5 h",
    level: "Začátečník",
    activities: 8,
  },
];

const COMPLETED_EN: Course[] = [
  {
    id: 101,
    title: "Microsoft 365 basics",
    description: "Complete introduction to the Microsoft 365 ecosystem for everyday productivity.",
    image: "/courses/excel.webp",
    duration: "2 h",
    level: "Beginner",
    activities: 12,
  },
  {
    id: 102,
    title: "Effective email communication",
    description: "Professional communication and email management in Outlook.",
    image: "/courses/security.png",
    duration: "1.5 h",
    level: "Beginner",
    activities: 8,
  },
];

export function getCourseList(lang: Language): Course[] {
  return lang === "en" ? COURSES_EN : COURSES_CS;
}

export function getCompletedCourses(lang: Language): Course[] {
  return lang === "en" ? COMPLETED_EN : COMPLETED_CS;
}

export const COURSE_LIST = COURSES_CS;
export const COMPLETED_COURSES = COMPLETED_CS;

export type Course = {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  activities: number;
};

export const COURSE_LIST: Course[] = [
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

export const COMPLETED_COURSES: Course[] = [
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

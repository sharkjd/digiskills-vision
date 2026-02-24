/**
 * Sdílené typy a data pro Assessment – používají AssessmentForm, AssessmentChatbot i AssessmentSummary.
 */

import type { Language } from "@/context/LanguageContext";

export type SectionData = {
  q1: number;
  q2: number;
  tools: string[];
};

export type SectionKey =
  | "information"
  | "communication"
  | "content"
  | "security"
  | "problemsolving";

export type FormData = {
  name: string;
  email: string;
  role: string;
  digitalRelationship: number;
  information: SectionData;
  communication: SectionData;
  content: SectionData;
  security: SectionData;
  problemsolving: SectionData;
  ai: { score: number; tools: string[] };
};

export type Section = {
  key: SectionKey;
  icon: string;
  title: string;
  description: string;
  q1: string;
  q2: string;
  toolsLabel: string;
  tools: string[];
};

const INITIAL_DATA_CS: FormData = {
  name: "Honza Dolejš",
  email: "honza.dolejs@digiskills.cz",
  role: "IT / Vývoj",
  digitalRelationship: 7,
  information: {
    q1: 7,
    q2: 8,
    tools: [
      "SharePoint (prohledávání firemního obsahu)",
      "OneDrive (organizace a správa vlastních souborů)",
    ],
  },
  communication: {
    q1: 8,
    q2: 7,
    tools: [
      "Microsoft Teams (komunikace, týmová spolupráce)",
      "Outlook (e-mail, správa času a kalendáře)",
    ],
  },
  content: {
    q1: 6,
    q2: 7,
    tools: ["PowerPoint (prezentace)", "Word (dokumenty)"],
  },
  security: {
    q1: 7,
    q2: 8,
    tools: [
      "Microsoft Authenticator (schvalování přihlášení)",
      "Microsoft Defender (ochrana zařízení)",
    ],
  },
  problemsolving: {
    q1: 8,
    q2: 7,
    tools: [
      "OneNote (digitální zápisník)",
      "Planner / To Do (správa úkolů)",
    ],
  },
  ai: {
    score: 6,
    tools: [
      "Microsoft Copilot (asistent v Office)",
      "Diktování (převod řeči na text)",
    ],
  },
};

const INITIAL_DATA_EN: FormData = {
  ...INITIAL_DATA_CS,
  role: "IT / Development",
  information: {
    ...INITIAL_DATA_CS.information,
    tools: [
      "SharePoint (searching company content)",
      "OneDrive (organizing and managing your files)",
    ],
  },
  communication: {
    ...INITIAL_DATA_CS.communication,
    tools: [
      "Microsoft Teams (communication, team collaboration)",
      "Outlook (email, time and calendar management)",
    ],
  },
  content: {
    ...INITIAL_DATA_CS.content,
    tools: ["PowerPoint (presentations)", "Word (documents)"],
  },
  security: {
    ...INITIAL_DATA_CS.security,
    tools: [
      "Microsoft Authenticator (sign-in approval)",
      "Microsoft Defender (device protection)",
    ],
  },
  problemsolving: {
    ...INITIAL_DATA_CS.problemsolving,
    tools: [
      "OneNote (digital notebook)",
      "Planner / To Do (task management)",
    ],
  },
  ai: {
    ...INITIAL_DATA_CS.ai,
    tools: [
      "Microsoft Copilot (Office assistant)",
      "Dictation (speech to text)",
    ],
  },
};

const SECTIONS_CS: Section[] = [
  {
    key: "information",
    icon: "🔍",
    title: "Informační a datová gramotnost",
    description: "Schopnost vyhledat, vyhodnotit a spravovat data a informace.",
    q1: "Efektivita vyhledávání: Jak dobře dokážete využívat filtry a pokročilé nástroje k nalezení relevantních informací v záplavě dat?",
    q2: "Kritické posouzení: Jak moc si věříte v rozpoznání důvěryhodného zdroje od zavádějícího nebo lživého obsahu (fake news)?",
    toolsLabel: "Které z těchto M365 aplikací využíváte pro práci s informacemi?",
    tools: [
      "SharePoint (prohledávání firemního obsahu)",
      "OneDrive (organizace a správa vlastních souborů)",
      "Microsoft Lists (evidence a třídění dat)",
    ],
  },
  {
    key: "communication",
    icon: "🤝",
    title: "Komunikace a spolupráce",
    description: "Interakce, sdílení a spolupráce prostřednictvím digitálních technologií.",
    q1: "Pokročilé sdílení: Jak dobře ovládáte nastavování přístupových práv k dokumentům (např. odlišná práva pro čtení vs. úpravy pro různé lidi)?",
    q2: "Digitální etiketa a organizace: Jak si věříte v organizaci komplexních online schůzek (včetně správy kalendáře, nahrávání a moderování chatu)?",
    toolsLabel: "Které z těchto M365 aplikací využíváte pro spolupráci?",
    tools: [
      "Microsoft Teams (komunikace, týmová spolupráce)",
      "Outlook (e-mail, správa času a kalendáře)",
      "Whiteboard (společné vizuální plánování a brainstorming)",
    ],
  },
  {
    key: "content",
    icon: "✍️",
    title: "Tvorba digitálního obsahu",
    description: "Vytváření a úprava obsahu, programování a pochopení autorských práv.",
    q1: "Právní povědomí: Do jaké míry rozumíte licencím a autorským právům u digitálního obsahu (např. co můžete legálně použít z internetu)?",
    q2: "Zjednodušení práce: Jak dobře dokážete využívat pokročilé funkce aplikací k automatizaci (např. hromadná korespondence, makra, automatická pravidla)?",
    toolsLabel: "Které z těchto M365 aplikací využíváte k tvorbě a úpravám?",
    tools: [
      "PowerPoint (prezentace)",
      "Word (dokumenty)",
      "Power Automate (automatizace procesů)",
    ],
  },
  {
    key: "security",
    icon: "🛡️",
    title: "Bezpečnost",
    description: "Ochrana zařízení, osobních údajů, soukromí a zdraví.",
    q1: "Digitální stopa a soukromí: Jak dobře dokážete spravovat své soukromí (např. omezování přístupu aplikací k poloze nebo správné nastavení cookies)?",
    q2: "Kybernetická ostražitost: Nakolik jste si jistí v rozpoznání podezřelých e-mailů (phishing) a v bezpečném nakládání s hesly (např. MFA)?",
    toolsLabel: "Které z těchto M365 nástrojů využíváte pro bezpečnost?",
    tools: [
      "Microsoft Authenticator (schvalování přihlášení)",
      "Microsoft Defender (ochrana zařízení)",
      "Purview (zabezpečení citlivých dokumentů)",
    ],
  },
  {
    key: "problemsolving",
    icon: "🛠️",
    title: "Řešení problémů",
    description: "Identifikace potřeb a řešení technických potíží.",
    q1: "Technická soběstačnost: Jak dobře si dokážete sami vyhledat návod a vyřešit problém s nastavením softwaru, aniž byste volali IT podporu?",
    q2: "Inovativní přístup: Nakolik aktivně hledáte nové digitální způsoby, jak vylepšit stávající firemní procesy nebo si zjednodušit práci?",
    toolsLabel: "Které z těchto M365 aplikací využíváte k řešení úkolů?",
    tools: [
      "OneNote (digitální zápisník)",
      "Planner / To Do (správa úkolů)",
      "Forms (průzkumy a sběr dat)",
    ],
  },
];

const SECTIONS_EN: Section[] = [
  {
    key: "information",
    icon: "🔍",
    title: "Information and data literacy",
    description: "Ability to find, evaluate and manage data and information.",
    q1: "Search efficiency: How well can you use filters and advanced tools to find relevant information in a flood of data?",
    q2: "Critical assessment: How confident are you in distinguishing trustworthy sources from misleading or false content (fake news)?",
    toolsLabel: "Which of these M365 apps do you use for working with information?",
    tools: [
      "SharePoint (searching company content)",
      "OneDrive (organizing and managing your files)",
      "Microsoft Lists (data records and sorting)",
    ],
  },
  {
    key: "communication",
    icon: "🤝",
    title: "Communication and collaboration",
    description: "Interaction, sharing and collaboration through digital technologies.",
    q1: "Advanced sharing: How well do you manage access rights for documents (e.g. different read vs. edit permissions for different people)?",
    q2: "Digital etiquette and organization: How confident are you in organizing complex online meetings (including calendar management, recording and chat moderation)?",
    toolsLabel: "Which of these M365 apps do you use for collaboration?",
    tools: [
      "Microsoft Teams (communication, team collaboration)",
      "Outlook (email, time and calendar management)",
      "Whiteboard (shared visual planning and brainstorming)",
    ],
  },
  {
    key: "content",
    icon: "✍️",
    title: "Digital content creation",
    description: "Creating and editing content, programming and understanding copyright.",
    q1: "Legal awareness: To what extent do you understand licenses and copyright for digital content (e.g. what you can legally use from the internet)?",
    q2: "Work simplification: How well can you use advanced app features for automation (e.g. mail merge, macros, automatic rules)?",
    toolsLabel: "Which of these M365 apps do you use for creating and editing?",
    tools: [
      "PowerPoint (presentations)",
      "Word (documents)",
      "Power Automate (process automation)",
    ],
  },
  {
    key: "security",
    icon: "🛡️",
    title: "Security",
    description: "Protection of devices, personal data, privacy and health.",
    q1: "Digital footprint and privacy: How well can you manage your privacy (e.g. limiting app access to location or proper cookie settings)?",
    q2: "Cyber vigilance: How confident are you in recognizing suspicious emails (phishing) and handling passwords safely (e.g. MFA)?",
    toolsLabel: "Which of these M365 tools do you use for security?",
    tools: [
      "Microsoft Authenticator (sign-in approval)",
      "Microsoft Defender (device protection)",
      "Purview (sensitive document security)",
    ],
  },
  {
    key: "problemsolving",
    icon: "🛠️",
    title: "Problem solving",
    description: "Identifying needs and solving technical issues.",
    q1: "Technical self-sufficiency: How well can you find instructions and solve software setup problems yourself without calling IT support?",
    q2: "Innovative approach: How actively do you seek new digital ways to improve existing business processes or simplify your work?",
    toolsLabel: "Which of these M365 apps do you use for task management?",
    tools: [
      "OneNote (digital notebook)",
      "Planner / To Do (task management)",
      "Forms (surveys and data collection)",
    ],
  },
];

export function getInitialData(lang: Language): FormData {
  return lang === "en" ? INITIAL_DATA_EN : INITIAL_DATA_CS;
}

export function getSections(lang: Language): Section[] {
  return lang === "en" ? SECTIONS_EN : SECTIONS_CS;
}

export const INITIAL_DATA = INITIAL_DATA_CS;
export const SECTIONS = SECTIONS_CS;

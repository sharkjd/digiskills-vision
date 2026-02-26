import type { SectionKey } from "./assessment-data";

export type AssessmentStepQuestion = {
  type: "question";
  questionKey: string;
  defaultAnswerKey: string;
};

export type AssessmentStepVisualTask = {
  type: "visual_task";
  taskId: string;
  sectionKey: SectionKey;
  instructionKey: string;
  uploadHintKey: string;
  criteria: string;
  successIndicators: string[];
  failureIndicators: string[];
};

export type AssessmentStep = AssessmentStepQuestion | AssessmentStepVisualTask;

export const ASSESSMENT_STEPS: AssessmentStep[] = [
  { type: "question", questionKey: "assessmentChatbot.question1", defaultAnswerKey: "assessmentChatbot.defaultAnswer1" },
  { type: "question", questionKey: "assessmentChatbot.question2", defaultAnswerKey: "assessmentChatbot.defaultAnswer2" },
  {
    type: "visual_task",
    taskId: "onedrive-readonly",
    sectionKey: "communication",
    instructionKey: "assessmentChatbot.visualTask.onedriveReadonly.instruction",
    uploadHintKey: "assessmentChatbot.visualTask.uploadHint",
    criteria: "The document sharing dialog must show 'Can view' or 'Read-only' permission (not 'Can edit').",
    successIndicators: ["Can view", "Read-only", "View only", "Pouze prohlížení"],
    failureIndicators: ["Can edit", "Can organize", "Edit", "Upravit"],
  },
  { type: "question", questionKey: "assessmentChatbot.question3", defaultAnswerKey: "assessmentChatbot.defaultAnswer3" },
  { type: "question", questionKey: "assessmentChatbot.question4", defaultAnswerKey: "assessmentChatbot.defaultAnswer4" },
  { type: "question", questionKey: "assessmentChatbot.question5", defaultAnswerKey: "assessmentChatbot.defaultAnswer5" },
  { type: "question", questionKey: "assessmentChatbot.question6", defaultAnswerKey: "assessmentChatbot.defaultAnswer6" },
];

export function isVisualTaskStep(step: AssessmentStep): step is AssessmentStepVisualTask {
  return step.type === "visual_task";
}

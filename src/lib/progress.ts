import { Language, ProblemProgress, ProgressData } from "./types";

const STORAGE_KEY = "algoprep-progress";
const QUIZ_SCORE_KEY = "algoprep-quiz-best";

export function loadProgress(): ProgressData {
  if (typeof window === "undefined") return { problems: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { problems: {} };
    return JSON.parse(raw) as ProgressData;
  } catch {
    return { problems: {} };
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

export function getProblemProgress(slug: string): ProblemProgress | null {
  const data = loadProgress();
  return data.problems[slug] || null;
}

export function updateProblemCode(
  slug: string,
  language: Language,
  code: string
): void {
  const data = loadProgress();
  if (!data.problems[slug]) {
    data.problems[slug] = {
      solved: false,
      lastLanguage: language,
      lastCode: { java: "", kotlin: "", python: "" },
      lastAttempt: new Date().toISOString(),
    };
  }
  data.problems[slug].lastCode[language] = code;
  data.problems[slug].lastLanguage = language;
  data.problems[slug].lastAttempt = new Date().toISOString();
  saveProgress(data);
}

export function markSolved(slug: string): void {
  const data = loadProgress();
  if (data.problems[slug]) {
    data.problems[slug].solved = true;
    data.problems[slug].lastAttempt = new Date().toISOString();
  }
  saveProgress(data);
}

export function isSolved(slug: string): boolean {
  const data = loadProgress();
  return data.problems[slug]?.solved ?? false;
}

export function getSolvedCount(category: string, slugs: string[]): number {
  const data = loadProgress();
  return slugs.filter((slug) => data.problems[slug]?.solved).length;
}

export function saveQuizScore(score: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(QUIZ_SCORE_KEY, String(score));
  } catch {
    // storage full or unavailable
  }
}

export function getQuizScore(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(QUIZ_SCORE_KEY);
    if (raw === null) return null;
    return parseInt(raw, 10);
  } catch {
    return null;
  }
}

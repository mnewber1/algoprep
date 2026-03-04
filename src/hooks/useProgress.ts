"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Language, ProblemProgress } from "@/lib/types";
import {
  loadProgress,
  updateProblemCode,
  markSolved as markSolvedLib,
  getProblemProgress,
} from "@/lib/progress";

export function useProgress(slug: string) {
  const [progress, setProgress] = useState<ProblemProgress | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setProgress(getProblemProgress(slug));
  }, [slug]);

  const saveCode = useCallback(
    (language: Language, code: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        updateProblemCode(slug, language, code);
        setProgress(getProblemProgress(slug));
      }, 2000);
    },
    [slug]
  );

  const saveCodeImmediate = useCallback(
    (language: Language, code: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      updateProblemCode(slug, language, code);
      setProgress(getProblemProgress(slug));
    },
    [slug]
  );

  const markSolved = useCallback(() => {
    markSolvedLib(slug);
    setProgress(getProblemProgress(slug));
  }, [slug]);

  return { progress, saveCode, saveCodeImmediate, markSolved };
}

export function useSolvedCounts() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const data = loadProgress();
    const result: Record<string, number> = {};
    for (const [, progress] of Object.entries(data.problems)) {
      if (progress.solved) {
        // We don't have category here, so we count globally
      }
    }
    // Count by checking all problems
    setCounts(result);
  }, []);

  return counts;
}

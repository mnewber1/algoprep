"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { VisualizationStep } from "@/lib/visualization-types";

interface StepPlayerResult {
  currentStepIndex: number;
  totalSteps: number;
  currentStep: VisualizationStep;
  isFirst: boolean;
  isLast: boolean;
  isPlaying: boolean;
  goNext: () => void;
  goPrev: () => void;
  togglePlay: () => void;
  reset: () => void;
}

export function useStepPlayer(steps: VisualizationStep[]): StepPlayerResult {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;

  const goNext = useCallback(() => {
    setCurrentStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }, [steps.length]);

  const goPrev = useCallback(() => {
    setCurrentStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  // Auto-play with interval
  useEffect(() => {
    if (isPlaying) {
      if (isLast) {
        setIsPlaying(false);
        return;
      }
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((i) => {
          if (i >= steps.length - 1) {
            setIsPlaying(false);
            return i;
          }
          return i + 1;
        });
      }, 1200);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, isLast, steps.length]);

  return {
    currentStepIndex,
    totalSteps: steps.length,
    currentStep: steps[currentStepIndex],
    isFirst,
    isLast,
    isPlaying,
    goNext,
    goPrev,
    togglePlay,
    reset,
  };
}

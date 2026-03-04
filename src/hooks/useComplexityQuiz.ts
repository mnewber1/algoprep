"use client";

import { useState, useMemo, useCallback } from "react";
import { BigO } from "@/lib/types";
import {
  complexityQuestions,
  ComplexityQuestion,
} from "@/data/complexity-questions";
import { saveQuizScore, getQuizScore } from "@/lib/progress";

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface AnswerRecord {
  selectedTime: BigO;
  selectedSpace: BigO;
  correctTime: boolean;
  correctSpace: boolean;
}

export function useComplexityQuiz() {
  const [questions, setQuestions] = useState<ComplexityQuestion[]>(() =>
    shuffle(complexityQuestions)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState<BigO | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<BigO | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, AnswerRecord>>({});

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const isCorrect = useMemo(() => {
    if (!submitted) return null;
    return {
      time: selectedTime === currentQuestion.timeComplexity,
      space: selectedSpace === currentQuestion.spaceComplexity,
    };
  }, [submitted, selectedTime, selectedSpace, currentQuestion]);

  const score = useMemo(() => {
    let correct = 0;
    const total = Object.keys(answers).length;
    for (const a of Object.values(answers)) {
      if (a.correctTime && a.correctSpace) correct++;
    }
    return { correct, total };
  }, [answers]);

  const isComplete = score.total === totalQuestions;

  const submit = useCallback(() => {
    if (!selectedTime || !selectedSpace || submitted) return;
    setSubmitted(true);
    const correctTime = selectedTime === currentQuestion.timeComplexity;
    const correctSpace = selectedSpace === currentQuestion.spaceComplexity;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selectedTime,
        selectedSpace,
        correctTime,
        correctSpace,
      },
    }));

    // Save best score when completing all questions
    const newTotal = Object.keys(answers).length + 1;
    if (newTotal === totalQuestions) {
      let newCorrect = correctTime && correctSpace ? 1 : 0;
      for (const a of Object.values(answers)) {
        if (a.correctTime && a.correctSpace) newCorrect++;
      }
      const prev = getQuizScore();
      if (prev === null || newCorrect > prev) {
        saveQuizScore(newCorrect);
      }
    }
  }, [selectedTime, selectedSpace, submitted, currentQuestion, answers, totalQuestions]);

  const next = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedTime(null);
      setSelectedSpace(null);
      setSubmitted(false);
    }
  }, [currentIndex, totalQuestions]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      const prevAnswer = answers[questions[currentIndex - 1].id];
      if (prevAnswer) {
        setSelectedTime(prevAnswer.selectedTime);
        setSelectedSpace(prevAnswer.selectedSpace);
        setSubmitted(true);
      } else {
        setSelectedTime(null);
        setSelectedSpace(null);
        setSubmitted(false);
      }
    }
  }, [currentIndex, answers, questions]);

  const reset = useCallback(() => {
    setQuestions(shuffle(complexityQuestions));
    setCurrentIndex(0);
    setSelectedTime(null);
    setSelectedSpace(null);
    setSubmitted(false);
    setAnswers({});
  }, []);

  return {
    questions,
    currentIndex,
    currentQuestion,
    totalQuestions,
    selectedTime,
    selectedSpace,
    setSelectedTime,
    setSelectedSpace,
    submitted,
    isCorrect,
    score,
    submit,
    next,
    prev,
    isComplete,
    reset,
    answers,
  };
}

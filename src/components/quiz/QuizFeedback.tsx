"use client";

import { ComplexityQuestion } from "@/data/complexity-questions";

interface Props {
  question: ComplexityQuestion;
  isCorrect: { time: boolean; space: boolean };
}

export default function QuizFeedback({ question, isCorrect }: Props) {
  const bothCorrect = isCorrect.time && isCorrect.space;

  return (
    <div
      className={`rounded-lg border p-4 ${
        bothCorrect
          ? "bg-green-600/10 border-green-700"
          : "bg-red-600/10 border-red-700"
      }`}
    >
      <p
        className={`font-medium mb-2 ${
          bothCorrect ? "text-green-300" : "text-red-300"
        }`}
      >
        {bothCorrect
          ? "Correct!"
          : !isCorrect.time && !isCorrect.space
            ? "Both answers are incorrect."
            : !isCorrect.time
              ? "Time complexity is incorrect."
              : "Space complexity is incorrect."}
      </p>
      <p className="text-gray-300 text-sm">{question.explanation}</p>
      <div className="mt-2 flex gap-4 text-xs text-gray-400">
        <span>
          Time: <span className="font-mono text-gray-200">{question.timeComplexity}</span>
        </span>
        <span>
          Space: <span className="font-mono text-gray-200">{question.spaceComplexity}</span>
        </span>
      </div>
    </div>
  );
}

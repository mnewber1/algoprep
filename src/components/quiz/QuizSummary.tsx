"use client";

import { ComplexityQuestion } from "@/data/complexity-questions";
import { BigO } from "@/lib/types";

interface AnswerRecord {
  selectedTime: BigO;
  selectedSpace: BigO;
  correctTime: boolean;
  correctSpace: boolean;
}

interface Props {
  questions: ComplexityQuestion[];
  answers: Record<number, AnswerRecord>;
  score: { correct: number; total: number };
  onReset: () => void;
}

export default function QuizSummary({
  questions,
  answers,
  score,
  onReset,
}: Props) {
  const pct = Math.round((score.correct / score.total) * 100);
  const missed = questions.filter((q) => {
    const a = answers[q.id];
    return a && (!a.correctTime || !a.correctSpace);
  });

  return (
    <div className="space-y-6">
      {/* Score header */}
      <div className="text-center py-6">
        <p className="text-5xl font-bold text-white mb-2">
          {score.correct}/{score.total}
        </p>
        <p className="text-gray-400">
          {pct}% correct
        </p>
        <p className="mt-3 text-sm text-gray-500">
          {pct === 100
            ? "Perfect score! You really know your complexities."
            : pct >= 70
              ? "Great job! Review the missed questions below."
              : "Keep practicing — Big O gets easier with repetition."}
        </p>
      </div>

      {/* Missed questions */}
      {missed.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">
            Missed Questions ({missed.length})
          </h3>
          <div className="space-y-3">
            {missed.map((q) => {
              const a = answers[q.id];
              return (
                <div
                  key={q.id}
                  className="bg-[#252526] border border-gray-700 rounded-lg p-4"
                >
                  <p className="text-sm font-medium text-white mb-1">
                    {q.title}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs mb-2">
                    <span className="text-gray-400">
                      Time:{" "}
                      <span
                        className={
                          a.correctTime
                            ? "text-green-400 font-mono"
                            : "text-red-400 line-through font-mono"
                        }
                      >
                        {a.selectedTime}
                      </span>
                      {!a.correctTime && (
                        <span className="text-green-400 font-mono ml-1">
                          {q.timeComplexity}
                        </span>
                      )}
                    </span>
                    <span className="text-gray-400">
                      Space:{" "}
                      <span
                        className={
                          a.correctSpace
                            ? "text-green-400 font-mono"
                            : "text-red-400 line-through font-mono"
                        }
                      >
                        {a.selectedSpace}
                      </span>
                      {!a.correctSpace && (
                        <span className="text-green-400 font-mono ml-1">
                          {q.spaceComplexity}
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Try again */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={onReset}
          className="px-6 py-2.5 rounded bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

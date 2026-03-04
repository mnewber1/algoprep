"use client";

import { BigO } from "@/lib/types";
import { ComplexityQuestion } from "@/data/complexity-questions";
import ComplexityPicker from "./ComplexityPicker";
import QuizFeedback from "./QuizFeedback";

interface Props {
  question: ComplexityQuestion;
  selectedTime: BigO | null;
  selectedSpace: BigO | null;
  onSelectTime: (v: BigO) => void;
  onSelectSpace: (v: BigO) => void;
  submitted: boolean;
  isCorrect: { time: boolean; space: boolean } | null;
  onSubmit: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalQuestions: number;
  isLast: boolean;
}

export default function QuestionView({
  question,
  selectedTime,
  selectedSpace,
  onSelectTime,
  onSelectSpace,
  submitted,
  isCorrect,
  onSubmit,
  onNext,
  onPrev,
  currentIndex,
  totalQuestions,
  isLast,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-gray-500">{question.category}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all"
            style={{
              width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-white">{question.title}</h2>

      {/* Code snippet */}
      <pre className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 text-sm text-gray-200 font-mono overflow-x-auto leading-relaxed">
        {question.code}
      </pre>

      {/* Hint */}
      {question.hint && !submitted && (
        <p className="text-xs text-yellow-400/70 italic">
          Hint: {question.hint}
        </p>
      )}

      {/* Complexity pickers */}
      <div className="space-y-4">
        <ComplexityPicker
          label="Time Complexity"
          value={selectedTime}
          onChange={onSelectTime}
          disabled={submitted}
          correctAnswer={question.timeComplexity}
          showResult={submitted}
        />
        <ComplexityPicker
          label="Space Complexity"
          value={selectedSpace}
          onChange={onSelectSpace}
          disabled={submitted}
          correctAnswer={question.spaceComplexity}
          showResult={submitted}
        />
      </div>

      {/* Feedback */}
      {submitted && isCorrect && (
        <QuizFeedback question={question} isCorrect={isCorrect} />
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-sm rounded border border-gray-700 text-gray-300 hover:bg-gray-700/50 transition-colors disabled:opacity-30 disabled:cursor-default"
        >
          Previous
        </button>
        <div className="flex gap-3">
          {!submitted ? (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!selectedTime || !selectedSpace}
              className="px-5 py-2 text-sm rounded bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-default"
            >
              Submit
            </button>
          ) : !isLast ? (
            <button
              type="button"
              onClick={onNext}
              className="px-5 py-2 text-sm rounded bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

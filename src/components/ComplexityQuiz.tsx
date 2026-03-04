"use client";

import Link from "next/link";
import { useComplexityQuiz } from "@/hooks/useComplexityQuiz";
import QuestionView from "./quiz/QuestionView";
import QuizSummary from "./quiz/QuizSummary";

export default function ComplexityQuiz() {
  const quiz = useComplexityQuiz();

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      {/* Header */}
      <header className="border-b border-gray-700 bg-[#2d2d2d]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-200 transition-colors text-sm"
          >
            &larr; Home
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white">Complexity Quiz</h1>
            <p className="text-gray-400 text-xs">
              Identify the time and space complexity
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {quiz.isComplete ? (
          <QuizSummary
            questions={quiz.questions}
            answers={quiz.answers}
            score={quiz.score}
            onReset={quiz.reset}
          />
        ) : (
          <QuestionView
            question={quiz.currentQuestion}
            selectedTime={quiz.selectedTime}
            selectedSpace={quiz.selectedSpace}
            onSelectTime={quiz.setSelectedTime}
            onSelectSpace={quiz.setSelectedSpace}
            submitted={quiz.submitted}
            isCorrect={quiz.isCorrect}
            onSubmit={quiz.submit}
            onNext={quiz.next}
            onPrev={quiz.prev}
            currentIndex={quiz.currentIndex}
            totalQuestions={quiz.totalQuestions}
            isLast={quiz.currentIndex === quiz.totalQuestions - 1 && quiz.submitted}
          />
        )}
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getQuizScore } from "@/lib/progress";

export default function QuizCard() {
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    setBestScore(getQuizScore());
  }, []);

  return (
    <Link
      href="/complexity"
      className="block bg-[#252526] rounded-lg border border-gray-700 p-5 hover:border-gray-500 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              Complexity Quiz
            </h2>
            <p className="text-gray-400 text-sm">
              Test your Big O analysis skills
            </p>
          </div>
        </div>
        {bestScore !== null && (
          <span className="text-sm px-2.5 py-1 rounded bg-blue-900/50 text-blue-300 font-mono">
            {bestScore}/18
          </span>
        )}
      </div>
    </Link>
  );
}

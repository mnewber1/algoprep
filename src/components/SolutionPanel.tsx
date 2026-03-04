"use client";

import { useState } from "react";
import { Language } from "@/lib/types";
import { Solution } from "@/data/solutions";

interface Props {
  solution: Solution;
  title: string;
  onAskAboutLine?: (line: string) => void;
}

const langLabels: Record<Language, string> = {
  python: "Python",
  java: "Java",
  kotlin: "Kotlin",
};

export default function SolutionPanel({ solution, title, onAskAboutLine }: Props) {
  const [lang, setLang] = useState<Language>("python");
  const lines = solution.code[lang].split("\n");

  return (
    <div className="p-6 overflow-auto h-full text-gray-200">
      <h1 className="text-xl font-bold mb-1">{title}</h1>
      <span className="inline-block text-xs px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 mb-4">
        Solution
      </span>

      {/* Approach */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Approach</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{solution.approach}</p>
      </div>

      {/* Complexity */}
      <div className="flex gap-2 mb-5">
        <span className="text-[11px] px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-800/50">
          Time: {solution.timeComplexity}
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-800/50">
          Space: {solution.spaceComplexity}
        </span>
      </div>

      {/* Language tabs */}
      <div className="flex gap-1 mb-3">
        {(Object.keys(langLabels) as Language[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              lang === l
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-400 hover:text-gray-200"
            }`}
          >
            {langLabels[l]}
          </button>
        ))}
      </div>

      {/* Clickable hint */}
      {onAskAboutLine && (
        <p className="text-[9px] text-gray-600 mb-1.5">
          Click any line to ask AI about it
        </p>
      )}

      {/* Code block with clickable lines */}
      <div className="bg-[#0d0d0d] rounded-lg border border-gray-800 overflow-x-auto">
        <pre className="p-4 text-[12px] leading-[1.65] font-mono">
          {lines.map((line, i) => {
            const isEmpty = line.trim() === "";
            return (
              <div
                key={i}
                className={
                  isEmpty
                    ? "h-[1.65em]"
                    : onAskAboutLine
                    ? "text-gray-300 hover:bg-blue-600/15 hover:text-blue-200 cursor-pointer rounded-sm px-1 -mx-1 transition-colors"
                    : "text-gray-300"
                }
                onClick={() => {
                  if (!isEmpty && onAskAboutLine) {
                    onAskAboutLine(line.trim());
                  }
                }}
              >
                {line || "\n"}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

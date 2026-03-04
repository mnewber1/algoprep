"use client";

import { useEffect, useState } from "react";
import { CategoryInfo } from "@/lib/types";
import { getCodeExample } from "@/data/code-examples";
import StepThroughPlayer from "./visualization/StepThroughPlayer";

interface Props {
  category: CategoryInfo;
  onClose: () => void;
}

export default function AlgorithmModal({ category, onClose }: Props) {
  const [tab, setTab] = useState<"visualize" | "code">("visualize");
  const example = getCodeExample(category.id);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#1e1e1e] border border-gray-700 rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700/70">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{category.icon}</span>
            <div>
              <h2 className="text-lg font-bold text-white">{category.name}</h2>
              <p className="text-xs text-gray-400">{category.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700/70 px-5">
          <button
            onClick={() => setTab("visualize")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              tab === "visualize"
                ? "text-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Visualization
            {tab === "visualize" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
            )}
          </button>
          <button
            onClick={() => setTab("code")}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              tab === "code"
                ? "text-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Implementation
            {tab === "code" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === "visualize" ? (
            <div>
              <div className="text-xs text-gray-500 mb-3">
                Step through the algorithm to see how it works on example data.
              </div>
              <StepThroughPlayer category={category.id} />
            </div>
          ) : (
            <div>
              {/* Code header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-200">
                  {example.title}
                </h3>
                <span className="text-[10px] text-gray-500 font-mono uppercase">
                  {example.language}
                </span>
              </div>

              {/* Complexity badges */}
              <div className="flex gap-2 mb-4">
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-800/50">
                  Time: {example.timeComplexity}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-800/50">
                  Space: {example.spaceComplexity}
                </span>
              </div>

              {/* Code block */}
              <div className="bg-[#0d0d0d] rounded-lg border border-gray-800 overflow-x-auto mb-4">
                <pre className="p-4 text-[12px] leading-[1.6] font-mono text-gray-300">
                  <code>{example.code}</code>
                </pre>
              </div>

              {/* When to use */}
              <div>
                <h4 className="text-xs font-semibold text-gray-300 mb-2">
                  When to use this pattern
                </h4>
                <ul className="space-y-1">
                  {example.whenToUse.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs text-gray-400 flex items-start gap-2"
                    >
                      <span className="text-blue-400 mt-0.5 flex-shrink-0">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

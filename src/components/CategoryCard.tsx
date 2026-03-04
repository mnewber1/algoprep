"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CategoryInfo, Problem } from "@/lib/types";
import { loadProgress } from "@/lib/progress";
import ProgressBadge from "./ProgressBadge";

interface Props {
  category: CategoryInfo;
  problems: Problem[];
  onHowItWorks: () => void;
}

export default function CategoryCard({ category, problems, onHowItWorks }: Props) {
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    const data = loadProgress();
    const count = problems.filter((p) => data.problems[p.slug]?.solved).length;
    setSolvedCount(count);
  }, [problems]);

  return (
    <div className="bg-[#252526] rounded-lg border border-gray-700 p-5 hover:border-gray-500 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{category.icon}</span>
          <h2 className="text-lg font-semibold text-gray-100">
            {category.name}
          </h2>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded ${
            solvedCount === problems.length
              ? "bg-green-900/50 text-green-300"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {solvedCount}/{problems.length}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-3">{category.description}</p>

      {/* How it works button — opens modal */}
      <button
        onClick={onHowItWorks}
        className="text-xs text-blue-400 hover:text-blue-300 transition-colors mb-3 flex items-center gap-1.5 group"
      >
        <svg
          className="h-3 w-3 transition-transform group-hover:scale-110"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        How it works
      </button>

      <ul className="space-y-1.5">
        {problems.map((problem) => (
          <li key={problem.slug}>
            <Link
              href={`/problems/${problem.slug}`}
              className="flex items-center justify-between text-sm text-blue-400 hover:text-blue-300 transition-colors py-1 px-2 rounded hover:bg-gray-700/50"
            >
              <span>{problem.title}</span>
              <ProgressBadge slug={problem.slug} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { BigO } from "@/lib/types";

const OPTIONS: BigO[] = [
  "O(1)",
  "O(log n)",
  "O(n)",
  "O(n log n)",
  "O(n²)",
  "O(2ⁿ)",
  "O(n!)",
];

interface Props {
  label: string;
  value: BigO | null;
  onChange: (v: BigO) => void;
  disabled?: boolean;
  correctAnswer?: BigO;
  showResult?: boolean;
}

export default function ComplexityPicker({
  label,
  value,
  onChange,
  disabled,
  correctAnswer,
  showResult,
}: Props) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-300 mb-2">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((option) => {
          const isSelected = value === option;
          const isCorrectAnswer = correctAnswer === option;

          let classes =
            "px-3 py-1.5 rounded text-sm font-mono border transition-colors cursor-pointer ";

          if (showResult && isCorrectAnswer) {
            classes += "bg-green-600/20 border-green-500 text-green-300 ";
          } else if (showResult && isSelected && !isCorrectAnswer) {
            classes += "bg-red-600/20 border-red-500 text-red-300 ";
          } else if (isSelected) {
            classes += "bg-blue-600 border-blue-500 text-white ";
          } else {
            classes +=
              "bg-[#2d2d2d] border-gray-700 text-gray-300 hover:border-gray-500 ";
          }

          if (disabled) {
            classes += "cursor-default ";
          }

          return (
            <button
              key={option}
              type="button"
              className={classes}
              onClick={() => !disabled && onChange(option)}
              disabled={disabled}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

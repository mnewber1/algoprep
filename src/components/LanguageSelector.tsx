"use client";

import { Language } from "@/lib/types";

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "java", label: "Java" },
  { value: "kotlin", label: "Kotlin" },
  { value: "python", label: "Python 3" },
];

interface Props {
  value: Language;
  onChange: (lang: Language) => void;
  disabled?: boolean;
}

export default function LanguageSelector({ value, onChange, disabled }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Language)}
      disabled={disabled}
      className="bg-[#2d2d2d] text-gray-200 border border-gray-600 rounded px-3 py-1.5 text-sm
        focus:outline-none focus:border-blue-500 cursor-pointer disabled:opacity-50"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}

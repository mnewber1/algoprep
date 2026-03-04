"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Language } from "@/lib/types";

const LANGUAGE_MAP: Record<Language, string> = {
  java: "java",
  kotlin: "kotlin",
  python: "python",
};

interface Props {
  value: string;
  language: Language;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, language, onChange }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-full">
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#1e1e1e] flex items-center justify-center z-10">
          <div className="flex items-center gap-3 text-gray-400">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading editor...
          </div>
        </div>
      )}
      <Editor
        height="100%"
        language={LANGUAGE_MAP[language]}
        value={value}
        theme="vs-dark"
        onChange={(val) => onChange(val || "")}
        onMount={() => setIsLoaded(true)}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          wordWrap: "on",
          padding: { top: 12 },
        }}
      />
    </div>
  );
}

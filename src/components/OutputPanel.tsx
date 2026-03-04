"use client";

import { ExecutionResult } from "@/lib/types";

interface Props {
  result: ExecutionResult | null;
  isRunning: boolean;
}

export default function OutputPanel({ result, isRunning }: Props) {
  if (isRunning) {
    return (
      <div className="bg-[#1e1e1e] border-t border-gray-700 p-4">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Executing...
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-[#1e1e1e] border-t border-gray-700 p-4">
        <p className="text-gray-500 text-sm">Click &quot;Run&quot; to execute your code against test cases.</p>
      </div>
    );
  }

  if (result.error && result.results.length === 0) {
    return (
      <div className="bg-[#1e1e1e] border-t border-gray-700 p-4">
        <h3 className="text-red-400 font-medium text-sm mb-2">Error</h3>
        <pre className="text-red-300 text-xs whitespace-pre-wrap font-mono bg-red-950/30 p-3 rounded overflow-auto max-h-48">
          {result.error}
        </pre>
      </div>
    );
  }

  const passCount = result.results.filter((r) => r.passed).length;
  const total = result.results.length;

  return (
    <div className="bg-[#1e1e1e] border-t border-gray-700 p-4 overflow-auto">
      <div className="flex items-center gap-3 mb-3">
        <h3
          className={`font-medium text-sm ${
            result.allPassed ? "text-green-400" : "text-red-400"
          }`}
        >
          {result.allPassed ? "All Tests Passed!" : "Some Tests Failed"}
        </h3>
        <span className="text-gray-400 text-xs">
          {passCount}/{total} passed
        </span>
      </div>

      <div className="space-y-2">
        {result.results.map((r, idx) => (
          <div
            key={idx}
            className={`rounded p-3 text-xs font-mono ${
              r.passed
                ? "bg-green-950/30 border border-green-800/50"
                : "bg-red-950/30 border border-red-800/50"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={r.passed ? "text-green-400" : "text-red-400"}>
                {r.passed ? "PASS" : "FAIL"}
              </span>
              <span className="text-gray-400">Test {idx + 1}</span>
            </div>
            <div className="text-gray-300">
              <span className="text-gray-500">Input: </span>
              {r.input}
            </div>
            <div className="text-gray-300">
              <span className="text-gray-500">Expected: </span>
              {r.expected}
            </div>
            {!r.passed && (
              <div className="text-red-300">
                <span className="text-gray-500">Got: </span>
                {r.actual}
              </div>
            )}
          </div>
        ))}
      </div>

      {result.error && (
        <div className="mt-3">
          <h4 className="text-yellow-400 text-xs mb-1">Stderr:</h4>
          <pre className="text-yellow-300 text-xs whitespace-pre-wrap font-mono bg-yellow-950/20 p-2 rounded max-h-32 overflow-auto">
            {result.error}
          </pre>
        </div>
      )}
    </div>
  );
}

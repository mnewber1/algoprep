"use client";

import { useState, useCallback } from "react";
import { Language, Problem, ExecutionResult } from "@/lib/types";
import { assembleCode } from "@/lib/harness";
import { parseExecutionResult } from "@/lib/piston";

export function useCodeExecution() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  const execute = useCallback(
    async (problem: Problem, code: string, language: Language) => {
      setIsRunning(true);
      setResult(null);

      try {
        const { source, filename } = assembleCode(problem, code, language);

        const response = await fetch("/api/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language, source, filename }),
        });

        const data = await response.json();

        if (data.error) {
          setResult({ results: [], error: data.error, allPassed: false });
          return { results: [], error: data.error, allPassed: false } as ExecutionResult;
        }

        const execResult = parseExecutionResult(
          data.stdout || "",
          data.stderr || "",
          problem.testCases
        );

        setResult(execResult);
        return execResult;
      } catch (err) {
        const error =
          err instanceof Error ? err.message : "Failed to execute code";
        const execResult: ExecutionResult = {
          results: [],
          error,
          allPassed: false,
        };
        setResult(execResult);
        return execResult;
      } finally {
        setIsRunning(false);
      }
    },
    []
  );

  const clearResult = useCallback(() => setResult(null), []);

  return { isRunning, result, execute, clearResult };
}

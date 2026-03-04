import { TestCase, TestResult, ExecutionResult } from "./types";

export function parseExecutionResult(
  stdout: string,
  stderr: string,
  testCases: TestCase[]
): ExecutionResult {
  if (stderr && !stdout.trim()) {
    return {
      results: [],
      error: stderr,
      allPassed: false,
    };
  }

  const lines = stdout.trim().split("\n");
  const results: TestResult[] = [];

  for (let i = 0; i < testCases.length; i++) {
    const actual = i < lines.length ? lines[i].trim() : "NO OUTPUT";
    const expected = testCases[i].expected.trim();
    const passed = normalizeOutput(actual) === normalizeOutput(expected);

    results.push({
      input: testCases[i].input,
      expected,
      actual,
      passed,
    });
  }

  return {
    results,
    error: stderr || undefined,
    allPassed: results.every((r) => r.passed),
  };
}

function normalizeOutput(s: string): string {
  return s
    .replace(/\s+/g, " ")
    .replace(/True/g, "true")
    .replace(/False/g, "false")
    .trim();
}

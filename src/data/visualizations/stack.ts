import { StackStep } from "@/lib/visualization-types";

export function generateStackSteps(): StackStep[] {
  const input = "({[]})";
  const steps: StackStep[] = [];
  const stack: string[] = [];
  const matchedPairs: number[] = [];
  const openers: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const isOpener = (c: string) => "({[".includes(c);

  steps.push({
    type: "stack",
    description: `Check if "${input}" has valid parentheses. Start with empty stack.`,
    input,
    currentIndex: -1,
    stack: [],
    matchedPairs: [],
    status: "processing",
  });

  // Track which indices were pushed so we can match them
  const stackIndices: number[] = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (isOpener(char)) {
      stack.push(char);
      stackIndices.push(i);
      steps.push({
        type: "stack",
        description: `'${char}' is an opener. Push onto stack.`,
        input,
        currentIndex: i,
        stack: [...stack],
        matchedPairs: [...matchedPairs],
        status: "push",
      });
    } else {
      const expected = openers[char];
      if (stack.length > 0 && stack[stack.length - 1] === expected) {
        stack.pop();
        const matchIndex = stackIndices.pop()!;
        matchedPairs.push(matchIndex, i);
        steps.push({
          type: "stack",
          description: `'${char}' matches '${expected}'. Pop from stack!`,
          input,
          currentIndex: i,
          stack: [...stack],
          matchedPairs: [...matchedPairs],
          status: "match",
        });
      } else {
        steps.push({
          type: "stack",
          description: `'${char}' does not match top of stack. Invalid!`,
          input,
          currentIndex: i,
          stack: [...stack],
          matchedPairs: [...matchedPairs],
          status: "mismatch",
        });
        return steps;
      }
    }
  }

  steps.push({
    type: "stack",
    description: stack.length === 0
      ? `Stack is empty. All parentheses matched! Valid.`
      : `Stack not empty. Unmatched openers remain. Invalid.`,
    input,
    currentIndex: input.length,
    stack: [...stack],
    matchedPairs: [...matchedPairs],
    status: "done",
  });

  return steps;
}

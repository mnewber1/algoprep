import { TwoPointersStep, CellState } from "@/lib/visualization-types";

export function generateTwoPointersSteps(): TwoPointersStep[] {
  const array = [1, 3, 5, 7, 9, 11, 14];
  const target = 14;
  const steps: TwoPointersStep[] = [];

  let left = 0;
  let right = array.length - 1;

  // Initial state
  const makeCellStates = (l: number, r: number, eliminated: Set<number>, found: number[]): CellState[] =>
    array.map((_, i) => {
      if (found.includes(i)) return "found";
      if (eliminated.has(i)) return "eliminated";
      if (i === l || i === r) return "active";
      return "default";
    });

  const eliminated = new Set<number>();

  steps.push({
    type: "two-pointers",
    description: `Find two numbers that sum to ${target}. Set L=0, R=${right}.`,
    array,
    left,
    right,
    target,
    cellStates: makeCellStates(left, right, eliminated, []),
  });

  while (left < right) {
    const sum = array[left] + array[right];

    if (sum === target) {
      steps.push({
        type: "two-pointers",
        description: `${array[left]} + ${array[right]} = ${sum} = target. Found!`,
        array,
        left,
        right,
        target,
        cellStates: makeCellStates(-1, -1, eliminated, [left, right]),
      });
      break;
    } else if (sum < target) {
      steps.push({
        type: "two-pointers",
        description: `${array[left]} + ${array[right]} = ${sum} < ${target}. Move L right.`,
        array,
        left,
        right,
        target,
        cellStates: makeCellStates(left, right, eliminated, []),
      });
      eliminated.add(left);
      left++;
    } else {
      steps.push({
        type: "two-pointers",
        description: `${array[left]} + ${array[right]} = ${sum} > ${target}. Move R left.`,
        array,
        left,
        right,
        target,
        cellStates: makeCellStates(left, right, eliminated, []),
      });
      eliminated.add(right);
      right--;
    }
  }

  return steps;
}

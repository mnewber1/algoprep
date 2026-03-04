import { BinarySearchStep, CellState } from "@/lib/visualization-types";

export function generateBinarySearchSteps(): BinarySearchStep[] {
  const array = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  const target = 23;
  const steps: BinarySearchStep[] = [];

  let low = 0;
  let high = array.length - 1;
  const eliminated = new Set<number>();

  const makeCellStates = (lo: number, hi: number, mid: number, found: number | null): CellState[] =>
    array.map((_, i) => {
      if (found !== null && i === found) return "found";
      if (eliminated.has(i)) return "eliminated";
      if (i === mid) return "mid";
      if (i === lo || i === hi) return "active";
      if (i >= lo && i <= hi) return "default";
      return "eliminated";
    });

  steps.push({
    type: "binary-search",
    description: `Find ${target}. Set low=0, high=${high}.`,
    array,
    low,
    high,
    mid: -1,
    target,
    cellStates: makeCellStates(low, high, -1, null),
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (array[mid] === target) {
      steps.push({
        type: "binary-search",
        description: `mid=${mid}, arr[${mid}]=${array[mid]} = target. Found!`,
        array,
        low,
        high,
        mid,
        target,
        cellStates: makeCellStates(low, high, -1, mid),
      });
      break;
    } else if (array[mid] < target) {
      steps.push({
        type: "binary-search",
        description: `mid=${mid}, arr[${mid}]=${array[mid]} < ${target}. Search right half.`,
        array,
        low,
        high,
        mid,
        target,
        cellStates: makeCellStates(low, high, mid, null),
      });
      for (let i = low; i <= mid; i++) eliminated.add(i);
      low = mid + 1;
    } else {
      steps.push({
        type: "binary-search",
        description: `mid=${mid}, arr[${mid}]=${array[mid]} > ${target}. Search left half.`,
        array,
        low,
        high,
        mid,
        target,
        cellStates: makeCellStates(low, high, mid, null),
      });
      for (let i = mid; i <= high; i++) eliminated.add(i);
      high = mid - 1;
    }
  }

  return steps;
}

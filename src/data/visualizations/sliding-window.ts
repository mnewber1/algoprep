import { SlidingWindowStep } from "@/lib/visualization-types";

export function generateSlidingWindowSteps(): SlidingWindowStep[] {
  const array = [2, 1, 5, 1, 3, 2];
  const k = 3;
  const steps: SlidingWindowStep[] = [];

  // Build initial window
  let currentSum = 0;
  for (let i = 0; i < k; i++) {
    currentSum += array[i];
  }
  let bestSum = currentSum;

  steps.push({
    type: "sliding-window",
    description: `Initial window [0..${k - 1}]: sum = ${currentSum}. Best = ${bestSum}.`,
    array,
    windowLeft: 0,
    windowRight: k - 1,
    currentSum,
    bestSum,
  });

  // Slide the window
  for (let i = k; i < array.length; i++) {
    const removed = array[i - k];
    const added = array[i];
    currentSum = currentSum - removed + added;
    const windowLeft = i - k + 1;
    const windowRight = i;

    if (currentSum > bestSum) {
      bestSum = currentSum;
      steps.push({
        type: "sliding-window",
        description: `Slide: remove ${removed}, add ${added}. Sum = ${currentSum} > ${bestSum - (currentSum - bestSum + removed - added) || bestSum}. New best!`,
        array,
        windowLeft,
        windowRight,
        currentSum,
        bestSum,
      });
    } else {
      steps.push({
        type: "sliding-window",
        description: `Slide: remove ${removed}, add ${added}. Sum = ${currentSum}. Best stays ${bestSum}.`,
        array,
        windowLeft,
        windowRight,
        currentSum,
        bestSum,
      });
    }
  }

  steps.push({
    type: "sliding-window",
    description: `Done! Maximum sum of ${k} consecutive elements = ${bestSum}.`,
    array,
    windowLeft: -1,
    windowRight: -1,
    currentSum: 0,
    bestSum,
  });

  return steps;
}

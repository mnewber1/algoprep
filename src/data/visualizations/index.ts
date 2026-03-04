import { Category } from "@/lib/types";
import { VisualizationStep } from "@/lib/visualization-types";
import { generateTwoPointersSteps } from "./two-pointers";
import { generateSlidingWindowSteps } from "./sliding-window";
import { generateBinarySearchSteps } from "./binary-search";
import { generateBfsSteps } from "./bfs";
import { generateDfsSteps } from "./dfs";
import { generateStackSteps } from "./stack";
import { generateHashMapSteps } from "./hash-map";
import { generateLinkedListSteps } from "./linked-list";

const generators: Record<Category, () => VisualizationStep[]> = {
  "two-pointers": generateTwoPointersSteps,
  "sliding-window": generateSlidingWindowSteps,
  "binary-search": generateBinarySearchSteps,
  bfs: generateBfsSteps,
  dfs: generateDfsSteps,
  stack: generateStackSteps,
  "hash-map": generateHashMapSteps,
  "linked-list": generateLinkedListSteps,
};

export function getVisualization(category: Category): VisualizationStep[] {
  return generators[category]();
}

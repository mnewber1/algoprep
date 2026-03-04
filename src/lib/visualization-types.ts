export type CellState = "default" | "active" | "found" | "eliminated" | "window" | "current" | "mid";

export interface TwoPointersStep {
  type: "two-pointers";
  description: string;
  array: number[];
  left: number;
  right: number;
  target: number;
  cellStates: CellState[];
}

export interface SlidingWindowStep {
  type: "sliding-window";
  description: string;
  array: number[];
  windowLeft: number;
  windowRight: number;
  currentSum: number;
  bestSum: number;
}

export interface BinarySearchStep {
  type: "binary-search";
  description: string;
  array: number[];
  low: number;
  high: number;
  mid: number;
  target: number;
  cellStates: CellState[];
}

export interface BfsStep {
  type: "bfs";
  description: string;
  grid: number[][];
  cellStates: string[][];
  queue: [number, number][];
  level: number;
}

export type TreeNodeState = "unvisited" | "current" | "in-stack" | "visited";

export interface TreeNode {
  id: number;
  value: number;
  left: number | null;
  right: number | null;
  x: number;
  y: number;
}

export interface DfsStep {
  type: "dfs";
  description: string;
  nodes: TreeNode[];
  nodeStates: TreeNodeState[];
  callStack: number[];
  maxDepth: number;
  currentDepth: number;
}

export interface StackStep {
  type: "stack";
  description: string;
  input: string;
  currentIndex: number;
  stack: string[];
  matchedPairs: number[];
  status: "processing" | "push" | "pop" | "match" | "mismatch" | "done";
}

export interface HashMapEntry {
  key: number;
  value: number;
}

export interface HashMapStep {
  type: "hash-map";
  description: string;
  array: number[];
  currentIndex: number;
  map: HashMapEntry[];
  target: number;
  lookingFor: number | null;
  foundIndices: number[];
}

export type LinkedListNodeState = "default" | "prev" | "current" | "next" | "done";

export interface LinkedListNode {
  value: number;
  reversed: boolean;
}

export interface LinkedListStep {
  type: "linked-list";
  description: string;
  nodes: LinkedListNode[];
  prevIndex: number | null;
  currentIndex: number | null;
  nextIndex: number | null;
  nullTerminator: "end" | "start" | "both";
}

export type VisualizationStep =
  | TwoPointersStep
  | SlidingWindowStep
  | BinarySearchStep
  | BfsStep
  | DfsStep
  | StackStep
  | HashMapStep
  | LinkedListStep;

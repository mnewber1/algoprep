export type Category =
  | "two-pointers"
  | "sliding-window"
  | "binary-search"
  | "bfs"
  | "dfs"
  | "stack"
  | "hash-map"
  | "linked-list";

export type Language = "java" | "kotlin" | "python";

export interface Problem {
  slug: string;
  title: string;
  category: Category;
  difficulty: "easy";
  description: string;
  examples: string;
  constraints: string;
  starterCode: Record<Language, string>;
  testCases: TestCase[];
  functionName: string;
  invocation: Record<Language, string>;
}

export interface TestCase {
  input: string;
  expected: string;
  args: string[];
}

export interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export interface ExecutionResult {
  results: TestResult[];
  error?: string;
  allPassed: boolean;
}

export interface ProblemProgress {
  solved: boolean;
  lastLanguage: Language;
  lastCode: Record<Language, string>;
  lastAttempt: string;
}

export interface ProgressData {
  problems: Record<string, ProblemProgress>;
}

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  icon: string;
  walkthrough: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "two-pointers",
    name: "Two Pointers",
    description: "Traverse from both ends or use two indices",
    icon: "👉👈",
    walkthrough:
      "Use two index variables that move toward each other or in the same direction. Typically one starts at the beginning and one at the end of a sorted array. At each step, compare the values at both pointers and decide which one to move. This avoids nested loops and runs in O(n) time.\n\nPattern: left = 0, right = end. While left < right, check a condition and move one pointer inward.",
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    description: "Fixed or variable-size window over data",
    icon: "🪟",
    walkthrough:
      "Maintain a \"window\" (a contiguous subarray or substring) using two pointers: a left and right boundary. Expand the window by moving right, and shrink it by moving left when a constraint is violated. Track the best answer seen so far.\n\nFixed window: advance both ends together, adding the new element and removing the old. Variable window: expand right until invalid, then shrink left until valid again.",
  },
  {
    id: "binary-search",
    name: "Binary Search",
    description: "Divide search space in half each step",
    icon: "🔍",
    walkthrough:
      "Works on sorted data. Set low and high bounds, compute mid = (low + high) / 2. If the target equals nums[mid], you're done. If target is smaller, search the left half (high = mid - 1). If larger, search the right half (low = mid + 1). Repeat until found or low > high. Runs in O(log n).\n\nKey insight: each comparison eliminates half the remaining search space.",
  },
  {
    id: "bfs",
    name: "BFS",
    description: "Level-by-level graph/tree traversal",
    icon: "🌊",
    walkthrough:
      "Breadth-First Search explores all neighbors at the current depth before moving deeper. Use a queue: add the starting node, then repeatedly dequeue a node, process it, and enqueue its unvisited neighbors.\n\nBFS naturally finds shortest paths in unweighted graphs. For grids, treat each cell as a node with 4 neighbors (up/down/left/right). Track visited cells to avoid cycles.",
  },
  {
    id: "dfs",
    name: "DFS",
    description: "Depth-first graph/tree traversal",
    icon: "🌲",
    walkthrough:
      "Depth-First Search goes as deep as possible along each branch before backtracking. Implement with recursion or an explicit stack. For trees: call dfs(node.left) and dfs(node.right) recursively, with a base case when node is null.\n\nCommon pattern: process the current node, recurse on children, then combine results. DFS is ideal for tree problems like depth, path sums, and subtree operations.",
  },
  {
    id: "stack",
    name: "Stack",
    description: "LIFO data structure problems",
    icon: "📚",
    walkthrough:
      "A stack follows Last-In-First-Out: push to add, pop to remove the most recent item. Use it when you need to match or track things in reverse order.\n\nClassic use: matching parentheses (push openers, pop when you see a closer and check it matches). Also useful for evaluating expressions, tracking minimums, and monotonic stack patterns where you maintain increasing/decreasing order.",
  },
  {
    id: "hash-map",
    name: "Hash Map",
    description: "Key-value lookups for fast access",
    icon: "🗺️",
    walkthrough:
      "A hash map (dictionary) stores key-value pairs with O(1) average lookup. Use it to remember values you've seen while iterating, avoiding nested loops.\n\nCommon pattern: iterate through an array, for each element check if a complementary value exists in the map, then store the current element. This turns O(n^2) brute-force into O(n). Also useful for counting frequencies and grouping items.",
  },
  {
    id: "linked-list",
    name: "Linked List",
    description: "Pointer-based sequential data",
    icon: "🔗",
    walkthrough:
      "A linked list is a chain of nodes where each node holds a value and a pointer to the next node. You can only access elements by following pointers from the head.\n\nKey techniques: use a dummy head node to simplify edge cases, use slow/fast pointers (tortoise and hare) to detect cycles or find the middle, and reverse a list by re-pointing each node's next pointer to the previous node.",
  },
];

import { BfsStep } from "@/lib/visualization-types";

// 0=open, 1=wall
const GRID = [
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 1, 0],
  [1, 0, 0, 0, 0],
];

type CellState = "empty" | "wall" | "start" | "current" | "visited" | "queued";

export function generateBfsSteps(): BfsStep[] {
  const rows = GRID.length;
  const cols = GRID[0].length;
  const steps: BfsStep[] = [];

  const cellStates: CellState[][] = GRID.map((row) =>
    row.map((v) => (v === 1 ? "wall" : "empty"))
  );

  const cloneStates = (): string[][] => cellStates.map((r) => [...r]);

  const start: [number, number] = [0, 0];
  const queue: [number, number][] = [start];
  cellStates[0][0] = "start";

  steps.push({
    type: "bfs",
    description: "Start BFS from top-left cell (0,0).",
    grid: GRID,
    cellStates: cloneStates(),
    queue: [...queue],
    level: 0,
  });

  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  let level = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    level++;

    for (let i = 0; i < levelSize; i++) {
      const [r, c] = queue.shift()!;
      cellStates[r][c] = "visited";

      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && cellStates[nr][nc] === "empty") {
          cellStates[nr][nc] = "queued";
          queue.push([nr, nc]);
        }
      }
    }

    // Mark current level cells
    const snap = cloneStates();
    for (const [r, c] of queue) {
      snap[r][c] = "current";
    }

    steps.push({
      type: "bfs",
      description: `Level ${level}: explored ${levelSize} cell(s). Queue has ${queue.length} next.`,
      grid: GRID,
      cellStates: snap,
      queue: [...queue],
      level,
    });
  }

  steps.push({
    type: "bfs",
    description: `BFS complete! Visited all reachable cells in ${level} levels.`,
    grid: GRID,
    cellStates: cloneStates(),
    queue: [],
    level,
  });

  return steps;
}

import { DfsStep, TreeNode, TreeNodeState } from "@/lib/visualization-types";

// 7-node binary tree laid out for rendering:
//         4
//       /   \
//      2     6
//     / \   / \
//    1   3 5   7
const NODES: TreeNode[] = [
  { id: 0, value: 4, left: 1, right: 2, x: 50, y: 15 },
  { id: 1, value: 2, left: 3, right: 4, x: 25, y: 50 },
  { id: 2, value: 6, left: 5, right: 6, x: 75, y: 50 },
  { id: 3, value: 1, left: null, right: null, x: 12, y: 85 },
  { id: 4, value: 3, left: null, right: null, x: 38, y: 85 },
  { id: 5, value: 5, left: null, right: null, x: 62, y: 85 },
  { id: 6, value: 7, left: null, right: null, x: 88, y: 85 },
];

export function generateDfsSteps(): DfsStep[] {
  const steps: DfsStep[] = [];
  const nodeStates: TreeNodeState[] = NODES.map(() => "unvisited");
  const callStack: number[] = [];

  const snap = (desc: string, maxDepth: number, currentDepth: number) => {
    steps.push({
      type: "dfs",
      description: desc,
      nodes: NODES,
      nodeStates: [...nodeStates],
      callStack: [...callStack],
      maxDepth,
      currentDepth,
    });
  };

  snap("Find max depth of the binary tree. Start DFS at root (4).", 0, 0);

  let maxDepth = 0;

  function dfs(nodeId: number, depth: number) {
    const node = NODES[nodeId];
    nodeStates[nodeId] = "current";
    callStack.push(nodeId);
    snap(`Visit node ${node.value} at depth ${depth}.`, maxDepth, depth);

    nodeStates[nodeId] = "in-stack";

    if (node.left !== null) {
      dfs(node.left, depth + 1);
    }
    if (node.right !== null) {
      dfs(node.right, depth + 1);
    }

    if (node.left === null && node.right === null) {
      if (depth > maxDepth) maxDepth = depth;
      snap(`Leaf node ${node.value} at depth ${depth}. Max depth = ${maxDepth}.`, maxDepth, depth);
    }

    nodeStates[nodeId] = "visited";
    callStack.pop();
    snap(`Backtrack from node ${node.value}.`, maxDepth, depth);
  }

  dfs(0, 1);

  snap(`DFS complete! Maximum depth = ${maxDepth}.`, maxDepth, 0);

  return steps;
}

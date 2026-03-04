import { LinkedListStep, LinkedListNode } from "@/lib/visualization-types";

export function generateLinkedListSteps(): LinkedListStep[] {
  const steps: LinkedListStep[] = [];
  const nodes: LinkedListNode[] = [
    { value: 1, reversed: false },
    { value: 2, reversed: false },
    { value: 3, reversed: false },
    { value: 4, reversed: false },
  ];

  const cloneNodes = (): LinkedListNode[] => nodes.map((n) => ({ ...n }));

  steps.push({
    type: "linked-list",
    description: "Reverse linked list: 1 -> 2 -> 3 -> 4 -> null. Set prev=null, curr=head.",
    nodes: cloneNodes(),
    prevIndex: null,
    currentIndex: 0,
    nextIndex: 1,
    nullTerminator: "end",
  });

  let prev: number | null = null;
  let curr: number | null = 0;

  while (curr !== null && curr < nodes.length) {
    const next: number | null = curr + 1 < nodes.length ? curr + 1 : null;

    steps.push({
      type: "linked-list",
      description: `Save next=${next !== null ? nodes[next].value : "null"}. Point ${nodes[curr].value}.next to ${prev !== null ? nodes[prev].value : "null"}.`,
      nodes: cloneNodes(),
      prevIndex: prev,
      currentIndex: curr,
      nextIndex: next,
      nullTerminator: prev === null ? "start" : "both",
    });

    // Reverse the arrow
    nodes[curr].reversed = true;

    steps.push({
      type: "linked-list",
      description: `Arrow reversed. Move prev=${nodes[curr].value}, curr=${next !== null ? nodes[next].value : "null"}.`,
      nodes: cloneNodes(),
      prevIndex: curr,
      currentIndex: next,
      nextIndex: next !== null && next + 1 < nodes.length ? next + 1 : null,
      nullTerminator: "both",
    });

    prev = curr;
    curr = next;
  }

  steps.push({
    type: "linked-list",
    description: "Done! List reversed: null <- 1 <- 2 <- 3 <- 4. New head = 4.",
    nodes: cloneNodes(),
    prevIndex: nodes.length - 1,
    currentIndex: null,
    nextIndex: null,
    nullTerminator: "start",
  });

  return steps;
}

import { DfsStep, TreeNodeState } from "@/lib/visualization-types";

const nodeColors: Record<TreeNodeState, string> = {
  unvisited: "bg-gray-600 border-gray-500",
  current: "bg-blue-600 border-blue-400",
  "in-stack": "bg-yellow-600 border-yellow-400",
  visited: "bg-green-600 border-green-400",
};

interface Props {
  step: DfsStep;
}

export default function DfsRenderer({ step }: Props) {
  return (
    <div>
      <div className="flex gap-3 text-[10px] text-gray-400 mb-2">
        <span>
          Depth: <span className="text-blue-400 font-semibold">{step.currentDepth}</span>
        </span>
        <span>
          Max: <span className="text-green-400 font-semibold">{step.maxDepth}</span>
        </span>
      </div>
      <div className="flex gap-3">
        {/* Tree visualization */}
        <div className="relative flex-1" style={{ height: 160 }}>
          {/* Edges */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            {step.nodes.map((node) => {
              if (node.left !== null) {
                const child = step.nodes[node.left];
                return (
                  <line
                    key={`e-${node.id}-${node.left}`}
                    x1={node.x}
                    y1={node.y}
                    x2={child.x}
                    y2={child.y}
                    stroke="#555"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              }
              return null;
            })}
            {step.nodes.map((node) => {
              if (node.right !== null) {
                const child = step.nodes[node.right];
                return (
                  <line
                    key={`e-${node.id}-${node.right}`}
                    x1={node.x}
                    y1={node.y}
                    x2={child.x}
                    y2={child.y}
                    stroke="#555"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              }
              return null;
            })}
          </svg>
          {/* Nodes */}
          {step.nodes.map((node, i) => (
            <div
              key={node.id}
              className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 transition-all duration-300 ${nodeColors[step.nodeStates[i]]}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {node.value}
            </div>
          ))}
        </div>
        {/* Call Stack */}
        <div className="w-14 flex-shrink-0">
          <div className="text-[9px] text-gray-500 mb-1">Stack</div>
          <div className="flex flex-col-reverse gap-0.5">
            {step.callStack.map((nodeId, i) => (
              <div
                key={i}
                className="bg-yellow-600/40 border border-yellow-600 rounded text-[9px] text-center py-0.5 text-yellow-200"
              >
                {step.nodes[nodeId].value}
              </div>
            ))}
            {step.callStack.length === 0 && (
              <div className="text-[9px] text-gray-600 italic">empty</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

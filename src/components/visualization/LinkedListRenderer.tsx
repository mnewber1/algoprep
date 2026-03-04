import { LinkedListStep } from "@/lib/visualization-types";

interface Props {
  step: LinkedListStep;
}

export default function LinkedListRenderer({ step }: Props) {
  const getNodeBg = (i: number) => {
    if (i === step.currentIndex) return "bg-blue-600 border-blue-400";
    if (i === step.prevIndex) return "bg-yellow-600 border-yellow-400";
    if (i === step.nextIndex) return "bg-gray-500 border-gray-400";
    if (step.nodes[i].reversed) return "bg-green-700 border-green-500";
    return "bg-gray-700 border-gray-500";
  };

  return (
    <div>
      {/* Pointer labels */}
      <div className="flex gap-2 text-[9px] mb-2">
        {step.prevIndex !== null && (
          <span className="text-yellow-400">prev={step.nodes[step.prevIndex].value}</span>
        )}
        {step.currentIndex !== null && (
          <span className="text-blue-400">curr={step.nodes[step.currentIndex].value}</span>
        )}
        {step.nextIndex !== null && (
          <span className="text-gray-400">next={step.nodes[step.nextIndex].value}</span>
        )}
      </div>
      {/* Nodes */}
      <div className="flex items-center gap-0">
        {step.nullTerminator === "start" || step.nullTerminator === "both" ? (
          <span className="text-[9px] text-gray-500 font-mono mr-1">null</span>
        ) : null}
        {step.nodes.map((node, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-white border-2 transition-all duration-300 ${getNodeBg(i)}`}
            >
              {node.value}
            </div>
            {i < step.nodes.length - 1 && (
              <div className="w-5 flex items-center justify-center text-gray-500">
                {node.reversed ? (
                  <svg className="w-4 h-4 rotate-180 text-green-400 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            )}
          </div>
        ))}
        {step.nullTerminator === "end" || step.nullTerminator === "both" ? (
          <span className="text-[9px] text-gray-500 font-mono ml-1">null</span>
        ) : null}
      </div>
    </div>
  );
}

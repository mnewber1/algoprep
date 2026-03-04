import { BfsStep } from "@/lib/visualization-types";

const cellColors: Record<string, string> = {
  empty: "bg-gray-700",
  wall: "bg-gray-900 border-gray-700",
  start: "bg-blue-600",
  current: "bg-blue-500",
  visited: "bg-teal-600",
  queued: "bg-blue-400/60",
};

interface Props {
  step: BfsStep;
}

export default function BfsRenderer({ step }: Props) {
  return (
    <div>
      <div className="text-[10px] text-gray-400 mb-2">
        Level: <span className="text-blue-400 font-semibold">{step.level}</span>
        {" | "}Queue: <span className="text-gray-300">{step.queue.length}</span>
      </div>
      <div className="inline-grid gap-0.5" style={{ gridTemplateColumns: `repeat(${step.grid[0].length}, 1fr)` }}>
        {step.cellStates.map((row, r) =>
          row.map((state, c) => (
            <div
              key={`${r}-${c}`}
              className={`w-7 h-7 rounded-sm flex items-center justify-center text-[9px] font-mono border border-transparent transition-all duration-300 ${cellColors[state] || "bg-gray-700"}`}
            >
              {state === "wall" ? "" : state === "empty" ? "" : state === "start" ? "S" : ""}
            </div>
          ))
        )}
      </div>
      {step.queue.length > 0 && (
        <div className="text-[9px] text-gray-500 mt-2">
          Queue: {step.queue.map(([r, c]) => `(${r},${c})`).join(" ")}
        </div>
      )}
    </div>
  );
}

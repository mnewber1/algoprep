import { HashMapStep } from "@/lib/visualization-types";
import ArrayCell from "./ArrayCell";

interface Props {
  step: HashMapStep;
}

export default function HashMapRenderer({ step }: Props) {
  return (
    <div>
      <div className="flex gap-3 text-[10px] text-gray-400 mb-2">
        <span>
          Target: <span className="text-yellow-400 font-semibold">{step.target}</span>
        </span>
        {step.lookingFor !== null && (
          <span>
            Need: <span className="text-blue-400 font-semibold">{step.lookingFor}</span>
          </span>
        )}
      </div>
      {/* Array */}
      <div className="flex gap-1 mb-3">
        {step.array.map((val, i) => {
          let state: "default" | "active" | "found" = "default";
          if (step.foundIndices.includes(i)) state = "found";
          else if (i === step.currentIndex) state = "active";
          return <ArrayCell key={i} value={val} state={state} />;
        })}
      </div>
      {/* Hash Map Table */}
      <div className="text-[9px] text-gray-500 mb-1">HashMap</div>
      {step.map.length === 0 ? (
        <div className="text-[9px] text-gray-600 italic">empty</div>
      ) : (
        <div className="flex flex-wrap gap-1">
          {step.map.map((entry, i) => (
            <div
              key={i}
              className="bg-gray-700/80 border border-gray-600 rounded px-1.5 py-0.5 text-[10px] font-mono transition-all duration-300"
            >
              <span className="text-blue-300">{entry.key}</span>
              <span className="text-gray-500">:</span>
              <span className="text-gray-300">{entry.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

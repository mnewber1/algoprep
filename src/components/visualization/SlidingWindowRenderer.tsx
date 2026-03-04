import { SlidingWindowStep } from "@/lib/visualization-types";
import ArrayCell from "./ArrayCell";

interface Props {
  step: SlidingWindowStep;
}

export default function SlidingWindowRenderer({ step }: Props) {
  return (
    <div>
      <div className="flex gap-3 text-[10px] text-gray-400 mb-2">
        <span>
          Sum: <span className="text-blue-400 font-semibold">{step.currentSum}</span>
        </span>
        <span>
          Best: <span className="text-green-400 font-semibold">{step.bestSum}</span>
        </span>
      </div>
      <div className="flex gap-1">
        {step.array.map((val, i) => {
          const inWindow = i >= step.windowLeft && i <= step.windowRight;
          return (
            <ArrayCell
              key={i}
              value={val}
              state={inWindow ? "window" : "default"}
            />
          );
        })}
      </div>
    </div>
  );
}

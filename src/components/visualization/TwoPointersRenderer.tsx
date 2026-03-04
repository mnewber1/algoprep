import { TwoPointersStep } from "@/lib/visualization-types";
import ArrayCell from "./ArrayCell";
import PointerLabel from "./PointerLabel";

interface Props {
  step: TwoPointersStep;
}

export default function TwoPointersRenderer({ step }: Props) {
  return (
    <div>
      <div className="text-[10px] text-gray-400 mb-2">
        Target: <span className="text-yellow-400 font-semibold">{step.target}</span>
      </div>
      <div className="relative">
        <div className="flex gap-1">
          {step.array.map((val, i) => (
            <ArrayCell key={i} value={val} state={step.cellStates[i]} />
          ))}
        </div>
        <div className="relative h-6 mt-1">
          {step.left >= 0 && step.left < step.array.length && (
            <PointerLabel label="L" index={step.left} />
          )}
          {step.right >= 0 && step.right < step.array.length && (
            <PointerLabel label="R" index={step.right} color="text-green-400" />
          )}
        </div>
      </div>
    </div>
  );
}

import { BinarySearchStep } from "@/lib/visualization-types";
import ArrayCell from "./ArrayCell";
import PointerLabel from "./PointerLabel";

interface Props {
  step: BinarySearchStep;
}

export default function BinarySearchRenderer({ step }: Props) {
  return (
    <div>
      <div className="text-[10px] text-gray-400 mb-2">
        Target: <span className="text-yellow-400 font-semibold">{step.target}</span>
      </div>
      <div className="relative">
        <div className="flex gap-1">
          {step.array.map((val, i) => (
            <ArrayCell key={i} value={val} state={step.cellStates[i]} size="sm" />
          ))}
        </div>
        <div className="relative h-6 mt-1">
          {step.low >= 0 && (
            <PointerLabel label="L" index={step.low} cellWidth={28} />
          )}
          {step.mid >= 0 && (
            <PointerLabel label="M" index={step.mid} color="text-yellow-400" cellWidth={28} />
          )}
          {step.high >= 0 && (
            <PointerLabel label="H" index={step.high} color="text-green-400" cellWidth={28} />
          )}
        </div>
      </div>
    </div>
  );
}

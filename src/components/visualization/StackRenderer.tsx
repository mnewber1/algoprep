import { StackStep } from "@/lib/visualization-types";

interface Props {
  step: StackStep;
}

export default function StackRenderer({ step }: Props) {
  return (
    <div className="flex gap-4">
      {/* Input string */}
      <div className="flex-1">
        <div className="text-[9px] text-gray-500 mb-1">Input</div>
        <div className="flex gap-0.5">
          {step.input.split("").map((char, i) => {
            let bg = "bg-gray-700 text-gray-200";
            if (step.matchedPairs.includes(i)) {
              bg = "bg-green-600 text-white";
            } else if (i === step.currentIndex) {
              if (step.status === "push") bg = "bg-blue-600 text-white";
              else if (step.status === "match") bg = "bg-green-600 text-white";
              else if (step.status === "mismatch") bg = "bg-red-600 text-white";
              else bg = "bg-blue-600 text-white";
            }
            return (
              <div
                key={i}
                className={`w-7 h-7 flex items-center justify-center rounded text-xs font-mono font-bold transition-all duration-300 ${bg}`}
              >
                {char}
              </div>
            );
          })}
        </div>
      </div>
      {/* Stack */}
      <div className="w-12 flex-shrink-0">
        <div className="text-[9px] text-gray-500 mb-1">Stack</div>
        <div className="flex flex-col-reverse gap-0.5">
          {step.stack.map((char, i) => (
            <div
              key={i}
              className="bg-blue-600/40 border border-blue-500 rounded text-xs text-center py-0.5 font-mono text-blue-200 transition-all duration-300"
            >
              {char}
            </div>
          ))}
          {step.stack.length === 0 && (
            <div className="text-[9px] text-gray-600 italic">empty</div>
          )}
        </div>
      </div>
    </div>
  );
}

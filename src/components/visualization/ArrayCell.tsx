import { CellState } from "@/lib/visualization-types";

const stateClasses: Record<CellState, string> = {
  default: "bg-gray-700 text-gray-200",
  active: "bg-blue-600 text-white",
  found: "bg-green-600 text-white",
  eliminated: "bg-gray-800 text-gray-500",
  window: "bg-blue-500/30 text-blue-200 border-blue-400",
  current: "bg-blue-600 text-white",
  mid: "bg-yellow-600 text-white",
};

interface Props {
  value: string | number;
  state?: CellState;
  size?: "sm" | "md";
}

export default function ArrayCell({ value, state = "default", size = "md" }: Props) {
  const sizeClass = size === "sm" ? "w-7 h-7 text-[10px]" : "w-9 h-9 text-xs";

  return (
    <div
      className={`${sizeClass} flex items-center justify-center rounded font-mono font-semibold border border-transparent transition-all duration-300 ${stateClasses[state]}`}
    >
      {value}
    </div>
  );
}

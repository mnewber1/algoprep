interface Props {
  currentStep: number;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;
  isPlaying: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onReset: () => void;
}

export default function StepControls({
  currentStep,
  totalSteps,
  isFirst,
  isLast,
  isPlaying,
  onPrev,
  onNext,
  onTogglePlay,
  onReset,
}: Props) {
  return (
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700/50">
      <div className="flex items-center gap-1.5">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Prev
        </button>
        <button
          onClick={onTogglePlay}
          className="px-2 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors min-w-[42px]"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={onNext}
          disabled={isLast}
          className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
        <button
          onClick={onReset}
          className="px-2 py-1 text-xs rounded bg-gray-700/50 text-gray-400 hover:bg-gray-600 hover:text-gray-300 transition-colors ml-1"
        >
          Reset
        </button>
      </div>
      <span className="text-[10px] text-gray-500 tabular-nums">
        {currentStep + 1} / {totalSteps}
      </span>
    </div>
  );
}

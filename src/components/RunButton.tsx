"use client";

interface Props {
  onClick: () => void;
  isRunning: boolean;
}

export default function RunButton({ onClick, isRunning }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={isRunning}
      className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed
        text-white font-medium rounded px-4 py-1.5 text-sm transition-colors flex items-center gap-2"
    >
      {isRunning ? (
        <>
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Running...
        </>
      ) : (
        <>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Run
        </>
      )}
    </button>
  );
}

interface Props {
  label: string;
  index: number;
  cellWidth?: number;
  color?: string;
}

export default function PointerLabel({
  label,
  index,
  cellWidth = 36,
  color = "text-blue-400",
}: Props) {
  const gap = 4;
  const left = index * (cellWidth + gap) + cellWidth / 2;

  return (
    <div
      className={`absolute flex flex-col items-center transition-all duration-500 ${color}`}
      style={{ left, transform: "translateX(-50%)" }}
    >
      <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
        <polygon points="5,0 10,10 0,10" />
      </svg>
      <span className="text-[10px] font-bold leading-none mt-0.5">{label}</span>
    </div>
  );
}

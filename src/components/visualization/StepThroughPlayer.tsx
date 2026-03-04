"use client";

import { useMemo } from "react";
import { Category } from "@/lib/types";
import { getVisualization } from "@/data/visualizations";
import { useStepPlayer } from "@/hooks/useStepPlayer";
import StepControls from "./StepControls";
import TwoPointersRenderer from "./TwoPointersRenderer";
import SlidingWindowRenderer from "./SlidingWindowRenderer";
import BinarySearchRenderer from "./BinarySearchRenderer";
import BfsRenderer from "./BfsRenderer";
import DfsRenderer from "./DfsRenderer";
import StackRenderer from "./StackRenderer";
import HashMapRenderer from "./HashMapRenderer";
import LinkedListRenderer from "./LinkedListRenderer";

interface Props {
  category: Category;
}

export default function StepThroughPlayer({ category }: Props) {
  const steps = useMemo(() => getVisualization(category), [category]);
  const player = useStepPlayer(steps);
  const step = player.currentStep;

  return (
    <div className="bg-[#1e1e1e] rounded p-3 mb-4 border border-gray-700/50">
      {/* Description */}
      <p className="text-xs text-gray-300 mb-3 leading-relaxed min-h-[2.5em]">
        {step.description}
      </p>

      {/* Renderer */}
      <div className="overflow-x-auto">
        {step.type === "two-pointers" && <TwoPointersRenderer step={step} />}
        {step.type === "sliding-window" && <SlidingWindowRenderer step={step} />}
        {step.type === "binary-search" && <BinarySearchRenderer step={step} />}
        {step.type === "bfs" && <BfsRenderer step={step} />}
        {step.type === "dfs" && <DfsRenderer step={step} />}
        {step.type === "stack" && <StackRenderer step={step} />}
        {step.type === "hash-map" && <HashMapRenderer step={step} />}
        {step.type === "linked-list" && <LinkedListRenderer step={step} />}
      </div>

      {/* Controls */}
      <StepControls
        currentStep={player.currentStepIndex}
        totalSteps={player.totalSteps}
        isFirst={player.isFirst}
        isLast={player.isLast}
        isPlaying={player.isPlaying}
        onPrev={player.goPrev}
        onNext={player.goNext}
        onTogglePlay={player.togglePlay}
        onReset={player.reset}
      />
    </div>
  );
}

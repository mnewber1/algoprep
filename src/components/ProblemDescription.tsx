"use client";

import { Problem } from "@/lib/types";

interface Props {
  problem: Problem;
}

export default function ProblemDescription({ problem }: Props) {
  return (
    <div className="p-6 overflow-auto h-full text-gray-200">
      <h1 className="text-xl font-bold mb-1">{problem.title}</h1>
      <span className="inline-block text-xs px-2 py-0.5 rounded bg-green-900/50 text-green-300 mb-4">
        Easy
      </span>

      <div className="prose prose-invert prose-sm max-w-none">
        <div
          className="mb-6 leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(problem.description) }}
        />

        <div
          className="mb-6"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(problem.examples) }}
        />

        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Constraints:</h3>
          <div
            className="text-gray-400 text-sm"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(problem.constraints) }}
          />
        </div>
      </div>
    </div>
  );
}

function renderMarkdown(text: string): string {
  return text
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-800/50 p-3 rounded text-xs overflow-x-auto"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800/50 px-1.5 py-0.5 rounded text-xs text-blue-300">$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    // Line breaks
    .replace(/\n/g, "<br />")
    // List items
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>');
}

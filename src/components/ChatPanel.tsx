"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Problem } from "@/lib/types";

function renderMarkdown(text: string): string {
  return text
    // Code blocks
    .replace(
      /```(\w*)\n([\s\S]*?)```/g,
      '<pre class="bg-black/30 p-2.5 rounded text-[11px] overflow-x-auto my-1.5 font-mono leading-[1.6]"><code>$2</code></pre>'
    )
    // Inline code
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-black/30 px-1 py-0.5 rounded text-[11px] text-blue-300 font-mono">$1</code>'
    )
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    // Numbered lists
    .replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    // Bullet lists
    .replace(/^[-*]\s+(.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    // Line breaks (but not inside pre blocks — handled by preserving \n in pre)
    .replace(/\n/g, "<br />");
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

function ChatMessage({ message, isStreaming }: { message: Message; isStreaming: boolean }) {
  const html = useMemo(() => {
    if (message.role === "user") return null;
    return renderMarkdown(message.content);
  }, [message.content, message.role]);

  return (
    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
          message.role === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-800 text-gray-200"
        }`}
      >
        {message.role === "user" ? (
          <span className="whitespace-pre-wrap">{message.content}</span>
        ) : (
          <div
            className="chat-markdown whitespace-pre-wrap [&_pre]:whitespace-pre [&_code]:whitespace-pre"
            dangerouslySetInnerHTML={{ __html: html || "" }}
          />
        )}
        {message.role === "assistant" && message.content === "" && isStreaming && (
          <span className="inline-block w-1.5 h-3.5 bg-gray-400 animate-pulse" />
        )}
      </div>
    </div>
  );
}

interface Props {
  problem: Problem;
  initialQuestion?: string | null;
  onQuestionConsumed?: () => void;
}

export default function ChatPanel({ problem, initialQuestion, onQuestionConsumed }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Pre-fill input when a line is clicked from the solution
  useEffect(() => {
    if (initialQuestion) {
      setInput(initialQuestion);
      onQuestionConsumed?.();
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [initialQuestion, onQuestionConsumed]);

  const problemContext = `Title: ${problem.title}
Category: ${problem.category}
Description: ${problem.description}
Examples: ${problem.examples}
Constraints: ${problem.constraints}`;

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    setInput("");
    setError(null);
    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          problemContext,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || `Error: ${response.status}`);
        setIsStreaming(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setError("No response stream");
        setIsStreaming(false);
        return;
      }

      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantContent,
          };
          return updated;
        });
      }
    } catch {
      setError(
        "Cannot connect to Ollama. Make sure it's running locally with: ollama serve"
      );
    } finally {
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages, problemContext]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && !error && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm mb-3">
              Ask questions about this problem
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {[
                "Explain the approach",
                "What pattern should I use?",
                "Walk me through an example",
                "What are the edge cases?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => inputRef.current?.focus(), 0);
                  }}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-3 text-xs text-red-300">
            {error}
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} isStreaming={isStreaming && i === messages.length - 1} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 p-3">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about this problem..."
            rows={1}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-200 placeholder-gray-500 resize-none focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isStreaming}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
        <p className="text-[9px] text-gray-600 mt-1.5">
          Powered by Ollama (local). Shift+Enter for new line.
        </p>
      </div>
    </div>
  );
}

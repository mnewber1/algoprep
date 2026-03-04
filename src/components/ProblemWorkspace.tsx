"use client";

import { useState, useEffect, useCallback } from "react";
import { Problem, Language } from "@/lib/types";
import CodeEditor from "./CodeEditor";
import ProblemDescription from "./ProblemDescription";
import SolutionPanel from "./SolutionPanel";
import ChatPanel from "./ChatPanel";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import OutputPanel from "./OutputPanel";
import { useCodeExecution } from "@/hooks/useCodeExecution";
import { useProgress } from "@/hooks/useProgress";
import { getSolution } from "@/data/solutions";

interface Props {
  problem: Problem;
}

export default function ProblemWorkspace({ problem }: Props) {
  const { progress, saveCode, saveCodeImmediate, markSolved } = useProgress(problem.slug);
  const { isRunning, result, execute, clearResult } = useCodeExecution();
  const [leftTab, setLeftTab] = useState<"description" | "solution" | "chat">("description");
  const [chatQuestion, setChatQuestion] = useState<string | null>(null);
  const solution = getSolution(problem.slug);

  const [language, setLanguage] = useState<Language>(
    progress?.lastLanguage || "python"
  );
  const [code, setCode] = useState(
    progress?.lastCode[language] || problem.starterCode[language]
  );

  // Update code when language changes
  useEffect(() => {
    const saved = progress?.lastCode[language];
    setCode(saved || problem.starterCode[language]);
    clearResult();
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);
      saveCode(language, newCode);
    },
    [language, saveCode]
  );

  const handleRun = useCallback(async () => {
    saveCodeImmediate(language, code);
    const execResult = await execute(problem, code, language);
    if (execResult.allPassed) {
      markSolved();
    }
  }, [code, language, problem, execute, saveCodeImmediate, markSolved]);

  const handleLanguageChange = useCallback(
    (newLang: Language) => {
      // Save current code before switching
      saveCodeImmediate(language, code);
      setLanguage(newLang);
    },
    [language, code, saveCodeImmediate]
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)]">
      {/* Left pane: description / solution */}
      <div className="w-full lg:w-[45%] bg-[#252526] border-b lg:border-b-0 lg:border-r border-gray-700 flex flex-col h-[40vh] lg:h-full">
        {/* Tabs */}
        <div className="flex border-b border-gray-700 px-4 bg-[#2d2d2d] flex-shrink-0">
          <button
            onClick={() => setLeftTab("description")}
            className={`px-3 py-2 text-xs font-medium transition-colors relative ${
              leftTab === "description"
                ? "text-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Description
            {leftTab === "description" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
            )}
          </button>
          {solution && (
            <button
              onClick={() => setLeftTab("solution")}
              className={`px-3 py-2 text-xs font-medium transition-colors relative ${
                leftTab === "solution"
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Solution
              {leftTab === "solution" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
              )}
            </button>
          )}
          <button
            onClick={() => setLeftTab("chat")}
            className={`px-3 py-2 text-xs font-medium transition-colors relative ${
              leftTab === "chat"
                ? "text-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            AI Chat
            {leftTab === "chat" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
            )}
          </button>
        </div>
        {/* Tab content */}
        <div className="flex-1 overflow-auto">
          {leftTab === "description" ? (
            <ProblemDescription problem={problem} />
          ) : leftTab === "solution" && solution ? (
            <SolutionPanel
              solution={solution}
              title={problem.title}
              onAskAboutLine={(line) => {
                setChatQuestion(`Explain this line: \`${line}\``);
                setLeftTab("chat");
              }}
            />
          ) : leftTab === "chat" ? (
            <ChatPanel
              problem={problem}
              initialQuestion={chatQuestion}
              onQuestionConsumed={() => setChatQuestion(null)}
            />
          ) : null}
        </div>
      </div>

      {/* Right pane: editor + output */}
      <div className="w-full lg:w-[55%] flex flex-col h-[60vh] lg:h-full">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
          <LanguageSelector
            value={language}
            onChange={handleLanguageChange}
            disabled={isRunning}
          />
          <div className="flex items-center gap-3">
            {progress?.solved && (
              <span className="text-green-400 text-sm font-medium">Solved</span>
            )}
            <RunButton onClick={handleRun} isRunning={isRunning} />
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 min-h-0">
          <CodeEditor
            value={code}
            language={language}
            onChange={handleCodeChange}
          />
        </div>

        {/* Output */}
        <div className="max-h-[40%] overflow-auto">
          <OutputPanel result={result} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}

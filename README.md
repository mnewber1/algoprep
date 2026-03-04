# AlgoPrep

Practice core interview algorithms across 8 fundamental patterns with interactive visualizations, annotated solutions, and AI-powered tutoring.

## Features

- **24 problems** across 8 algorithm patterns: Two Pointers, Sliding Window, Binary Search, BFS, DFS, Stack, Hash Map, Linked List
- **Interactive visualizations** — step through each algorithm on example data with Prev/Next/Play controls
- **Solutions in 3 languages** — annotated Python, Java, and Kotlin solutions for every problem
- **Code execution** — run your code against test cases using local Python/Java runtimes
- **AI chat** — ask questions about any problem, powered by Ollama running locally
- **Complexity quiz** — 18 questions testing Big O time/space analysis with feedback and scoring
- **Progress tracking** — saved to localStorage per problem

## Quick Start

**Prerequisites:** Node.js 20+, Python 3, [Ollama](https://ollama.com/download)

```bash
git clone https://github.com/mnewber1/algoprep.git
cd algoprep
./start.sh
```

This installs dependencies, starts Ollama with the `llama3.2` model, and launches the dev server. Press **Enter** or **Ctrl+C** to stop everything.

Open [http://localhost:3000](http://localhost:3000).

### Optional: Java support

```bash
# macOS
brew install openjdk

# Ubuntu/Debian
sudo apt install default-jdk-headless
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # Ollama chat proxy (streaming)
│   │   └── execute/route.ts       # Local code execution
│   ├── complexity/page.tsx        # Complexity quiz route
│   ├── problems/[slug]/page.tsx   # Problem workspace
│   └── page.tsx                   # Homepage with category grid
├── components/
│   ├── quiz/                      # Complexity quiz UI components
│   ├── visualization/             # Step-through renderers (8 algorithms)
│   ├── AlgorithmModal.tsx         # "How it works" popup
│   ├── ChatPanel.tsx              # AI chat interface
│   ├── ComplexityQuiz.tsx         # Quiz main shell
│   ├── ProblemWorkspace.tsx       # Editor + description + solution tabs
│   └── SolutionPanel.tsx          # Annotated solution viewer
├── data/
│   ├── complexity-questions.ts    # 18 Big O quiz questions
│   ├── problems.ts                # 24 problem definitions
│   ├── solutions.ts               # Solutions in Python/Java/Kotlin
│   ├── code-examples.ts           # Pattern-level code examples
│   └── visualizations/            # Step generators for each algorithm
├── hooks/
│   ├── useComplexityQuiz.ts       # Quiz state management
│   ├── useStepPlayer.ts           # Visualization navigation
│   ├── useCodeExecution.ts        # Code run + results
│   └── useProgress.ts             # localStorage progress
└── lib/
    ├── types.ts                   # Core types
    ├── visualization-types.ts     # Step data types
    ├── harness.ts                 # Code assembly for execution
    ├── piston.ts                  # Output parsing
    └── progress.ts                # Progress storage
```

## Tech Stack

- **Next.js 15** + React 19 + TypeScript
- **Tailwind CSS v4** — dark theme, transition animations
- **Monaco Editor** — VS Code-style code editing
- **Ollama** — local LLM for AI chat (optional)

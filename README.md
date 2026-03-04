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

## Quick Start (Local)

**Prerequisites:** Node.js 20+, Python 3

```bash
git clone https://github.com/mnewber1/algoprep.git
cd algoprep
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Optional: Java support

```bash
# macOS
brew install openjdk

# Ubuntu/Debian
sudo apt install default-jdk-headless
```

### Optional: AI Chat (Ollama)

```bash
# Install Ollama — https://ollama.com/download
ollama pull llama3.2
ollama serve
```

The AI Chat tab on each problem page will connect to Ollama at `localhost:11434`.

## Docker Setup

**Prerequisites:** Docker, [Ollama](https://ollama.com/download) installed natively for GPU acceleration

```bash
# 1. Start Ollama natively (uses Apple Silicon / GPU)
ollama pull llama3.2
ollama serve

# 2. Start the app container
docker compose up --build
```

The app runs at [http://localhost:3000](http://localhost:3000). Code execution (Python + Java) works inside the container. AI chat connects to your native Ollama instance via `host.docker.internal` for full GPU performance.

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `OLLAMA_HOST` | `http://localhost:11434` | Ollama API URL |
| `OLLAMA_MODEL` | `llama3.2` | Model to use for AI chat |

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

#!/bin/bash

OLLAMA_STARTED=false

cleanup() {
  echo ""
  echo "Stopping app container..."
  docker-compose down 2>/dev/null

  if $OLLAMA_STARTED; then
    echo "Stopping Ollama..."
    pkill -x ollama 2>/dev/null
  fi

  echo "Done."
  exit 0
}

trap cleanup SIGINT SIGTERM

# Start Ollama natively (GPU-accelerated)
if ! pgrep -x ollama > /dev/null; then
  echo "Starting Ollama..."
  ollama serve &
  OLLAMA_STARTED=true
  sleep 2
else
  echo "Ollama already running."
fi

echo "Pulling model..."
ollama pull llama3.2 2>/dev/null

# Start app container
echo "Building app..."
docker-compose build -q && docker-compose up -d

echo ""
echo "==============================="
echo "  AlgoPrep running at http://localhost:3000"
echo "  Press Enter or Ctrl+C to stop"
echo "==============================="
echo ""

read -r
cleanup

#!/bin/bash

# Start Ollama natively (GPU-accelerated)
if ! pgrep -x ollama > /dev/null; then
  echo "Starting Ollama..."
  ollama serve &
  sleep 2
fi

ollama pull llama3.2 2>/dev/null

# Start app container
echo "Starting app..."
docker-compose build && docker-compose up -d

echo ""
echo "Ready at http://localhost:3000"

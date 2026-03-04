import { NextRequest } from "next/server";

const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
const OLLAMA_URL = `${OLLAMA_HOST}/api/chat`;
const MODEL = process.env.OLLAMA_MODEL || "llama3.2";

export async function POST(request: NextRequest) {
  try {
    const { messages, problemContext } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Missing messages array" },
        { status: 400 }
      );
    }

    const systemMessage = {
      role: "system",
      content: `You are a helpful coding tutor helping a student understand algorithm problems. Be concise and clear. Use examples when helpful. Do not give the full solution unless explicitly asked — instead guide the student toward understanding.

Here is the problem they are working on:

${problemContext}

Answer questions about this problem, the algorithm pattern, time/space complexity, edge cases, or related concepts.`,
    };

    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [systemMessage, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      if (text.includes("connection refused") || text.includes("ECONNREFUSED")) {
        return Response.json(
          { error: "Ollama is not running. Start it with: ollama serve" },
          { status: 502 }
        );
      }
      return Response.json(
        { error: `Ollama error: ${response.status} ${text}` },
        { status: 502 }
      );
    }

    // Stream the response back
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            // Ollama streams JSON objects, one per line
            for (const line of chunk.split("\n")) {
              if (!line.trim()) continue;
              try {
                const data = JSON.parse(line);
                if (data.message?.content) {
                  controller.enqueue(
                    encoder.encode(data.message.content)
                  );
                }
              } catch {
                // skip malformed lines
              }
            }
          }
        } finally {
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    if (message.includes("ECONNREFUSED") || message.includes("fetch failed")) {
      return Response.json(
        {
          error:
            "Cannot connect to Ollama. Make sure it's running: ollama serve",
        },
        { status: 502 }
      );
    }
    return Response.json({ error: message }, { status: 500 });
  }
}

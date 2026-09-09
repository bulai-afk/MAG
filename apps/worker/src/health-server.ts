import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";

import { checkPostgres } from "@mag/db";
import { buildHealthReport, checkRedis } from "@mag/observability";

export function startHealthServer(input: {
  port: number;
  databaseUrl: string;
  redisUrl: string;
}): Server {
  const server = createServer((request, response) => {
    void handleRequest(request, response, input);
  });

  server.listen(input.port);
  return server;
}

async function handleRequest(
  request: IncomingMessage,
  response: ServerResponse,
  input: { databaseUrl: string; redisUrl: string },
): Promise<void> {
  const url = new URL(request.url ?? "/", "http://127.0.0.1");

  if (request.method === "GET" && url.pathname === "/live") {
    sendJson(response, 200, {
      status: "ok",
      service: "worker",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (request.method === "GET" && url.pathname === "/health") {
    const [postgres, redis] = await Promise.all([
      checkPostgres(input.databaseUrl),
      checkRedis(input.redisUrl),
    ]);
    const report = buildHealthReport({
      service: "worker",
      checks: { postgres, redis },
    });
    sendJson(response, report.status === "ok" ? 200 : 503, report);
    return;
  }

  sendJson(response, 404, { status: "error", error: "not_found" });
}

function sendJson(response: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(payload);
}

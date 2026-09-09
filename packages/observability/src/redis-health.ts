import Redis from "ioredis";

import type { InfrastructureCheck } from "./health";

export async function checkRedis(redisUrl: string): Promise<InfrastructureCheck> {
  const started = performance.now();
  const redis = new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    connectTimeout: 5000,
    lazyConnect: true,
    enableOfflineQueue: false,
  });

  try {
    await redis.connect();
    const response = await redis.ping();
    return {
      ok: response === "PONG",
      latencyMs: Math.round(performance.now() - started),
    };
  } catch {
    return { ok: false, latencyMs: Math.round(performance.now() - started) };
  } finally {
    redis.disconnect();
  }
}

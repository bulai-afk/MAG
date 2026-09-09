import { describe, expect, it } from "vitest";

import { checkRedis } from "./redis-health";

describe("checkRedis", () => {
  it("returns ok when Redis answers PONG", async () => {
    const redisUrl = process.env.REDIS_URL;
    expect(redisUrl, "REDIS_URL must be set for integration tests").toBeTruthy();

    const result = await checkRedis(redisUrl as string);
    expect(result.ok).toBe(true);
    expect(result.latencyMs).toBeGreaterThanOrEqual(0);
  });
});

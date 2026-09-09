import { describe, expect, it } from "vitest";

import { parseEnv } from "./env";

const validEnv = {
  NODE_ENV: "test",
  APP_URL: "http://localhost:3000",
  DATABASE_URL: "postgres://mag:mag@localhost:5432/mag",
  REDIS_URL: "redis://localhost:6379",
  SESSION_SECRET: "replace-me-with-a-random-32-byte-secret",
};

describe("parseEnv", () => {
  it("accepts the local example values", () => {
    const env = parseEnv(validEnv);

    expect(env.APP_URL).toBe("http://localhost:3000");
    expect(env.WEB_PORT).toBe(3000);
    expect(env.WORKER_HEALTH_PORT).toBe(3001);
    expect(env.S3_ENDPOINT).toBeUndefined();
  });

  it("rejects a missing database URL", () => {
    expect(() => parseEnv({ ...validEnv, DATABASE_URL: undefined })).toThrow(/DATABASE_URL/);
  });

  it("rejects a short session secret", () => {
    expect(() => parseEnv({ ...validEnv, SESSION_SECRET: "too-short" })).toThrow(/SESSION_SECRET/);
  });

  it("treats blank optional values as unset", () => {
    const env = parseEnv({
      ...validEnv,
      AI_API_KEY: "  ",
      S3_ENDPOINT: "",
    });

    expect(env.AI_API_KEY).toBeUndefined();
    expect(env.S3_ENDPOINT).toBeUndefined();
  });
});

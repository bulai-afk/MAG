import { describe, expect, it } from "vitest";

import { checkPostgres } from "./health";

describe("checkPostgres", () => {
  it("returns ok when PostgreSQL accepts select 1", async () => {
    const databaseUrl = process.env.DATABASE_URL;
    expect(databaseUrl, "DATABASE_URL must be set for integration tests").toBeTruthy();

    const result = await checkPostgres(databaseUrl as string);
    expect(result.ok).toBe(true);
    expect(result.latencyMs).toBeGreaterThanOrEqual(0);
  });
});

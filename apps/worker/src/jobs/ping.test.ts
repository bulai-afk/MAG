import { describe, expect, it } from "vitest";

import { processPingJob } from "./ping";

describe("processPingJob", () => {
  it("returns a pong payload", async () => {
    const result = await processPingJob(new Date("2026-09-09T09:00:00.000Z"));

    expect(result).toEqual({
      ok: true,
      ts: "2026-09-09T09:00:00.000Z",
    });
  });
});

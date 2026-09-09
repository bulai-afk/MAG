import { describe, expect, it } from "vitest";

import { buildHealthReport } from "./health";

describe("buildHealthReport", () => {
  it("is ok when every check succeeds", () => {
    const report = buildHealthReport({
      service: "web",
      now: new Date("2026-09-09T09:00:00.000Z"),
      checks: {
        postgres: { ok: true, latencyMs: 4 },
        redis: { ok: true, latencyMs: 2 },
      },
    });

    expect(report.status).toBe("ok");
    expect(report.service).toBe("web");
    expect(report.timestamp).toBe("2026-09-09T09:00:00.000Z");
    expect(report.checks.postgres?.status).toBe("ok");
  });

  it("is error when any check fails", () => {
    const report = buildHealthReport({
      service: "worker",
      checks: {
        postgres: { ok: true, latencyMs: 3 },
        redis: { ok: false, latencyMs: 12 },
      },
    });

    expect(report.status).toBe("error");
    expect(report.checks.redis?.status).toBe("error");
  });
});

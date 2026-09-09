export type InfrastructureCheck = {
  ok: boolean;
  latencyMs: number;
};

export type HealthStatus = "ok" | "error";

export type NamedHealthCheck = {
  status: HealthStatus;
  latencyMs: number;
};

export type HealthReport = {
  status: HealthStatus;
  service: string;
  timestamp: string;
  checks: Record<string, NamedHealthCheck>;
};

export function buildHealthReport(input: {
  service: string;
  checks: Record<string, InfrastructureCheck>;
  now?: Date;
}): HealthReport {
  const checks = Object.fromEntries(
    Object.entries(input.checks).map(([name, result]) => [
      name,
      {
        status: result.ok ? ("ok" as const) : ("error" as const),
        latencyMs: result.latencyMs,
      },
    ]),
  );

  const failed = Object.values(checks).some((check) => check.status === "error");

  return {
    status: failed ? "error" : "ok",
    service: input.service,
    timestamp: (input.now ?? new Date()).toISOString(),
    checks,
  };
}

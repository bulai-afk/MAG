import postgres from "postgres";

export type InfrastructureCheck = {
  ok: boolean;
  latencyMs: number;
};

export async function checkPostgres(databaseUrl: string): Promise<InfrastructureCheck> {
  const started = performance.now();
  const client = postgres(databaseUrl, {
    max: 1,
    connect_timeout: 5,
    idle_timeout: 5,
  });

  try {
    await client`select 1`;
    return { ok: true, latencyMs: Math.round(performance.now() - started) };
  } catch {
    return { ok: false, latencyMs: Math.round(performance.now() - started) };
  } finally {
    await client.end({ timeout: 5 });
  }
}

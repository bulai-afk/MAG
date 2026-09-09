import { getEnv } from "@mag/config/env";
import { checkPostgres } from "@mag/db";
import { buildHealthReport, checkRedis } from "@mag/observability";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const env = getEnv();
  const [postgres, redis] = await Promise.all([
    checkPostgres(env.DATABASE_URL),
    checkRedis(env.REDIS_URL),
  ]);
  const report = buildHealthReport({
    service: "web",
    checks: { postgres, redis },
  });

  return NextResponse.json(report, { status: report.status === "ok" ? 200 : 503 });
}

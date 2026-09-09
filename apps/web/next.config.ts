import type { NextConfig } from "next";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { loadRootEnv } from "@mag/config/env";

loadRootEnv();

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  outputFileTracingRoot: repoRoot,
  serverExternalPackages: ["drizzle-orm", "postgres", "ioredis", "pino", "pino-pretty"],
  transpilePackages: [
    "@mag/ai",
    "@mag/config",
    "@mag/csv",
    "@mag/db",
    "@mag/domain",
    "@mag/email",
    "@mag/observability",
    "@mag/ui",
  ],
};

export default nextConfig;

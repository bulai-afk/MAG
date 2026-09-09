import { z } from "zod";

import { loadRootEnv } from "./load-env";

export { findRepoRoot, loadRootEnv } from "./load-env";

const emptyToUndefined = (value: unknown): unknown => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

const optionalString = z.preprocess(emptyToUndefined, z.string().optional());
const optionalUrl = z.preprocess(emptyToUndefined, z.url().optional());

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z.url(),
  WEB_PORT: z.coerce.number().int().positive().default(3000),
  WORKER_HEALTH_PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(32),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
  S3_ENDPOINT: optionalUrl,
  S3_REGION: optionalString,
  S3_BUCKET: optionalString,
  S3_ACCESS_KEY: optionalString,
  S3_SECRET_KEY: optionalString,
  AI_PROVIDER: optionalString,
  AI_MODEL: optionalString,
  AI_API_KEY: optionalString,
  EMAIL_PROVIDER: optionalString,
  EMAIL_FROM: optionalString,
  SENTRY_DSN: optionalString,
  FEATURE_FLAGS: optionalString,
});

export type Env = z.infer<typeof envSchema>;

export type EnvInput = Record<string, string | undefined>;

function formatEnvError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
      return `${path}: ${issue.message}`;
    })
    .join("\n");
}

export function parseEnv(input: EnvInput): Env {
  const result = envSchema.safeParse(input);

  if (!result.success) {
    throw new Error(`Invalid environment variables:\n${formatEnvError(result.error)}`);
  }

  return result.data;
}

let cachedEnv: Env | undefined;

export function getEnv(): Env {
  if (!cachedEnv) {
    loadRootEnv();
    cachedEnv = parseEnv(process.env);
  }

  return cachedEnv;
}

export function resetEnvCache(): void {
  cachedEnv = undefined;
}

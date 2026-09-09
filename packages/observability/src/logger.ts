import type { Logger, LoggerOptions } from "pino";
import pino from "pino";

export type MagLogger = Logger;

export function createLogger(
  service: string,
  options?: { level?: string; pretty?: boolean },
): MagLogger {
  const isDevelopment = process.env.NODE_ENV === "development";
  const config: LoggerOptions = {
    level: options?.level ?? process.env.LOG_LEVEL ?? "info",
    base: {
      service,
      env: process.env.NODE_ENV ?? "development",
    },
    redact: {
      paths: [
        "email",
        "password",
        "token",
        "authorization",
        "cookie",
        "ai.prompt",
        "csv",
        "*.secret",
        "*.apiKey",
      ],
      remove: true,
    },
  };

  if (options?.pretty ?? isDevelopment) {
    config.transport = {
      target: "pino-pretty",
      options: { colorize: true, translateTime: "SYS:standard" },
    };
  }

  return pino(config);
}

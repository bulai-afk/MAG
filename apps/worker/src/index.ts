import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

import { getEnv } from "@mag/config/env";
import { createLogger } from "@mag/observability";

import { startHealthServer } from "./health-server";
import { HEALTH_QUEUE_NAME, PING_JOB_NAME, processPingJob } from "./jobs/ping";

const env = getEnv();
const logger = createLogger("worker", {
  level: env.LOG_LEVEL,
  pretty: env.NODE_ENV === "development",
});

const connection = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const healthQueue = new Queue(HEALTH_QUEUE_NAME, { connection });
const healthWorker = new Worker(
  HEALTH_QUEUE_NAME,
  async (job) => {
    if (job.name !== PING_JOB_NAME) {
      throw new Error(`Unsupported job: ${job.name}`);
    }

    return processPingJob();
  },
  { connection },
);

healthWorker.on("failed", (job, error) => {
  logger.error({ jobId: job?.id, err: error.message }, "health job failed");
});

const healthServer = startHealthServer({
  port: env.WORKER_HEALTH_PORT,
  databaseUrl: env.DATABASE_URL,
  redisUrl: env.REDIS_URL,
});

await healthQueue.add(PING_JOB_NAME, {}, { removeOnComplete: 10, removeOnFail: 50 });

logger.info({ port: env.WORKER_HEALTH_PORT, queue: HEALTH_QUEUE_NAME }, "worker started");

async function shutdown(signal: string): Promise<void> {
  logger.info({ signal }, "worker shutting down");
  healthServer.close();
  await Promise.allSettled([healthWorker.close(), healthQueue.close(), connection.quit()]);
  process.exit(0);
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});
process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

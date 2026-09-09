export const HEALTH_QUEUE_NAME = "health";
export const PING_JOB_NAME = "ping";

export type PingJobResult = {
  ok: true;
  ts: string;
};

export async function processPingJob(now = new Date()): Promise<PingJobResult> {
  return {
    ok: true,
    ts: now.toISOString(),
  };
}

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { schema } from "./schema";

export type PostgresClient = ReturnType<typeof postgres>;
export type MagDatabase = ReturnType<typeof createDb>["db"];

export function createDb(databaseUrl: string, max = 10) {
  const client = postgres(databaseUrl, { max, idle_timeout: 20, connect_timeout: 10 });
  const db = drizzle(client, { schema });
  return { db, client };
}

export async function closeDb(client: PostgresClient): Promise<void> {
  await client.end({ timeout: 5 });
}

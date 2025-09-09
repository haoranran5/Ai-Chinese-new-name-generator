import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const isCloudflareWorker =
  typeof globalThis !== "undefined" && "Cloudflare" in globalThis;

// DB Instance
let dbInstance: ReturnType<typeof drizzle> | null = null;

export function db() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  if (isCloudflareWorker) {
    const client = postgres(databaseUrl, {
      prepare: false,
      max: 1,
      idle_timeout: 10,
      connect_timeout: 5,
    });
 
    return drizzle(client);
  }

  if (dbInstance) {
    return dbInstance;
  }
  
  const client = postgres(databaseUrl, {
    prepare: false,
    max: 10,
    idle_timeout: 30,
    connect_timeout: 10,
  });
  dbInstance = drizzle({ client });

  return dbInstance;
}

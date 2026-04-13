import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import type { LibSQLDatabase } from "drizzle-orm/libsql";

import { env } from "~/env";
import * as schema from "./schema";

export type DB = LibSQLDatabase<typeof schema>;

/**
 * Cache the Drizzle instance in development to avoid new connections on every HMR update.
 */
const globalForDb = globalThis as unknown as {
  drizzle: DB | undefined;
};

export function getDb(): DB {
  if (!globalForDb.drizzle) {
    const url = env.DATABASE_URL;
    if (!url?.trim()) {
      throw new Error(
        "DATABASE_URL is not set. Copy .env.example to .env for local development, or set DATABASE_URL in your deployment environment (for example Vercel → Settings → Environment Variables)."
      );
    }
    globalForDb.drizzle = drizzle(createClient({ url }), { schema });
  }
  return globalForDb.drizzle;
}

/**
 * Lazy proxy so importing this module during `next build` does not connect to the database.
 * The real client is created on first use (API request, tRPC context, tests, etc.).
 */
export const db = new Proxy({} as DB, {
  get(_target, prop) {
    const real = getDb();
    const value = Reflect.get(real, prop, real);
    if (typeof value === "function") {
      return value.bind(real);
    }
    return value;
  },
}) as DB;

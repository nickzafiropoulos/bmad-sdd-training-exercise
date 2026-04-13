import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import type { LibSQLDatabase } from "drizzle-orm/libsql";

import { env } from "~/env";
import * as schema from "./schema";

export type DB = LibSQLDatabase<typeof schema>;

function isRemoteDatabaseUrl(url: string): boolean {
  return /^(libsql:|https?:|wss?:|ws:)/i.test(url);
}

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
        "DATABASE_URL is not set. For Vercel: create a Turso database, then add DATABASE_URL (libsql://…) and DATABASE_AUTH_TOKEN in Project → Settings → Environment Variables, redeploy, and run db:push against that database once. See the repo README."
      );
    }
    const authToken = env.DATABASE_AUTH_TOKEN?.trim();
    if (isRemoteDatabaseUrl(url) && !authToken) {
      throw new Error(
        "DATABASE_AUTH_TOKEN is not set. Remote databases (Turso) need both DATABASE_URL and DATABASE_AUTH_TOKEN. Create a token with `turso db tokens create <db-name>` and add it in Vercel → Environment Variables."
      );
    }
    globalForDb.drizzle = drizzle(
      createClient({
        url,
        ...(authToken ? { authToken } : {}),
      }),
      { schema }
    );
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

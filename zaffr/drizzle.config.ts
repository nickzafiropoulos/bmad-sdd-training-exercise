import { type Config } from "drizzle-kit";

import { env } from "~/env";

const databaseUrl = env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required for Drizzle Kit. Set it in .env (see .env.example)."
  );
}

const isFileSqlite = databaseUrl.startsWith("file:");
const authToken = env.DATABASE_AUTH_TOKEN?.trim();

if (!isFileSqlite && !authToken) {
  throw new Error(
    "DATABASE_AUTH_TOKEN is required in .env when DATABASE_URL is a remote libSQL URL (run `turso db tokens create <db>`)."
  );
}

export default {
  schema: "./src/server/db/schema.ts",
  dialect: isFileSqlite ? "sqlite" : "turso",
  dbCredentials: isFileSqlite
    ? { url: databaseUrl }
    : { url: databaseUrl, authToken: authToken! },
  tablesFilter: ["zaffr_*"],
} satisfies Config;

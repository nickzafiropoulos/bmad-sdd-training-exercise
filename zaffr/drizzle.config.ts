import { type Config } from "drizzle-kit";

import { env } from "~/env";

const databaseUrl = env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required for Drizzle Kit. Set it in .env (see .env.example)."
  );
}

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: databaseUrl,
  },
  tablesFilter: ["zaffr_*"],
} satisfies Config;

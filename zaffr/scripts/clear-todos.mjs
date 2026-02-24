#!/usr/bin/env node
/**
 * One-off script to delete all todos from the database (zaffr_todo table).
 * Run from zaffr/: node scripts/clear-todos.mjs
 * Requires: dotenv, @libsql/client
 */
import { config } from "dotenv";
import { createClient } from "@libsql/client";

config({ path: ".env" });

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL not set. Create .env from .env.example.");
  process.exit(1);
}

const client = createClient({
  url: url.replace(/^file:/, "file:"),
});

try {
  const r = await client.execute("DELETE FROM zaffr_todo");
  console.log("Cleared todos. Rows affected:", r.rowsAffected);
} catch (e) {
  console.error("Failed to clear todos:", e.message);
  process.exit(1);
} finally {
  client.close();
}

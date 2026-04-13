import { NextResponse } from "next/server";
import { createClient } from "@libsql/client";
import { env } from "~/env";

export async function GET() {
  const rawUrl = process.env.DATABASE_URL ?? "(not set)";
  const rawToken = process.env.DATABASE_AUTH_TOKEN;
  const envUrl = env.DATABASE_URL ?? "(not set via env wrapper)";
  const envToken = env.DATABASE_AUTH_TOKEN;

  const masked = (s: string | undefined, label: string) =>
    !s ? `(not set: ${label})` : `${s.slice(0, 8)}…${s.slice(-4)} (${s.length} chars)`;

  const diag: Record<string, unknown> = {
    status: "ok",
    raw_process_env: {
      DATABASE_URL: rawUrl,
      DATABASE_AUTH_TOKEN: masked(rawToken, "raw"),
    },
    t3_env_wrapper: {
      DATABASE_URL: envUrl,
      DATABASE_AUTH_TOKEN: masked(envToken, "t3"),
    },
  };

  // Test 1: direct connection (bypasses env wrapper)
  if (rawUrl !== "(not set)" && rawToken) {
    try {
      const client = createClient({ url: rawUrl, authToken: rawToken });
      const result = await client.execute("SELECT 1 as test");
      diag.direct_connection = { connected: true, result: result.rows };
      client.close();
    } catch (err) {
      diag.direct_connection = {
        connected: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  // Test 2: through env wrapper (same path as tRPC)
  const appUrl = envUrl !== "(not set via env wrapper)" ? envUrl : undefined;
  const appToken = envToken;
  if (appUrl) {
    try {
      const client = createClient({
        url: appUrl,
        ...(appToken ? { authToken: appToken } : {}),
      });
      const result = await client.execute("SELECT 1 as test");
      diag.env_wrapper_connection = { connected: true, result: result.rows };
      client.close();
    } catch (err) {
      diag.env_wrapper_connection = {
        connected: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  } else {
    diag.env_wrapper_connection = { skipped: true, reason: "env wrapper DATABASE_URL is undefined" };
  }

  return NextResponse.json(diag, { status: 200 });
}

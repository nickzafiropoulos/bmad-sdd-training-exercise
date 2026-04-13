import { NextResponse } from "next/server";
import { createClient } from "@libsql/client";

export async function GET() {
  const url = process.env.DATABASE_URL ?? "(not set)";
  const token = process.env.DATABASE_AUTH_TOKEN;

  const masked = (s: string | undefined) =>
    !s ? "(not set)" : `${s.slice(0, 8)}…${s.slice(-4)} (${s.length} chars)`;

  const diag: Record<string, unknown> = {
    status: "ok",
    env: {
      DATABASE_URL: url,
      DATABASE_AUTH_TOKEN: masked(token),
      NODE_ENV: process.env.NODE_ENV,
    },
  };

  if (url !== "(not set)" && token) {
    try {
      const client = createClient({ url, authToken: token });
      const result = await client.execute("SELECT 1 as test");
      diag.db = { connected: true, result: result.rows };
      client.close();
    } catch (err) {
      diag.db = {
        connected: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  } else {
    diag.db = { connected: false, reason: "Missing DATABASE_URL or DATABASE_AUTH_TOKEN" };
  }

  return NextResponse.json(diag, { status: 200 });
}

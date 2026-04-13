import { NextResponse } from "next/server";

/**
 * Health check endpoint for Docker and load balancers.
 * GET /api/health returns 200 when the app is ready to serve traffic.
 */
export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}

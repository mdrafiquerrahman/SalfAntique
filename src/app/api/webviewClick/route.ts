import { NextResponse } from "next/server";

/**
 * This route exists solely to handle internal IDE/Webview interaction tracking
 * and prevent "Request timeout" errors from appearing in the console logs.
 */
export async function POST() {
  return NextResponse.json({ status: "ok" });
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

import { NextResponse } from "next/server";
import { get_session } from "@/lib/session";

export async function GET() {
  const session = await get_session();
  
  if (!session) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: session.user });
}

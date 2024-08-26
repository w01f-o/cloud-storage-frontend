import { auth, unstable_update } from "@/services/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";
import { AuthApi } from "@/services/auth/auth.api";

// export async function POST() {
//   const session = (await auth()) as Session;
//   console.log(session);
//
//   return NextResponse.json({ success: true });
// }

export const POST = auth((req) => {
  // const session: Session = await req.json();

  console.log(req.auth);
  return NextResponse.json({ success: true });
});

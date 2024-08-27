import { auth, unstable_update } from "@/services/auth/auth";
import { NextResponse } from "next/server";
import { Session } from "next-auth";

export const GET = auth(async (req) => {
  const session = req.auth as Session;
  const newSession = await unstable_update({
    ...session,
    user: { ...session.user, accessExpiresAt: Date.now() + 1000 * 10 },
  });
  console.log(newSession);

  return NextResponse.json({ success: true });
});

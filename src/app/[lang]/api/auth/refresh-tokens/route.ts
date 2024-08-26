import { auth } from "@/services/auth/auth";
import { NextResponse } from "next/server";

export const GET = auth((req) => {
  console.log(req.auth);

  return NextResponse.json({ success: true });
});

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/services/auth/auth";

export async function middleware(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/welcome", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/storage", "/shared", "/settings"],
};

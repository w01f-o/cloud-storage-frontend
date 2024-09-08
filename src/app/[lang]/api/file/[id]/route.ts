import { auth } from "@/services/auth/auth";
import { NextResponse } from "next/server";

export const GET = auth((req, ctx) => {
  const fileId = ctx.params?.id;
  const tokenParams = new URLSearchParams({
    token: req.auth!.user.accessToken,
  });

  const fileUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/${fileId}?${tokenParams.toString()}`;

  return NextResponse.redirect(fileUrl);
});

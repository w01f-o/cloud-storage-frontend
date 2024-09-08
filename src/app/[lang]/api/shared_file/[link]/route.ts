import { auth } from "@/services/auth/auth";
import { NextResponse } from "next/server";

export const GET = auth((_, ctx) => {
  const fileLink = ctx.params?.link;

  const fileUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shared_file/download/${fileLink}`;

  return NextResponse.redirect(fileUrl);
});

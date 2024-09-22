import { auth } from "@/services/auth/auth";
import { NextResponse } from "next/server";

export const GET = auth((req, ctx) => {
  const fileType = req.nextUrl.searchParams.get("file_type");
  let fileUrl: string | null = null;
  const fileSlug = ctx.params?.slug;

  switch (fileType) {
    case "file":
      const tokenParams = new URLSearchParams({
        token: req.auth!.user.accessToken,
      });

      fileUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/${fileSlug}?${tokenParams.toString()}`;

      break;

    case "shared_file":
      fileUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shared_file/download/${fileSlug}`;

      break;

    default:
      throw new Error("File type is not defined");
  }

  return NextResponse.redirect(fileUrl);
});

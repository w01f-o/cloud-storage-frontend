import { NextRequest, NextResponse } from "next/server";
import { uploadFileAction } from "@/actions/files.actions";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const result = await uploadFileAction(formData);

  return NextResponse.json(result);
};

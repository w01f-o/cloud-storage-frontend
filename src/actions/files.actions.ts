"use server";

import { createServerAction, ServerActionError } from "@/actions/actions.utils";
import { FilesApi } from "@/services/api/index.api";

export const uploadFileAction = createServerAction(
  async (uploadFileData: FormData) => {
    const { response, data } = await FilesApi.upload(uploadFileData);

    if (!response.ok) {
      throw new ServerActionError(JSON.stringify(data));
    }

    return data;
  },
);

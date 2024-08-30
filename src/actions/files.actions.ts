"use server";

import { createServerAction, ServerActionError } from "@/actions/actions.utils";
import { FilesApi } from "@/services/api/index.api";
import { UpdateFileDto } from "@/types/dtos/updateFile.dto";

export const uploadFileAction = createServerAction(
  async (uploadFileData: FormData) => {
    const { response, data } = await FilesApi.upload(uploadFileData);

    if (!response.ok) {
      throw new ServerActionError(JSON.stringify(data));
    }

    return data;
  },
);

export const deleteFileAction = createServerAction(async (id: string) => {
  const { response, data } = await FilesApi.delete(id);

  if (!response.ok) {
    throw new ServerActionError(JSON.stringify(data));
  }

  return data;
});

export const updateFileAction = createServerAction(
  async (id: string, updateFileDto: UpdateFileDto) => {
    const { response, data } = await FilesApi.update(id, updateFileDto);

    if (!response.ok) {
      throw new ServerActionError(JSON.stringify(data));
    }

    return data;
  },
);

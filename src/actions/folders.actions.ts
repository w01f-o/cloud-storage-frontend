"use server";

import { createServerAction, ServerActionError } from "@/actions/actions.utils";
import { CreateFolderDto } from "@/types/dtos/folders/createFolder.dto";
import { FoldersApi } from "@/services/api/index.api";
import { UpdateFolderDto } from "@/types/dtos/users/updateFolder.dto";

export const createFolderAction = createServerAction(
  async (createFolderDto: CreateFolderDto) => {
    const { data, response } = await FoldersApi.create(createFolderDto);

    if (!response.ok) {
      throw new ServerActionError(JSON.stringify(data));
    }

    return data;
  },
);

export const deleteFolderAction = createServerAction(async (id: string) => {
  const { data, response } = await FoldersApi.delete(id);

  if (!response.ok) {
    throw new ServerActionError(JSON.stringify(data));
  }

  return data;
});

export const updateFolderAction = createServerAction(
  async (id: string, updateFolderDto: UpdateFolderDto) => {
    const { data, response } = await FoldersApi.update(id, updateFolderDto);

    if (!response.ok) {
      throw new ServerActionError(JSON.stringify(data));
    }

    return data;
  },
);

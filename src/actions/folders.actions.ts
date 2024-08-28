"use server";

import { createServerAction } from "@/actions/actions.utils";
import { CreateFolderDto } from "@/types/dtos/createFolder.dto";
import { FoldersApi } from "@/services/api/index.api";

export const createFolderAction = createServerAction(
  async (createFolderDto: CreateFolderDto) => {
    const { data } = await FoldersApi.create(createFolderDto);

    return data;
  },
);

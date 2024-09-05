"use server";

import { UserApi } from "@/services/api/index.api";
import { createServerAction, ServerActionError } from "./actions.utils";

export const updateAvatarAction = createServerAction(
  async (formData: FormData) => {
    const { response, data } = await UserApi.updateAvatar(formData);

    if (!response.ok) {
      throw new ServerActionError(response.statusText);
    }

    return data;
  },
);

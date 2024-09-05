"use server";

import { UserApi } from "@/services/api/index.api";
import { createServerAction, ServerActionError } from "./actions.utils";
import { ChangePasswordDto } from "@/types/dtos/changePassword.dto";

export const updateAvatarAction = createServerAction(
  async (formData: FormData) => {
    const { response, data } = await UserApi.updateAvatar(formData);

    if (!response.ok) {
      throw new ServerActionError(JSON.stringify(data));
    }

    return data;
  },
);

export const updatePasswordAction = createServerAction(
  async (changePasswordDto: ChangePasswordDto) => {
    const { response, data } = await UserApi.updatePassword(changePasswordDto);

    if (!response.ok) {
      throw new ServerActionError(JSON.stringify(data));
    }

    return data;
  },
);

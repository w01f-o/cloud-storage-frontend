"use server";

import { UserApi } from "@/services/api/index.api";
import { createServerAction, ServerActionError } from "./actions.utils";
import { ChangePasswordDto } from "@/types/dtos/changePassword.dto";
import { UpdateEmailDto } from "@/types/dtos/updateEmail.dto";
import { UpdateNameDto } from "@/types/dtos/updateName.dto";

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

export const updateEmailAction = createServerAction(
  async (updateEmailDto: UpdateEmailDto) => {
    const { response, data } = await UserApi.updateEmail(updateEmailDto);

    if (!response.ok) {
      throw new ServerActionError(JSON.stringify(data));
    }

    return data;
  },
);

export const updateNameAction = createServerAction(
  async (updateNameDto: UpdateNameDto) => {
    const { response, data } = await UserApi.updateName(updateNameDto);

    if (!response.ok) {
      throw new ServerActionError(JSON.stringify(data));
    }

    return data;
  },
);

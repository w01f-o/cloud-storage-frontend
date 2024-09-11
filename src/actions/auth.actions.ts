"use server";

import { auth, signIn, signOut } from "@/services/auth/auth";
import { createServerAction, ServerActionError } from "@/actions/actions.utils";
import {
  AuthDto,
  AuthLoginDto,
  AuthRegistrationDto,
} from "@/types/dtos/auth/auth.dto";
import { AuthApi, UserApi } from "@/services/api/index.api";
import { ActivateDto } from "@/types/dtos/auth/activate.dto";
import { redirect } from "next/navigation";

export const loginAction = createServerAction(async (formData: AuthDto) => {
  const body: AuthLoginDto = {
    email: formData.email,
    password: formData.password,
  };

  await signIn("credentials", { redirect: false, ...body });
});

export const registerAction = createServerAction(async (formData: AuthDto) => {
  const body: AuthRegistrationDto = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  };
  const { response, data } = await AuthApi.register(body);

  if (!response.ok) {
    throw new ServerActionError(JSON.stringify(data));
  }

  await signIn("credentials", { redirect: false, ...body });
});

export const logoutAction = createServerAction(async () => {
  const session = await auth();
  const { response, data } = await AuthApi.logout(session!.user.refreshToken);

  if (!response.ok) {
    throw new ServerActionError(JSON.stringify(data));
  }

  await signOut({ redirect: false });
});

export const activateAction = createServerAction(
  async (activateDto: ActivateDto) => {
    const { data, response } = await AuthApi.activate(activateDto);

    if (!response.ok) {
      throw new ServerActionError(JSON.stringify(data));
    }

    return data;
  },
);

export const sendActivationCodeAgainAction = createServerAction(async () => {
  const { data, response } = await UserApi.sendActivationCodeAgain();

  if (!response.ok) {
    throw new ServerActionError(JSON.stringify(data));
  }

  return data;
});

export const redirectAction = createServerAction(async (pathname: string) => {
  redirect(pathname);
});

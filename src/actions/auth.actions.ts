"use server";

import { auth, signIn, signOut } from "@/services/auth/auth";
import { createServerAction, ServerActionError } from "@/actions/actions.utils";
import { AuthFormDto } from "@/types/dtos/authFormDto.type";
import { AuthLoginDto } from "@/types/dtos/authLogin.dto";
import { AuthRegistrationDto } from "@/types/dtos/authRegistrationDto";
import { redirect } from "next/navigation";
import { AuthApi, UserApi } from "@/services/api/index.api";

export const loginAction = createServerAction(async (formData: AuthFormDto) => {
  const body: AuthLoginDto = {
    email: formData.email,
    password: formData.password,
  };

  await signIn("credentials", { redirect: false, ...body });
});

export const registerAction = createServerAction(
  async (formData: AuthFormDto) => {
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
  },
);

export const logoutAction = createServerAction(async () => {
  const session = await auth();
  const { response, data } = await AuthApi.logout(session!.user.refreshToken);

  if (!response.ok) {
    throw new ServerActionError(JSON.stringify(data));
  }

  await signOut({ redirect: false });
});

export const activateAction = createServerAction(async (code: number) => {
  const session = await auth();
  const { data, response } = await AuthApi.activate({
    code,
    email: session?.user.email ?? "",
  });

  if (!response.ok) {
    throw new ServerActionError(JSON.stringify(data));
  }

  return data;
});

export const sendActivationCodeAgainAction = createServerAction(async () => {
  const { data, response } = await UserApi.sendActivationCodeAgain();

  if (!response.ok) {
    throw new ServerActionError(JSON.stringify(data));
  }

  return data;
});

export const redirectAction = createServerAction(async (path: string) => {
  redirect(path);
});

export const getAccessTokenAction = createServerAction(async () => {
  return (await auth())?.user.accessToken;
});

"use server";

import { auth, signIn, signOut } from "@/services/auth/auth";
import { AuthApi } from "@/services/auth/auth.api";
import { CustomAuthError } from "@/services/auth/auth.error";

export const loginAction = async (formData: FormData) => {
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  return await signIn("credentials", { redirectTo: "/", ...body });
};

export const registerAction = async (formData: FormData) => {
  const body = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const { response, data } = await AuthApi.register(body);

  if (response.ok) {
    return await signIn("credentials", { redirectTo: "/", ...body });
  } else {
    throw new CustomAuthError(JSON.stringify({ data, response }));
  }
};

export const logoutAction = async () => {
  const session = await auth();
  await AuthApi.logout(session!.user.refreshToken);
  return await signOut({ redirectTo: "/welcome" });
};

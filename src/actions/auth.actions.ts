"use server";

import { auth, signIn, signOut } from "@/services/auth/auth";
import { AuthApi } from "@/services/auth/auth.api";

export const signInAction = async (formData: FormData) => {
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  await signIn("credentials", { redirectTo: "/", ...body });
};

export const registerAction = async (formData: FormData) => {
  const body = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const { response } = await AuthApi.register(body);

  if (response.ok) {
    await signIn("credentials", { redirectTo: "/", ...body });
  }
};

export const signOutAction = async () => {
  const session = await auth();
  await AuthApi.logout(session!.user.refreshToken);
  await signOut({ redirectTo: "/auth/signIn" });
};

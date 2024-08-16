"use server";

import { auth, signIn, signOut } from "@/services/auth/auth";
import { AuthApi } from "@/services/auth/auth.api";
import { createServerAction, ServerActionError } from "@/actions/actions.utils";

export const loginAction = createServerAction(async (formData: FormData) => {
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  await signIn("credentials", { redirectTo: "/", ...body });
});

export const registerAction = createServerAction(async (formData: FormData) => {
  const body = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const { response, data } = await AuthApi.register(body);

  if (!response.ok) {
    throw new ServerActionError(JSON.stringify(data));
  }

  await signIn("credentials", { redirectTo: "/", ...body });
});

export const logoutAction = createServerAction(async () => {
  const session = await auth();
  const { response, data } = await AuthApi.logout(session!.user.refreshToken);

  if (!response.ok) {
    throw new ServerActionError(JSON.stringify(data));
  }

  await signOut({ redirectTo: "/welcome" });
});

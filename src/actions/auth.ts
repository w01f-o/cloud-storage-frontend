"use server";

import { signIn, signOut } from "@/services/auth/auth";
import { AuthApi } from "@/services/auth/auth.api";
import { redirect } from "next/navigation";

export const signInAction = async (formData: FormData) => {
  await signIn("credentials", formData);
  redirect("/");
};

export const registerAction = async (formData: FormData) => {
  const { response } = await AuthApi.register(formData);

  if (response.ok) {
    await signIn("credentials", formData);
    redirect("/");
  }
};

export const signOutAction = async () => {
  await signOut();
};

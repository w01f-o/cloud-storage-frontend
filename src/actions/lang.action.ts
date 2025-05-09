import { loadDictionary } from "@/dictionaries/dictionaries";
import { cookies } from "next/headers";
import { RootDictionary } from "@/types/dictionaries.type";

export const getDictionary = async (): Promise<RootDictionary> => {
  const cookie = cookies();
  const defaultLocale = process.env.DEFAULT_LOCALE;
  const cookieLocale = process.env.COOKIE_NEXT_LOCALE;

  if (!cookieLocale) {
    throw new Error("process.env.COOKIE_NEXT_LOCALE is not defined");
  }

  if (!defaultLocale) {
    throw new Error("process.env.DEFAULT_LOCALE is not defined");
  }

  return await loadDictionary(cookie.get(cookieLocale)?.value || defaultLocale);
};

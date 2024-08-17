import { loadDictionary } from "@/dictionaries/dictionaries";
import { cookies } from "next/headers";

export const getDictionary = async () => {
  const cookie = cookies();
  const defaultLocale = process.env.DEFAULT_LOCALE;
  const cookieLocale = process.env.COOKIE_NEXT_LOCALE;

  if (!cookieLocale) {
    throw new Error("process.env.COOKIE_NEXT_LOCALE is not defined");
  }

  if (!defaultLocale) {
    throw new Error("defaultLocale is not defined");
  }

  return await loadDictionary(cookie.get(cookieLocale)?.value || defaultLocale);
};

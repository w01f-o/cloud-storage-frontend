import "server-only";
import { RootDictionary } from "@/types/dictionaries.type";

type DictionaryLoader = () => Promise<RootDictionary>;

// TODO: Add translate for Error from backend and add other languages

const dictionaries: Record<string, DictionaryLoader> = {
  ["en-US"]: () =>
    import("@/dictionaries/en-US.json").then(
      (module) => module.default as RootDictionary,
    ),
  ["ru-ru"]: () =>
    import("@/dictionaries/ru-ru.json").then(
      (module) => module.default as RootDictionary,
    ),
};

export const loadDictionary = async (locale: string): Promise<RootDictionary> =>
  dictionaries[locale]();

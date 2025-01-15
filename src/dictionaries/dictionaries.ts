import "server-only";
import { RootDictionary } from "@/types/dictionaries.type";

type DictionaryLoader = () => Promise<RootDictionary>;

const supportedLocales = [
  "en-US",
  "ru-ru",
  "kk-KZ",
  "es-ES",
  "fr-FR",
  "de-DE",
  "it-IT",
  "pt-PT",
  "zh-CN",
  "ja-JP",
  "ko-KR",
];

const createDictionaryLoader =
  (locale: string): DictionaryLoader =>
  () =>
    import(`@/dictionaries/${locale}.json`).then(
      (module) => module.default as RootDictionary,
    );

const dictionaries: Record<string, DictionaryLoader> = Object.fromEntries(
  supportedLocales.map((locale) => [locale, createDictionaryLoader(locale)]),
);

export const loadDictionary = async (locale: string): Promise<RootDictionary> =>
  dictionaries[locale]?.();

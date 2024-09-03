import "server-only";
import { RootDictionary } from "@/types/dictionaries.type";

type DictionaryLoader = () => Promise<RootDictionary>;

const dictionaries: Record<string, DictionaryLoader> = {
  ["en-US"]: () =>
    import("@/dictionaries/en-US.json").then(
      (module) => module.default as RootDictionary,
    ),
  ["ru-ru"]: () =>
    import("@/dictionaries/ru-ru.json").then(
      (module) => module.default as RootDictionary,
    ),
  // ["kk-KZ"]: () =>
  //   import("@/dictionaries/kk-KZ.json").then(
  //     (module) => module.default as RootDictionary,
  //   ),
  // ["es-ES"]: () =>
  //   import("@/dictionaries/es-ES.json").then(
  //     (module) => module.default as RootDictionary,
  //   ),
  // ["fr-FR"]: () =>
  //   import("@/dictionaries/fr-FR.json").then(
  //     (module) => module.default as RootDictionary,
  //   ),
  // ["de-DE"]: () =>
  //   import("@/dictionaries/de-DE.json").then(
  //     (module) => module.default as RootDictionary,
  //   ),
  // ["it-IT"]: () =>
  //   import("@/dictionaries/it-IT.json").then(
  //     (module) => module.default as RootDictionary,
  //   ),
  // ["pt-PT"]: () =>
  //   import("@/dictionaries/pt-PT.json").then(
  //     (module) => module.default as RootDictionary,
  //   ),
  // ["zh-CN"]: () =>
  //   import("@/dictionaries/zh-CN.json").then(
  //     (module) => module.default as RootDictionary,
  //   ),
  // ["ja-JP"]: () =>
  //   import("@/dictionaries/ja-JP.json").then(
  //     (module) => module.default as RootDictionary,
  //   ),
  // ["ko-KR"]: () =>
  //   import("@/dictionaries/ko-KR.json").then(
  //     (module) => module.default as RootDictionary,
  //   ),
};

export const loadDictionary = async (locale: string): Promise<RootDictionary> =>
  dictionaries[locale]();

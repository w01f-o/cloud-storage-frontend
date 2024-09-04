export interface Language {
  name: string;
  code: string;
}

export const languages: Language[] = [
  {
    name: "english",
    code: "en-US",
  },
  {
    name: "russian",
    code: "ru-ru",
  },
].sort((a, b) => a.name.localeCompare(b.name));

/*
* ,
  {
    name: "spanish",
    code: "es-ES",
  },
  {
    name: "french",
    code: "fr-FR",
  },
  {
    name: "german",
    code: "de-DE",
  },
  {
    name: "italian",
    code: "it-IT",
  },
  {
    name: "portuguese",
    code: "pt-PT",
  },
  {
    name: "chinese",
    code: "zh-CN",
  },
  {
    name: "japanese",
    code: "ja-JP",
  },
  {
    name: "korean",
    code: "ko-KR",
  },
  {
    name: "kazakhstan",
    code: "kk-KZ",
  },
* */

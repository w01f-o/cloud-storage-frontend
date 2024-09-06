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
  {
    name: "kazakhstan",
    code: "kk-KZ",
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
    name: "chinese",
    code: "zh-CN",
  },
  {
    name: "french",
    code: "fr-FR",
  },
  {
    name: "spanish",
    code: "es-ES",
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
];
//.sort((a, b) => a.name.localeCompare(b.name));

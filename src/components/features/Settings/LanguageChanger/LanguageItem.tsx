import { FC } from "react";
import styles from "./languageChanger.module.scss";
import { Language } from "@/components/features/Settings/LanguageChanger/languages";
import FlagIcon from "@/components/shared/Icons/FlagIcon";
import { RootDictionary } from "@/types/dictionaries.type";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import clsx from "clsx";

interface LanguageItemProps {
  language: Language;
  dict: RootDictionary;
}

const LanguageItem: FC<LanguageItemProps> = ({ language, dict }) => {
  const router = useRouter();
  const { lang } = useParams();

  const clickHandler = async () => {
    router.replace(`/${language.code}/settings`);
    router.refresh();
  };

  return (
    <div
      className={clsx(styles.item, {
        [styles.active]: language.code === lang,
      })}
      onClick={clickHandler}
    >
      <FlagIcon language={language.code} />
      {/*@ts-expect-error*/}
      {dict.settings.language[language.name]}
    </div>
  );
};

export default LanguageItem;

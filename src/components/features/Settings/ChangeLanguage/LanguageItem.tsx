import { FC } from "react";
import styles from "./changeLanguage.module.scss";
import { Language } from "@/components/features/Settings/ChangeLanguage/languages";
import FlagIcon from "@/components/shared/Icons/FlagIcon";
import { RootDictionary } from "@/types/dictionaries.type";
import { useParams, useRouter } from "next/navigation";
import clsx from "clsx";

interface LanguageItemProps {
  language: Language;
  dict: RootDictionary;
}

const LanguageItem: FC<LanguageItemProps> = ({ language, dict }) => {
  const router = useRouter();
  const { lang } = useParams();

  const clickHandler = async () => {
    router.push(`/${language.code}/settings`);
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

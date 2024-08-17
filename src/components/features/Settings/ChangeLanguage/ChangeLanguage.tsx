"use client";

import { FC, useState } from "react";
import Button from "@/components/shared/UI/Button/Button";
import { RootDictionary } from "@/types/dictionaries.type";
import Modal from "@/components/shared/UI/Modal/Modal";
import styles from "./changeLanguage.module.scss";
import { languages } from "@/components/features/Settings/ChangeLanguage/languages";
import LanguageItem from "@/components/features/Settings/ChangeLanguage/LanguageItem";

interface ChangeLanguageProps {
  dict: RootDictionary;
  lang: string;
}

const ChangeLanguage: FC<ChangeLanguageProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const clickHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Button
        role="secondary"
        title={dict.settings.language.change}
        type="button"
        onClick={clickHandler}
      >
        {dict.settings.language.change}
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <div className={styles.modalContent}>
          {languages.map((lang) => (
            <LanguageItem language={lang} key={lang.code} dict={dict} />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ChangeLanguage;

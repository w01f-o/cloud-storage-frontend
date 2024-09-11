"use client";

import { FC, useState } from "react";
import Button from "@/components/shared/UI/Button/Button";
import { RootDictionary } from "@/types/dictionaries.type";
import Modal from "@/components/shared/UI/Modal/Modal";
import styles from "./languageChanger.module.scss";
import { languages } from "@/components/features/Settings/LanguageChanger/languages";
import LanguageItem from "@/components/features/Settings/LanguageChanger/LanguageItem";

interface ChangeLanguageProps {
  dict: RootDictionary;
  lang: string;
}

const LanguageChanger: FC<ChangeLanguageProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const clickHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Button role={"secondary"} onClick={clickHandler}>
        {dict.settings.language.change}
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <div className={styles.modalContent}>
          {languages
            .sort((a, b) =>
              dict.settings.language[
                a.name as keyof RootDictionary["settings"]["language"]
              ].localeCompare(
                dict.settings.language[
                  b.name as keyof RootDictionary["settings"]["language"]
                ],
              ),
            )
            .map((lang) => (
              <LanguageItem language={lang} key={lang.code} dict={dict} />
            ))}
        </div>
      </Modal>
    </>
  );
};

export default LanguageChanger;

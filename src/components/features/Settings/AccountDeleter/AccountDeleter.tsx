"use client";

import { FC, useState } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";
import Modal from "@/components/shared/UI/Modal/Modal";
import styles from "./accountDeleter.module.scss";

interface AccountDeleterProps {
  dict: RootDictionary;
}

const AccountDeleter: FC<AccountDeleterProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const clickHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Button
        role="secondary"
        title={"Удалить"}
        type="button"
        onClick={clickHandler}
        isDanger
      >
        Удалить аккаунт
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        ...
      </Modal>
    </>
  );
};

export default AccountDeleter;

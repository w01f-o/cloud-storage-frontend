"use client";

import { FC, useState } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";
import Modal from "@/components/shared/UI/Modal/Modal";

interface ChangePasswordProps {
  dict: RootDictionary;
}

const ChangePassword: FC<ChangePasswordProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const clickHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Button
        role="secondary"
        title={dict.settings.password.change}
        type="button"
        onClick={clickHandler}
      >
        {dict.settings.password.change}
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        {/* TODO: Add password change form */}
        ...
      </Modal>
    </>
  );
};

export default ChangePassword;

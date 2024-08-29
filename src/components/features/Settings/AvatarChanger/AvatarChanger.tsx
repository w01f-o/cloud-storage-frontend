"use client";

import { FC, useState } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";
import Modal from "@/components/shared/UI/Modal/Modal";

interface AvatarChangerProps {
  dict: RootDictionary;
}

const AvatarChanger: FC<AvatarChangerProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const clickHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Button
        role="secondary"
        title={dict.settings.avatar.change}
        type="button"
        onClick={clickHandler}
      >
        {dict.settings.avatar.change}
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        {/* TODO: Add avatar change form */}
        ...
      </Modal>
    </>
  );
};

export default AvatarChanger;

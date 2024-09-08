"use client";

import { FC, useState } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";
import Modal from "@/components/shared/UI/Modal/Modal";
import SadEmojiIcon from "@/components/shared/Icons/SadEmojiIcon";

interface ImprovePlanProps {
  dict: RootDictionary;
}

const PlanImprover: FC<ImprovePlanProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const clickHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Button
        role="secondary"
        title={dict.settings.plan.improve}
        type="button"
        onClick={clickHandler}
      >
        {dict.settings.plan.improve}
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <SadEmojiIcon />
      </Modal>
    </>
  );
};

export default PlanImprover;

"use client";

import { FC, useState } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";

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
      {/*<Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>*/}
      {/*  {Intl.DateTimeFormat().resolvedOptions().timeZone ===*/}
      {/*  "Europe/Moscow" ? (*/}
      {/*    <div>В вашем регионе эта услуга не доступно</div>*/}
      {/*  ) : (*/}
      {/*    <div>В вашем регионе эта услуга не доступно</div>*/}
      {/*  )}*/}
      {/*</Modal>*/}
    </>
  );
};

export default PlanImprover;

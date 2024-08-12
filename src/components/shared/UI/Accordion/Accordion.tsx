"use client";

import { FC, useState } from "react";
import styles from "./accordion.module.scss";
import AccordionItem from "./AccordionItem";

export type AccordionData = {
  id: number;
  title: string;
  body: string;
};

interface AccordionProps {
  data: AccordionData[];
}

const Accordion: FC<AccordionProps> = ({ data }) => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className={styles.accordion}>
      {data.map((item) => (
        <AccordionItem
          key={item.id}
          data={item}
          active={active}
          setActive={setActive}
        />
      ))}
    </div>
  );
};

export default Accordion;

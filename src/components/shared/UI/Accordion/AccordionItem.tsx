import { Dispatch, FC, SetStateAction } from "react";
import { AccordionData } from "./Accordion";
import styles from "./accordion.module.scss";
import clsx from "clsx";

interface AccordionItemProps {
  data: AccordionData;
  active: number | null;
  setActive: Dispatch<SetStateAction<number | null>>;
}

const AccordionItem: FC<AccordionItemProps> = ({
  active,
  setActive,
  data: { body, title, id },
}) => {
  const clickHandler = () => {
    setActive(id === active ? null : id);
  };

  return (
    <div
      className={clsx(styles.item, {
        [styles.active]: id === active,
      })}
    >
      <button
        className={styles.button}
        onClick={clickHandler}
        type="button"
        title={title}
      >
        {title}
      </button>
      <div className={styles.body} aria-expanded={id === active}>
        <div className={styles.content}>{body}</div>
      </div>
    </div>
  );
};

export default AccordionItem;

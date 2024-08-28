import { FC } from "react";
import styles from "./contextMenu.module.scss";

interface ContextMenuItemProps {
  item: {
    id: number;
    name: string;
    action: () => void;
  };
}

const ContextMenuItem: FC<ContextMenuItemProps> = ({ item }) => {
  const clickHandler = () => {
    item.action();
  };

  return (
    <div className={styles.item} onClick={clickHandler}>
      {item.name}
    </div>
  );
};

export default ContextMenuItem;

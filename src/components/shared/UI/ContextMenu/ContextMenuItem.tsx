import { FC } from "react";
import styles from "./contextMenu.module.scss";
import clsx from "clsx";
import type { ContextMenuItemType } from "./ContextMenu";

interface ContextMenuItemProps {
  item: ContextMenuItemType;
}

const ContextMenuItem: FC<ContextMenuItemProps> = ({ item }) => {
  const clickHandler = () => {
    item.action();
  };

  return (
    <button
      className={clsx(styles.item, {
        [styles.danger]: item.isDanger,
      })}
      onClick={clickHandler}
      title={item.name}
      type="button"
    >
      {item.name}
    </button>
  );
};

export default ContextMenuItem;

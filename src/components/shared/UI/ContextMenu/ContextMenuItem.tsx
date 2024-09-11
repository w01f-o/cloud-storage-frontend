import { FC } from "react";
import styles from "./contextMenu.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { ContextMenuItemType } from "@/types/contextMenuItem.type";

interface ContextMenuItemProps {
  item: ContextMenuItemType;
}

const ContextMenuItem: FC<ContextMenuItemProps> = ({
  item: { isDanger, link, name, action },
}) => {
  const clickHandler = () => {
    action?.();
  };

  return link ? (
    <Link
      className={clsx(styles.item, {
        [styles.danger]: isDanger,
      })}
      href={link.href}
      target={link.target}
    >
      {name}
    </Link>
  ) : (
    <button
      className={clsx(styles.item, {
        [styles.danger]: isDanger,
      })}
      onClick={clickHandler}
    >
      {name}
    </button>
  );
};

export default ContextMenuItem;

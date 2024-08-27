import { FC } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./navbar.module.scss";

interface NavBarItemProps {
  path: string;
  name: string;
  isActive: boolean;
  isTempActive: boolean;
}

const NavBarItem: FC<NavBarItemProps> = ({
  path,
  name,
  isActive,
  isTempActive,
}) => {
  return (
    <li key={path} className={styles.item}>
      <Link
        href={path}
        className={clsx(styles.link, {
          [styles.active]: isActive,
          [styles.tempActive]: isTempActive,
        })}
      >
        {name}
      </Link>
    </li>
  );
};

export default NavBarItem;

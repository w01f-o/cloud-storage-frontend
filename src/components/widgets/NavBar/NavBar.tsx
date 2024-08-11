"use client";

import { FC } from "react";
import styles from "./navbar.module.scss";
import { appRoutes } from "@/routes/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NavBar: FC = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {appRoutes.map((route) => (
          <li key={route.path} className={styles.item}>
            <Link
              href={route.path}
              className={clsx(styles.link, {
                [styles.active]: pathname === route.path,
              })}
            >
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

"use client";

import { FC, useEffect, useRef, useState } from "react";
import styles from "./navbar.module.scss";
import { appRoutes } from "@/routes/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NavBar: FC = () => {
  const pathname = usePathname();
  const [activeBarPosition, setActiveBarPosition] = useState<number | null>(
    null
  );
  const navListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const activeLink = document.querySelector(
      `.${styles.link}.${styles.active}`
    );

    if (activeLink && navListRef.current) {
      setActiveBarPosition(
        activeLink.getBoundingClientRect().top -
          navListRef.current.getBoundingClientRect().top
      );
    }
  }, [pathname]);

  return (
    <nav className={styles.nav}>
      {activeBarPosition !== null && (
        <div
          className={styles.activeBar}
          style={{ top: `${activeBarPosition}px` }}
        />
      )}
      <ul className={styles.list} ref={navListRef}>
        {appRoutes.map((route) => (
          <li key={route.path} className={styles.item}>
            <Link
              href={route.path}
              className={clsx(styles.link, {
                [styles.active]: pathname === route.path,
                [styles.tempActive]:
                  activeBarPosition === null && pathname === route.path,
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

"use client";

import { FC, useEffect, useRef, useState } from "react";
import styles from "./navbar.module.scss";
import { routes } from "@/components/widgets/NavBar/routes";
import NavBarItem from "@/components/widgets/NavBar/NavBarItem";
import { useParams, usePathname } from "next/navigation";
import { Utils } from "@/services/utils";
import { RootDictionary } from "@/types/dictionaries.type";

interface NavBarProps {
  dict: RootDictionary;
}

const NavBar: FC<NavBarProps> = ({ dict }) => {
  const [activeBarPosition, setActiveBarPosition] = useState<number | null>(
    null,
  );
  const navListRef = useRef<HTMLUListElement | null>(null);
  const { lang } = useParams();
  const pathname = usePathname();

  useEffect(() => {
    if (
      routes.every((route) => !Utils.checkLinkForActive(route, pathname, lang))
    ) {
      setActiveBarPosition(null);
    }

    const activeLink = document.querySelector(
      `.${styles.link}.${styles.active}`,
    );

    if (activeLink && navListRef.current) {
      setActiveBarPosition(
        activeLink.getBoundingClientRect().top -
          navListRef.current.getBoundingClientRect().top,
      );
    }
  }, [lang, pathname]);

  return (
    <nav className={styles.nav}>
      {activeBarPosition !== null && (
        <div
          className={styles.activeBar}
          style={{ top: `${activeBarPosition}px` }}
        />
      )}
      <ul className={styles.list} ref={navListRef}>
        {routes.map((route) => (
          <NavBarItem
            path={route.path}
            //@ts-expect-error
            name={dict.pages[route.name]}
            key={route.path}
            isActive={Utils.checkLinkForActive(route, pathname, lang)}
            isTempActive={
              activeBarPosition === null &&
              Utils.checkLinkForActive(route, pathname, lang)
            }
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

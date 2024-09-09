"use client";

import { FC, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./mobileMenu.module.scss";
import MobileMenuIcon from "@/components/shared/Icons/MobileMenuIcon";
import ReactPortal from "@/components/features/ReactPortal/ReactPortal";
import { animated, useTransition } from "@react-spring/web";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  children: ReactNode;
}

const MobileMenu: FC<MobileMenuProps> = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const buttonClickHandler = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const transition = useTransition(menuIsOpen, {
    from: { clipPath: "circle(30% at 100% 3%)" },
    enter: { clipPath: "circle(90% at 65% 38%)" },
    leave: { clipPath: "circle(30% at 100% 3%)" },
    config: { duration: 200 },
  });

  const menuRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const rootPortalEl = document.querySelector("#root-portal");
  //   if (menuIsOpen && rootPortalEl) {
  //     const clickHandler = (e: Event) => {
  //       if (e.target instanceof HTMLAnchorElement) {
  //         setMenuIsOpen(false);
  //       }
  //     };
  //
  //     rootPortalEl.addEventListener("click", clickHandler);
  //
  //     return () => {
  //       rootPortalEl.removeEventListener("click", clickHandler);
  //     };
  //   }
  // }, [menuIsOpen]);

  const pathname = usePathname();

  useEffect(() => {
    setMenuIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        className={styles.button}
        onClick={buttonClickHandler}
        title={"Menu"}
        type={"button"}
        aria-label={"Open menu"}
      >
        <MobileMenuIcon />
      </button>
      {transition(
        (style, item) =>
          item && (
            <ReactPortal>
              <animated.div className={styles.menu} ref={menuRef} style={style}>
                {children}
              </animated.div>
            </ReactPortal>
          ),
      )}
    </>
  );
};

export default MobileMenu;

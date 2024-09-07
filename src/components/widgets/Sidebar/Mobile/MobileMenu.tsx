"use client";

import { FC, useEffect, useState } from "react";
import styles from "./mobileMenu.module.scss";
import MobileMenuIcon from "@/components/shared/Icons/MobileMenuIcon";
import ReactPortal from "@/components/features/ReactPortal/ReactPortal";
import { animated, useTransition } from "@react-spring/web";
import NavBar from "@/components/widgets/NavBar/NavBar";
import { RootDictionary } from "@/types/dictionaries.type";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  dict: RootDictionary;
}

const MobileMenu: FC<MobileMenuProps> = ({ dict }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const buttonClickHandler = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const pathname = usePathname();

  const transition = useTransition(menuIsOpen, {
    from: { clipPath: "circle(30% at 100% 3%)" },
    enter: { clipPath: "circle(90% at 65% 38%)" },
    leave: { clipPath: "circle(30% at 100% 3%)" },
    config: { duration: 200 },
  });

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
              <animated.div className={styles.menu} style={style}>
                <NavBar dict={dict} />
              </animated.div>
            </ReactPortal>
          ),
      )}
    </>
  );
};

export default MobileMenu;

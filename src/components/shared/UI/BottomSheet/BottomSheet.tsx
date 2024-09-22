"use client";

import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import styles from "./bottomSheet.module.scss";
import ReactPortal from "@/components/features/ReactPortal/ReactPortal";
import { animated, useTransition } from "@react-spring/web";
import { useClickOutside } from "@/hooks/useClickOutside";
import { ContextMenuItemType } from "@/types/contextMenuItem.type";
import Link from "next/link";
import Button from "@/components/shared/UI/Button/Button";

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  actions?: ContextMenuItemType[];
}

const BottomSheet: FC<BottomSheetProps> = ({ isOpen, setIsOpen, actions }) => {
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);

  useClickOutside({ ref: bottomSheetRef, callback: () => setIsOpen(false) });

  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: "translateY(100%)" },
    enter: { opacity: 1, transform: "translateY(0%)" },
    leave: { opacity: 0, transform: "translateY(100%)" },
    config: { duration: 200 },
  });

  useEffect(() => {
    isOpen && document.body.classList.add("body-backdrop");

    return () => {
      document.body.classList.remove("body-backdrop");
    };
  }, [isOpen]);

  return transition(
    (props, item) =>
      item && (
        <ReactPortal>
          <animated.div
            className={styles.bottomSheet}
            style={props}
            ref={bottomSheetRef}
          >
            <div className={styles.content}>
              {actions?.map((item) =>
                item.link ? (
                  <Link key={item.id} href={item.link.href}>
                    <Button role={"secondary"} isDanger={item.isDanger}>
                      {item.name}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    key={item.id}
                    role={"secondary"}
                    onClick={() => {
                      setIsOpen(false);
                      item.action!();
                    }}
                    isDanger={item.isDanger}
                  >
                    {item.name}
                  </Button>
                ),
              )}
            </div>
          </animated.div>
        </ReactPortal>
      ),
  );
};

export default BottomSheet;

"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import styles from "./bottomSheet.module.scss";
import ReactPortal from "@/components/features/ReactPortal/ReactPortal";
import { animated, useTransition } from "@react-spring/web";
import { useClickOutside } from "@/hooks/useClickOutside";

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const BottomSheet: FC<BottomSheetProps> = ({ children, isOpen, setIsOpen }) => {
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
            {children}
          </animated.div>
        </ReactPortal>
      ),
  );
};

export default BottomSheet;

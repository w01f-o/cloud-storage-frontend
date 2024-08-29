import { Dispatch, FC, RefObject, SetStateAction, useEffect } from "react";
import styles from "./contextMenu.module.scss";
import ContextMenuItem from "./ContextMenuItem";
import { useTransition, animated } from "@react-spring/web";
import { useOnClickOutside } from "usehooks-ts";
import layoutStyles from "@/components/pages/Layout/layout.module.scss";

export interface ContextMenuItemType {
  id: number;
  name: string;
  action: () => void;
  isDanger?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItemType[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  buttonRef: RefObject<HTMLButtonElement>;
}

const ContextMenu: FC<ContextMenuProps> = ({
  items,
  isOpen,
  setIsOpen,
  buttonRef,
}) => {
  useOnClickOutside(buttonRef, () => {
    setIsOpen(false);
  });

  const transition = useTransition(isOpen, {
    from: { opacity: 0, y: "-2px" },
    enter: { opacity: 1, y: "0" },
    leave: { opacity: 0, y: "-2px" },
    config: { duration: 100 },
  });

  const getPosition = () => {
    const rect = buttonRef.current!.getBoundingClientRect();
    const scrollContainer = document.querySelector(
      `.${layoutStyles.scrollContainer}`
    ) as HTMLDivElement;

    if (rect.x > scrollContainer.offsetWidth) {
      return {
        right: "35px",
        top: "35px",
      };
    }

    return {
      left: "calc(100% - 15px)",
      top: "35px",
    };
  };

  return transition(
    (props, item) =>
      item && (
        <animated.div
          style={{
            ...props,
            position: "absolute",
            zIndex: 1000,
            ...getPosition(),
          }}
        >
          <div className={styles.wrapper}>
            {items.map((item) => (
              <ContextMenuItem item={item} key={item.id} />
            ))}
          </div>
        </animated.div>
      )
  );
};

export default ContextMenu;

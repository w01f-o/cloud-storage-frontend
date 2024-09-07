import { Dispatch, FC, RefObject, SetStateAction } from "react";
import styles from "./contextMenu.module.scss";
import ContextMenuItem from "./ContextMenuItem";
import { animated, useTransition } from "@react-spring/web";
import layoutStyles from "@/components/pages/Layout/layout.module.scss";
import { useClickOutside } from "@/hooks/useClickOutside";

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
  useClickOutside({ ref: buttonRef, callback: () => setIsOpen(false) });

  const transition = useTransition(isOpen, {
    from: { opacity: 0, y: "-2px" },
    enter: { opacity: 1, y: "0" },
    leave: { opacity: 0, y: "-2px" },
    config: { duration: 100 },
  });

  const getPosition = () => {
    const rect = buttonRef.current!.getBoundingClientRect();
    const rootContainer: HTMLElement =
      document.querySelector(`.${layoutStyles.scrollContainer}`) ??
      document.body;

    if (rect.x > rootContainer.offsetWidth) {
      if (rect.bottom + 50 * items.length > rootContainer.offsetHeight) {
        return {
          right: "35px",
          bottom: "35px",
        };
      }
      // TODO: FIX THIS SHIT
      return {
        right: "35px",
        top: "35px",
      };
    }

    if (rect.bottom + 50 * items.length > rootContainer.offsetHeight) {
      return {
        left: "35px",
        bottom: "35px",
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
              <ContextMenuItem
                item={item}
                key={item.id}
                position={getPosition().right ? "right" : "left"}
              />
            ))}
          </div>
        </animated.div>
      ),
  );
};

export default ContextMenu;

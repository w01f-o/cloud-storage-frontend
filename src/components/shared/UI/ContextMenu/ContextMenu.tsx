import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./contextMenu.module.scss";
import ContextMenuItem from "./ContextMenuItem";
import TripleDotsIcon from "../../Icons/TrippleDotsIcon";
import clsx from "clsx";
import { useTransition, animated } from "@react-spring/web";
import ReactPortal from "@/components/features/ReactPortal/ReactPortal";
import { useOnClickOutside } from "usehooks-ts";
import { useSearchParams } from "next/navigation";

interface ContextMenuProps {
  items: Array<{
    id: number;
    name: string;
    action: () => void;
  }>;
  color: string;
  buttonClassName?: string;
}

const ContextMenu: FC<ContextMenuProps> = ({
  items,
  color,
  buttonClassName,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useOnClickOutside([buttonRef], () => setIsOpen(false));

  const transition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });

  useEffect(() => {
    const resizeHandler = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setMenuPosition({ x: rect.left, y: rect.y });
      }
    };

    resizeHandler();
    // TODO: перепиши эту хуетень, не позорься...
    document
      .querySelector(".layout_scrollContainer__ElUkH")!
      .addEventListener("resize", resizeHandler);
    document
      .querySelector(".layout_scrollContainer__ElUkH")!
      .addEventListener("scroll", resizeHandler);

    return () => {
      document
        .querySelector(".layout_scrollContainer__ElUkH")!
        .removeEventListener("resize", resizeHandler);
      document
        .querySelector(".layout_scrollContainer__ElUkH")!
        .removeEventListener("scroll", resizeHandler);
    };
  }, []);

  return (
    <>
      <button
        className={clsx(clsx(buttonClassName), styles.button)}
        onClick={clickHandler}
        title="Открыть контекстное меню"
        type="button"
        ref={buttonRef}
      >
        <TripleDotsIcon fill={color} />
      </button>
      {transition(
        (props, item) =>
          item && (
            <ReactPortal>
              <animated.div style={props}>
                <div
                  className={styles.wrapper}
                  style={{
                    top: menuPosition.y,
                    left:
                      searchParams.get("view") === "row"
                        ? menuPosition.x - 200
                        : menuPosition.x,
                  }}
                >
                  {items.map((item) => (
                    <ContextMenuItem item={item} key={item.id} />
                  ))}
                </div>
              </animated.div>
            </ReactPortal>
          ),
      )}
    </>
  );
};

export default ContextMenu;

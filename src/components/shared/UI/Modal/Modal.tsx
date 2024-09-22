import {
  Dispatch,
  FC,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";
import styles from "./modal.module.scss";
import { animated, useTransition } from "@react-spring/web";
import ReactPortal from "@/components/features/ReactPortal/ReactPortal";
import { X } from "lucide-react";
import clsx from "clsx";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  wrapperClassName?: string;
  contentClassName?: string;
}

const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  contentClassName,
  wrapperClassName,
  onClose,
}) => {
  const contentMouseDownHandler = (
    e: MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    e.stopPropagation();
  };

  const closeMouseDownHandler = () => {
    setIsOpen(!isOpen);
  };

  const transition = useTransition(isOpen, {
    from: { opacity: 0, x: "14px" },
    enter: { opacity: 1, x: "0" },
    leave: { opacity: 0, x: "14px" },
    config: { duration: 200 },
  });

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    isOpen && document.body.classList.add("body-backdrop");
    document.body.addEventListener("keydown", keyDownHandler);

    return () => {
      document.body.classList.remove("body-backdrop");
      document.body.removeEventListener("keydown", keyDownHandler);

      onClose?.();
    };
  }, [isOpen, onClose, setIsOpen]);

  return transition(
    (props, item) =>
      item && (
        <ReactPortal>
          <animated.div
            className={clsx(styles.modal, wrapperClassName)}
            style={props}
            onMouseDown={closeMouseDownHandler}
          >
            <div
              className={clsx(styles.content, contentClassName)}
              onMouseDown={contentMouseDownHandler}
              role={"dialog"}
            >
              <button
                className={styles.closeButton}
                onClick={closeMouseDownHandler}
              >
                <X />
              </button>
              {children}
            </div>
          </animated.div>
        </ReactPortal>
      ),
  );
};

export default Modal;

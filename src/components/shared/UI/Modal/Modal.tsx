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
  const contentMouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const mouseHandler = () => {
    setIsOpen(false);
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

      onClose && onClose();
    };
  }, [isOpen, onClose, setIsOpen]);

  return transition(
    (props, item) =>
      item && (
        <ReactPortal>
          <animated.div
            className={clsx(styles.modal, wrapperClassName)}
            style={props}
            onMouseDown={mouseHandler}
            role={"dialog"}
          >
            <div
              className={clsx(styles.content, contentClassName)}
              onMouseDown={contentMouseDownHandler}
            >
              <X className={styles.closeButton} onClick={mouseHandler} />
              {children}
            </div>
          </animated.div>
        </ReactPortal>
      ),
  );
};

export default Modal;

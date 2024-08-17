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

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const contentMouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const transition = useTransition(isOpen, {
    from: { opacity: 0, x: "14px" },
    enter: { opacity: 1, x: "0" },
    leave: { opacity: 0, x: "14px" },
    config: { duration: 200 },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("body-backdrop");
    } else {
      document.body.classList.remove("body-backdrop");
    }
  }, [isOpen]);

  return transition(
    (props, item) =>
      item && (
        <ReactPortal>
          <animated.div
            className={styles.modal}
            style={props}
            onMouseDown={closeModal}
          >
            <div
              className={styles.content}
              onMouseDown={contentMouseDownHandler}
            >
              <X className={styles.closeButton} onClick={closeModal} />
              {children}
            </div>
          </animated.div>
        </ReactPortal>
      ),
  );
};

export default Modal;

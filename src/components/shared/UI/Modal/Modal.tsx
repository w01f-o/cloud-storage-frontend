import { Dispatch, FC, MouseEvent, ReactNode, SetStateAction } from "react";
import styles from "./modal.module.scss";
import { animated, useTransition } from "@react-spring/web";
import ReactPortal from "@/components/features/ReactPortal/ReactPortal";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {
  const modalMouseDownHandler = () => {
    setIsOpen(false);
  };

  const contentMouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const transition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });

  return transition(
    (props, item) =>
      item && (
        <ReactPortal>
          <animated.div
            className={styles.modal}
            style={props}
            onMouseDown={modalMouseDownHandler}
          >
            <div
              className={styles.content}
              onMouseDown={contentMouseDownHandler}
            >
              {children}
            </div>
          </animated.div>
        </ReactPortal>
      ),
  );
};

export default Modal;

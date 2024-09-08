import { FC } from "react";
import styles from "./toast.module.scss";
import ToastList from "@/components/features/Toast/ToastList";
import ReactPortal from "@/components/features/ReactPortal/ReactPortal";

const Toast: FC = () => {
  return (
    <ReactPortal>
      <div className={styles.wrapper}>
        <ToastList />
      </div>
    </ReactPortal>
  );
};

export default Toast;
